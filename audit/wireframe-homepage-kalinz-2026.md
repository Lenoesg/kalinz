# Wireframe Homepage Modern Kalinz 2026

**Tujuan:** merancang struktur visual homepage modern untuk blog niche budaya dan dokumentasi bahasa daerah.  
**Fokus:** mobile-first, clean layout, readability, topical authority, trust modern 2026, dan realistis untuk Blogger.

---

## Prinsip wireframe

Homepage Kalinz sebaiknya tidak terasa seperti blog feed biasa.  
Strukturnya harus terasa seperti **beranda arsip budaya** dengan urutan yang jelas:

1. identitas situs,
2. navigasi cepat,
3. pengantar misi,
4. hub kategori,
5. artikel terbaru,
6. internal linking blocks,
7. sidebar kuratorial,
8. trust footer,
9. AdSense yang tidak mengganggu ritme baca.

---

# 1) Struktur utama homepage

## Urutan section yang disarankan

```text
[HEADER]
[NAVBAR]
[HERO / MISSION BLOCK]
[HUB KATEGORI]
[INTERNAL LINKING BLOCKS]
[RECENT POSTS]
[SIDEBAR]
[FOOTER]
```

Untuk mobile, susunannya harus linear dan pendek:

```text
[HEADER]
[NAVBAR]
[HERO]
[KATEGORI]
[INTERNAL LINKING]
[RECENT POSTS]
[AD]
[TRUST BLOCK]
[FOOTER]
```

---

# 2) Wireframe desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ HEADER                                                       │
│ Logo / Nama blog                         Search  Dark Mode   │
├──────────────────────────────────────────────────────────────┤
│ NAVBAR                                                       │
│ Beranda | Lagu Nias | Budaya Nias | Bahasa | Arti Kata | ... │
├──────────────────────────────────────────────────────────────┤
│ HERO SECTION                                                 │
│ [Headline misi]                                              │
│ [1 paragraf penjelasan singkat]                              │
│ [CTA 1] [CTA 2] [CTA 3] [CTA 4]                              │
├──────────────────────────────────────────────────────────────┤
│ HUB KATEGORI                                                 │
│ [Lagu Nias] [Budaya Nias] [Bahasa Nias]                      │
│ [Arti Kata] [Penyanyi] [Istilah Adat]                        │
├──────────────────────────────────────────────────────────────┤
│ INTERNAL LINKING BLOCKS                                      │
│ [Mulai dari sini]   [Artikel pilar]   [Koleksi pilihan]      │
├──────────────────────────────────────────────────────────────┤
│ RECENT POSTS                      │ SIDEBAR                  │
│ [Post card] [Post card]           │ Popular Posts            │
│ [Post card] [Post card]           │ Label / Hub singkat      │
│ [Post card] [Post card]           │ About singkat            │
│ [AdSense slot]                    │ Trust links              │
├──────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │
│ Page list | Copyright | Social secukupnya | Disclaimer       │
└──────────────────────────────────────────────────────────────┘
```

---

# 3) Wireframe mobile-first

Pada mobile, sidebar jangan tampil sebagai kolom kanan.  
Sidebar harus turun ke bawah feed dan isinya dipangkas.

```text
┌──────────────────────────────┐
│ HEADER                       │
│ Logo / Nama blog             │
│ Search  Dark Mode            │
├──────────────────────────────┤
│ NAVBAR                       │
│ Menu hamburger / drawer      │
├──────────────────────────────┤
│ HERO SECTION                 │
│ Headline misi                │
│ 2-3 baris penjelasan         │
│ [CTA hub] [CTA about]        │
├──────────────────────────────┤
│ KATEGORI UTAMA               │
│ [Lagu Nias]                  │
│ [Budaya Nias]                │
│ [Bahasa Nias]                │
│ [Arti Kata]                  │
│ [Penyanyi]                   │
│ [Istilah Adat]               │
├──────────────────────────────┤
│ INTERNAL LINKING BLOCKS      │
│ [Mulai dari sini]            │
│ [Artikel pilar]              │
│ [Koleksi pilihan]            │
├──────────────────────────────┤
│ RECENT POSTS                 │
│ [Post card besar]            │
│ [Post card besar]            │
│ [Post card besar]            │
├──────────────────────────────┤
│ ADSENSE                      │
│ 1 slot kecil setelah 3 post   │
├──────────────────────────────┤
│ SIDEBAR RINGKAS              │
│ Popular Posts                │
│ Label inti                   │
│ About singkat                │
├──────────────────────────────┤
│ FOOTER                       │
│ Page list / trust links      │
└──────────────────────────────┘
```

---

# 4) Komponen per section

## A. Header

### Fungsi
Menampilkan identitas blog dan memberi sinyal trust awal.

### Isi
- logo atau nama blog
- tagline singkat
- search icon
- dark mode toggle

### Aturan desain
- tinggi header harus pendek
- logo tidak boleh memakan ruang terlalu besar
- tagline maksimal 1 baris
- di mobile, header harus tetap ringan

### Rekomendasi Blogger
Gunakan widget `Header` dengan tagline pendek di bawah nama blog.  
Jangan tambahkan elemen dekoratif lain di header.

---

## B. Navbar

### Fungsi
Memberi jalur cepat ke pilar konten.

### Isi minimal
- Beranda
- Lagu Nias
- Budaya Nias
- Bahasa Nias
- Arti Kata
- Penyanyi
- Tentang

### Aturan desain
- desktop boleh horizontal
- mobile harus jadi drawer / hamburger menu
- jangan terlalu banyak item
- label harus singkat dan jelas

### Rekomendasi Blogger
Simpan menu inti di `HTML72` atau widget navigasi utama.  
Pastikan mobile menu meng-copy menu desktop.

---

## C. Hero section

### Fungsi
Menjelaskan misi situs dalam 3–5 detik pertama.

### Struktur isi
- judul utama
- 1 paragraf misi
- 3–5 tombol atau chip ke hub utama

### Contoh isi
**Judul:**  
`Kalinz: arsip lagu, bahasa, dan budaya Nias`

**Deskripsi:**  
`Dokumentasi lirik, terjemahan, arti kata, istilah adat, dan topik budaya Nias dalam format yang mudah dijelajahi.`

**CTA chips:**
- Lagu Nias
- Budaya Nias
- Bahasa Nias
- Kamus Istilah
- Tentang

### Aturan desain
- clean, tidak ramai
- teks harus pendek dan otoritatif
- CTA harus mudah dipencet di mobile
- jangan pakai banner besar yang memakan banyak layar

### Rekomendasi Blogger
Hero paling cocok dibuat dari `top-widget2` atau HTML widget di atas feed utama.  
Ini area terbaik untuk mission block.

---

## D. Hub kategori

### Fungsi
Membangun topical authority dan memudahkan eksplorasi.

### Struktur
6 kartu kategori utama:

1. Lagu Nias  
2. Budaya Nias  
3. Bahasa Nias  
4. Arti Kata  
5. Penyanyi  
6. Istilah Adat

### Isi kartu
- judul
- 1 kalimat deskripsi
- jumlah artikel atau contoh konten
- link ke halaman pilar

### Aturan desain
- kartu harus seragam
- lebih besar dari kartu post biasa
- hindari badge kecil yang terlalu banyak
- di mobile tampil 1 kolom atau 2 kolom maksimal

### Contoh microcopy
- **Lagu Nias** — koleksi lirik dan terjemahan
- **Budaya Nias** — tradisi, adat, dan konteks sosial
- **Bahasa Nias** — kosakata, frasa, dan arti kata
- **Arti Kata** — makna istilah dan frasa lokal
- **Penyanyi** — profil dan katalog lagu
- **Istilah Adat** — istilah ritual dan sosial

---

## E. Internal linking blocks

### Fungsi
Mengarahkan pembaca ke jalur baca yang strategis, bukan hanya post terbaru.

### Format blok
Gunakan 2–3 blok ringkas:

#### Blok 1 — Mulai dari sini
Untuk pembaca baru.

Isi:
- Tentang Kalinz
- Cara membaca arsip
- Hub utama

#### Blok 2 — Artikel pilar
Untuk konten yang paling penting.

Isi:
- 4–6 link ke artikel pilar
- prioritas pada topik inti

#### Blok 3 — Koleksi pilihan
Untuk orientasi cepat.

Isi:
- 5 lagu Nias terbaik
- 10 arti kata penting
- artikel budaya dasar
- artikel maena / adat
- profil penyanyi penting

### Aturan desain
- tampil seperti daftar kurasi, bukan daftar acak
- gunakan label kecil dan ringkas
- jangan terlalu banyak link dalam satu blok
- ideal 3–5 link per blok

### Rekomendasi Blogger
Letakkan internal linking blocks:
- di bawah hero
- sebelum feed terbaru
- atau di sidebar jika desktop

---

## F. Recent posts

### Fungsi
Menampilkan konten terbaru secara rapi.

### Aturan visual
- kartu post harus sederhana
- judul jelas
- snippet singkat
- metadata ringkas
- label utama lebih penting daripada banyak badge

### Layout
#### Desktop
- 2 kolom kartu
- feed utama di kiri
- sidebar di kanan

#### Mobile
- 1 kolom
- kartu penuh lebar
- urutan linear
- jarak antar card jelas

### Aturan konten
Setiap card idealnya berisi:
- thumbnail
- label utama
- judul
- tanggal
- snippet singkat
- read more minimal

### Rekomendasi Blogger
Feed `Blog1` tetap dipakai, tetapi perlu diberi section title yang jelas seperti:
- `Artikel Terbaru`
- `Terbaru di Lagu Nias`
- `Terbaru di Budaya Nias`

---

## G. Sidebar

### Fungsi
Mendukung discovery, trust, dan navigasi sekunder.

### Isi yang disarankan
1. Popular Posts
2. Label inti / kategori
3. About singkat
4. Trust links
5. Optional: Follow / Subscribe kecil

### Yang harus dihindari
- archive panjang
- stats widget
- profil generik yang tidak berguna
- terlalu banyak widget sosial
- blok panjang yang tidak relevan

### Layout desktop
Sidebar boleh sticky, tetapi isinya harus pendek dan jelas.

### Layout mobile
Sidebar turun ke bawah feed dan hanya tampil sebagai:
- Popular Posts
- About singkat
- Label inti

### Rekomendasi Blogger
Gunakan sidebar sebagai kurasi, bukan dekorasi.  
Isi sidebar harus membantu pembaca menemukan topik utama dengan cepat.

---

## H. Footer

### Fungsi
Menutup halaman dengan trust dan akses legal.

### Isi footer
- page list
- About
- Kontak
- Disclaimer
- Kebijakan Privasi
- Copyright
- social links secukupnya

### Aturan desain
- ringan
- tidak terlalu tinggi
- teks mudah dibaca
- link tidak terlalu rapat

### Rekomendasi Blogger
Footer harus menjadi tempat trust block terakhir.  
Jangan jadikan footer hanya tempat copyright.

---

## I. Placement AdSense

### Prinsip umum
AdSense harus mengikuti flow baca, bukan memotong identitas homepage.

### Posisi yang disarankan

#### 1. Setelah hero / hub kategori
- opsional
- jika ingin monetisasi ringan
- jangan terlalu besar

#### 2. Setelah 3–4 post terbaru
- posisi terbaik untuk in-feed ad
- tidak merusak impresi pertama
- cukup aman untuk UX

#### 3. Di bawah sidebar atau di footer area
- untuk slot tambahan
- jangan dominan

### Posisi yang harus dihindari
- sebelum hero
- sebelum identitas situs terbentuk
- di antara setiap kartu
- terlalu dekat dengan blok trust

### Aturan desain AdSense
- satu slot cukup untuk homepage awal
- jangan membuat banyak titik iklan rapat
- beri whitespace yang jelas
- jangan mengubah homepage menjadi halaman penuh iklan

### Rekomendasi Blogger
Gunakan:
- `iklan-infeed` setelah beberapa post
- `matched-content` hanya jika benar-benar relevan
- slot di artikel detail, bukan terlalu agresif di homepage

---

# 5) Prioritas desain mobile-first

## Prioritas utama
1. cepat dipahami
2. cepat discan
3. tidak penuh clutter
4. CTA jelas
5. tidak perlu zoom
6. mudah disentuh jari

## Aturan mobile
- satu kolom untuk hero dan card penting
- hierarchy jelas
- font cukup besar
- jarak antar item cukup
- sidebar turun ke bawah
- menu harus mudah dibuka
- iklan tidak boleh memotong flow utama

---

# 6) Layout modern 2026 untuk niche budaya

Homepage modern 2026 untuk niche ini harus terasa seperti:

- editorial
- rapi
- kuratorial
- berbasis topik
- tidak terlalu ramai
- trust-aware
- mobile-first

### Ciri visual yang disarankan
- whitespace cukup
- border sederhana
- badge minimal
- heading tegas
- kartu seragam
- CTA pendek
- tidak terlalu banyak ornamen

### Yang harus dihindari
- layout magazine lama yang terlalu padat
- sidebar penuh widget random
- banner besar tanpa konteks
- warna dan elemen yang membuat halaman terasa spammy
- iklan terlalu banyak di atas fold

---

# 7) Wireframe final yang direkomendasikan

## Desktop final

```text
[HEADER]
[Navbar horizontal]
[Hero mission block]
[Hub kategori 6 kartu]
[Internal linking blocks]
[Recent posts grid]
[Sidebar kuratorial]
[AdSense ringan]
[Footer trust block]
```

## Mobile final

```text
[HEADER]
[Navbar drawer]
[Hero mission block]
[Hub kategori]
[Internal linking blocks]
[Recent posts 1 kolom]
[AdSense ringan]
[Sidebar ringkas]
[Footer trust block]
```

---

# 8) Template susunan konten yang cocok untuk Blogger

## Opsi struktur section Blogger

### Opsi A — paling aman
- `top-widget2` → hero / mission block
- `main-content` → hub kategori + recent posts
- `sidebar` → popular posts + about
- `footer-widget-html` → social links
- `page-navmenu` → trust pages
- `iklan-infeed` → di tengah feed

### Opsi B — lebih editorial
- `top-widget2` → mission block + hub cards
- `FeaturedPost1` → editorial lead
- `Blog1` → recent posts
- `sidebar` → internal linking blocks + popular posts
- `footer` → trust and legal

---

# 9) Kesimpulan wireframe

Homepage Kalinz sebaiknya tidak dipikirkan sebagai daftar artikel.  
Ia harus diposisikan sebagai:

- **pintu masuk misi**
- **peta kategori**
- **jalur baca utama**
- **sumber trust**
- **wadah monetisasi yang tidak agresif**

Jika susunan ini dipakai, homepage akan terasa lebih:
- modern,
- bersih,
- cepat dipahami di mobile,
- dan lebih kuat untuk topical authority tahun 2026.
