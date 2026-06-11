# Dokumentasi Simplifikasi Related Post & Baca Juga

**Berdasarkan:** Audit performa template Kalinz 2026 — poin **B. Related post script yang terlalu berat**  
**File target:** `my-templates/main-template.xml` + `my-templates/components/default-markup.xml`

---

## Ringkasan masalah

Template saat ini memiliki **dua sistem related content** yang berjalan bersamaan:

| Sistem | Lokasi | Method | Beban |
|--------|--------|--------|-------|
| **Related Post** | `default-markup.xml` → `relatedPost` + `relatedPostScript` | Feed JSONP per label + random start-index + shuffle array | **Berat** — 2 request feed, random logic, parsing entry |
| **Baca Juga** | `default-markup.xml` → `blogPostBody` (inline script) | Feed JSONP per semua label post | **Cukup berat** — 1 request per label, inline callback |

Keduanya:
- melakukan request JSONP ke Blogger feed
- memakai callback function global
- menggunakan random selection yang tidak relevan dengan konteks
- menambah JavaScript inline di halaman post
- jumlah total artikel yang di-fetch bisa besar (related post: 4+1, baca juga: 5 per label)

---

## Blok kode yang perlu dimodifikasi

### 1. Related Post Script — `relatedPost` includable

**Lokasi:** `default-markup.xml` — includable `relatedPost`

```xml
<b:includable id='relatedPost'>
    <div id='ms-related-post' />
    <script>
        var postLabels = [...];
        var relatedConfig = { ... };
    </script>
    <div id='ms-matched-content' />
</b:includable>
```

#### Yang perlu diubah:

| Baris | Sekarang | Menjadi |
|-------|----------|---------|
| `postLabels` array | Ambil semua label post | Tetap dipertahankan (dibutuhkan) |
| `relatedConfig.relatedTitleText` | "Artikel Terkait" | Bisa dipertahankan |

#### Blok markup

Pertahankan: `<div id='ms-related-post' />` (target container)  
Pertahankan: `<script>` dengan `postLabels` dan `relatedConfig`  
Hapus atau pindahkan: `<div id='ms-matched-content' />` (ini untuk matched content iklan, bukan related post)

---

### 2. Related Post Script — `relatedPostScript` includable (target utama)

**Lokasi:** `default-markup.xml` — includable `relatedPostScript`

Ini adalah blok inline yang paling berat. Sekarang berisi ~50 baris JavaScript minified dengan:

```
msRelatedPosts()       → callback parsing feed, membangun HTML
msRandomIndex()        → hitung start-index random, panggil feed
optionLinkMagz()       → baca konfigurasi
feed JSONP request     → /feeds/posts/summary + label + start-index random + callback
```

#### Detail yang perlu diubah:

**a. Konfigurasi (override dari template-settings)**

Sekarang:
```javascript
jumlahRelatedPosts: 4
relatedPostsThumb: false
```

Menjadi:
```javascript
jumlahRelatedPosts: 3    // turun dari 4 ke 3
relatedPostsThumb: false  // tetap (tidak pakai thumbnail)
```

**b. Cara memilih label**

Sekarang — shuffle array postLabels lalu ambil index [0]:
```javascript
var s = "/-/"+r(postLabels)[0];  // r() adalah shuffle function
```

Masalah: shuffle random setiap load → tidak deterministik, bisa menampilkan related post dari label yang tidak relevan.

Menjadi — gunakan label pertama (paling relevan, karena biasanya label utama ditulis pertama):
```javascript
var s = postLabels.length > 0 ? "/-/"+postLabels[0] : "";
```

**c. Start-index random**

Sekarang:
```javascript
msRandomIndex = function(t) {
    var r = t.feed.openSearch$totalResults.$t - (jumlahRelatedPosts+1);
    var d = r > 1 ? 1 + Math.floor(Math.random() * r) : 1;
    // panggil feed dengan start-index = d
};
```

Ini membuat 1 request feed summary + 1 request feed for entries = **2 request**.

Menjadi:
- Hapus `msRandomIndex` function
- Panggil feed langsung tanpa random start-index
- Cukup 1 request: `/feeds/posts/default/-/LABEL?alt=json-in-script&orderby=updated&max-results=3&callback=msRelatedPosts`

**d. Batasi artikel**

Sekarang:
```javascript
for (var B = 0; B < a.jumlahRelatedPosts && B < f.length; B++)
```

Dengan `jumlahRelatedPosts: 3`, hanya 3 artikel yang ditampilkan.

**e. Parsing thumbnail**

Sekarang ada logika parsing thumbnail (`media$thumbnail`, regex `<img`, dll). Karena `relatedPostsThumb: false`, bagian ini dieksekusi tapi tidak dipakai di render (karena `1==a.relatedPostsThumb` kondisi false).

Hapus: seluruh logika parsing thumbnail dan `relatedPostsNoThumbImg`.

---

### 3. "Baca Juga" script — inline di `blogPostBody`

**Lokasi:** `default-markup.xml` — includable `blogPostBody`

```html
<div id='baca-juga' />
<script>
// bacaJuga callback + showBacaJuga function
</script>
<b:loop values='data:post.labels' var='label'>
    <script expr:src='...' />
</b:loop>
<script>showBacaJuga("...");</script>
```

#### Masalah:
- Loop semua label → request feed untuk **setiap label** (bisa 3–5 request)
- Random selection dari hasil feed
- Logika posisi sisip (cari `r[t]` = 50% panjang artikel)

#### Rekomendasi:

| Aspek | Sekarang | Menjadi |
|-------|----------|---------|
| Jumlah request | 1 per label → bisa 3–5 request | 1 request (label pertama saja) |
| `max-results` | 5 | 4 (cukup) |
| Random selection | Ya (dari semua hasil) | No (ambil 3 pertama setelah exclude current) |
| Label selection | Loop semua label | Label pertama (paling relevan) |
| Posisi sisip | 50% panjang artikel | 70% panjang artikel (agar tidak mengganggu awal baca) |

#### Blok spesifik:

**Sebelum (loop semua label):**
```xml
<b:loop values='data:post.labels' var='label'>
    <script expr:src='...' />
</b:loop>
```

**Sesudah (label pertama saja):**
```html
<b:if cond='data:post.labels'>
    <b:loop values='data:post.labels' var='label'>
        <b:if cond='data:label.isFirst'>
            <script expr:src='...' />
        </b:if>
    </b:loop>
</b:if>
```

**Sebelum (di dalam showBacaJuga):**
```javascript
var c = {
    bacaJuga: true,
    jumlahBacaJuga: 3,
    judulBacaJuga: "Baca Juga"
};
optionLinkMagz(c);
```

**Sesudah:**
```javascript
var c = {
    bacaJuga: true,
    jumlahBacaJuga: 3,    // tetap 3
    judulBacaJuga: "Baca Juga"
};
optionLinkMagz(c);
```
(Nilai ini sudah sesuai, hanya jumlah request yang dikurangi)

---

### 4. Konfigurasi di template-settings widget

**Lokasi:** `main-template.xml` — widget HTML70 `template-settings`

Sekarang (baris 1817-1819):
```javascript
relatedPosts : true,
jumlahRelatedPosts: 4,
relatedPostsThumb: false,
```

Menjadi:
```javascript
relatedPosts : true,
jumlahRelatedPosts: 3,
relatedPostsThumb: false,
```

---

## Ringkasan perubahan per file

### File: `main-template.xml`

| Baris | Perubahan |
|-------|-----------|
| 1818 | `jumlahRelatedPosts: 4` → `jumlahRelatedPosts: 3` |

### File: `components/default-markup.xml`

| Includable | Perubahan |
|------------|-----------|
| `defaultPostPage` | Tidak ada perubahan (masih include `relatedPost` + `relatedPostScript`) |
| `relatedPost` | Hapus `<div id='ms-matched-content' />` (pindahkan ke lain tempat atau hapus) |
| `relatedPostScript` | **Rewriting besar:** hapus random start-index, hapus shuffle, hapus parsing thumbnail, sederhanakan callback |
| `blogPostBody` | Loop label → jadi hanya label pertama, kurangi max-results ke 4 |

---

## Kode terkait di CSS

Periksa apakah ada CSS khusus untuk related post. Jika ada, bisa dipertahankan atau disederhanakan bersamaan.

---

## Catatan penting

1. **Kompatibilitas mundur:** Jika related post dimatikan (`relatedPosts: false`), container `<div id='ms-related-post' />` tetap ada tapi kosong. Ini aman.

2. **Matched content:** `<div id='ms-matched-content' />` bukan bagian dari related post — itu untuk iklan matched content. Pemisahan sudah benar.

3. **Defer/Lazy:** Related post script di `relatedPostScript` dijalankan langsung (tidak pakai `Defer()`). Untuk optimasi lebih lanjut, bisa dibungkus dengan `Defer(function(){ ... }, 0, true)` agar tidak blocking.

4. **Baca Juga vs Related Post:** Keduanya menampilkan artikel terkait, tapi:
   - Related Post: di **bawah** artikel (setelah share button)
   - Baca Juga: di **dalam** artikel (sisip di tengah)
   
   Idealnya cukup satu saja. Jika ingin maksimal simplify, matikan Baca Juga dan pertahankan Related Post yang sudah di-simplify.

---

## Dampak performa

| Metrik | Sebelum | Sesudah (estimasi) |
|--------|---------|-------------------|
| Jumlah request feed | 3–6 (related: 2 + baca juga: 1–4) | 2 (related: 1 + baca juga: 1) |
| Total JS inline | ~2 KB minified | ~0.8 KB minified |
| Random logic | Ya (2x shuffle + random index) | Tidak |
| Parsing thumbnail | Ya (regex `<img`) | Tidak |
