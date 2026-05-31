# Analisis Header Logo dan Navigasi pada `template.xml`

Dokumen ini menjawab 3 hal:

1. **Blok kode mana yang terkait dengan header logo**
2. **Blok kode mana yang terkait dengan navigasi desktop dan mobile**
3. **Bagian mana yang tampil di tools tata letak Blogger**
4. **Penilaian apakah desain header/nav sekarang masih modern minimalis atau sudah ketinggalan zaman**

---

## 1) Blok kode yang terkait dengan header logo

### A. Wrapper utama header
Bagian utama header ada di sini:

```xml
<header id='header-outer'>
  <div id='header-wrap'>
    <div id='header-content'>
      ...
      <b:section class='header' id='header' maxwidgets='1' showaddelement='no'>
```

Ini adalah **wadah visual header** yang menampung logo dan area menu di atas.

---

### B. Widget logo / judul blog
Bagian yang benar-benar menampilkan logo/judul blog adalah widget ini:

```xml
<b:widget id='Header1' locked='true'
    title='KALINZ | Lirik Lagu Nias &amp; Budaya Nias (Header)'
    type='Header' version='2' visible='true'>
```

Di dalamnya ada beberapa includable penting:

#### 1. Gambar logo
```xml
<b:includable id='image'>
    <a expr:href='data:blog.homepageUrl' expr:title='data:title'>
        <img expr:alt='data:title' ... />
    </a>
</b:includable>
```

#### 2. Judul blog
```xml
<b:includable id='title'>
    <div class='blog-title-wrap'>
        <b:if cond='data:view.isSingleItem'>
            <h2 class='blog-title'>
                <a expr:href='data:blog.homepageUrl' expr:title='data:title'>
                    <data:title />
                </a>
            </h2>
        <b:else />
            <h1 class='blog-title'>
                <a expr:href='data:blog.homepageUrl' expr:title='data:title'>
                    <data:title />
                </a>
            </h1>
        </b:if>
    </div>
</b:includable>
```

#### 3. Deskripsi blog
```xml
<b:includable id='description'>
    <p class='title-description'>
        <data:this.description />
    </p>
</b:includable>
```

---

### C. CSS yang mengatur tampilan logo
Bagian CSS yang menentukan ukuran dan posisi logo/judul:

```css
#header-outer #header-content{
  max-width:var(--theme-width);
  background:var(--header-bg-color1);
  min-height:var(--header-height);
  display:flex;
  align-items:center;
  justify-content:flex-end;
}

#header{
  display:flex;
  flex-flow:row wrap;
  flex:1 1 50%;
  max-width:50%;
  align-items:center;
}

#header .widget h1.blog-title,
#header .widget h2.blog-title{
  margin:5px 25px 5px 0;
  text-transform:uppercase;
  font-size:1.75rem;
}

#header .widget img{
  max-height:var(--logo-height);
  display:block;
  width:auto;
  margin:5px 25px 5px 0;
}
```

Ini adalah bagian utama yang membuat logo terlihat besar, tinggi, dan punya jarak dari menu.

---

## 2) Blok kode yang terkait dengan navigasi bar desktop

### A. Wadah navigasi
Navigasi utama berada di:

```xml
<div id='navmenu-wrap'>
```

Lalu di dalamnya ada:

```xml
<div id='navmenu-wrap-sticky'>
  <div class='menu-sticky'>
    <div class='nav-outer nav-copy'>
    </div>
  </div>
</div>
```

dan widget menu utamanya:

```xml
<b:section class='navmenu' id='navmenu' maxwidgets='1' showaddelement='no'>
  <b:widget id='HTML72' locked='true' title='Kode Menu Navigasi' type='HTML' version='2' visible='true'>
```

---

### B. Isi menu desktop
Isi menu saat ini ditulis langsung sebagai HTML:

```xml
<b:widget-setting name='content'><![CDATA[
<li><a href='https://kalinz.blogspot.com/search/label/Lagu%20Nias'>Lagu Nias</a></li>
<li><a href='https://kalinz.blogspot.com/search/label/Lagu%20Rohani'>Lagu Rohani</a></li>
<li><a href='https://kalinz.blogspot.com/search/label/Maena%20Nias'>Maena Nias</a></li>
]]></b:widget-setting>
```

Ini berarti menu desktop **belum memakai PageList dinamis**, melainkan hard-code di widget HTML.

---

### C. Struktur navigasi desktop di dalam widget
Bagian yang benar-benar merender menu:

```xml
<b:includable id='main'>

    <div class='nav-outer nav-original'>

        <nav class='navmenu-content'>
            <ul>
                <data:content />
            </ul>
        </nav>

        <div class='nav-secondary'>
            <b:include name='searchIcon' />
        </div>

        <button aria-label='menu' class='navmenu-button'>
            <span />
            <span />
            <span />
        </button>

    </div>
    <b:include name='mobileMenuContainer' />

</b:includable>
```

Yang penting di sini:

- `.navmenu-content` = menu desktop
- `.nav-secondary` = ikon search
- `.navmenu-button` = tombol hamburger untuk mobile

---

### D. CSS navigasi desktop
Bagian CSS desktop nav yang paling relevan:

```css
#navmenu-wrap{
  width:100%;
  transition:.2s;
  background:var(--menu-bg-color2);
}

.menu-sticky,
.navmenu{
  background:var(--menu-bg-color1);
  margin:0 auto;
  padding:0 36px;
  box-sizing:border-box;
}

.navmenu-content{
  color:var(--menu-text-color);
  text-transform:uppercase;
  font-size:.875rem;
  flex:1 1 75%;
  order:1;
}

.navmenu-content>ul{
  display:flex;
  flex-flow:row wrap;
}

.navmenu-content>ul>li{
  font-weight:700;
  margin:0 30px 0 0;
}

.navmenu-content>ul>li>a{
  color:var(--menu-text-color);
  line-height:42px;
  display:inline-block;
  position:relative;
}
```

Efeknya:

- menu tampil horizontal
- gaya huruf uppercase
- jarak antar menu cukup besar
- nuansa cukup tegas dan editorial

---

## 3) Blok kode yang terkait dengan navigasi mobile

### A. Tombol hamburger
Tombol hamburger ada di dalam widget menu:

```xml
<button aria-label='menu' class='navmenu-button'>
    <span />
    <span />
    <span />
</button>
```

CSS-nya:

```css
.navmenu-button{
  color:var(--menu-text-color);
  display:none;
}

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
    outline:0;
  }

  .navmenu-content{
    display:none;
  }
}

.navmenu-button span{
  background-color:var(--menu-text-color);
  display:block;
  width:24px;
  height:3px;
  border-radius:2px;
  margin-bottom:5px;
}
```

Jadi di mobile:
- menu desktop disembunyikan
- hamburger ditampilkan

---

### B. Panel menu mobile / overlay
Komponen mobile menu ada di sini:

```xml
<b:includable id='mobileMenuContainer'>
    <div id='navmenu-sidebar'>
        <div id='navmenu-sidebar-closebtn'>
            <div class='closebtn'>&#10005;</div>
            <div class='closebtn-title'>
                ...
            </div>
        </div>
        <div id='navmenu-sidebar-body' />
    </div>
    <div id='navmenu-overlay' />
</b:includable>
```

Ini adalah **panel menu mobile** dan overlay gelap di belakangnya.

---

### C. CSS mobile overlay
Blok CSS yang membuat menu mobile muncul dari sisi kiri:

```css
#navmenu-overlay{
  display:none;
  position:fixed;
  z-index:22;
  top:0;
  left:0;
  width:100%;
  height:100vh;
  background-color:rgba(0,0,0,.85);
}

#navmenu-sidebar{
  display:none;
  position:fixed;
  width:80%;
  z-index:24;
  height:100vh;
  top:0;
  left:0;
  transform:translateX(-101%);
  transition:transform .2s ease-in-out;
}

#navmenu-sidebar-body{
  background:var(--posts-bg-color);
  padding:110px 22px 22px;
  overflow-y:auto;
  height:100%;
  box-sizing:border-box;
}
```

Dan saat aktif:

```css
@media only screen and (max-width:900px){
  #navmenu-sidebar{
    display:block;
  }

  .navmenu-activated #navmenu-overlay{
    display:block;
  }

  .navmenu-activated #navmenu-sidebar{
    transform:translateX(0);
  }
}
```

---

### D. JavaScript yang mengaktifkan menu mobile
Script ini yang menyalin menu desktop ke mobile sidebar dan membuka/menutup menu:

```javascript
(function(){var e=document.querySelector(".navmenu-content"),t=document.querySelector("#navmenu-sidebar-body"),n=document.querySelectorAll(".navmenu-button"),l=document.querySelector("#navmenu-overlay"),u=document.querySelector("#navmenu-sidebar-closebtn"),r=document.querySelector("#navmenu"),s="navmenu-activated";null!==e&&(t.innerHTML=e.innerHTML);for(var c=function(e){e.preventDefault(),r.classList.add(s)},i=0;i<n.length;i++)n[i].addEventListener("click",c);var o=function(e){e.preventDefault(),r.classList.remove(s)};null!==l&&l.addEventListener("click",o),null!==u&&u.addEventListener("click",o)})()
```

Fungsi utamanya:
- menyalin isi `.navmenu-content` ke `#navmenu-sidebar-body`
- menambah class `.navmenu-activated`
- menutup panel saat klik overlay atau tombol close

---

## 4) Bagian yang tampil di tools tata letak Blogger

Dari screenshot layout editor, elemen yang tampil sebagai gadget berasal dari `<b:section>` dan `<b:widget>` berikut:

### A. Header logo
```xml
<b:section class='header' id='header' maxwidgets='1' showaddelement='no'>
  <b:widget id='Header1' ... type='Header' ... visible='true'>
```

Ini yang tampil sebagai gadget header di layout:
- biasanya labelnya mengikuti judul widget
- di screenshot terlihat sebagai blok “KALINZ | ... (Header)”

---

### B. Menu navigasi utama
```xml
<b:section class='navmenu' id='navmenu' maxwidgets='1' showaddelement='no'>
  <b:widget id='HTML72' locked='true' title='Kode Menu Navigasi' type='HTML' version='2' visible='true'>
```

Ini yang tampil sebagai gadget menu navigasi di layout:
- terlihat sebagai “Kode Menu Navigasi”
- karena dia widget HTML yang punya title

---

### C. Pengaturan template
```xml
<b:section class='template-settings' id='template-settings' maxwidgets='1' showaddelement='no'>
  <b:widget id='HTML70' locked='true' title='Kode Pengaturan Template' type='HTML' version='2' visible='true'>
```

Tampil juga di layout karena itu section/widget nyata.

---

### D. Custom CSS
```xml
<b:section class='custom-css' id='custom-css' maxwidgets='1' showaddelement='no'>
  <b:widget id='HTML82' locked='true' title='Custom CSS' type='HTML' version='2' visible='true'>
```

Ini juga tampil sebagai gadget di layout.

---

### E. Bagian lain yang tampil di layout
Contoh lain yang juga tampil sebagai gadget:
- `main-content` → `FeaturedPost1`, `Blog1`
- `sidebar` → `PopularPosts1`
- `page-navmenu` → `PageList1`
- `footer-text` → `HTML80`

---

### F. Kenapa tampil di tools layout
Karena blok-blok itu adalah:

- `<b:section ...>`
- `<b:widget ... visible='true'>`

Blogger Layout Editor membaca section/widget ini sebagai gadget yang bisa dipindah/diedit.

---

### G. Yang tidak tampil sebagai gadget layout
Komponen runtime seperti:

- `#navmenu-overlay`
- `#navmenu-sidebar`
- `#navmenu-wrap-sticky`
- `searchFormContainer`

umumnya **bukan gadget terpisah**, karena itu hanya elemen HTML/include/JS/CSS, bukan section widget khusus.

---

## 5) Penilaian desain header dan navigasi Anda sekarang

### Kesimpulan saya
**Secara fungsi, header dan navigasi Anda masih bagus.**
**Secara visual, tampilannya masih rapi, tetapi belum sepenuhnya modern minimalis.**

Lebih tepatnya, gaya saat ini terasa:

- **clean**
- **tegas**
- **blog magazine style**
- sedikit **klasik / editorial**
- belum sepenuhnya mengikuti tren minimal modern yang sangat ringan

---

## 6) Kenapa belum sepenuhnya modern minimalis

Beberapa ciri yang membuat tampilannya masih terasa “tema blog klasik”:

1. **Huruf uppercase cukup dominan**
   - menu desktop dan judul terlihat cukup keras
   - ini memberi kesan formal, tapi sedikit lawas

2. **Navbar gelap cukup tebal**
   - visualnya kuat
   - bagus untuk kontras
   - tapi kalau terlalu dominan bisa terasa berat

3. **Sticky bar terasa penuh**
   - ada logo, menu, search, dan hambuger tergantung viewport
   - kalau tidak diringankan, kesannya agak padat

4. **Mobile memakai sidebar overlay**
   - ini masih valid
   - tapi tren UI sekarang sering lebih sederhana: top bar ringan, drawer halus, item lebih lega

5. **Menu hard-code**
   - dari sisi desain bukan masalah
   - tapi dari sisi pengelolaan, kurang modern dibanding menu yang dinamis dan terstruktur

---

## 7) Apakah masih ideal?

### Jawaban singkat
**Masih ideal secara fungsional, cukup bagus untuk blog konten, tetapi perlu penyegaran agar terasa lebih modern.**

Kalau target Anda:
- blog yang informatif
- banyak artikel
- navigasi cepat
- brand kuat dan tegas

maka gaya ini **masih layak**.

Kalau target Anda:
- tampilan modern minimal
- lebih ringan
- lebih premium
- lebih “2026 style”

maka perlu sedikit perbaikan.

---

## 8) Rekomendasi saya

### A. Pertahankan struktur besar, tapi ringankan tampilannya
Jangan ubah total susunan header dan nav, karena itu sudah fungsional.  
Yang perlu dilakukan adalah:

- kecilkan tinggi header dan nav
- kurangi padding horizontal
- kurangi weight font menu
- rapikan jarak antar elemen

---

### B. Logo dibuat lebih ringkas
Jika logo Anda berupa gambar:
- batasi tinggi logo agar tidak terlalu dominan
- gunakan ruang kosong yang cukup di kiri-kanan

Jika logo berupa teks:
- pakai font yang lebih bersih
- jangan terlalu lebar letter-spacing-nya

---

### C. Menu desktop lebih minimal
Saran:
- font size sedikit lebih kecil
- weight jangan terlalu tebal
- uppercase boleh dipertahankan, tapi jangan berlebihan
- efek hover cukup garis tipis atau opacity, jangan terlalu banyak animasi

---

### D. Mobile lebih sederhana
Untuk mobile, saya sarankan pola seperti ini:
- hamburger kiri
- logo tengah
- search kanan

Ini sudah cukup modern dan sangat umum dipakai.

Kalau sekarang masih terasa padat, ringankan dengan:
- ikon lebih kecil
- jarak antar ikon konsisten
- panel menu mobile lebih bersih
- item menu dibuat lebih besar untuk sentuhan jari

---

### E. Sticky tetap boleh, tapi jangan berat
Sticky nav masih bagus.  
Yang sebaiknya dijaga:
- tinggi sticky jangan terlalu besar
- jangan terlalu banyak lapisan
- transisinya halus dan cepat
- hindari tampilan yang terlalu “menempel keras”

---

### F. Ubah hard-coded menu menjadi lebih terstruktur
Kalau Anda ingin tampilan dan maintenance lebih modern:
- pindahkan menu dari `HTML72` hard-code ke `PageList`
- atau minimal buat struktur menu yang lebih mudah dikelola

Ini tidak langsung mengubah visual, tapi sangat meningkatkan kualitas template.

---

## 9) Rekomendasi final saya

### Jika saya menilai jujur:
- **belum ketinggalan zaman**
- **masih aman dipakai**
- **tetapi sudah mulai terasa seperti desain blog generasi sebelumnya**

### Kalau ingin lebih modern minimalis:
1. kecilkan tinggi header
2. kurangi ketebalan menu
3. pertahankan sticky, tapi buat lebih slim
4. sederhanakan mobile overlay
5. rapikan spacing logo dan search
6. pertimbangkan mengganti menu hard-code ke PageList

---

## 10) Ringkasan cepat

### Blok logo/header:
- `#header-outer`
- `#header-content`
- `b:section id='header'`
- widget `Header1`
- CSS `#header .widget img`, `#header .widget h1.blog-title`

### Blok navigasi desktop:
- `#navmenu-wrap`
- `#navmenu-wrap-sticky`
- `b:section id='navmenu'`
- widget `HTML72`
- `.navmenu-content`
- `.nav-secondary`
- `searchIcon`

### Blok navigasi mobile:
- `.navmenu-button`
- `mobileMenuContainer`
- `#navmenu-sidebar`
- `#navmenu-overlay`
- JS clone menu + toggle `.navmenu-activated`

### Tampil di tools tata letak:
- `Header1`
- `HTML72`
- `HTML70`
- `HTML82`
- `PageList1`
- `HTML80`
- `FeaturedPost1`
- `Blog1`
- `PopularPosts1`

### Penilaian desain:
- **fungsional: bagus**
- **estetika: rapi tapi agak klasik**
- **modern minimalis: perlu penyegaran ringan**

---

## 11) Kalau menu ingin tidak uppercase

Kalau Anda ingin teks menu **tidak huruf besar semua**, ubah blok CSS yang mengatur `text-transform`.

### A. Blok desktop menu
Cari bagian ini:

```css
.navmenu-content{
  color:var(--menu-text-color);
  text-transform:uppercase;
  font-size:.875rem;
  flex:1 1 75%;
  order:1;
}
```

Ubah menjadi:

```css
.navmenu-content{
  color:var(--menu-text-color);
  text-transform:none;
  font-size:.875rem;
  flex:1 1 75%;
  order:1;
}
```

---

### B. Blok menu mobile
Cari bagian ini:

```css
#navmenu-sidebar-body ul li{
  position:relative;
  list-style:none;
  display:block;
  font-weight:700;
  text-transform:uppercase;
}
```

Ubah menjadi:

```css
#navmenu-sidebar-body ul li{
  position:relative;
  list-style:none;
  display:block;
  font-weight:700;
  text-transform:none;
}
```

---

### C. Kalau ingin hanya huruf awal kapital
Kalau Anda tidak mau full uppercase, tetapi tetap ingin rapi, bisa pakai:

```css
text-transform:capitalize;
```

Contoh:

```css
.navmenu-content{
  text-transform:capitalize;
}
```

---

### D. Blok yang perlu Anda ganti
Jadi, yang utama Anda ubah hanya:

1. `.navmenu-content { text-transform: uppercase; }`
2. `#navmenu-sidebar-body ul li { text-transform: uppercase; }`

Kalau dua blok itu diubah, menu desktop dan mobile tidak akan tampil all caps lagi.

---

## 12) Kalau logo ingin pindah ke kiri sejajar dengan menu desktop

Kalau Anda ingin **logo di kiri** dan **menu navigasi sejajar di sebelah kanan** khusus tampilan desktop, maka yang diubah adalah **layout flex di header**, bukan widget logo-nya.

### A. Blok yang paling penting
Cari CSS ini:

```css
#header-outer #header-content{
  max-width:var(--theme-width);
  background:var(--header-bg-color1);
  min-height:var(--header-height);
  display:flex;
  align-items:center;
  justify-content:flex-end;
}

#header{
  display:flex;
  flex-flow:row wrap;
  flex:1 1 50%;
  max-width:50%;
  align-items:center;
}
```

---

### B. Ubah agar logo ke kiri dan menu ke kanan
Gunakan versi ini:

```css
#header-outer #header-content{
  max-width:var(--theme-width);
  background:var(--header-bg-color1);
  min-height:var(--header-height);
  display:flex;
  align-items:center;
  justify-content:space-between;
}

#header{
  display:flex;
  flex-flow:row wrap;
  flex:0 0 auto;
  max-width:none;
  align-items:center;
}
```

---

### C. Tambahkan pengaturan khusus untuk desktop
Supaya logo benar-benar di kiri dan menu di kanan, Anda juga bisa atur container menu agar ikut dorong ke kanan. Cari bagian ini:

```css
.navmenu{
  max-width:var(--theme-width);
}
```

Lalu ubah / tambahkan menjadi:

```css
.navmenu{
  max-width:var(--theme-width);
  margin-left:auto;
}

.navmenu .nav-outer{
  justify-content:flex-end;
}
```

Kalau perlu, menu utama bisa tetap di kiri dalam area nav, tetapi seluruh blok nav bergeser ke kanan sejajar dengan logo.

---

### D. Jika ingin logo tetap kiri tetapi tidak terlalu rapat
Tambahkan ini:

```css
#header .widget h1.blog-title,
#header .widget h2.blog-title,
#header .widget img{
  margin:0;
}
```

Kalau ingin ada jarak sedikit:

```css
#header .widget h1.blog-title,
#header .widget h2.blog-title,
#header .widget img{
  margin:0 18px 0 0;
}
```

---

### E. Kalau hanya desktop, jangan ganggu mobile
Tambahkan perubahan ini di dalam media query desktop saja, misalnya:

```css
@media only screen and (min-width:901px){
  #header-outer #header-content{
    justify-content:space-between;
  }

  #header{
    flex:0 0 auto;
    max-width:none;
  }

  .navmenu{
    margin-left:auto;
  }
}
```

Dengan begitu:
- **desktop**: logo kiri, menu sejajar kanan
- **mobile**: layout lama tetap aman

---

### F. Ringkasnya, blok yang diubah
Untuk kebutuhan Anda, yang paling relevan adalah:

1. **`#header-outer #header-content`**
   - ubah `justify-content:flex-end` menjadi `space-between`

2. **`#header`**
   - ubah `flex:1 1 50%` dan `max-width:50%` menjadi `flex:0 0 auto` dan `max-width:none`

3. **`.navmenu`**
   - tambahkan `margin-left:auto`

4. **`.navmenu .nav-outer`**
   - bisa diubah ke `justify-content:flex-end` jika ingin menu terdorong ke kanan

Kalau Anda mau, langkah berikutnya adalah saya bisa bantu buatkan **patch CSS yang tepat** untuk `template.xml` agar logo kiri dan menu kanan hanya berlaku di desktop.
