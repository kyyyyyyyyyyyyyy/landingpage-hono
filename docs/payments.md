# Payments

## Endpoints

- `POST /api/v1/payments/:orderId/transactions`

---

POST `/api/v1/payments/:orderId/transactions`

### Deskripsi
Membuat transaksi pembayaran Midtrans untuk order tertentu. Mengembalikan token dan URL redirect pembayaran.

### Authentication
Tidak memerlukan bearer token.

### Path Parameter
| Field | Tipe | Deskripsi |
|---|---|---|
| orderId | string | UUID order |

### Request Body
Tidak ada body. Semua data diambil dari order + product terhubung.

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "token": "snaptoken-xxx",
    "redirectUrl": "https://app.sandbox.midtrans.com/..."
  }
}
```

### Response Error
- 400 Bad Request: `{ success: false, message: "Order not found", code: "BAD_REQUEST" }`
- 400 Bad Request: `{ success: false, message: "Product not found", code: "BAD_REQUEST" }`
- 500 Internal Server Error: `{ success: false, message: "Internal server error" }`

### Business Rules
- Satu order memiliki tepat satu payment record.
- Perhitungan `grossAmount = product.price * order.quantity`.
- Order status diubah menjadi `waiting_payment`.
- Payment status dibuat `pending`.

### Database Effect
- `payments`: insert
- `orders`: update `total_amount`, `snap_token`, `redirect_url`, `status`

### Catatan
- Berikut data yang dikirim ke Midtrans:
  - `transaction_details.order_id = order.orderCode`
  - `item_details` berisi satu item sesuai product + quantity.

