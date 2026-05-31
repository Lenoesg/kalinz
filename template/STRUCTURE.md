# File Structure Guide

Panduan singkat tentang setiap file dan folder dalam struktur template Kalinz.

## Folder & Fungsi

### 📋 `head/` - Bagian HEAD HTML
Berisi meta tags, title, dan link konfigurasi yang diletakkan di dalam `<head>` tag.

| File | Fungsi |
|------|--------|
| `meta.xml` | Content-Type, viewport, charset, generator |
| `title.xml` | Dynamic title berdasarkan halaman (post, archive, dsb) |
| `social.xml` | OpenGraph, Twitter Cards, canonical URL |
| `preconnect.xml` | DNS prefetch dan preconnect untuk CDN/external resources |
| `analytics.xml` | Google Analytics, AdSense, tracking scripts |
| `layout-skin.xml` | Favicon, theme color, skin variables |

### 🎨 `styles/` - CSS Stylesheets
Berisi semua CSS yang dipisah berdasarkan komponen/section.

| File | Fungsi |
|------|--------|
| `variables.xml` | CSS variables untuk color, font, spacing |
| `reset.css` | CSS reset untuk normalize browser defaults |
| `base.css` | Base styling untuk heading, paragraph, links |
| `header.css` | Styling header dan blog title |
| `nav.css` | Styling navigation menu |
| `content.css` | Styling content area utama |
| `sidebar.css` | Styling sidebar dan widget container |
| `widgets.css` | Styling widget-specific elements |
| `comments.css` | Styling section komentar |
| `footer.css` | Styling footer |
| `responsive.css` | Media queries dan responsive breakpoints |

### 📝 `snippets/` - Reusable Content Snippets
Berisi HTML/XML snippets yang bisa dipake di berbagai tempat.

| File | Fungsi |
|------|--------|
| `breadcrumbs.xml` | Navigation breadcrumb untuk SEO |
| `post-title.xml` | Judul postingan |
| `post-info.xml` | Tanggal, author, label postingan |
| `post-snippet.xml` | Preview/excerpt postingan |
| `post-body.xml` | Isi utama postingan |
| `read-more.xml` | Tombol "Baca Selengkapnya" |
| `share-buttons.xml` | Tombol share ke sosial media |
| `author-profile.xml` | Profil/bio penulis |
| `pagination.xml` | Navigasi halaman |
| `error-message.xml` | Pesan error 404 |
| `filter-message.xml` | Pesan ketika menggunakan filter/search |

### 🧩 `widgets/` - Blogger Widgets & Custom Components
Berisi widget-widget utama yang bisa di-customize.

| File | Fungsi |
|------|--------|
| `header-widget.xml` | Widget header/masthead dengan blog title |
| `featured-post-widget.xml` | Widget untuk postingan pilihan |
| `blog-widget.xml` | Blog posts widget (main content area) |
| `popular-post-widget.xml` | Widget postingan populer |
| `html-widget.xml` | Custom HTML widget |
| `profile-widget.xml` | Profil blogger/author |
| `label-widget.xml` | Label/kategori widget |
| `page-list-widget.xml` | Daftar halaman statis |
| `image-widget.xml` | Image widget |
| `contact-form-widget.xml` | Form kontak |
| `archive-widget.xml` | Arsip postingan |
| `subscribe-widget.xml` | Subscribe/follow widget |
| `stats-widget.xml` | Statistik blog |

### 🔧 `scripts/` - JavaScript Files
Berisi JavaScript untuk interaktivitas dan functionality.

| File | Fungsi |
|------|--------|
| `defer.js` | Defer loading untuk non-critical scripts |
| `menu.js` | Mobile menu toggle dan navigasi interaktif |
| `search.js` | Fungsi pencarian blog |
| `toc.js` | Table of Contents generator |
| `related-post.js` | Load postingan terkait |
| `infinite-scroll.js` | Infinite scroll pagination |
| `lazyload.js` | Lazy loading untuk images |
| `ads.js` | Google AdSense dan ads management |

### ⚙️ `config/` - Konfigurasi Template
Berisi konfigurasi dan custom code.

| File | Fungsi |
|------|--------|
| `template-settings.xml` | Blogger template settings dan skin variables |
| `custom-css.xml` | Custom CSS dan additional styles |
| `custom-js-footer.xml` | Custom JavaScript di footer |

## Aturan Editing

1. **1 blok per baris** - Setiap elemen/tag di baris tersendiri
2. **2 spasi indentasi** - Konsisten gunakan 2 spasi, bukan tab
3. **No minify** - Jangan minify file source untuk readability
4. **Deskriptif** - Nama file harus jelas sesuai fungsi
5. **Comments** - Gunakan `<b:comment><!-- ... --></b:comment>` untuk penjelasan

## Workflow

```
1. Edit file-file individual di masing-masing folder
   └─ Jangan edit template.xml langsung
   
2. Test perubahan di Blogger test blog
   └─ Merge semua file ke template.xml
   
3. Upload template.xml ke Blogger
   └─ Lihat BUILD.md untuk panduan merge
   
4. Backup perubahan
   └─ Copy template.xml ke folder backup/
```

## Tips Maintenance

- **Gunakan VSCode** dengan XML/HTML extension untuk syntax highlighting
- **Format dengan Prettier** atau built-in formatter
- **Search & Replace** untuk perubahan global (cari di semua folder)
- **Git/Version Control** untuk track history dan revert jika diperlukan
- **Dokumentasi** - Tambah comment untuk perubahan kompleks

## File yang TIDAK boleh diedit

- `index.xml` - Placeholder saja, ignore
- `README.md` - Dokumentasi referensi
- `BUILD.md` - Dokumentasi merge
- Jangan tambah file di root template/ (selain dokumentasi)

## Perlu bantuan?

Lihat:
- [README.md](./README.md) - Dokumentasi umum struktur
- [BUILD.md](./BUILD.md) - Panduan merge file
- Blogger Documentation - https://support.google.com/blogger
