# Refactor Aman Header / Nav Menu Kalinz Menjadi Satu Baris

**Tujuan:**  
Mengubah tampilan header dan navigasi agar:

## Desktop
Format menjadi:

```text
[LOGO] [MENU NAVIGASI] .......... [SEARCH]
```

Contoh:

```text
KALINZ | Lagu Nias | Lagu Rohani | Maena Nias | Budaya Nias | 🔍
```

## Mobile
Format menjadi:

```text
[HAMBURGER] [LOGO] [SEARCH]
```

Contoh:

```text
☰ ........ KALINZ ........ 🔍
```

---

# 1. Kesimpulan Singkat

**Ya, refactor seperti ini aman** jika dilakukan dengan prinsip berikut:

1. **struktur Blogger tetap dipertahankan**
   - `<b:section>`, `<b:widget>`, dan `<b:defaultmarkups>` jangan dihapus sembarangan,
   - cukup ubah susunan HTML/CSS di area header dan nav.

2. **pisahkan perubahan jadi 3 lapisan**
   - **markup XML** untuk susunan elemen,
   - **CSS** untuk layout satu baris,
   - **JS** untuk perilaku mobile menu dan search overlay.

3. **jangan ubah fungsi inti**
   - sticky menu,
   - mobile menu sidebar,
   - search overlay,
   - link menu,
   - struktur widget Blogger.

Kalau pendekatannya modular dan hati-hati, hasilnya sangat mungkin berhasil tanpa merusak template.

---

# 2. Target Layout yang Diinginkan

## Desktop
Urutan visual:

- logo di kiri,
- menu navigasi di tengah,
- icon search di kanan.

Skema:

```text
| LOGO | MENU 1 | MENU 2 | MENU 3 | MENU 4 | SEARCH |
```

## Mobile
Urutan visual:

- hamburger di kiri,
- logo di tengah,
- search di kanan.

Skema:

```text
| ☰ | LOGO | 🔍 |
```

---

# 3. Bagian Kode yang Aman untuk Direfactor

Dari struktur template Kalinz, bagian yang paling aman disentuh adalah:

## A. `header` wrapper
Bagian ini mengatur:
- logo,
- judul blog,
- deskripsi blog.

### Aman direfactor:
- struktur flex container,
- posisi logo,
- alignment title,
- spacing antar elemen.

### Jangan diubah sembarangan:
- `Header1` widget,
- kondisi `data:view.isSingleItem`,
- fallback logo/title behavior.

---

## B. `navmenu` wrapper
Bagian ini mengatur:
- menu desktop,
- menu mobile,
- icon search,
- tombol hamburger,
- overlay mobile menu.

### Aman direfactor:
- urutan elemen di `.nav-outer`,
- penempatan `.navmenu-content`,
- `.nav-secondary`,
- `.navmenu-button`.

### Jangan diubah sembarangan:
- `id='navmenu'`,
- `id='navmenu-wrap-sticky'`,
- `id='navmenu-sidebar'`,
- `id='navmenu-overlay'`.

---

## C. CSS layout header/nav
Yang paling aman direfactor adalah CSS berikut:

- `#header-outer`
- `#header-content`
- `#header`
- `.blog-title-wrap`
- `#navmenu-wrap`
- `.navmenu`
- `.nav-outer`
- `.navmenu-content`
- `.nav-secondary`
- `.navmenu-button`
- `#navmenu-sidebar`
- `#navmenu-overlay`

---

## D. JavaScript interaksi menu
Yang aman adalah:
- behavior toggle hamburger,
- pengisian menu mobile dari desktop menu,
- search overlay toggle.

### Jangan ubah logika inti jika belum perlu:
- sticky menu script,
- infinite scroll,
- TOC,
- related post.

---

# 4. Strategi Refactor yang Paling Aman

## Strategi terbaik
Jangan ubah semuanya sekaligus.

Lakukan dalam 3 langkah:

### Langkah 1 — rapikan markup header/nav
Tujuannya:
- satu wrapper utama,
- satu baris desktop,
- mobile tetap bisa collapse.

### Langkah 2 — rapikan CSS flex
Tujuannya:
- desktop jadi satu line,
- mobile tetap responsif.

### Langkah 3 — uji interaksi JS
Tujuannya:
- hamburger tetap membuka sidebar,
- search tetap muncul,
- sticky menu tetap berjalan.

---

# 5. Struktur HTML yang Disarankan

## Desktop layout
Satu container utama untuk header + nav:

```html
<header id="header-outer">
  <div id="header-wrap">
    <div id="header-content">
      <div id="header"></div>
      <div id="navmenu-wrap">
        <div class="navmenu">
          <div class="nav-outer nav-original">
            <nav class="navmenu-content"></nav>
            <div class="nav-secondary"></div>
            <button class="navmenu-button"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
```

## Prinsip penting
- logo dan menu berada dalam satu baris flex container,
- search tetap di sisi kanan,
- mobile menu tetap memakai sidebar overlay yang lama.

---

# 6. Perubahan CSS yang Aman

## A. Desktop satu baris
Target utama:
- `display: flex`
- `align-items: center`
- `justify-content: space-between`
- `flex-wrap: nowrap`

### Yang aman dilakukan:
- atur `#header-content` jadi flex horizontal,
- jadikan `#header` lebar otomatis,
- jadikan `.navmenu-content` fleksibel,
- letakkan `.nav-secondary` di ujung kanan,
- jaga `search icon` tetap clickable.

### Contoh aturan yang umum dipakai:
- `#header-content { display:flex; align-items:center; justify-content:space-between; }`
- `#header { flex: 0 0 auto; }`
- `.navmenu { flex: 1 1 auto; }`
- `.nav-outer { display:flex; align-items:center; }`
- `.navmenu-content { flex: 1 1 auto; }`
- `.nav-secondary { margin-left:auto; }`

---

## B. Mobile satu baris
Target:
- hamburger kiri,
- logo tengah,
- search kanan.

### Yang aman dilakukan:
- sembunyikan `.navmenu-content` di mobile,
- tampilkan `.navmenu-button`,
- biarkan logo tetap visible,
- search icon tetap visible,
- gunakan `justify-content: space-between`.

### Contoh prinsip CSS:
- hamburger `display:block`
- menu desktop `display:none`
- logo `margin:auto`
- search icon tetap di kanan
- jangan ada elemen yang memaksa tinggi header terlalu besar

---

## C. Hindari konflik lebar
Masalah umum ketika header dipaksa satu baris:
- logo terlalu lebar,
- menu turun ke bawah,
- search terdorong ke baris baru,
- mobile menjadi sempit.

### Solusi aman:
- batasi logo dengan `max-width`,
- gunakan `white-space: nowrap` untuk menu,
- izinkan menu scroll horizontal jika terlalu panjang,
- jangan paksa semua item muat jika terlalu banyak.

---

# 7. Perubahan Markup yang Paling Aman di File Anda

Berdasarkan struktur `my-templates/main-template.xml`, area aman yang paling relevan adalah:

## A. `header-markup.xml`
File ini seharusnya berisi:
- logo / title,
- description bila dipakai,
- wrapper header utama.

### Yang boleh diubah:
- susunan `div` header,
- urutan title dan logo,
- wrapper flex tambahan.

### Yang tidak boleh dihapus:
- widget `Header1`,
- kondisi Blogger `data:view.isSingleItem`.

---

## B. `main-template.xml`
File ini hanya menjadi kerangka utama.

### Yang aman:
- include ke `components/header-markup.xml`,
- include ke `components/sidebar-markup.xml`,
- include ke `components/footer-markup.xml`,
- include ke `assets/style.css`.

### Tujuan:
- main-template tetap bersih,
- perubahan tampilan cukup di komponen terkait.

---

## C. `assets/style.css`
Tempat paling aman untuk:
- grid/flex header,
- spacing,
- responsive header,
- menu alignment,
- search placement,
- mobile breakpoints.

### Saran:
Pisahkan blok CSS:
1. header desktop
2. nav desktop
3. header mobile
4. nav mobile
5. sticky menu

---

## D. `assets/scripts.js`
Tempat paling aman untuk:
- toggle menu mobile,
- toggle search,
- sync menu original ke mobile sidebar.

### Saran:
Jangan campur dengan logic lain seperti:
- infinite scroll,
- TOC,
- related post.

---

# 8. Hal yang Harus Tetap Dipertahankan

Agar refactor aman, pertahankan ini:

## Struktur Blogger
- `<b:section>`
- `<b:widget>`
- `<b:includable>`
- `<b:defaultmarkups>`

## ID penting
- `header`
- `navmenu`
- `navmenu-wrap`
- `navmenu-wrap-sticky`
- `navmenu-sidebar`
- `navmenu-overlay`
- `searchcontainer`

## Fitur yang sudah ada
- sticky menu
- mobile sidebar menu
- search overlay
- desktop dropdown submenu
- title blog responsive

Kalau ID ini diganti sembarangan, script lama bisa gagal.

---

# 9. Urutan Refactor yang Direkomendasikan

## Phase 1 — markup
1. Satukan struktur header dan nav secara visual.
2. Pastikan logo, menu, search ada di satu wrapper baris.
3. Pastikan hamburger hanya tampil di mobile.

## Phase 2 — CSS
1. Ubah header desktop jadi satu baris.
2. Atur desktop menu agar sejajar dengan logo.
3. Ubah mobile layout jadi hamburger + logo + search.
4. Cek overflow dan wrapping.

## Phase 3 — JS
1. Pastikan hamburger masih membuka sidebar menu.
2. Pastikan search icon masih membuka overlay search.
3. Pastikan sticky menu tetap sinkron.

## Phase 4 — verifikasi
1. Uji desktop.
2. Uji mobile.
3. Uji viewport kecil.
4. Uji halaman homepage, post, page.

---

# 10. Risiko yang Paling Sering Terjadi

## A. Header pecah jadi dua baris
Penyebab:
- menu terlalu panjang,
- container tidak flex,
- `navmenu-content` tidak fleksibel.

### Pencegahan
- gunakan `flex-wrap: nowrap`,
- batasi logo,
- atur menu menjadi horizontal scroll bila perlu.

---

## B. Hamburger tidak berfungsi
Penyebab:
- elemen `navmenu-button` dipindahkan tapi JS masih mencari selector lama,
- `navmenu` wrapper berubah.

### Pencegahan
- jangan ubah class/ID yang dipakai script,
- kalau ubah, update JavaScript juga.

---

## C. Search icon hilang di mobile
Penyebab:
- `nav-secondary` disembunyikan,
- search icon tidak diberi ruang,
- width header terlalu sempit.

### Pencegahan
- pastikan search icon punya slot tetap,
- jangan letakkan search di dalam container yang bisa collapse.

---

## D. Menu desktop melorot ke bawah
Penyebab:
- title/logo terlalu besar,
- padding kanan-kiri terlalu besar,
- menu tidak punya `min-width: 0`.

### Pencegahan
- kecilkan padding di desktop,
- atur menu supaya bisa shrink,
- gunakan `overflow: hidden` bila perlu.

---

# 11. Checklist Refactor Aman

## Struktur
- [ ] Pertahankan ID Blogger inti
- [ ] Satukan header dan nav dalam satu layout baris
- [ ] Pisahkan desktop dan mobile behavior
- [ ] Jangan ubah widget Blogger inti

## CSS
- [ ] Header desktop dibuat flex satu baris
- [ ] Menu desktop sejajar logo
- [ ] Search diposisikan di kanan
- [ ] Mobile dibuat hamburger + logo + search
- [ ] Cegah overflow di viewport kecil

## JS
- [ ] Hamburger tetap membuka sidebar menu
- [ ] Search overlay tetap berjalan
- [ ] Sticky menu tetap sinkron
- [ ] Jangan ganggu script lain

## Verifikasi
- [ ] Uji desktop
- [ ] Uji mobile
- [ ] Uji post page
- [ ] Uji homepage
- [ ] Uji halaman statis

---

# 12. Rekomendasi Implementasi Paling Aman

Kalau saya yang mengerjakan, saya akan pakai pola ini:

## Desktop
- logo di kiri,
- menu di tengah,
- search di kanan.

## Mobile
- hamburger kiri,
- logo tengah,
- search kanan.

### Kenapa pola ini aman
- tidak memaksa rewrite total template,
- tetap cocok dengan struktur Blogger,
- minimal perubahan pada script lama,
- mudah di-debug jika ada masalah.

---

# 13. Prioritas File yang Diubah

Kalau pakai struktur `my-templates/`, urutan file yang paling aman diubah adalah:

1. `components/header-markup.xml`
2. `components/sidebar-markup.xml` hanya jika perlu menyesuaikan mobile menu
3. `assets/style.css`
4. `assets/scripts.js`
5. `main-template.xml` hanya untuk menghubungkan komponen

---

# 14. Saran Teknis Terakhir

## Aman jika:
- perubahan dilakukan modular,
- header/nav tetap memakai ID yang dikenal script,
- CSS dan JS dipisah,
- hasil akhir tetap satu XML final untuk Blogger.

## Tidak aman jika:
- langsung menghapus wrapper lama,
- mengganti semua ID/class sekaligus,
- memindahkan menu tanpa memperbarui selector JS,
- upload file pecahan ke Blogger.

---

# 15. Kesimpulan Akhir

Untuk mengubah header/nav menu menjadi satu baris:

- **aman direfactor**
- **asal dilakukan bertahap**
- **jaga ID/class yang dipakai script**
- **ubah layout lewat CSS flex**
- **biarkan markup Blogger tetap valid**
- **uji desktop dan mobile sebelum paste ke Blogger**

Jika target Anda adalah:

- desktop: `LOGO | MENU | SEARCH`
- mobile: `HAMBURGER | LOGO | SEARCH`

maka pendekatan paling aman adalah **refactor modular** di `my-templates/`, lalu gabungkan ke satu file XML final setelah semua komponen lolos uji.

---

**Rekomendasi singkat:**  
Mulai dari `header-markup.xml` + `assets/style.css`, jangan langsung ubah semua file sekaligus.
