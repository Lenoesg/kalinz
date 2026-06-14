# Evaluasi Progress Audit — kalinz.blogspot.com
**Tanggal Evaluasi:** Juni 2026  
**Baseline:** Audit awal Juni 2026

---

## Scorecard Keseluruhan

| Kategori | Total Item | Selesai | Parsial | Belum | Skor |
|---|---|---|---|---|---|
| Critical Issues (C) | 8 | 5 | 2 | 1 | 68% |
| Important Improvements (I) | 9 | 4 | 0 | 5 | 44% |
| Optional (O) | 8 | 0 | 1 | 7 | 6% |
| **Temuan sesi (bonus)** | 5 | 5 | 0 | 0 | 100% |
| **Total keseluruhan** | **30** | **14** | **3** | **13** | **53%** |

---

## Critical Issues — 68% Selesai

| # | Issue | Status | Catatan |
|---|---|---|---|
| C1 | Homepage tidak punya identity/hero section | ✅ SELESAI | Category grid + intro text aktif |
| C2 | FeaturedPost dimatikan | ✅ SELESAI | Artikel "Mengenal Lagu Nias" aktif |
| C3 | Menu navigasi hanya 3 item | ✅ SELESAI | 6 item + dropdown Bahasa Nias |
| C4 | `relatedPostsThumb: false` | ✅ SELESAI | Diubah ke `true` |
| C5 | Tidak ada identity editorial | ✅ SELESAI | Profil Melinus Gulo + About Kalinz |
| C6 | Schema WebSite + Organization tidak ada | ❌ BELUM | Hanya schema artikel, bukan homepage |
| C7 | In-feed AdSense homepage disabled | ⏸️ DITUNDA | Keputusan user |
| C8 | Topical authority lemah, hub pages | ⚠️ PARSIAL | 1 artikel pilar ada, hub pages belum |

---

## Important Improvements — 44% Selesai

| # | Issue | Status | Catatan |
|---|---|---|---|
| I1 | Category grid tidak ada di homepage | ✅ SELESAI | 6 kotak earthtone aktif |
| I2 | Infinite scroll auto → ganti Load More | ❌ BELUM | Masih `type: 0` (auto-scroll) |
| I3 | PopularPosts timeRange LAST_MONTH | ✅ SELESAI | Diubah ke ALL_TIME |
| I4 | Sidebar tidak ada navigasi label/topik | ✅ SELESAI | Artis Populer + Jelajahi aktif |
| I5 | Snippet terlalu pendek (100 char) | ❌ BELUM | Masih 100 karakter di template |
| I6 | Tidak ada bottom mobile nav | ❌ BELUM | Belum dikerjakan |
| I7 | Matched-content AdSense disabled | ❌ BELUM | Belum diaktifkan |
| I8 | Link "Tentang" hanya di footer | ✅ SELESAI | Sudah masuk menu navigasi |
| I9 | Logo rasio tidak proporsional | ❌ BELUM | displayHeight 347px masih sama |

---

## Optional Improvements — 6% Selesai

| # | Issue | Status | Catatan |
|---|---|---|---|
| O1 | Custom domain `kalinz.id` | ❌ BELUM | Keputusan user |
| O2 | FAQ/DefinedTerm schema artikel kosakata | ⚠️ PARSIAL | Schema ada di featured post saja |
| O3 | Newsletter/subscriber widget | ❌ BELUM | |
| O4 | Motif visual budaya Nias sebagai accent | ❌ BELUM | |
| O5 | Statistik arsip di homepage | ❌ BELUM | |
| O6 | Hub pages per topik utama | ❌ BELUM | |
| O7 | `speakable` schema untuk konten bahasa | ❌ BELUM | |
| O8 | Share button TikTok | ❌ BELUM | |

---

## Temuan Tambahan Selama Sesi — 100% Selesai

Item ini tidak ada di audit awal tapi ditemukan dan diselesaikan selama sesi:

| Item | Status |
|---|---|
| Label cloud berisi 30+ nama artis (kacau) | ✅ Diganti HTML manual |
| Footer widget title "Widget HTML #3" bocor | ✅ Diperbaiki |
| CSS bugs (border-left konflik, hover duplikat, layout shift) | ✅ Dibersihkan |
| Artis Populer widget | ✅ Dibuat baru |
| Blog Archive widget | ✅ Ditambahkan |

---

## Transformasi Checklist Identitas Blog (Audit Poin 17)

Sebelumnya dari 10 elemen hanya 0–1 yang terpenuhi. Sekarang:

| Elemen | Sebelum | Sekarang |
|---|---|---|
| Tagline/deskripsi menyebut niche | ❌ | ✅ Intro text homepage |
| Kategori mencerminkan kedalaman budaya | ❌ | ✅ 6 kotak + menu 6 item |
| Mission statement editorial | ❌ | ✅ About Kalinz di sidebar |
| Link Tentang dari header | ❌ | ✅ Ada di nav menu |
| Identity penulis | ❌ | ✅ Profil Melinus Gulo |
| Featured content budaya Nias | ❌ | ✅ Artikel pilar aktif |
| Schema markup cultural content | ❌ | ⚠️ Parsial (artikel saja) |
| Nama blog informatif | ⚠️ | ⚠️ Kalinz + subtitle logo |
| Statistik/ukuran arsip | ❌ | ❌ Belum |
| Afiliasi komunitas Nias | ❌ | ❌ Belum |

**Dari 10 elemen: sebelumnya 0–1, sekarang 6–7 terpenuhi.**

---

## 5 Prioritas Tersisa yang Paling Berdampak

Diurutkan berdasarkan dampak vs kemudahan implementasi:

### Prioritas 1 — WebSite Schema (C6)
**Dampak:** Tinggi | **Kesulitan:** Rendah | **Waktu:** 10 menit

Tambahkan langsung di Blogger: Theme → Edit HTML → cari `</head>` → paste sebelumnya:
```html
<b:if cond='data:view.isHomepage'>
<script type='application/ld+json'>
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Kalinz",
  "alternateName": "Kalinz — Arsip Lirik Lagu dan Budaya Nias",
  "url": "https://kalinz.blogspot.com",
  "description": "Arsip digital lirik lagu Nias, syair Maena, terjemahan bahasa Nias–Indonesia, dan dokumentasi budaya Pulau Nias.",
  "inLanguage": "id",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://kalinz.blogspot.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "about": {
    "@type": "Thing",
    "name": "Budaya Nias",
    "description": "Dokumentasi musik, bahasa, dan budaya masyarakat Ono Niha dari Pulau Nias, Indonesia."
  }
}
</script>
</b:if>
```

---

### Prioritas 2 — Snippet Length (I5)
**Dampak:** Sedang | **Kesulitan:** Rendah | **Waktu:** 5 menit

Di Theme → Edit HTML, cari dua kali kemunculan:
```
snippet(data:post.snippets.long, { length: 100 })
```
Ganti keduanya menjadi:
```
snippet(data:post.snippets.long, { length: 150 })
```
Ini meningkatkan teks preview kartu artikel dari ±100 ke ±150 karakter.
User bisa evaluate apakah artikel relevan sebelum klik — menurunkan bounce rate.

---

### Prioritas 3 — Infinite Scroll (I2)
**Dampak:** Sedang (SEO + UX) | **Kesulitan:** Rendah | **Waktu:** 5 menit

Di widget **Kode Pengaturan Template** (HTML70), ubah:
```js
infiniteScrollNav: false,
```
Ini mengganti auto-scroll dengan tombol "Load More" — lebih baik untuk SEO
karena Google bisa crawl pagination, dan user tahu kapan konten habis.

---

### Prioritas 4 — Label Cleanup (turunan C8)
**Dampak:** Tinggi (SEO) | **Kesulitan:** Sedang | **Waktu:** 1–2 jam

Standarisasi label di semua artikel:
- Hapus `Lagu Nias Top`, `Lagu Nias Populer` → konsolidasi ke `Lagu Nias`
- Hapus `Rohani Nias` → konsolidasi ke `Lagu Rohani`
- Rename `Lagu Batak` → `Lagu Populer di Nias`
- Hapus label artis yang hanya punya 1–2 artikel
- Setiap artikel idealnya hanya punya 2–3 label: 1 topik utama + 1–2 artis (jika artis punya 5+ lagu)

---

### Prioritas 5 — Hub Pages (C8)
**Dampak:** Tinggi (SEO jangka panjang) | **Kesulitan:** Tinggi | **Waktu:** Beberapa hari

Buat static page (Pages, bukan Posts) untuk setiap topik utama:
- `/p/lagu-nias` — pengantar + daftar pilihan + link ke label
- `/p/bahasa-nias` — pengantar kosakata + link ke label  
- `/p/maena-nias` — penjelasan tradisi Maena + link ke label
- `/p/budaya-nias` — pengantar budaya + link ke label

Ini adalah "anchor page" yang memperkuat topical authority di mata Google.

---

## Perbandingan Before vs After

### Sebelum Audit
```
Homepage: header → grid artikel (tidak ada konteks)
Sidebar:  Popular Posts kosong (placeholder kamera)
Nav:      3 item (Lagu Nias, Lagu Rohani, Maena Nias)
Identity: Tidak ada
Schema:   BlogPosting generic saja
Trust:    Rendah — tidak ada penulis, tidak ada misi
```

### Sesudah Sesi Ini
```
Homepage: header → intro text → category grid earthtone → featured post foto Nias → artikel terbaru
Sidebar:  Popular Posts (all time) → Profil Melinus Gulo + About → Artis Populer → Arsip → Jelajahi (sticky)
Nav:      6 item + dropdown (Lagu Nias, Lagu Rohani, Maena Nias, Bahasa Nias▼, Budaya Nias, Tentang)
Identity: Kuat — ada misi, ada penulis, ada foto
Schema:   BlogPosting + Article pilar (featured post)
Trust:    Sedang-Tinggi — identitas jelas, struktur profesional
```

---

## Kesimpulan

Blog Kalinz telah mengalami transformasi signifikan dari "blog lirik random" menjadi "arsip budaya yang mulai terstruktur". Fondasi sudah kuat.

**Yang sudah sangat baik:**
- Identitas homepage sekarang jelas dan informatif
- Struktur sidebar profesional dan fungsional  
- Navigasi mencerminkan kedalaman topik
- Ada wajah manusia (penulis) yang membangun trust

**Yang masih menjadi gap terbesar:**
- Topical authority belum kuat — perlu hub pages dan label cleanup
- WebSite schema belum ada — mudah tapi belum dikerjakan
- Konten masih didominasi 2016 (111 dari ~115 artikel dari tahun 2016) — blog perlu artikel baru secara konsisten

**Rekomendasi jadwal:**
- Minggu ini: Prioritas 1 (WebSite schema) + Prioritas 2 (snippet)
- Bulan ini: Prioritas 3 (infinite scroll) + Prioritas 4 (label cleanup)
- 3 bulan: Prioritas 5 (hub pages) + konten baru secara rutin

---
*Evaluasi ini didasarkan pada audit template.xml, hasil fetch langsung dari kalinz.blogspot.com, dan seluruh sesi konsultasi Juni 2026.*
