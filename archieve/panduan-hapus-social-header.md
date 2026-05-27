# Panduan Aman Menghapus Social Media Buttons di Header `template.xml`

## Jawaban singkat

Untuk kasus blog Kalinz, **cara yang paling aman dan rapi adalah menghapus blok Header Social Buttons dari `template.xml`**, bukan hanya diberi komentar.

Kenapa:
- blok itu memang hanya untuk tampilan Header,
- fitur Footer Social Buttons sudah ada terpisah,
- kalau dibiarkan sebagai komentar, sering kali masih menyisakan CSS/variable yang tidak terpakai,
- dan di Blogger template XML, komentar tidak selalu jadi solusi terbaik untuk maintenance jangka panjang.

Kalau tujuanmu hanya **menyembunyikan sementara**, boleh pakai `display: none` atau nonaktifkan widget dari Layout.  
Tapi kalau tujuanmu **cleanup permanen**, **hapus bloknya**.

---

## Bagian kode yang mengontrol Social Buttons di Header

Di `template.xml`, ada beberapa bagian yang terkait langsung dengan Social Buttons di Header.

### 1) Section widget Header Social Buttons
Ini blok utama yang menampung Social Buttons di Header:

```xml
<b:section class='social-button' id='social-button' maxwidgets='1' showaddelement='no'>
  <b:widget id='HTML71' locked='true' title='Kode Icon Media Sosial' type='HTML' version='2' visible='false'>
    <b:widget-settings>
      <b:widget-setting name='content'/>
    </b:widget-settings>
    <b:includable id='main'>
        <div class='widget-content'>
        <data:content/>
        </div>
    </b:includable>
  </b:widget>
</b:section>
```

Kalau kamu ingin **menghapus Social Buttons dari Header**, blok ini adalah kandidat utama untuk dihapus.

---

### 2) CSS khusus header social buttons
Ada beberapa aturan CSS yang hanya dipakai untuk `#social-button`.

#### Apakah semua hasil `#social-button` boleh dihapus?
**Ya, boleh**, kalau semua hasil itu memang hanya terkait Header Social Buttons.

Kalau hasil `find` kamu ada 26, itu **normal**. Satu fitur biasanya muncul di banyak tempat sekaligus:
- section widget,
- CSS utama,
- dark mode CSS,
- layout editor CSS,
- variable template,
- dan kadang helper conditional.

Jadi yang penting bukan jumlah hasilnya, tetapi **apakah semua hasil itu masih dipakai untuk footer atau tidak**.  
Kalau memang semua hanya untuk header, maka semuanya bisa dibersihkan.

#### a. Variabel warna icon sosial
Di bagian variable:

```css
<Group description="Icon Media Sosial" selector="#social-button">
    <Variable name="sosmed.color" description="Warna" type="color" default="#FFFFFF" value="#FFFFFF"/>
</Group>
```

Dan di `:root`:

```css
--sosmed-color: $(sosmed.color);
```

#### b. Style layout header social
Masih di CSS utama:

```css
#social-button{
    -webkit-box-flex:1;
    -ms-flex:1 1 50%;
    flex:1 1 50%;
    max-width:50%;
    min-width:0;
    text-align:right
}
#social-button .widget{color:var(--blog-title-text-color)}
#social-button a{display:inline-block;margin:3px 0 3px 13px;padding:2px}
#social-button .social-icon{font-size:1.5rem;display:inline-block;-webkit-transition:.2s;transition:.2s}
#social-button .social-icon i{...}
```

#### c. Style mode dark
Ada juga aturan dark mode yang khusus menarget `#social-button`:

```css
body.darkmode #social-button .social-icon i{color:#eee}
body.darkmode #social-button .social-icon i:hover{color:#fff}
```

#### d. Style layout editor
Di `body#layout` juga ada aturan untuk widget ini:

```css
body#layout #social-button{float:right;width:48%}
```

---

## Harus dihapus atau cukup dikomentari?

### Rekomendasi final
**Hapus saja** blok Header Social Buttons dan CSS yang khusus menarget `#social-button`.

### Kenapa bukan komentar?
Komentar seperti `<!-- ... -->` memang bisa menyembunyikan kode, tapi:
- mudah tertinggal sebagai dead code,
- CSS dan variable-nya masih bisa tetap ada,
- bikin template lebih sulit dirawat,
- dan tidak menyelesaikan pembersihan struktur.

### Kalau hanya ingin uji coba cepat
Kalau kamu masih ragu, lakukan langkah sementara:
- set widget `social-button` menjadi tidak visible / kosong,
- atau tambahkan CSS `display:none` sementara.

Tapi untuk hasil akhir, **hapus permanen** lebih bagus.

---

## Apakah ada ketergantungan lain yang akan rusak jika dihapus?

### Jawaban aman
**Tidak ada JavaScript penting yang bergantung langsung pada `#social-button`.**

Dari `template.xml` yang kamu kirim:
- saya tidak melihat script yang memanggil `#social-button`,
- tidak ada event handler khusus untuk header social buttons,
- tidak ada logic yang bergantung pada widget itu untuk fungsi lain.

Jadi, **menghapus blok Header Social Buttons tidak akan memicu error JavaScript**.

---

## Yang tetap perlu dijaga

Walaupun header social buttons dihapus, jangan ikut menghapus bagian ini:

### 1) Font icon `linkmagzfont`
Footer social icons memakai class seperti:
- `icon-facebook`
- `icon-instagram`
- `icon-youtube`
- `icon-tiktok`
- `icon-github`
- `icon-linkedin`

Semua itu bergantung pada font icon ini:

```css
@font-face{font-family:linkmagzfont; ...}
```

Jadi:
- **jangan hapus font icon `linkmagzfont`**
- **jangan hapus class icon sosialnya**
- karena itu dipakai juga di Footer

### 2) Footer social buttons
Blok Footer ini harus tetap ada jika kamu ingin social buttons aktif di Footer:

```html
<div class="footer-sosmed-wrap">
```

CSS Footer-nya juga sudah terpisah:

```css
.footer-sosmed-wrap { ... }
.footer-sosmed-wrap a { ... }
.footer-sosmed-wrap i::before { ... }
```

Jadi Header dan Footer **tidak saling bergantung**.

---

## File / blok yang aman dihapus

Kalau targetmu hanya menghapus Social Buttons di Header, maka urutan aman ini:

### A. Hapus section widget Header social
Hapus blok ini:

```xml
<b:section class='social-button' id='social-button' maxwidgets='1' showaddelement='no'>
...
</b:section>
```

### B. Hapus CSS khusus `#social-button`
Hapus semua rule yang menyebut:
- `#social-button`
- `body.darkmode #social-button`
- `body#layout #social-button`
- `--sosmed-color`
- group variable `Icon Media Sosial`

### C. Jangan sentuh Footer social
Tetap pertahankan:
- `footer-sosmed-wrap`
- `icon-facebook`, `icon-instagram`, `icon-youtube`, `icon-tiktok`, `icon-github`, `icon-linkedin`
- font `linkmagzfont`

---

## Checklist aman sebelum hapus

- [ ] Backup `template.xml`
- [ ] Hapus section `id='social-button'`
- [ ] Hapus CSS `#social-button`
- [ ] Hapus dark mode rule untuk `#social-button`
- [ ] Hapus `body#layout #social-button`
- [ ] Hapus variable `sosmed.color` jika sudah tidak dipakai
- [ ] Pastikan footer social buttons tetap ada
- [ ] Simpan template
- [ ] Preview homepage
- [ ] Preview single post
- [ ] Cek mobile
- [ ] Pastikan tidak ada layout error

---

## Catatan penting soal layout header

Setelah section social dihapus, header bisa saja terlihat agak longgar karena layout lama memang membagi area Header dan Social Button.

Di template ini, area header memakai:

```css
#header{
    flex:1 1 50%;
    max-width:50%;
}
```

Kalau `#social-button` dihapus total, kamu mungkin ingin nanti menyesuaikan header supaya lebih rapi, misalnya:
- memperlebar `#header` jadi `100%`,
- atau mengatur ulang alignment header.

Itu **bukan error**, hanya masalah tampilan.

---

## Rekomendasi final

### Pilihan terbaik
**Hapus blok social button di Header, lalu pertahankan social button di Footer.**

### Jangan lakukan ini sebagai solusi final
- jangan cuma komentar bloknya,
- jangan biarkan CSS header social tetap menumpuk kalau section-nya sudah dihapus,
- jangan hapus font icon footer.

---

## Ringkasan keputusan

### Hapus
- `b:section#social-button`
- CSS `#social-button`
- CSS dark mode untuk `#social-button`
- style layout editor `body#layout #social-button`
- variable `sosmed.color` bila sudah tidak dipakai

### Pertahankan
- Footer social buttons
- `linkmagzfont`
- class icon sosial
- header blog utama
- menu navigasi
- dark mode switch
- search icon

### Kesimpulan
Untuk kebutuhan audit dan cleanup niche blog Kalinz, **hapus blok Social Media Buttons di Header secara permanen** adalah langkah paling aman, paling bersih, dan paling sesuai dengan tujuanmu.
