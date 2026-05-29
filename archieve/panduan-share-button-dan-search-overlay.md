# Panduan Pembersihan Template Kalinz
**Fokus:** share buttons dan search overlay  
**Basis referensi:** `template.xml`, `template-performance-audit-2026.md`, `README.md`

---

## Tujuan pembersihan

Anda sudah menyelesaikan:
- advertorial cleanup
- font weight cleanup

Langkah berikutnya yang paling aman adalah:
1. **menyederhanakan share buttons** agar hanya menyisakan **WhatsApp + Facebook**
2. **menyederhanakan search overlay full screen** agar tampilannya lebih ringan dan tidak terlalu dominan

Prinsipnya:
- hapus bagian yang tidak dipakai
- jangan sentuh komponen yang dipakai lintas fitur
- ubah sekecil mungkin, tapi hasilnya jelas

---

# 1) Share buttons

## Kondisi sekarang
Di `template.xml`, blok share button ada di:

- `<b:includable id='postShareButton'>`

Isi saat ini memuat:
- WhatsApp
- Facebook
- Twitter/X
- Telegram

---

## Yang aman untuk dihapus

### Hapus blok Twitter/X
Di dalam `postShareButton`, hapus bagian ini:

```xml
<!-- twitter -->
<a aria-label='twitter' class='twitter'
    expr:href='"//twitter.com/intent/tweet?text=" + data:post.title + "&url=" + data:post.url'
    rel='nofollow noreferrer' title='x (twitter)'>
    <i class='icon-twitter' />
</a>
```

### Hapus blok Telegram
Di dalam `postShareButton`, hapus bagian ini:

```xml
<!-- telegram -->
<a aria-label='telegram' class='telegram'
    expr:href='"https://t.me/share/url?url=" + data:post.url + "&text=" + data:post.title + ""'
    rel='nofollow noreferrer' target='_blank' title='telegram'>
    <i class='icon-telegram' />
</a>
```

---

## Yang tetap dipertahankan

Sisa share button yang aman dipakai:

### WhatsApp
```xml
<a aria-label='whatsapp' class='whatsapp'
    expr:href='"//api.whatsapp.com/send?phone=&text=" + data:post.title + "%20%2D%20" + data:post.url'
    rel='nofollow noreferrer' title='whatsapp'>
    <i class='icon-whatsapp' />
</a>
```

### Facebook
```xml
<a aria-label='facebook' class='facebook'
    expr:href='"//www.facebook.com/sharer.php?u=" + data:blog.url'
    rel='nofollow noreferrer' title='facebook'>
    <i class='icon-facebook' />
</a>
```

---

## Yang perlu diperbarui setelah 2 tombol saja

### CSS share container
Di CSS, bagian ini:

```css
#share a{width:20%;display:block;font-size:24px;color:#fff;-webkit-transition:opacity .2s linear;transition:opacity .2s linear;float:left}
```

harus diubah karena sekarang hanya ada 2 tombol.

### Saran aman
Ubah jadi:

```css
#share a{width:50%;display:block;font-size:24px;color:#fff;-webkit-transition:opacity .2s linear;transition:opacity .2s linear;float:left}
```

Kalau Anda ingin tombol lebih seimbang dan rapi, 50% adalah pilihan paling aman.

---

## CSS yang aman untuk dibuang jika ikon itu tidak dipakai lagi

Kalau Anda memang sudah memastikan tidak ada pemakaian lain, maka bisa hapus:

```css
.twitter{background:#080808}
.telegram{background:#358dd1}
```

Yang tetap dipakai:
```css
.facebook{background:#3b5998}
.whatsapp{background:#25d366}
```

---

## Ikon font yang bisa dievaluasi
Di `@font-face` icon font, ada banyak icon class. Untuk share buttons, yang relevan sekarang hanya:
- `icon-whatsapp`
- `icon-facebook`

Jadi:
- **jangan hapus seluruh icon font**
- cukup hapus pemakaian icon yang tidak dipakai lagi
- kalau Anda mau pembersihan lebih jauh, baru evaluasi icon-twitter dan icon-telegram di deklarasi class

---

## Ringkasan blok share buttons yang aman

### Aman dihapus
- `<!-- twitter --> ... </a>`
- `<!-- telegram --> ... </a>`
- CSS `.twitter`
- CSS `.telegram`

### Aman diperbarui
- `#share a { width: 20%; }` → `width: 50%;`

### Aman dipertahankan
- WhatsApp
- Facebook
- wrapper `#share-container`
- judul `Bagikan`

---

# 2) Search overlay full screen

## Kondisi sekarang
Search overlay ada di:

- `<b:includable id='searchFormContainer'>`
- CSS `#searchcontainer` dan turunannya
- JS toggle di blok `<b:includable id='allJavaScripts'>`

Saat ini tampilannya masih full-screen:
- fixed
- full width / full height
- gelap penuh
- input besar di tengah

Secara fungsi aman, tapi visualnya cukup berat.

---

## Bagian yang aman untuk diubah

### A. HTML search container
Blok ini boleh tetap dipakai, tetapi tampilannya bisa disederhanakan:

```xml
<b:includable id='searchFormContainer'>
    <div id='searchcontainer'>
        <form expr:action='data:blog.searchUrl' id='search'>
            ...
        </form>
    </div>
</b:includable>
```

**Saran:**  
jangan hapus struktur ini kalau Anda masih ingin fitur search overlay tetap ada.  
Yang diubah adalah CSS dan perilaku tampilannya.

---

### B. CSS search overlay
Blok yang perlu disederhanakan adalah seluruh CSS berikut:

```css
#searchcontainer{position:fixed;width:100%;height:100%;z-index:100;display:block;background:rgba(0,0,0,.85);left:-100%;top:0;padding-top:calc(50vh - 55px);opacity:0;cursor:pointer;text-align:center;-webkit-transform:scale(.9) translate3d(0,-50px,0);transform:scale(.9) translate3d(0,-50px,0);-webkit-transition:opacity .3s,left 0s .3s,-webkit-transform .3s;transition:transform .3s,opacity .3s,left 0s .3s,-webkit-transform .3s}
#searchcontainer form{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0);-webkit-transition:.3s;transition:.3s}
#searchcontainer form input[type=text]{width:90%;top:0;left:0;z-index:99;padding:10px;border:none;border-bottom:2px solid rgba(255,255,255,.38);outline:0;font-size:1.75rem;background:0 0;color:#fff;text-align:center}
#searchcontainer form input[type=text]::-webkit-input-placeholder{color:#fff;opacity:.5}
#searchcontainer form input[type=text]::-moz-placeholder{color:#fff;opacity:.5}
#searchcontainer form input[type=text]:-ms-input-placeholder{color:#fff;opacity:.5}
#searchcontainer form input[type=text]::-ms-input-placeholder{color:#fff;opacity:.5}
#searchcontainer form input[type=text]::placeholder{color:#fff;opacity:.5}
#searchcontainer form input[type=text]:focus{border-bottom-color:rgba(255,255,255,.7)}
#searchcontainer.opensearch{left:0;opacity:1;-webkit-transform:scale(1) translate3d(0,0,0);transform:scale(1) translate3d(0,0,0);-webkit-transition:opacity .3s,left,-webkit-transform .3s;transition:transform .3s,opacity .3s,left,-webkit-transform .3s}
#searchcontainer.opensearch form{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);-webkit-transition:.3s .3s;transition:.3s .3s}
```

---

## Rekomendasi penyederhanaan tampilan

Kalau Anda ingin tetap memakai overlay, tapi lebih ringan dan tidak terlalu full-screen, ubah ke model berikut:

- background tetap gelap, tapi lebih soft
- kotak search menjadi panel tengah, bukan layar penuh yang terasa berat
- input tidak terlalu besar
- animasi dipangkas

### Prinsip CSS baru
Target visual yang lebih sederhana:
- panel centered
- lebar maksimum sekitar 520–600px
- padding cukup
- opacity overlay lebih ringan
- transisi singkat
- input lebih kecil dan lebih rapi

---

## JS yang aman untuk dipertahankan

Di blok `allJavaScripts`, bagian ini mengontrol buka/tutup search:

```javascript
!function(){var e=document.getElementById("searchcontainer"),n=document.getElementById("search-terms"),t=document.querySelectorAll(".iconsearch-label");if(null!=e&&null!=n){for(var c=0;c<t.length;c++)t[c].addEventListener("click",function(t){e.classList.toggle("opensearch"),e.classList.contains("opensearch")||(n.blur(),t.preventDefault()),t.stopPropagation()},!1);n.addEventListener("click",function(e){e.stopPropagation()},!1),document.addEventListener("click",function(t){e.classList.remove("opensearch"),n.blur(),t.stopPropagation()},!1),document.addEventListener("keydown",function(t){"Escape"==t.key&&(e.classList.remove("opensearch"),n.blur())})}}();
```

Ini **boleh dipertahankan** kalau Anda hanya mengubah tampilan CSS.

---

## Kalau ingin benar-benar menyederhanakan fungsi search

Anda bisa:
- tetap pakai tombol search
- tetap pakai form search Blogger
- hapus animasi berlapis
- hapus transisi scale/translate
- gunakan panel sederhana

Dengan kata lain:
- **jangan hapus form search**
- **hapus kompleksitas visualnya**

---

## Yang aman untuk dihapus jika Anda ingin versi paling ringan

Kalau Anda ingin search overlay sangat minimal, Anda bisa menghapus hal-hal berikut dari CSS:
- `transform: scale(...)`
- `translate3d(...)`
- transisi panjang
- font-size terlalu besar
- opacity layer yang terlalu dominan

Tapi saya **tidak menyarankan menghapus seluruh overlay** kalau search memang masih dipakai aktif oleh pengunjung.

---

# 3) Rekomendasi paling aman per blok

## Share buttons
### Hapus
- tombol Twitter/X
- tombol Telegram
- CSS `.twitter`
- CSS `.telegram`

### Ubah
- `#share a { width:20%; }` → `width:50%;`

### Pertahankan
- WhatsApp
- Facebook
- wrapper share container

---

## Search overlay full screen
### Ubah
- CSS `#searchcontainer`
- CSS `#searchcontainer form`
- CSS input search
- CSS `#searchcontainer.opensearch`

### Pertahankan
- `searchFormContainer`
- JS toggle search jika masih dibutuhkan
- `#search-terms`
- `.iconsearch-label`

### Hapus hanya jika Anda mau versi sangat minimal
- animasi scale/translate
- transisi yang terlalu banyak
- style full-screen yang terlalu dominan

---

# 4) Urutan kerja yang saya sarankan

## Tahap 1 — Share buttons
1. Hapus Twitter/X
2. Hapus Telegram
3. Ubah lebar tombol jadi 50%
4. Tes tampilan di post

## Tahap 2 — Search overlay
1. Sederhanakan CSS overlay
2. Pertahankan JS toggle
3. Perkecil tampilan panel
4. Tes di mobile

## Tahap 3 — Validasi
- pastikan tombol share tidak pecah layout
- pastikan search masih bisa dibuka/tutup
- pastikan tidak ada elemen kosong / spacing aneh

---

# 5) Kesimpulan

## Blok share buttons yang paling aman dibersihkan
- `postShareButton`
- CSS share button colors
- CSS lebar tombol share

## Blok search overlay yang paling aman disederhanakan
- `searchFormContainer`
- CSS `#searchcontainer`
- JS toggle search di `allJavaScripts`

## Inti keputusan
- **Share buttons**: sisakan **WhatsApp + Facebook**
- **Search overlay**: tetap ada, tapi **dibuat lebih sederhana dan lebih ringan**

Kalau Anda mau, langkah berikutnya bisa saya bantu buatkan **diff perubahan yang sangat spesifik per blok** agar Anda tinggal copy-paste ke `template.xml`.

---

# 6) Evaluasi tampilan share buttons pada postingan

Dari gambar yang Anda lampirkan, keputusan menyisakan **WhatsApp + Facebook** sudah **tepat secara arah**. Untuk blog Kalinz, ini lebih cocok daripada menampilkan banyak tombol sosial yang akhirnya hanya jadi noise visual.

## Kenapa sudah cukup tepat
- dua tombol sudah mewakili pola berbagi paling relevan untuk pembaca lokal
- tampilan jadi lebih sederhana dan fokus
- beban visual lebih ringan dibanding 4 tombol
- cocok dengan karakter blog yang lebih editorial dan arsip budaya

## Catatan pada tampilan yang sekarang
Dari screenshot, tombolnya terlihat:
- lebar penuh dan sangat dominan
- cukup kuat secara visual
- agak terasa seperti “bar aksi” daripada “bagian share ringan”

Kalau tujuan Anda adalah tampilan yang lebih rapi dan selaras dengan artikel budaya, saya sarankan:
- tetap 2 tombol
- tetapi buat ukurannya sedikit lebih halus
- beri jarak atau radius yang lebih lembut
- jangan terlalu tinggi jika tidak perlu

## Saran layout yang lebih cocok untuk blog Anda

### Opsi A — Tetap 2 tombol, full width
Ini cocok kalau Anda memang ingin share button terlihat tegas.

Kelebihan:
- sangat jelas untuk dipencet
- bagus di mobile
- sederhana

Kekurangan:
- terasa agak berat
- visualnya cukup “tegas” untuk blog yang temanya lebih editorial

### Opsi B — 2 tombol, tapi lebih ringan
Ini menurut saya paling cocok untuk Kalinz.

Saran visual:
- tetap sejajar 2 kolom
- tinggi tombol lebih kecil
- teks/icon tidak terlalu besar
- border-radius sedikit lebih lembut
- padding atas-bawah jangan terlalu tebal

Hasilnya:
- masih jelas
- tapi tidak mendominasi area artikel
- lebih cocok dengan tampilan blog budaya / lirik / arsip

## Tentang tombol share via link URL
Menurut saya, **tombol share via link URL itu ide yang bagus**, tetapi **hanya kalau dipakai sebagai pelengkap**, bukan pengganti WhatsApp dan Facebook.

### Kapan tombol URL layak ditambahkan
Tambahkan kalau:
- pembaca Anda sering membagikan link manual ke grup/chat
- Anda ingin tombol yang netral dan universal
- Anda ingin tetap punya opsi share walau aplikasi sosial tidak tersedia

### Kapan tidak perlu ditambahkan
Tidak perlu kalau:
- Anda ingin UI sesederhana mungkin
- Anda ingin hanya 2 tombol utama
- tujuan utama Anda adalah kejelasan visual, bukan banyak opsi

### Rekomendasi saya
Untuk blog Kalinz, urutan paling masuk akal adalah:
1. WhatsApp
2. Facebook
3. Copy link / URL

Jadi tombol URL sebaiknya:
- tidak menggantikan WhatsApp
- tidak menggantikan Facebook
- hanya jadi opsi tambahan kecil

---

# 7) Panduan jika ingin menambahkan tombol share via link URL

## Opsi yang paling aman
Tambahkan satu tombol kecil “Salin Link” atau “Copy URL”.

### Alasan
- berguna untuk semua perangkat
- tidak tergantung platform sosial
- cocok untuk pembaca yang mau kirim link ke mana saja
- berguna jika mereka tidak ingin share langsung ke WA/Facebook

## Bentuk yang saya sarankan
Kalau ditambah, jangan terlalu besar.  
Buat sebagai tombol ketiga yang lebih netral, misalnya:
- ikon link
- label kecil “Link”
- atau icon saja bila ruang sempit

## Dampak ke layout
Kalau ada 3 tombol, maka:
- jangan pakai width 50% lagi
- gunakan pembagian yang pas, misalnya 33.33%
- atau pakai flex agar lebar mengikuti isi

### Catatan penting
Kalau Anda menambahkan tombol URL, **jangan biarkan tombol lain jadi terlalu sempit**.  
Pada blog seperti Kalinz, keseimbangan visual lebih penting daripada banyaknya opsi.

## Rekomendasi final saya
Kalau fokus Anda performa + tampilan bersih:
- **tetap 2 tombol saja** sudah cukup

Kalau fokus Anda kegunaan maksimal:
- tambah **Copy Link** sebagai tombol ketiga

---

# 8) Kesimpulan rekomendasi terbaru

## Untuk blog Kalinz, saya paling merekomendasikan:
- **WhatsApp**
- **Facebook**
- opsional: **Copy Link**

## Pilihan paling cocok menurut saya
Kalau Anda ingin tampilan yang paling pas dengan karakter blog budaya:
- pertahankan 2 tombol
- kecilkan sedikit kesan “bar” yang terlalu lebar
- jangan tambahkan tombol lain kecuali memang Anda ingin fungsi copy link

## Verdict singkat
- **2 tombol WA + Facebook:** sudah tepat
- **tampilan sekarang:** sudah bagus, tapi bisa dibuat lebih halus
- **tombol URL:** bagus sebagai opsi ketiga, bukan wajib

</content>
<task_progress>
- [x] Pahami audit dan template.xml
- [x] Baca README.md untuk konteks struktur template
- [x] Susun panduan blok aman untuk share buttons dan search overlay
- [x] Simpan hasil ke file .md
- [ ] Tambahkan evaluasi tampilan share buttons dan opsi share via link URL ke panduan
</task_progress>
