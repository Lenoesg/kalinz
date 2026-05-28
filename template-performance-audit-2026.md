# Audit Kode Template Kalinz 2026
**Fokus:** desain template, kode usang, elemen advertorial yang tidak perlu, dan optimasi performa loading.  
**Basis:** `template.xml`

---

## Ringkasan singkat

Secara umum, template Kalinz **sudah cukup lengkap**, tetapi untuk target performa loading 2026 masih ada beberapa beban yang sebaiknya dirapikan.

Masalah utamanya bukan di satu bug besar, melainkan **akumulasi kode dan fitur yang terlalu banyak**:

- CSS sangat besar
- banyak script inline
- beberapa fitur template lama masih aktif
- ada komponen advertorial / iklan yang tidak selalu relevan
- ada widget dan markup yang menambah kompleksitas render
- ada pemakaian resource pihak ketiga yang bisa dipangkas

Kalau tujuan Anda adalah **mempercepat loading, memperkecil render-blocking, dan membuat template lebih ringan**, maka ada tiga area yang paling penting:

1. **hapus fitur yang tidak dipakai**
2. **kurangi script inline yang berat**
3. **pangkas markup / CSS yang cuma dipakai oleh fitur lama**

---

# 1. Kesimpulan teknis

## Template ini sudah modern di level dasar, tetapi belum ringan
Kelebihannya:
- responsive
- mobile menu
- lazy load
- TOC
- breadcrumbs
- related post
- dark mode
- schema dasar
- ad slots sudah dipisah

Kekurangannya:
- file template sangat besar
- banyak blok kode yang saling menumpuk
- ada script JS lama dan template utility yang sulit dipelihara
- ada elemen iklan / advertorial / sharing / widget yang tidak semuanya diperlukan untuk niche budaya

**Inti masalah performa:**  
bukan hanya ukuran file, tetapi **berapa banyak fitur yang harus diproses browser saat pertama kali membuka halaman**.

---

# 2. Kode / fitur yang perlu dievaluasi untuk dibuang atau dipangkas

## A. Kode advertorial / sponsored post
Di template ada logic khusus untuk:
- `Advertorial`
- `Iklan`
- `Sponsor`

Contohnya:
- `defaultPostAdPage`
- `postInfoAdvertorial`
- pengecekan label advertorial pada homepage/post

### Kenapa ini perlu dievaluasi
Kalau blog Anda tidak benar-benar memakai format advertorial secara rutin, maka bagian ini:
- menambah kompleksitas template
- membuat markup dan logika semakin panjang
- memperbanyak kondisi yang tidak diperlukan
- tidak memberi manfaat langsung ke performa

### Rekomendasi
Kalau format advertorial jarang dipakai:
- hapus `defaultPostAdPage`
- hapus `postInfoAdvertorial`
- hapus conditional logic yang membedakan ad page vs post normal
- sisakan satu jalur render artikel saja

Kalau tetap ingin advertorial:
- pindahkan ke modul terpisah
- jangan campur dengan jalur artikel organik utama

---

## B. Related post script yang terlalu berat
Bagian related post memakai:
- feed JSONP per label
- random selection
- script tambahan di halaman post

### Kenapa perlu dipangkas
Related post memang berguna, tetapi implementasi sekarang:
- menambah request tambahan
- menambah JS di halaman post
- memakai logika random yang tidak selalu relevan
- memperlambat DOM ready jika label banyak

### Rekomendasi
- batasi maksimal 3–4 artikel
- gunakan related post berbasis label yang paling dekat
- kalau memungkinkan, gunakan versi yang lebih sederhana
- hindari banyak parsing feed jika halaman sudah panjang

### Jika target utama adalah speed
Related post adalah kandidat kuat untuk:
- ditunda loading-nya
- ditampilkan setelah konten utama
- atau disederhanakan logikanya

---

## C. TOC otomatis dengan JS
TOC otomatis berguna, tetapi tetap menambah proses di halaman post.

### Komponen yang ada
- script generator TOC
- toggle show/hide
- selector heading `h2, h3`

### Masalah potensial
- kalau artikel pendek, TOC jadi tidak terlalu perlu
- jika heading tidak konsisten, TOC tidak optimal
- tetap menambah JS runtime

### Rekomendasi
- TOC tetap dipakai, tapi hanya saat ada heading cukup banyak
- kalau bisa, gunakan aturan yang hanya menampilkan TOC bila isi artikel memang panjang
- hindari heading dekoratif yang membuat TOC berantakan

---

## D. Share buttons
Share buttons ada di halaman post dan memakai beberapa icon/social endpoint.

### Apakah perlu dibuang?
Tidak harus dibuang total, tetapi bisa dipangkas.

### Kenapa
- tidak semua sosial punya kontribusi trafik yang signifikan
- tombol share terlalu banyak bisa menambah visual noise
- untuk performa, komponen sosial sebaiknya minimal

### Rekomendasi
Pertimbangkan hanya:
- WhatsApp
- Facebook
- Telegram

Kalau Twitter/X dan lainnya tidak memberi manfaat berarti, itu bisa dihapus untuk menyederhanakan UI.

---

## E. Search overlay full screen
Search overlay adalah fitur yang nyaman, tetapi juga menambah script interaksi.

### Rekomendasi
- jika search memang penting, biarkan
- jika jarang dipakai, sederhanakan tampilannya
- pastikan overlay tidak berat saat dibuka

Dari sisi loading awal, search overlay bukan masalah terbesar, tetapi bisa dipertimbangkan kalau ingin mengurangi script UI.

---

## F. Sticky menu dan sticky sidebar
Fitur sticky menambah pengalaman navigasi, tetapi juga menambah script dan repaint.

### Rekomendasi
- pertahankan sticky menu jika memang membantu
- evaluasi sticky sidebar di mobile karena biasanya tidak terlalu berguna
- kalau load performance jadi prioritas utama, sticky behavior bisa dipangkas sebagian

---

## G. Dark mode
Dark mode adalah fitur bagus, tetapi ada script dan class management yang ikut aktif.

### Rekomendasi
Kalau dark mode benar-benar dipakai:
- pertahankan
- tetapi sederhanakan logic
- pastikan tidak ada duplikasi class / event listener

Kalau dark mode jarang dipakai:
- pertimbangkan menjadikannya fitur opsional yang lebih ringan

---

# 3. Kode usang atau legacy yang layak diperiksa

## A. Font loading dari Google Fonts
Template memuat Roboto lewat banyak `@font-face` dan banyak file woff2.

### Dampak
- banyak request
- ukuran CSS membengkak
- render awal terganggu
- font eksternal menambah ketergantungan jaringan

### Rekomendasi
Kalau ingin lebih cepat:
- kurangi weight font yang tidak dipakai
- idealnya cukup 2 bobot saja: regular dan bold
- jika memungkinkan, pakai font system stack
- kalau tetap pakai Roboto, pastikan hanya subset yang benar-benar dipakai

### Catatan
Untuk niche budaya dan arsip editorial, **font sistem yang bersih** sering justru lebih cepat dan tetap rapi.

---

## B. Banyak inline script di template
Di `template.xml` ada beberapa blok script langsung di template, misalnya:
- defer loader
- menu handler
- search handler
- dark mode handler
- scroll to top
- TOC generator
- related post
- infinite scroll
- ad insertion

### Kenapa ini berat
- sulit di-cache
- sulit dipelihara
- browser harus memproses banyak script saat load
- kalau satu script error, dampaknya bisa merembet

### Rekomendasi
- pindahkan script yang bisa dipindah ke file eksternal bila memungkinkan
- gabungkan script yang sejenis
- buang yang tidak dipakai
- hindari menaruh logic besar langsung di template XML

---

## C. Infinite scroll
Infinite scroll di homepage bagus untuk pageview, tetapi tidak selalu bagus untuk performa dan kontrol crawl.

### Dampak
- menambah JavaScript runtime
- bisa memperpanjang halaman terus-menerus
- kadang membuat browser bekerja lebih berat
- bisa mengaburkan batas paging yang berguna untuk SEO dan UX

### Rekomendasi
Jika pageview bukan prioritas utama:
- pertimbangkan mematikan infinite scroll
- atau minimal batasi pemicu load berikutnya
- gunakan pagination normal yang lebih stabil

Untuk blog arsip budaya, pagination sering lebih bersih dan lebih mudah dipahami.

---

## D. Social icon font custom
Ada icon font custom yang sangat besar di template.

### Dampak
- jika font dipakai hanya untuk beberapa ikon, ini tidak efisien
- font custom menambah satu lapisan asset lagi
- icon SVG inline sering lebih ringan dan lebih mudah dikontrol

### Rekomendasi
- ganti ikon yang sering dipakai dengan SVG inline
- kalau tetap memakai font icon, pastikan benar-benar dibutuhkan
- buang ikon yang tidak dipakai

---

# 4. Bagian layout yang bisa dipangkas demi performa

## A. Sidebar yang terlalu ramai
Sidebar sekarang berisi:
- Popular Posts
- widget lain
- sticky area
- label / archive / profil / dll di level template

### Dampak
- lebih banyak render DOM
- lebih banyak request image/snippet
- lebih berat di mobile
- perhatian pembaca terpecah

### Rekomendasi
Kurangi sidebar jadi hanya elemen yang benar-benar berguna:
- indeks lagu
- indeks kamus
- top post
- kategori utama
- about singkat

Hindari terlalu banyak widget dekoratif.

---

## B. Footer widget yang terlalu aktif
Footer ada:
- social links
- page list
- copyright
- custom HTML

### Rekomendasi
Pertahankan yang penting saja:
- copyright
- page list
- 1 blok sosial utama

Kalau terlalu banyak widget footer, loading akhir halaman tetap jadi lebih berat.

---

## C. Banyak area iklan
Template memiliki:
- iklan atas
- iklan tengah 1
- iklan tengah 2
- iklan bawah
- matched content
- infeed ads

### Ini perlu evaluasi serius
Untuk performa loading dan UX, terlalu banyak slot iklan bisa:
- menambah script
- memperberat layout shift
- mengganggu ritme baca
- membuat halaman terasa agresif

### Rekomendasi
Jika artikel pendek:
- cukup 1 iklan atas
- 1 iklan tengah
- 1 iklan bawah

Kalau artikel panjang:
- boleh 2 slot tengah
- tetapi jangan semua aktif di setiap halaman

### Tentang kode advertorial / iklan
Kalau tujuan blog Anda adalah arsip budaya dan lirik, **slot iklan harus mengikuti panjang artikel**, bukan template seragam untuk semua konten.

---

# 5. Perubahan yang paling berdampak untuk loading

## Prioritas 1 — Kurangi JavaScript inline
Ini biasanya memberi dampak paling terasa setelah konten dipangkas.

### Target
- satukan script yang sama fungsinya
- hapus script yang tidak dipakai
- tunda eksekusi komponen non-kritis

---

## Prioritas 2 — Pangkas stylesheet besar
CSS template sangat besar dan bercampur:
- layout
- widget
- dark mode
- komentar
- related post
- TOC
- share
- ads
- forms

### Rekomendasi
- hapus selector untuk komponen yang tidak dipakai
- buang duplicate rules
- buang style lama yang sudah tidak relevan
- pertimbangkan pemisahan CSS kritis vs non-kritis

---

## Prioritas 3 — Hapus komponen advertorial jika tidak dipakai
Ini bukan hanya soal kerapihan, tapi juga soal:
- mengurangi template branching
- mengurangi markup render
- mengurangi maintenance

---

## Prioritas 4 — Sederhanakan related post, TOC, dan iklan
Tiga bagian ini adalah “fitur tambahan”, bukan inti rendering artikel.

---

## Prioritas 5 — Kurangi ketergantungan asset pihak ketiga
Setiap resource eksternal menambah:
- DNS lookup
- handshake
- risiko delay
- ketergantungan pada koneksi luar

Resource yang perlu dicek:
- Google Fonts
- Blogger assets
- gstatic
- BP image hosts
- script sosial / iklan

---

# 6. Rekomendasi desain untuk mempercepat loading

## A. Desain lebih sederhana = lebih cepat
Kalau tujuan utama adalah performa, desain sebaiknya:
- lebih sedikit efek visual
- lebih sedikit widget
- lebih sedikit overlay
- lebih sedikit elemen berlapis

### Yang cocok untuk blog Kalinz
- editorial clean
- putih / krem / abu muda
- aksen sederhana
- card ringan
- tipografi jelas

### Yang perlu dihindari
- terlalu banyak bayangan
- terlalu banyak hover effect
- banyak lapisan background
- elemen floating yang tidak penting

---

## B. Kurangi konten visual yang tidak perlu di atas fold
Di mobile, pengguna harus melihat:
- judul
- ringkasan
- isi inti

Bukan:
- widget berlapis
- iklan besar
- share bar besar
- featured section yang berat

---

## C. Kurangi thumbnail yang tidak perlu
Thumbnail memang penting untuk homepage, tetapi di halaman post:
- jangan terlalu banyak gambar dekoratif
- satu gambar konteks sudah cukup
- gunakan gambar yang betul-betul membantu isi

---

# 7. Hal-hal yang menurut saya sebaiknya dipertahankan

Walaupun audit ini fokus ke pembersihan, ada fitur yang sebaiknya tetap ada karena manfaatnya besar:

- breadcrumbs
- lazy load
- basic schema
- responsive menu
- focus state untuk aksesibilitas
- TOC jika posting panjang
- related post jika implementasinya ringan
- one canonical URL
- mobile spacing yang sudah cukup baik

Jadi solusi terbaik bukan “hapus semua”, tetapi **pilah mana yang benar-benar menambah nilai**.

---

# 8. Kode yang paling layak dibersihkan dulu

Jika Anda ingin perbaikan cepat, urutan pembersihan paling masuk akal adalah:

## Level 1 — Aman dibuang jika tidak dipakai
- advertorial logic
- sponsor label handling
- fitur yang tidak digunakan di niche blog
- widget / section yang selalu kosong
- script yang hanya dipakai di kasus jarang

## Level 2 — Layak disederhanakan
- related post
- TOC script
- share buttons
- infinite scroll
- sticky behavior
- dark mode logic

## Level 3 — Layak dipangkas tetapi tetap dipertahankan
- font loading
- icon font
- ad slots
- CSS besar
- layout widget berat

---

# 9. Rekomendasi praktis untuk template.xml

## Jika tujuan utama adalah performa loading
Saya sarankan langkah berikut:

1. **hapus advertorial branch jika tidak aktif**
2. **hapus script/markup yang hanya dipakai untuk halaman sponsor**
3. **sederhanakan related post**
4. **kurangi jumlah ad slot aktif**
5. **pangkas font weights**
6. **kurangi inline JS**
7. **hapus fitur mobile/sidebar yang jarang dipakai**
8. **sederhanakan footer dan sidebar**
9. **hapus CSS selector untuk komponen yang tidak dipakai**
10. **uji ulang loading di mobile**

---

# 10. Prioritas terbaik untuk hasil cepat

Kalau Anda ingin efek yang cepat terasa, urutan terbaik adalah:

## Tahap 1
- buang advertorial dan sponsor code yang tidak dipakai
- matikan slot iklan yang redundant

## Tahap 2
- kurangi font loading
- sederhanakan related post
- ringkas share icon

## Tahap 3
- pangkas CSS
- rapikan inline script
- tinjau infinite scroll

## Tahap 4
- cek layout mobile
- cek CLS
- cek first load
- cek apakah halaman tetap nyaman dibaca

---

# 11. Verdict akhir

## Apakah ada kode yang perlu diperbarui?
**Ya.** Ada cukup banyak bagian template yang layak dipangkas, terutama yang:
- khusus advertorial
- khusus sponsor
- menambah JavaScript runtime
- menambah stylesheet tanpa manfaat besar
- memperberat load di mobile

## Apakah template sekarang buruk?
**Tidak.** Template ini justru cukup matang.  
Masalahnya adalah **terlalu banyak fitur untuk kebutuhan blog budaya yang seharusnya bisa lebih ringan**.

## Apa arah terbaik?
Buat template lebih seperti:
- arsip budaya editorial
- bukan template monetisasi yang penuh modul
- bukan blog lirik generik
- bukan situs yang berat oleh fitur turunan

Kalau dibersihkan dengan benar, performa loading bisa naik tanpa harus mengorbankan struktur dasar yang sudah bagus.
