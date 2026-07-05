# API Documentation

Base URL: `http://localhost:3000/api/v1`

Anotasi CORS mengizinkan origin:
- `http://localhost:5173`
- `http://localhost:3000`

Semua response berformat JSON dengan struktur umum:

```json
{
  "success": true|false,
  "message": "...",
  "data": { ... } | [ ... ] | null
}
```

Error response:

```json
{
  "success": false,
  "message": "...",
  "code": "UNAUTHORIZED|NOT_FOUND|BAD_REQUEST"
}
```

Catatan:
- Daftar module: Auth, Products, Orders, Payments, Shipments, Webhooks.
- Webhook tidak memakai Bearer Token. Verifikasi dilakukan via signature saat ini.
- Password disimpan sebagai plain text. Jangan gunakan password user untuk produksi."
