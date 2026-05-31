# Build & Merge Guide

Dokumen ini menjelaskan cara menggabungkan semua file source kembali menjadi `template.xml` final.

## Urutan Merging

Ikuti urutan berikut untuk menggabungkan file-file:

### 1. Start dengan XML Declaration dan HTML Tag
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html b:css='false' b:defaultwidgetversion='2' b:layoutsVersion='3'
    expr:dir='data:blog.languageDirection' expr:lang='data:blog.locale'
    xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b'
    xmlns:data='http://www.google.com/2005/gml/data'
    xmlns:expr='http://www.google.com/2005/gml/expr'>
```

### 2. HEAD Section
Gabungkan dalam urutan:
1. `head/meta.xml` - Meta tags dasar
2. `head/title.xml` - Title tags
3. `head/social.xml` - Social meta dan canonical
4. `head/preconnect.xml` - Preconnect links
5. `head/analytics.xml` - Analytics dan tracking
6. `head/layout-skin.xml` - Favicon dan theme color
7. `config/template-settings.xml` - Template settings
8. `config/custom-css.xml` - Custom CSS

Semua file ini dibungkus dalam tag `<head>...</head>`

### 3. BODY Section
Dalam tag `<body expr:class='data:view.bodyClass'>`

#### a. Styles (CSS)
Gabungkan dalam tag `<style>`
- `styles/variables.xml`
- `styles/reset.css`
- `styles/base.css`
- `styles/header.css`
- `styles/nav.css`
- `styles/content.css`
- `styles/sidebar.css`
- `styles/widgets.css`
- `styles/comments.css`
- `styles/footer.css`
- `styles/responsive.css`

#### b. Header & Navigation
- `widgets/header-widget.xml`
- Tambahkan navigation menu (bisa custom)

#### c. Main Content
Buat struktur main content dengan:
- `snippets/filter-message.xml` - Pesan filter
- `snippets/breadcrumbs.xml` - Breadcrumb
- Looping untuk posts:
  - `snippets/post-title.xml`
  - `snippets/post-info.xml`
  - `snippets/post-snippet.xml` (untuk list view)
  - `snippets/post-body.xml` (untuk single view)
  - `snippets/read-more.xml` (untuk list view)
  - `snippets/share-buttons.xml`
  - `snippets/author-profile.xml` (untuk single view)
- `snippets/pagination.xml`
- `snippets/error-message.xml`

#### d. Sidebar & Widgets
- `widgets/featured-post-widget.xml`
- `widgets/popular-post-widget.xml`
- `widgets/label-widget.xml`
- `widgets/profile-widget.xml`
- `widgets/subscribe-widget.xml`
- `widgets/archive-widget.xml`
- `widgets/stats-widget.xml`
- Dan widgets lainnya sesuai kebutuhan

#### e. Footer
- `widgets/header-widget.xml` (atau custom footer)
- `config/custom-js-footer.xml`

### 4. Scripts Section
Gabungkan dalam tag `<script type='text/javascript'>` atau individual:
- `scripts/defer.js`
- `scripts/menu.js`
- `scripts/search.js`
- `scripts/toc.js`
- `scripts/related-post.js`
- `scripts/infinite-scroll.js`
- `scripts/lazyload.js`
- `scripts/ads.js`

### 5. Closing Tags
```
</body>
</html>
```

## Manual Merge Steps

Jika ingin merge manual:

1. Buka file editor yang mendukung multiple files (VSCode, Sublime, dll)
2. Buat file baru bernama `template-merged.xml`
3. Copy-paste XML declaration dan opening html tag
4. Buka HEAD section dengan `<head>`
5. Copy-paste isi semua file di folder `head/` dan `config/`
6. Tutup HEAD dengan `</head>`
7. Buka BODY section dengan `<body expr:class='data:view.bodyClass'>`
8. Copy-paste CSS dari folder `styles/`
9. Copy-paste widgets dan snippets sesuai struktur layout
10. Copy-paste scripts
11. Tutup dengan `</body></html>`

## Script Automation

Untuk automation, bisa gunakan:
- **Python Script**: Buat script `merge.py` yang membaca file-file dan menggabungkannya
- **Node.js Script**: Buat script `merge.js` dengan filesystem module
- **Bash Script**: Gunakan `cat` command untuk merge file (Linux/Mac)
- **PowerShell Script**: Windows-native scripting

Contoh Python:
```python
import os
from pathlib import Path

template_dir = Path('template')
output_file = Path('../template.xml')

sections = {
    'head': ['head/meta.xml', 'head/title.xml', ...],
    'styles': ['styles/variables.xml', 'styles/reset.css', ...],
    ...
}

with open(output_file, 'w', encoding='utf-8') as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    for section_files in sections.values():
        for file_path in section_files:
            with open(template_dir / file_path, 'r', encoding='utf-8') as src:
                f.write(src.read())
```

## Tips

- **Validate XML**: Setelah merge, validasi XML menggunakan XML validator
- **Minify (optional)**: Untuk production, minify CSS/JS tapi jangan XML
- **Backup**: Selalu backup file original sebelum perubahan
- **Version Control**: Gunakan Git untuk track perubahan
- **Test**: Upload ke Blogger test blog sebelum production
- **Compare**: Gunakan diff tool untuk membandingkan perubahan dengan version sebelumnya

## Struktur File Referensi

```
template/
├── head/
│   ├── meta.xml
│   ├── title.xml
│   ├── social.xml
│   ├── preconnect.xml
│   ├── analytics.xml
│   └── layout-skin.xml
├── styles/
│   ├── variables.xml
│   ├── reset.css
│   ├── base.css
│   ├── header.css
│   ├── nav.css
│   ├── content.css
│   ├── sidebar.css
│   ├── widgets.css
│   ├── comments.css
│   ├── footer.css
│   └── responsive.css
├── snippets/
│   ├── breadcrumbs.xml
│   ├── post-title.xml
│   ├── post-info.xml
│   ├── post-snippet.xml
│   ├── post-body.xml
│   ├── read-more.xml
│   ├── share-buttons.xml
│   ├── author-profile.xml
│   ├── pagination.xml
│   ├── error-message.xml
│   └── filter-message.xml
├── widgets/
│   ├── header-widget.xml
│   ├── featured-post-widget.xml
│   ├── blog-widget.xml
│   ├── popular-post-widget.xml
│   ├── html-widget.xml
│   ├── profile-widget.xml
│   ├── label-widget.xml
│   ├── page-list-widget.xml
│   ├── image-widget.xml
│   ├── contact-form-widget.xml
│   ├── archive-widget.xml
│   ├── subscribe-widget.xml
│   └── stats-widget.xml
├── scripts/
│   ├── defer.js
│   ├── menu.js
│   ├── search.js
│   ├── toc.js
│   ├── related-post.js
│   ├── infinite-scroll.js
│   ├── lazyload.js
│   └── ads.js
├── config/
│   ├── template-settings.xml
│   ├── custom-css.xml
│   └── custom-js-footer.xml
└── README.md
```
