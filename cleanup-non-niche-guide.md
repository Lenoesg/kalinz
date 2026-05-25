# Panduan Pembersihan Elemen Non-Niche untuk Blog Kalinz

**Tujuan:** membersihkan elemen template dan konten yang tidak relevan dengan niche budaya Nias, bahasa Nias, lirik lagu Nias, dan dokumentasi budaya, supaya blog lebih ringan, lebih fokus, dan lebih profesional.

**Prinsip utama:**
- Hapus yang tidak membantu niche utama.
- Pertahankan yang mendukung UX, SEO, dan AdSense.
- Jangan ubah banyak hal sekaligus tanpa uji.
- Bersihkan bertahap per part agar aman.

---

## 1) Yang sebaiknya dibersihkan dulu

### A. Semua elemen yang terkait `Produk` dan `Jasa`
Ini adalah sisa paling jelas dari template lama dan paling tidak relevan untuk blog budaya.

#### Yang dibersihkan:
- label/menu `Produk`
- label/menu `Jasa`
- banner produk
- banner jasa
- halaman index produk/jasa
- style khusus produk/jasa
- logic khusus produk/jasa di template
- slider produk
- tombol WA jualan produk/jasa
- blok deskripsi harga / status produk
- seluruh conditional block yang hanya aktif untuk label `Produk`, `Products`, `Jasa`, `Services`

#### Kenapa dibersihkan:
- tidak sesuai niche
- bikin blog terlihat campuran
- menambah beban kode
- mengacaukan trust dan fokus konten

#### Dampak positif:
- template lebih bersih
- lebih ringan
- homepage tidak terlihat seperti toko / blog campuran
- Google lebih mudah memahami niche utama

---

### B. Komponen khusus “blog monetisasi lama” yang tidak perlu
Ada banyak bagian template yang lebih cocok untuk template jualan atau blog afiliasi, bukan arsip budaya.

#### Yang dibersihkan:
- blok layout produk/jasa
- komponen `order-wa`
- komponen `tombolPesanWA` jika tidak dipakai untuk layanan budaya
- teks CTA yang terlalu sales-like
- banner promosi yang tidak terkait konten budaya
- elemen visual yang mendorong transaksi, bukan baca konten

#### Kenapa dibersihkan:
- niche kamu bukan jual produk
- CTA sales bisa mengurangi kesan akademik / dokumenter
- halaman jadi terasa “ramai” dan kurang editorial

#### Catatan:
Kalau WhatsApp masih ingin dipakai, ubah fungsinya menjadi:
- kontak koreksi lirik
- kirim masukan budaya
- laporan kesalahan data

Jangan diposisikan sebagai tombol penjualan.

---

### C. Elemen layout yang terlalu ramai dan tidak esensial
#### Yang dibersihkan atau dipertimbangkan untuk disederhanakan:
- sticky menu jika terasa berat
- social buttons di header jika tidak penting
- search overlay full screen jika jarang dipakai
- featured post jika tidak benar-benar strategis
- popular post widget jika terlalu mendominasi sidebar
- related post random jika tidak relevan
- floating go-to-top jika sudah terasa berlebihan
- beberapa dekorasi visual yang tidak memperkuat brand

#### Kenapa dibersihkan:
- mengurangi distraksi
- memperkuat fokus ke isi
- mempercepat tampilan
- membuat blog terasa lebih dewasa dan serius

#### Prioritas:
Jangan hapus semua sekaligus.  
Coba hilangkan satu per satu lalu lihat efeknya ke UX dan performa.

---

### D. Script dan utility yang tidak dipakai
Template sekarang memuat banyak script tambahan.

#### Yang perlu dicek dan dibersihkan:
- infinite scroll jika tidak benar-benar dibutuhkan
- script slider untuk tipe posting tertentu jika fitur itu tidak dipakai
- script share tambahan yang tidak memberi nilai besar
- script layout mode yang hanya untuk editor
- script ad-hoc yang dipakai untuk eksperimen lama
- script lama yang duplikatif dengan Blogger bawaan

#### Kenapa dibersihkan:
- menurunkan ukuran halaman
- mempercepat render
- mengurangi risiko error
- memudahkan maintenance

---

### E. CSS lama yang tidak relevan
#### Yang perlu dibersihkan:
- CSS yang khusus mengatur produk/jasa
- CSS untuk banner promosi
- CSS untuk slider penjualan
- CSS untuk blok yang sudah dihapus
- CSS berulang atau duplikat
- aturan visual yang hanya bekerja untuk widget yang tidak dipakai

#### Kenapa dibersihkan:
- memperkecil file
- mengurangi konflik style
- bikin debugging lebih mudah
- layout lebih stabil

---

## 2) Bagian template yang paling layak dibersihkan pertama

### Prioritas 1 — Hapus semua logic non-niche
Di `template.xml`, bagian berikut paling wajib dibersihkan dulu:

- conditional untuk `Produk` dan `Jasa`
- `banner-produk`
- `banner-jasa`
- `html-produk`
- `html-jasa`
- `content-wrap-produk-index`
- `content-single-produk`
- semua tombol order / WA promosi
- semua style dan script yang hanya dipakai untuk area itu

#### Alasan:
Ini tidak mendukung niche budaya sama sekali dan paling besar efeknya terhadap kebersihan template.

---

### Prioritas 2 — Rapikan homepage agar tidak terlalu banyak blok
Di homepage, cek apakah semua blok ini memang perlu:

- featured post
- popular post
- top widget
- top widget 2
- in-feed ad
- sidebar widget terlalu banyak
- social header
- sticky nav copy

Kalau sebuah blok tidak punya fungsi editorial yang jelas, sebaiknya dipangkas.

---

### Prioritas 3 — Simplifikasi sidebar
Sidebar ideal untuk niche kamu seharusnya berisi:

- indeks kategori
- label penting
- kamus bahasa Nias
- penyanyi Nias
- artikel budaya
- halaman statis penting

Yang sebaiknya dikurangi:
- widget yang isinya terlalu umum
- widget yang mengulang isi homepage
- widget populer yang tidak relevan
- widget yang terlalu banyak memakan ruang visual

---

### Prioritas 4 — Simplifikasi area iklan
Kamu tetap bisa pakai AdSense, tapi jangan sampai blog terlihat seperti mesin slot iklan.

#### Yang perlu ditata:
- iklan atas artikel
- iklan tengah
- iklan bawah
- matched content jika memang efektif

#### Yang sebaiknya dihindari:
- semua slot aktif tanpa seleksi
- iklan terlalu rapat pada artikel pendek
- slot iklan yang memotong ritme baca

---

## 3) Yang sebaiknya tetap dipertahankan

Jangan sampai semua dibuang. Ada banyak bagian yang justru berguna.

### Pertahankan:
- header blog
- navigasi utama
- mobile menu
- TOC untuk artikel panjang
- breadcrumb
- schema markup yang relevan
- lazy load image
- dark mode jika memang masih nyaman dipakai
- halaman About, Contact, Disclaimer, Privacy
- internal link ke kategori inti
- post layout yang sudah rapi untuk lirik + makna + kosakata

### Kenapa dipertahankan:
Karena semuanya masih mendukung:
- navigasi
- SEO
- aksesibilitas
- kenyamanan baca
- kredibilitas

---

## 4) Urutan kerja yang aman

### Tahap 1 — Bersihkan yang jelas-jelas non-niche
Fokus ke:
- Produk
- Jasa
- promo
- tombol WA sales
- banner komersial

### Tahap 2 — Kurangi layout yang berlebihan
Fokus ke:
- widget tidak penting
- elemen visual yang ramai
- blok berulang

### Tahap 3 — Rapikan CSS dan script
Fokus ke:
- CSS duplikat
- JS tidak dipakai
- script yang hanya untuk fitur lama

### Tahap 4 — Uji tampilan
Cek:
- homepage
- halaman posting
- halaman statis
- mobile
- dark mode
- sidebar
- iklan

---

## 5) Checklist pembersihan per area

### Header
- [ ] hapus elemen non-niche di header
- [ ] pertahankan logo dan judul saja
- [ ] kurangi social icon jika terlalu ramai
- [ ] pastikan navigasi utama fokus pada niche budaya

### Menu
- [ ] hapus menu Produk/Jasa
- [ ] ganti dengan kategori budaya, bahasa, lagu, artis
- [ ] pastikan menu mobile tetap sederhana

### Homepage
- [ ] kurangi blok berlebihan
- [ ] pertahankan section yang benar-benar editorial
- [ ] ubah homepage menjadi hub budaya

### Sidebar
- [ ] hapus widget yang tidak mendukung niche
- [ ] prioritaskan indeks dan label inti
- [ ] ringkas popular post jika tidak relevan

### Post template
- [ ] hapus logic produk/jasa
- [ ] pertahankan struktur artikel budaya/lirik
- [ ] pastikan TOC dan internal link tetap berjalan

### Iklan
- [ ] evaluasi jumlah slot
- [ ] hapus slot yang tidak efektif
- [ ] hindari iklan yang memecah pengalaman baca

### CSS/JS
- [ ] hapus CSS lama yang tidak dipakai
- [ ] hapus script fitur lama
- [ ] tes ulang setelah setiap penghapusan besar

---

## 6) Yang paling berisiko kalau dihapus sembarangan

Jangan asal hapus bagian berikut tanpa cek dampaknya:

- `b:defaultmarkup` yang dipakai widget inti
- script TOC
- breadcrumb
- schema JSON-LD
- script komentar
- script mobile menu
- script dark mode
- lazyload script
- ad injection script yang masih dipakai

Kalau bagian ini dihapus sembarangan, tampilan bisa rusak atau fitur inti hilang.

---

## Lampiran — Blok Produk/Jasa yang aman dihapus dari `template.xml`

Kalau tujuanmu adalah menghapus semua komponen Produk dan Jasa tanpa mengganggu blog saat ini, blok di bawah ini aman dihapus **selama blog memang sudah tidak memakai label Produk/Products/Jasa/Services**.

### 1) Conditional di bagian `<head>`
Hapus semua logika yang memeriksa label Produk/Jasa:
- `data:view.isSearch and data:view.search.label in ["Produk","Products","Jasa","Services"]`
- `data:view.isSearch and data:view.search.label not in ["Produk","Products","Jasa","Services"]`
- semua meta description dan robots rule yang bercabang karena label tersebut

### 2) Layout / section khusus Produk dan Jasa
Hapus seluruh section ini karena khusus untuk mode lama dan tidak dipakai niche budaya:
- `<b:section class='banner-produk' ... id='banner-produk'>`
- `<b:section class='banner-jasa' ... id='banner-jasa'>`
- `<b:section class='html-produk' ... id='html-produk'>`
- `<b:section class='html-jasa' ... id='html-jasa'>`
- `<b:section class='banner-produk'>` dan `<b:section class='banner-jasa'>` beserta widget Image di dalamnya
- `<b:section class='html-produk'>` dan `<b:section class='html-jasa'>` beserta widget HTML di dalamnya

### 3) CSS layout khusus Produk/Jasa
Bagian ini bisa dihapus karena hanya mengatur tampilan halaman Produk/Jasa:
- `#content-wrap-produk-index`
- `.content-single-produk`
- `.html-jasa .normalwidget-title ...`
- `.html-produk .normalwidget-title ...`
- `.banner-jasa ...`
- `.banner-produk ...`
- semua aturan `#content-wrap-produk-index .content .post-outer`
- semua aturan `#content-wrap-produk-index .post-title`, `.post-snippet`, `b.harga-produk`, `b.info-produk`, `b.harga-produk-coret`
- semua aturan `.content-single-produk .post-outer-single .produk-container`
- semua aturan `.order-produk`, `.order-wa`, `.order-wa a`
- semua aturan `#content-wrap-produk-index #banner-jasa ...`
- semua aturan `#content-wrap-produk-index #banner-produk ...`

### 4) JavaScript khusus Produk/Jasa
Hapus script yang hanya mengaktifkan perilaku halaman Produk/Jasa:
- `defaultProdukPage`
- `blogPostBodyProduk`
- script `Siema Slider`
- script pembuat tombol WhatsApp `tombolPesanWA`
- semua kode yang mencari `.order-wa-link`
- semua kode yang menginisialisasi `.gambar-produk` / `.gambar-slider`
- semua conditional yang hanya berjalan saat label Produk/Jasa aktif

### 5) Default markup / includable khusus Produk/Jasa
Blok ini juga aman dihapus bila tidak ada konten Produk/Jasa:
- `defaultProdukIndexPage`
- `defaultProdukPage`
- `blogPostThumbnailProduk`
- `blogPostBodyProduk`
- `tombolOrderWA`
- `recentPostTitleProduk`
- `halamanProdukCSS`

### 6) Routing / branching Blog widget yang khusus Produk/Jasa
Hapus semua percabangan ini dari widget `Blog1`:
- `data:view.search.label in ["Produk","Products","Jasa","Services"]`
- `data:view.search.label not in ["Produk","Products","Jasa","Services"]`
- `data:view.isPost and data:posts any (...) labels in ["Produk","Products","Jasa","Services"]`
- `data:view.isSingleItem and data:posts any (...) labels in ["Produk","Products","Jasa","Services"]`
- `data:view.search.label in ["Produk","Products"]` untuk title pager
- `data:view.search.label in ["Jasa","Services"]` untuk title pager
- semua branch yang memanggil `defaultProdukIndexPage`, `defaultProdukPage`, `halamanProdukCSS`, atau `recentPostTitleProduk`

### 7) Widget / setting yang terkait Produk/Jasa
Kalau tidak dipakai, hapus atau kosongkan juga:
- `linkMagzSetting.tombolPesanWA`
- `linkMagzSetting.judulPesanWA`
- `linkMagzSetting.nomorWA`
- `linkMagzSetting.teksPesanWA`
- semua widget title yang menyebut Produk/Jasa

### 8) Layout mode only
Kalau ingin benar-benar bersih, boleh hapus juga dukungan layout mode khusus Produk/Jasa:
- `body#layout #banner-jasa h4`
- `body#layout #banner-produk h4`
- `body#layout #html-jasa h4`
- `body#layout #html-produk h4`
- semua style `body#layout` yang hanya menampilkan area Produk/Jasa

### 9) Apa yang aman tetap dipertahankan
Tetap simpan bagian inti ini:
- header
- menu utama
- homepage feed
- post layout biasa
- page layout biasa
- TOC
- breadcrumb
- related post umum
- schema JSON-LD
- iklan umum yang masih relevan

### 10) Checklist penghapusan cepat
- [ ] Hapus semua conditional Produk/Jasa
- [ ] Hapus banner Produk/Jasa
- [ ] Hapus default markup Produk/Jasa
- [ ] Hapus CSS Produk/Jasa
- [ ] Hapus JS Produk/Jasa
- [ ] Hapus branch routing Blog yang khusus Produk/Jasa
- [ ] Uji homepage
- [ ] Uji single post
- [ ] Uji halaman statis
- [ ] Uji mobile

### Catatan penting
Kalau blog saat ini memang sudah tidak punya konten dengan label Produk/Products/Jasa/Services, maka semua blok di atas adalah dead code dan tidak akan berdampak ke isi blog budaya Nias.
## 7) Prinsip aman saat membersihkan

- Hapus satu kelompok fitur, lalu uji.
- Jangan campur pembersihan layout dengan redesign total dalam satu langkah.
- Simpan backup sebelum edit besar.
- Jangan menyentuh fitur yang belum kamu pahami fungsinya.
- Prioritaskan yang dampaknya besar dan jelas.

---

## 8) Target hasil akhir setelah pembersihan

Blog seharusnya terasa seperti:

- arsip budaya yang serius
- fokus pada lagu dan bahasa Nias
- tidak bercampur dengan jualan atau template umum
- lebih ringan di mobile
- lebih cepat dibuka
- lebih rapi untuk pembaca dan Google
- lebih siap untuk AI Overview dan authority jangka panjang

---

## 9) Rekomendasi keputusan cepat

Kalau harus mulai dari satu langkah paling penting, lakukan ini dulu:

**Hapus semua komponen `Produk` dan `Jasa` dari template.**

Itu adalah pembersihan paling aman, paling relevan, dan paling besar dampaknya ke kesan profesional.

---

## 10) Ringkasan singkat

### Hapus:
- Produk
- Jasa
- banner promosi
- slider penjualan
- tombol order
- script lama yang tidak dipakai
- CSS non-niche
- elemen layout yang terlalu ramai

### Pertahankan:
- header
- navigasi inti
- TOC
- breadcrumb
- schema
- artikel budaya
- halaman trust
- iklan yang terukur

### Tujuan akhir:
Blog terlihat seperti **platform dokumentasi budaya Nias yang serius**, bukan template lirik lama yang dipaksa jadi niche budaya.
