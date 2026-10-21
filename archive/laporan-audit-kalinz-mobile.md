# Laporan Audit Mobile-First: Tema Blogger KALINZ

Tanggal audit: 21 Oktober 2026
Cakupan: `template.xml`, `assets/styles.css`, `postingan/` (44 file), `halaman/` (4 file), `template-postingan/` (3 file)
Fokus: Core Web Vitals seluler (CLS, LCP), UX seluler, kepatuhan sintaks Blogger, kebersihan HTML/CSS

## 0. Metodologi dan Batasan

| Aspek | Cara pengujian |
|---|---|
| Sinkronisasi CSS | Perbandingan tingkat aturan menggunakan parser `tinycss2` antara isi `<b:skin>` dan `assets/styles.css` |
| HTML | Lint tag balance, heading, atribut gambar, JSON-LD pada seluruh file `postingan/` dan `halaman/` |
| Render seluler | Chromium headless, viewport 360x800, 390x844, 430x932, DPR 2, dengan DOM Blogger tiruan yang memuat `styles.css` asli dan variabel `:root` hasil resolusi `$(...)` |
| Kode Blogger | Pembacaan terarah dan grep pada `template.xml` |

Batasan yang perlu diketahui:

1. Render Blogger asli tidak tersedia offline. Harness adalah pendekatan DOM, bukan render produksi.
2. Uji overflow pertama sempat tidak valid (path stylesheet salah), lalu diulang dan semua angka di laporan ini berasal dari uji ulang.
3. Angka CLS adalah estimasi rumus layout-shift (impact fraction kira-kira 0,37 dikali distance fraction). Yang terukur langsung adalah jarak pergeseran dalam piksel.
4. Audit sintaks Blogger tidak divalidasi oleh parser Blogger dan tidak menghitung seluruh tag secara menyeluruh.
5. Lebar 320 px belum diuji.
6. Snippet XML/JS di bagian 3 belum dijalankan di Blogger. Uji di tema salinan (Backup, lalu Pratinjau) sebelum diterapkan.

## 1. Ringkasan Eksekutif

### Kritis

| ID | Temuan | Dampak seluler |
|---|---|---|
| K1 | `.iklan-wrapper { min-height: 250px }` satu nilai untuk semua format iklan; iklan atas disisipkan JS di paling atas `.post-body` | CLS: konten bergeser 30 px (iklan 280), 86 px (336), 170 px (420). Estimasi CLS 0,014 / 0,04 / 0,08 |
| K2 | Selektor penempatan iklan `div > br, span > br, div > p, span > p` mengandalkan markup Blogger lama | Iklan tengah jatuh di 83% artikel (`tice-hato-fee-khogu`), 22% (`_sejarah-pulau-nias`), dan dihapus total pada 9 postingan (0 elemen cocok) |
| K3 | Gambar utama tanpa `width`/`height` pada 9 postingan: 8 `erickijo-*` dan `gauswaruwu-lo-ubinio.html` | CLS: kotak gambar runtuh lalu melompat saat gambar dimuat |

### Sedang

| ID | Temuan |
|---|---|
| S1 | Tap target di bawah 48 px: ikon search 24x31, breadcrumb sekitar 14 px, byline 16 px, link sidebar 19 px, link footer 16 px, chip `.post-tag` 30 px |
| S2 | `#ms-related-post` dan iframe komentar tanpa reservasi tinggi |
| S3 | Thumbnail lazyload via defer.js dengan `.lazyload { opacity: 0 }`, tanpa `<noscript>`; merugikan LCP |
| S4 | Schema ganda: 17 postingan memuat JSON-LD `Article` di body tanpa penanda `kalinz-custom-schema`, sehingga template juga menghasilkan `BlogPosting` |
| S5 | JSON-LD tidak valid di `bjbtrio-onomatua-sibarisi.html` |
| S6 | Breadcrumb microdata: semua label dijadikan level bertingkat, halaman saat ini tidak ada, `position` hard-coded pada cabang tanpa label |
| S7 | Blok `<style>` sekitar 190 baris diulang di tiap postingan |

### Ringan

| ID | Temuan |
|---|---|
| R1 | `showBacaJuga` tidak pernah dipanggil dan memanggil `escapeHTML` yang hanya ada di dalam IIFE lain (ReferenceError laten); `#baca-juga` kosong di tiap postingan |
| R2 | `#share a i::before { font-family: linkmagzfont }` tanpa `@font-face`; markup memakai SVG |
| R3 | 11 kelompok selektor didefinisikan ulang di konteks media yang sama (15 definisi ekstra), terutama header seluler |
| R4 | Sisa konfigurasi: Navbar tersembunyi memuat `origin=http://localhost:80`; `</img>` nyasar di widget "Tentang Kalinz" |
| R5 | `</em>` nyasar (`tice-hato-fee-khogu.html` baris 374); dua `<td>` tak tertutup (`bjbtrio-no-nifiliu.html` baris 346) |
| R6 | `target="_blank"` tanpa `rel` di 3 halaman statis |
| R7 | Link share WhatsApp tidak di-encode dan memakai deskripsi blog; cabang `twitter:image` kedua tidak pernah tercapai |
| R8 | Dua file `template-postingan/lirik-lagu-versi-*.html` berukuran 0 byte |
| R9 | Aset `logo_kalinz_compressed.png` masih 3264x707 px (247 KB) untuk logo yang tampil sekitar 129x28 px |

### Sudah baik (dipertahankan)

- Viewport meta `width=device-width, initial-scale=1` tanpa `maximum-scale`.
- Tidak ada web font (hanya `system-ui`), sehingga tidak ada FOUT/FOIT/CLS dari font dan tidak perlu preload font.
- Tidak ada overflow horizontal: 144 render (48 file x 3 lebar), 0 meluap.
- Logo header: atribut 452x98 cocok dengan rasio aset, tinggi header tercadang, `srcset` 160/320 tersedia.
- Thumbnail artikel: `padding-top: 56.25%` plus atribut 400x225, tanpa CLS.
- Tombol hamburger 48x48 dan tombol share memenuhi 48 px.
- `prefers-reduced-motion` ditangani; scroll handler sticky memakai `passive: true`.
- Struktur heading: H1 dari template pada halaman tunggal, isi postingan mulai dari H2.
- `expr:` bukan sintaks deprecated; template sudah memakai layout v3, `b:class`, `b:attr`, `b:with`, `b:loop`.
- Sinkronisasi XML dan CSS: lihat bagian 4.1.

## 2. Analisis Mendalam Penyebab CLS Seluler

### 2.1 Slot iklan (K1)

**Elemen:** `.iklan-wrapper` (`min-height: 250px; overflow: hidden`) di `assets/styles.css` dan blok `<b:skin>`.

**Mekanisme:**
1. Skrip penempatan memindahkan `#iklan-atas .widget-content` ke `n.childNodes[0]` dari `.post-body`, yaitu di atas gambar utama dan seluruh isi artikel.
2. AdSense dimuat lazy pada scroll pertama, jadi `ins` terisi saat pengguna sudah mulai membaca.
3. Jika iklan yang dikembalikan lebih tinggi dari 250 px, wrapper tumbuh dan semua konten di bawahnya turun. Jika lebih pendek, 250 px kosong tetap tampil.

**Hasil ukur** (harness 360x800, posisi gambar utama sebelum dan sesudah slot atas diisi):

| Tinggi iklan | Pergeseran | Estimasi CLS |
|---|---|---|
| 100 px | 0 px (ruang kosong 150 px) | 0 |
| 250 px | 0 px | 0 |
| 280 px | 30 px | sekitar 0,014 |
| 336 px | 86 px | sekitar 0,04 |
| 420 px | 170 px | sekitar 0,08 |

Matched content (autorelaxed) di seluler biasanya jauh lebih tinggi dari 250 px; posisinya di akhir artikel sehingga hanya menggeser footer/sidebar.

**Solusi:** tentukan `min-height` per slot sesuai format iklan yang benar-benar tampil, tambahkan `contain: layout`, dan pastikan nilainya diverifikasi dari data lapangan (PageSpeed Insights / Search Console, bagian Core Web Vitals) sebelum dikunci. Lihat diff D1.

### 2.2 Penempatan iklan tengah tidak konsisten (K2)

Selektor `div > br, span > br, div > p, span > p` dibuat untuk konten Blogger klasik. Postingan Anda memakai `<article class="post-kalinz">` dengan `<p>` langsung, sehingga yang cocok hanya paragraf di dalam `div` (misalnya FAQ).

| Postingan | Elemen cocok | Posisi iklan tengah |
|---|---|---|
| `tice-hato-fee-khogu` | 12 | 83% tinggi `.post-body` (6698 dari 8102 px) |
| `_sejarah-pulau-nias` | 37 | 22% |
| `erickijo-*` (8) dan `gauswaruwu-*` (1) | 0 | Iklan dihapus oleh skrip (kondisi `l.length <= 1`) |

Ini bukan penyebab CLS langsung, tetapi menyebabkan pendapatan iklan dan perilaku tata letak tidak konsisten. Lihat diff D2.

### 2.3 Gambar tanpa dimensi (K3)

Pada postingan `erickijo-*` dan `gauswaruwu-lo-ubinio`, `<img>` tidak punya `width`/`height`. Browser tidak bisa menghitung `aspect-ratio` sebelum gambar diunduh, sehingga tinggi awal 0 lalu melompat (jaringan seluler lambat memperbesar durasi lompatan). Lihat diff D3.

### 2.4 Konten yang diisi belakangan (S2)

- `#ms-related-post` kosong, lalu diisi hasil JSONP berisi judul dan beberapa item. Tidak ada `min-height`.
- Iframe komentar `#comment-editor` tinggi awal kecil lalu diubah oleh skrip Blogger. Tidak ada reservasi.

Keduanya biasanya di bawah layar, tetapi menggeser iklan bawah, komentar, dan footer ketika pengguna menggulir sampai situ. Lihat diff D4.

### 2.5 Hal yang sudah aman dari CLS

- **Font:** tidak ada `@font-face` dan tidak ada Google Fonts; font stack sistem.
- **Header seluler:** `#header` berposisi absolut di dalam `#header-content` dengan `min-height: var(--menu-height)` (62 px); logo tidak ikut menentukan tinggi. Hasil ukur 63 px.
- **Thumbnail:** rasio 16:9 tercadang oleh `padding-top`.
- **Avatar penulis:** `width`/`height` 48 dan avatar halaman Tentang berukuran tetap 96 px lewat CSS.
- **Skrip pemindah iklan dan TOC:** inline sinkron di akhir body, umumnya berjalan sebelum paint pertama. Ini tidak dijamin pada HTML besar; jika Search Console menunjukkan CLS dari area ini, sembunyikan slot sampai skrip selesai (misalnya kelas `.js-ads-ready` pada `<html>`).

## 3. Kode Perbaikan

Catatan: nama kelas dan selektor di bawah mengikuti yang saya amati; sesuaikan bila berbeda di `template.xml` Anda.

### D1. CSS slot iklan (`assets/styles.css`, lalu salin ke `<b:skin>`)

Sebelum:

```css
.iklan-wrapper {
    min-height: 250px;
    overflow: hidden;
    /* ... */
}
```

Sesudah:

```css
.iklan-wrapper {
    min-height: 250px;          /* nilai bawaan, tetap sebagai jaring pengaman */
    overflow: hidden;
    contain: layout;            /* isolasi perubahan ukuran dari layout luar */
}
/* Nilai per slot: SESUAIKAN dengan tinggi iklan nyata dari data lapangan */
.kode-iklan-atas   .iklan-wrapper { min-height: 280px; }  /* responsif 336x280 */
.kode-iklan-tengah .iklan-wrapper { min-height: 300px; }  /* in-article fluid */
.kode-iklan-bawah  .iklan-wrapper { min-height: 280px; }
.kode-matched-content .iklan-wrapper { min-height: 600px; } /* autorelaxed seluler */
```

### D2. Penempatan iklan tengah (`template.xml`, skrip penempatan iklan)

Sebelum:

```js
var l = n.querySelectorAll("div > br, span > br, div > p, span > p");
```

Sesudah (mendukung markup `<article class="post-kalinz">` dan markup lama):

```js
var l = n.querySelectorAll(
  ".post-kalinz > h2, .post-kalinz > p, div > br, span > br, div > p, span > p"
);
```

Uji pada satu postingan lirik, satu postingan Erick Ijo, dan `_sejarah-pulau-nias` untuk memastikan posisi 20% masuk akal. Jika ingin iklan tengah hanya muncul bila ada cukup paragraf, naikkan ambang `l.length <= 1` menjadi misalnya `< 6`.

Opsional untuk skrip scroll-loader AdSense: lepas listener setelah terpicu pertama kali.

```js
function loadAds() {
  window.removeEventListener("scroll", loadAds, true);
  /* ...muat adsbygoogle.js... */
}
```

### D3. Gambar utama tanpa dimensi (9 postingan)

Sebelum:

```html
<img src="https://blogger.googleusercontent.com/img/.../s400/foto.jpg" alt="...">
```

Sesudah (isi dimensi asli gambar; jika persegi seperti postingan lain, 400x400):

```html
<img src="https://blogger.googleusercontent.com/img/.../s400/foto.jpg"
     alt="..." width="400" height="400" fetchpriority="high" decoding="async">
```

### D4. Reservasi ruang konten dinamis (CSS)

```css
#ms-related-post  { min-height: 180px; }        /* sesuaikan dengan jumlah item */
#comment-editor   { min-height: 240px; }        /* iframe komentar Blogger */
```

### D5. Tap target (CSS tambahan)

```css
.iconsearch-label {
    display: flex; align-items: center; justify-content: center;
    min-width: 48px; min-height: 48px;
}
.breadcrumbs a, .post-info a, .post-tag, .blog-pager a, .js-load,
#footer-content a, #sidebar-wrap li a {
    display: inline-flex; align-items: center; min-height: 48px;
}
.ms-submenu-button { min-width: 48px; min-height: 48px; }
```

Catatan: terapkan bertahap dan periksa tata letak, karena `min-height: 48px` pada tautan inline di dalam teks dapat merusak alur. Untuk tautan di dalam paragraf, cukup beri jarak antar-tautan; yang diutamakan adalah elemen navigasi, bukan tautan inline di teks. Standar WCAG 2.5.8 (AA) mensyaratkan minimal 24x24 px; 48 px adalah rekomendasi Google/Lighthouse. Ganti `.closebtn` dari `div` menjadi `button` dengan `aria-label`.

### D6. Lazyload thumbnail (S3)

Sebelum (JS dan CSS):

```css
.lazyload { opacity: 0; }
```

```js
Defer.dom("img.lazyload", 100, "loaded", null, {rootMargin: "1px"});
```

Sesudah (di includable thumbnail): gunakan atribut native dan `src` asli.

```html
<img src="..." width="400" height="225" alt="..."
     loading="lazy" decoding="async">
```

Untuk thumbnail pertama di beranda, gunakan `fetchpriority="high"` dan tanpa `loading="lazy"`. Hapus aturan `.lazyload { opacity: 0 }` bila `src` asli sudah dipasang langsung; bila tetap memakai defer.js, tambahkan `<noscript>` berisi `<img>` biasa.

### D7. Schema ganda (S4) dan JSON-LD rusak (S5)

Template saat ini hanya melewati `BlogPosting` bila body mengandung `kalinz-custom-schema`. Perluas kondisi agar juga melewati bila body sudah memuat JSON-LD apa pun:

Sebelum:

```xml
<b:if cond='!data:post.body.contains("kalinz-custom-schema")'>
```

Sesudah:

```xml
<b:if cond='!data:post.body.contains("kalinz-custom-schema") and !data:post.body.contains("application/ld+json")'>
```

Alternatif yang lebih bersih: hapus JSON-LD dari body semua postingan dan biarkan template menjadi satu-satunya sumber schema, agar penulis (`Person`), penerbit, dan `logo` konsisten. Saat ini sebagian postingan memakai penulis "Melinus Gulo", sebagian "KALINZ", dan URL logo penerbit berbeda-beda.

Perbaikan `bjbtrio-onomatua-sibarisi.html`: escape tanda kutip ganda di dalam nilai string dengan `\"` dan hapus `\'` (tidak valid di JSON; apostrof cukup ditulis `'`). Validasi dengan `python3 -m json.tool`.

### D8. Breadcrumb (S6)

Perilaku saat ini: `Beranda / Label1 / Label2 / ...` dengan `position` = indeks + 2, tanpa halaman saat ini, dan cabang tanpa label menggunakan `position` tetap 2.

Rekomendasi:

1. Pakai hanya label pertama sebagai level kedua (label bukan hierarki bertingkat).
2. Tambahkan item terakhir berupa judul postingan (tanpa tautan) dengan `position` berikutnya.
3. Hilangkan `<meta itemprop="position">` dari dalam elemen `<a>`; letakkan sebagai anak langsung `<li>`/`<span itemprop="itemListElement">`.

Dengan satu label, breadcrumb juga lebih pendek dan tidak membungkus banyak baris di layar 360 px.

### D9. Kode mati

Hapus dari `template.xml`:

```html
<div id="baca-juga"></div>        <!-- kosong di tiap postingan -->
```

beserta fungsi `showBacaJuga` dan CSS `.baca-juga-wrap` jika tidak dipakai. Hapus juga `#share a i`, `#share a i::before` (rujukan ke `linkmagzfont`). Hapus `origin=http://localhost:80` dan URL `draft.blogger.com` dari widget Navbar bila widget memang tidak dipakai. Perbaiki `</img>` nyasar pada widget "Tentang Kalinz".

### D10. Konsolidasi CSS header seluler (R3)

Contoh konflik nyata (blok `@media (max-width: 480px)`):

```css
/* baris ~857 */   #header-outer #header-content { padding: 22px 22px 12px; }
/* baris ~1970 */  #header-outer #header-content { padding: 0 22px; }       /* yang menang */
/* baris ~1988 */  #header .widget img { max-height: 24px; }
/* baris ~4629 */  #header .widget img { max-height: 28px; }                /* yang menang, hasil ukur 28 px */
```

Gabungkan menjadi satu aturan akhir per selektor:

```css
@media only screen and (max-width: 480px) {
    #header-outer #header-content { padding: 0 22px; }
    #header .widget img { max-height: 28px; }
}
```

Lalu hapus definisi lama. Untuk ukuran logo yang diinginkan, pilih salah satu (24 atau 28 px) secara sadar.

### D11. Logo header (R9)

`template.xml` tidak mereferensikan `assets/logo_kalinz_compressed.png`; header memakai gambar yang di-host Blogger. Jika file lokal dipakai sebagai sumber unggahan atau logo schema, ekspor ulang sekitar 390x85 px (cukup untuk DPR 3) sebagai PNG atau WebP. Pada elemen `<img>` header, tambahkan `fetchpriority="high"` dan `decoding="async"`.

### D12. Perbaikan HTML dan lain-lain

| File | Perbaikan |
|---|---|
| `postingan/tice-hato-fee-khogu.html` baris 374 | Hapus `</em>` nyasar pada `<p class="post-faq-a">` (atau tambahkan `<em>` pembuka) |
| `postingan/bjbtrio-no-nifiliu.html` baris 346 | Tutup dua `<td>` yang belum ditutup |
| `halaman/kebijakan-privasi.html`, `kontak.html`, `tentang.html` | Tambahkan `rel="noopener noreferrer"` pada `target="_blank"` |
| Skrip share | `encodeURIComponent` untuk judul dan URL, dan pakai ringkasan postingan, bukan `data:blog.metaDescription` |
| `meta twitter:image` | Susun ulang cabang `b:if`/`b:elseif` agar cabang `data:blog.postImageUrl` dapat tercapai |
| `template-postingan/lirik-lagu-versi-*.html` | File kosong; isi atau hapus |

## 4. Evaluasi Struktur Postingan dan Halaman Statis untuk Seluler

### 4.1 Sinkronisasi dan kebersihan kode

| Pemeriksaan | Hasil |
|---|---|
| Aturan di `<b:skin>` vs `styles.css` | 570 vs 605; selisih hanya 36 aturan `body#layout` (milik `<b:template-skin>`, tercantum di baris 1-233 `styles.css`) dan blok `:root` berisi token `$(...)` |
| Aturan non-layout yang berbeda | 0 |
| Duplikat identik | Tidak ada; ada 11 kelompok selektor yang didefinisikan ulang dengan nilai berbeda (R3) |
| Ukuran | `<b:skin>` 77.084 byte (gzip 14,6 KB); `template.xml` 366 KB (gzip 60 KB) |

### 4.2 Hasil lint 44 postingan

| Pemeriksaan | Hasil |
|---|---|
| Overflow horizontal 360/390/430 px | 0 dari 144 render |
| Gambar tanpa `width`/`height` | 9 postingan (K3) |
| Tag tak seimbang | 2 file (R5) |
| JSON-LD di body | 43 dari 44 file; 17 tanpa penanda guard (S4); 1 tidak valid (S5) |
| Heading | Mulai dari H2 (H1 dari template); hierarki konsisten |
| Blok `<style>` per postingan | Diulang di tiap file (S7) |

Rekomendasi S7: pindahkan CSS `.post-kalinz`, `.post-box`, `.dictionary-table`, `.post-faq-*`, `.post-tag`, `.post-lyric-box` ke `<b:skin>` satu kali, lalu hapus blok `<style>` dari setiap postingan. Manfaatnya: HTML lebih kecil (sekitar 4 KB per postingan), CSS ter-cache, dan satu tempat untuk memperbaiki tap target (D5). Karena `.post-body` dibangun dari file ini, lakukan setelah memastikan tidak ada selektor yang bentrok dengan CSS tema.

Catatan tabel: pada tabel `.dictionary-table`, `td:first-child` memakai `width: 175px !important; white-space: nowrap`. Tidak ada overflow pada 360 px dengan konten saat ini, tetapi kata panjang di kolom pertama dapat melampaui lebar layar. Pertimbangkan `max-width` atau `overflow-wrap: anywhere` sebagai pengaman.

### 4.3 Halaman statis (`halaman/`)

- Empat halaman memakai H2 (H1 judul dari template Blogger) dan tidak punya `<h1>` sendiri; ini benar.
- `tentang.html`: gambar penutup memakai ukuran tetap 96x96 lewat CSS inline, jadi tidak menimbulkan CLS; tambahkan atribut `width="96" height="96"` agar rasio diketahui sebelum CSS dimuat.
- Tautan eksternal `target="_blank"` tanpa `rel` (R6).
- Ukuran font memakai `px` (14-16 px); tidak masalah untuk seluler, tetapi `rem` lebih menghormati pengaturan ukuran teks pengguna.

### 4.4 Folder `template-postingan/`

`index-lagu.md` hanya berisi tautan. Dua file template HTML kosong (0 byte). Jika file tersebut dimaksudkan sebagai master untuk postingan baru, isi dengan struktur terbaru (termasuk `width`/`height` gambar, tanpa JSON-LD ganda, tanpa `<style>` inline) agar kesalahan K3, S4, dan S7 tidak terulang.

### 4.5 Skema dan SEO On-Page

- Pilih satu sumber JSON-LD (rekomendasi: template). Samakan `author`, `publisher`, `logo`.
- FAQ di postingan tidak perlu markup `FAQPage`; Google membatasi rich result FAQ untuk situs tertentu, jadi manfaatnya kecil.
- Meta `viewport` sudah benar; field `msapplication-navbutton-color` dan `link rel="image_src"` sudah usang (tidak berbahaya, bisa dibersihkan).

## 5. Panduan Optimalisasi Sebelum Deployment

Struktur `styles.css`: baris 1-233 adalah CSS `<b:template-skin>` (`body#layout`, tampilan Tata Letak); mulai baris 234 (penanda `/*! INI ADALAH POTONGAN KODE CSS DARI BLOK <b:skin> di template.xml */`) adalah isi `<b:skin>`. Variabel `:root` dan komentar `Variable ... Variable end */` hanya ada di `template.xml` dan harus dipertahankan.

### Langkah

1. **Cadangkan.** Di Blogger: Tema, Cadangkan/Pulihkan, Download. Simpan juga `template.xml` saat ini di Git.
2. **Edit sumber.** Terapkan diff D1-D12 pada `assets/styles.css` dan `template.xml` (bagian non-CSS).
3. **Format.** Jalankan Prettier (konfigurasi `.prettierrc` sudah ada) pada `styles.css`.
4. **Pasang tool.** `npm i -D clean-css-cli`.
5. **Minify dan sisipkan.** Gunakan skrip `build_skin.py` (disertakan bersama laporan ini):
   ```bash
   python3 build_skin.py . template.min.xml
   ```
   Skrip memotong `styles.css` pada penanda `<b:skin>`, menjalankan `clean-css-cli -O1`, mempertahankan komentar `Variable` dan blok `:root` asli, lalu menyisipkan hasilnya ke dalam `<b:skin><![CDATA[ ... ]]></b:skin>`.
6. **Verifikasi otomatis.** Pada uji saya, hasilnya: 570 aturan sebelum dan sesudah, 59 token `$(...)` terjaga, XML well-formed, tidak ada `]]>` di dalam CSS. Ulangi pemeriksaan serupa setelah mengubah CSS.
7. **Pratinjau.** Di Blogger unggah `template.min.xml` ke blog uji atau pakai Pratinjau; jangan langsung ke blog produksi.
8. **Periksa di perangkat nyata.** Buka satu postingan lirik, satu postingan Erick Ijo, beranda, dan halaman Tentang di 360 dan 430 px. Periksa: iklan atas tidak menggeser konten, iklan tengah muncul, tidak ada scroll horizontal.
9. **Ukur.** PageSpeed Insights (mode seluler) untuk 3 URL representatif. Perhatikan CLS, LCP, dan bagian "Tinjau elemen layout shift". Gunakan data lapangan (CrUX/Search Console) untuk menentukan nilai `min-height` iklan final (D1).
10. **Validasi schema.** Rich Results Test pada satu postingan untuk memastikan hanya satu `BlogPosting`/`Article`, tanpa galat.
11. **Rilis dan pantau.** Pantau Search Console, laporan Core Web Vitals seluler, selama 28 hari (jendela data lapangan).

### Catatan penting

- Minify lewat clean-css pada `<b:skin>` yang sudah terminify di XML hanya menghemat sedikit (ukuran skin 88.610 menjadi 88.577 byte pada uji saya, termasuk blok variabel). Manfaat nyata datang dari konsolidasi aturan duplikat (D10), penghapusan kode mati (D9), dan pemindahan CSS postingan ke tema (S7).
- Jangan menghapus awalan vendor tanpa daftar target browser; periksa dulu kebutuhan perangkat audiens.
- Jangan sertakan `body#layout` ke dalam `<b:skin>`; bagian itu milik `<b:template-skin>`.

## Lampiran: Daftar prioritas pengerjaan

1. K3: tambahkan `width`/`height` pada 9 postingan (perbaikan cepat, dampak CLS langsung).
2. K1: reservasi tinggi iklan per slot (D1) dan verifikasi dengan data lapangan.
3. K2: perbaiki selektor penempatan iklan (D2).
4. S4/S5: satukan sumber schema, perbaiki JSON-LD rusak.
5. S1: perbaikan tap target elemen navigasi (D5).
6. S2/S3: reservasi ruang related/komentar dan lazyload native (D4, D6).
7. S7, R1-R9: pembersihan dan konsolidasi.
