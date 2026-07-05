# Error Response

Format umum:

```json
{
  "success": false,
  "message": "<pesan-error>",
  "code": "<ERROR_CODE>"
}
```

Kode status dan contoh:

## 400 Bad Request
```json
{
  "success": false,
  "message": "Order not found",
  "code": "BAD_REQUEST"
}
```

Kemunculan:
- `payments.createTransaction`: order atau product tidak ditemukan
- `shipments.createShipment`: order atau product tidak ditemukan
- `webhooks.midtrans`: signature invalid
- `webhooks.biteship`: shipment tidak ditemukan
- auth register: email sudah terdaftar

## 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token",
  "code": "UNAUTHORIZED"
}
```

Kemunculan:
- auth/middleware: header tidakBearer / invalid JWT
- auth.login: email/password salah

## 404 Not Found
```json
{
  "success": false,
  "message": "Product not found",
  "code": "NOT_FOUND"
}
```

Kemunculan:
- products.getById/getBySlug/update/delete
- orders.getById/getByCode
- shipments.createShipment (order/product/shipment tidak ada)

## 422 / Validation Error
Dari `@hono/zod-validator` untuk payload yang gagal validasi schema.

## 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

Kemunculan:
- midtrans provider fetch gagal
- biteship provider fetch gagal
- server error tidak tertangkap

