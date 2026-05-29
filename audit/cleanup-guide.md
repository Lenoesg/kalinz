# Panduan Pembersihan Elemen Non-Niche untuk Blog Kalinz

**Tujuan:** membersihkan elemen template dan konten yang tidak relevan dengan niche budaya Nias, bahasa Nias, lirik lagu Nias, terjemahan, dan dokumentasi budaya, supaya blog lebih fokus, lebih ringan, dan lebih dipercaya sebagai arsip budaya.

**Konteks kondisi sekarang:**
- README sudah jelas mengarah ke niche budaya Nias.
- Audit 2026 tetap relevan sebagai landasan, tetapi prioritas pembersihan harus disesuaikan lagi dengan **kondisi live terkini**.
- Hasil cek live `kalinz.blogspot.com` menunjukkan homepage sudah memakai header, logo, dark mode, search, hamburger menu, dan `LATEST POSTS`, jadi fokus panduan harus ke blok yang benar-benar aktif, bukan asumsi dari backup/template lama.
- Jejak `Produk/Jasa` bukan lagi target utama yang paling mendesak pada template aktif yang terlihat sekarang. Kalau masih ada di backup atau branch lama, itu tetap boleh dibersihkan, tetapi prioritas berikutnya adalah blok yang bercabang karena **label / ID / widget khusus** yang masih membuat struktur terasa campuran.

**Prinsip utama:**
- Hapus yang tidak membantu niche utama.
- Pertahankan yang mendukung UX, SEO, dan AdSense secara sehat.
- Jangan ubah banyak hal sekaligus tanpa uji.
- Bersihkan bertahap per part, mulai dari bagian paling aman dan paling mudah diverifikasi.

---

## 1) Status kondisi saat ini

### Yang sudah sejalan dengan niche
Bagian-bagian ini sudah mendukung arah blog:
- halaman statis About / Kontak / Disclaimer / Privacy
- lirik + terjemahan + kosakata + budaya
- breadcrumb
- TOC
- dark mode
- lazyload
- schema markup dasar
- navigasi menu
- footer copyright

### Yang masih terasa “legacy” atau terlalu generik
Ini bukan berarti harus langsung dihapus, tetapi perlu dievaluasi:
- template `linkmagz` yang masih sangat besar
- widget sidebar yang masih memakai label umum
- blok related post yang masih random/label-based
- featured post dan popular post yang bisa terlalu dominan
- area iklan yang banyak
- beberapa script utility yang fungsinya tumpang tindih

### Yang bukan prioritas utama lagi
Kalau di cabang lama masih ada:
- `Produk`
- `Jasa`
- banner jualan
- tombol order WA promosi

itu tetap boleh dibersihkan, tetapi **bukan lagi langkah pertama** kalau di template aktif sekarang sudah tidak dipakai.

---

## 1.5) Bagian yang harus diimprove supaya audit benar-benar tercapai

Ini bagian yang paling penting dan paling jujur:  
**guide ini tidak boleh hanya berisi daftar aman-dihapus.** Kalau tujuan audit adalah menaikkan trust, topical authority, dan kesan arsip budaya serius, maka ada beberapa area yang **harus diimprove**, bukan sekadar “dirapikan”.

### 1. Homepage harus berubah dari feed biasa menjadi hub budaya
**Masalah saat ini:**
- Live site masih terasa seperti homepage blog posting standar.
- `LATEST POSTS` ada, tapi itu belum cukup untuk membangun authority.
- Jika homepage hanya feed, blog tetap terasa seperti blog lirik yang rapi, bukan arsip budaya yang terkurasi.

**Yang perlu diimprove:**
- section hub kategori utama:
  - Lagu Nias
  - Kamus Bahasa Nias
  - Budaya Nias
  - Istilah Adat
  - Penyanyi Nias
- section artikel pilar / unggulan
- section indeks atau daftar referensi
- intro editorial singkat yang menjelaskan misi situs

**Target hasil:**
Homepage harus langsung menjawab:  
“ini situs dokumentasi budaya Nias, bukan blog posting acak.”

---

### 2. Struktur label harus jadi taxonomy, bukan sekadar label tag
**Masalah saat ini:**
- Label ada, tapi belum tentu membentuk klaster authority.
- Kalau label hanya dipakai untuk dekorasi atau filtering biasa, audit topical authority belum tercapai.

**Yang perlu diimprove:**
- tetapkan label inti yang benar-benar dipakai sebagai hub:
  - Lagu Nias
  - Penyanyi Nias
  - Budaya Nias
  - Kamus Bahasa Nias
  - Istilah Adat
  - Terjemahan
- pastikan setiap posting baru masuk ke struktur yang konsisten
- gunakan label untuk internal linking yang jelas, bukan acak

**Target hasil:**
Google dan pembaca bisa melihat hubungan antar konten dengan cepat.

---

### 3. Artikel lagu harus distandardisasi
**Masalah saat ini:**
- Beberapa artikel sudah rapi, tetapi tidak semua punya struktur yang sama.
- Jika format campur, audit “arsip budaya serius” tidak akan terasa konsisten.

**Yang perlu diimprove per artikel:**
1. konteks lagu
2. metadata lagu
3. lirik
4. terjemahan
5. makna
6. kosakata penting
7. catatan budaya / dialek / istilah
8. sumber atau koreksi

**Target hasil:**
Setiap artikel tidak hanya menampilkan lirik, tetapi memberi nilai tambah dokumenter.

---

### 4. Trust pages harus seragam dan terasa editorial
**Masalah saat ini:**
- About, Kontak, Disclaimer, Privacy sudah ada.
- Tapi audit akan tetap terasa lemah kalau halaman trust tidak seragam isi dan tujuannya.

**Yang perlu diimprove:**
- About: misi editorial, siapa yang mengelola, cara verifikasi
- Kontak: satu jalur utama yang jelas
- Disclaimer: ringkas dan formal
- Privacy: tegas soal data, layanan Google, dan penggunaan cookies

**Target hasil:**
Pengunjung dan Google melihat situs ini dikelola serius, bukan sekadar blog personal.

---

### 5. Related post dan “Baca Juga” harus relevan, bukan random
**Masalah saat ini:**
- Related post berbasis label/random bisa membantu, tapi juga bisa merusak konteks.
- Kalau artikel yang ditampilkan tidak relevan, trust turun.

**Yang perlu diimprove:**
- prioritaskan related manual atau semi-manual untuk konten penting
- jika masih pakai otomatis, batasi ke klaster yang benar-benar satu tema
- “Baca Juga” harus mengarah ke:
  - artis yang sama
  - lagu dalam tema yang sama
  - kosakata terkait
  - artikel budaya terkait

**Target hasil:**
Internal link memperkuat authority, bukan mengacaukan fokus baca.

---

### 6. Featured post dan popular post harus jadi pendukung, bukan pusat
**Masalah saat ini:**
- Kalau featured post atau popular post terlalu dominan, homepage tetap terasa seperti blog template lama.

**Yang perlu diimprove:**
- featured post hanya untuk artikel pilar
- popular post hanya jika isinya benar-benar topikal
- jika tidak mendukung tujuan authority, lebih baik diperkecil

**Target hasil:**
Homepage memandu pembaca ke inti topik, bukan ke konten yang cuma populer.

---

### 7. Iklan harus menyesuaikan ritme baca, bukan memaksa slot
**Masalah saat ini:**
- Slot iklan yang terlalu banyak bisa mengganggu flow.
- Untuk artikel pendek, terlalu banyak placement akan terasa agresif.

**Yang perlu diimprove:**
- evaluasi slot satu per satu
- kurangi placement yang tidak punya dampak nyata
- prioritaskan pengalaman baca dulu, monetisasi kemudian

**Target hasil:**
AdSense tetap ada, tetapi tidak merusak pengalaman editorial.

---

### 8. Kesimpulan brutal untuk guide ini
Kalau dokumen ini hanya menyuruh menghapus yang aman, tapi tidak menyuruh memperbaiki yang strategis, maka dokumen ini **belum cukup untuk mengeksekusi hasil audit**.

**Jadi fokusnya harus dua arah:**
- hapus / kurangi yang tidak relevan
- tingkatkan / bangun ulang yang menentukan authority

---

## 2) Urutan pembersihan yang paling aman sekarang

Urutan di bawah ini dibuat dari yang paling aman, paling lokal, dan paling mudah diuji, ke yang lebih menyentuh alur konten.

### Tahap 1 — Blok berbasis ID yang paling mudah dipetakan
Blok ini aman karena efeknya jelas dan ruang lingkupnya sempit.

#### A. `HTML72` — menu navigasi utama
**Yang dicek:**
- apakah menu sudah benar-benar mengarah ke hub niche
- apakah masih ada link yang terlalu umum atau tidak relevan
- apakah label/menu cukup mewakili:
  - Lagu Nias
  - Budaya Nias
  - Kamus Bahasa Nias
  - Penyanyi Nias
  - Istilah Adat

**Yang disarankan:**
- ubah menu menjadi struktur hub budaya
- hindari menu yang terlalu generik atau terlalu promosi

**Kenapa aman dikerjakan dulu:**
- tidak mengubah struktur post
- mudah diuji di desktop dan mobile
- langsung berdampak ke navigasi

---

#### B. `HTML831` — ikon sosial footer
**Yang dicek:**
- apakah semua sosial media masih relevan
- apakah jumlahnya terlalu banyak
- apakah link sosial sudah seragam dengan identitas blog

**Yang disarankan:**
- pertahankan hanya kanal yang benar-benar aktif
- sisakan 1–3 kanal utama jika perlu
- kalau tidak konsisten, lebih baik dipangkas daripada menambah noise

**Kenapa aman:**
- hanya memengaruhi footer
- tidak menyentuh alur artikel

---

#### C. `PageList1` — menu halaman statis di footer
**Yang dicek:**
- urutan halaman sudah logis atau belum
- apakah slug dan judul konsisten
- apakah `Kontak` / `Hubungi Kami` / `Hubungi Kam` sudah diseragamkan

**Yang disarankan:**
- urutkan halaman trust:
  - Tentang
  - Kontak
  - Disclaimer
  - Kebijakan Privasi
- gunakan satu nama brand dan satu format link yang konsisten

**Kenapa aman:**
- penting untuk trust
- tidak memengaruhi template inti

---

### Tahap 2 — Widget label dan blok sidebar
Ini adalah bagian paling penting setelah navigasi, karena berhubungan langsung dengan topical authority.

#### D. `Label1` dan `Label2`
Di template aktif sekarang, sidebar masih memakai widget label yang bisa terasa generik kalau tidak disusun sebagai hub.

**Yang perlu dicek:**
- apakah `Label1` benar-benar dibutuhkan
- apakah `Label2` mendukung klasifikasi niche
- apakah daftar label sudah bersih dan konsisten

**Yang disarankan:**
- jadikan label sebagai indeks niche, bukan daftar acak
- kalau ada dua widget label yang fungsinya mirip, pertimbangkan digabung atau salah satunya dihapus
- label yang paling berguna:
  - Lagu Nias
  - Penyanyi Nias
  - Budaya Nias
  - Kamus Bahasa Nias
  - Istilah Adat
  - Terjemahan
  - Maena Nias

**Kenapa aman:**
- sidebar mudah diuji
- perubahan tidak merusak isi artikel

---

#### E. `PopularPosts1`
**Yang dicek:**
- apakah popular post benar-benar membantu navigasi
- apakah daftar top post masih relevan dengan niche
- apakah tampilannya terlalu dominan

**Yang disarankan:**
- pertahankan hanya jika isinya benar-benar mewakili konten unggulan niche
- kalau isinya terlalu campur atau terlalu generik, ringkas atau pindahkan
- jangan biarkan popular post mengalahkan hub kategori

**Kenapa aman:**
- widget ini mudah diukur efeknya
- kalau menurunkan kualitas sidebar, bisa dipangkas

---

#### F. `FeaturedPost1`
**Yang dicek:**
- apakah featured post dipakai sebagai highlight editorial yang serius
- apakah kontennya benar-benar mewakili arah budaya
- apakah homepage menjadi terlalu “blog lirik template lama”

**Yang disarankan:**
- jika dipertahankan, isi hanya dengan artikel pilar
- kalau homepage sudah mau dijadikan dashboard budaya, featured post bisa diganti menjadi section hub
- hindari featured post yang hanya berfungsi sebagai dekorasi

**Kenapa aman:**
- efeknya besar di homepage
- masih bisa diuji tanpa menyentuh isi artikel

---

### Tahap 3 — Blok alur posting yang bercabang karena label
Ini lebih penting karena menyentuh cara template memutuskan tampilan post.

#### G. `Blog1` — includable `post`
Blok ini adalah pusat routing tampilan artikel.

**Perhatikan cabang berikut:**
- `defaultHomepage`
- `defaultStaticPage`
- `defaultPostPage`
- `defaultPostAdPage`
- `postAndComments`
- `commentPicker`

**Yang perlu dicek:**
- apakah logika advertorial masih dibutuhkan
- apakah pemisahan post biasa vs advertorial masih benar-benar dipakai
- apakah kondisi label masih terlalu banyak cabang

**Yang disarankan:**
- pertahankan pemisahan hanya kalau memang ada konten sponsored / advertorial aktif
- kalau tidak ada, sederhanakan supaya jalur render lebih konsisten
- pastikan halaman statis, halaman post, dan homepage punya struktur yang stabil

**Kenapa aman untuk tahap ketiga:**
- masih satu blok besar, tapi efeknya terukur
- paling baik dikerjakan setelah navigasi dan sidebar sudah rapi

---

#### H. `postInfoAdvertorial`
**Yang dicek:**
- apakah label “Sponsored Post” masih benar-benar dipakai
- apakah format advertorial konsisten

**Yang disarankan:**
- kalau tidak ada konten sponsor aktif, blok ini bisa dikurangi prioritasnya atau disiapkan sebagai fallback saja
- jangan biarkan advertorial terasa seperti format default semua artikel

---

#### I. Cabang label di `postAndComments`
Di sini ada pengecekan label seperti:
- `Advertorial`
- `Iklan`
- `Sponsor`

**Yang perlu dicek:**
- apakah label ini memang digunakan aktif
- apakah semua cabang masih relevan

**Yang disarankan:**
- kalau label sponsor tidak dipakai lagi, sederhanakan cabangnya
- kalau masih dipakai, pastikan hanya artikel tertentu yang melewati jalur ini

---

### Tahap 4 — Blok isi artikel yang memakai label untuk “related” atau “baca juga”
Ini sangat relevan dengan audit karena authority blog masih perlu diperkuat.

#### J. `blogPostBody`
**Yang dicek:**
- script `bacaJuga`
- script `showBacaJuga`
- loop yang mengambil data dari label posting

**Yang disarankan:**
- ubah “Baca Juga” menjadi lebih editorial dan relevan
- jangan biarkan saran artikel terasa acak
- kalau bisa, arahkan ke:
  - artikelnya satu tema
  - artis yang sama
  - kamus kata yang relevan
  - artikel budaya yang terkait

**Kenapa aman:**
- efeknya langsung terasa di artikel
- bisa diuji per posting

---

#### K. `relatedPost` dan `relatedPostScript`
**Yang dicek:**
- pemilihan related post berbasis label
- penggunaan random post dari feed
- apakah hasilnya benar-benar relevan

**Yang disarankan:**
- kalau tetap memakai label, batasi ke label niche yang ketat
- hindari random yang terlalu liar
- lebih baik 3 artikel relevan daripada 8 artikel yang longgar

**Kenapa penting:**
- ini salah satu sumber besar untuk topical authority
- related content yang salah akan merusak trust

---

#### L. `breadcrumb`
Breadcrumb di template ini masih baik, tetapi perlu dipastikan:
- label yang ditampilkan memang sesuai struktur kategori
- tidak terlalu banyak label sampingan
- link label mengarah ke hub yang benar

**Saran:**
- pertahankan breadcrumb
- pastikan label utama yang muncul memang label niche
- jangan ubah breadcrumb jadi terlalu ramai

---

### Tahap 5 — Area iklan dan layout yang paling mudah menimbulkan noise
Iklan boleh dipertahankan, tapi harus lebih terukur.

#### M. `HTML76`, `HTML77`, `HTML78`, `HTML79`
Ini adalah slot iklan artikel.

**Yang dicek:**
- apakah semua slot masih dibutuhkan
- apakah artikel pendek dipaksa terlalu banyak slot
- apakah ritme baca terganggu

**Yang disarankan:**
- prioritaskan hanya slot yang benar-benar efektif
- jangan aktifkan semua slot secara otomatis bila konten pendek
- jaga jarak baca supaya artikel tetap nyaman

---

#### N. `HTML939` — matched content
**Yang dicek:**
- apakah matched content benar-benar membantu
- apakah tampilannya terlalu mendominasi
- apakah isinya relevan untuk niche budaya

**Yang disarankan:**
- pertahankan hanya jika viewability dan relevansinya bagus
- kalau tidak efektif, lebih baik dikurangi daripada memaksa

---

#### O. `HTML83` — in-feed ad homepage
**Yang dicek:**
- posisi iklan di feed homepage
- apakah memecah flow homepage
- apakah masih cocok jika homepage diubah menjadi dashboard budaya

**Yang disarankan:**
- evaluasi ulang setelah homepage diubah
- kalau homepage nanti lebih kuratorial, placement iklan juga harus disesuaikan

---

### Tahap 6 — Widget utility yang boleh dipertahankan tapi harus dievaluasi
Bagian ini tidak wajib dihapus, tetapi harus dirapikan kalau terasa terlalu ramai.

#### P. `HTML82` — custom CSS footer
**Yang dicek:**
- apakah CSS custom masih relevan
- apakah hanya dipakai untuk ikon sosial footer
- apakah ada style lama yang tidak dipakai

**Yang disarankan:**
- pertahankan hanya style yang benar-benar aktif
- hapus aturan yang sudah tidak dipakai

---

#### Q. `HTML85` — custom JavaScript footer
**Yang dicek:**
- apakah masih ada script tambahan di footer
- apakah script ini benar-benar dipakai
- apakah ada duplikasi dengan script utama

**Yang disarankan:**
- kosongkan kalau tidak ada kebutuhan khusus
- jangan biarkan custom JS jadi tempat numpuk eksperimen lama

---

## 3) Kalau ingin dibersihkan per label / ID, ini urutan paling aman

### Urutan paling aman
1. `HTML72` — menu utama
2. `PageList1` — halaman trust
3. `HTML831` — social footer
4. `Label1` / `Label2` — sidebar label
5. `PopularPosts1` — popular post sidebar
6. `FeaturedPost1` — homepage highlight
7. `blogPostBody` — baca juga / related inside post
8. `relatedPost` / `relatedPostScript` — related post label-based
9. `Blog1` routing: `defaultHomepage`, `defaultPostPage`, `defaultPostAdPage`, `postAndComments`
10. `HTML76`–`HTML79`, `HTML939`, `HTML83` — iklan dan placement
11. `HTML82` / `HTML85` — custom style/script terakhir

### Kenapa urutan ini aman
- dimulai dari blok yang paling mudah dilihat hasilnya
- baru masuk ke routing artikel
- iklan dan utility terakhir karena paling mudah menimbulkan efek samping kalau diubah duluan

---

## 4) Apa yang tetap perlu dipertahankan

Jangan hapus semua sekaligus. Bagian ini masih penting:

- header blog
- navigasi utama
- mobile menu
- TOC
- breadcrumb
- schema markup
- lazyload image
- halaman About / Kontak / Disclaimer / Privacy
- struktur artikel lirik + terjemahan + kosakata
- iklan yang terukur, bukan agresif

---

## 5) Yang paling mungkin perlu modifikasi berikutnya di template

Ini daftar singkat blok kode berikutnya yang paling layak disentuh:

- `HTML72`
- `Label1`
- `Label2`
- `FeaturedPost1`
- `PopularPosts1`
- `Blog1`:
  - `defaultHomepage`
  - `defaultPostPage`
  - `defaultPostAdPage`
  - `postAndComments`
  - `commentPicker`
- `blogPostBody`
- `relatedPost`
- `relatedPostScript`
- `HTML76`
- `HTML77`
- `HTML78`
- `HTML79`
- `HTML939`
- `HTML83`

Kalau kamu ingin membersihkan secara paling aman, **mulai dari `HTML72` → `Label1/Label2` → `FeaturedPost1` → `PopularPosts1`**.

Kalau kamu ingin membersihkan berdasarkan alur artikel dan label, **mulai dari `Blog1` → `blogPostBody` → `relatedPostScript`**.

---

## 6) Checklist pembersihan per area

### Header
- [ ] hapus elemen yang tidak mendukung niche
- [ ] pertahankan logo dan judul
- [ ] kurangi sosial yang tidak konsisten
- [ ] pastikan menu utama jadi hub budaya

### Menu
- [ ] ubah menu menjadi kategori niche
- [ ] hindari link generik
- [ ] pastikan mobile menu tetap sederhana

### Homepage
- [ ] kurangi blok yang terlalu ramai
- [ ] pertahankan section editorial
- [ ] ubah homepage menjadi dashboard budaya

### Sidebar
- [ ] rapikan label agar jadi hub niche
- [ ] evaluasi popular post
- [ ] evaluasi featured post

### Post template
- [ ] sederhanakan routing advertorial bila tidak dipakai
- [ ] pertahankan TOC dan breadcrumb
- [ ] ubah related content agar lebih relevan

### Iklan
- [ ] evaluasi jumlah slot
- [ ] hapus slot yang tidak efektif
- [ ] hindari iklan yang memecah ritme baca

### CSS/JS
- [ ] hapus CSS lama yang tidak dipakai
- [ ] hapus script utility yang duplikatif
- [ ] tes ulang setelah setiap perubahan besar

---

## 7) Bagian yang berisiko kalau dihapus sembarangan

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
- routing utama di `Blog1`

Kalau bagian ini dihapus sembarangan, tampilan bisa rusak atau fitur inti hilang.

---

## 8) Target hasil akhir setelah pembersihan

Blog seharusnya terasa seperti:

- arsip budaya yang serius
- fokus pada lagu, bahasa, dan budaya Nias
- tidak bercampur dengan layout umum yang tidak relevan
- lebih ringan di mobile
- lebih cepat dibuka
- lebih rapi untuk pembaca dan Google
- lebih siap untuk AI Overview dan authority jangka panjang

---

## 9) Keputusan cepat yang disarankan sekarang

Kalau harus mulai dari satu langkah paling aman dan paling berdampak berdasarkan kondisi live yang sudah dicek, lakukan ini dulu:

**Rapikan `HTML72`, lalu seragamkan `Label1` / `Label2`, kemudian evaluasi `FeaturedPost1` dan `PopularPosts1`.**

Setelah itu baru masuk ke:
- `Blog1`
- `blogPostBody`
- `relatedPostScript`
- area iklan

**Catatan penting:** sebelum menghapus blok apa pun, pastikan blok itu memang ada dan aktif di `template.xml` atau tampilan live; jangan lagi mengandalkan sisa audit lama sebagai prioritas utama.

---

## 10) Ringkasan singkat

### Hapus / kurangi
- blok yang terlalu generik
- widget sidebar yang tidak membantu niche
- related post yang terlalu random
- iklan yang terlalu rapat
- custom JS/CSS yang tidak dipakai

### Pertahankan
- header
- navigasi inti
- TOC
- breadcrumb
- schema
- halaman trust
- artikel budaya dan lirik
- iklan yang terukur

### Tujuan akhir
Blog terlihat seperti **platform dokumentasi budaya Nias yang serius**, bukan blog lirik lama yang masih membawa terlalu banyak jejak template generik.
