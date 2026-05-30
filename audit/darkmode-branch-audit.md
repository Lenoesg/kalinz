# Audit Blok yang Bercabang dengan Dark Mode

Dokumen ini merangkum bagian-bagian di `template.xml` yang punya cabang atau override khusus untuk dark mode, supaya bisa dibersihkan satu per satu dengan aman.

Referensi utama:
- `audit/cleanup-guide.md`
- `template.xml`

---

## Keputusan sekarang

Karena dark mode **tidak dipakai sama sekali**, maka target pembersihan berubah dari:
- “diperkecil”
menjadi:
- **dihapus total**

Artinya, blok yang aman dihapus adalah semua blok yang hanya berfungsi untuk dark mode, baik UI, setting, JavaScript, maupun CSS override-nya.

---

## 1) Blok yang aman dihapus total

### A. `darkmodeSwitch`
**Lokasi:** `template.xml` → `b:defaultmarkup id='darkmodeSwitch'`

**Fungsi:**
- menampilkan toggle dark mode
- memanggil fungsi `darkMode()`
- menampilkan label “Dark Mode”

**Status:** aman dihapus total

**Alasan:**
- kalau dark mode tidak dipakai, UI ini tidak punya fungsi lagi
- blok ini hanya menambah noise di navigasi

---

### B. Include `darkmodeSwitch` di `HTML72`
**Lokasi:** `template.xml` → widget `HTML72`

**Bagian terkait:**
```xml
<b:include name='darkmodeSwitch' />
```

**Status:** aman dihapus total

**Alasan:**
- inilah pemanggilan UI dark mode di menu utama
- setelah `darkmodeSwitch` dihapus, include ini juga harus ikut dihapus

---

### C. Script global dark mode di `<body>`
**Lokasi:** `template.xml` → tepat setelah `<body>`

**Bagian terkait:**
```xml
<script>
(localStorage.getItem('mode')) === 'darkmode' ? document.querySelector('body').classList.add('darkmode') : document.querySelector('body').classList.remove('darkmode')
</script>
```

**Status:** aman dihapus total

**Alasan:**
- ini hanya berguna untuk mengaktifkan class `.darkmode`
- kalau dark mode tidak dipakai, script ini tidak lagi diperlukan

---

### D. `LMcheckCheckbox()` dan `darkMode()`
**Lokasi:** `template.xml` → `b:defaultmarkup id='allJavaScripts'`

**Bagian terkait:**
```js
function LMcheckCheckbox(){...}
function darkMode(){...}
LMcheckCheckbox();
```

**Status:** aman dihapus total

**Alasan:**
- fungsi ini hanya dipakai untuk sinkronisasi checkbox dan localStorage dark mode
- kalau toggle dihapus, logika ini ikut tidak relevan

---

### E. Blok pengatur tampil/tidaknya tombol dark mode
**Lokasi:** `template.xml` → `b:defaultmarkup id='allJavaScripts'`

**Bagian terkait:**
```js
!function(){var e=document.querySelectorAll(".darkmode-switch"),o={tombolDarkmode:!0};if(optionLinkMagz(o),0==o.tombolDarkmode)for(var l=0;l<e.length;l++)e[l].parentNode.removeChild(e[l]);else for(l=0;l<e.length;l++)e[l].style.display="flex"}();
```

**Status:** aman dihapus total

**Alasan:**
- ini hanya mengontrol visibilitas tombol dark mode
- kalau fitur dark mode dihapus, opsi ini juga tidak diperlukan

---

### F. `HTML70` — template settings
**Lokasi:** `template.xml` → widget `HTML70`

**Bagian terkait:**
```js
tombolDarkmode : true,
```

**Status:** aman dihapus total

**Alasan:**
- setting ini hanya dipakai untuk mengaktifkan dark mode
- kalau dark mode sudah dihapus, setting ini harus ikut dibuang

---

## 2) Blok CSS yang aman dihapus total

Semua selector `body.darkmode ...` di `template.xml` aman dihapus, karena tidak ada lagi class `.darkmode` yang perlu didukung.

### A. Area header dan navigasi
Contoh:
- `body.darkmode #header-outer #header-wrap`
- `body.darkmode #header-outer #header-content`
- `body.darkmode #navmenu-wrap`
- `body.darkmode #navmenu-wrap-sticky`
- `body.darkmode .menu-sticky`
- `body.darkmode .navmenu`
- `body.darkmode .navmenu-button`
- `body.darkmode .navmenu-content`
- `body.darkmode .navmenu-content ul li ul`
- `body.darkmode #navmenu-sidebar-body`
- `body.darkmode #navmenu-sidebar-closebtn`

**Status:** aman dihapus total

---

### B. Area sidebar
Contoh:
- `body.darkmode #sidebar-wrap`
- `body.darkmode #sidebar-wrap a:link`
- `body.darkmode #sidebar-wrap a:visited`
- `body.darkmode #sidebar-wrap a:hover`
- `body.darkmode .normalwidget-title h2.title, ...`
- `body.darkmode .PopularPosts ...`
- `body.darkmode .Profile ...`
- `body.darkmode .FollowByEmail ...`
- `body.darkmode .label-size a.label-name`

**Status:** aman dihapus total

---

### C. Area konten/post
Contoh:
- `body.darkmode #content-wrap`
- `body.darkmode #ms-related-post p.ms-title`
- `body.darkmode .FeaturedPost .featured-img-bg`
- `body.darkmode .PopularPosts .popular-post-info`
- `body.darkmode .latestposts-title h2`
- `body.darkmode .post-title`
- `body.darkmode .breadcrumbs`
- `body.darkmode .post-info`

**Status:** aman dihapus total

---

### D. Area featured post
Contoh:
- `body.darkmode .FeaturedPost h2.title`
- `body.darkmode .FeaturedPost h3.title`
- `body.darkmode .FeaturedPost .post-summary`
- `body.darkmode .FeaturedPost h2 a`
- `body.darkmode .FeaturedPost p.featured-desc`

**Status:** aman dihapus total

---

### E. Area popular post
Contoh:
- `body.darkmode .PopularPosts .popular-post-widget-title h2.title`
- `body.darkmode .PopularPosts .popular-post-widget-title h3.title`
- `body.darkmode .PopularPosts .popular-post-snippet`
- `body.darkmode .PopularPosts .popular-post-title a`

**Status:** aman dihapus total

---

### F. Area footer
Contoh:
- `body.darkmode #footer-outer`
- `body.darkmode #footer-outer #footer-content`
- `body.darkmode #footer-content a`

**Status:** aman dihapus total

---

## 3) Blok tambahan yang aman dihapus karena hanya terkait dark mode secara tidak langsung

### A. CSS tombol dark mode
**Lokasi:** `template.xml` → `b:skin`

**Bagian terkait:**
- `.darkmode-switch`
- `.darkmode-switch .switch-title`
- `.darkmode-switch .switch`
- `.darkmode-switch .switch input`
- `.darkmode-switch .slider`
- `.darkmode-switch input:checked + .slider`
- `.darkmode-switch input:checked + .slider::before`

**Status:** aman dihapus total

**Alasan:**
- semua style ini khusus untuk toggle dark mode
- jika toggle dihapus, CSS ini tidak dipakai lagi

---

### B. Local storage dark mode
**Lokasi:** `template.xml` → `b:defaultmarkup id='allJavaScripts'`

**Bagian terkait:**
- pembacaan `localStorage.getItem('mode')`
- penyimpanan `localStorage.setItem('mode', ...)`

**Status:** aman dihapus total

**Alasan:**
- tidak ada lagi state yang perlu disimpan untuk dark mode

---

## 4) Urutan penghapusan yang paling aman

Kalau kamu mau bersih total dan meminimalkan risiko, hapus dengan urutan ini:

1. `darkmodeSwitch`
2. include `darkmodeSwitch` di `HTML72`
3. script dark mode di `<body>`
4. `LMcheckCheckbox()` dan `darkMode()`
5. blok pengatur `tombolDarkmode`
6. `HTML70` → `tombolDarkmode : true`
7. semua selector `body.darkmode ...`
8. semua CSS `.darkmode-switch ...`

---

## 5) Yang tidak perlu dipertahankan lagi

Karena dark mode tidak dipakai, kamu tidak perlu menyisakan:
- toggle UI
- fallback visual dark mode
- localStorage mode
- checkbox sync
- setting `tombolDarkmode`
- override warna khusus dark mode

---

## 6) Ringkasan praktis

### Aman dihapus
- `darkmodeSwitch`
- include `darkmodeSwitch` di `HTML72`
- script dark mode di `<body>`
- `LMcheckCheckbox()`
- `darkMode()`
- blok `tombolDarkmode`
- setting `tombolDarkmode : true`
- semua CSS `body.darkmode ...`
- semua CSS `.darkmode-switch ...`

### Tidak perlu dipertahankan
- semua fallback dark mode
- semua cabang warna dark mode
- semua logic penyimpanan dark mode

---

## 7) Klarifikasi: blok yang bukan dark mode

Dua blok berikut **bukan** bagian dari dark mode:

### A. `-webkit-animation-fill-mode: forwards; animation-fill-mode: forwards;`
Ini ada di rule `.lazyload + .lazy-loading` dan dipakai untuk animasi placeholder/lazyload, bukan dark mode.

**Aman dihapus?**
- **Bukan karena dark mode**
- Aman dihapus hanya jika kamu memang mau mematikan animasi placeholder
- Kalau tujuanmu cuma membersihkan dark mode, blok ini **tidak wajib dihapus**

### B. `<b:if cond='data:view.isLayoutMode or data:view.isPost'> ... HTML76 ...`
Ini adalah wrapper untuk slot iklan artikel/layout mode, bukan dark mode.

**Aman dihapus?**
- **Bukan karena dark mode**
- Aman dihapus hanya jika kamu memang mau menghapus blok iklan tersebut
- Kalau tujuanmu cuma bersih-bersih dark mode, blok ini **tidak terkait**

## 8) Kesimpulan

Kalau dark mode memang tidak dipakai, maka seluruh cabang dark mode di template ini **aman dihapus**.  
Pembersihan paling penting adalah menghapus:

- **UI toggle**
- **state logic JS**
- **CSS override `body.darkmode`**
- **setting template yang mengaktifkannya**

Dengan begitu template jadi lebih clean, lebih ringan, dan tidak menyimpan fitur yang jarang atau tidak pernah digunakan.
