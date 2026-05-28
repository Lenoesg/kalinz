# Blok advertorial yang aman dibersihkan dari `template.xml`

Berdasarkan `template-performance-audit-2026.md` dan konteks README, blog Kalinz fokus pada **lirik lagu Nias, terjemahan, kamus, dan budaya Nias**. Kalau memang **advertorial / sponsored post tidak dipakai**, maka logic ini bisa dibuang untuk merapikan template.

## Prinsip aman sebelum hapus
Yang dibuang hanya jalur khusus advertorial.  
Jalur artikel normal, halaman statis, komentar, related post, TOC, dan share biasa tetap dipertahankan.

---

# 1) Blok paling aman untuk dihapus

## 1.1 `defaultPostAdPage`
Blok ini hanya dipakai saat post terdeteksi sebagai advertorial.

```xml
<b:includable id='defaultPostAdPage'>
    <b:include name='blogPostTitle' />
    <b:include name='postInfoAdvertorial' />
    <b:include name='blogPostBody' />
    <b:include name='postShareButton' />
    <b:include name='relatedPost' />
    <b:include name='relatedPostScript' />
</b:includable>
```

### Kenapa aman dihapus
- Ini jalur render khusus iklan/sponsor.
- Jika blog tidak memakai advertorial, blok ini tidak punya fungsi praktis.
- Penghapusan blok ini mengurangi branching di template.

---

## 1.2 `postInfoAdvertorial`
Ini adalah metadata khusus sponsor / advertorial.

```xml
<b:includable id='postInfoAdvertorial'>
    <div class='post-info'>
        <span class='advertorial-label'>Sponsored Post </span>
        <b:loop
            values='data:widgets.Blog.first.allBylineItems where (i => i.name == "timestamp")'
            var='byline'>
            <b:include name='postInfoPostDate' />
        </b:loop>
    </div>
</b:includable>
```

### Kenapa aman dihapus
- Hanya dipakai untuk tampilan sponsor.
- Tidak dipakai di jalur artikel organik.
- Jika advertorial dibuang, label `Sponsored Post` juga tidak diperlukan.

---

# 2) Blok conditional yang mengarah ke advertorial

## 2.1 Conditional di `defaultHomepage`
Pada homepage, template membedakan post advertorial vs post normal.

```xml
<b:if cond='data:post.labels any (label => label.name in ["Advertorial","Iklan","Sponsor"])'>
    <b:include name='postInfoAdvertorial' />
    <b:else />
    <b:include name='postInfo' />
</b:if>
```

### Aman dibersihkan menjadi
```xml
<b:include name='postInfo' />
```

### Kenapa aman
- Kalau tidak ada advertorial, pengecekan label ini hanya menambah kompleksitas.
- Semua post homepage bisa lewat jalur metadata normal saja.

---

## 2.2 Conditional di `post` includable
Ini adalah pemilih jalur post normal vs advertorial.

```xml
<b:if
    cond='data:posts any (p => p.labels any (l => l.name in ["Advertorial","Iklan","Sponsor"]))'>
    <b:include name='defaultPostAdPage' />
    <b:else />
    <b:include name='defaultPostPage' />
</b:if>
```

### Aman dibersihkan menjadi
```xml
<b:include name='defaultPostPage' />
```

### Kenapa aman
- Ini inti branching advertorial.
- Jika advertorial tidak dipakai, jalur `defaultPostAdPage` tidak perlu lagi dipilih.
- Ini salah satu penghapusan paling berdampak untuk penyederhanaan template.

---

## 2.3 Conditional di `postAndComments`
Bagian ini mencegah komentar tampil pada post advertorial.

```xml
<b:if cond='data:view.isPost'>
    <b:if
        cond='not(data:post.labels any (l => l.name in ["Advertorial","Iklan","Sponsor"]))'>
        <b:include data='post' name='commentPicker' />
    </b:if>
</b:if>
```

### Aman dibersihkan menjadi
```xml
<b:if cond='data:view.isPost'>
    <b:include data='post' name='commentPicker' />
</b:if>
```

### Kenapa aman
- Jika semua konten adalah artikel normal, komentar tidak perlu dibedakan berdasarkan label advertorial.
- Ini memang hanya pengecekan cabang khusus sponsor.

---

# 3) Blok yang ikut terdampak dan boleh dihapus kalau advertorial benar-benar hilang total

## 3.1 Semua referensi label advertorial
Cari dan hapus semua pengecekan label berikut:

- `Advertorial`
- `Iklan`
- `Sponsor`

Contoh pola yang harus dicari:

```xml
data:post.labels any (l => l.name in ["Advertorial","Iklan","Sponsor"])
```

atau:

```xml
data:post.labels any (label => label.name in ["Advertorial","Iklan","Sponsor"])
```

### Kenapa penting
Kalau satu referensi masih tertinggal, template masih menyimpan branching advertorial meski blok utamanya sudah dihapus.

---

## 3.2 Label display yang hanya relevan untuk advertorial
Kalau ada CSS / markup tambahan khusus sponsor, itu juga boleh dibuang bila tidak dipakai.

Contoh yang perlu dicek:
- kelas `advertorial-label`
- teks `Sponsored Post`
- wrapper khusus iklan/sponsor bila ada di tempat lain

Di file yang Anda berikan, yang paling jelas adalah:

```xml
<span class='advertorial-label'>Sponsored Post </span>
```

Kalau ini dihapus, pastikan tidak ada CSS atau markup lain yang masih merujuk ke kelas tersebut.

---

# 4) Urutan pembersihan yang paling aman

Saya sarankan hapus dalam urutan ini:

1. **hapus pemilih advertorial di `post`**
2. **hapus conditional advertorial di homepage**
3. **hapus conditional advertorial di `postAndComments`**
4. **hapus `defaultPostAdPage`**
5. **hapus `postInfoAdvertorial`**
6. **cari sisa referensi `Advertorial`, `Iklan`, `Sponsor` di seluruh `template.xml`**

---

# 5) Rangkuman singkat

## Bisa dihapus langsung
- `defaultPostAdPage`
- `postInfoAdvertorial`

## Bisa disederhanakan
- conditional advertorial di `defaultHomepage`
- conditional advertorial di `post`
- conditional advertorial di `postAndComments`

## Harus dicari sisa referensinya
- semua pengecekan label `Advertorial / Iklan / Sponsor`
- teks `Sponsored Post`
- kelas atau CSS terkait advertorial jika ada

---

# 6) Versi hasil akhir yang paling bersih

Kalau advertorial benar-benar tidak dipakai, target akhirnya adalah:

- hanya **satu jalur post normal**
- tidak ada branch berdasarkan label sponsor
- komentar tetap tampil untuk semua post
- homepage tidak lagi membedakan artikel biasa vs advertorial
- template lebih pendek, lebih mudah dirawat, dan lebih ringan diproses
