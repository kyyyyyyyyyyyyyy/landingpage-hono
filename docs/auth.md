# Auth

## Endpoints

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`
- `GET /api/v1/auth/me`

---

POST `/api/v1/auth/login`

### Deskripsi
Login pengguna dan mengembalikan JWT token.

### Authentication
Tidak memerlukan bearer token.

### Request Header
```http
Content-Type: application/json
```

### Request Body
| Field | Tipe | Deskripsi |
|---|---|---|
| email | string | Email pengguna |
| password | string | Minimal 6 karakter |

Contoh:
```json
{
  "email": "admin@go.id",
  "password": "secret123"
}
```

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "token": "<jwt>",
    "user": {
      "id": "uuid",
      "email": "admin@go.id",
      "name": "Admin",
      "role": "admin"
    }
  }
}
```

### Response Error
- 400 Bad Request `{ success: false, message: "Bad request", code: "BAD_REQUEST" }`
- 401 Unauthorized `{ success: false, message: "Invalid credentials", code: "UNAUTHORIZED" }`

### Validation
- `email`: required, format email
- `password`: required, string, minimum 6

### Business Rules
- Jika email/ password mismatch, dianggap invalid credentials. Pesan errornya sama untuk email tidak ditemukan maupun password salah.
- Role default user adalah `admin` saat register.

### Database Effect
- `users`

### Contoh Request
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@go.id","password":"secret123"}'
```

---

POST `/api/v1/auth/register`

### Deskripsi
Mendaftarkan pengguna baru.

### Authentication
Tidak memerlukan bearer token.

### Request Header
```http
Content-Type: application/json
```

### Request Body
| Field | Tipe | Deskripsi |
|---|---|---|
| name | string | Minimal 1 karakter |
| email | string | Format email, harus unik |
| password | string | Minimal 6 karakter |

Contoh:
```json
{
  "name": "Admin",
  "email": "admin@go.id",
  "password": "secret123"
}
```

### Response Success
Status: 201 Created

```json
{
  "success": true,
  "message": "Created",
  "data": {
    "id": "uuid",
    "name": "Admin",
    "email": "admin@go.id",
    "role": "admin"
  }
}
```

### Response Error
- 400 Bad Request: email sudah terdaftar
  ```json
  { "success": false, "message": "Email already registered", "code": "BAD_REQUEST" }
  ```

### Validation
- `name`: required, string, minimum 1
- `email`: required, email, unique di tabel users
- `password`: required, string, minimum 6

### Business Rules
- Role default: `admin`.
- Tidak melarang register email yang sebelumnya terhapus, karena tidak ada soft delete.

### Database Effect
- `users`

### Contoh Request
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@go.id","password":"secret123"}'
```

---

GET `/api/v1/auth/me`

### Deskripsi
Mengambil informasi pengguna dari token JWT.

### Authentication
Wajib Bearer Token.

### Request Header
```http
Authorization: Bearer <token>
```

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "email": "admin@go.id",
    "role": "admin"
  }
}
```

### Response Error
- 401 Unauthorized:
  - `Missing or invalid token`
  - `Invalid or expired token`

### Business Rules
- Payload JWT menyimpan `id`, `email`, `role`. Nama pengguna tidak disertakan.

