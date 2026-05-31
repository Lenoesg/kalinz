# 📊 Visual Merge Order Reference

Diagram visual untuk urutan merge file menjadi `template.xml` final.

## 🏗️ Template Structure Hierarchy

```
template.xml (FINAL OUTPUT)
│
├─ XML Declaration & DOCTYPE
│  └─ <?xml version="1.0" encoding="UTF-8"?>
│
├─ <html> Tag Opening
│  └─ dengan attributes xmlns, xmlns:b, xmlns:data, xmlns:expr
│
├─ <head> Section
│  │
│  ├─ META TAGS
│  │  ├─ head/meta.xml          (viewport, charset, generator)
│  │  ├─ head/title.xml         (dynamic title tags)
│  │  ├─ head/social.xml        (OpenGraph, Twitter, canonical)
│  │  ├─ head/preconnect.xml    (DNS prefetch, preconnect)
│  │  └─ head/analytics.xml     (Google Analytics, ads)
│  │
│  ├─ LAYOUT & SKIN
│  │  └─ head/layout-skin.xml   (favicon, theme color)
│  │
│  ├─ CONFIGURATION
│  │  ├─ config/template-settings.xml
│  │  └─ config/custom-css.xml
│  │
│  └─ </head>
│
├─ <body> Section
│  │
│  ├─ STYLES (in <style> tag)
│  │  ├─ styles/variables.xml
│  │  ├─ styles/reset.css
│  │  ├─ styles/base.css
│  │  ├─ styles/header.css
│  │  ├─ styles/nav.css
│  │  ├─ styles/content.css
│  │  ├─ styles/sidebar.css
│  │  ├─ styles/widgets.css
│  │  ├─ styles/comments.css
│  │  ├─ styles/footer.css
│  │  └─ styles/responsive.css
│  │
│  ├─ HEADER
│  │  └─ widgets/header-widget.xml
│  │
│  ├─ MAIN CONTENT AREA
│  │  ├─ snippets/filter-message.xml
│  │  ├─ snippets/breadcrumbs.xml
│  │  ├─ snippets/post-title.xml
│  │  ├─ snippets/post-info.xml
│  │  ├─ snippets/post-snippet.xml
│  │  ├─ snippets/post-body.xml
│  │  ├─ snippets/read-more.xml
│  │  ├─ snippets/share-buttons.xml
│  │  ├─ snippets/author-profile.xml
│  │  ├─ snippets/pagination.xml
│  │  └─ snippets/error-message.xml
│  │
│  ├─ SIDEBAR WITH WIDGETS
│  │  ├─ widgets/featured-post-widget.xml
│  │  ├─ widgets/blog-widget.xml
│  │  ├─ widgets/popular-post-widget.xml
│  │  ├─ widgets/profile-widget.xml
│  │  ├─ widgets/label-widget.xml
│  │  ├─ widgets/page-list-widget.xml
│  │  ├─ widgets/archive-widget.xml
│  │  ├─ widgets/subscribe-widget.xml
│  │  └─ widgets/stats-widget.xml
│  │
│  ├─ SCRIPTS
│  │  ├─ scripts/defer.js
│  │  ├─ scripts/menu.js
│  │  ├─ scripts/search.js
│  │  ├─ scripts/toc.js
│  │  ├─ scripts/related-post.js
│  │  ├─ scripts/infinite-scroll.js
│  │  ├─ scripts/lazyload.js
│  │  ├─ scripts/ads.js
│  │  └─ config/custom-js-footer.xml
│  │
│  └─ </body>
│
└─ </html>
```

## 📋 Checklist Merge Order

Sebelum merge, pastikan file-file ini ready:

### HEAD Section
- [ ] `head/meta.xml` - ✓ Created
- [ ] `head/title.xml` - ✓ Created
- [ ] `head/social.xml` - ✓ Created
- [ ] `head/preconnect.xml` - ✓ Created
- [ ] `head/analytics.xml` - ✓ Created
- [ ] `head/layout-skin.xml` - ✓ Created

### Styles Section
- [ ] `styles/variables.xml` - ✓ Created
- [ ] `styles/reset.css` - ✓ Created
- [ ] `styles/base.css` - ✓ Created
- [ ] `styles/header.css` - ✓ Created
- [ ] `styles/nav.css` - ✓ Created
- [ ] `styles/content.css` - ✓ Created
- [ ] `styles/sidebar.css` - ✓ Created
- [ ] `styles/widgets.css` - ✓ Created
- [ ] `styles/comments.css` - ✓ Created
- [ ] `styles/footer.css` - ✓ Created
- [ ] `styles/responsive.css` - ✓ Created

### Snippets Section
- [ ] `snippets/breadcrumbs.xml` - ✓ Created
- [ ] `snippets/post-title.xml` - ✓ Created
- [ ] `snippets/post-info.xml` - ✓ Created
- [ ] `snippets/post-snippet.xml` - ✓ Created
- [ ] `snippets/post-body.xml` - ✓ Created
- [ ] `snippets/read-more.xml` - ✓ Created
- [ ] `snippets/share-buttons.xml` - ✓ Created
- [ ] `snippets/author-profile.xml` - ✓ Created
- [ ] `snippets/pagination.xml` - ✓ Created
- [ ] `snippets/error-message.xml` - ✓ Created
- [ ] `snippets/filter-message.xml` - ✓ Created

### Widgets Section
- [ ] `widgets/header-widget.xml` - ✓ Created
- [ ] `widgets/featured-post-widget.xml` - ✓ Created
- [ ] `widgets/blog-widget.xml` - ✓ Created
- [ ] `widgets/popular-post-widget.xml` - ✓ Created
- [ ] `widgets/html-widget.xml` - ✓ Created
- [ ] `widgets/profile-widget.xml` - ✓ Created
- [ ] `widgets/label-widget.xml` - ✓ Created
- [ ] `widgets/page-list-widget.xml` - ✓ Created
- [ ] `widgets/image-widget.xml` - ✓ Created
- [ ] `widgets/contact-form-widget.xml` - ✓ Created
- [ ] `widgets/archive-widget.xml` - ✓ Created
- [ ] `widgets/subscribe-widget.xml` - ✓ Created
- [ ] `widgets/stats-widget.xml` - ✓ Created

### Scripts Section
- [ ] `scripts/defer.js` - ✓ Created
- [ ] `scripts/menu.js` - ✓ Created
- [ ] `scripts/search.js` - ✓ Created
- [ ] `scripts/toc.js` - ✓ Created
- [ ] `scripts/related-post.js` - ✓ Created
- [ ] `scripts/infinite-scroll.js` - ✓ Created
- [ ] `scripts/lazyload.js` - ✓ Created
- [ ] `scripts/ads.js` - ✓ Created

### Config Section
- [ ] `config/template-settings.xml` - ✓ Created
- [ ] `config/custom-css.xml` - ✓ Created
- [ ] `config/custom-js-footer.xml` - ✓ Created

## 🔄 File Size Impact

Estimasi ukuran file:

| Section | Estimated Size |
|---------|---|
| Head | 2-3 KB |
| Styles | 8-12 KB |
| Snippets | 3-5 KB |
| Widgets | 5-8 KB |
| Scripts | 4-6 KB |
| Config | 1-2 KB |
| **TOTAL** | **23-36 KB** |

## 📌 Key Principles

1. **Sequential Loading** - Urutan file penting untuk CSS cascade
   - CSS Variables (variables.xml) → Reset → Base → Component-specific

2. **Dependency Order** - Beberapa elemen depend pada yang lain
   - Base styles harus sebelum header/nav/content
   - Layout CSS sebelum widget CSS

3. **Critical Path** - Head section diload pertama
   - Meta tags dan styles di head untuk fast rendering
   - Scripts deferred ke akhir

## 🚀 Automation Benefits

Dengan merge script (`merge_template.py`):
- ✅ Urutan otomatis (tidak perlu manual)
- ✅ Backup otomatis sebelum overwrite
- ✅ Validasi semua file ada
- ✅ File size report
- ✅ Error handling

**Run:** `python merge_template.py`

## 📖 Reference

- Lihat [BUILD.md](./BUILD.md) untuk detail manual merge
- Lihat [STRUCTURE.md](./STRUCTURE.md) untuk penjelasan tiap file
- Lihat [QUICKSTART.md](./QUICKSTART.md) untuk panduan cepat
