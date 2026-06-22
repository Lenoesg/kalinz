# Dokumentasi Struktur Kode Blog Kalinz

**File sumber:** `template.xml`  
**Platform:** Blogger / Blogspot  
**Nama tema:** `linkmagz` versi `3.8.0`  
**Tujuan dokumen:** menjelaskan struktur kode template blog Kalinz secara lengkap dan mudah dipahami.

---

## 1. Gambaran Umum

`template.xml` adalah file utama yang mengatur seluruh tampilan, perilaku, dan struktur layout blog Kalinz di Blogger. File ini berisi:

- struktur HTML dasar,
- metadata SEO,
- pengaturan tema dan variable warna,
- CSS template,
- widget default Blogger,
- section layout,
- JavaScript interaktif,
- slot iklan,
- komponen halaman post, homepage, halaman statis, komentar, footer, dan navigasi.

Template ini dibangun untuk blog bertema:

- lirik lagu Nias,
- budaya Nias,
- halaman informasi blog,
- artikel post dengan gambar dan snippet,
- navigasi kategori,
- komentar Blogger,
- related post,
- TOC,
- iklan AdSense,
- menu mobile.

---

## 2. Struktur File Secara Tingkat Tinggi

Secara garis besar, `template.xml` tersusun seperti ini:

1. **Deklarasi XML dan `<html>` Blogger**
2. **`<head>`**
   - meta viewport
   - title dinamis
   - SEO meta
   - OpenGraph / Twitter card
   - preconnect
   - Google Analytics
   - CSS layout mode
   - script helper
3. **`<b:skin>`**
   - variabel tema
   - reset CSS
   - layout utama
   - widget styling
   - komponen post, sidebar, footer, komentar
4. **`<b:defaultmarkups>`**
   - definisi markup default untuk widget Blogger
   - `Header`
   - `FeaturedPost`
   - `Blog`
   - `PopularPosts`
   - `HTML`
   - `Stats`
   - `BlogArchive`
   - `FollowByEmail`
   - `Label`
   - `Image`
   - `PageList`
   - `LinkList`
   - `Text`
   - `Profile`
   - `ContactForm`
   - `Subscribe`
5. **`<body>`**
   - class kondisi halaman
   - section pengaturan template
   - section custom CSS
   - header
   - navigasi
   - main content
   - sidebar
   - footer widget
   - footer
   - JavaScript akhir halaman

---

## 3. Bagian `<head>`

Bagian `<head>` mengatur elemen penting untuk browser, SEO, dan integrasi platform.

### 3.1 Meta dasar

Yang ada di bagian ini:

- `viewport` untuk responsive design
- `Content-Type` dinamis berdasarkan encoding blog
- `theme-color` dan `msapplication-navbutton-color`
- generator `blogger`
- favicon dari Blogger
- canonical URL
- feed links
- Google profile/publisher link
- Open Graph metadata

### 3.2 Judul halaman dinamis

Template memakai kondisi Blogger untuk menentukan title:

- **Post** → `Judul Post - Judul Blog`
- **Page** → `Judul Halaman - Judul Blog`
- **Homepage** → `Page Title`
- **Archive** → `Nama Arsip - Judul Blog`
- **Label Search** → `Label - Judul Blog`
- **Search** → `Hasil Pencarian - Judul Blog`
- **Error** → `404 : There's nothing here`
- **Fallback** → judul blog atau page name

Ini penting untuk SEO dan konsistensi tampilan tab browser.

### 3.3 Twitter Cards

Template menambahkan metadata Twitter Cards:

- `twitter:card`
- `twitter:title`
- `twitter:url`
- `twitter:description`
- `twitter:image`

Nilai metadata berubah sesuai:

- homepage,
- single post,
- meta description yang tersedia,
- featured image,
- fallback image dari Blogger.

### 3.4 Preconnect dan DNS Prefetch

Template melakukan optimasi koneksi awal ke domain eksternal:

- `blogger.googleusercontent.com`
- `fonts.googleapis.com`
- `fonts.gstatic.com`

Tujuannya mengurangi latency untuk asset eksternal.

### 3.5 Google Analytics

Ada include:

```xml
<b:include data='blog' name='google-analytics' />
```

Artinya template siap memakai tracking analytics Blogger/Google.

### 3.6 Layout mode CSS

Jika halaman sedang di `layout mode`, template memuat CSS khusus agar tampilan editor layout Blogger lebih rapi.

---

## 4. JavaScript Helper di `<head>`

Template memuat beberapa script penting:

### 4.1 `optionLinkMagz(i)`

Fungsi ini dipakai sebagai **penggabung konfigurasi default** dengan setting yang didefinisikan pada widget `linkMagzSetting`.

Fungsinya:
- membaca konfigurasi default,
- menimpa nilai bawaan jika ada setting dari widget HTML,
- dipakai oleh banyak fitur seperti:
  - sticky menu,
  - related post,
  - infinite scroll,
  - TOC,
  - baca juga,
  - fullwidth image.

### 4.2 Defer loader

Ada implementasi `Defer.js` untuk:

- lazy load script
- lazy load DOM
- preload resource
- defer image rendering

Ini membantu performa awal halaman.

### 4.3 Noscript fallback

Jika JavaScript dinonaktifkan, beberapa elemen iklan disembunyikan agar layout tetap aman.

---

## 5. Bagian `<b:skin>` — CSS Template

Ini adalah bagian terbesar dari template.

### 5.1 Struktur CSS global

Di dalam `<b:skin>` terdapat:

- komentar identitas template,
- definisi `Variable`,
- CSS variable `:root`,
- normalize CSS,
- font icon custom,
- styling elemen dasar,
- layout utama,
- styling widget,
- styling post,
- styling komentar,
- styling footer,
- styling share button,
- styling TOC,
- styling related post,
- styling search overlay,
- styling error page,
- styling mobile responsive.

### 5.2 Sistem Variable Blogger

Template memakai banyak `Variable` yang dikelompokkan per kebutuhan:

- **Dimensi**
  - `theme.width`
  - `header.height`
  - `navmenu.height`

- **Body**
  - background
  - font
  - text color
  - link color

- **Header**
  - background color
  - title color
  - logo height

- **Menu**
  - menu background
  - menu text color

- **Content**
  - post background
  - latest post title color
  - post title hover color

- **Sidebar**
  - sidebar background
  - sidebar link colors
  - widget title colors

- **Featured Post**
  - title color
  - description color
  - readmore button colors

- **Popular Posts**
  - background
  - title
  - snippet

- **Footer**
  - background
  - link hover
  - text color

Sistem ini memudahkan penyesuaian tema tanpa harus mengedit CSS besar secara manual.

### 5.3 Reset dan dasar styling

Template mengatur:

- `html`, `body`
- `a`, `blockquote`, `pre`
- `img`, `table`
- `button`, `input`, `textarea`
- accessibility focus state
- reduced motion support
- high contrast support

### 5.4 Font icon custom

Template memuat font icon bernama `linkmagzfont` dengan ikon:

- `icon-maps`
- `icon-search`
- `icon-email`
- `icon-youtube`
- `icon-whatsapp`
- `icon-facebook`
- `icon-tiktok`

Font ini dipakai untuk share icon dan social footer.

### 5.5 Layout utama

Struktur besar layout:

- `#header-outer`
- `#navmenu-wrap`
- `#wrapper`
- `#content-wrap`
- `#sidebar-wrap`
- `#footer-widget-html-wrap`
- `#footer-outer`

Layout memakai flexbox dan responsif.

### 5.6 Responsive breakpoints

Breakpoints utama yang dipakai:

- `900px`
- `600px`
- `480px`
- `320px`

Perubahan yang terjadi pada mobile:

- header dan menu menjadi lebih rapat,
- sidebar dipindah ke bawah,
- padding dikurangi,
- post dan featured layout menjadi satu kolom,
- elemen fullwidth menyesuaikan viewport.

---

## 6. `<b:defaultmarkups>` — Template Default Widget

Bagian ini sangat penting karena mendefinisikan cara Blogger menampilkan widget.

---

### 6.1 `postMetaCustom`

Menyisipkan JSON-LD schema untuk `BlogPosting`.

Isi utama:

- `@context`
- `@type`
- `mainEntityOfPage`
- `headline`
- `description`
- `datePublished`
- `dateModified`
- `image`
- `publisher`
- `author`

Tujuan:
- meningkatkan SEO,
- memberi struktur data yang jelas,
- membantu mesin pencari memahami artikel.

---

### 6.2 `defaultHomepage`

Render default untuk tampilan homepage/post list:

- thumbnail post,
- title,
- info post,
- snippet.

---

### 6.3 `defaultStaticPage`

Dipakai untuk halaman statis:

- title,
- body.

---

### 6.4 `defaultPostPage`

Dipakai untuk single post:

- title,
- info,
- body,
- author profile,
- share button,
- related post,
- related post script.

---

### 6.5 `breadcrumb`

Menampilkan breadcrumb untuk post dan page.

Strukturnya:
- Home
- Label / page name

Breadcrumb memakai schema `BreadcrumbList`.

---

### 6.6 `recentPostTitle`

Judul section untuk daftar artikel terbaru:

- teks default: `Latest Posts`

---

### 6.7 `searchIcon`

Label/icon untuk membuka search overlay.

---

### 6.8 `searchFormContainer`

Membuat overlay search fullscreen.

Fitur:
- input pencarian dinamis,
- placeholder beda untuk locale `id` dan default,
- terhubung ke search URL Blogger.

---

### 6.9 `mobileMenuContainer`

Menampilkan sidebar menu mobile:

- tombol close,
- body menu,
- overlay gelap.

---

### 6.10 `blogPostThumbnail`

Membuat thumbnail artikel di homepage/listing.

Fitur:
- lazyload,
- fallback image,
- featured image khusus YouTube,
- label info overlay.

---

### 6.11 `blogPostTitle`

Menampilkan title post.

Aturan:
- `h2` untuk listing/multiple items,
- `h1` untuk single item,
- fallback `[No title]` jika judul kosong.

---

### 6.12 `blogPostSnippet`

Menampilkan snippet ringkas post, lalu menambahkan link `read more`.

---

### 6.13 `blogPostBody`

Menampilkan isi artikel, plus blok `Baca Juga`.

Di sini ada script yang:

- mengambil daftar post berdasarkan label,
- memilih beberapa link acak dari label yang sama,
- menampilkan daftar `Baca Juga` di tengah artikel.

---

### 6.14 `postReadMore`

Membuat tombol baca selengkapnya.

---

### 6.15 `postInfo`

Menampilkan metadata artikel:

- author,
- tanggal,
- komentar.

---

### 6.16 `labelInfo`

Menampilkan label post pada thumbnail.

---

### 6.17 `blogPostAuthorProfile`

Menampilkan profil penulis jika ada:

- foto author,
- nama author,
- bio `aboutMe`.

---

### 6.18 `postShareButton`

Tombol share artikel:

- WhatsApp
- Facebook

---

### 6.19 `relatedPost`

Menyiapkan container related post.

Isi:
- variable `postLabels`
- `relatedConfig`
- container `#ms-related-post`
- container `#ms-matched-content`

---

### 6.20 `relatedPostScript`

Script untuk:

- mengisi related post dari feed label,
- memilih post acak,
- menampilkan thumbnail jika tersedia,
- fallback image jika tidak ada.

Juga ada script kecil untuk opsi `fullwidthImage`.

---

### 6.21 `allJavaScripts`

Bagian ini memuat semua script besar template:

- SmoothScroll
- sticky menu
- mobile menu behavior
- submenu mobile
- search overlay toggle
- featured image cleanup
- comment reply form handler
- infinite scroll
- featured description injection
- TOC generator
- lazyload image activation

Ini adalah pusat interaktivitas template.

---

### 6.22 `errorPageMessage`

Menampilkan halaman 404 jika view error.

---

### 6.23 `filterPostMessage`

Menampilkan pesan filter untuk:

- archive page,
- search results page.

---

### 6.24 `emptyPostMessage`

Menampilkan pesan jika tidak ada postingan.

---

## 7. Default Markup untuk Widget Blogger

Template mendefinisikan beberapa widget kunci.

---

### 7.1 Widget `Header`

Komponen header berisi:

- logo / gambar header,
- title blog,
- description.

Mode gambar header bisa:
- replace,
- before description.

---

### 7.2 Widget `FeaturedPost`

Hanya tampil di homepage.

Strukturnya:
- judul featured section,
- gambar unggulan,
- judul artikel,
- snippet,
- tombol read more.

Widget ini difungsikan sebagai konten unggulan di homepage.

---

### 7.3 Widget `Blog`

Ini widget utama postingan.

Alur render:
1. tampilkan judul section latest post bila homepage
2. tampilkan filter message
3. tampilkan pesan kosong / error
4. render content
5. tampilkan breadcrumb
6. ambil daftar featured post IDs
7. render semua post yang bukan featured
8. tampilkan pagination jika perlu

#### Komponen dalam Blog widget:
- `postAndComments`
- `post`
- `commentPicker`
- `custom-comments`
- `comments`
- `postPagination`

---

### 7.4 Komentar Blogger

Template mendukung dua model komentar:

#### a. Threaded comments
Digunakan jika `data:post.showThreadedComments` aktif.

Fitur:
- reply per komentar,
- avatar,
- tombol balas,
- tombol hapus,
- pager komentar,
- form komentar custom.

#### b. Non-threaded comments
Jika komentar threaded tidak aktif.

Fitur:
- daftar komentar sederhana,
- pagination komentar,
- form komentar embedded atau link ke komentar page.

---

### 7.5 Widget `PopularPosts`

Menampilkan posting populer dengan gaya kartu.

Ada:
- title widget,
- thumbnail post pertama,
- snippet,
- daftar post populer berikutnya.

---

### 7.6 Widget `HTML`

Widget HTML umum dipakai untuk:

- konten custom,
- script setting,
- iklan,
- social footer,
- komponen khusus lain.

---

### 7.7 Widget `Stats`

Dipakai untuk statistik Blogger.

---

### 7.8 Widget `BlogArchive`

Menampilkan arsip posting berdasarkan tanggal.

Mode:
- hierarchy,
- flat,
- dropdown.

---

### 7.9 Widget `FollowByEmail`

Menampilkan form subscribe email via FeedBurner.

---

### 7.10 Widget `Label`

Menampilkan label sebagai:

- cloud,
- list.

---

### 7.11 Widget `Image`

Menampilkan gambar widget dengan optional link dan caption.

---

### 7.12 Widget `PageList`

Dipakai untuk menu halaman statis di footer.

---

### 7.13 Widget `LinkList`

Menampilkan daftar link biasa.

---

### 7.14 Widget `Text`

Menampilkan blok teks biasa.

---

### 7.15 Widget `Profile`

Menampilkan profil author atau team.

Ada mode:

- individual profile,
- team profile.

---

### 7.16 Widget `ContactForm`

Menampilkan form kontak:

- nama,
- email,
- pesan,
- tombol kirim,
- pesan error/sukses.

---

### 7.17 Widget `Subscribe`

Menampilkan daftar RSS feed.

---

## 8. Struktur `<body>`

Bagian body adalah struktur visual utama blog.

---

### 8.1 Class kondisi halaman

Template menambahkan class ke `<body>` sesuai halaman aktif:

- `is-homepage`
- `is-post`
- `is-page`
- `is-search-label`
- `is-search-query`
- `is-search-default`
- `is-archive`
- `is-error`
- `is-preview`

Ini memudahkan styling dan script yang bergantung pada jenis halaman.

---

## 9. Section Pengaturan dan Custom

### 9.1 `template-settings`

Section ini berisi widget HTML tersembunyi untuk konfigurasi global template.

Isi setting default:

- `menuSticky: true`
- `relatedPosts: true`
- `jumlahRelatedPosts: 4`
- `relatedPostsThumb: false`
- `infiniteScrollNav: true`
- `scrollToTop: true`
- `fullwidthImage: true`
- `bacaJuga: true`
- `jumlahBacaJuga: 3`
- `judulBacaJuga: "Baca Juga"`
- `showHideTOC: true`
- `judulTOC: "Daftar Isi"`

Ini adalah pusat konfigurasi yang dipakai script `optionLinkMagz`.

---

### 9.2 `custom-css`

Section ini menyimpan CSS tambahan dari widget HTML.

Contoh isinya:
- styling social icon footer,
- layout flex,
- hover animation.

---

## 10. Header Blog

Struktur header:

- `#header-outer`
- `#header-wrap`
- `#header-content`
- widget `Header1`

### Fungsi utama header
- menampilkan identitas blog,
- logo,
- title,
- deskripsi,
- link balik ke homepage.

Header ini responsif dan memakai flex layout.

---

## 11. Navigasi Menu

Bagian navigasi berada di:

- `#navmenu-wrap`
- `#navmenu-wrap-sticky`
- section `navmenu`
- widget `HTML72`

### Isi menu saat ini
Menu memiliki link ke:

- Lagu Nias
- Lagu Rohani
- Maena Nias

### Fitur menu
- desktop horizontal menu,
- mobile sidebar menu,
- submenu support,
- sticky menu saat scroll,
- search icon,
- overlay saat mobile menu aktif.

---

## 12. Struktur Konten Utama

Konten utama berada di dalam:

- `main#wrapper`
- `section#content-wrap`

### Section di dalamnya
- `top-widget`
- `top-widget2`
- `main-content`

---

### 12.1 `top-widget`
Widget HTML untuk area atas konten.

Saat ini visibility-nya `false`, jadi biasanya kosong atau dipakai untuk eksperimen layout.

### 12.2 `top-widget2`
Widget HTML tambahan, khusus homepage.

### 12.3 `main-content`
Section utama konten posting.

Di dalamnya ada:

- `FeaturedPost1`
- `Blog1`

---

## 13. Featured Post di Homepage

Widget `FeaturedPost1` hanya tampil di homepage.

Fungsinya:
- menampilkan satu artikel unggulan,
- memberi visual kuat di halaman depan.

Jika featured image aktif:
- gambar tampil di sisi kiri/atas,
- info di sisi kanan/bawah.

Jika tidak ada gambar:
- template memakai fallback image.

---

## 14. Blog Posts / Feed Utama

Widget `Blog1` mengelola seluruh daftar artikel.

### Alur rendering
- tampilkan judul section
- tampilkan pesan filter
- tampilkan empty state
- tampilkan error page
- render setiap post
- tampilkan pagination

### Komponen dalam tiap post
- thumbnail
- title
- metadata
- snippet
- isi artikel
- komentar
- related post
- ad slots

---

## 15. Slot Iklan

Template memiliki beberapa section iklan:

- `iklan-atas`
- `iklan-tengah1`
- `iklan-tengah2`
- `iklan-bawah`
- `matched-content`
- `iklan-infeed`

### Fungsinya
- memisahkan lokasi iklan sesuai konteks artikel,
- mendukung AdSense,
- menyisipkan iklan dalam post atau homepage secara otomatis.

### Catatan
Beberapa slot hanya aktif di:
- post page,
- homepage,
- layout mode.

---

## 16. Sidebar

Sidebar berada di:

- `<aside id='sidebar-wrap'>`
- section `sidebar`
- section `sidebar-sticky`

### Isi sidebar
Saat ini ada widget:

- `PopularPosts1`

### Fungsinya
- menampilkan artikel populer,
- memperkuat internal discovery,
- menjadi elemen pendukung homepage/post page.

---

## 17. Footer Widget Area

Sebelum footer utama ada:

- `footer-widget-html-wrap`
- widget `HTML831`

### Isi widget
Ada blok ikon sosial footer:
- Facebook
- YouTube
- TikTok
- WhatsApp Channel

Komponen ini memakai icon font `linkmagzfont`.

---

## 18. Footer Utama

Footer utama berada di `#footer-outer`.

### Bagian di dalam footer
- `page-navmenu`
- `footer-text`

### 18.1 Menu halaman statis
Widget `PageList1` memuat halaman:

- Tentang
- Kontak
- Kebijakan Privasi
- Disclaimer

### 18.2 Copyright footer
Widget `HTML80` menampilkan copyright dinamis tahun berjalan.

---

## 19. Komponen Tambahan di Footer

### 19.1 Navbar Blogger
Widget `Navbar1` ada tetapi `visible='false'`.

Ini adalah komponen default Blogger, biasanya tidak ditampilkan ke user.

### 19.2 Custom JavaScript Footer
Section `custom-javascript-footer` disediakan sebagai tempat script tambahan di akhir body.

---

## 20. Alur Halaman Berdasarkan Jenis View

Template bekerja berbeda tergantung halaman.

### 20.1 Homepage
Menampilkan:
- featured post,
- daftar post terbaru,
- infeed ads,
- popular posts,
- sidebar,
- pagination atau infinite scroll.

### 20.2 Single Post
Menampilkan:
- breadcrumb,
- judul artikel,
- metadata,
- body artikel,
- Baca Juga,
- related post,
- komentar,
- ads.

### 20.3 Static Page
Menampilkan:
- title,
- body,
- biasanya tanpa sidebar.

### 20.4 Search / Label / Archive
Menampilkan:
- filter message,
- daftar post sesuai query,
- pagination.

### 20.5 Error Page
Menampilkan:
- 404,
- pesan error,
- layout artikel penuh.

---

## 21. Fitur Interaktif yang Penting

Template memiliki fitur interaktif berikut:

- **Sticky menu**
- **Mobile sidebar menu**
- **Search overlay**
- **Lazyload image**
- **Smooth scroll**
- **TOC toggle**
- **Related post generator**
- **Reply komentar**
- **Infinite scroll**
- **Featured image fullwidth adjustment**

---

## 22. Komponen SEO yang Sudah Ada

Template sudah memuat cukup banyak fondasi SEO:

- title dinamis
- canonical URL
- feed links
- meta description fallback
- Twitter cards
- Open Graph include
- breadcrumb schema
- BlogPosting schema JSON-LD
- rel publisher
- featured image metadata

---

## 23. Kelebihan Struktur Template Ini

Beberapa kelebihan utama:

1. **Lengkap**
   - mendukung homepage, post, page, archive, search, comments, ads, footer, dan widget Blogger.

2. **Responsive**
   - layout menyesuaikan desktop dan mobile.

3. **SEO-aware**
   - title, canonical, schema, Twitter cards, breadcrumb.

4. **Fitur blog cukup kaya**
   - related post, TOC, baca juga, populer, featured post, ads, social footer.

5. **Konfigurasi fleksibel**
   - banyak hal bisa diatur lewat `linkMagzSetting` dan variable Blogger.

---

## 24. Hal yang Perlu Diperhatikan Saat Mengubah Template

Karena file ini sangat besar, perubahan sebaiknya dilakukan hati-hati.

### Area sensitif
- `b:defaultmarkups`
- `Blog1` widget
- `allJavaScripts`
- `template-settings`
- `b:skin`
- `relatedPostScript`
- `custom-comments`
- `mobileMenuContainer`

### Risiko jika salah edit
- layout rusak,
- menu tidak muncul,
- komentar gagal,
- related post tidak tampil,
- script error,
- homepage blank section,
- widget Blogger tidak terbaca.

---

## 25. Rekomendasi Struktur Pengembangan Lanjutan

Kalau template ini ingin dirapikan, struktur pengembangan yang ideal adalah:

### Tahap 1
Pisahkan komponen besar menjadi dokumentasi dan modul referensi:
- header
- sidebar
- footer
- blog posts
- scripts
- ads

### Tahap 2
Kurangi duplikasi:
- markup komentar,
- popular posts,
- byline,
- post title,
- share button.

### Tahap 3
Sederhanakan script:
- stick menu
- search overlay
- infinite scroll
- related post
- TOC

### Tahap 4
Optimasi performa:
- pangkas CSS yang tidak dipakai,
- kurangi external request,
- evaluasi iklan dan font.

---

## 26. Peta Singkat Struktur Kode

Berikut ringkasan struktur penting:

```text
template.xml
├── head
│   ├── meta SEO
│   ├── title dinamis
│   ├── twitter cards
│   ├── preconnect
│   ├── analytics
│   └── template skin mode
├── b:skin
│   ├── variables
│   ├── base CSS
│   ├── responsive CSS
│   ├── widget CSS
│   ├── post CSS
│   ├── footer CSS
│   └── comments CSS
├── b:defaultmarkups
│   ├── Header
│   ├── FeaturedPost
│   ├── Blog
│   ├── PopularPosts
│   ├── HTML
│   ├── Stats
│   ├── BlogArchive
│   ├── FollowByEmail
│   ├── Label
│   ├── Image
│   ├── PageList
│   ├── LinkList
│   ├── Text
│   ├── Profile
│   ├── ContactForm
│   └── Subscribe
└── body
    ├── template-settings
    ├── custom-css
    ├── header
    ├── navmenu
    ├── main content
    ├── ads
    ├── sidebar
    ├── footer widget
    ├── footer
    └── custom javascript footer
```

---

## 27. Kesimpulan

`template.xml` adalah template Blogger yang sangat lengkap dan sudah mencakup hampir seluruh kebutuhan blog Kalinz. Struktur utamanya terdiri dari:

- **head** untuk SEO dan metadata,
- **skin** untuk CSS dan variable tema,
- **defaultmarkups** untuk widget dan komponen Blogger,
- **body** untuk layout halaman, navigasi, konten, sidebar, iklan, dan footer.

Dari sisi struktur, template ini sudah matang. Yang paling penting ke depan adalah:

- menjaga konsistensi widget,
- merapikan script yang terlalu banyak,
- menyederhanakan komponen yang tidak perlu,
- dan mempertahankan fondasi SEO + UX yang sudah ada.

Dokumentasi ini bisa dijadikan acuan saat:
- audit template,
- refactor markup,
- perbaikan layout,
- optimasi performa,
- atau penambahan fitur baru pada blog Kalinz.

---

**Status:** Dokumentasi struktur kode `template.xml` selesai.
