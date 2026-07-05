# Shipments

## Endpoints

- `POST /api/v1/shipments/:orderId`
- `GET /api/v1/shipments/:orderId`

---

POST `/api/v1/shipments/:orderId`

### Deskripsi
Membuat shipment untuk order tertentu dengan Biteship. Saat ini hardcoded JNE Reg dan origin static.

### Authentication
Tidak memerlukan bearer token.

### Path Parameter
| Field | Tipe | Deskripsi |
|---|---|---|
| orderId | string | UUID order |

### Request Body
Tidak ada body request.

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "status": "...",
    "tracking_id": "...",
    "waybill_id": "...",
    "courier": "jne",
    "courier_service": "reg",
    "shipping_cost": 15000
  }
}
```

### Response Error
- 404 Not Found:
  - `Order not found`
  - `Product not found`

### Business Rules
- `origin` hardcoded:
  - `name`: `Go Store`
  - `phone`: `6281234567890`
  - `address`: `Jl. Contoh No. 1`
  - `city`: `Jakarta`
  - `postalCode`: `12345`
- `courier` hardcoded: `jne`
- `courierService` hardcoded: `reg`
- Status awal shipment: `processing`
- Order status otomatis menjadi `shipped` setelah shipment dibuat.

### Database Effect
- `shipments`: insert
- `orders`: update status

---

GET `/api/v1/shipments/:orderId`

### Deskripsi
Mengambil shipment berdasarkan orderId.

### Authentication
Tidak memerlukan bearer token.

### Path Parameter
| Field | Tipe | Deskripsi |
|---|---|---|
| orderId | string | UUID order |

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "order_id": "uuid",
    "courier": "jne",
    "tracking_id": "...",
    "waybill_id": "...",
    "status": "shipped",
    "courier_service": "reg",
    "shipping_cost": "15000",
    "raw_response": {},
    "delivered_at": null,
    "created_at": "...",
    "updated_at": "..."
  }
}
```

### Response Error
- 404 Not Found jika shipment belum pernah dibuat untuk order tersebut.

