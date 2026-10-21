# Laporan Audit Tema Blogger KALINZ

Tema: linkmagz 3.8.0 (kalinz custom 2026)
Tanggal audit: 20 Oktober 2026
Fokus: Cumulative Layout Shift (CLS), kepatuhan Blogger XML modern, kebersihan HTML/CSS, SEO on-page

---

## 1. Ringkasan Eksekutif

### 1.1 Metode dan batasan

Audit dijalankan di lingkungan kerja saya terhadap isi `kalinz.zip`. Yang benar-benar dijalankan:

- Parsing XML `template.xml` (hasil: well-formed).
- Perbandingan aturan CSS satu per satu antara `assets/styles.css` dan CSS di dalam `template.xml` (menggunakan parser CSS, bukan sekadar diff teks).
- Parsing seluruh 48 file HTML (44 postingan, 4 halaman): keseimbangan tag, atribut gambar, struktur heading, JSON-LD (di-`json.loads`), microdata, sumber daya eksternal.
- Uji alur build CSS (minify dan injeksi ke `template.xml`) beserta verifikasi kesetaraan aturan sebelum dan sesudah. Skrip pada bagian 5 adalah skrip yang sama yang sudah diuji.

Batasan yang perlu Anda ketahui:

1. CLS dianalisis secara statis (membaca kode dan menalar mekanisme render). Tidak ada pengukuran Lighthouse atau CrUX karena Blogger merender XML di sisi server dan hasilnya tidak bisa direproduksi secara offline. Angka dampak yang saya tulis adalah estimasi kasar, bukan hasil ukur. Langkah pengukuran ada di bagian 5.
2. Validasi akhir sintaks Blogger hanya bisa dilakukan oleh server Blogger saat template diunggah.
3. Isi zip tidak sama persis dengan struktur direktori yang Anda tuliskan:
   - Folder `archive/` (`kamus-nias-indonesia-1985.pdf`, `template-original.xml`) tidak ada di dalam zip.
   - `template-postingan/lirik-lagu-versi-lengkap.html` dan `lirik-lagu-versi-standar.html` berukuran 0 byte (kosong).
   - Zip memakai pemisah path backslash (dibuat di Windows). Ini terbaca dengan peringatan oleh `unzip` di Linux/macOS, tetapi tidak merusak isi.

### 1.2 Ringkasan angka

| Item | Nilai |
|---|---|
| `template.xml` | 370.995 byte, 4.744 baris, well-formed |
| CSS skin di XML (`<b:skin>`) | 88.593 byte (minified, 1 baris) |
| CSS Custom di widget `HTML82` | 5.414 byte, 37 aturan |
| `assets/styles.css` | 102.594 byte, 681 aturan |
| Aturan di styles.css yang tidak ada di XML | 0 |
| Aturan di XML yang tidak ada di styles.css | 1 (blok `:root` berisi variabel `$(...)`) |
| Aturan Custom CSS (widget) yang ada di styles.css | 0 dari 37 |
| Postingan | 44 (26 bertanda `kalinz-custom-schema`, 17 punya JSON-LD sendiri tanpa tanda, 1 tanpa JSON-LD) |
| Postingan dengan blok `<style>` inline | 43, total 192,5 KB CSS berulang |
| Sintaks Blogger | `b:eval` 16, `b:class` 58, `b:attr` 3, `b:with` 30, `b:loop` 44, `b:include` 225, atribut `expr:` 414 |

### 1.3 Temuan berdasarkan tingkat keparahan

#### Kritis (menyebabkan pergeseran layout besar di area terlihat, atau merusak data penting)

| ID | Temuan | Lokasi |
|---|---|---|
| K1 | Gambar unggulan di 9 postingan tidak punya `width`/`height`; 2 postingan punya atribut dengan rasio salah (`tice-fabali-awuyu`: 300x181 padahal gambar 400x400; `_sejarah-pulau-nias`: 320x80 padahal gambar 400x225) | `postingan/erickijo-*.html` (8), `gauswaruwu-lo-ubinio.html`, `tice-fabali-awuyu.html`, `_sejarah-pulau-nias.html` |
| K2 | Slot iklan: AdSense baru dimuat setelah scroll pertama, tinggi cadangan tidak mewakili variasi ukuran iklan, dan beberapa selector cadangan tidak lagi cocok setelah iklan dipindahkan oleh JavaScript | `template.xml` baris 4721-4740, 4032-4150, 2457-2479; `styles.css` baris 4701-4733 |

#### Sedang

| ID | Temuan | Lokasi |
|---|---|---|
| S1 | Iframe editor komentar (versi threaded kustom) tanpa tinggi awal | `template.xml` baris 1338 |
| S2 | Kontainer Artikel Terkait kosong tanpa ruang cadangan, diisi lewat JSONP setelah halaman dimuat | `template.xml` baris 781, 793-856 |
| S3 | Struktured data ganda: 17 postingan punya JSON-LD `Article` sendiri, tetapi tidak bertanda sehingga template menambahkan `BlogPosting` kedua | `template.xml` baris 412-440; 17 file postingan |
| S4 | JSON-LD tidak valid (tanda kutip tidak di-escape) pada `bjbtrio-onomatua-sibarisi.html` | baris 4 blok JSON-LD |
| S5 | Ikon sosial footer tidak pernah tampil: font `linkmagzfont` dipakai tetapi tidak pernah didefinisikan, dan tidak ada aturan `content` untuk `icon-*` | `template.xml` baris 2270-2278, 4551-4562 |
| S6 | `styles.css` tidak sinkron dengan template: tidak memuat blok `:root` dan seluruh Custom CSS (termasuk aturan reservasi ruang iklan) | `assets/styles.css` |
| S7 | `halaman/kontak.html` memuat Font Awesome 6.4.2 lewat `<link>` di dalam isi halaman (render-blocking, ikon bergeser saat font tiba) | `halaman/kontak.html` baris 1, 124-130 |
| S8 | Semua gambar di template dimuat lewat JS (`Defer.dom`, `rootMargin:1px`) setelah event load, termasuk kandidat LCP (gambar Featured Post dan kartu pertama) | `template.xml` baris 913, 561, 2793 |
| S9 | Fitur "Baca Juga" tidak berfungsi: `showBacaJuga` tidak pernah dipanggil, dan `escapeHTML` yang dipakainya terkunci di dalam IIFE lain | `template.xml` baris 619-657, 811 |
| S10 | 43 postingan menyalin blok `<style>` yang sama (4,4-4,6 KB, 11-19 `!important`) | seluruh `postingan/` |
| S11 | Dua berkas template postingan kosong (0 byte) | `template-postingan/` |
| S12 | Cacat HTML: sel tabel `<td>` salah tutup (`bjbtrio-no-nifiliu.html` baris 346), `</em>` tanpa pembuka (`tice-hato-fee-khogu.html` baris 374) | file bersangkutan |

#### Ringan

| ID | Temuan |
|---|---|
| R1 | `<link rel="preconnect" crossorigin>` untuk `blogger.googleusercontent.com` tidak cocok dengan permintaan gambar biasa (non-CORS), sehingga koneksi preconnect tidak terpakai |
| R2 | Aturan `#header .widget img` ditulis 5 kali dengan nilai `max-height` yang saling bertentangan (24px vs 28px pada lebar 480px) |
| R3 | `h1.blog-title` disembunyikan dengan `visibility:hidden` pada beranda sehingga hilang dari pohon aksesibilitas |
| R4 | Sisa Google+ dan atribut usang: `g-follow`, `googlePlusShare`, `rel="publisher"`, `rel="image_src"`, `msapplication-navbutton-color` |
| R5 | Microdata `BreadcrumbList`: `<meta>` berada di dalam `<a>`, URL label berbentuk `?&max-results=6` (salah), item halaman aktif tidak ada |
| R6 | Tiga widget sidebar (`HTML1`, `HTML2`, `HTML3`) tanpa atribut `version` eksplisit (tetap valid karena `b:defaultwidgetversion='2'`, hanya soal konsistensi) |
| R7 | Pendengar scroll AdSense tidak `passive` dan tidak dilepas setelah dipakai |
| R8 | Meta Twitter tidak konsisten: `twitter:card` memakai `name`, sisanya `property` |
| R9 | `target="_blank"` tanpa `rel` pada 9 tautan di 3 halaman statis |
| R10 | Logo sumber `logo_kalinz.png` berukuran 3264x707 (1,2 MB; versi compressed 247 KB) padahal tampil sekitar 152x33 px |
| R11 | Logo publisher di JSON-LD postingan memakai `=w1600`, sedangkan panduan Google menyarankan maksimal 600x60 |
| R12 | Satu entri di `index-lagu.md` ("Hana") menautkan ke URL gambar, bukan URL postingan |
| R13 | Widget `Navbar1` (tidak terlihat) masih memuat sisa `origin=http://localhost:80` dan `draft.blogger.com` |
| R14 | Microdata `FAQPage` di `_sejarah-pulau-nias.html` tidak lagi menghasilkan rich result untuk situs umum sejak Agustus 2023 (tidak berbahaya, hanya tidak memberi keuntungan tampilan) |

#### Yang sudah baik (agar tidak diubah tanpa perlu)

- Font: seluruh tema memakai tumpukan font sistem (`system-ui, -apple-system, ...`). Tidak ada web font, sehingga tidak ada FOIT/FOUT dari tema dan tidak ada pergeseran teks karena swap font.
- Thumbnail beranda: kontainer `padding-top:56.25%` dengan gambar `position:absolute`, ditambah atribut `width='400' height='225'` dan crop 16:9 dari `resizeImage`. Ruang sudah dicadangkan.
- Gambar Popular Posts: pola yang sama (56,25%), terjaga.
- Avatar komentar: kontainer 45x45 / 36x36 / 35x35 dengan atribut `width`/`height` pada `<img>`.
- Foto penulis: kontainer 70x70 tetap.
- `body{overflow-y:scroll}` mencegah pergeseran akibat kemunculan scrollbar.
- Menu sticky memakai `position:fixed` + `transform`, sehingga tidak memengaruhi alur dokumen.
- `.youtube-responsive` memakai rasio 16:9 lewat `::after` (cocok untuk embed YouTube di masa depan).
- Viewport: `<meta content='width=device-width, initial-scale=1' name='viewport'/>` sudah benar (tidak ada `maximum-scale`/`user-scalable=no`).
- Struktur semantik: `<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<nav>`. H1 pada halaman postingan dan statis dirender oleh template (`blogPostTitle`), sehingga isi postingan tepat memulai dari H2.

---

## 2. Analisis Mendalam Penyebab CLS dan Solusinya

Catatan skala: CLS = fraksi dampak (porsi viewport yang terkena) x fraksi jarak (jarak geser dibanding tinggi viewport). Pergeseran yang terjadi dalam 500 ms setelah input diskrit (klik, ketuk, tombol) dikecualikan, tetapi scroll tidak termasuk dalam pengecualian itu.

### 2.1 Gambar

#### 2.1.1 Gambar unggulan di postingan (K1) - risiko tertinggi

Mekanisme: global CSS `img,table{max-width:100%;height:auto}` (di `styles.css` blok normalize) dan `.post-kalinz .post-featured-image{width:100%;max-width:400px;height:auto}` membuat tinggi gambar ditentukan oleh rasio gambar. Tanpa atribut `width`/`height`, browser tidak punya rasio sebelum gambar diunduh, sehingga tingginya 0 px. Ketika gambar tiba, seluruh isi artikel di bawahnya terdorong ke bawah setinggi gambar (sampai 400 px di desktop, sekitar lebar layar di ponsel). Gambar ini berada di area atas artikel, jadi masuk viewport awal.

Hasil pemindaian seluruh 44 postingan terhadap parameter ukuran di URL Blogger (`/w400-h400/`):

| File | Kondisi | Dampak |
|---|---|---|
| `erickijo-bagofa-ama-eta`, `-bowo-melati`, `-faomasida`, `-mekhe-mekhe`, `-saohagolo`, `-sowokhi`, `-yaugo-ufili`, `erickijo_hulo_batu`, `gauswaruwu-lo-ubinio` | tanpa `width`/`height` | ruang cadangan 0 px, geser penuh setinggi gambar |
| `tice-fabali-awuyu` | atribut 300x181 (rasio 1,657), gambar asli 400x400 (rasio 1,0) | cadangan sekitar 241 px, aktual 400 px: geser sekitar 159 px pada lebar 400 px |
| `_sejarah-pulau-nias` | atribut 320x80 (rasio 4,0), gambar asli 400x225 (rasio 1,78) | geser sekitar 100 px pada lebar 320 px; atribut `border="0"` juga usang |
| `tice-faomasigu-yaugo` | atribut 400x400, gambar 400x389 | geser sekitar 11 px (kecil) |
| `tice-telefonmo`, `tice-yae-goroisagu` | atribut 300x181, gambar 400x241 | rasio nyaris sama (1,657 vs 1,660), aman; hanya ukuran atribut tidak sama dengan URL |
| `_mengenal-lagu-nias` | atribut 800x533, URL 400x266 | rasio aman; atribut lebar 800 tidak sesuai sumber 400 |

Estimasi kasar (bukan hasil ukur): pada ponsel 360x640, satu pergeseran 316 px di atas konten artikel setara fraksi jarak sekitar 0,49 dengan dampak mendekati 1, jadi kontribusi satu peristiwa ini saja bisa berorde 0,3 hingga 0,5, jauh di atas ambang "baik" 0,1.

Solusi: sinkronkan `width`/`height` dengan parameter di URL gambar. Skrip otomatis tersedia di bagian 3.10 (sudah diuji: memperbaiki 15 file).

#### 2.1.2 Logo header

Alur: widget `Header1` mengeluarkan `<img width="452" height="98" src=resizeImage(...,160) srcset=...>` (`template.xml` baris 2533-2535; nilai `displayWidth=452`, `displayHeight=98` di pengaturan widget baris 2503-2508). CSS lalu menimpanya:

```css
#header .widget img { max-height: var(--logo-height); display: block; width: auto; margin: 5px 25px 5px 0 }
```

Atribut `width`/`height` HTML adalah petunjuk presentasi yang tertimpa oleh `width:auto` dan `height:auto` global. Hasilnya, sebelum gambar dimuat browser hanya memiliki rasio dari atribut dan tidak punya ukuran intrinsik. Lebar akhir (sekitar 152 px pada tinggi 33 px) baru stabil setelah gambar dekode. Pada flex container `#header .widget` (display:flex), perubahan lebar logo mendorong `h1.blog-title` dan deskripsi di sebelahnya. Di layar kecil (`#header` diposisikan absolut di tengah dengan `transform: translate(-50%,-50%)` dan `max-width: calc(100% - 128px)`), lebar logo yang berubah menggeser posisi tengahnya.

Selain itu aturan yang sama diulang di 5 tempat (`styles.css` baris 940, 964, 1083, 1987, 4628) dengan `max-height` yang bertentangan: blok 480px yang pertama menetapkan 24px, blok 480px yang paling akhir (baris 4628) menetapkan 28px dan menang karena urutan cascade. Nilai 24px menjadi kode mati.

Solusi: tentukan `height` pasti (bukan hanya `max-height`) dan `aspect-ratio` sama dengan rasio widget. Diff di bagian 3.1.

Gambar sumber `assets/logo_kalinz.png` (3264x707, 1,2 MB) tidak dikirim langsung ke pengunjung karena `resizeImage(...,160)` dan `320` meminta versi kecil dari server Blogger, jadi ini bukan masalah CLS atau performa runtime, hanya bobot repositori. Ekspor ulang pada 2x ukuran tampil (sekitar 320x70) dalam WebP akan menghasilkan beberapa KB.

#### 2.1.3 Thumbnail beranda, Featured Post, Popular Posts

- Thumbnail dan Popular Posts: aman (lihat "Yang sudah baik").
- Featured Post (desktop): `.featured-img img.image{width:100%;display:block;height:auto}` dengan atribut `width='400' height='400'` dan placeholder 1x1 PNG. Rasio 1:1 dari atribut terjaga, tidak bergeser. Crop 1:1 dari `resizeImage(...,"1:1")` juga cocok.
- Featured Post (seluler, di bawah 600 px): gambar `position:absolute;bottom:0` di dalam kotak `padding-top:75%` (4:3) padahal gambar 1:1. Ini membuat gambar terpotong bagian atasnya, bukan CLS.
- Pola `placeholder base64 + class lazyload + opacity:0` tidak menyebabkan CLS karena atribut dimensi tetap ada pada placeholder; masalah yang timbul adalah keterlambatan muat (S8, bagian 2.5).

#### 2.1.4 Avatar komentar dan foto penulis

Aman. Kontainer 45x45 / 36x36 / 35x35 dan 70x70 bersifat tetap. `.comments-threaded .avatar-image-container` sudah memiliki `width`/`height`/`max-height` ganda, dan `<img>` dilengkapi `height='45' width='45'`.

### 2.2 Strategi font

- Tema tidak memuat web font apa pun (tidak ada `@font-face`, tidak ada `fonts.googleapis.com`). Tumpukan: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Tidak ada FOIT/FOUT, tidak ada pergeseran teks dari swap font. Preload font tidak diperlukan.
- Satu pengecualian bermasalah (S5): `font-family: linkmagzfont !important` pada `.footer-sosmed-wrap i::before` (`template.xml` baris 2276) dan `#share a i::before` (di CSS skin). Tidak ada `@font-face` untuk `linkmagzfont` di mana pun (dicari di XML dan styles.css), dan tidak ada aturan `content:` untuk `.icon-facebook`, `.icon-youtube`, `.icon-tiktok`, `.icon-whatsapp`. Hasilnya `<i class="icon-facebook"></i>` di footer (`template.xml` baris 4551-4562) adalah elemen kosong, jadi keempat tautan sosial tidak tampak. Ini bukan CLS melainkan cacat tampilan dan aksesibilitas visual (tautan masih punya `aria-label`).
  - Tombol bagikan di bawah artikel memakai SVG inline (baris 771-774), sehingga tidak terdampak.
- `halaman/kontak.html` (S7): memuat `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css` lewat `<link rel="stylesheet">` di dalam isi halaman. CSS Font Awesome 6 memakai `font-display: block`, jadi glyph ikon tidak terlihat sampai font tiba (hingga sekitar 3 detik) lalu muncul. Elemen `<i class="fa-brands ...">` di dalam `.social-item` yang `display:inline-flex; gap:8px` berubah lebar dari 0 ke sekitar 16 px, sehingga setiap tombol sosial melebar dan menggeser tombol di sampingnya. Ini juga menambah satu stylesheet render-blocking pada halaman. Solusi di bagian 3.12.

### 2.3 Skrip eksternal, iklan, iframe, dan widget dinamis

#### 2.3.1 Iklan (K2)

Alur muatan saat ini:

1. Tiga slot (`iklan-atas`, `iklan-tengah1`, `iklan-bawah`), matched content, dan in-feed dirender sebagai `<b:section>` di akhir `#content-wrap` (baris 4032-4150), dengan isi `<div class="iklan-wrapper"><ins class="adsbygoogle" ...></ins></div>` dan `(adsbygoogle = window.adsbygoogle || []).push({})`.
2. Skrip inline di baris 4150-4220 memindahkan `.widget-content` iklan ke dalam `.post-body-artikel` (di tengah paragraf, mis. `.kode-iklan-tengah`), ke `#ms-matched-content`, atau ke grid beranda (in-feed, sebagai `<article class="post-outer infeedads">` di posisi ke-3).
3. Pustaka `adsbygoogle.js` baru disisipkan setelah event `scroll` pertama (baris 4721-4740).

Masalah:

- **Pemuatan dipicu scroll.** Karena scroll tidak dikecualikan dari penghitungan CLS, saat pengunjung mulai menggulir iklan di dalam viewport terisi, tinggi slot berubah, dan konten di bawahnya bergeser. Ini sering terjadi di ponsel.
- **Tinggi cadangan tidak mewakili ukuran iklan.** `.iklan-wrapper{min-height:250px}` dan margin 20 px di atas/bawah memberi total sekitar 290 px. Format yang dipakai bervariasi: `data-ad-format="auto"` (responsif, bisa 90 px hingga 280+ px), `fluid` / in-article (biasanya sekitar 250-400 px), `autorelaxed` / matched content (bisa 500-700 px di ponsel). Jika iklan lebih tinggi dari cadangan, terjadi geser; jika lebih rendah, ada ruang kosong (tidak menyebabkan CLS).
- **Selector cadangan berbasis ID tidak cocok setelah pemindahan.** `#iklan-atas .widget-content{min-height:280px}`, `#iklan-bawah .widget-content{...}`, dan `#iklan-tengah1 .widget-content{min-height:250px}` (`template.xml` baris 2468-2479) hanya cocok selama elemen masih berada di dalam `#iklan-*`. Setelah JavaScript memindahkannya ke `.post-body-artikel`, selector itu tidak berlaku lagi. Yang tersisa: `.post-body .widget-content.kode-iklan-atas/-bawah{min-height:250px/280px}` (aturan baris 2457-2466). Untuk `.kode-iklan-tengah` tidak ada aturan sama sekali di dalam post-body, hanya `.iklan-wrapper{min-height:250px}`.
- **Unit matched content tidak pernah tampil.** Skrip membutuhkan `#ms-matched-content`, tetapi elemen itu tidak ada di markup template maupun di satu pun postingan. Jika `#ms-matched-content` tidak ditemukan, skrip menghapus widget dari DOM (`n.parentNode.removeChild(n)`). Hasilnya slot `HTML939` tidak pernah menampilkan iklan (tidak menyebabkan CLS, tetapi pendapatan dari unit itu nol).
- **In-feed beranda** disisipkan oleh skrip inline di akhir `<body>` (sebelum atau sekitar first paint), jadi risikonya lebih rendah, tetapi `.iklan-infeed .widget-content{max-width:calc(50% - 15px)}` dan `.iklan-wrapper{min-height:250px}` perlu diselaraskan dengan tinggi kartu tetangga agar baris grid tidak berubah tinggi.
- Pendengar scroll bersifat global dan tetap terpasang setelah dipakai (R7).

Catatan kebijakan: jangan memotong atau menyembunyikan iklan dengan `height` tetap + `overflow:hidden`. Pendekatan aman adalah `min-height` yang sesuai, bukan `height` tetap.

Solusi: bagian 3.2 (CSS) dan 3.5 (pemuat). Nilai tinggi yang saya sarankan adalah titik awal; ukur tinggi iklan yang benar-benar tampil (DevTools, atribut `data-ad-status` dan tinggi `ins`) lalu sesuaikan.

#### 2.3.2 Iframe komentar (S1)

`template.xml` baris 1338 (`custom-comments-form`):

```xml
<iframe class='blogger-iframe-colorize blogger-comment-from-post' frameborder='0' id='comment-editor' name='comment-editor' src='' style='width:100%;' title='comment-editor' width='200'/>
```

Tidak ada tinggi awal. Iframe tanpa tinggi memakai default 150 px, lalu skrip Blogger (`BLOG_CMT_createIframe`) mengubah tingginya setelah dimuat (dipicu `Defer(createIframeComment, 0, true)`, yaitu setelah load). Versi non-threaded di baris 3171 sudah memakai `expr:height='data:cmtIframeInitialHeight ?: "90px"'`; versi kustom tidak. Letaknya di bawah artikel, jadi dampaknya ada saat pengunjung menggulir ke komentar. Solusi di bagian 3.6.

#### 2.3.3 Artikel Terkait dan Baca Juga (S2, S9)

- `<div id='ms-related-post'/>` (baris 781) kosong dan diisi `innerHTML` setelah feed JSONP `/feeds/posts/default/-/<label>?alt=json-in-script` tiba (baris 793-856). CSS `#ms-related-post` tidak punya `min-height`. Saat terisi (judul + daftar 3 tautan, sekitar 150-190 px) konten di bawahnya (tombol bagikan, komentar) terdorong. Dampak terutama untuk pengunjung yang sudah menggulir ke area itu.
- "Baca Juga": fungsi `showBacaJuga(json)` (baris 627) tidak dipanggil oleh kode mana pun (pemanggilan seharusnya lewat permintaan feed di `relatedPostScript`, tetapi permintaan itu hanya memanggil `msRelatedPosts`). Selain itu, fungsi itu memanggil `escapeHTML`, sedangkan `escapeHTML` hanya didefinisikan di dalam IIFE `relatedPostScript` (baris 811), bukan global. Jika suatu hari dipanggil, akan memunculkan `ReferenceError`. Bila fitur ini dihidupkan kembali, blok yang disisipkan di tengah artikel (`insertBefore` pada paragraf ke-50%) juga akan menimbulkan CLS. Rekomendasi: hapus kode mati atau perbaiki sekaligus dengan ruang cadangan.
- `<div id='baca-juga'/>` kosong (di luar `.post-body`, sehingga disembunyikan oleh `#baca-juga{display:none}`); aman.

#### 2.3.4 TOC (Daftar Isi)

Hanya `_sejarah-pulau-nias.html` yang memuat `<div id="toc"><b class="toc">Daftar Isi</b></div>`. JS membuat `<ol>` dan langsung memberinya `height:0; overflow:hidden` (tertutup), serta menambahkan tombol "(show)" di dalam `<b class="toc">`. Perubahan tinggi mendekati nol (hanya teks tombol bertambah di baris yang sama), risiko CLS kecil. Penggunaan `scrollHeight` saat tombol diklik tidak memengaruhi CLS karena itu respons terhadap input.

#### 2.3.5 Skrip eksternal lain

- Skrip analitik lewat `<b:include name='google-analytics'/>` standar Blogger.
- `https://www.gstatic.com/charts/loader.js` ada hanya di `defaultmarkup` widget Stats (baris 1664), dan widget Stats tidak ada di tata letak, jadi tidak dimuat.
- Widget `Navbar1` (tidak terlihat, baris 4667-4700) menyimpan sisa skrip preview (`origin=http://localhost:80`, `draft.blogger.com/navbar/...`, `apis.google.com/js/platform.js`). Karena `visible='false'` dan `.navbarrr{display:none}`, aman, tetapi sebaiknya dibersihkan (R13).
- `defer.js` inline di `<head>` (sekitar 5 KB) ringan dan tidak memblokir.

### 2.4 Contain, min-height, flex/grid pada kontainer utama

Tidak ada `aspect-ratio`, `contain`, maupun `content-visibility` di seluruh template (dicari di XML dan CSS). Tata letak mengandalkan `padding-top` persentase (cara lama yang valid) dan `min-height`.

| Kontainer | Kondisi | Penilaian |
|---|---|---|
| `#header-outer #header-content` | `min-height: var(--header-height)` (48px) dan pseudo `::after` dengan `min-height:inherit`; di bawah 900px `min-height: var(--menu-height)` (62px) | Baik, ruang header tercadang |
| `.menu-sticky .nav-outer` / `.navmenu .nav-outer` | `min-height: var(--menu-height)` | Baik |
| `#wrapper`, `#content-wrap`, `#sidebar-wrap` | flex `flex:1 1 69%` / `1 1 31%` dengan `max-width` persen, `min-width:0` | Baik, lebar kolom tidak bergantung pada isi |
| `.main-content` | `overflow-x:auto; overflow-y:hidden` | Membuat kontainer scroll baru; bukan CLS, tetapi dapat memotong `box-shadow`/outline fokus di tepi. Pertimbangkan `overflow-x:clip` |
| `.post-body` | tanpa `min-height`, tanpa `contain` | Normal untuk artikel; gambar bertanda dimensi (setelah K1) cukup |
| `.sidebar-sticky` | `position:sticky; top:36px` | Baik |
| Footer | tinggi ditentukan teks | Baik |
| Tahun hak cipta | `<span id='copyright-year'>` diisi skrip inline langsung setelah elemen | Praktis dieksekusi sebelum paint; abaikan |

Peringatan penting bila ingin menambahkan `contain`: jangan menerapkan `contain: layout` atau `paint` pada `#header-outer` atau `#navmenu-wrap`. Menu sticky (`#navmenu-wrap-sticky`) berada di dalamnya dengan `position:fixed`; `contain: layout` menjadikan header sebagai containing block bagi elemen fixed sehingga menu sticky tidak lagi menempel pada viewport.

Penambahan yang aman dan berguna (opsional): `content-visibility:auto` dengan `contain-intrinsic-size` untuk blok bawah-lipatan yang berat, misalnya `#ms-related-post` dan `#footer-outer`. Hindari pada `#comments` karena tautan `#comments` dan fitur cari-di-halaman bergantung pada konten yang ter-render.

### 2.5 Dampak ke LCP (di luar CLS, tetapi satu metrik Core Web Vitals)

- Seluruh gambar template memakai `class="lazyload"` + `data-src` + placeholder, dan dimuat oleh `Defer.dom("img.lazyload",100,"loaded",null,{rootMargin:"1px"})` (baris 913). Pustaka defer.js menjalankannya setelah event `load` atau saat interaksi pertama, dengan jeda 100 ms, dan `rootMargin:1px` berarti tidak ada pramuat sebelum gambar masuk viewport. Gambar Featured Post dan kartu pertama di beranda hampir pasti menjadi kandidat LCP, sehingga LCP tertunda sampai setelah load.
- Di postingan, gambar unggulan di isi artikel memakai `<img>` biasa dan `fetchpriority="high"` pada 25 dari 44 postingan. 19 postingan lain tidak memilikinya: 9 yang juga tanpa dimensi gambar (K1) dan 10 yang punya dimensi tetapi tanpa `fetchpriority` (daftar di bagian 4.1).
- Saran: untuk gambar Featured Post (satu gambar di atas lipatan di beranda) gunakan `src` langsung + `fetchpriority="high"` + tanpa `lazyload`; untuk sisanya gunakan `loading="lazy"` bawaan browser. Ini perubahan perilaku, jadi uji di beranda.

---

## 3. Kode Perbaikan (Diff / Snippet)

Konvensi: baris berawalan `-` dihapus, `+` ditambahkan. Nomor baris merujuk ke berkas yang Anda unggah. Untuk CSS, ubah `assets/styles.css` (sumber kebenaran), lalu bangun ulang seperti di bagian 5.

### 3.1 `assets/styles.css` - logo header (K-terkait, R2)

Sebelum (baris 940-945):

```css
#header .widget img {
    max-height: var(--logo-height);
    display: block;
    width: auto;
    margin: 5px 25px 5px 0
}
```

Sesudah:

```css
#header .widget img {
    height: var(--logo-height);          /* tinggi pasti, lebar dihitung dari rasio */
    width: auto;
    aspect-ratio: 452 / 98;              /* samakan dengan displayWidth/displayHeight widget Header1 */
    max-width: 100%;
    display: block;
    margin: 5px 25px 5px 0
}
```

Konsolidasi duplikat (baris 964, 1083, 1987, 4628): ganti `max-height` dengan `height` di setiap breakpoint, dan hapus blok 24px yang kalah oleh blok akhir.

```diff
 @media only screen and (max-width: 900px) {
-    #header .widget img { max-height: 28px; margin: 0 }
+    #header .widget img { height: 28px; margin: 0 }
 }
 @media only screen and (max-width: 480px) {
-    #header .widget img { max-height: 24px }      /* kalah oleh blok akhir, hapus */
-    ...
-    #header .widget img { max-height: 28px; margin: 0 }
+    #header .widget img { height: 28px; margin: 0 }
 }
```

Hal yang sama untuk `.nav-copy .sticky-logo-link img` (baris 947-950, 2020-2023, 4640-4645): gunakan `height`, bukan `max-height`.

### 3.2 `assets/styles.css` - reservasi ruang slot iklan (K2)

Sebelum (baris 4701-4733):

```css
.iklan-wrapper {
    position: relative; display: block; text-align: center;
    min-height: 250px; margin: 20px auto; width: 100%; overflow: hidden;
    background-color: #f5f5f5; border: 1px dashed #e0e0e0; border-radius: 4px
}
```

Sesudah (tinggi per slot lewat custom property, selector berbasis kelas yang tetap cocok setelah JS memindahkan elemen):

```css
.iklan-wrapper {
    --ad-min: 280px;
    position: relative; display: block; text-align: center;
    min-height: var(--ad-min); margin: 20px auto; width: 100%; overflow: hidden;
    background-color: #f5f5f5; border: 1px dashed #e0e0e0; border-radius: 4px
}
/* Responsive display (atas, bawah) */
.kode-iklan-atas  .iklan-wrapper,
.kode-iklan-bawah .iklan-wrapper { --ad-min: 280px }
/* In-article fluid */
.kode-iklan-tengah .iklan-wrapper { --ad-min: 300px }
/* Matched content / autorelaxed: lebih tinggi di ponsel */
.kode-matched-content .iklan-wrapper { --ad-min: 320px }
@media only screen and (max-width: 480px) {
    .kode-matched-content .iklan-wrapper { --ad-min: 600px }
}
/* Slot tidak terisi: tetap pertahankan ruang agar tidak ada geser susulan */
.iklan-wrapper ins.adsbygoogle[data-ad-status="unfilled"] { visibility: hidden }
```

Hapus aturan lama berbasis ID yang tidak lagi cocok (di widget Custom CSS, `template.xml` baris 2468-2479) bila Anda memindahkan Custom CSS seperti di bagian 5:

```diff
-/* Stabilkan CLS slot iklan */
-#iklan-atas .widget-content,
-#iklan-bawah .widget-content { min-height: 280px; }
-#iklan-tengah1 .widget-content { min-height: 250px; }
```

Dan aturan `.post-body .widget-content.kode-iklan-atas/-bawah{min-height:...}` (baris 2457-2466) boleh dihapus karena tinggi kini diatur oleh `.iklan-wrapper`.

### 3.3 `assets/styles.css` - Artikel Terkait dan editor komentar (S1, S2)

Tambahkan:

```css
#ms-related-post { min-height: 190px }          /* judul + 3 tautan */
.comments-threaded .custom-comment-editor-wrapper { min-height: 90px }
```

Opsional (blok bawah-lipatan):

```css
#ms-related-post,
#footer-outer {
    content-visibility: auto;
    contain-intrinsic-size: auto 200px;
}
```

### 3.4 `template.xml` - preconnect (R1)

Sebelum (baris 118-119):

```xml
<link crossorigin='' href='https://blogger.googleusercontent.com' rel='preconnect'/>
<link href='https://blogger.googleusercontent.com' rel='dns-prefetch'/>
```

Sesudah (`<img>` tanpa atribut `crossorigin` memakai kolam koneksi non-CORS, jadi preconnect tidak boleh anonymous):

```xml
<link href='https://blogger.googleusercontent.com' rel='preconnect'/>
<link href='https://blogger.googleusercontent.com' rel='dns-prefetch'/>
```

### 3.5 `template.xml` - pemuat AdSense (K2, R7)

Sebelum (baris 4721-4740):

```js
var lazyadsense = false;
window.addEventListener("scroll", function(){
    if ((document.documentElement.scrollTop != 0 && lazyadsense === false) || (document.body.scrollTop != 0 && lazyadsense === false)) {
        (function() {
            var ad = document.createElement('script');
            ad.setAttribute('data-ad-client','ca-pub-8813103182865992');
            ad.setAttribute('crossorigin','anonymous');
            ad.async = true;
            ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            var sc = document.getElementsByTagName('script')[0] || document.getElementsByTagName('head')[0];
            sc.parentNode.insertBefore(ad, sc);
        })();
        lazyadsense = true;
    }
}, true);
```

Sesudah (pendengar sekali pakai, pasif, dilepas serentak; ada cadangan waktu agar tidak bergantung pada scroll saja):

```js
(function () {
    var done = false, evts = ['scroll', 'touchstart', 'keydown', 'mousemove'];
    function loadAds() {
        if (done) return;
        done = true;
        evts.forEach(function (e) { window.removeEventListener(e, loadAds); });
        var s = document.createElement('script');
        s.async = true;
        s.crossOrigin = 'anonymous';
        s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8813103182865992';
        document.head.appendChild(s);
    }
    evts.forEach(function (e) { window.addEventListener(e, loadAds, { once: true, passive: true }); });
    setTimeout(loadAds, 5000);   /* cadangan; hapus baris ini bila ingin murni berbasis interaksi */
})();
```

Catatan: parameter `?client=` adalah bentuk yang dipakai kode standar AdSense saat ini; pemasangan atribut `data-ad-client` pada tag skrip tetap berfungsi, tetapi bentuk URL lebih umum. Mengubah waktu pemuatan memengaruhi tayangan iklan; pantau laporan AdSense setelah perubahan.

### 3.6 `template.xml` - iframe editor komentar (S1)

Sebelum (baris 1338):

```xml
<iframe class='blogger-iframe-colorize blogger-comment-from-post' frameborder='0' id='comment-editor' name='comment-editor' src='' style='width:100%;' title='comment-editor' width='200'/>
```

Sesudah:

```xml
<iframe class='blogger-iframe-colorize blogger-comment-from-post' frameborder='0' height='90' id='comment-editor' name='comment-editor' src='' style='width:100%;height:90px;' title='comment-editor' width='200'/>
```

(Blogger tetap dapat mengubah tinggi iframe setelah dimuat; nilai awal 90 px sama dengan nilai bawaan untuk versi non-threaded di baris 3171.)

### 3.7 `template.xml` - deteksi JSON-LD ganda (S3)

Sebelum (baris 413):

```xml
<b:if cond='data:post.body contains &quot;kalinz-custom-schema&quot;'>
```

Sesudah (postingan yang sudah memuat JSON-LD sendiri dianggap punya skema kustom, tanpa harus menambahkan komentar penanda di 17 file):

```xml
<b:if cond='data:post.body contains &quot;kalinz-custom-schema&quot; or data:post.body contains &quot;application/ld+json&quot;'>
```

Alternatif: tambahkan `<!-- kalinz-custom-schema -->` ke 17 file yang daftarnya ada di bagian 4.2. Catatan: penanda berupa komentar HTML bergantung pada Blogger mempertahankan komentar di `data:post.body`; deteksi `application/ld+json` tidak bergantung pada itu.

### 3.8 `template.xml` - breadcrumb (R5)

Sebelum (baris 471-477, 484):

```xml
<span itemprop='itemListElement' itemscope='itemscope' itemtype='https://schema.org/ListItem'>
    <a expr:href='data:blog.homepageUrl' itemprop='item' title='Home'>
        <meta content='1' itemprop='position'/>
        <span itemprop='name'><data:messages.home/></span>
    </a>
</span>
...
<a expr:href='data:label.url + &quot;?&amp;max-results=6&quot;' expr:title='data:label.name' itemprop='item'>
```

Sesudah:

```xml
<span itemprop='itemListElement' itemscope='itemscope' itemtype='https://schema.org/ListItem'>
    <a expr:href='data:blog.homepageUrl' itemprop='item' title='Home'>
        <span itemprop='name'><data:messages.home/></span>
    </a>
    <meta content='1' itemprop='position'/>
</span>
...
<a expr:href='data:label.url + &quot;?max-results=6&quot;' expr:title='data:label.name' itemprop='item'>
```

Terapkan pola yang sama (pindahkan `<meta itemprop="position">` keluar dari `<a>`) pada item label (baris 482-489) dan item cadangan (baris 492-499).

### 3.9 `template.xml` - kode mati "Baca Juga" (S9)

Pilihan paling sederhana: hapus fungsi `showBacaJuga` (baris 624-656), `<div id='baca-juga'/>` (baris 623), serta aturan `#baca-juga` dan `.baca-juga-wrap` di CSS. Jika fitur ingin dihidupkan, jadikan `escapeHTML` global dan pastikan ada pemanggil serta ruang cadangan:

```diff
-                function escapeHTML(str) {     /* di dalam IIFE relatedPostScript, baris 811 */
+                window.escapeHTML = function (str) {
                     return (str || '').replace(/[&<>'"]/g, function(tag) { ... });
-                }
+                };
```

### 3.10 Postingan - dimensi gambar otomatis (K1)

Skrip berikut menyetel `width`/`height` dari parameter `/wNNN-hNNN/` di URL gambar Blogger dan menghapus atribut `border` usang. Diuji pada salinan proyek: mengubah 15 file, dan setelahnya tidak ada `<img>` di `postingan/` yang tanpa dimensi. Jalankan tanpa argumen untuk simulasi, dengan `--write` untuk menyimpan.

```python
#!/usr/bin/env python3
"""Sinkronkan atribut width/height <img> dengan parameter ukuran Blogger di URL (/wNNN-hNNN/)."""
import re, sys, pathlib
ROOT = pathlib.Path(__file__).parent
IMG = re.compile(r"<img\b[^>]*>", re.I | re.S)
WH  = re.compile(r"/w(\d+)-h(\d+)(?:-[a-z-]+)?/")

def set_attr(tag, name, val):
    if re.search(rf"\s{name}\s*=", tag, re.I):
        return re.sub(rf"(\s{name}\s*=\s*)([\"']?)[^\s\"'>]*\2", rf'\g<1>"{val}"', tag, count=1, flags=re.I)
    return re.sub(r"<img\b", f'<img {name}="{val}"', tag, count=1, flags=re.I)

def fix(tag):
    m = WH.search(tag)
    if not m: return tag
    w, h = m.groups()
    new = set_attr(set_attr(tag, "width", w), "height", h)
    return re.sub(r'\sborder\s*=\s*["\']?\d+["\']?', "", new, flags=re.I)

changed = 0
for f in sorted(list((ROOT/"postingan").glob("*.html")) + list((ROOT/"halaman").glob("*.html"))):
    raw = f.read_bytes().decode("utf-8")
    out = IMG.sub(lambda m: fix(m.group(0)), raw)
    if out != raw:
        changed += 1; print("diperbarui:", f.relative_to(ROOT))
        if "--write" in sys.argv: f.write_bytes(out.encode("utf-8"))
print(f"{changed} file {'diperbarui' if '--write' in sys.argv else 'akan diperbarui (jalankan dengan --write)'}")
```

Contoh hasil pada `erickijo-sowokhi.html`:

```diff
-<img class="post-featured-image" src="https://blogger.googleusercontent.com/.../w400-h400/Sowokhi%20-%20Erick_Ijo.png" alt="..." title="...">
+<img height="400" width="400" class="post-featured-image" src="https://blogger.googleusercontent.com/.../w400-h400/Sowokhi%20-%20Erick_Ijo.png" alt="..." title="...">
```

Langkah manual tambahan: beri `fetchpriority="high"` pada gambar unggulan 19 postingan yang belum memilikinya (daftar di bagian 4.1) dan, untuk `_mengenal-lagu-nias`, samakan atribut `width="800"` dengan sumber (`w400-h266` -> `width="400" height="266"`, atau ganti URL ke `w800-h533`). Skrip di atas sudah menyetel 400x266 untuk file ini.

### 3.11 Postingan - JSON-LD tidak valid dan cacat HTML (S4, S12)

`postingan/bjbtrio-onomatua-sibarisi.html` (kutipan di dalam string JSON tidak di-escape):

```diff
-  "description": "Lirik lagu Nias Ono Matua Sibarisi dari BJB Trio lengkap dengan arti dan terjemahan. "Wa ya'o nakhi tödögu ha khömö". Makna lagu dan kosakata Li Niha.",
+  "description": "Lirik lagu Nias Ono Matua Sibarisi dari BJB Trio lengkap dengan arti dan terjemahan. \"Wa ya'o nakhi tödögu ha khömö\". Makna lagu dan kosakata Li Niha.",
```

`postingan/bjbtrio-no-nifiliu.html` baris 346 (tag `<td>` salah tutup, menghasilkan sel kosong ekstra):

```diff
-        <tr><td>ötema<td><td>kau terima</td></tr>
+        <tr><td>ötema</td><td>kau terima</td></tr>
```

`postingan/tice-hato-fee-khogu.html` baris 374 (`</em>` tanpa `<em>`):

```diff
-      <p class="post-faq-a">Hatö Fe'e Khögu</em> dalam bahasa Nias (Li Niha) berarti ...
+      <p class="post-faq-a"><em>Hatö Fe'e Khögu</em> dalam bahasa Nias (Li Niha) berarti ...
```

### 3.12 `halaman/kontak.html` - Font Awesome (S7)

Sebelum:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
...
<a class="social-item instagram" href="https://www.instagram.com/melinus_g" target="_blank">
  <i class="fa-brands fa-instagram"></i> @melinus_g
</a>
```

Sesudah (hapus `<link>`, pakai SVG inline sehingga tidak ada font yang dimuat dan lebar ikon tetap sejak awal; contoh Facebook memakai path yang sama dengan yang sudah ada di `template.xml` baris 774; untuk Instagram dan YouTube ambil SVG dari pustaka ikon pilihan Anda, misalnya Simple Icons, dengan memeriksa lisensinya):

```html
<a class="social-item facebook" href="https://www.facebook.com/lenoess/" target="_blank" rel="noopener noreferrer">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
  Lenoes G
</a>
```

Alternatif tercepat tanpa ikon: hapus elemen `<i>` dan biarkan teks saja. Tambahan CSS agar lebar ikon tetap bila memakai SVG: `.social-item svg{flex:0 0 16px}`. Tambahkan juga `rel="noopener noreferrer"` pada tautan `target="_blank"` (R9).

### 3.13 `template.xml` - ikon sosial footer (S5)

Sebelum (baris 4551-4562):

```html
<a href="https://facebook.com/lenoess" aria-label="Facebook" rel="noopener noreferrer" target="_blank">
    <i class="icon-facebook"></i>
</a>
```

Sesudah, perbaikan tercepat tanpa font ikon (tombol berlabel teks):

```html
<a href="https://facebook.com/lenoess" aria-label="Facebook" rel="noopener noreferrer" target="_blank">Facebook</a>
<a href="https://youtube.com/@kalinz-id" aria-label="YouTube" rel="noopener noreferrer" target="_blank">YouTube</a>
<a href="https://tiktok.com/@lenoes" aria-label="TikTok" rel="noopener noreferrer" target="_blank">TikTok</a>
<a href="https://whatsapp.com/channel/0029VbAh79s1t90dxLWm8T1o" aria-label="WhatsApp" rel="noopener noreferrer" target="_blank">WhatsApp</a>
```

```css
.footer-sosmed-wrap a { font-size: .875rem; padding: 6px 12px; border: 1px solid rgba(0,0,0,.15); border-radius: 18px; opacity: .85 }
```

Atau ganti dengan SVG inline seperti pada 3.12. Hapus aturan `.footer-sosmed-wrap i`, `.footer-sosmed-wrap i::before` yang merujuk `linkmagzfont`.

### 3.14 Pembersihan kecil lainnya (Ringan)

```diff
 <!-- template.xml baris 11, 20, 21 -->
-        <meta expr:content='data:skin.vars.body_background_color' name='msapplication-navbutton-color'/>
-        <b:tag cond='data:blog.googleProfileUrl' expr:href='data:blog.googleProfileUrl' name='link' rel='publisher'/>
-        <b:tag cond='data:view.featuredImage' expr:href='data:view.featuredImage' name='link' rel='image_src'/>
```

Hapus juga `includable id='googlePlusShare'` kosong (baris 2849, 3612, dan satu lagi) serta `includable id='userGoogleProfile'` dengan `div.g-follow` (baris 2038-2040), karena Google+ sudah ditutup. Aman dihapus bila tidak ada `b:include` yang memanggilnya (verifikasi dengan pencarian nama includable sebelum menghapus).

Untuk judul H1 beranda yang disembunyikan (R3), ganti teknik `visibility:hidden` (hilang dari pohon aksesibilitas) dengan teknik teks-tersembunyi-secara-visual:

```diff
-#header .widget .hide-title .blog-title { text-indent: -9999px; visibility: hidden; margin: 0; padding: 0; height: 0 }
+#header .widget .hide-title .blog-title {
+    position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
+    overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap
+}
```

Meta Twitter (R8): ubah `property='twitter:title'`, `property='twitter:url'`, `property='twitter:description'`, `property='twitter:image'` menjadi `name='...'` agar konsisten dengan `name='twitter:card'`.

---

## 4. Evaluasi Struktur Postingan dan Halaman Statis

### 4.1 Struktur HTML postingan (`postingan/`, 44 file)

Hasil parsing otomatis:

| Pemeriksaan | Hasil |
|---|---|
| Tag pembungkus (`<html>`, `<body>`, `<head>`, `<h1>`) di dalam isi | Tidak ada. Isi postingan aman sebagai fragmen di dalam `.post-body` |
| Heading | `h1`: 0 (benar, H1 berasal dari template). Pola `h2` 4-6 per lagu, `h3`: 0 untuk lagu; `_sejarah-pulau-nias` memiliki 13 `h2` dan 12 `h3` dengan urutan yang konsisten |
| Tag tidak seimbang | 2 file bermasalah: `bjbtrio-no-nifiliu.html` (2 `<td>` tidak tertutup di baris 346), `tice-hato-fee-khogu.html` (`</em>` liar di baris 374). Sisanya 42 file bersih. Tidak ada tag yang merusak pembungkus utama `.post-kalinz` |
| Pembungkus utama | Struktur `.post-kalinz` konsisten; kontainer dikunci dengan `box-sizing`, `overflow-wrap:anywhere`, dan `max-width:740px` |
| `<style>` inline | 43 dari 44 postingan menyalin blok yang sama: varian `bjbtrio` dan `tice` 4.639 byte (19 `!important`), varian `erickijo`/`gauswaruwu` 4.429 byte (11 `!important`), `_mengenal-lagu-nias` 4.163 byte (13 `!important`). Total 192,5 KB yang berulang di database Blogger, ikut terkirim di feed dan di respons JSONP |
| Gambar | Tepat 1 `<img>` per postingan, semua dari `blogger.googleusercontent.com`. 25 file memakai `fetchpriority="high"`; 19 tidak (9 tanpa dimensi gambar, ditambah 10 ini: `_mengenal-lagu-nias`, `_sejarah-pulau-nias`, tujuh `bjbtrio-*`, `tice-faomasigu-yaugo`) |
| Iframe/skrip eksternal | Tidak ada iframe maupun skrip eksternal di isi postingan |
| JSON-LD | 43 postingan punya `Article` (semua memuat field wajib: headline, description, image, author, publisher, datePublished, dateModified, mainEntityOfPage); 1 file (`bjbtrio-onomatua-sibarisi`) tidak valid; `_sejarah-pulau-nias` memakai microdata `FAQPage` |
| Penanda `kalinz-custom-schema` | 26 file bertanda; 17 file punya JSON-LD tanpa penanda (menghasilkan skema ganda, lihat 3.7) |

Catatan: untuk daftar lengkap 19 postingan tanpa `fetchpriority`, gunakan `grep -L 'fetchpriority' postingan/*.html`.

Daftar 17 postingan dengan JSON-LD sendiri tetapi tanpa penanda:
`_mengenal-lagu-nias`, `bjbtrio-boi-aetu-waomasi`, `bjbtrio-laua-nakhi`, `bjbtrio-na-uangeraigo-todo`, `bjbtrio-no-nifiliu`, `bjbtrio-no-nilau-dododa`, `bjbtrio-onomatua-sibarisi`, `erickijo-bagofa-ama-eta`, `erickijo-bowo-melati`, `erickijo-faomasida`, `erickijo-mekhe-mekhe`, `erickijo-saohagolo`, `erickijo-sowokhi`, `erickijo-yaugo-ufili`, `erickijo_hulo_batu`, `gauswaruwu-lo-ubinio`, `tice-faomasigu-yaugo`.

Rekomendasi struktur:

1. Pindahkan CSS `.post-kalinz` (dua varian yang hampir identik) ke `styles.css`, lalu hapus blok `<style>` dari 43 postingan. Manfaat: 192,5 KB lebih sedikit, satu sumber gaya, `!important` bisa dikurangi karena specificity dapat diatur dari tema, dan perubahan desain cukup di satu tempat. Setelah dipindah, pastikan `.post-kalinz` ada di CSS tema sebelum menghapus blok inline, karena Blogger menyimpan isi postingan apa adanya.
2. Gabungkan dua varian CSS (`bjbtrio/tice` dan `erickijo/gauswaruwu`) menjadi satu. Selisih 210 byte menandakan hampir identik; periksa dengan `diff` sebelum menyatukan.
3. Pertahankan H2 sebagai heading tertinggi di isi, sesuai konvensi template.

### 4.2 Halaman statis (`halaman/`, 4 file)

| File | `<style>` | Heading | Catatan |
|---|---|---|---|
| `disclaimer.html` | tidak ada | 5 H2 | Aman |
| `kebijakan-privasi.html` | tidak ada | 6 H2 | 3 tautan `target="_blank"` tanpa `rel` (R9) |
| `kontak.html` | 1.943 byte, 5 `!important` | 3 H2 | Memuat Font Awesome lewat `<link>` (S7); 3 tautan `_blank` tanpa `rel`; memakai Georgia dan Arial sehingga tampak berbeda dari font sistem tema |
| `tentang.html` | 1.271 byte | 3 H2 | Foto penulis tanpa atribut `width`/`height`, tetapi ukuran dikunci lewat CSS inline (`width:96px;height:96px`), jadi tidak bergeser; sebaiknya tetap tambahkan atribut agar konsisten; 3 tautan `_blank` tanpa `rel` |

Struktur heading halaman: H1 disediakan template (`#content-wrap-page h1`), isi dimulai dari H2. Benar.

### 4.3 `template-postingan/`

- `lirik-lagu-versi-lengkap.html` dan `lirik-lagu-versi-standar.html` berukuran 0 byte. Berkas ini seharusnya menjadi cetakan postingan baru dan merupakan tempat paling tepat untuk menerapkan perbaikan K1 (atribut `width`/`height` wajib), penanda skema, dan `fetchpriority="high"`. Pulihkan dari cadangan atau salin dari postingan `tice-*` yang sudah bertanda skema. Waktu modifikasi keduanya 2026-10-20 15:15 (sama dengan saat folder dikompres), dugaan saya berkas tertimpa kosong saat proses penyimpanan; saya tidak bisa memastikan penyebabnya.
- `index-lagu.md`: entri terakhir "Hana" menautkan ke URL gambar `blogger.googleusercontent.com/.../hana - tice_halawa.webp`, bukan URL postingan. Ganti dengan tautan postingan.

### 4.4 Kepatuhan SEO on-page (tingkat template)

- Viewport benar.
- Judul: `<title>` dibentuk dari `pageName - blog.title` untuk post/page/arsip/label, dan `pageTitle` untuk beranda. Baik.
- Canonical: `data:view.url.canonical`. Baik.
- Meta description: memakai `blog.metaDescription` dengan cadangan `pageName - blog.title`. Baik, tetapi ingat bahwa deskripsi per-postingan harus diisi di panel "Deskripsi penelusuran" Blogger agar unik.
- Open Graph lewat `<b:include name='openGraphMetaData'/>`; Twitter Card manual (lihat R8).
- JSON-LD: `WebSite` + `SearchAction` di beranda, `BlogPosting` otomatis di postingan tanpa skema kustom, `Article` kustom di postingan lain (lihat S3, S4).
- Logo publisher: otomatis 206x60 (baik); kustom `=w1600` (R11). Samakan semuanya ke satu URL logo berukuran sekitar 600x60 atau lebih kecil.
- Robots: tidak ada `meta robots` di template. Pengaturan `noindex` untuk halaman arsip dan hasil pencarian diatur di Pengaturan Blogger ("Tag header robots khusus"); tidak dapat saya verifikasi dari berkas yang diunggah.
- Heading template: H1 postingan/halaman benar; H1 beranda disembunyikan dengan `visibility:hidden` (R3).

### 4.5 Kepatuhan sintaks Blogger XML modern

Kesimpulan: template sudah memakai kerangka modern (`b:layoutsVersion='3'`, `b:defaultwidgetversion='2'`, widget v2 dengan `<b:includable>`), dan tidak ada tag v1 yang perlu diganti.

| Aspek | Penilaian |
|---|---|
| `<b:eval>` (16), `<b:with>` (30), `<b:loop>` (44), `<b:switch>` (16) | Dipakai dengan benar (mis. `b:loop ... where ... map`, `snippet(..., {length:150})`, `resizeImage(...)`) |
| `<b:class>` (58), `<b:attr>` (3) | Dipakai tepat untuk kelas/atribut bersyarat (`b:class cond=...`) |
| Atribut `expr:` (414) | Tidak usang. `expr:href`, `expr:src`, dan sejenisnya adalah sintaks pengikatan atribut standar Blogger v2/v3. Tidak perlu diganti. `<b:attr>` dipakai hanya untuk atribut bersyarat |
| `data:view`, `data:blog`, `data:post` | Dipakai konsisten (`data:view.isPost`, `isPage`, `isHomepage`, `isMultipleItems`, `isLayoutMode`; `data:post.url.canonical`, `.jsonEscaped`) |
| Widget tanpa `version` | `HTML1`, `HTML2`, `HTML3` (baris 4447, 4484, 4512). Tetap v2 karena default global; tambahkan `version='2'` hanya demi konsistensi (R6) |
| Sisa Google+ dan atribut lama | `g-follow`, `googlePlusShare`, `rel="publisher"`, `rel="image_src"`, `msapplication-navbutton-color` (lihat 3.14) |
| Sisa preview | `Navbar1` memuat `origin=http://localhost:80` dan `draft.blogger.com` (R13) |
| `<style>` di dalam `<body>` | Widget `HTML82` mengeluarkan `<style>` di body; berfungsi, tetapi lebih rapi bila dipindah ke `<b:skin>` (bagian 5) |
| `b:css='false'` pada `<html>` | Wajar untuk tema yang menyediakan CSS sendiri |

---

## 5. Panduan Optimalisasi Sebelum Deployment

Alur ini sudah dijalankan pada salinan proyek Anda: hasil build menghasilkan 683 aturan CSS, identik dengan gabungan CSS skin (682) dan Custom CSS (37) minus satu `:root` yang dipertahankan apa adanya, dan `template.xml` hasilnya tetap well-formed.

### 5.1 Persiapan

1. Cadangkan: `git tag pra-audit` (atau salin `template.xml` ke `archive/template-sebelum-audit.xml`). Folder `archive/` tidak ada di zip yang saya terima; pastikan salinan di komputer Anda masih ada.
2. Pindahkan Custom CSS dari widget `HTML82` (`template.xml` baris 2245-2480, isi di antara `<b:widget-setting name='content'>` dan `</b:widget-setting>`) ke berkas baru `assets/custom.css`. Karena isinya disimpan dengan entitas XML (mis. `&#8212;`), salin dari hasil ekstraksi, atau gunakan potongan berikut:

   ```python
   import re, html
   x = open("template.xml", encoding="utf-8-sig").read()
   m = re.search(r"name='content'>(/\* -{10,}\s*\n\s*1\. FOOTER.*?)</b:widget-setting>", x, re.S)
   open("assets/custom.css", "w", encoding="utf-8").write(html.unescape(m.group(1)))
   ```
3. Terapkan perbaikan CSS bagian 3.1 sampai 3.3 ke `assets/styles.css` dan `assets/custom.css`.
4. Format opsional sumber CSS dengan Prettier (konfigurasi `.prettierrc` Anda sudah ada): `npx prettier --write assets/styles.css assets/custom.css`. Jangan menjalankan Prettier pada `template.xml`.
5. Jika memakai `$(...)`: jangan pernah menyalin blok `:root` ke `styles.css`. Pengganti `$(var)` hanya berlaku di dalam `<b:skin>`; biarkan blok `:root` tetap di `template.xml` (skrip di bawah mempertahankannya).

### 5.2 Skrip build (minify dan injeksi ke `<b:skin>`)

Simpan sebagai `build_css.py` di akar proyek. Dependensi: `pip install tinycss2`.

```python
#!/usr/bin/env python3
"""Build: assets/styles.css (+ assets/custom.css) -> minified -> template.xml (<b:skin>).
Usage: python3 build_css.py [--check]
"""
import re, sys, pathlib, tinycss2

ROOT = pathlib.Path(__file__).parent
XML = ROOT / "template.xml"
SRC = [ROOT / "assets" / "styles.css", ROOT / "assets" / "custom.css"]  # custom.css opsional
SKIN_MARK = "/*! INI ADALAH POTONGAN KODE CSS DARI BLOK <b:skin>"   # awal bagian b:skin di styles.css

def ser(tokens):
    out = []
    for t in tokens:
        if t.type == "comment":
            continue
        out.append(" " if t.type == "whitespace" else t.serialize())
    s = "".join(out).strip()
    return re.sub(r"\s*([,>~])\s*", r"\1", s)

def decls(content):
    res = []
    for d in tinycss2.parse_declaration_list(content, skip_comments=True, skip_whitespace=True):
        if d.type == "declaration":
            v = ser(d.value)
            v = re.sub(r"\s*,\s*", ",", v)
            res.append(f"{d.name}:{v}{'!important' if d.important else ''}")
    return ";".join(res)

def minify(css):
    out = []
    for r in tinycss2.parse_stylesheet(css, skip_comments=True, skip_whitespace=True):
        if r.type == "qualified-rule":
            out.append(f"{ser(r.prelude)}{{{decls(r.content)}}}")
        elif r.type == "at-rule":
            pre = ser(r.prelude)
            if r.content is None:
                out.append(f"@{r.at_keyword} {pre};")
            elif r.lower_at_keyword in ("media", "supports", "keyframes", "-webkit-keyframes"):
                inner = minify(tinycss2.serialize(r.content))
                out.append(f"@{r.at_keyword} {pre}{{{inner}}}".replace(" {", "{"))
            else:
                out.append(f"@{r.at_keyword} {pre}{{{decls(r.content)}}}")
    return "".join(out)

def main():
    xml = XML.read_text(encoding="utf-8-sig")
    m = re.search(r"(<b:skin><!\[CDATA\[)(.*?)(\]\]></b:skin>)", xml, re.S)
    skin = m.group(2)
    i_root = skin.index("/* Variables */")
    i_end = skin.index("}", skin.index(":root", i_root)) + 1
    head_and_root = skin[:i_end]                      # komentar Variable + blok :root ($(...)) dipertahankan apa adanya

    parts = []
    for p in SRC:
        if not p.exists():
            continue
        t = p.read_text(encoding="utf-8-sig")
        if p.name == "styles.css":
            t = t[t.index(SKIN_MARK):]                # buang bagian template-skin (layout mode)
        parts.append(t)
    css = minify("\n".join(parts))
    assert "]]>" not in css, "CSS mengandung ]]> (akan merusak CDATA)"

    new_skin = head_and_root + "\n" + css + "\n"
    new_xml = xml[:m.start(2)] + new_skin + xml[m.end(2):]
    if "--check" in sys.argv:
        print(f"skin lama: {len(skin):,} B | skin baru: {len(new_skin):,} B | selisih: {len(new_skin)-len(skin):+,} B")
        return
    XML.write_text("\ufeff" + new_xml if xml != new_xml else xml, encoding="utf-8", newline="")
    print(f"OK. CSS minified: {len(css):,} B; template.xml diperbarui.")

if __name__ == "__main__":
    main()
```

Yang dilakukan skrip:

- Membaca `styles.css`, memotong bagian `<b:template-skin>` (baris 1-233) dan hanya memakai bagian `<b:skin>`.
- Menambahkan `custom.css` setelahnya (urutan cascade sama seperti sebelumnya: Custom CSS dimuat belakangan).
- Meminify dengan parser CSS (bukan regex), menjaga `url(data:...)`, string `content:"..."`, `!important`, `@media`, dan `@keyframes`.
- Mempertahankan komentar variabel `<Variable .../>` dan blok `:root` berisi `$(...)` persis seperti di XML, karena Blogger membutuhkannya untuk Desainer Tema.
- Menolak berjalan bila hasil mengandung `]]>` yang akan merusak blok CDATA.
- Tidak menyentuh blok `<b:template-skin>` di `<head>` (untuk mode tata letak Blogger).

Ukuran: karena CSS skin sebelumnya sudah minified, selisih ukuran kecil (-70 byte tanpa `custom.css`; dengan `custom.css` skin bertambah sekitar 3,5 KB, yang sama dengan Custom CSS yang dipindah dari widget).

### 5.3 Langkah eksekusi

```bash
pip install tinycss2
python3 build_css.py --check     # simulasi, tanpa menulis
python3 build_css.py             # menulis template.xml
```

Setelah itu:

1. Kosongkan isi widget `HTML82` agar CSS tidak dimuat dua kali. Ubah blok widget menjadi:

   ```xml
   <b:widget-setting name='content'/>
   ```

   (struktur `<b:includable id='main'>` pada widget itu sudah menangani kasus `data:content == ""` dengan tidak mengeluarkan `<style>`.)
2. Terapkan perubahan `template.xml` dari bagian 3.4 sampai 3.9, 3.13, dan 3.14.
3. Validasi:

   ```bash
   python3 -c "import xml.dom.minidom as m; m.parse('template.xml'); print('XML OK')"
   grep -o '\$(' template.xml | wc -l          # jumlahnya harus sama dengan sebelum build
   grep -c ']]>' template.xml                   # bandingkan dengan jumlah sebelum build
   ```

4. Opsional, kompresi tambahan dengan `csso` (hemat sedikit lagi, tetapi menambah risiko): `npm i -D csso-cli`, lalu `npx csso assets/styles.css --no-restructure`. Gunakan `--no-restructure` agar urutan dan penggabungan aturan tidak berubah. Jika memakai csso, masukkan hasilnya ke skrip build sebagai pengganti `minify()` hanya untuk bagian `<b:skin>` (jangan pernah memproses blok `:root` berisi `$(...)`), lalu verifikasi visual di beranda, postingan, halaman, dan mode tata letak.
5. Perbarui postingan di Blogger: jalankan `python3 fix_img_dims.py` untuk simulasi, `--write` untuk menyimpan, lalu salin isi file yang berubah ke editor HTML Blogger untuk postingan terkait. Perbaiki juga item 3.11. Setelah CSS `.post-kalinz` dipindah ke tema (rekomendasi 4.1), hapus blok `<style>` dari postingan secara bertahap.

### 5.4 Unggah ke Blogger

1. Di Blogger buka Tema, gunakan "Cadangkan/Pulihkan" untuk mengunduh cadangan template aktif terlebih dahulu.
2. Unggah `template.xml` hasil build lewat fitur pemulihan, atau tempel ke "Edit HTML". Server Blogger melakukan validasi akhir; bila ada galat, pesan galat menyebut baris (nomor baris dihitung dari berkas XML).
3. Buka Pratinjau di beranda, satu postingan (mis. `erickijo-sowokhi`), satu halaman statis, dan mode Tata Letak (agar `<b:template-skin>` tetap bekerja).
4. Periksa bahwa ikon footer tampil (3.13), tombol bagikan berfungsi, dan menu sticky tetap menempel.

### 5.5 Verifikasi CLS setelah deployment

Sisipkan di konsol DevTools (halaman yang dimuat ulang dengan throttling "Slow 4G" dan perangkat ponsel) untuk mencatat pergeseran beserta elemen penyebab:

```js
new PerformanceObserver((list) => {
  for (const e of list.getEntries()) {
    if (e.hadRecentInput) continue;
    console.log('CLS +' + e.value.toFixed(4), e.sources.map(s => s.node && (s.node.id || s.node.className || s.node.nodeName)));
  }
}).observe({ type: 'layout-shift', buffered: true });
```

Lalu:

1. Lighthouse (mode ponsel) dan PageSpeed Insights pada 3 URL: beranda, satu postingan Erick Ijo (sebelumnya tanpa dimensi gambar), satu postingan Tice Halawa. Bandingkan nilai CLS sebelum dan sesudah.
2. Chrome DevTools, panel Performance, centang "Layout Shifts" di trek Experience, lalu gulir sampai komentar dan iklan agar pergeseran akibat scroll ikut tertangkap.
3. Ukur tinggi aktual setiap slot iklan (`ins.adsbygoogle`, atribut `data-ad-status`) pada ponsel dan desktop; sesuaikan nilai `--ad-min` di 3.2.
4. Google Search Console, laporan Core Web Vitals: data lapangan (CrUX) membutuhkan sekitar 28 hari untuk mencerminkan perbaikan.
5. Rich Results Test pada 3 postingan (satu dari tiap penyanyi) dan pada `bjbtrio-onomatua-sibarisi` setelah perbaikan JSON-LD; pastikan hanya satu entitas Article/BlogPosting per halaman.

### 5.6 Urutan prioritas pengerjaan yang disarankan

1. K1: jalankan skrip dimensi gambar (paling cepat, dampak CLS terbesar, risiko terendah).
2. K2: terapkan CSS slot iklan (3.2) dan pemuat (3.5), lalu ukur.
3. S3 dan S4: perbaikan skema (3.7, 3.11).
4. S5 dan S7: ikon footer dan Font Awesome (3.12, 3.13).
5. S1, S2: iframe komentar dan ruang Artikel Terkait (3.3, 3.6).
6. S6 dan S10: pindahkan Custom CSS ke build (5.1-5.3) dan CSS postingan ke tema (4.1).
7. S8: strategi pemuatan gambar LCP di beranda.
8. Sisanya (Ringan): pembersihan bersamaan dengan perubahan di atas.

---

Akhir laporan.
