# Authentication

## Mechanism

Bearer Token (`Authorization: Bearer <token>`)

Middleware: `src/middlewares/auth.ts`

## Login

POST `/api/v1/auth/login`

Body:

```json
{
  "email": "user@example.com",
  "password": "min6chars"
}
```

Response:

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "token": "<jwt-token>",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "User Name",
      "role": "admin"
    }
  }
}
```

## Me

GET `/api/v1/auth/me`

Header:

```http
Authorization: Bearer <token>
```

Response:

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "admin"
  }
}
```

Notes:
- payload JWT adalah `{id, email, role}` (implementation defined in `src/modules/auth/services/auth.service.ts`).
- `register` tidak mengembalikan token. Jika frontend perlu token, panggil `login` setelah `register`.
"

