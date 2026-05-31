# Template Scaffold

Folder ini dipakai sebagai source yang sudah dipecah per bagian, supaya `template.xml` utama tetap bisa dibangun ulang dari file-file kecil.

## Aturan kerja
- Jangan minify file source
- 1 blok XML/HTML per baris
- 1 properti CSS per baris
- 1 statement JS per baris
- Indentasi konsisten 2 spasi
- Nama file harus jelas sesuai fungsi

## Struktur yang disarankan

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

## Urutan isi file
1. `head/`
2. `styles/`
3. `snippets/`
4. `widgets/`
5. `scripts/`
6. `config/`
7. gabungkan semuanya ke `template.xml`

## Catatan
- `template.xml` tetap menjadi file final untuk upload ke Blogger
- isi folder ini adalah source yang lebih kecil dan lebih mudah di-maintain
