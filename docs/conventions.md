# Conventions

- Base URL: `/api/v1`
- Response wrapper:
  - Success: `{ success: true, message: string, data: any }`
  - Error: `{ success: false, message: string, code?: string }`
- Health check tidak perlu auth: `GET /health`
- Public endpoints (tanpa Bearer Token):
  - Auth: `POST /auth/login`, `POST /auth/register`
  - Orders: `GET /orders/code/:code`, `POST /orders`
  - Payments: `POST /payments/:orderId/transactions`
  - Shipments: `POST /shipments/:orderId`, `GET /shipments/:orderId`
  - Webhooks: `POST /webhooks/midtrans`, `POST /webhooks/biteship`
- ID resource di repo adalah string. Beberapa DTO type schema `number` untuk `productId` pada create order (lihat valid order).
- Status codes yang digunakan:
  - 200 OK
  - 201 Created
  - 400 Bad Request
  - 401 Unauthorized
  - 404 Not Found
  - 500 Internal Server Error

