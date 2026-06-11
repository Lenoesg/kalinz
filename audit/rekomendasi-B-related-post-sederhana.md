# Rekomendasi Audit B: Related Post Script — Simplifikasi

**Berdasarkan:** `template-performance-audit-2026.md` → poin **B. Related post script yang terlalu berat**  
**Dokumentasi terkait:** `my-templates/dokumentasi-related-post-simplify.md`  
**File target:** `template.xml` (blok `relatedPost`, `relatedPostScript`, `blogPostBody`)  
**Tanggal:** 11 Juni 2026

---

## Daftar Isi

1. [Ringkasan Masalah](#1-ringkasan-masalah)
2. [Arsitektur Saat Ini](#2-arsitektur-saat-ini)
3. [Blok 1: Konfigurasi `template-settings`](#3-blok-1-konfigurasi-template-settings)
4. [Blok 2: `relatedPost` includable](#4-blok-2-relatedpost-includable)
5. [Blok 3: `relatedPostScript` includable — TARGET UTAMA](#5-blok-3-relatedpostscript-includable--target-utama)
6. [Blok 4: `blogPostBody` — Baca Juga](#6-blok-4-blogpostbody--baca-juga)
7. [Blok 5: CSS Related Post](#7-blok-5-css-related-post)
8. [Ringkasan Semua Perubahan](#8-ringkasan-semua-perubahan)
9. [Dampak Performa](#9-dampak-performa)
10. [Panduan Implementasi Bertahap](#10-panduan-implementasi-bertahap)

---

## 1. Ringkasan Masalah

Template saat ini memiliki **dua sistem related content** yang berjalan bersamaan di halaman post:

| Sistem | Method | Request Feed | Random Logic | Total Baris JS |
|--------|--------|-------------|-------------|----------------|
| **Related Post** (bawah artikel) | Feed JSONP per label + random start-index + shuffle | **2–3 request** | ✅ Ya (shuffle label + random start-index) | ~50 baris minified |
| **Baca Juga** (di tengah artikel) | Feed JSONP per **semua** label post | **1–5 request** (per label) | ✅ Ya (shuffle + random selection) | ~30 baris minified |

**Total:** 3–8 request feed tambahan + ~80 baris JS inline + logika random yang tidak relevan dengan konteks.

### Rekomendasi audit (point B):
- ✅ batasi maksimal 3–4 artikel
- ✅ gunakan related post berbasis label yang paling dekat
- ✅ gunakan versi yang lebih sederhana
- ✅ hindari banyak parsing feed jika halaman sudah panjang

---

## 2. Arsitektur Saat Ini

### Alur Related Post (sekarang):

```
User membuka halaman post
  → includable relatedPost di-render
    → buat <div id="ms-related-post">
    → ambil postLabels dari data:post.labels
    → set relatedConfig (jumlahRelatedPosts: 4, relatedPostsThumb: false)
  → includable relatedPostScript di-render
    → shuffle(array postLabels) → ambil index [0]
    → panggil msRandomIndex(label)
      → request #1: /feeds/posts/summary/-/LABEL?alt=json-in-script&max-results=0
        → parsing totalResults
        → hitung start-index random: 1 + Math.random() * (total - 5)
      → request #2: /feeds/posts/default/-/LABEL?alt=json-in-script&start-index=RANDOM&max-results=4
    → callback msRelatedPosts()
      → parsing entry → thumbnail (regex <img) → title → link
      → render 4 artikel (acak dari hasil)
  → <div id="ms-matched-content"> (iklan, bukan related)
```

### Alur Baca Juga (sekarang):

```
blogPostBody di-render
  → <div id="baca-juga">
  → LOOP data:post.labels → untuk SETIAP label:
      → request: /feeds/posts/default/-/LABEL?alt=json-in-script&callback=bacaJuga&max-results=5
  → callback bacaJuga(label, data):
      → simpan entries ke array global
  → setelah semua request selesai → showBacaJuga():
      → pilih 3 random dari array
      → sisipkan HTML ke tengah artikel (50% panjang)
```

---

## 3. Blok 1: Konfigurasi `template-settings`

**Lokasi di template.xml:** sekitar baris 1817-1819 (section `template-settings`)

### SEBELUM:

```javascript
var linkMagzSetting = {
    // ... setting lain ...
    relatedPosts : true,
    jumlahRelatedPosts: 4,
    relatedPostsThumb: false,
    // ... setting lain ...
    bacaJuga: true,
    jumlahBacaJuga: 3,
    judulBacaJuga: "Baca Juga",
    // ...
};
```

### SESUDAH:

```javascript
var linkMagzSetting = {
    // ... setting lain ...
    relatedPosts : true,
    jumlahRelatedPosts: 3,          // ✅ 4 → 3
    relatedPostsThumb: false,       // tetap (thumbnail tidak dipakai)
    // ... setting lain ...
    bacaJuga: true,
    jumlahBacaJuga: 3,              // tetap
    judulBacaJuga: "Baca Juga",     // tetap (bisa dipertahankan)
    // ...
};
```

**Perubahan:** hanya 1 angka — `jumlahRelatedPosts: 4` → `jumlahRelatedPosts: 3`

---

## 4. Blok 2: `relatedPost` includable

**Lokasi di template.xml:** bagian `<b:includable id='relatedPost'>`

### SEBELUM:

```xml
<b:includable id='relatedPost'>
    <div id='ms-related-post'/>
    <script>/*<![CDATA[*/
        var postLabels = <b:loop values='data:post.labels' var='label'>'<data:label.name/>',</b:loop>;
        var relatedConfig = {
            postUrl: "<data:post.url/>",
            homePage: "<data:blog.homepageUrl/>",
            relatedTitleText: "<data:messages.articleRelated/>",
        };
        var jumlahRelatedPosts = 4;  // ⚠️ hardcode, override dari linkMagzSetting
    /*]]>*/</script>
    <div id='ms-matched-content'/>  <!-- ⚠️ ini bukan related post, ini slot iklan -->
</b:includable>
```

### SESUDAH:

```xml
<b:includable id='relatedPost'>
    <div id='ms-related-post'/>
    <script>/*<![CDATA[*/
        var postLabels = <b:loop values='data:post.labels' var='label'>'<data:label.name/>',</b:loop>;
        var relatedConfig = {
            postUrl: "<data:post.url/>",
            homePage: "<data:blog.homepageUrl/>",
            relatedTitleText: "<data:messages.articleRelated/>",
        };
    /*]]>*/</script>
    <!-- ✅ ms-matched-content dipisahkan ke slot iklan terpisah -->
</b:includable>
```

**Perubahan:**
1. Hapus `var jumlahRelatedPosts = 4;` (digantikan oleh setting dari `template-settings`)
2. Hapus `<div id='ms-matched-content'/>` (pindahkan ke section iklan atau hapus jika tidak dipakai)

---

## 5. Blok 3: `relatedPostScript` includable — TARGET UTAMA

**Lokasi di template.xml:** bagian `<b:includable id='relatedPostScript'>`

Ini adalah blok paling berat. Berisi ~50 baris JavaScript minified dengan struktur:

### SEBELUM (struktur logika):

```javascript
// ⚠️ MASALAH 1: Shuffle label (random)
function r(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// ⚠️ MASALAH 2: Ambil label random dari hasil shuffle
var s = postLabels.length ? "/-/"+r(postLabels)[0] : "";

// ⚠️ MASALAH 3: Dua request feed (summary + detail)
function msRandomIndex(t) {
    jumlahRelatedPosts = jumlahRelatedPosts || 4;
    var r = t.feed.openSearch$totalResults.$t - (jumlahRelatedPosts+1);
    var d = r > 1 ? 1 + Math.floor(Math.random() * r) : 1;
    var i = document.createElement("script");
    i.src = urlFeed + "&start-index=" + d + "&max-results=" + jumlahRelatedPosts + "&callback=msRelatedPosts";
    document.getElementById("ms-related-post").appendChild(i);
}

// Request #1: dapatkan totalResults
urlFeed = ".../feeds/posts/summary" + s + "?alt=json-in-script&max-results=0";
// → callback msRandomIndex

// ⚠️ MASALAH 4: Parsing thumbnail (tidak dipakai karena relatedPostsThumb: false)
var relatedPostsNoThumbImg = "data:image/svg+xml,...";
// parsing regex <img dari entry.content
// tapi tidak di-render karena kondisi 1==a.relatedPostsThumb false

// ⚠️ MASALAH 5: Callback panjang dengan parsing entry
function msRelatedPosts(t) {
    var a = linkMagzSetting || {};
    // parsing entry → thumbnail → title → link
    // loop untuk jumlahRelatedPosts
}
```

### SESUDAH (sederhanakan):

```javascript
// ✅ Rekomendasi: Gunakan label pertama (paling relevan), bukan shuffle
var relatedLabel = postLabels.length > 0 ? postLabels[0] : "";
var feedUrl = relatedConfig.homePage.replace(/\/$/, "")
    + "/feeds/posts/default/-/" + relatedLabel
    + "?alt=json-in-script&orderby=updated"
    + "&max-results=3"
    + "&callback=msRelatedPosts";

// ✅ Hanya 1 request, tanpa random start-index
var script = document.createElement("script");
script.src = feedUrl;
document.getElementById("ms-related-post").appendChild(script);

// ✅ Callback sederhana
function msRelatedPosts(json) {
    var entries = json.feed.entry || [];
    var currentUrl = relatedConfig.postUrl;
    var html = '';
    var count = 0;
    var maxPosts = 3;

    for (var i = 0; i < entries.length && count < maxPosts; i++) {
        var entry = entries[i];
        var entryUrl = entry.link
            .filter(function(l) { return l.rel === 'alternate'; })[0]
            .href;

        // ✅ Skip artikel yang sedang dibaca
        if (entryUrl === currentUrl) continue;

        var title = entry.title.$t;
        html += '<li><a href="' + entryUrl + '">' + title + '</a></li>';
        count++;
    }

    if (html) {
        document.getElementById("ms-related-post").innerHTML =
            '<div class="related-posts-widget">'
            + '<h3>' + (relatedConfig.relatedTitleText || "Artikel Terkait") + '</h3>'
            + '<ul>' + html + '</ul>'
            + '</div>';
    }
}
```

### Detail perubahan pada `relatedPostScript`:

| Aspek | SEBELUM | SESUDAH | Alasan |
|-------|---------|---------|--------|
| **Pemilihan label** | `r(postLabels)[0]` (shuffle random) | `postLabels[0]` (label pertama) | Label pertama adalah yang paling relevan |
| **Jumlah request** | 2 (summary + detail) | **1** (langsung detail) | Hapus random start-index |
| **Parameter feed** | `start-index=random&max-results=4` | `orderby=updated&max-results=3` | Urut berdasarkan update terbaru |
| **Parsing thumbnail** | ✅ Ya (regex `<img`, `media$thumbnail`, fallback SVG) | ❌ **Dihapus total** | Tidak dipakai (`relatedPostsThumb: false`) |
| **Fungsi shuffle** | `function r(o) { ... }` | ❌ **Dihapus** | Tidak diperlukan |
| **Fungsi random index** | `function msRandomIndex(t) { ... }` | ❌ **Dihapus** | Tidak diperlukan |
| **Callback** | `msRelatedPosts(t)` ~20 baris minified | `msRelatedPosts(json)` ~15 baris bersih | Lebih sederhana, lebih cepat |
| **Output** | `<div class="related-posts">` dengan thumbnail | `<ul>` sederhana tanpa thumbnail | Loading lebih ringan |
| **Total baris JS** | ~50 baris | ~20 baris | **Turun 60%** |
| **Kompleksitas** | Tinggi (shuffle, 2 request, parsing gambar) | Rendah (1 request, simple loop) | Mudah dipelihara |

---

## 6. Blok 4: `blogPostBody` — Baca Juga

**Lokasi di template.xml:** bagian `<b:includable id='blogPostBody'>`

### SEBELUM:

```xml
<!-- Baca Juga -->
<div id='baca-juga'/>

<b:loop values='data:post.labels' var='label'>                         <!-- ⚠️ loop SEMUA label -->
    <script>
        // ⚠️ Masalah: request untuk SETIAP label (bisa 3-5 request)
    </script>
    <script expr:src='...label...&max-results=5'/>                      <!-- ⚠️ max-results: 5 -->
</b:loop>

<script>
    // ⚠️ Masalah: menunggu semua request selesai
    // ⚠️ Masalah: random selection dari semua hasil
    function showBacaJuga() {
        // pilih 3 random dari array global
        // sisip di 50% panjang artikel
    }
</script>
```

### SESUDAH:

```xml
<!-- Baca Juga (simplified) -->
<b:if cond='data:post.labels'>
    <b:loop values='data:post.labels' var='label'>
        <b:if cond='data:label.isFirst'>                                <!-- ✅ Hanya label pertama -->
            <div id='baca-juga'/>
            <script>
                var bacaJugaLabel = "<data:label.name/>";
                var bacaJugaConfig = {
                    postUrl: "<data:post.url/>",
                    blogUrl: "<data:blog.homepageUrl/>",
                    jumlahBacaJuga: 3,
                    judulBacaJuga: "Baca Juga"
                };
                // ✅ Pakai optionLinkMagz untuk override dari template-settings
                if (typeof optionLinkMagz !== 'undefined') {
                    optionLinkMagz(bacaJugaConfig);
                }
            </script>
            <script expr:src='data:blog.homepageUrl + "/feeds/posts/default/-/" + data:label.name + "?alt=json-in-script&orderby=updated&max-results=4&callback=showBacaJuga"'/>
        </b:if>
    </b:loop>
</b:if>

<script>
    // ✅ Callback sederhana, 1 function saja
    function showBacaJuga(json) {
        var entries = json.feed.entry || [];
        var currentUrl = bacaJugaConfig.postUrl;
        var html = '';
        var count = 0;
        var maxPosts = bacaJugaConfig.jumlahBacaJuga || 3;

        for (var i = 0; i < entries.length && count < maxPosts; i++) {
            var entry = entries[i];
            var entryUrl = entry.link.filter(function(l) { return l.rel === 'alternate'; })[0].href;

            // Skip artikel yang sedang dibaca
            if (entryUrl === currentUrl) continue;

            var title = entry.title.$t;
            html += '<li><a href="' + entryUrl + '">' + title + '</a></li>';
            count++;
        }

        if (html) {
            var bacaJugaHtml = '<div class="baca-juga-widget">'
                + '<h3>' + (bacaJugaConfig.judulBacaJuga || "Baca Juga") + '</h3>'
                + '<ul>' + html + '</ul>'
                + '</div>';

            // ✅ Sisip di 70% panjang artikel (agar tidak mengganggu awal baca)
            var artikelBody = document.querySelector('.post-body');
            if (artikelBody) {
                var paragraphs = artikelBody.querySelectorAll('p');
                var sisipIndex = Math.floor(paragraphs.length * 0.7);
                if (sisipIndex >= paragraphs.length) sisipIndex = Math.floor(paragraphs.length / 2);
                if (paragraphs[sisipIndex]) {
                    paragraphs[sisipIndex].insertAdjacentHTML('afterend', bacaJugaHtml);
                }
            }
        }
    }
</script>
```

### Detail perubahan pada Baca Juga:

| Aspek | SEBELUM | SESUDAH | Alasan |
|-------|---------|---------|--------|
| **Loop label** | Semua label | ✅ Hanya label pertama (`isFirst`) | Kurangi request dari 3–5 ke 1 |
| **max-results** | 5 | ✅ **4** | Kurangi parsing (cukup 4 untuk pilih 3) |
| **Random selection** | ✅ Ya (dari array global) | ❌ **Dihapus** | Ambil urutan feed (terbaru), skip current |
| **Posisi sisip** | 50% panjang artikel | ✅ **70%** panjang artikel | Tidak mengganggu awal baca |
| **Callback** | 2 function (`bacaJuga` + `showBacaJuga`) | ✅ **1 function** (`showBacaJuga`) | Sederhana, tanpa state global |
| **Jumlah request** | 3–5 | ✅ **1** | Kurang 60–80% request |

---

## 7. Blok 5: CSS Related Post

### SEBELUM (di dalam `<b:skin>`):

```css
/* Related Posts */
.related-posts-widget {
    margin: 2rem 0;
    padding: 1rem 0;
    border-top: 1px solid #e5e5e5;
    /* ... ~20 baris styling ... */
}

.related-posts-widget h3 {
    font-size: 1.125rem;
    margin-bottom: 1rem;
    /* ... ~10 baris ... */
}

.related-posts-widget .related-post-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
    /* ... ~15 baris ... */
}

.related-posts-widget .related-post-item img {
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: 4px;
    /* ... ~8 baris ... */
}
```

### SESUDAH (simplifikasi — tanpa thumbnail, list-style saja):

```css
/* Related Posts — simplified */
.related-posts-widget {
    margin: 2rem 0;
    padding: 1.25rem 0;
    border-top: 2px solid #e5e5e5;
}

.related-posts-widget h3 {
    font-size: 1.125rem;
    font-weight: 700;
    margin: 0 0 1rem;
}

.related-posts-widget ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.related-posts-widget li {
    padding: 6px 0;
    border-bottom: 1px solid #f0f0f0;
}

.related-posts-widget li:last-child {
    border-bottom: none;
}

.related-posts-widget li a {
    display: block;
    padding: 4px 0;
    line-height: 1.4;
}

/* Baca Juga — simplified (sama dengan related post) */
.baca-juga-widget {
    margin: 1.5rem 0;
    padding: 1rem 1.25rem;
    background: #f9f9f9;
    border-left: 4px solid #1a6b8a;
    border-radius: 0 6px 6px 0;
}

.baca-juga-widget h3 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
}

.baca-juga-widget ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.baca-juga-widget li {
    padding: 4px 0;
}

.baca-juga-widget li a {
    font-size: 0.9375rem;
    line-height: 1.4;
}
```

**Perubahan CSS:**
- Hapus class `.related-post-item` (tidak dipakai lagi)
- Hapus styling thumbnail gambar (`img` dalam related-post)
- Ganti display flex dengan list-style sederhana
- Tambah styling untuk `.baca-juga-widget` (agar konsisten)
- Total CSS turun dari ~50 baris → ~35 baris

---

## 8. Ringkasan Semua Perubahan

### Tabel perubahan per blok:

| # | Blok | File | Perubahan |
|---|------|------|-----------|
| 1 | `template-settings` | `template.xml` | `jumlahRelatedPosts: 4` → `3` |
| 2 | `relatedPost` includable | `template.xml` | Hapus `var jumlahRelatedPosts`, hapus `<div id='ms-matched-content'>` |
| 3 | `relatedPostScript` includable | `template.xml` | **Rewriting besar** — hapus shuffle, random-index, parsing thumbnail; 1 request langsung |
| 4 | `blogPostBody` | `template.xml` | **Rewriting besar** — loop label pertama saja, 1 request, callback sederhana |
| 5 | CSS (`<b:skin>`) | `template.xml` | Hapus styling thumbnail flex, ganti list-style sederhana; tambah styling baca-juga |

### Ringkasan kode yang dihapus:

```
DIHAPUS (Related Post):
  - function r(o)                    // shuffle array
  - function msRandomIndex(t)        // random start-index + request kedua
  - var relatedPostsNoThumbImg       // fallback SVG thumbnail
  - parsing thumbnail (media$thumbnail, regex <img, dll.)
  - <div id='ms-matched-content'>    // pindah ke slot iklan

DIHAPUS (Baca Juga):
  - Loop semua label (ganti dengan label pertama)
  - Array global untuk menyimpan entries
  - Random selection dari array
  - Fungsi callback untuk setiap label

TOTAL: ~50 baris JS + ~15 baris CSS + ~5 baris markup
```

### Ringkasan kode baru/dimodifikasi:

```
DITAMBAH/MODIFIKASI (Related Post):
  - Pilih postLabels[0] (label pertama) — 1 baris
  - 1 request feed langsung: orderby=updated&max-results=3 — 3 baris
  - Callback sederhana: msRelatedPosts — ~15 baris

DITAMBAH/MODIFIKASI (Baca Juga):
  - Kondisi isFirst untuk loop label — 2 baris markup
  - Callback tunggal: showBacaJuga — ~15 baris
  - Posisi sisip 70% — 3 baris

MODIFIKASI CSS:
  - Ganti .related-posts-widget dari flex/list-image ke list-style 
  - Tambah .baca-juga-widget styling
```

---

## 9. Dampak Performa

### Estimasi perbandingan:

| Metrik | SEBELUM | SESUDAH | Penurunan |
|--------|---------|---------|-----------|
| **Request feed Related Post** | 2 (summary + detail) | **1** | **-50%** |
| **Request feed Baca Juga** | 3–5 (per label) | **1** | **-67% s.d. -80%** |
| **Total request feed (halaman post)** | 5–7 | **2** | **-60% s.d. -71%** |
| **JS inline Related Post** | ~1.2 KB minified | ~0.5 KB minified | **-58%** |
| **JS inline Baca Juga** | ~0.8 KB minified | ~0.4 KB minified | **-50%** |
| **Total JS inline** | ~2.0 KB | ~0.9 KB | **-55%** |
| **CSS related post** | ~1.0 KB | ~0.7 KB | **-30%** |
| **Random/logic overhead** | shuffle + random-index + parsing thumbnail | **none** | **100%** |
| **Kompleksitas pemeliharaan** | Tinggi (3 fungsi, array global, 2 callback) | Rendah (1 fungsi per fitur) | **Signifikan** |

### Dampak ke user experience:

- ✅ Artikel terkait tetap muncul (3 artikel, bukan 4)
- ✅ Related post berdasarkan label paling relevan (label pertama)
- ✅ Loading lebih cepat karena hanya 2 request feed (dari 5–7)
- ✅ Tidak ada flicker/layout shift dari thumbnail yang tidak dipakai
- ✅ Baca Juga muncul di posisi yang lebih natural (~70% artikel)

---

## 10. Panduan Implementasi Bertahap

### Tahap 1: Konfigurasi (1 menit)

1. Cari `jumlahRelatedPosts: 4` di section `template-settings`
2. Ubah menjadi `jumlahRelatedPosts: 3`

### Tahap 2: Related Post includable (2 menit)

1. Cari `<b:includable id='relatedPost'>`
2. Hapus baris `var jumlahRelatedPosts = 4;`
3. Hapus `<div id='ms-matched-content'/>`

### Tahap 3: Related Post Script (10 menit) ⚠️ Hati-hati

1. Cari `<b:includable id='relatedPostScript'>`
2. Ganti **seluruh** isi includable dengan kode sesudah (lihat bagian 5)
3. Pastikan `msRelatedPosts` callback tidak bentrok dengan fungsi lain

### Tahap 4: Baca Juga di blogPostBody (10 menit) ⚠️ Hati-hati

1. Cari `<div id='baca-juga'/>` di dalam `blogPostBody`
2. Hapus blok lama dari `<div id='baca-juga'/>` sampai akhir script Baca Juga
3. Ganti dengan kode sesudah (lihat bagian 6)

### Tahap 5: CSS (5 menit)

1. Cari `.related-posts-widget` di dalam `<b:skin>`
2. Ganti dengan CSS sesudah (lihat bagian 7)

### Tahap 6: Verifikasi

1. Buka halaman post di browser
2. Pastikan Related Post muncul di bawah artikel (3 artikel, tanpa thumbnail)
3. Pastikan Baca Juga muncul di tengah artikel (3 artikel)
4. Cek Console browser untuk error JavaScript
5. Cek tab Network → filter `feeds/posts` → pastikan hanya 2 request: 1 untuk related post, 1 untuk baca juga

---

## Catatan Penting

1. **Kompatibilitas mundur:** Jika `relatedPosts: false` di template-settings, container `<div id='ms-related-post'/>` tetap ada tapi kosong. Aman.

2. **Jika label kosong:** Kedua fungsi (related post & baca juga) sudah handle case `postLabels.length === 0` — tidak akan membuat request feed.

3. **Satu sistem cukup:** Dokumentasi existing (`dokumentasi-related-post-simplify.md`) menyarankan cukup satu sistem (Related Post saja, matikan Baca Juga). Jika ingin maksimal simplify:
   - Set `bacaJuga: false` di `template-settings`
   - Hapus seluruh blok Baca Juga dari `blogPostBody`

4. **Defer loading:** Related post script bisa dibungkus dengan `Defer(function(){ ... }, 0, true)` agar tidak blocking DOM ready. Tambahkan jika performa masih perlu ditingkatkan.

5. **Backup:** Sebelum mengedit `template.xml`, backup terlebih dahulu.

---

*Dokumentasi ini merujuk pada rekomendasi audit poin B dari `template-performance-audit-2026.md`.*
*Dokumentasi implementasi lebih detail tersedia di `my-templates/dokumentasi-related-post-simplify.md`.*
