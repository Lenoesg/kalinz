# Hasil Audit Pembersihan `template.xml`

Berdasarkan pembacaan `audit-kalinz-2026.md`, `cleanup-non-niche-guide.md`, dan pemeriksaan isi `template.xml`, berikut rangkuman **apa saja yang sudah tercapai dibersihkan** serta **tahap aman berikutnya**.

---

## 1) Yang sudah tercapai dibersihkan

### A. Jejak `Produk` dan `Jasa` sudah tidak tampak lagi sebagai fitur aktif
Dari isi `template.xml` yang ada saat ini, saya **tidak menemukan** lagi blok utama yang biasanya menjadi sisa template lama untuk niche jualan, seperti:

- label/menu `Produk`
- label/menu `Jasa`
- banner produk
- banner jasa
- halaman/index khusus produk-jasa
- style khusus produk-jasa
- logic routing khusus produk-jasa
- slider produk
- tombol order / WA penjualan
- conditional block untuk `Products`, `Services`, `Produk`, `Jasa`

**Makna praktisnya:**  
pembersihan paling besar dan paling aman dari panduan `cleanup-non-niche-guide.md` tampaknya **sudah tercapai** di level template utama.

---

### B. Tidak terlihat lagi pemisahan layout khusus produk/jasa
Di `template.xml` saat ini, struktur layout yang aktif sudah berfokus ke:

- header
- navigasi
- homepage feed
- post/article layout
- page statis
- sidebar
- footer
- iklan
- TOC
- related post
- baca juga

Itu berarti template sudah bergeser dari “template campuran jualan + blog” menjadi **template blog konten** yang lebih relevan untuk niche budaya.

---

### C. Fokus konten utama sudah lebih selaras dengan niche
Masih ada:
- `Lagu Nias`
- `Lagu Rohani`
- `Maena Nias`
- daftar penyanyi
- label lirik

Ini menunjukkan arah template sudah lebih dekat ke niche budaya/lirik Nias, bukan niche produk/jasa.

---

## 2) Yang masih tersisa sebagai jejak legacy, tapi bukan non-niche utama

Bagian ini **belum tentu salah**, tapi masih terasa sebagai sisa template lama yang bisa dirapikan bertahap:

- `relatedPosts`
- `bacaJuga`
- `fullwidthImage`
- `menuSticky`
- `infiniteScrollNav`
- `scrollToTop`
- `showHideTOC`
- `judulTOC`
- `tombolDarkmode`
- `tombolPesanWA` di konfigurasi `linkMagzSetting`

### Catatan penting
Yang paling menonjol adalah:

- **`tombolPesanWA` masih ada di konfigurasi**, tetapi dari pemeriksaan cepat, ini tampak sudah lebih seperti **dead config** daripada fitur aktif utama.
- **Related post** dan **Baca Juga** masih aktif, tapi keduanya masih bisa dipertahankan dulu karena masih mendukung engagement dan internal linking.
- **Infinite scroll** dan **menu sticky** masih menjadi fitur legacy yang lebih cocok dievaluasi pada tahap berikutnya, bukan langsung dihapus bersamaan.

---

## 3) Kesimpulan: apa yang sudah “beres” menurut panduan pembersihan

Kalau dibandingkan dengan `cleanup-non-niche-guide.md`, maka yang paling jelas sudah beres adalah:

1. **Komponen Produk/Jasa** sudah tidak terlihat lagi sebagai modul aktif.
2. **Routing khusus produk/jasa** sudah tidak tampak.
3. **Banner / slider / CTA jualan** yang tidak relevan sudah tidak muncul.
4. **Template sudah tinggal di jalur blog konten**, bukan blog campuran jualan.

Jadi, pembersihan yang paling penting dan paling aman untuk niche budaya Nias **sudah tercapai di level struktur besar**.

---

## 4) Tahap selanjutnya yang aman dilakukan

### Tahap aman berikutnya: rapikan legacy yang tidak esensial
Urutan paling aman setelah ini:

#### Tahap 1 — Kurangi fitur legacy yang paling berisiko mengganggu UX
Prioritas:
- `infiniteScrollNav`
- `menuSticky`
- `scrollToTop`
- `fullwidthImage` jika ternyata mengganggu tampilan mobile
- `relatedPosts` jika hasilnya terlalu acak

**Alasan aman:**  
Fitur-fitur ini bukan inti konten. Kalau dihapus satu per satu, risiko merusak struktur utama lebih kecil.

---

#### Tahap 2 — Seragamkan identitas dan trust signal
Prioritas:
- samakan nama brand
- samakan email kontak
- rapikan About / Kontak / Disclaimer / Privacy
- pastikan footer dan header tidak saling bertabrakan

**Alasan aman:**  
Ini meningkatkan trust tanpa mengubah core layout.

---

#### Tahap 3 — Rapikan homepage menjadi hub budaya
Prioritas:
- halaman depan jangan cuma feed posting
- buat section kategori inti
- arahkan ke indeks lagu, kamus, istilah adat, penyanyi, dan budaya

**Alasan aman:**  
Ini memperkuat niche tanpa mengutak-atik komponen teknis inti.

---

#### Tahap 4 — Standarkan template posting
Prioritas:
- format artikel lagu
- struktur heading
- lirik, terjemahan, makna, kosakata, referensi
- internal linking yang konsisten

**Alasan aman:**  
Ini meningkatkan kualitas konten dan SEO tanpa perlu redesign besar.

---

#### Tahap 5 — Evaluasi script dan iklan
Prioritas:
- cek script yang benar-benar dipakai
- buang JS yang tidak aktif
- sesuaikan slot iklan dengan panjang artikel

**Alasan aman:**  
Setelah struktur konten stabil, optimasi performa dan iklan jadi lebih terukur.

---

## 5) Rekomendasi keputusan cepat

Kalau mau lanjut dengan langkah yang paling aman, lakukan ini dulu:

> **Biarkan fitur inti tetap hidup, lalu bersihkan satu per satu fitur legacy yang tidak mempengaruhi isi utama.**

Urutan paling aman:
1. `tombolPesanWA` config
2. `infiniteScrollNav`
3. `menuSticky`
4. `fullwidthImage`
5. `scrollToTop`
6. evaluasi `relatedPosts` dan `bacaJuga`

---

## 6) Ringkasan singkat

### Sudah dibersihkan
- Produk
- Jasa
- banner jualan
- slider jualan
- order WA penjualan
- routing produk/jasa
- logic niche lama yang tidak relevan

### Masih tersisa
- related post
- baca juga
- infinite scroll
- sticky menu
- scroll to top
- fullwidth image helper
- TOC
- dark mode
- tombolPesanWA di konfigurasi

### Tahap aman berikutnya
- rapikan legacy satu per satu
- jangan sentuh inti layout sekaligus
- fokus ke trust, homepage, dan standar artikel

---

## 7) Screening duplikasi dan dead code

### Yang terlihat benar-benar tidak berguna lagi
Bagian yang paling jelas sudah menjadi dead code atau stub lama:

- `googlePlusShare`  
  Isinya kosong. Fitur Google+ sudah lama mati, jadi ini tidak memberi nilai apa pun.

- `commentsLinkIframe`  
  Hanya komentar kompatibilitas untuk sistem komentar lama.

- `iframeComments`  
  Juga komentar kompatibilitas lama, tidak punya fungsi nyata.

- `postReactions`  
  Hanya stub kompatibilitas untuk fitur reaksi lama yang sudah tidak dipakai.

### Yang terlihat duplikat, tapi belum tentu aman dihapus
Ada beberapa blok yang muncul lebih dari sekali atau terasa berulang, namun itu belum otomatis dead code:

- `blogThisShare`
- `postShareButtons`
- `commentsLink`
- `postAuthor`
- `postTimestamp`
- `postLabels`
- `sharingButtons`
- `sharingPlatformIcon`

Kemunculan ganda pada bagian widget/default markup Blogger sering memang bagian dari override per widget, jadi ini **duplikat secara struktur**, tetapi belum tentu redundan secara fungsi.

### Yang paling berisiko dianggap "berulang tapi masih dipakai"
- `relatedPost` + `relatedPostScript`
- `bacaJuga`
- `defaultAdUnit`
- `inlineAd`
- `darkMode` + `LMcheckCheckbox`
- `menuSticky`
- `infiniteScrollNav`
- `scrollToTop`
- `fullwidthImage`
- `showHideTOC` + `judulTOC`

Ini masih aktif dan saling terhubung dengan config `linkMagzSetting`, jadi **jangan dihapus dulu** tanpa tes tampilan dan fungsi.

### Kesimpulan screening duplikasi
Kalau fokusnya hanya pada kode yang sudah tidak berguna lagi, maka kandidat paling aman untuk dibersihkan dulu adalah:

1. `googlePlusShare`
2. `commentsLinkIframe`
3. `iframeComments`
4. `postReactions`

Sementara blok lain yang terlihat berulang lebih tepat dianggap **legacy aktif**, bukan dead code murni.

---

## 8) Verdict akhir

`template.xml` sekarang sudah **lebih bersih dan lebih fokus** daripada template campuran lama.  
Pembersihan paling besar — yaitu pemisahan dari jejak `Produk` dan `Jasa` — tampaknya sudah tercapai.

Langkah selanjutnya yang aman bukan redesign besar, melainkan:
- merapikan sisa fitur legacy,
- memperkuat trust pages,
- dan membangun homepage sebagai hub budaya Nias.
