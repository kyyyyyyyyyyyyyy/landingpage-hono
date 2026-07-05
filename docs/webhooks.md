# Webhooks

## Endpoints

- `POST /api/v1/webhooks/midtrans`
- `POST /api/v1/webhooks/biteship`

Catatan: endpoint ini memang dirancang tanpa auth karena verifikasi dilakukan lewat signature/handler masing-masing provider.

---

POST `/api/v1/webhooks/midtrans`

### Deskripsi
Menangani notifikasi payment dari Midtrans dan memutasi status payment + order serta membuat shipment saat settlement.

### Authentication
Tidak memakai Bearer Token. Verifikasi dilakukan dengan `signature_key`.

### Request Header
```http
Content-Type: application/json
```

### Request Body
| Field | Tipe | Deskripsi |
|---|---|---|
| transaction_status | string | Wajib |
| order_id | string | Wajib; digunakan lookup order berdasarkan `orderCode` |
| gross_amount | string | Wajib |
| transaction_id | string | Wajib |
| payment_type | string | Wajib |
| settlement_time | string | Opsional |
| status_code | string | Wajib |
| signature_key | string | Wajib |

Contoh:
```json
{
  "transaction_status": "settlement",
  "order_id": "INVMX1AB2",
  "gross_amount": "150000",
  "transaction_id": "txn-123",
  "payment_type": "credit_card",
  "settlement_time": "2026-01-01 12:00:00",
  "status_code": "200",
  "signature_key": "<sha512-hash>"
}
```

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "received": true
  }
}
```

### Response Error
- 400 Bad Request: signature invalid
- 400 Bad Request: order tidak ditemukan

### Business Rules
- Signature divalidasi: `sha512( order_id + status_code + gross_amount + serverKey ) === signature_key`
- Jika `settlement`/`capture`:
  - update payment: `transactionId`, `status = settlement`, `paymentType`, `rawResponse`, `settledAt`
  - update order: `status = paid`
  - buat shipment baru
- Jika `expire`/`deny`/`cancel`:
  - update payment: `status = expire` atau `deny`
  - update order: `status = cancelled`

### Database Effect
- `payments`: update
- `orders`: update
- `shipments`: insert saat settlement

---

POST `/api/v1/webhooks/biteship`

### Deskripsi
Menangani notifikasi tracking shipment dari Biteship.

### Authentication
Tidak memakai Bearer Token. Verifikasi via payload tracking.

### Request Header
```http
Content-Type: application/json
```

### Request Body
| Field | Tipe | Deskripsi |
|---|---|---|
| tracking_id | string | Wajib |
| waybill_id | string | Wajib |
| status | string | Wajib |
| delivered_at | string | Opsional |

Contoh:
```json
{
  "tracking_id": "TRK001",
  "waybill_id": "WAY001",
  "status": "delivered",
  "delivered_at": "2026-01-01 12:00:00"
}
```

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "received": true
  }
}
```

### Response Error
- 400 Bad Request:
  - `Shipment not found`
- 500 Internal Server Error untuk kesalahan lain.

### Business Rules
- `status = delivered`: shipment status `delivered`, order `delivered`, isi `delivered_at`
- `status = shipped`: shipment status `shipped`, order `shipped`

### Database Effect
- `shipments`: update
- `orders`: update

