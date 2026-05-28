# Panduan Font Performance untuk `template.xml`

## Jawaban singkat

**Ya, cocok** jika tujuan utama Anda adalah **mempercepat loading**.  
Untuk blog Kalinz yang fokus pada konten budaya, lirik, dan arsip editorial, **system font stack** biasanya lebih ringan, lebih cepat dirender, dan lebih stabil daripada memuat Google Fonts.

Kalau Anda sudah selesai membersihkan advertorial, maka langkah font adalah salah satu optimasi yang paling masuk akal berikutnya.

---

## Rekomendasi saya

### Opsi terbaik untuk performa
Gunakan **font sistem** dan hapus semua pemanggilan Google Fonts.

Contoh font stack yang aman dan cepat:

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
```

Kalau ingin terlihat lebih netral dan rapi untuk blog editorial, Anda juga bisa pakai:

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
```

---

## Kenapa font system lebih cocok

Keuntungannya:

- tidak perlu request ke Google Fonts
- mengurangi DNS lookup dan koneksi eksternal
- mempercepat first render di mobile
- mengurangi risiko FOIT/FOUT
- lebih stabil kalau koneksi lambat
- lebih mudah dipelihara

Untuk halaman artikel, perbedaan visual biasanya kecil, tetapi dampak ke performa bisa terasa.

---

## Apakah semua Google Fonts harus dihapus?

Jika Anda ingin fokus ke speed, **ya, boleh dihapus semua**.

Namun ada satu catatan penting:

- **Google Fonts Roboto** bisa dihapus
- **icon font `linkmagzfont` jangan ikut dihapus dulu** kalau masih dipakai untuk icon search, sosial, share, dan tombol lain

Jadi bedakan antara:

1. **font teks** → Roboto dari Google Fonts  
2. **icon font** → `linkmagzfont` custom di template

---

## Blok yang aman dihapus atau diperbarui

Berikut blok yang saya sarankan untuk dievaluasi.

---

### 1) Preconnect dan DNS prefetch ke Google Fonts
Di `template.xml` ada blok ini:

```html
<link crossorigin='' href='https://fonts.googleapis.com/' rel='preconnect' />
<link crossorigin='' href='https://fonts.gstatic.com' rel='preconnect' />
<link href='https://fonts.googleapis.com/' rel='dns-prefetch' />
<link href='https://fonts.gstatic.com' rel='dns-prefetch' />
```

#### Aman dihapus?
**Ya, aman dihapus** kalau Anda benar-benar tidak lagi memakai Google Fonts.

#### Syarat
Pastikan tidak ada font dari `fonts.googleapis.com` atau `fonts.gstatic.com` yang masih dipakai.

---

### 2) Seluruh blok `@font-face` untuk Roboto
Di bagian `<style>` awal template ada banyak baris:

```css
@font-face{font-family:Roboto;...}
```

Masing-masing dibagi ke weight dan unicode subset:
- `font-weight:300`
- `font-weight:400`
- `font-weight:700`

#### Aman dihapus?
**Ya, sangat aman dihapus** jika Anda pindah ke font system.

#### Dampak
Ini justru salah satu beban terbesar karena:
- banyak request font
- CSS jadi sangat panjang
- browser perlu memilih subset font
- render awal lebih lambat

#### Saran
Kalau target Anda loading cepat, **hapus semua blok `@font-face` Roboto**.

---

### 3) `font-family:Roboto,Arial,sans-serif` pada `body`
Ada rule seperti ini:

```css
body{... font-family:Roboto,Arial,sans-serif; ...}
```

#### Aman diperbarui?
**Ya.** Ini wajib diubah jika Roboto dihapus.

#### Ganti menjadi
```css
body{... font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif; ...}
```

Kalau ingin lebih sederhana:

```css
body{... font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; ...}
```

---

### 4) Variabel font default di bagian `<b:skin>`
Di section variabel ada beberapa font default seperti:

```xml
<Variable name="body.font" ... default="normal normal 16px Helvetica, Arial, sans-serif" ... />
<Variable name="body.text.font" ... default="normal normal 14px Helvetica, Arial, sans-serif" ... />
<Variable name="tabs.font" ... />
<Variable name="blog.title.font" ... />
<Variable name="posts.title.font" ... />
<Variable name="posts.text.font" ... />
```

#### Aman dihapus?
**Jangan dihapus semua.**  
Yang aman adalah **diperbarui** supaya tetap konsisten dengan system font.

#### Yang perlu dilakukan
- ubah default font ke system stack
- biarkan variabelnya tetap ada jika dipakai di tempat lain

Contoh aman:

```xml
default="normal normal 16px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif"
```

#### Catatan
Kalau variabel itu tidak benar-benar dipakai, baru bisa dirapikan lebih jauh. Tapi untuk sekarang, **lebih aman diperbarui, bukan dihapus**.

---

## Bagian yang jangan dihapus sembarangan

### 1) `linkmagzfont`
Ada blok:

```css
@font-face{font-family:linkmagzfont; ...}
```

Ini dipakai untuk:
- icon search
- icon sosial
- icon share
- beberapa ikon UI lain

#### Kesimpulan
**Jangan dihapus dulu** kalau Anda masih memakai ikon berbasis class seperti:

- `.icon-search`
- `.icon-facebook`
- `.icon-twitter`
- `.icon-telegram`
- `.icon-whatsapp`
- `.icon-youtube`
- `.icon-tiktok`

Kalau nanti ikon ingin dipindah ke SVG inline, barulah font ini bisa dievaluasi lagi.

---

### 2) CSS class yang merujuk ke icon font
Contoh:

```css
.icon-maps:before{content:"\e900"}
.icon-search:before{content:"\e901"}
.icon-email:before{content:"\e902"}
...
```

#### Aman dihapus?
**Tidak aman** kalau markup masih memakai class-class itu.

#### Saran
- kalau tetap pakai icon font: pertahankan
- kalau mau migrasi ke SVG: baru hapus bersama markup yang terkait

---

## Rekomendasi implementasi paling aman

Kalau Anda memilih pindah ke system font, urutan perubahan terbaik adalah:

### Langkah 1
Hapus:
- preconnect ke `fonts.googleapis.com`
- preconnect ke `fonts.gstatic.com`
- dns-prefetch ke `fonts.googleapis.com`
- dns-prefetch ke `fonts.gstatic.com`

### Langkah 2
Hapus:
- semua blok `@font-face` untuk Roboto

### Langkah 3
Ubah:
- `body{ font-family:Roboto,Arial,sans-serif; }`
- font default pada variabel `<b:skin>`

### Langkah 4
Cek ulang:
- heading
- paragraf
- button
- widget sidebar
- footer
- dark mode state
- halaman post/mobile

---

## Contoh penggantian yang disarankan

### Sebelum
```css
body{
  font-family:Roboto,Arial,sans-serif;
}
```

### Sesudah
```css
body{
  font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
}
```

---

### Sebelum
```xml
<Variable name="body.font" description="Font (jenis font tidak bisa diubah)" type="font"
    default="normal normal 16px Helvetica, Arial, sans-serif" value="normal normal 16px Helvetica, Arial, sans-serif"/>
```

### Sesudah
```xml
<Variable name="body.font" description="Font (jenis font tidak bisa diubah)" type="font"
    default="normal normal 16px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif"
    value="normal normal 16px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif"/>
```

---

## Blok aman untuk dihapus

Berikut ringkasan singkat blok yang aman dihapus jika pindah ke system font:

- semua `<link rel='preconnect'>` dan `<link rel='dns-prefetch'>` ke:
  - `fonts.googleapis.com`
  - `fonts.gstatic.com`
- semua `@font-face` Roboto
- referensi `Roboto` pada font teks utama
- URL font Google yang masih ada di CSS

---

## Blok yang aman untuk diperbarui, bukan dihapus

- `body{ font-family:... }`
- variabel font pada `<b:skin>`
- style yang menaruh font default di komponen tertentu
- font fallback untuk title, post, widget, footer

---

## Yang sebaiknya tetap dipertahankan

- `linkmagzfont` untuk icon UI
- icon class yang masih aktif dipakai di template
- lazyload logic
- dark mode logic
- CSS dasar layout

---

## Rekomendasi final saya

Kalau prioritas Anda adalah loading speed, maka:

**Ya, pindah ke system font cocok.**  
Dan untuk template ini, langkah yang paling aman adalah:

1. **hapus Google Fonts Roboto**
2. **ganti font body dan variabel font ke system stack**
3. **pertahankan `linkmagzfont` dulu**
4. **uji tampilan homepage, post, sidebar, footer, dan mobile**

---

## Kesimpulan singkat

### Aman dihapus
- preconnect / dns-prefetch Google Fonts
- semua `@font-face` Roboto
- referensi langsung ke Roboto pada body

### Aman diperbarui
- variabel font di `<b:skin>`
- font family global ke system stack

### Jangan dihapus dulu
- `linkmagzfont`
- class icon yang masih dipakai template

---

## Verdict

Jika target Anda adalah **template yang lebih ringan dan lebih cepat**, maka **system font adalah pilihan yang tepat** untuk Kalinz.
