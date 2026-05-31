# 🚀 Quick Start Guide

Panduan cepat untuk mulai menggunakan struktur template yang sudah dipisah.

## ⚡ 5 Menit Setup

### 1. Pahami Struktur
```
template/
├── head/          → Meta tags, title, social
├── styles/        → CSS files (separated by component)
├── snippets/      → Reusable HTML/XML snippets
├── widgets/       → Blogger widgets
├── scripts/       → JavaScript
├── config/        → Settings & custom code
├── README.md      → Dokumentasi umum
├── STRUCTURE.md   → Penjelasan tiap file
├── BUILD.md       → Panduan merge
└── merge_template.py → Automation script
```

### 2. Edit File Source
- **Jangan edit** `template.xml` di root
- **Edit file individual** di folder `template/`
- Contoh:
  - Ubah warna: edit `styles/variables.xml`
  - Ubah CSS header: edit `styles/header.css`
  - Ubah layout widget: edit `widgets/blog-widget.xml`

### 3. Merge ke Final XML
Setelah selesai edit, gabungkan semua file:

**Option A: Automatic (Recommended)**
```bash
cd template/
python merge_template.py
```

**Option B: Manual**
- Lihat `BUILD.md` untuk urutan manual merge

### 4. Upload ke Blogger
- Copy file `template.xml` dari root
- Masuk ke Blogger > Settings > Theme > Edit HTML
- Paste dan Save

## 📝 Contoh: Edit Header Color

### Sebelum:
Edit `template.xml` yang panjang (ribuan baris), cari kode header, edit CSS di sana.

### Sesudah:
1. Buka `template/styles/header.css`
2. Ubah property color
3. Save file
4. Run `merge_template.py`
5. Upload `template.xml` baru

## 🎯 Workflow Harian

```
1. Identifikasi perubahan yang ingin dibuat
   ↓
2. Cari file yang relevan di folder template/
   └─ Ada di STRUCTURE.md untuk referensi cepat
   ↓
3. Edit file tersebut
   └─ Gunakan VSCode atau editor pilihan
   ↓
4. Test di Blogger (optional)
   └─ Upload template.xml ke test blog
   ↓
5. Commit changes
   └─ Jika menggunakan Git
   ↓
6. Merge final template
   └─ python merge_template.py
   ↓
7. Upload ke production
   └─ Upload template.xml ke blog utama
```

## 🔍 Cheat Sheet - Cari File yang Tepat

| Ingin edit... | File mana? |
|---|---|
| Warna & font | `styles/variables.xml` |
| Header styling | `styles/header.css` |
| Navigation menu | `styles/nav.css` |
| Post title | `snippets/post-title.xml` |
| Sidebar widget | `widgets/*-widget.xml` |
| JavaScript menu | `scripts/menu.js` |
| Google Analytics | `head/analytics.xml` |
| Meta tags | `head/meta.xml` |
| Footer | `styles/footer.css` |

## 💡 Tips & Tricks

### Gunakan VSCode Features
- **Multi-file Find**: Ctrl+Shift+F untuk search di semua folder
- **Color Picker**: Click warna di CSS untuk color picker
- **Format Document**: Shift+Alt+F untuk auto-format
- **Snippets**: Buat custom snippets untuk kode yang sering dipakai

### Efficient Editing
- Buka semua file yang perlu di tab terpisah
- Switch antar tab dengan Ctrl+Tab
- Split editor untuk buka 2 file sejajar

### Testing
- Backup sebelum upload (otomatis oleh merge script)
- Test di Blogger test blog dulu
- Jika ada error, copy dari backup folder

## ⚠️ Common Mistakes

❌ **JANGAN:**
- Langsung edit `template.xml` di root
- Minify CSS/JS file source
- Merge manual tanpa checking urutan
- Upload tanpa backup

✅ **LAKUKAN:**
- Edit file individual di folder `template/`
- Keep file source readable (2 spasi indent)
- Use merge script untuk consistency
- Backup sebelum perubahan besar

## 🆘 Troubleshooting

**Q: Error saat jalankan merge_template.py**
- Pastikan file `.xml` di folder template valid
- Cek encoding file (harus UTF-8)
- Run script dengan admin privileges jika di Windows

**Q: Template rusak setelah upload**
- Ambil file dari backup folder
- Validasi XML sebelum upload (use online XML validator)
- Cek di browser console untuk error

**Q: Perubahan tidak muncul di Blogger**
- Clear browser cache (Ctrl+Shift+Del)
- Tunggu beberapa menit untuk sync
- Refresh halaman blog

## 📚 Dokumentasi Lengkap

- `README.md` - Overview umum struktur
- `STRUCTURE.md` - Penjelasan detail setiap file
- `BUILD.md` - Panduan merge & automation
- `merge_template.py` - Script automation dengan comment

## 🎓 Next Steps

1. **Backup**
   ```bash
   cp template.xml backup/template-original.xml
   ```

2. **Test Edit**
   - Edit 1 file kecil (misalnya `styles/variables.xml`)
   - Run merge script
   - Test di blog

3. **Ekstrak dari template.xml lama** (jika punya)
   - Manual copy-paste ke file-file baru
   - Atau gunakan split tools online

4. **Version Control** (recommended)
   ```bash
   git init
   git add .
   git commit -m "Initial template structure"
   ```

## 📞 Quick Links

- Blogger Help: https://support.google.com/blogger
- XML Validator: https://www.w3schools.com/xml/xml_validator.asp
- Blogger Template Language: https://support.google.com/blogger/answer/47270

---

**Sudah siap?** Mulai edit file di folder `template/` dan gunakan `merge_template.py` untuk generate `template.xml` final!
