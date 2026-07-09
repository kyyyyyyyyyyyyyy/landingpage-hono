# Products

## Endpoints

- `GET /api/v1/products`
- `GET /api/v1/products/slug/:slug`
- `GET /api/v1/products/:id`
- `POST /api/v1/products`
- `PATCH /api/v1/products/:id`
- `DELETE /api/v1/products/:id`

---

GET `/api/v1/products`

### Deskripsi
Mengambil daftar seluruh produk.

### Authentication
Tidak memerlukan bearer token.

### Request Header
```http
Content-Type: application/json
```

### Query Parameter
Tidak ada.

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "uuid",
      "name": "Product A",
      "slug": "product-a",
      "description": "...",
      "price": "150000.00",
      "weight": 1000,
      "image_urls": ["https://..."],
      "variants": [],
      "landing_page_id": 1,
      "is_active": "true",
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

### Response Error
- 500 Internal Server Error: `{ success: false, message: "Internal server error" }`

### Business Rules
- `is_active` direpresentasikan sebagai string `"true"`/`"false"` sesuai schema.
- `weight` default `1000`.

### Database Effect
- `products`

---

GET `/api/v1/products/slug/:slug`

### Deskripsi
Mengambil produk berdasarkan slug.

### Authentication
Tidak memerlukan bearer token.

### Path Parameter
| Field | Tipe | Deskripsi |
|---|---|---|
| slug | string | Slug produk |

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "name": "Product A",
    "slug": "product-a",
    "price": "150000.00",
    "variants": []
  }
}
```

### Response Error
- 404 Not Found: `{ success: false, message: "Product not found", code: "NOT_FOUND" }`

### Business Rules
- Slug bersifat unik.

---

GET `/api/v1/products/:id`

### Deskripsi
Mengambil produk berdasarkan UUID.

### Authentication
Tidak memerlukan bearer token.

### Path Parameter
| Field | Tipe | Deskripsi |
|---|---|---|
| id | string | UUID produk |

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "name": "Product A",
    "slug": "product-a",
    "price": "150000.00"
  }
}
```

### Response Error
- 404 Not Found: `{ success: false, message: "Product not found", code: "NOT_FOUND" }`

---

POST `/api/v1/products`

### Deskripsi
Membuat produk baru.

### Authentication
Wajib Bearer Token.

### Request Header
```http
Authorization: Bearer <token>
Content-Type: application/json
```

### Request Body
| Field | Tipe | Deskripsi |
|---|---|---|
| name | string | Wajib |
| slug | string | Wajib, unik |
| description | string | Opsional |
| price | number | Wajib, positif |
| weight | number | Opsional, default `1000`, harus positif |
| image_urls | array[string] | Wajib, minimal 1 URL, setiap item harus format URL valid |
| variants | array | Opsional, default `[]` |
| variants[].name | string | Wajib, tidak boleh string kosong |
| variants[].options | array[string] | Wajib, minimal 1 item, semua item tidak boleh string kosong |

Contoh:
```json
{
  "name": "Product A",
  "slug": "product-a",
  "description": "Deskripsi",
  "price": 150000,
  "weight": 1000,
  "image_urls": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "variants": [
    { "name": "Warna", "options": ["Merah", "Kuning"] },
    { "name": "Ukuran", "options": ["M", "L"] }
  ]
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
    "name": "Product A",
    "slug": "product-a",
    "price": "150000.00",
    "variants": [],
    "landing_page_id": 1,
    "is_active": "true"
  }
}
```

### Response Error
- 400 Bad Request: gagal validasi Zod
- 500 Internal Server Error

### Validation
- `name`: required, minLength 1
- `slug`: required, minLength 1
- `price`: required, number, positive
- `weight`: optional, number, positive
- `image_urls`: required, array of valid URLs, minimal 1 item
- `variants`: optional array. Setiap item harus punya `name` dan `options` minimal 1 elemen, tanpa duplikasi nama case-insensitive trim.

### Business Rules
- Mapping nama field respon DB: `image_urls` di request diteruskan sebagai `imageUrls`.
- Slug harus unik.

### Database Effect
- `products`

### Contoh Request
```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Product A","slug":"product-a","price":150000,"image_urls":["https://example.com/image.jpg"]}'
```

---

PATCH `/api/v1/products/:id`

### Deskripsi
Memperbarui data produk.

### Authentication
Wajib Bearer Token.

### Request Header
```http
Authorization: Bearer <token>
Content-Type: application/json
```

### Path Parameter
| Field | Tipe | Deskripsi |
|---|---|---|
| id | string | UUID produk |

### Request Body
Semua field opsional.

| Field | Tipe | Deskripsi |
|---|---|---|
| name | string | Opsional |
| slug | string | Opsional |
| description | string | Opsional |
| price | number | Opsional, positif |
| weight | number | Opsional, positif |
| image_urls | array[string] | Opsional, setiap item harus URL valid |
| isActive | boolean | Opsional |
| variants | array | Opsional |

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Success",
  "data": {
    "id": "uuid",
    "name": "Product A",
    "slug": "product-a",
    "price": "160000.00",
    "variants": [],
    "landing_page_id": 1,
    "is_active": "true"
  }
}
```

### Response Error
- 404 Not Found: `{ success: false, message: "Product not found", code: "NOT_FOUND" }`
- 400 Bad Request: gagal validasi

### Validation
- Mirip create, seluruh field opsional kecuali rule unique dan required dipertahankan jika dikirim.
- Duplikasi nama variant dilarang.

### Business Rules
- Jika `image_urls` dikirim, dipetakan ke `imageUrls`.

### Database Effect
- `products`

### Contoh Request
```bash
curl -X PATCH http://localhost:3000/api/v1/products/<uuid> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"price":160000}'
```

---

DELETE `/api/v1/products/:id`

### Deskripsi
Menghapus produk berdasarkan UUID.

### Authentication
Wajib Bearer Token.

### Request Header
```http
Authorization: Bearer <token>
```

### Path Parameter
| Field | Tipe | Deskripsi |
|---|---|---|
| id | string | UUID produk |

### Response Success
Status: 200 OK

```json
{
  "success": true,
  "message": "Product deleted",
  "data": null
}
```

### Response Error
- 404 Not Found: `{ success: false, message: "Product not found", code: "NOT_FOUND" }`

### Business Rules
- Penghapusan permanen tanpa soft delete.

