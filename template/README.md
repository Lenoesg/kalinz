# Template Scaffold

Folder ini adalah source template yang dipisah per fungsi supaya `template.xml` final tetap bisa dibangun ulang dari file-file kecil.

## Tujuan
- memudahkan maintenance
- memudahkan pencarian blok saat debugging
- mengurangi file raksasa yang sulit dibaca Claude atau editor
- menjaga `template.xml` final tetap sebagai output build, bukan tempat edit utama

## Aturan kerja
- jangan minify file source
- 1 blok XML/HTML per baris
- 1 properti CSS per baris
- 1 statement JS per baris
- indentasi konsisten 2 spasi
- nama file harus jelas sesuai fungsi
- file source boleh kosong sementara selama sedang dipecah manual

## Struktur yang direkomendasikan

```text
template/
  head/
    meta.xml
    title.xml
    social.xml
    preconnect.xml
    analytics.xml
    layout-skin.xml

  styles/
    variables.xml
    reset.css
    base.css
    header.css
    nav.css
    content.css
    sidebar.css
    widgets.css
    comments.css
    footer.css
    responsive.css

  snippets/
    breadcrumbs.xml
    post-title.xml
    post-info.xml
    post-snippet.xml
    post-body.xml
    read-more.xml
    share-buttons.xml
    author-profile.xml
    pagination.xml
    error-message.xml
    filter-message.xml

  widgets/
    header-widget.xml
    featured-post-widget.xml
    blog-widget.xml
    popular-post-widget.xml
    html-widget.xml
    profile-widget.xml
    label-widget.xml
    page-list-widget.xml
    image-widget.xml
    contact-form-widget.xml
    archive-widget.xml
    subscribe-widget.xml
    stats-widget.xml

  scripts/
    defer.js
    menu.js
    search.js
    toc.js
    related-post.js
    infinite-scroll.js
    lazyload.js
    ads.js

  config/
    template-settings.xml
    custom-css.xml
    custom-js-footer.xml
```

## Kontrak isi file

### `head/`
Semua yang berada di dalam `<head>`.

- `meta.xml` → viewport, charset, generator, canonical, favicon, feed links
- `title.xml` → dynamic title per halaman
- `social.xml` → OpenGraph dan Twitter Cards
- `preconnect.xml` → preconnect / dns-prefetch
- `analytics.xml` → analytics dan ads script
- `layout-skin.xml` → Blogger layout skin saat mode layout

### `styles/`
Semua CSS dipisah berdasarkan area tanggung jawab.

- `variables.xml` → semua CSS variable dan `<Group>`
- `reset.css` → reset, normalize, font-face, base global reset
- `base.css` → elemen dasar dan utility umum
- `header.css` → header dan logo area
- `nav.css` → menu desktop dan mobile
- `content.css` → wrapper konten utama
- `sidebar.css` → sidebar dan container widget
- `widgets.css` → widget-specific styling
- `comments.css` → komentar
- `footer.css` → footer
- `responsive.css` → media queries lintas section

### `snippets/`
Bagian reusable yang dipanggil dari widget utama.

- `breadcrumbs.xml` → breadcrumb
- `post-title.xml` → judul post
- `post-info.xml` → author, date, comment info
- `post-snippet.xml` → snippet homepage / listing
- `post-body.xml` → body post dan elemen terkait isi artikel
- `read-more.xml` → tombol read more
- `share-buttons.xml` → tombol share
- `author-profile.xml` → box profil penulis
- `pagination.xml` → navigasi halaman
- `error-message.xml` → pesan 404
- `filter-message.xml` → pesan archive/search

### `widgets/`
Definisi widget Blogger dan markup utama komponen besar.

- `header-widget.xml` → widget header
- `featured-post-widget.xml` → featured post widget
- `blog-widget.xml` → alur utama blog, routing view, loop post, dan pemanggilan snippets
- `popular-post-widget.xml` → popular posts
- `html-widget.xml` → generic HTML widget
- `profile-widget.xml` → profile widget
- `label-widget.xml` → label widget
- `page-list-widget.xml` → page list widget
- `image-widget.xml` → image widget
- `contact-form-widget.xml` → contact form widget
- `archive-widget.xml` → blog archive widget
- `subscribe-widget.xml` → follow by email / subscribe
- `stats-widget.xml` → stats widget

### `scripts/`
JavaScript dipisah per behavior.

- `defer.js` → loader untuk defer/lazy loading
- `menu.js` → sticky menu, mobile menu, submenu
- `search.js` → search overlay
- `toc.js` → table of contents
- `related-post.js` → related post
- `infinite-scroll.js` → infinite scroll pagination
- `lazyload.js` → inisialisasi lazyload
- `ads.js` → logic penempatan ads

### `config/`
Konfigurasi yang ingin tetap mudah diubah manual.

- `template-settings.xml` → setting global template
- `custom-css.xml` → custom CSS tambahan
- `custom-js-footer.xml` → custom JavaScript footer

## Urutan build
1. `head/`
2. `styles/`
3. `snippets/`
4. `widgets/`
5. `scripts/`
6. `config/`
7. gabungkan semuanya menjadi `template.xml`

## Catatan penting
- `template.xml` tetap file final untuk upload ke Blogger
- file-file di folder `template/` adalah source kecil untuk maintenance
- jika ada logic besar yang masih terlalu gemuk, pecah lagi ke file baru sebelum dipindah
- jika satu file mulai terasa berisi lebih dari satu tanggung jawab, file itu perlu dibelah lagi
