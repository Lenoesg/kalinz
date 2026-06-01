# File Structure Guide

Panduan singkat tentang setiap file dan folder dalam struktur template Kalinz.

## Prinsip struktur
Struktur ini dibuat supaya file kecil punya tanggung jawab yang jelas.

- `head/` untuk isi `<head>`
- `styles/` untuk CSS
- `snippets/` untuk komponen reusable
- `widgets/` untuk widget Blogger dan layout besar
- `scripts/` untuk behavior JavaScript
- `config/` untuk setting dan custom code

Kalau satu file mulai berisi lebih dari satu tanggung jawab, file itu perlu dibelah lagi.

---

## Folder & Fungsi

### 📋 `head/` - Bagian HEAD HTML
Berisi meta tags, title, social tags, preconnect, analytics, dan layout skin.

| File | Fungsi |
|------|--------|
| `meta.xml` | Viewport, charset, generator, canonical, favicon, feed links |
| `title.xml` | Dynamic title berdasarkan halaman |
| `social.xml` | OpenGraph, Twitter Cards, image fallback |
| `preconnect.xml` | DNS prefetch dan preconnect |
| `analytics.xml` | Google Analytics dan AdSense script |
| `layout-skin.xml` | CSS layout khusus Blogger mode layout |

### 🎨 `styles/` - CSS Stylesheets
Berisi CSS yang dipisah berdasarkan area tanggung jawab.

| File | Fungsi |
|------|--------|
| `variables.xml` | Semua CSS variable dan `<Group>` Blogger |
| `reset.css` | Reset, normalize, font-face, baseline |
| `base.css` | Elemen dasar dan utility umum |
| `header.css` | Styling header dan blog title |
| `nav.css` | Styling navigation menu desktop/mobile |
| `content.css` | Styling wrapper konten utama |
| `sidebar.css` | Styling sidebar dan container widget |
| `widgets.css` | Styling widget generic dan widget khusus |
| `comments.css` | Styling section komentar |
| `footer.css` | Styling footer |
| `responsive.css` | Media queries dan responsive overrides |

### 📝 `snippets/` - Reusable Content Snippets
Berisi bagian kecil yang dipanggil dari widget utama.

| File | Fungsi |
|------|--------|
| `breadcrumbs.xml` | Navigation breadcrumb untuk SEO |
| `post-title.xml` | Judul postingan |
| `post-info.xml` | Tanggal, author, komentar |
| `post-snippet.xml` | Preview/excerpt postingan |
| `post-body.xml` | Isi utama postingan |
| `read-more.xml` | Tombol "Baca Selengkapnya" |
| `share-buttons.xml` | Tombol share ke sosial media |
| `author-profile.xml` | Profil/bio penulis |
| `pagination.xml` | Navigasi halaman |
| `error-message.xml` | Pesan error 404 |
| `filter-message.xml` | Pesan archive/search |

### 🧩 `widgets/` - Blogger Widgets & Layout Components
Berisi widget utama dan markup besar untuk rendering halaman.

| File | Fungsi |
|------|--------|
| `header-widget.xml` | Widget header/masthead |
| `featured-post-widget.xml` | Featured post widget |
| `blog-widget.xml` | Alur utama blog, routing view, loop post, comments, dan pemanggilan snippets |
| `popular-post-widget.xml` | Widget postingan populer |
| `html-widget.xml` | Generic HTML widget |
| `profile-widget.xml` | Profil blogger/author |
| `label-widget.xml` | Label/kategori widget |
| `page-list-widget.xml` | Daftar halaman statis |
| `image-widget.xml` | Image widget |
| `contact-form-widget.xml` | Form kontak |
| `archive-widget.xml` | Arsip postingan |
| `subscribe-widget.xml` | Subscribe/follow widget |
| `stats-widget.xml` | Statistik blog |

### 🔧 `scripts/` - JavaScript Files
Berisi JavaScript yang dipisah per behavior.

| File | Fungsi |
|------|--------|
| `defer.js` | Defer loading untuk non-critical scripts |
| `menu.js` | Sticky menu, mobile menu, submenu |
| `search.js` | Fungsi pencarian blog |
| `toc.js` | Table of Contents generator |
| `related-post.js` | Load postingan terkait |
| `infinite-scroll.js` | Infinite scroll pagination |
| `lazyload.js` | Lazy loading untuk images |
| `ads.js` | Penempatan ads dan logic related ads |

### ⚙️ `config/` - Konfigurasi Template
Berisi konfigurasi dan custom code yang tetap mudah diubah manual.

| File | Fungsi |
|------|--------|
| `template-settings.xml` | Blogger template settings dan setting global template |
| `custom-css.xml` | Custom CSS tambahan |
| `custom-js-footer.xml` | Custom JavaScript di footer |

---

## Aturan Editing

1. **1 blok per baris** - Setiap elemen/tag di baris tersendiri
2. **2 spasi indentasi** - Konsisten gunakan 2 spasi, bukan tab
3. **No minify** - Jangan minify file source untuk readability
4. **Deskriptif** - Nama file harus jelas sesuai fungsi
5. **Satu tanggung jawab** - Jika satu file mulai memegang banyak fitur, pecah lagi
6. **Comments** - Gunakan `<b:comment><!-- ... --></b:comment>` untuk penjelasan

---

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

---

## Tips Maintenance

- Gunakan VSCode dengan XML/HTML extension untuk syntax highlighting
- Gunakan search global untuk menemukan blok terkait
- Simpan logic besar di file yang sesuai domainnya, jangan di root
- Dokumentasikan dependency antar file jika ada
- Backup sebelum refactor besar

---

## File yang TIDAK boleh diedit

- `index.xml` - Manifest referensi struktur
- `README.md` - Dokumentasi umum
- `BUILD.md` - Panduan merge
- Jangan tambah file di root `template/` selain dokumentasi

---

## Perlu bantuan?

Lihat:
- [README.md](./README.md) - Dokumentasi umum struktur
- [BUILD.md](./BUILD.md) - Panduan merge file
- [MERGE-ORDER.md](./MERGE-ORDER.md) - Urutan merge visual
