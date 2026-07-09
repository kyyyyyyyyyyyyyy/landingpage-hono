Anda adalah seorang Senior Frontend Engineer yang ahli dalam React, TypeScript, dan Tailwind CSS.

Tugas Anda adalah mengimplementasikan modul **Products (CRUD)** pada aplikasi web Vite + React + TypeScript yang sedang dibangun, serta mengintegrasikannya dengan spesifikasi API Products yang disediakan.

---

### ⚠️ BATASAN PENTING (MANDATORY RULES):
1. JANGAN MENGGUNAKAN SUB-AGENT ATAU DELEGASI PROSES. Selesaikan seluruh tugas ini secara mandiri dalam satu sesi/konteks penulisan.
2. GUNAKAN TOKEN SEEFISIEN MUNGKIN. Berikan kode yang padat, modular, bersih, tanpa komentar yang berlebihan, dan hindari penjelasan teori. Langsung fokus pada kode operasional.

---

### SPESIFIKASI API & ATURAN BISNIS (BASE URL: `/api/v1`)
1. `GET /products` -> Public (Tanpa Token). Mengembalikan seluruh daftar produk. Perhatikan properti `is_active` dikembalikan dalam bentuk string `"true"` atau `"false"`.
2. `GET /products/:id` atau `/products/slug/:slug` -> Public. Mengambil detail produk tunggal.
3. `POST /products` -> Wajib Bearer Token. Membuat produk baru.
   - Menggunakan array string `image_urls` (minimal 1 URL).
   - Struktur data `variants` opsional berupa array object: `[{ name: string, options: string[] }]`.
4. `PATCH /products/:id` -> Wajib Bearer Token. Mengupdate produk (semua field opsional). Properti boolean diubah menjadi `isActive` di body request.
5. `DELETE /products/:id` -> Wajib Bearer Token. Menghapus produk secara permanen.

---

### KODE TAMPILAN UI (YANG HARUS DIINTEGRASIKAN)
Silakan konversikan kode HTML/Tailwind berikut menjadi komponen React + TypeScript operasional, lalu hubungkan dengan state, fungsi fetching API, loading state, dan error handling.

#### 1. Halaman Utama (Daftar Produk / Datatable)
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>InvTrack - Product Inventory</title>
<!-- Google Fonts: Hanken Grotesk & JetBrains Mono -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&amp;family=JetBrains+Mono&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols Outlined -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Config -->
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface-container-low": "#f1f4f3",
                    "on-surface": "#181c1c",
                    "primary-fixed-dim": "#80d5cb",
                    "on-surface-variant": "#3e4947",
                    "surface-container-highest": "#e0e3e1",
                    "on-secondary-fixed": "#00201d",
                    "secondary-container": "#86f2e4",
                    "primary-container": "#0f766e",
                    "secondary": "#006a61",
                    "primary": "#005c55",
                    "on-primary-fixed-variant": "#00504a",
                    "inverse-on-surface": "#eef1f0",
                    "on-tertiary": "#ffffff",
                    "tertiary": "#7f4025",
                    "on-primary-fixed": "#00201d",
                    "tertiary-container": "#9c573a",
                    "surface": "#f7faf8",
                    "on-primary": "#ffffff",
                    "surface-variant": "#e0e3e1",
                    "surface-tint": "#006a63",
                    "outline-variant": "#bdc9c6",
                    "on-primary-container": "#a3faef",
                    "background": "#f7faf8",
                    "error": "#ba1a1a",
                    "surface-bright": "#f7faf8",
                    "surface-container-high": "#e5e9e7",
                    "on-background": "#181c1c",
                    "primary-fixed": "#9cf2e8",
                    "secondary-fixed-dim": "#6bd8cb",
                    "surface-container-lowest": "#ffffff",
                    "on-tertiary-container": "#ffe5db",
                    "on-error-container": "#93000a",
                    "on-tertiary-fixed-variant": "#72361b",
                    "surface-container": "#ebefed",
                    "secondary-fixed": "#89f5e7",
                    "inverse-surface": "#2d3130",
                    "surface-dim": "#d7dbd9",
                    "on-secondary": "#ffffff",
                    "on-error": "#ffffff",
                    "on-tertiary-fixed": "#370e00",
                    "on-secondary-container": "#006f66",
                    "outline": "#6e7977",
                    "tertiary-fixed-dim": "#ffb598",
                    "tertiary-fixed": "#ffdbce",
                    "error-container": "#ffdad6",
                    "inverse-primary": "#80d5cb",
                    "on-secondary-fixed-variant": "#005049"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "lg": "1.5rem",
                    "md": "1rem",
                    "margin": "32px",
                    "base": "4px",
                    "sm": "0.5rem",
                    "gutter": "24px",
                    "xl": "2rem",
                    "max_width": "1440px",
                    "xs": "0.25rem",
                    "2xl": "3rem"
            },
            "fontFamily": {
                    "headline-lg-mobile": ["Hanken Grotesk"],
                    "display": ["Hanken Grotesk"],
                    "headline-lg": ["Hanken Grotesk"],
                    "headline-md": ["Hanken Grotesk"],
                    "body-lg": ["Hanken Grotesk"],
                    "body-md": ["Hanken Grotesk"],
                    "label-md": ["Hanken Grotesk"],
                    "code": ["JetBrains Mono"]
            },
            "fontSize": {
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "display": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "headline-md": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                    "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                    "code": ["13px", {"lineHeight": "20px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        body {
            background-color: #F8FAFC;
            color: #181C1C;
            -webkit-font-smoothing: antialiased;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #E2E8F0;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #CBD5E1;
        }
    </style>
</head>
<body class="font-body-md text-body-md overflow-x-hidden">
<!-- Sidebar Navigation -->
<aside class="fixed left-0 top-0 h-screen w-[240px] z-50 bg-surface-container-lowest border-r border-outline-variant flex flex-col p-md gap-base">
<!-- Brand -->
<div class="py-lg px-md">
<h1 class="font-headline-md text-headline-md text-primary tracking-tight">Inventory Pro</h1>
<p class="font-label-md text-label-md text-on-surface-variant opacity-70">Enterprise Tier</p>
</div>
<!-- Main Tabs -->
<nav class="flex-1 flex flex-col gap-xs mt-md">
<a class="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 rounded-lg group" href="#">
<span class="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span class="font-label-md">Overview</span>
</a>
<!-- Products is ACTIVE -->
<a class="flex items-center gap-md px-md py-sm bg-secondary-container text-on-secondary-container font-semibold rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined" data-icon="inventory_2" style="font-variation-settings: 'FILL' 1;">inventory_2</span>
<span class="font-label-md">Products</span>
</a>
<a class="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 rounded-lg group" href="#">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
<span class="font-label-md">Settings</span>
</a>
</nav>
<!-- CTA & Footer -->
<div class="mt-auto flex flex-col gap-md">
<button class="w-full py-sm bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-sm">
<span class="material-symbols-outlined text-[18px]" data-icon="add">add</span>
                Add New Stock
            </button>
<hr class="border-outline-variant"/>
<div class="flex flex-col gap-xs">
<a class="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="contact_support">contact_support</span>
<span class="font-label-md">Support</span>
</a>
<a class="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 rounded-lg" href="#">
<span class="material-symbols-outlined" data-icon="logout">logout</span>
<span class="font-label-md">Sign Out</span>
</a>
</div>
</div>
</aside>
<!-- Main Content Shell -->
<main class="ml-[240px] min-h-screen flex flex-col">
<!-- Top Navigation Bar -->
<header class="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-md border-b border-outline-variant">
<div class="flex justify-between items-center px-lg py-md max-w-max_width mx-auto">
<div class="flex items-center gap-xl flex-1">
<span class="font-headline-md text-headline-md font-bold text-primary">InvTrack</span>
<div class="relative max-w-md w-full">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" data-icon="search">search</span>
<input class="w-full bg-surface-container-low border-none rounded-full pl-10 pr-md py-2 focus:ring-2 focus:ring-primary text-body-md" placeholder="Search products, orders..." type="text"/>
</div>
</div>
<div class="flex items-center gap-lg ml-xl">
<button class="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-xs">
<span class="material-symbols-outlined" data-icon="help">help</span>
<span class="font-label-md">Support</span>
</button>
<button class="relative text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
<span class="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
</button>
<div class="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
<img class="w-full h-full object-cover" data-alt="Close up profile portrait of a professional inventory manager, clean background, modern office aesthetic, minimalist lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuATrCk57Lcff8FApD5AJZmwDT_EW-Sy0DtFUEr6kwXtD3tRyVzp61mlumYVnnF8xUy49XTxoWBVS1YcF8QD1dmT7Q93raqEbESqBkuoequ6dVGZySCWEv6sZdIIOBk2hZ3IwSVSIB35tofzjYwHGxAt9xYfmbGhJelIjFIIc4VBtpR9fner6IQZmdQCtT7U2qZE2FKwHWYCtmLW0aZXcRWjm6BeJQBcCvm4xaSlKBsqbBaXolIK1xpdvhyJofm7ghqXzND6j4KFAKw"/>
</div>
</div>
</div>
</header>
<!-- Dashboard Content -->
<section class="p-xl max-w-max_width mx-auto w-full space-y-xl">
<!-- Page Header Area -->
<div class="flex justify-between items-end">
<div>
<h2 class="font-headline-lg text-headline-lg text-on-surface tracking-tight">Products</h2>
<p class="text-on-surface-variant mt-xs">Manage your inventory catalog and variants.</p>
</div>
<div class="flex gap-md">
<button class="flex items-center gap-sm px-lg py-sm bg-surface-container-lowest border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors font-semibold active:scale-95 duration-200">
<span class="material-symbols-outlined text-[18px]" data-icon="refresh">refresh</span>
                        Refresh
                    </button>
<button class="flex items-center gap-sm px-lg py-sm bg-primary text-on-primary rounded-lg shadow-sm hover:shadow-md transition-all font-semibold active:scale-95 duration-200">
<span class="material-symbols-outlined text-[18px]" data-icon="add">add</span>
                        Add Product
                    </button>
</div>
</div>
<!-- Stats/Contextual Summary (Bento Row) -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
<div class="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center justify-between">
<div>
<p class="font-label-md text-on-surface-variant uppercase tracking-wider">Total Inventory</p>
<p class="font-headline-lg text-headline-lg mt-sm">2,481</p>
</div>
<span class="material-symbols-outlined text-[32px] text-primary opacity-20" data-icon="inventory">inventory</span>
</div>
<div class="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center justify-between">
<div>
<p class="font-label-md text-on-surface-variant uppercase tracking-wider">Active Status</p>
<p class="font-headline-lg text-headline-lg mt-sm">94.2%</p>
</div>
<span class="material-symbols-outlined text-[32px] text-secondary opacity-20" data-icon="check_circle">check_circle</span>
</div>
<div class="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex items-center justify-between">
<div>
<p class="font-label-md text-on-surface-variant uppercase tracking-wider">Low Stock</p>
<p class="font-headline-lg text-headline-lg mt-sm text-error">12 Items</p>
</div>
<span class="material-symbols-outlined text-[32px] text-error opacity-20" data-icon="warning">warning</span>
</div>
</div>
<!-- Main Data Table Container -->
<div class="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div class="overflow-x-auto custom-scrollbar">
<table class="w-full text-left border-collapse">
<thead>
<tr class="border-b border-outline-variant bg-surface-container-low/50">
<th class="px-lg py-md font-label-md text-on-surface-variant uppercase tracking-wider w-16">Image</th>
<th class="px-lg py-md font-label-md text-on-surface-variant uppercase tracking-wider">Product Info</th>
<th class="px-lg py-md font-label-md text-on-surface-variant uppercase tracking-wider">Price</th>
<th class="px-lg py-md font-label-md text-on-surface-variant uppercase tracking-wider text-center">Weight</th>
<th class="px-lg py-md font-label-md text-on-surface-variant uppercase tracking-wider text-center">Status</th>
<th class="px-lg py-md font-label-md text-on-surface-variant uppercase tracking-wider">Created At</th>
<th class="px-lg py-md font-label-md text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
</tr>
</thead>
<tbody class="divide-y divide-outline-variant/40">
<!-- Product Row: Product A -->
<tr class="group hover:bg-surface-container-low transition-colors duration-150">
<td class="px-lg py-md">
<div class="w-12 h-12 rounded-lg bg-surface-container-highest overflow-hidden border border-outline-variant">
<img class="w-full h-full object-cover" data-alt="High-resolution product photography of a premium minimalist smartwatch, clean white background, soft professional studio lighting, showing technical details and sleek design." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxAYUmLdoqkdezehQJNPajldqwG9lRyPoPiL3dCInKlCqSelEiYxr6EPx8tO9QH9JJ-voYRo7-vR3Htxp0HI4tv3TuV2-VihvtBUaNW810IlHFayNwQnZYJV-ublHs0bgjlLXrs_wChhge3MByxOH_zYaiVGfO4iOLwNUn6EddxOCxkDO0yHUwFtZErIUcpyV_WZainO30m5clVa52wUdtAJgt7lq8vvOPMBoD5y-dEAR4mMIpXy2rC8dWqq-axfgW4_lKzY3ySzw"/>
</div>
</td>
<td class="px-lg py-md">
<div class="flex flex-col gap-xs">
<div class="flex items-center gap-sm">
<span class="font-headline-md text-on-surface">Product A</span>
<span class="px-xs py-0.5 bg-secondary-container/50 text-on-secondary-container text-[10px] font-bold rounded uppercase tracking-tighter">2 Variants</span>
</div>
<code class="text-code font-code text-on-surface-variant opacity-60">product-a</code>
</div>
</td>
<td class="px-lg py-md font-semibold text-primary">
                                    Rp 150.000,00
                                </td>
<td class="px-lg py-md text-center text-on-surface-variant">
                                    1.000 g
                                </td>
<td class="px-lg py-md text-center">
<span class="inline-flex items-center px-sm py-1 rounded-md bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
<span class="w-1.5 h-1.5 rounded-full bg-primary mr-1.5"></span>
                                        Active
                                    </span>
</td>
<td class="px-lg py-md text-on-surface-variant font-code text-[13px]">
                                    2026-07-01
                                </td>
<td class="px-lg py-md text-right">
<div class="flex items-center justify-end gap-md">
<button class="p-sm rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors group/btn">
<span class="material-symbols-outlined text-[20px] group-hover/btn:text-primary transition-colors" data-icon="visibility">visibility</span>
</button>
<button class="p-sm rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors group/btn">
<span class="material-symbols-outlined text-[20px] group-hover/btn:text-primary transition-colors" data-icon="edit">edit</span>
</button>
<button class="p-sm rounded-lg hover:bg-error/10 text-on-surface-variant transition-colors group/btn">
<span class="material-symbols-outlined text-[20px] group-hover/btn:text-error transition-colors" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 2 (Dummy for visual weight) -->
<tr class="group hover:bg-surface-container-low transition-colors duration-150">
<td class="px-lg py-md">
<div class="w-12 h-12 rounded-lg bg-surface-container-highest overflow-hidden border border-outline-variant">
<img class="w-full h-full object-cover" data-alt="Premium lifestyle gadget on a desk, blurred aesthetic background, bright and crisp lighting, minimalist design, teal and gray color palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn8s5UBPaZ2yfQbcVfOaKUPq8uQ0v5w0CNdP47GW6kSvhcS0ZB2oiG4nCZkVPPnNE_N-YiSLY5W_9x6OGuFpY5E1IWESdJM3HHO4FejXhVbiZ3azJaURegHR8890lKuM313ujf6VXr3S654eun3lCiSH8-e-J8qd491z-Cwcm7CKjwZBtBN1A_2lqegG7hJl4zOrNQ8Y8rJMHv44-f-oTNdOpUVNBt2neRY8ndPKw0m4sgs4XNojfBKwdk_ckp5nJH-zqdg81Wk2c"/>
</div>
</td>
<td class="px-lg py-md">
<div class="flex flex-col gap-xs">
<div class="flex items-center gap-sm">
<span class="font-headline-md text-on-surface">Precision Sensor B</span>
</div>
<code class="text-code font-code text-on-surface-variant opacity-60">sensor-b-lux</code>
</div>
</td>
<td class="px-lg py-md font-semibold text-primary">
                                    Rp 275.000,00
                                </td>
<td class="px-lg py-md text-center text-on-surface-variant">
                                    250 g
                                </td>
<td class="px-lg py-md text-center">
<span class="inline-flex items-center px-sm py-1 rounded-md bg-error/10 text-error text-[11px] font-bold uppercase tracking-wider">
<span class="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
                                        Inactive
                                    </span>
</td>
<td class="px-lg py-md text-on-surface-variant font-code text-[13px]">
                                    2026-06-15
                                </td>
<td class="px-lg py-md text-right">
<div class="flex items-center justify-end gap-md">
<button class="p-sm rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors group/btn">
<span class="material-symbols-outlined text-[20px] group-hover/btn:text-primary" data-icon="visibility">visibility</span>
</button>
<button class="p-sm rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors group/btn">
<span class="material-symbols-outlined text-[20px] group-hover/btn:text-primary" data-icon="edit">edit</span>
</button>
<button class="p-sm rounded-lg hover:bg-error/10 text-on-surface-variant transition-colors group/btn">
<span class="material-symbols-outlined text-[20px] group-hover/btn:text-error" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
<!-- Row 3 (Dummy for visual weight) -->
<tr class="group hover:bg-surface-container-low transition-colors duration-150">
<td class="px-lg py-md">
<div class="w-12 h-12 rounded-lg bg-surface-container-highest overflow-hidden border border-outline-variant">
<img class="w-full h-full object-cover" data-alt="Professional designer headphones on a clean wooden surface, soft shadows, airy bright environment, neutral professional color palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBw_8DxAC3u5FhlSBku5BuUwvUcAvR9dyRnYvHAnuIEN3IKdKkRDfWbtCp0yMImT4NDlVtTP8hjTlm9oiY0pkGHukS4hROZQK3xRqduQI7jU9hVd12o9eDt3TpcsLkrM3tlwoUGxLZl5dBwNKkoM1um767d-reTQZH97FfxaPhPkNpksLdRjHxyzKaysnHfGWHCkKaOTIB8oF1PaCCtoxSExRDTl1U_rVaV6XBS6dKjx6UsN-kNYH9OvDy3BCqBvkIXZs83I1snFd4"/>
</div>
</td>
<td class="px-lg py-md">
<div class="flex flex-col gap-xs">
<div class="flex items-center gap-sm">
<span class="font-headline-md text-on-surface">Audio Hub Pro</span>
<span class="px-xs py-0.5 bg-secondary-container/50 text-on-secondary-container text-[10px] font-bold rounded uppercase tracking-tighter">5 Variants</span>
</div>
<code class="text-code font-code text-on-surface-variant opacity-60">audio-hub-pro-v2</code>
</div>
</td>
<td class="px-lg py-md font-semibold text-primary">
                                    Rp 1.250.000,00
                                </td>
<td class="px-lg py-md text-center text-on-surface-variant">
                                    1.200 g
                                </td>
<td class="px-lg py-md text-center">
<span class="inline-flex items-center px-sm py-1 rounded-md bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wider">
<span class="w-1.5 h-1.5 rounded-full bg-primary mr-1.5"></span>
                                        Active
                                    </span>
</td>
<td class="px-lg py-md text-on-surface-variant font-code text-[13px]">
                                    2026-06-28
                                </td>
<td class="px-lg py-md text-right">
<div class="flex items-center justify-end gap-md">
<button class="p-sm rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors group/btn">
<span class="material-symbols-outlined text-[20px] group-hover/btn:text-primary" data-icon="visibility">visibility</span>
</button>
<button class="p-sm rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors group/btn">
<span class="material-symbols-outlined text-[20px] group-hover/btn:text-primary" data-icon="edit">edit</span>
</button>
<button class="p-sm rounded-lg hover:bg-error/10 text-on-surface-variant transition-colors group/btn">
<span class="material-symbols-outlined text-[20px] group-hover/btn:text-error" data-icon="delete">delete</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<!-- Table Footer / Pagination -->
<div class="px-lg py-md border-t border-outline-variant flex items-center justify-between bg-surface-container-lowest">
<p class="text-label-md text-on-surface-variant">Showing 3 of 124 products</p>
<div class="flex items-center gap-xs">
<button class="p-xs rounded hover:bg-surface-container-high disabled:opacity-30" disabled="">
<span class="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<button class="w-8 h-8 rounded bg-primary text-on-primary text-label-md font-bold">1</button>
<button class="w-8 h-8 rounded hover:bg-surface-container-high text-label-md">2</button>
<button class="w-8 h-8 rounded hover:bg-surface-container-high text-label-md">3</button>
<button class="p-xs rounded hover:bg-surface-container-high">
<span class="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</section>
</main>
<!-- FAB for quick action (Optional, keeping consistent with design system but suppressed as per instructions on details pages - but this is a Dashboard so it might be useful. The instruction says "suppress FAB on Settings, Profile, Details, and Transactional". Dashboard is acceptable.) -->
<button class="fixed bottom-margin right-margin w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
<span class="material-symbols-outlined text-[28px]" data-icon="qr_code_scanner">qr_code_scanner</span>
</button>
<script>
        // Micro-interaction for search focus
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.classList.add('ring-2', 'ring-primary');
        });
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.classList.remove('ring-2', 'ring-primary');
        });

        // Simple row hover effect logging (Simulating future JS needs)
        document.querySelectorAll('tbody tr').forEach(row => {
            row.addEventListener('click', () => {
                console.log('Row clicked, navigating to product details...');
            });
        });
    </script>
</body></html>

#### 2. Modal Create Product
<!DOCTYPE html><html class="light" lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>InvTrack - Add Product</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&amp;family=JetBrains+Mono&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<!-- Tailwind Config Verbatim -->
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface-container-low": "#f1f4f3",
                    "on-surface": "#181c1c",
                    "primary-fixed-dim": "#80d5cb",
                    "on-surface-variant": "#3e4947",
                    "surface-container-highest": "#e0e3e1",
                    "on-secondary-fixed": "#00201d",
                    "secondary-container": "#86f2e4",
                    "primary-container": "#0f766e",
                    "secondary": "#006a61",
                    "primary": "#005c55",
                    "on-primary-fixed-variant": "#00504a",
                    "inverse-on-surface": "#eef1f0",
                    "on-tertiary": "#ffffff",
                    "tertiary": "#7f4025",
                    "on-primary-fixed": "#00201d",
                    "tertiary-container": "#9c573a",
                    "surface": "#f7faf8",
                    "on-primary": "#ffffff",
                    "surface-variant": "#e0e3e1",
                    "surface-tint": "#006a63",
                    "outline-variant": "#bdc9c6",
                    "on-primary-container": "#a3faef",
                    "background": "#f7faf8",
                    "error": "#ba1a1a",
                    "surface-bright": "#f7faf8",
                    "surface-container-high": "#e5e9e7",
                    "on-background": "#181c1c",
                    "primary-fixed": "#9cf2e8",
                    "secondary-fixed-dim": "#6bd8cb",
                    "surface-container-lowest": "#ffffff",
                    "on-tertiary-container": "#ffe5db",
                    "on-error-container": "#93000a",
                    "on-tertiary-fixed-variant": "#72361b",
                    "surface-container": "#ebefed",
                    "secondary-fixed": "#89f5e7",
                    "inverse-surface": "#2d3130",
                    "surface-dim": "#d7dbd9",
                    "on-secondary": "#ffffff",
                    "on-error": "#ffffff",
                    "on-tertiary-fixed": "#370e00",
                    "on-secondary-container": "#006f66",
                    "outline": "#6e7977",
                    "tertiary-fixed-dim": "#ffb598",
                    "tertiary-fixed": "#ffdbce",
                    "error-container": "#ffdad6",
                    "inverse-primary": "#80d5cb",
                    "on-secondary-fixed-variant": "#005049"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "lg": "1.5rem",
                    "md": "1rem",
                    "margin": "32px",
                    "base": "4px",
                    "sm": "0.5rem",
                    "gutter": "24px",
                    "xl": "2rem",
                    "max_width": "1440px",
                    "xs": "0.25rem",
                    "2xl": "3rem"
            },
            "fontFamily": {
                    "headline-lg-mobile": ["Hanken Grotesk"],
                    "display": ["Hanken Grotesk"],
                    "headline-lg": ["Hanken Grotesk"],
                    "headline-md": ["Hanken Grotesk"],
                    "body-lg": ["Hanken Grotesk"],
                    "body-md": ["Hanken Grotesk"],
                    "label-md": ["Hanken Grotesk"],
                    "code": ["JetBrains Mono"]
            },
            "fontSize": {
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "display": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "headline-md": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                    "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                    "code": ["13px", {"lineHeight": "20px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        body { font-family: 'Hanken Grotesk', sans-serif; }
        .glass-panel {
            backdrop-filter: blur(12px);
            background: rgba(255, 255, 255, 0.8);
        }
        .modal-shadow {
            box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.08);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
            background: #cbd5e1; 
            border-radius: 10px;
        }
        .input-focus-ring:focus {
            outline: none;
            border-color: #005c55;
            box-shadow: 0 0 0 2px rgba(0, 92, 85, 0.1);
        }
    </style>
</head>
<body class="bg-surface text-on-surface overflow-hidden">
<!-- Dashboard Background (Dimmed/Blurred) -->
<div class="fixed inset-0 z-0 flex pointer-events-none grayscale brightness-75 opacity-50">
<!-- SideNav Simulation -->
<div class="w-[240px] h-full border-r border-outline-variant bg-surface-container-lowest flex flex-col p-md gap-base">
<div class="h-10 w-32 bg-surface-container-high rounded-lg mb-lg"></div>
<div class="space-y-sm">
<div class="h-10 w-full bg-secondary-container rounded-lg"></div>
<div class="h-10 w-full bg-surface-container-high rounded-lg opacity-50"></div>
<div class="h-10 w-full bg-surface-container-high rounded-lg opacity-50"></div>
</div>
</div>
<!-- Main Content Simulation -->
<div class="flex-1 p-xl space-y-xl">
<div class="h-12 w-1/3 bg-surface-container-high rounded-xl"></div>
<div class="grid grid-cols-3 gap-gutter">
<div class="h-64 bg-surface-container-lowest border border-outline-variant rounded-xl"></div>
<div class="h-64 bg-surface-container-lowest border border-outline-variant rounded-xl"></div>
<div class="h-64 bg-surface-container-lowest border border-outline-variant rounded-xl"></div>
</div>
</div>
</div>
<!-- Modal Overlay -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/20 backdrop-blur-sm" id="modal-overlay">
<!-- Modal Container -->
<div class="modal-shadow w-full max-w-[800px] bg-surface-container-lowest rounded-xl flex flex-col max-h-[90vh] border border-outline-variant overflow-hidden animate-in fade-in zoom-in duration-300">
<!-- Header -->
<header class="px-xl py-lg border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest sticky top-0 z-10">
<div>
<h1 class="font-headline-md text-headline-md text-primary">Add New Product</h1>
<p class="font-body-md text-body-md text-on-surface-variant">Define product specifications and inventory variants.</p>
</div>
<button class="p-sm rounded-full hover:bg-surface-container-high transition-colors" onclick="closeModal()">
<span class="material-symbols-outlined text-on-surface-variant">close</span>
</button>
</header>
<!-- Scrollable Content -->
<div class="flex-1 overflow-y-auto custom-scrollbar p-xl">
<form class="space-y-xl" id="product-form">
<!-- Basic Information Section -->
<section class="space-y-lg">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">info</span>
<h2 class="font-headline-md text-headline-md text-on-surface">Basic Information</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<!-- Name -->
<div class="space-y-xs">
<label class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Product Name *</label>
<input class="w-full px-md py-sm rounded-lg border border-outline-variant bg-surface-container-lowest font-body-md text-body-md input-focus-ring border-error" placeholder="e.g. Premium Leather Sneakers" required="" type="text">
<span class="text-error font-label-md text-[10px]">Product name is required</span>
</div>
<!-- Slug -->
<div class="space-y-xs">
<label class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Slug *</label>
<div class="relative">
<span class="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant/40 font-code text-code">/products/</span>
<input class="w-full pl-[84px] pr-md py-sm rounded-lg border border-outline-variant bg-surface-container-lowest font-body-md text-body-md input-focus-ring border-error" placeholder="premium-leather-sneakers" required="" type="text">
</div>
<span class="text-error font-label-md text-[10px]">Slug must be unique and is required</span>
</div>
</div>
<!-- Description -->
<div class="space-y-xs">
<label class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Description</label>
<textarea class="w-full px-md py-sm rounded-lg border border-outline-variant bg-surface-container-lowest font-body-md text-body-md input-focus-ring" placeholder="Describe the material, features, and key benefits..." rows="4"></textarea>
</div>
</section>
<hr class="border-outline-variant">
<!-- Pricing & Specs Section -->
<section class="space-y-lg">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">payments</span>
<h2 class="font-headline-md text-headline-md text-on-surface">Pricing &amp; Logistics</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<!-- Price -->
<div class="space-y-xs">
<label class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Price (IDR) *</label>
<div class="relative">
<span class="absolute left-md top-1/2 -translate-y-1/2 text-on-surface font-semibold font-body-md">Rp</span>
<input class="w-full pl-[40px] pr-md py-sm rounded-lg border border-outline-variant bg-surface-container-lowest font-body-md text-body-md input-focus-ring border-error" placeholder="0" required="" type="number">
</div>
<span class="text-error font-label-md text-[10px]">Price cannot be zero</span>
</div>
<!-- Weight -->
<div class="space-y-xs">
<label class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Weight (Gram)</label>
<div class="relative">
<input class="w-full pl-md pr-[54px] py-sm rounded-lg border border-outline-variant bg-surface-container-lowest font-body-md text-body-md input-focus-ring" placeholder="500" type="number">
<span class="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant font-label-md">gram</span>
</div>
</div>
</div>
</section>
<hr class="border-outline-variant">
<!-- Media Section -->
<section class="space-y-lg">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">image</span>
<h2 class="font-headline-md text-headline-md text-on-surface">Product Images *</h2>
</div>
<div class="space-y-md"><div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-sm"><div class="aspect-square rounded-xl border-2 border-dashed border-error bg-error-container/10 flex flex-col items-center justify-center gap-xs text-error shrink-0"><span class="material-symbols-outlined text-[24px]">photo_camera</span><span class="font-label-md text-[10px]">Required</span></div><div class="aspect-square rounded-xl border border-outline-variant bg-surface-container-low flex items-center justify-center text-on-surface-variant/40"><span class="material-symbols-outlined">add</span></div><div class="aspect-square rounded-xl border border-outline-variant bg-surface-container-low flex items-center justify-center text-on-surface-variant/40"><span class="material-symbols-outlined">add</span></div><div class="aspect-square rounded-xl border border-outline-variant bg-surface-container-low flex items-center justify-center text-on-surface-variant/40"><span class="material-symbols-outlined">add</span></div><div class="aspect-square rounded-xl border border-outline-variant bg-surface-container-low flex items-center justify-center text-on-surface-variant/40"><span class="material-symbols-outlined">add</span></div></div><div class="flex flex-col md:flex-row md:items-center justify-between gap-md"><div class="flex gap-sm"><button class="px-md py-sm bg-primary text-on-primary rounded-lg font-label-md flex items-center gap-sm transition-transform active:scale-95 shadow-sm" type="button"><span class="material-symbols-outlined text-body-md">upload</span>Upload Images</button><button class="px-md py-sm border border-outline text-on-surface rounded-lg font-label-md transition-colors hover:bg-surface-container-high" type="button">Browse Library</button></div><div class="text-right"><p class="font-label-md text-primary font-semibold">Up to 5 images</p><p class="font-label-md text-on-surface-variant">JPG, PNG, WEBP (Max 2MB each)</p></div></div></div>
</section>
<hr class="border-outline-variant">
<!-- Variants Section -->
<section class="space-y-lg">
<div class="flex items-center justify-between">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">layers</span>
<h2 class="font-headline-md text-headline-md text-on-surface">Product Variants</h2>
</div>
<button class="text-primary font-label-md flex items-center gap-xs hover:underline" type="button">
<span class="material-symbols-outlined text-body-md">add_circle</span>
                                Add Variant Type
                            </button>
</div>
<!-- Variant Rows Container -->
<div class="space-y-md" id="variants-container">
<!-- Variant 1 -->
<div class="p-md rounded-xl border border-outline-variant bg-surface-container-low flex flex-col gap-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center cursor-move">
<span class="material-symbols-outlined text-on-surface-variant">drag_indicator</span>
</div>
<input class="bg-transparent border-none font-headline-md text-on-surface focus:ring-0 p-0 w-32" type="text" value="Color">
</div>
<button class="text-error hover:bg-error-container/20 p-sm rounded-full transition-colors" type="button">
<span class="material-symbols-outlined">delete</span>
</button>
</div>
<div class="flex flex-wrap gap-sm items-center">
<span class="px-md py-sm bg-surface-container-highest rounded-full font-body-md text-on-surface flex items-center gap-sm">
                                        Red
                                        <button class="material-symbols-outlined text-on-surface-variant text-body-md">close</button>
</span>
<span class="px-md py-sm bg-surface-container-highest rounded-full font-body-md text-on-surface flex items-center gap-sm">
                                        Blue
                                        <button class="material-symbols-outlined text-on-surface-variant text-body-md">close</button>
</span>
<span class="px-md py-sm bg-surface-container-highest rounded-full font-body-md text-on-surface flex items-center gap-sm">
                                        Midnight Green
                                        <button class="material-symbols-outlined text-on-surface-variant text-body-md">close</button>
</span>
<div class="relative">
<input class="h-9 px-md py-0 rounded-full border border-dashed border-outline font-body-md text-body-md bg-transparent w-32 focus:w-48 transition-all input-focus-ring" placeholder="Add option..." type="text">
</div>
</div>
</div>
<!-- Variant 2 -->
<div class="p-md rounded-xl border border-outline-variant bg-surface-container-low flex flex-col gap-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-md">
<div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface-variant">drag_indicator</span>
</div>
<input class="bg-transparent border-none font-headline-md text-on-surface focus:ring-0 p-0 w-32" type="text" value="Size">
</div>
<button class="text-error hover:bg-error-container/20 p-sm rounded-full transition-colors" type="button">
<span class="material-symbols-outlined">delete</span>
</button>
</div>
<div class="flex flex-wrap gap-sm items-center">
<span class="px-md py-sm bg-surface-container-highest rounded-full font-body-md text-on-surface flex items-center gap-sm">
                                        Small
                                        <button class="material-symbols-outlined text-on-surface-variant text-body-md">close</button>
</span>
<span class="px-md py-sm bg-surface-container-highest rounded-full font-body-md text-on-surface flex items-center gap-sm">
                                        Large
                                        <button class="material-symbols-outlined text-on-surface-variant text-body-md">close</button>
</span>
<div class="relative">
<input class="h-9 px-md py-0 rounded-full border border-dashed border-outline font-body-md text-body-md bg-transparent w-32 focus:w-48 transition-all input-focus-ring" placeholder="Add option..." type="text">
</div>
</div>
</div>
</div>
</section>
</form>
</div>
<!-- Footer Actions -->
<footer class="px-xl py-lg border-t border-outline-variant bg-surface-container flex items-center justify-end gap-md">
<button class="px-xl py-md text-on-surface-variant font-label-md hover:bg-surface-container-high rounded-lg transition-colors" onclick="closeModal()" type="button">
                    Cancel
                </button>
<button class="px-2xl py-md bg-primary text-on-primary rounded-lg font-headline-md shadow-md hover:brightness-110 transition-all active:scale-95 flex items-center gap-sm" form="product-form" type="submit">
                    Create Product
                </button>
</footer>
</div>
</div>
<script>
        function closeModal() {
            const modal = document.getElementById('modal-overlay');
            modal.classList.add('opacity-0', 'scale-95');
            modal.classList.remove('opacity-100', 'scale-100');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }

        // Simple form validation visual toggle simulation
        document.getElementById('product-form').addEventListener('submit', (e) => {
            e.preventDefault();
            // Typically would perform actual validation logic here
            alert('Validating and submitting product data...');
        });

        // Add Variant Interaction (Demo)
        const addVariantBtn = document.querySelector('button[type="button"].text-primary');
        addVariantBtn?.addEventListener('click', () => {
            const container = document.getElementById('variants-container');
            const newRow = document.createElement('div');
            newRow.className = "p-md rounded-xl border border-outline-variant bg-surface-container-low flex flex-col gap-md animate-in slide-in-from-top-4 duration-300";
            newRow.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-md">
                        <div class="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                            <span class="material-symbols-outlined text-on-surface-variant">drag_indicator</span>
                        </div>
                        <input type="text" placeholder="Variant Name" class="bg-transparent border-none font-headline-md text-on-surface focus:ring-0 p-0 w-32">
                    </div>
                    <button type="button" class="text-error hover:bg-error-container/20 p-sm rounded-full transition-colors" onclick="this.closest('.animate-in').remove()">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
                <div class="flex flex-wrap gap-sm items-center">
                    <input type="text" placeholder="Add option..." class="h-9 px-md py-0 rounded-full border border-dashed border-outline font-body-md text-body-md bg-transparent w-32 focus:w-48 transition-all input-focus-ring">
                </div>
            `;
            container.appendChild(newRow);
        });
    </script>


</body></html>

#### 3. Halaman View Detail & Edit Product
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>InvTrack - Product Detail</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&amp;family=JetBrains+Mono&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface-container-low": "#f1f4f3",
                    "on-surface": "#181c1c",
                    "primary-fixed-dim": "#80d5cb",
                    "on-surface-variant": "#3e4947",
                    "surface-container-highest": "#e0e3e1",
                    "on-secondary-fixed": "#00201d",
                    "secondary-container": "#86f2e4",
                    "primary-container": "#0f766e",
                    "secondary": "#006a61",
                    "primary": "#005c55",
                    "on-primary-fixed-variant": "#00504a",
                    "inverse-on-surface": "#eef1f0",
                    "on-tertiary": "#ffffff",
                    "tertiary": "#7f4025",
                    "on-primary-fixed": "#00201d",
                    "tertiary-container": "#9c573a",
                    "surface": "#f7faf8",
                    "on-primary": "#ffffff",
                    "surface-variant": "#e0e3e1",
                    "surface-tint": "#006a63",
                    "outline-variant": "#bdc9c6",
                    "on-primary-container": "#a3faef",
                    "background": "#f7faf8",
                    "error": "#ba1a1a",
                    "surface-bright": "#f7faf8",
                    "surface-container-high": "#e5e9e7",
                    "on-background": "#181c1c",
                    "primary-fixed": "#9cf2e8",
                    "secondary-fixed-dim": "#6bd8cb",
                    "surface-container-lowest": "#ffffff",
                    "on-tertiary-container": "#ffe5db",
                    "on-error-container": "#93000a",
                    "on-tertiary-fixed-variant": "#72361b",
                    "surface-container": "#ebefed",
                    "secondary-fixed": "#89f5e7",
                    "inverse-surface": "#2d3130",
                    "surface-dim": "#d7dbd9",
                    "on-secondary": "#ffffff",
                    "on-error": "#ffffff",
                    "on-tertiary-fixed": "#370e00",
                    "on-secondary-container": "#006f66",
                    "outline": "#6e7977",
                    "tertiary-fixed-dim": "#ffb598",
                    "tertiary-fixed": "#ffdbce",
                    "error-container": "#ffdad6",
                    "inverse-primary": "#80d5cb",
                    "on-secondary-fixed-variant": "#005049"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "lg": "1.5rem",
                    "md": "1rem",
                    "margin": "32px",
                    "base": "4px",
                    "sm": "0.5rem",
                    "gutter": "24px",
                    "xl": "2rem",
                    "max_width": "1440px",
                    "xs": "0.25rem",
                    "2xl": "3rem"
            },
            "fontFamily": {
                    "headline-lg-mobile": ["Hanken Grotesk"],
                    "display": ["Hanken Grotesk"],
                    "headline-lg": ["Hanken Grotesk"],
                    "headline-md": ["Hanken Grotesk"],
                    "body-lg": ["Hanken Grotesk"],
                    "body-md": ["Hanken Grotesk"],
                    "label-md": ["Hanken Grotesk"],
                    "code": ["JetBrains Mono"]
            },
            "fontSize": {
                    "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "display": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "headline-md": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                    "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600"}],
                    "code": ["13px", {"lineHeight": "20px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(189, 201, 198, 0.4);
        }
    </style>
</head>
<body class="bg-surface font-body-md text-on-surface min-h-screen">
<!-- TopNavBar -->
<nav class="bg-surface/80 dark:bg-surface-dim/80 w-full sticky top-0 z-40 backdrop-blur-md border-b border-outline-variant dark:border-outline">
<div class="flex justify-between items-center px-lg py-md w-full max-w-max_width mx-auto">
<div class="flex items-center gap-xl">
<span class="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">InvTrack</span>
<div class="hidden md:flex gap-lg items-center">
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="#">Overview</a>
<a class="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary transition-colors duration-200 font-body-md text-body-md" href="#">Products</a>
<a class="text-on-surface-variant dark:text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md text-body-md" href="#">Settings</a>
</div>
</div>
<div class="flex items-center gap-md">
<button class="p-sm text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors active:scale-95">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="p-sm text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors active:scale-95">
<span class="material-symbols-outlined">help</span>
</button>
<div class="h-8 w-8 rounded-full overflow-hidden border border-outline-variant">
<img class="w-full h-full object-cover" data-alt="A professional studio headshot of a mid-career inventory manager with a friendly expression. The lighting is soft and corporate, matching a light-mode UI aesthetic. The background is a clean, out-of-focus modern office environment with neutral tones and teal accents that complement the primary brand color." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqFkm8kXLmU_WcaZVox5dNkRXCgdsEnWOJ2E5IEUArFGHGXudQV8KB_yTPndEvXFmXXxZcXdFo4sh-fnekhy3_ki1FmZEz6oP_rLeNY9iMbl9uOQVbP6zJlWBZGk8KhV_BBzWZuI7AuKTpTMr7EL1poqWShgnejFaJxWbHKVReSo16DHtrY1Vr27DJGzarSvG2r1Nj5FyVwC1nsW1nKKjcRh09CehRZpyO53MYg2DRb2PEFOQ1HwQFfIEjhHk6R590wEWahHTCjMU"/>
</div>
</div>
</div>
</nav>
<!-- Sidebar (Hidden on mobile) -->
<aside class="hidden lg:flex fixed left-0 top-[72px] h-[calc(100vh-72px)] w-[240px] flex-col bg-surface-container-lowest dark:bg-surface-container-low p-md gap-base border-r border-outline-variant dark:border-outline z-30">
<div class="flex items-center gap-sm px-sm py-md">
<div class="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
<span class="material-symbols-outlined">inventory_2</span>
</div>
<div>
<p class="font-label-md text-label-md text-primary font-bold">Inventory Pro</p>
<p class="text-[10px] text-on-surface-variant uppercase tracking-wider">Enterprise Tier</p>
</div>
</div>
<nav class="flex-1 space-y-1 mt-md">
<a class="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="font-label-md text-label-md">Overview</span>
</a>
<a class="flex items-center gap-sm px-md py-sm bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container font-semibold rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined">inventory_2</span>
<span class="font-label-md text-label-md">Products</span>
</a>
<a class="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="font-label-md text-label-md">Settings</span>
</a>
</nav>
<div class="mt-auto border-t border-outline-variant pt-md space-y-1">
<a class="flex items-center gap-sm px-md py-sm text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined">contact_support</span>
<span class="font-label-md text-label-md">Support</span>
</a>
<a class="flex items-center gap-sm px-md py-sm text-error hover:bg-error-container/20 rounded-lg transition-all duration-200" href="#">
<span class="material-symbols-outlined">logout</span>
<span class="font-label-md text-label-md">Sign Out</span>
</a>
</div>
</aside>
<!-- Main Content -->
<main class="lg:ml-[240px] p-lg md:p-xl max-w-max_width mx-auto">
<!-- Breadcrumbs -->
<nav class="flex items-center gap-xs mb-lg text-on-surface-variant font-label-md text-label-md">
<a class="hover:text-primary transition-colors" href="#">Products</a>
<span class="material-symbols-outlined text-[16px]">chevron_right</span>
<span class="text-primary font-bold">Ergo-Precision Mouse X1</span>
</nav>
<!-- Header Actions -->
<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-xl">
<div>
<h1 class="font-headline-lg text-headline-lg text-on-surface mb-xs">Ergo-Precision Mouse X1</h1>
<div class="flex items-center gap-sm">
<span class="bg-secondary-container text-on-secondary-container px-sm py-xs rounded-md font-label-md text-label-md">Active Stock</span>
<span class="font-code text-code text-on-surface-variant">SKU: EP-M-X1-BLK</span>
</div>
</div>
<div class="flex gap-md">
<button class="flex items-center gap-xs px-lg py-md rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container-high transition-all active:scale-95">
<span class="material-symbols-outlined text-[20px]">edit</span>
<span class="font-label-md text-label-md">Edit Product</span>
</button>
<button class="flex items-center gap-xs px-lg py-md rounded-lg bg-error text-on-error hover:shadow-lg transition-all active:scale-95">
<span class="material-symbols-outlined text-[20px]">delete</span>
<span class="font-label-md text-label-md">Delete Product</span>
</button>
</div>
</div>
<!-- Product Grid -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-xl">
<!-- Left: Image Preview -->
<div class="lg:col-span-7 space-y-md">
<div class="glass-panel rounded-xl overflow-hidden aspect-square flex items-center justify-center p-md">
<img class="w-full h-full object-contain rounded-lg" data-alt="A high-end, studio-lit professional ergonomic computer mouse in matte black finish, centered on a pristine white background. The lighting highlights the sleek curves and premium texture of the product, following a minimalist and technical design aesthetic. Soft shadows emphasize its form and high-quality build materials." id="main-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPJiQrgTWMi_SaVQ4VOg1B1Qnl0dgD0qJ9eI3WfznFYkznngcyMhdfJlWlWINTXx1nCUz7OO2pSx6goFCpDAOlu-dC645KLDmIbRwIpSIjh8qXZASvA3De3X1xS3HcA7QgYQJYL15azq2_QJFSt2bosPQ246LoXhNpBWUyu_B6-EZ4S1PcbSB_vDMmC2OYhTzcat2_BJCwWvGw8SzL5hWV-THl8fo8NGJOUoAofU1tQEuv4U32ZIEN0Pr1fTqUHnKy3oPskCYYG1w"/>
</div>
<div class="grid grid-cols-4 gap-md">
<button class="aspect-square rounded-lg border-2 border-primary overflow-hidden hover:opacity-80 transition-opacity" onclick="document.getElementById('main-image').src='placeholder'">
<img class="w-full h-full object-cover" data-alt="Close-up detail of a premium matte black ergonomic mouse showing the precision scroll wheel and tactile buttons. High-contrast studio lighting in a light-mode palette, emphasizing the engineered quality and technical sophistication of the device." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfrzj3UpbR9ntHoAip9rInO5O9DTpipM6tkcwPDfZi8wxZ6PEpZnTwAsT6JX8xm_003ShV4kHU5o9yMMxO_hTTnMHMXqQLSCCPFE2jU0T8b9mE9dqSf7EpdEW79GOsmTVeKYfcVxiJwd2X2wQQ_kJIxjDOaiggq13QtyLuTAkIFVMfmm_p2uqNpGtorzqDXt9whHONEqx6_J_oOeWGKKRpL5lSwPHZNwQKBUEPpJIPaygYZ2QjnHUl6ZRrSgGFLYnkoCl2AXCStVA"/>
</button>
<button class="aspect-square rounded-lg border border-outline-variant overflow-hidden hover:opacity-80 transition-opacity" onclick="document.getElementById('main-image').src='placeholder'">
<img class="w-full h-full object-cover" data-alt="Side profile view of a high-end ergonomic mouse demonstrating its anatomical curvature and thumb rest. Pure white studio background with soft ambient shadows, maintaining the minimalist and functional aesthetic of the brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj0E7arAHRdjzlMratJ-POeblyJQKTmeq0aSEELMrWXc0xWvua695qglUzikPRHdRX6Kf9iwcfXsPmV3d_M2Ujvlf5uknZKSssyYNEpNBt5hahisbJZg6acomXe-dszNnwcZkCWCv19pJaQz24s5LndCsL2u4TNUfXtl6kHRaORI6yRbEWj1aJQY_wkMgfK5pYvIzi14WZEKbvCfCrMrPw1o37_R6vgDOHAxOxY2PjtzvxuSeyJ33Z1bJOsMipDbjHFiElKYwf5_8"/>
</button>
<button class="aspect-square rounded-lg border border-outline-variant overflow-hidden hover:opacity-80 transition-opacity" onclick="document.getElementById('main-image').src='placeholder'">
<img class="w-full h-full object-cover" data-alt="The Ergo-Precision Mouse X1 in a modern workspace setting, resting on a clean gray desk alongside a high-end mechanical keyboard. Professional workplace photography with a bright, airy atmosphere and shallow depth of field." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAERtl2tx2RvNfvFcCPOCr8YcADIil4uPCnGw7uQTj5tMVEJicIZbzBxIymPcKtuHVGycb8cjS_FzOUiwyGZBvwRIHOaKiQi2i5f1b01XU6mwv4GHfyRGg_wL4fw3CUMEe3dI8XUUHpdtWNXXfBf7FqdaDSxnhQKpXkCwcZRlUqUwYiRM3lj1ODw1sYUNG8DxIFATrw4EKDCDP6Xe5qSDmVEJ_eSUQktoGBQeBBGokXe_i-KnHP7BSj6xThGAHq46eRF5j35lpJTJU"/>
</button>
<div class="aspect-square rounded-lg border border-outline-variant bg-surface-container flex flex-col items-center justify-center text-on-surface-variant cursor-pointer hover:bg-surface-container-high transition-colors">
<span class="material-symbols-outlined">add_a_photo</span>
<span class="font-label-md text-label-md mt-xs">Add</span>
</div>
</div>
</div>
<!-- Right: Product Info -->
<div class="lg:col-span-5 space-y-xl">
<!-- Pricing & Key Specs -->
<section class="glass-panel p-xl rounded-xl space-y-lg">
<div>
<p class="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest mb-xs">MSRP</p>
<h2 class="font-display text-display text-primary">$129.00</h2>
</div>
<div class="grid grid-cols-2 gap-lg border-t border-outline-variant pt-lg">
<div>
<p class="text-on-surface-variant font-label-md text-label-md mb-xs">Weight</p>
<p class="font-headline-md text-headline-md text-on-surface">82g</p>
</div>
<div>
<p class="text-on-surface-variant font-label-md text-label-md mb-xs">Slug</p>
<p class="font-code text-code text-on-surface bg-surface-container px-sm py-xs rounded">ergo-mouse-x1</p>
</div>
</div>
</section>
<!-- Variants -->
<section class="space-y-lg">
<div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-md">Color</h3>
<div class="flex gap-md">
<button class="group flex items-center gap-sm px-lg py-md rounded-lg border-2 border-primary bg-primary/5 transition-all">
<span class="w-4 h-4 rounded-full bg-[#1A1A1A] border border-outline"></span>
<span class="font-label-md text-label-md text-primary">Black</span>
<span class="material-symbols-outlined text-[18px] text-primary" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</button>
<button class="group flex items-center gap-sm px-lg py-md rounded-lg border border-outline-variant hover:border-primary transition-all">
<span class="w-4 h-4 rounded-full bg-[#F5F5F5] border border-outline"></span>
<span class="font-label-md text-label-md text-on-surface-variant group-hover:text-primary">White</span>
</button>
</div>
</div>
<div>
<h3 class="font-headline-md text-headline-md text-on-surface mb-md">Size</h3>
<div class="flex flex-wrap gap-md">
<button class="px-xl py-md rounded-lg border border-outline-variant hover:border-primary transition-all font-label-md text-label-md text-on-surface-variant hover:text-primary">Small</button>
<button class="px-xl py-md rounded-lg border-2 border-primary bg-primary/5 font-label-md text-label-md text-primary">Standard</button>
<button class="px-xl py-md rounded-lg border border-outline-variant hover:border-primary transition-all font-label-md text-label-md text-on-surface-variant hover:text-primary">Large (XL)</button>
</div>
</div>
</section>
<!-- Description -->
<section class="space-y-md">
<h3 class="font-headline-md text-headline-md text-on-surface">Description</h3>
<p class="text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
                        Engineered for the modern professional, the Ergo-Precision Mouse X1 combines high-performance optical tracking with a medically-vetted ergonomic design. Featuring a unique thumb-sculpted rest and silent-actuation switches, it minimizes repetitive strain during long development or design sessions. The 26,000 DPI sensor ensures micro-precision across multiple 4K displays.
                    </p>
</section>
<!-- Metadata / Timestamps -->
<footer class="pt-xl border-t border-outline-variant">
<div class="flex flex-col gap-sm">
<div class="flex items-center gap-sm text-on-surface-variant font-label-md text-label-md">
<span class="material-symbols-outlined text-[18px]">calendar_today</span>
<span>Created At:</span>
<span class="text-on-surface font-semibold">Oct 24, 2023 · 09:42 AM</span>
</div>
<div class="flex items-center gap-sm text-on-surface-variant font-label-md text-label-md">
<span class="material-symbols-outlined text-[18px]">history</span>
<span>Last Updated:</span>
<span class="text-on-surface font-semibold">Jan 12, 2024 · 02:15 PM</span>
</div>
</div>
</footer>
</div>
</div>
<!-- Additional Details Section (Asymmetric / Modern Layout) -->
<div class="mt-2xl grid grid-cols-1 md:grid-cols-3 gap-lg">
<div class="md:col-span-1 glass-panel p-lg rounded-xl flex flex-col gap-md">
<span class="material-symbols-outlined text-primary text-[32px]">verified</span>
<h4 class="font-headline-md text-headline-md">Warranty</h4>
<p class="text-on-surface-variant text-body-md">Standard 3-year enterprise warranty covering all hardware malfunctions and manufacturing defects. Global support included.</p>
</div>
<div class="md:col-span-1 glass-panel p-lg rounded-xl flex flex-col gap-md">
<span class="material-symbols-outlined text-primary text-[32px]">package_2</span>
<h4 class="font-headline-md text-headline-md">Packaging</h4>
<p class="text-on-surface-variant text-body-md">Sustainably sourced, plastic-free industrial packaging optimized for bulk shipping and minimal environmental footprint.</p>
</div>
<div class="md:col-span-1 glass-panel p-lg rounded-xl flex flex-col gap-md">
<span class="material-symbols-outlined text-primary text-[32px]">hub</span>
<h4 class="font-headline-md text-headline-md">Connectivity</h4>
<p class="text-on-surface-variant text-body-md">Triple-mode connection: 2.4GHz Wireless, Bluetooth 5.2, and USB-C paracord charging. Multi-device pairing supported.</p>
</div>
</div>
</main>
<!-- Bottom Nav for Mobile -->
<nav class="md:hidden fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-outline-variant z-50 px-md py-sm">
<div class="flex justify-around items-center">
<a class="flex flex-col items-center gap-xs p-sm text-on-surface-variant" href="#">
<span class="material-symbols-outlined">dashboard</span>
<span class="text-[10px]">Overview</span>
</a>
<a class="flex flex-col items-center gap-xs p-sm text-primary" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">inventory_2</span>
<span class="text-[10px] font-bold">Products</span>
</a>
<a class="flex flex-col items-center gap-xs p-sm text-on-surface-variant" href="#">
<span class="material-symbols-outlined">settings</span>
<span class="text-[10px]">Settings</span>
</a>
</div>
</nav>
<script>
        // Micro-interaction for variant selection
        document.querySelectorAll('.variant-chip').forEach(chip => {
            chip.addEventListener('click', function() {
                // Remove active classes from siblings
                this.parentElement.querySelectorAll('.variant-chip').forEach(el => {
                    el.classList.remove('border-primary', 'bg-primary/5', 'text-primary');
                    el.classList.add('border-outline-variant', 'text-on-surface-variant');
                });
                // Add active classes to selected
                this.classList.add('border-primary', 'bg-primary/5', 'text-primary');
                this.classList.remove('border-outline-variant', 'text-on-surface-variant');
            });
        });

        // Simple Fade-in animation on load
        document.addEventListener('DOMContentLoaded', () => {
            const main = document.querySelector('main');
            main.style.opacity = '0';
            main.style.transform = 'translateY(10px)';
            main.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            
            setTimeout(() => {
                main.style.opacity = '1';
                main.style.transform = 'translateY(0)';
            }, 100);
        });
    </script>
</body></html>

---

### IMPLEMENTASI KODE YANG DIMINTA
Tolong buatkan file-file berikut secara efisien dan modular:

1. `types/product.ts`: Definisikan interface TypeScript lengkap untuk `Product`, `ProductVariant`, `CreateProductPayload`, dan `UpdateProductPayload` berdasarkan dokumentasi API.
2. `hooks/useProducts.ts` (atau API Service): Menyediakan fungsi/hooks pembungkus Axios untuk `getProducts()`, `getProductById()`, `createProduct()`, `updateProduct()`, dan `deleteProduct()`. Pastikan penanganan token otomatis menggunakan instance Axios yang sudah ada.
3. File Komponen React Terintegrasi:
   - Komponen Halaman Utama Produk (dengan aksi Delete & pemicu Modal/Navigasi).
   - Komponen Modal Create Product (termasuk handling dinamis untuk input varian produk).
   - Komponen Halaman View & Edit Product (mengisi form otomatis berdasarkan data produk yang sudah ada).

Mulai implementasikan sekarang secara langsung, padat, dan mandiri tanpa sub-agent.