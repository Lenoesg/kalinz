# Analisis Navigasi Sticky pada `template.xml`

## Kesimpulan singkat

Perilaku navbar yang “freeze” saat scroll di desktop dan mobile **bukan karena JavaScript scroll-lock**, tetapi karena **CSS `position: fixed`** pada elemen sticky navbar.

Di template ini, blok yang paling berpengaruh adalah:

- **Desktop**: `#navmenu-wrap-sticky`
- **Mobile**: `#navmenu-wrap-sticky` + elemen menu mobile `#navmenu-sidebar`

---

## Blok kode yang membuat navbar tetap menempel saat scroll

### 1) Desktop: navbar sticky
Blok ini adalah penyebab utama navbar di desktop tetap berada di atas saat halaman discroll:

```css
#navmenu-wrap-sticky{
  -webkit-transition:-webkit-transform .2s ease-in-out;
  transition:transform .2s ease-in-out;
  background:var(--menu-bg-color2);
  position:fixed;
  width:100%;
  z-index:9;
  top:0;
  left:0;
  right:0;
  -webkit-transform:translateY(-101%);
  transform:translateY(-101%);
  transition:transform .2s ease-in-out,-webkit-transform .2s ease-in-out;
  -webkit-backface-visibility:hidden;
  backface-visibility:hidden
}
#navmenu-wrap-sticky.navsticky-show{
  -webkit-transform:translateY(0);
  transform:translateY(0);
  -webkit-transition:-webkit-transform .2s ease-in-out;
  transition:transform .2s ease-in-out;
  transition:transform .2s ease-in-out,-webkit-transform .2s ease-in-out;
  display:table
}
```

### Kenapa ini bikin “freeze”
- `position: fixed` membuat elemen **menempel ke viewport**, bukan ikut scroll halaman.
- Script berikut yang mengaktifkan class `navsticky-show` saat scroll melewati tinggi header:

```javascript
!function(){var e,t,n,o,i,r,u;u={menuSticky:!0},optionLinkMagz(u),1==u.menuSticky&&(e=document.querySelector("#header-outer").getBoundingClientRect().height,t=document.querySelector("#navmenu-wrap-sticky"),n=document.querySelector(".nav-copy"),o=document.querySelector(".nav-original"),i=document.querySelector(".sidebar-sticky"),r="navsticky-show",null!=o&&(n.innerHTML=o.innerHTML),null!=o&&(window.addEventListener("resize",function(){e=document.querySelector("#header-outer").getBoundingClientRect().height}),window.addEventListener("scroll",function(){Math.round(window.pageYOffset)>=e?t.classList.add(r):t.classList.remove(r)})),null!=i&&(i.style.top="88px"),function(){for(var e=document.querySelectorAll(".menu-sticky a"),t=0;t<e.length;t++)e[t].setAttribute("tabindex","-1")}())}();
```

Jadi mekanismenya:
1. Scroll halaman.
2. Script menambah class `.navsticky-show`.
3. CSS mengubah `transform` dari `translateY(-101%)` jadi `translateY(0)`.
4. Navbar muncul sebagai sticky fixed bar.

---

### 2) Mobile: hamburger sampai search icon ikut “freeze”
Di mobile, bagian yang terlihat “tetap” adalah area menu atas yang berisi:

- hamburger button
- search icon

Karena **di mobile menu bar ini tetap berada dalam navbar sticky yang sama**, yaitu struktur:

```html
<div id='navmenu-wrap'>
    <b:include name='searchFormContainer' />
    <div id='navmenu-wrap-sticky'>
        <div class='menu-sticky'>
            <div class='nav-outer nav-copy'>
            </div>
        </div>
    </div>
    <b:section class='navmenu' id='navmenu' ...>
        ...
        <div class='nav-secondary'>
            <b:include name='searchIcon' />
        </div>

        <button aria-label='menu' class='navmenu-button'>
            <span />
            <span />
            <span />
        </button>
```

Dan CSS mobile ini menyembunyikan menu desktop lalu menampilkan tombol hamburger:

```css
@media only screen and (max-width:900px){
  .navmenu-button{
    display:block;
    background:0 0;
    height:48px;
    width:48px;
    padding:0;
    margin:0;
    border:none;
    cursor:pointer;
    outline:0
  }
  .navmenu-content{display:none}
}
```

Artinya:
- **hamburger icon** muncul di mobile
- **search icon** tetap ada di area navbar
- area navbar itu sendiri tetap sticky/fixed ketika scroll

Jadi bukan hamburger dan search icon yang diberi `position: fixed` secara langsung, melainkan **container navbar-nya** yang sticky.

---

## Blok yang paling relevan secara langsung

Kalau Anda ingin menunjuk bagian paling “pelaku utama”, ini dia:

### Desktop sticky bar
```css
#navmenu-wrap-sticky{
  position:fixed;
  top:0;
  left:0;
  right:0;
  z-index:9;
}
```

### Pemicu sticky saat scroll
```javascript
window.addEventListener("scroll",function(){
  Math.round(window.pageYOffset)>=e
    ? t.classList.add(r)
    : t.classList.remove(r)
})
```

### Mobile menu button
```css
@media only screen and (max-width:900px){
  .navmenu-button{display:block;}
  .navmenu-content{display:none}
}
```

---

## Apakah praktik ini masih bagus atau sudah ketinggalan zaman?

### Jawaban saya
**Masih bagus, masih umum dipakai, dan belum ketinggalan zaman.**

Sticky header / sticky nav masih relevan karena:
- membantu navigasi cepat
- bagus untuk UX, terutama di blog konten panjang
- memudahkan akses search dan menu tanpa harus scroll ke atas

Namun ada catatan penting.

---

## Kapan praktik ini masih bagus
Praktik ini cocok jika:
- blog Anda banyak artikel panjang
- navigasi atas memang sering dipakai
- search dan menu harus selalu mudah dijangkau
- desain header tidak terlalu besar

Untuk blog seperti milik Anda, **sticky nav masih layak dan fungsional**.

---

## Kapan mulai terasa kurang ideal
Praktik ini bisa terasa kurang modern kalau:
- header terlalu tinggi dan makan ruang layar
- sticky bar terlalu sering mengambil perhatian
- animasi terlalu agresif
- sticky header menutupi konten penting
- di mobile, bar terlalu padat sehingga tombol kecil dan sulit ditekan

Kalau terlalu besar, sticky header bisa terasa “berat” atau mengganggu reading flow.

---

## Saran saya untuk blog Anda

### 1) Tetap pakai sticky, tapi buat lebih ringan
Pertahankan sticky header, tapi:
- kurangi tinggi bar saat sticky
- pastikan jarak padding tidak terlalu besar
- hindari elemen berlebih di navbar sticky

### 2) Di mobile, prioritaskan keterbacaan
Untuk mobile:
- hamburger dan search tetap boleh sticky
- tapi pastikan area sentuh besar
- jangan terlalu banyak elemen di satu bar
- jika perlu, tampilkan hanya logo kecil + hamburger + search

### 3) Pertimbangkan sticky yang “conditional”
Lebih modern kalau sticky muncul hanya saat:
- user scroll ke bawah
- lalu hilang saat scroll naik ke atas sedikit

Ini terasa lebih halus daripada header yang selalu menempel penuh.

### 4) Periksa z-index dan overlap
Karena sticky bar fixed, pastikan:
- tidak menimpa konten
- tidak menutup judul artikel
- tidak bentrok dengan overlay search / menu sidebar

---

## Penilaian akhir
Untuk blog Anda:

- **Bukan praktik usang**
- **Masih valid**
- **Masih bagus untuk UX**
- Tapi sebaiknya **dioptimalkan agar lebih ringkas dan tidak terlalu dominan**, terutama di mobile

---

## Ringkasan paling singkat

Yang membuat navbar freeze saat scroll adalah:

1. `#navmenu-wrap-sticky { position: fixed; ... }`
2. Script scroll yang menambah class `.navsticky-show`
3. Media query mobile yang menampilkan `.navmenu-button` dan menyembunyikan `.navmenu-content`

Kalau dilihat dari praktik desain web saat ini, **sticky navbar masih bagus**, asal tidak terlalu besar dan tidak mengganggu pembacaan.
