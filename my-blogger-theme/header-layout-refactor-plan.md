# Audit Refactor Header KALINZ

Dokumen ini mengecek apakah rencana implementasi header sudah cocok dengan struktur nyata di `template.xml`, lalu menandai bagian yang perlu direvisi.

---

## Kesimpulan singkat

Rencana dasarnya **arahnya benar**, tetapi ada beberapa hal yang perlu diperjelas agar sesuai dengan kondisi template saat ini:

1. **Logo/header memang masih terpisah dari menu**  
   - Logo berada di:
     - `#header-outer > #header-wrap > #header-content > #header`
   - Menu berada di:
     - `#navmenu-wrap > #navmenu-wrap-sticky`
     - `#navmenu-wrap > .navmenu > .nav-outer.nav-original`

2. **Target desktop dan mobile belum bisa tercapai dengan CSS lama**
   - Desktop belum menjadi satu row penuh: `[Logo] [Menu] [Search]`
   - Mobile masih membuat `#header` berdiri sendiri dan center, padahal targetnya harus satu baris: `[Hamburger] [Logo] [Search]`

3. **Rencana memindahkan `#header` ke area navigasi itu benar**, tetapi perlu ditegaskan bahwa:
   - `#header` harus masuk ke row navigasi yang sama dengan `.navmenu-content`, `.nav-secondary`, dan `.navmenu-button`
   - karena sticky header menyalin `.nav-original`, maka logo harus ikut berada di `.nav-original` agar sticky tetap konsisten

4. **Ada satu tambahan penting yang belum disebut tegas di dokumen lama**
   - Menu saat ini berasal dari widget **`HTML72`** dan isinya **hard-coded**.
   - Kalau refactor ini fokus ke layout saja, `HTML72` boleh tetap dipakai.
   - Kalau ingin menu bisa diedit dari Dashboard Blogger, barulah perlu migrasi ke `PageList` atau widget menu lain.

---

# Struktur yang ada sekarang

## 1) Area logo
Saat ini logo berada di:

```xml
<b:section class='header' id='header' maxwidgets='1' showaddelement='no'>
```

Lokasinya ada di:

```xml
<header id='header-outer'>
  <div id='header-wrap'>
    <div id='header-content'>
      <b:section class='header' id='header' ...>
```

Isi widgetnya adalah `Header1`.

---

## 2) Area navigasi
Menu ada di:

```xml
<div id='navmenu-wrap'>
  <div id='navmenu-wrap-sticky'>
    <div class='menu-sticky'>
      <div class='nav-outer nav-copy'></div>
    </div>
  </div>

  <b:section class='navmenu' id='navmenu' ...>
    <b:widget id='HTML72' ...>
```

Di dalam widget `HTML72`, struktur utamanya adalah:

```xml
<div class='nav-outer nav-original'>
  <nav class='navmenu-content'>...</nav>
  <div class='nav-secondary'>...</div>
  <button class='navmenu-button'>...</button>
</div>
```

---

# Apakah langkah di dokumen lama sudah tepat?

## Yang sudah tepat
- Menyadari bahwa logo dan menu masih berada di area berbeda
- Menyadari bahwa layout desktop dan mobile belum sesuai target
- Menyebut bahwa sticky menu harus tetap aman
- Menyebut bahwa `searchFormContainer`, `mobileMenuContainer`, `navmenu-sidebar`, dan `navmenu-overlay` tidak perlu diubah untuk refactor layout ini

## Yang perlu direvisi
### 1) Posisi target `#header`
Kalimat “pindahkan `#header` ke dalam `.nav-outer nav-original`” pada dasarnya benar, tetapi perlu ditegaskan bahwa:

- `#header` harus menjadi bagian dari **row navigasi yang sama**
- lebih aman bila `#header` ditempatkan sebagai sibling sebelum `.navmenu-content` di dalam `.nav-original`
- tujuannya agar desktop dan mobile bisa diatur dengan `flex order` tanpa rewrite besar

### 2) Rule mobile lama
Dokumen lama menyebut rule `max-width:480px` yang membuat `#header` full-width dan center perlu diubah.  
Itu benar, tapi perlu tambahan detail:

- `#header` tidak boleh lagi berperilaku sebagai blok terpisah
- pada mobile, `#header` harus ikut berada dalam row yang sama dengan hamburger dan search

### 3) Selector yang perlu ditambah
Dokumen lama hanya menyebut selector umum. Untuk implementasi yang presisi, perlu juga menarget:

- `.nav-original #header`
- `.nav-copy #header`
- `.nav-original .navmenu-button`
- `.nav-copy .navmenu-button`

Karena sticky header menyalin HTML dari `.nav-original` ke `.nav-copy`.

### 4) Menu hard-coded belum disebut sebagai konsekuensi
Karena `HTML72` masih hard-coded, refactor ini **tidak otomatis membuat menu editable** dari dashboard.  
Dokumen lama perlu menambahkan catatan ini agar ekspektasi implementasi jelas.

---

# Rekomendasi implementasi yang benar

## Tahap 1 — Pindahkan logo ke row navigasi
Pindahkan:

```xml
<b:section class='header' id='header' ...>
```

dari:

```xml
#header-outer > #header-wrap > #header-content
```

ke area:

```xml
#navmenu-wrap
```

dan tempatkan di dalam:

```xml
<div class='nav-outer nav-original'>
```

sebelum:

```xml
<nav class='navmenu-content'>
```

### Tujuan
Agar logo, menu, dan search berada dalam satu row yang sama.

### Dampak baik
Karena `#navmenu-wrap-sticky` menyalin `.nav-original`, logo juga akan ikut muncul di sticky header tanpa tambahan logika baru.

---

## Tahap 2 — Atur desktop
Desktop target:

`[Logo] [Menu navigasi horizontal] [Search]`

Yang perlu dipastikan:

- `.nav-outer` menjadi satu row fleksibel
- `#header` berada di kiri
- `.navmenu-content` mengisi ruang tengah
- `.nav-secondary` tetap di kanan
- `.navmenu-button` tetap disembunyikan di desktop

---

## Tahap 3 — Atur mobile
Mobile target:

`[Hamburger] [Logo] [Search]`

Yang perlu dipastikan:

- `#header` tidak turun ke baris baru
- `.navmenu-button` tampil di kiri
- `#header` berada di tengah secara flex, bukan full-width block terpisah
- `.nav-secondary` tetap di kanan
- `.navmenu-content` tetap disembunyikan

---

## Tahap 4 — Bersihkan rule lama
Rule yang harus direvisi:

- `#header-outer #header-content`
- `#header`
- `#header .widget`
- `#header .widget h1.blog-title, #header .widget h2.blog-title`
- `#header .widget img`
- `.navmenu .nav-outer`
- `.menu-sticky .nav-outer`
- `.navmenu-content`
- `.nav-secondary`
- `.navmenu-button`
- `@media only screen and (max-width:900px) .navmenu-content`
- `@media only screen and (max-width:900px) .navmenu-button`
- `@media only screen and (max-width:480px) #header`
- `@media only screen and (max-width:480px) .menu-sticky, .navmenu`

### Catatan revisi penting
- `#header` tidak boleh lagi memakai `flex: 1 1 50%` dan `max-width: 50%`
- `#header` juga tidak boleh lagi berubah menjadi full-width center di mobile
- `.nav-outer` sebaiknya tidak wrap, supaya logo tidak jatuh ke baris bawah

---

# CSS yang perlu ditambahkan / disesuaikan

## Inti layout row
- `display: flex`
- `align-items: center`
- `justify-content: flex-start`
- `flex-wrap: nowrap`

## Urutan desktop
- `#header` → `order: 0`
- `.navmenu-content` → `order: 1`
- `.nav-secondary` → `order: 2`
- `.navmenu-button` → `display: none`

## Urutan mobile
- `.navmenu-button` → `order: 0`, `display: flex`
- `#header` → `order: 1`, `flex: 1`
- `.nav-secondary` → `order: 2`
- `.navmenu-content` → `display: none`

---

# Tambahan dokumentasi yang disarankan

## 1) Catatan sticky header
Tambahkan catatan ini di dokumen implementasi:

> Sticky menu akan otomatis mengikuti perubahan karena `.nav-copy` menyalin `.nav-original`.  
> Jadi, selama `#header` sudah ditempatkan di `.nav-original`, logo juga akan muncul di sticky state.

## 2) Catatan menu hard-coded
Tambahkan catatan ini:

> `HTML72` masih menjadi sumber menu navigasi saat ini.  
> Refactor layout ini tidak mengubah sumber menu.  
> Jika ingin menu editable dari Dashboard Blogger, migrasi ke `PageList` perlu dibuat sebagai langkah terpisah.

## 3) Catatan mobile 320px–480px
Tambahkan catatan ini:

> Karena target layar kecil sangat sempit, logo harus diberi aturan `min-width: 0` dan tidak boleh memaksa wrapping.  
> Uji minimal pada lebar 320px untuk memastikan hamburger, logo, dan search tetap satu baris.

---

# Checklist pengujian yang lebih tepat

## Desktop
- [ ] Logo tampil di kiri
- [ ] Menu navigasi tampil horizontal setelah logo
- [ ] Search icon berada di kanan
- [ ] Tidak ada wrapping pada row header
- [ ] Sticky menu tetap menyalin layout yang sama
- [ ] Dropdown menu tetap berfungsi
- [ ] Search overlay tetap bisa dibuka
- [ ] Tidak ada ruang kosong berlebih

## Mobile
- [ ] Hamburger tampil di kiri
- [ ] Logo tampil di tengah
- [ ] Search icon tampil di kanan
- [ ] Menu utama tetap tersembunyi
- [ ] Hamburger membuka sidebar menu
- [ ] Search overlay tetap berjalan
- [ ] Logo tidak turun ke baris baru
- [ ] Tidak ada overflow horizontal
- [ ] Tampilan tetap rapi pada lebar 320px–480px

---

# Ringkasan final

Dokumen lama **cukup dekat dengan kondisi template.xml**, tetapi perlu tiga koreksi utama:

1. **Logo harus dipindahkan ke `.nav-original`**, bukan hanya “ke area navigasi” secara umum  
2. **Mobile rule yang membuat `#header` berdiri sendiri harus dihapus / diganti**  
3. **Perlu catatan bahwa `HTML72` adalah menu hard-coded saat ini**, jadi refactor layout tidak sama dengan migrasi menu editable

Dengan revisi ini, rencana implementasi menjadi sesuai dengan struktur aktual `template.xml` dan lebih aman untuk dipakai sebagai panduan perubahan.
