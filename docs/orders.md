# Orders

## Endpoints

- `GET /api/v1/orders`
- `GET /api/v1/orders/code/:code`
- `GET /api/v1/orders/:id`
- `POST /api/v1/orders`

---

GET `/api/v1/orders`

### Deskripsi
Mengambil daftar order milik pengguna.

### Authentication
Wajib Bearer Token.

### Request Header
```http
Authorization: Bearer <token>
```

### Query Parameter
Tidak ada filtering/sorting/pagination yang diimplementasikan. Hasil diurutkan `createdAt DESC` secara default oleh repository.

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "uuid",
      "order_code": "INV...",
      "product_id": "uuid",
      "customer_name": "...",
      "customer_email": "...",
      "customer_phone": "...",
      "shipping_address": { "name":"...", "phone":"...", "address":"...", "city":"...", "state":"...", "postalCode":"...", "country":"..." },
      "quantity": 1,
      "total_amount": "0.00",
      "status": "pending",
      "snap_token": null,
      "redirect_url": null,
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

### Response Error
- 401 Unauthorized
- 500 Internal Server Error

### Business Rules
- `order_code` digenerate otomatis dengan prefix `INV` + timestamp base36 + 4 char random.
- `total_amount` awal saat create adalah `"0"` karena perhitungan final terjadi saat membuat transaksi pembayaran.
- Repository mengembalikan seluruh tabel tanpa pagination.

### Database Effect
- `orders`

---

GET `/api/v1/orders/code/:code`

### Deskripsi
Mengambil order berdasarkan kode order. Endpoint ini **public** (tanpa auth).

### Authentication
Tidak memerlukan bearer token.

### Path Parameter
| Field | Tipe | Deskripsi |
|---|---|---|
| code | string | Kode order, contoh `INV...` |

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": { "id": "uuid", "order_code": "INV...", "status": "pending", "total_amount": "0.00" }
}
```

### Response Error
- 404 Not Found: `{ success: false, message: "Order not found", code: "NOT_FOUND" }`

### Business Rules
- Cocok untuk tracking order oleh guest.

---

GET `/api/v1/orders/:id`

### Deskripsi
Mengambil order berdasarkan UUID.

### Authentication
Wajib Bearer Token.

### Request Header
```http
Authorization: Bearer <token>
```

### Path Parameter
| Field | Tipe | Deskripsi |
|---|---|---|
| id | string | UUID order |

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "order_code": "INV...",
    "product_id": "uuid",
    "customer_name": "...",
    "customer_email": "...",
    "customer_phone": "...",
    "shipping_address": { "name":"...", "phone":"...", "address":"...", "city":"...", "state":"...", "postalCode":"...", "country":"..." },
    "quantity": 1,
    "total_amount": "100000.00",
    "status": "paid",
    "snap_token": "...",
    "redirect_url": "https://...",
    "created_at": "...",
    "updated_at": "..."
  }
}
```

### Response Error
- 401 Unauthorized
- 404 Not Found: `{ success: false, message: "Order not found", code: "NOT_FOUND" }`

---

POST `/api/v1/orders`

### Deskripsi
Membuat order baru.

### Authentication
Tidak memerlukan bearer token.

### Request Header
```http
Content-Type: application/json
```

### Request Body
| Field | Tipe | Deskripsi |
|---|---|---|
| productId | number | Wajib, bilangan bulat positif |
| quantity | number | Opsional, default 1, harus positif |
| customerName | string | Wajib, minimal 1 karakter |
| customerEmail | string | Wajib, format email |
| customerPhone | string | Wajib, minimal 1 karakter |
| shippingAddress.name | string | Wajib |
| shippingAddress.phone | string | Wajib |
| shippingAddress.address | string | Wajib |
| shippingAddress.city | string | Wajib |
| shippingAddress.state | string | Wajib |
| shippingAddress.postalCode | string | Wajib |
| shippingAddress.country | string | Wajib |

Contoh:
```json
{
  "productId": 1,
  "quantity": 1,
  "customerName": "Budi",
  "customerEmail": "budi@example.com",
  "customerPhone": "081234567890",
  "shippingAddress": {
    "name": "Budi",
    "phone": "081234567890",
    "address": "Jl. Mawar No. 10",
    "city": "Jakarta",
    "state": "DKI Jakarta",
    "postalCode": "12345",
    "country": "Indonesia"
  }
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
    "order_code": "INVMX1AB2",
    "product_id": 1,
    "customer_name": "Budi",
    "customer_email": "budi@example.com",
    "customer_phone": "081234567890",
    "shipping_address": { "name":"Budi","phone":"081234567890","address":"Jl. Mawar No. 10","city":"Jakarta","state":"DKI Jakarta","postalCode":"12345","country":"Indonesia" },
    "quantity": 1,
    "total_amount": "0",
    "status": "pending",
    "snap_token": null,
    "redirect_url": null,
    "created_at": "...",
    "updated_at": "..."
  }
}
```

### Response Error
- 400 Bad Request: gagal validasi Zalando

### Validation
- `productId`: number, required, positive
- `quantity`: number, optional, default `1`, positive
- `customerName`: string, required, minLength 1
- `customerEmail`: email, required
- `customerPhone`: string, required, minLength 1
- `shippingAddress.*`: required, minLength 1

### Business Rules
- Order dibuat dengan status awal `pending` dan `total_amount = "0"`.
- `shipping_address` disimpan sebagai JSON string.
- `productId` pada request saat ini berbentuk number. Tipe kolom database adalah UUID, jadi validasi ini cukup longgar dibanding schema DB.

### Database Effect
- `orders`

