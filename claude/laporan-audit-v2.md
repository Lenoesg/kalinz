# Laporan Audit v2: Tema KALINZ (Mobile-First), Berbasis Folder `assets/`

Tanggal: 22 Oktober 2026
Sumber: `kalinz_1.zip` (folder `postingan/` hanya dipakai sebagai bahan uji, bukan objek audit)
Berkas hasil: `assets/styles.css`, `assets/scripts.js`, `assets/custom-css-widget.css` (baru), `perubahan-v2.diff`

Semua perbaikan di bawah dilakukan pada berkas `assets/` supaya Anda bisa memeriksa, lalu meminify dan menempelkannya ke `template.xml` sendiri. Bagian yang tidak mungkin diselesaikan lewat aset dicantumkan terpisah di bagian 4.

## 1. Koreksi atas laporan sebelumnya

1. **Slot iklan (sebelumnya "Kritis") diturunkan.** Saya tidak melihat bahwa reservasi ruang iklan ternyata sudah ada di widget `HTML82` "Custom CSS" (`template.xml` baris 2256-2490), yang tidak ada di `styles.css`. Hasil ukur ulang dengan CSS itu disertakan:

   | Tinggi iklan terisi | Pergeseran iklan atas (cadangan 280 px) | Pergeseran iklan tengah (cadangan 250 px, kondisi lama) |
   |---|---|---|
   | 250 px | 0 px | 2 px |
   | 280 px | 2 px | tidak diuji |
   | 300 px | 22 px | 52 px |
   | 336 px | 58 px | 88 px |
   | 420 px | 142 px | tidak diuji |

   Iklan atas dan bawah sudah aman untuk format 336x280 atau lebih kecil. Celah yang tersisa: iklan tengah setelah dipindah ke `.post-body` tidak punya cadangan, dan format lebih tinggi dari 280 px tetap menggeser konten.
2. **Temuan Navbar `origin=http://localhost:80` saya cabut.** Itu kode bawaan widget Navbar hasil ekspor Blogger, bukan sisa konfigurasi.
3. **Ikon footer ternyata tidak tampil sama sekali** (temuan baru, lebih berdampak daripada yang saya laporkan sebelumnya soal `linkmagzfont`). Lihat C3.
4. **Terkait skala data:** hasil uji CLS tetap estimasi dari pengukuran jarak pergeseran, bukan skor dari observer.

## 2. Ringkasan temuan dan statusnya

| ID | Temuan | Status |
|---|---|---|
| C1 | Tap target di bawah 48 px pada elemen template | Diperbaiki di `styles.css` |
| C2 | CSS mati `#share a i` dan `linkmagzfont` | Dihapus dari `styles.css` |
| C3 | Ikon sosial footer tidak terlihat (font ikon tidak pernah didefinisikan) | Diperbaiki di `custom-css-widget.css` |
| C4 | Iklan tengah tanpa cadangan ruang setelah dipindah | Diperbaiki di `custom-css-widget.css` |
| J1 | Penempatan iklan tengah salah/hilang pada markup `<article>` | Diperbaiki di `scripts.js` |
| J2 | Pemuat AdSense menjalankan handler scroll terus-menerus | Diperbaiki di `scripts.js` |
| J3 | Related post dimuat saat load dan menyisipkan konten di viewport | Diperbaiki di `scripts.js` |
| J4 | Lazyload thumbnail via defer.js tertahan `opacity: 0` sampai load | Diperbaiki di `scripts.js` (blok pengganti baris 923) |
| J5 | `showBacaJuga` tidak pernah dipanggil, dan memanggil `escapeHTML` di luar scope | Dihapus dari `scripts.js` |
| X1-X4 | Schema ganda, breadcrumb, `#baca-juga`, atribut logo | Harus di `template.xml` (bagian 4) |
| R3 | Aturan CSS header seluler didefinisikan berulang | Belum diubah (bagian 5) |

## 3. Perubahan per berkas aset

### 3.1 `assets/styles.css`

**C2. Hapus CSS mati.** `#share a i` dan `#share a i::before { font-family: linkmagzfont }` dihapus. Tombol share memakai SVG inline, dan font itu tidak punya `@font-face` di mana pun.

**C1. Tap target.** Ditambahkan satu blok di akhir file bertanda `v2 MOBILE PATCH`. Blok ini bisa dihapus utuh bila hasil visualnya tidak cocok. Ukuran terukur di viewport 360 px (harness DOM tiruan dengan `styles.css` asli):

| Elemen | Sebelum | Sesudah | Cara |
|---|---|---|---|
| Ikon search `.iconsearch-label` | 24x31 | 48x48 | `min-width/min-height` |
| Tombol tutup menu `.closebtn` | 45x45 | 48x48 | box-sizing + ukuran tetap |
| Tombol submenu `.ms-submenu-button` | 40x40 | 48x48 | flex, panah dipusatkan |
| Pager (lama/baru) | 66x30 | 66x48 | `min-height` |
| Breadcrumb `a` | 58x14 | 58x52 | padding + margin negatif (tata letak tidak bergeser) |
| Byline/label `.post-info a` | 90x16 | 90x55 | sama |
| Link sidebar | 79x19 | 79x50 | padding |
| Link footer (PageList) | 56x16 | 64x51 | padding |
| Tombol TOC | 41x18 | 53x48 | padding + margin negatif |
| Hamburger | 48x48 | 48x48 | tidak diubah |

Posisi judul postingan tidak berubah (119 px sebelum dan sesudah), jadi breadcrumb dan byline tidak mendorong konten. Perubahan yang terlihat: area sidebar dan footer menjadi lebih tinggi (tinggi halaman uji naik sekitar 170 px). Periksa tampilannya sebelum dipakai.

Tidak diubah: chip label di thumbnail (`.label-info a`, sekitar 23 px). Itu tautan sekunder yang menumpuk di atas gambar; memperbesarnya akan menutupi thumbnail. Opsi lain: hapus tautan label dari kartu.

### 3.2 `assets/custom-css-widget.css` (baru)

Berkas ini adalah isi widget `HTML82` "Custom CSS" (`template.xml` baris 2256-2490) yang sebelumnya tidak ada di aset. Isinya teks mentah widget-setting; entitas seperti `&#8212;` harus dipertahankan dan berkas ini sudah saya uji aman sebagai XML (tanpa tanda kurang-dari atau ampersand mentah), jadi bisa ditempel utuh.

**C3. Ikon sosial footer.** Markup di widget `HTML831` (baris 4561) memakai `<i class="icon-facebook">` dan seterusnya, tetapi tidak ada aturan `content` per ikon dan tidak ada `@font-face` untuk `linkmagzfont`. Akibatnya keempat tautan berukuran 0x0, tidak terlihat dan tidak bisa disentuh. Perbaikan: ikon dibuat dengan CSS mask berisi SVG data URI (path dari Simple Icons, lisensi CC0), tanpa request tambahan dan tanpa mengubah markup. Hasil: tiap tautan 48x48, ikon 26x26. Saya sudah memeriksa hasil render visualnya (Facebook, YouTube, TikTok, WhatsApp tampil benar).

**C4. Cadangan iklan tengah.** Ditambahkan `.post-body .widget-content.kode-iklan-tengah { min-height: 280px }`. Pada 280 px, iklan 336x280 tidak menggeser konten. Angka 280 adalah asumsi; kalibrasi dengan data lapangan (bagian 5).

### 3.3 `assets/scripts.js`

Penanda blok dan nomor baris template Anda saya pertahankan.

**J1. Penempatan iklan (blok baris 4173-4231).** Selektor lama `div > br, span > br, div > p, span > p` hanya cocok dengan markup Blogger klasik. Logika baru: bila `.post-body` memuat `<article>`, titik sisip adalah anak langsung `<article>` (`P, UL, OL, TABLE, BLOCKQUOTE, FIGURE, SECTION, DIV, H2, H3`); jika tidak, selektor lama dipakai (perilaku markup klasik tidak berubah). Iklan tengah ditampilkan hanya bila ada minimal 5 blok (artikel) atau 2 titik (klasik); selain itu slot dihapus seperti sebelumnya.

Diuji pada 44 postingan contoh ditambah kasus tepi, posisi iklan tengah terhadap tinggi `.post-body`:

| | Lama | Baru |
|---|---|---|
| Di atas 70% (menumpuk di bawah) | 33 | 0 |
| 41-70% | 0 | 18 |
| 40% atau kurang | 2 | 27 |
| Dihapus (tidak ada titik sisip) | 11 | 1 (kasus uji "pendek", sesuai rancangan) |

Markup klasik (`div` + `br`) dan `_sejarah-pulau-nias` menghasilkan posisi yang sama dengan versi lama (27% dan 22%).

**J2. Pemuat AdSense (baris 4735-4749).** Handler scroll sekarang dilepas begitu terpicu pertama kali dan didaftarkan `passive`. Perilaku pemicu (muncul setelah scroll pertama) tidak berubah.

**J3. Related post (baris 806-862).** Request feed JSONP kini dimulai saat `#ms-related-post` berjarak 600 px dari layar (IntersectionObserver; fallback langsung memuat bila tidak didukung). Diuji: tidak ada request saat load, request muncul setelah scroll mendekat, judul tampil, postingan saat ini dilewati, HTML di judul di-escape, tanpa galat.

**J4. Lazyload gambar (blok pengganti baris 923, di bagian paling bawah berkas).** Kode di baris 923 template saat ini memanggil `Defer.dom("img.lazyload", 100, "loaded", ...)`, dan Defer baru bekerja setelah event load ditambah jeda, sementara `.lazyload` berstatus `opacity: 0`. Penggantinya langsung memasang `src`/`srcset` dari `data-src`/`data-srcset`, memberi `loading="lazy"` pada gambar yang jauh dari layar, memberi `loading="eager"` dan `fetchpriority="high"` pada gambar pertama yang sudah terlihat, dan menambahkan kelas `loaded` saat gambar selesai. Pemanggilan ulang untuk infinite scroll dan inisialisasi `SmoothScroll` ikut dipertahankan di blok yang sama.

Diuji: gambar pertama eager + prioritas tinggi, sisanya `loading="lazy"`, semua memperoleh kelas `loaded`. Yang tidak bisa dibuktikan di sini: penundaan unduhan `loading="lazy"` itu sendiri, karena Chromium headless di lingkungan uji memuat semua gambar bahkan pada halaman statis murni. Perilaku ini standar di browser sungguhan, tetapi verifikasi di perangkat tetap perlu.

**J5. `showBacaJuga` (baris 626-654).** Dihapus. Fungsi ini tidak pernah dipanggil (tidak ada `callback=showBacaJuga`) dan memanggil `escapeHTML` yang hanya terdefinisi di dalam IIFE related post. Pengaturan `bacaJuga`, `jumlahBacaJuga`, `judulBacaJuga` di `linkMagzSetting` kini tidak berfungsi dan boleh dihapus; CSS `.baca-juga-wrap` sengaja tidak saya hapus.

## 4. Perubahan yang tetap harus di `template.xml`

Ini hanya markup; tidak bisa dilakukan lewat aset. Semua belum diuji di Blogger; coba di tema salinan.

**X1. Schema ganda (baris 413).** Template sudah punya pengaman (`data:post.body contains "kalinz-custom-schema"`), jadi masalah hanya muncul bila isi postingan memuat JSON-LD tanpa penanda itu. Karena format postingan akan Anda tetapkan, pilih satu sumber saja. Opsi yang saya sarankan: template satu-satunya sumber schema, dan JSON-LD dilarang di isi postingan. Bila ingin tetap mengizinkan JSON-LD di postingan:

```xml
<!-- sebelum -->
<b:if cond='data:post.body contains &quot;kalinz-custom-schema&quot;'>
<!-- sesudah -->
<b:if cond='data:post.body contains &quot;kalinz-custom-schema&quot; or data:post.body contains &quot;application/ld+json&quot;'>
```

**X2. Breadcrumb (baris 468-500).** Saat ini semua label dirender sebagai level bertingkat (label hanyalah kategori sejajar) dan halaman saat ini tidak ada di schema bila postingan berlabel. Perbaikan: hanya label pertama, ditambah item halaman saat ini yang tidak terlihat.

```xml
<b:loop index='nomor' values='data:post.labels' var='label'>
  <b:if cond='data:nomor == 0'>
    / <span itemprop='itemListElement' itemscope='itemscope' itemtype='https://schema.org/ListItem'>
        <meta content='2' itemprop='position'/>
        <a expr:href='data:label.url + &quot;?&amp;max-results=6&quot;' expr:title='data:label.name' itemprop='item'>
          <span itemprop='name'><data:label.name/></span>
        </a>
      </span>
  </b:if>
</b:loop>
<span itemprop='itemListElement' itemscope='itemscope' itemtype='https://schema.org/ListItem'>
  <meta content='3' itemprop='position'/>
  <meta expr:content='data:blog.pageName' itemprop='name'/>
</span>
```

Item terakhir sengaja memakai `<meta>` agar breadcrumb tidak memanjang di layar HP. Cabang tanpa label (baris 489-498) sudah benar: itu adalah halaman saat ini di posisi 2.

**X3. `#baca-juga` (baris 623).** Hapus `<div id='baca-juga'/>` bersama blok skrip baris 626-654 (lihat J5).

**X4. Logo header (`<img>` di includable `image`, sekitar baris 2545).** Tambahkan atribut statis `fetchpriority='high' decoding='async'`. Dimensi (`expr:width/height`) dan `srcset` 160/320 sudah benar dan tidak menimbulkan CLS.

**Tempel ke template.xml** (sesuai penanda baris Anda sendiri):

| Berkas aset | Bagian | Baris template.xml |
|---|---|---|
| `scripts.js` | blok `blogPostBody` (kosong/dihapus) | 626-654 |
| `scripts.js` | blok `relatedPostScript` | 806-862 |
| `scripts.js` | blok iklan `isPost` | 4173-4231 |
| `scripts.js` | blok AdSense | 4735-4749 |
| `scripts.js` | "BLOK PENGGANTI" di akhir berkas | menggantikan baris 923 |
| `styles.css` | seluruh bagian setelah penanda `<b:skin>` | isi `b:skin` |
| `custom-css-widget.css` | seluruh isi | widget `HTML82`, baris 2256-2490 |

Catatan: blok kedua di akhir `styles.css` (`v2 MOBILE PATCH`) harus ikut masuk ke `b:skin`, dan harus tetap di bagian paling akhir agar menang dalam cascade.

## 5. Yang belum diubah dan alasannya

1. **Duplikasi aturan CSS header seluler (R3).** 11 kelompok selektor didefinisikan berulang di konteks media yang sama (misalnya `#header .widget img` di baris 1988 dan 4629, hasil akhir 28 px). Merapikannya berisiko mengubah tampilan header tanpa uji komputasi gaya per elemen, sedangkan manfaatnya hanya ukuran CSS. Saya biarkan.
2. **Reservasi matched content (autorelaxed)** dan **iframe komentar.** Tinggi aslinya belum saya ketahui; menebak berisiko menimbulkan ruang kosong. Ambil tinggi nyata dari PageSpeed Insights atau Chrome DevTools pada beberapa URL, lalu isi `min-height`.
3. **Kalibrasi tinggi slot iklan** (280 px untuk atas, bawah, dan tengah) dari data lapangan Search Console.
4. **Slot iklan yang tidak terisi** meninggalkan kotak 280 px berisi tulisan "Advertisement". Menciutkannya otomatis menimbulkan pergeseran naik, jadi saya tidak mengubahnya.
5. **`.lazyload { opacity: 0 }` tanpa `<noscript>`.** Pengguna tanpa JavaScript tidak melihat thumbnail. Dampak kecil; tambahkan `<noscript>` pada markup thumbnail bila ingin ditangani.
6. **Tautan share WhatsApp** tidak di-encode dan memakai deskripsi blog; cabang `twitter:image` kedua (baris 108 dan 111) mungkin tidak pernah tercapai. Keduanya ringan; belum saya ubah karena saya tidak yakin sintaks encode yang tersedia di ekspresi Blogger.

## 6. Hasil uji ringkas

| Uji | Hasil |
|---|---|
| Sinkronisasi `b:skin` vs `styles.css` (sebelum patch) | 0 aturan non-layout berbeda; satu-satunya perbedaan adalah blok `:root` yang hanya ada di XML |
| Perubahan baris | `styles.css`: -12 / +81 baris (setelah normalisasi akhir baris); diff lengkap di `perubahan-v2.diff` |
| Sintaks | `node --check scripts.js` lolos; CSS tanpa galat parse; widget CSS lolos sebagai XML |
| Overflow horizontal (CSS baru, 44 postingan x 320/360/390/430 px = 176 render) | 0 meluap |
| Tinggi header seluler | 63 px sebelum dan sesudah |
| Penempatan iklan | lihat J1 |
| Lazyload, related post | lihat J3 dan J4 |

Batasan: render memakai DOM Blogger tiruan, bukan halaman produksi; widget Blogger lain (Popular Posts, arsip, dan sebagainya) tidak ikut diuji.

Catatan akhir baris: berkas asli Anda memakai CRLF. Berkas hasil saya juga memakai CRLF, jadi diff hanya berisi perubahan nyata.

## 7. Saran format template postingan yang baru

Karena format postingan akan Anda tetapkan, ini batas yang membuat template dan skrip di atas bekerja baik:

1. Satu pembungkus `<article class="post-kalinz">` dengan minimal 5 blok anak langsung (`p`, `h2`, `div`, dan seterusnya), supaya iklan tengah punya titik sisip.
2. Semua `<img>` memakai `width` dan `height` asli, dan hanya gambar utama yang diberi `fetchpriority="high"`.
3. Tidak ada `<style>` di dalam isi postingan; pindahkan ke `b:skin` sekali saja.
4. Tidak ada JSON-LD di isi postingan bila memilih X1 opsi template sebagai satu-satunya sumber.
5. Heading mulai dari H2 (H1 sudah dari template); tabel dan blok lebar dibungkus kontainer ber-`overflow-x: auto`.
6. Tautan eksternal `target="_blank"` selalu disertai `rel="noopener noreferrer"`.
