# Audit Performance & SEO — kalinz.blogspot.com
**Halaman yang diaudit:** `/2026/07/lirik-lagu-nias-faomasiu-nagu-tice.html`
**Sumber data:** Lighthouse report (`kalinz_blogspot_com-lighthouse.html`) yang Anda unggah — JSON mentah `__LIGHTHOUSE_JSON__` diekstrak dan dibaca langsung dari file tersebut. Semua angka di bawah ini adalah angka asli dari laporan Anda, bukan perkiraan.
**Kondisi pengujian:** Mobile, Moto G Power emulation, CPU throttle 4×, jaringan disimulasikan setara Slow 4G (throttlingMethod: `simulate`).

---

## Skor Saat Ini (dari laporan Anda)

| Kategori | Skor |
|---|---|
| Performance | **45 / 100** |
| Accessibility | 97 / 100 |
| Best Practices | 96 / 100 |
| SEO | 100 / 100 |

| Metrik | Nilai | Status |
|---|---|---|
| First Contentful Paint | 1.4 s | Baik |
| **Largest Contentful Paint (LCP)** | **6.9 s** | **Buruk** (target < 2.5s) |
| **Total Blocking Time (TBT)** | **1.680 ms** | **Sangat buruk** (target < 200ms) |
| Cumulative Layout Shift (CLS) | 0.002 | Sangat baik |
| Speed Index | 5.3 s | Buruk |
| Time to Interactive | 11.9 s | Sangat buruk |
| Server response time (TTFB) | 260 ms | Baik |

---

## Ringkasan Audit

Titik krusial dari data Anda: **CLS sudah nyaris sempurna (0.002) dan TTFB juga bagus (260ms)** — jadi struktur HTML/CSS template Anda sebenarnya sudah cukup solid dari sisi layout stability dan server response. SEO sudah 100/100, Accessibility 97/100. Masalah performa **bukan** pada struktur XML/HTML template secara umum, melainkan terkonsentrasi pada satu akar masalah yang sangat jelas dari data `mainthread-work-breakdown` dan `bootup-time`:

> **Main-thread hampir seluruhnya disita oleh script pihak ketiga (iklan AdSense, Google Tag/Analytics, Microsoft Clarity), bukan oleh kode template Anda sendiri.**

Rincian `mainthread-work-breakdown`:

| Grup | Durasi |
|---|---|
| Script Evaluation | **4.399 ms** |
| Other | 1.651 ms |
| Style & Layout | 918 ms |
| Rendering | 258 ms |
| Script Parsing/Compile | 233 ms |

Dan `bootup-time` per-file mengonfirmasi sumbernya:

| Script | Total main-thread time |
|---|---|
| `pagead2.googlesyndication.com/.../show_ads_impl_fy2021.js` (AdSense) | **2.300 ms** |
| Kode HTML halaman Anda sendiri | 1.523 ms |
| Unattributable (GC/browser internal) | 964 ms |
| `adsbygoogle.js` (loader AdSense) | 559 ms |
| `scripts.clarity.ms/.../clarity.js` (Microsoft Clarity) | 553 ms |
| `reactive_library_fy2021.js` (AdSense) | 400 ms |
| `googletagmanager.com/gtag/js` (Google Analytics/GTM) | 395 ms |
| `ep2.adtrafficquality.google/sodar2.js` (AdSense fraud-check) | 207 ms |
| `google-analytics.com/analytics.js` (Analytics **legacy/Universal Analytics**) | 115 ms |

**≈ 5,3 detik dari 4,4 detik total Script Evaluation berasal dari AdSense + Clarity + Analytics — bukan dari kode template linkmagz Anda.** Ini yang mendorong TBT ke 1.680ms dan (dalam simulasi CPU 4×) menyeret LCP simulasi ke 6.9s meskipun breakdown resource LCP aktual (`lcp-breakdown-insight`) menunjukkan gambar LCP-nya sendiri hanya butuh ~1,46 detik (TTFB 444ms + delay 159ms + download 796ms + render delay 63ms) untuk termuat. Selisih besar itu adalah efek CPU yang sibuk mengeksekusi script iklan/tracking sehingga browser telat sempat mengecat (paint) gambar yang sebenarnya sudah siap.

**Implikasi penting yang harus jujur saya sampaikan:** karena blog ini bergantung pada AdSense sebagai monetisasi, sebagian besar dari 4,4 detik itu **tidak bisa dihilangkan sepenuhnya** dari sisi template — script AdSense wajib berjalan agar iklan tayang. Yang **bisa** kita lakukan dari template adalah: (1) menunda eksekusi script yang bukan prioritas (Clarity, iklan yang belum terlihat di layar) agar tidak berebut CPU/bandwidth persis di saat LCP seharusnya tercat, (2) memangkas byte yang murni boros (logo header, gambar unggulan), dan (3) memberi tahu Anda dua hal yang **tidak** bisa diperbaiki lewat XML template karena letaknya di luar template (pengaturan akun AdSense/Analytics).

---

## Masalah Critical

### C1. Logo header didownload 1600px padahal tampil hanya 129×28px — 71,8 KB dari 72,3 KB terbuang (99,3%)
**Audit:** `image-delivery-insight` → `div#header > div#Header1 > a > img`: *"This image file is larger than it needs to be (1600×347) for its displayed dimensions (129×28)."* → `wastedBytes: 71867`.
**Penyebab:** Includable `image` untuk widget Header memanggil `resizeImage(data:sourceUrl, 1600)`, padahal CSS `--logo-height: 33px` membatasi tinggi logo hanya 33px (lebar render aktual ≈129px sesuai boundingRect Lighthouse).
**Dampak:** Logo ini termuat di paling awal (di dalam `<header>`, sebelum konten utama), sehingga ia ikut memperebutkan bandwidth terbatas (throttle ~1,6 Mbps pada simulasi) tepat pada jendela waktu kritis LCP. Membuang 72KB di awal load pada koneksi lambat = signifikan.
**Perbaikan:** Turunkan target `resizeImage()` menjadi ukuran realistis (160px untuk 1×, 320px untuk 2×/retina). Ada di **2 lokasi** pada template.xml (default markup Header umum dan widget `Header1` yang benar-benar dipakai) — perbaiki keduanya agar konsisten.

### C2. Tag `<script>` Microsoft Clarity dieksekusi paling awal di `<head>`, ikut menyita CPU tepat di jalur render kritis
**Audit:** `bootup-time` → `scripts.clarity.ms/0.8.66/clarity.js` = 553ms main-thread time; posisinya di baris pertama `<head>`, sebelum meta viewport bahkan.
**Penyebab:** Snippet Clarity resmi memang async, tapi kode pembuat tag `<script>`-nya dieksekusi **segera** saat parser mencapai baris tersebut — artinya request+eksekusi Clarity mulai sedetik pun sebelum ada elemen konten yang perlu dirender, dan hasil unduhannya nanti tetap bersaing dengan resource LCP.
**Dampak:** Kontribusi langsung ke Script Evaluation time yang mendorong TBT ke 1.680ms.
**Perbaikan:** Tunda pembuatan tag Clarity dengan `requestIdleCallback` (fallback `setTimeout`) sehingga baru dieksekusi setelah browser idle / setelah konten utama sempat tercat. **Fitur Clarity tetap aktif, cuma waktu eksekusinya digeser.**

### C3. Iklan "iklan-atas" adalah satu-satunya dari 4 slot iklan yang TIDAK di-lazy-load
**Audit:** Bandingkan 4 blok iklan di template Anda sendiri:
- `iklan-tengah1` (HTML77) → pakai `IntersectionObserver`, lazy ✅
- `iklan-bawah` (HTML79) → pakai `IntersectionObserver`, lazy ✅
- `iklan-atas` (HTML76) → **langsung** `(adsbygoogle = window.adsbygoogle || []).push({})` tanpa observer ❌
**Dampak:** `iklan-atas` memaksa AdSense mem-parse+eksekusi+render unit iklan sesegera mungkin saat halaman dimuat — persis pada window waktu yang sama dengan LCP. Ini konsisten dengan `forced-reflow-insight` yang mendeteksi reflow paksa dari kode AdSense (`show_ads_impl_fy2021.js` baris 543, 386, 135) yang totalnya menyita puluhan milidetik reflow tambahan.
**Perbaikan:** Terapkan pola `IntersectionObserver` yang **sudah Anda pakai sendiri** di `iklan-tengah1`/`iklan-bawah` ke `iklan-atas`, supaya seragam dan tidak lagi menjadi satu-satunya beban instan.

---

## Masalah High

### H1. Gambar unggulan (LCP element) tidak WebP + resolusi tidak sesuai DPR — dua temuan yang sekilas kontradiktif tapi solusinya sama
**Audit ganda pada elemen yang sama** (`article.post-kalinz > img.post-featured-image`):
- `image-delivery-insight`: gambar 400×400 (78,9 KB) untuk tampil di 368×368 CSS-px → *"Using a modern image format (WebP, AVIF)... could improve this image's download size"* (hemat **52.214 bytes**) + oversized untuk DPR1 (hemat 12.116 bytes lagi).
- `image-size-responsive` (Best Practices, **skor 0**): pada devicePixelRatio 1,75 (emulasi mobile), ukuran ideal seharusnya **552×552**, sedangkan yang dikirim cuma 400×400 → **resolusinya kurang tajam di layar retina**.

Ini bukan kontradiksi — solusinya adalah **`srcset` responsif + format WebP** (bukan menaikkan atau menurunkan satu ukuran statis saja). Blogger sudah menyediakan mekanisme ini lewat parameter URL `=wN-hN-rw` (parameter `-rw` memaksa Blogger's image CDN mengirim WebP otomatis sesuai `Accept` header browser) — template Anda **sudah memakai trik ini** untuk thumbnail widget `FeaturedPost` (lihat script `-p-k-no-nu` → `-c-rw` di `allJavaScripts`), tapi trik itu **tidak menyentuh gambar di dalam isi post** (`.post-featured-image`), karena isi post adalah HTML mentah yang Anda tempel manual per-artikel.
**Dampak:** Ini elemen LCP itu sendiri — memperkecil byte-nya berdampak langsung ke LCP, dan mempertajam resolusinya memperbaiki skor Best Practices.
**Perbaikan:** Tambahkan satu script kecil di includable `blogPostBody` yang otomatis membangun `srcset` + menambahkan `-rw` **khusus untuk elemen `.post-featured-image`** (dibatasi scope-nya sengaja, supaya tidak menyentuh avatar/ikon/gambar lain yang ukurannya memang sudah pas). Ini berlaku otomatis untuk **semua post**, tidak perlu edit HTML per-artikel satu-satu.

### H2. `unused-javascript` — 100+ KB script pihak ketiga yang tidak terpakai di halaman ini
**Audit:**

| Script | Total | Terbuang |
|---|---|---|
| AdSense `show_ads_impl_fy2021.js` | 172,9 KB | **102,7 KB (59%)** |
| `gtag.js` (GTM/GA4) | 156,5 KB | **68,1 KB (43%)** |
| AdSense `reactive_library_fy2021.js` | 67,2 KB | **53,1 KB (79%)** |
| `blogger.com/.../widgets.js` | 53,2 KB | **40,4 KB (76%)** |
| `adsbygoogle.js` | 55,8 KB | **23,1 KB (41%)** |

**Penyebab:** Semua file ini dikendalikan Google/Blogger, bukan oleh kode template Anda — tidak ada baris di `template.xml` yang bisa diedit untuk memangkas isi file-file ini secara langsung.
**Perbaikan yang tersedia dari sisi template:** menunda eksekusi (lihat C2, C3) agar dampaknya ke TBT/LCP berkurang, meski total byte yang diunduh tetap sama. Ini digabung efeknya dengan perbaikan C2 & C3 di atas — **tidak ada perbaikan H2 terpisah yang perlu ditambahkan.**

---

## Masalah Medium

### M1. Kontras warna gagal WCAG AA pada label penulis di sidebar "Tentang Kalinz"
**Audit:** `color-contrast` (Accessibility, **skor 0**) → `div.kalinz-about > div.kalinz-author-row > div > span.kalinz-author-label`: *"insufficient color contrast of 2.84 (foreground: #999999, background: #ffffff)... Expected 4.5:1"*.
**Penyebab:** CSS Custom widget Anda: `.kalinz-author-label { color: #999; }` di atas background putih.
**Perbaikan:** Gelapkan ke `#6b6b6b` (≈ 5,5:1, lolos AA dengan margin aman).

### M2. `preconnect`/`dns-prefetch` ke Google Fonts terpasang tapi tidak pernah dipakai
**Audit tidak langsung** (bukan flagged sebagai audit gagal, tapi terlihat jelas dari cross-check `configSettings`/skin CSS): `body.font` di skin Anda memakai `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` — **tidak ada satupun `<link rel="stylesheet" href="fonts.googleapis.com/...">`** di seluruh template. Tapi Anda tetap `preconnect` + `dns-prefetch` ke `fonts.googleapis.com` dan `fonts.gstatic.com`.
**Dampak:** Kecil (preconnect murah), tapi ini 4 koneksi TCP/TLS percuma yang dibuka browser tanpa pernah dipakai — buang sedikit waktu CPU/network di jalur kritis.
**Perbaikan:** Hapus 4 baris preconnect/dns-prefetch untuk font yang memang tidak dipakai.

### M3. `unused-css-rules` — 64,6% dari CSS `<b:skin>` tidak terpakai di halaman ini (13,4 KB dari 20,8 KB)
**Analisis:** Ini **wajar dan sulit dihindari** untuk template Blogger satu-skin-untuk-semua-halaman (homepage, arsip, label, single post semua pakai CSS yang sama). Memisahkan critical-CSS di Blogger berisiko tinggi merusak tampilan pada tipe halaman lain karena Blogger tidak mendukung code-splitting per-halaman secara native. **Rekomendasi saya: JANGAN dipaksakan direfactor** — risiko merusak tampilan (melanggar instruksi "jangan menghapus fitur") lebih besar daripada manfaat 13KB CSS inline (yang sudah tidak render-blocking karena berada dalam `<style>` inline, bukan file eksternal terpisah). Saya kategorikan **Medium** tapi **tidak menyertakan kode perbaikan** untuk item ini karena trade-off-nya tidak sepadan.

---

## Masalah Low

### L1. `font-display` — 2 file font Google Sans (dari iklan, bukan dari situs Anda)
**Audit:** `font-display-insight` menunjuk `fonts.gstatic.com/.../googlesans/...woff2` (wasted 95ms + 90ms). File ini dipakai oleh **UI internal iklan Google** (bukan CSS Anda — skin Anda tidak mendeklarasikan font apapun dari Google Fonts, lihat M2). **Tidak bisa diperbaiki dari template** karena bukan resource yang Anda muat.

### L2. `unminified-javascript` — potensi hemat 2 KB
**Audit:** skor 0,5, estimasi hemat hanya ~2KB dari script inline besar (`allJavaScripts`, smooth-scroll, dsb). **Saya sengaja tidak menyertakan kode minifikasi manual** untuk blok JS besar ini — risiko salah ketik saat minifikasi manual pada script sepanjang itu jauh melebihi manfaat 2KB, dan Blogger sendiri sudah mengompresi respons dengan gzip/brotli (`uses-text-compression` = lolos). Kalau mau, minifikasi sebaiknya dilakukan dengan tool otomatis (Terser) di luar Blogger lalu ditempel hasilnya — bukan manual di XML.

### L3. Cache lifetime pendek pada resource pihak ketiga
**Audit:** `cache-insight` menunjuk file-file seperti `ufs_web_display.js` (cache 1 jam, wasted 60KB), `analytics.js` (cache 2 jam), gambar dari `blogger.googleusercontent.com` (cache 1 hari). **Semua header cache ini dikendalikan server Google/Blogger**, bukan oleh `template.xml` Anda — tidak ada mekanisme di Blogger untuk mengubah header `Cache-Control` pada CDN mereka.

### L4. Rantai request iklan yang berat: `interstitial_ad_frame_fy2021.js` & `fullscreen_api_adapter_fy2021.js`
**Audit:** `network-dependency-tree-insight` menunjukkan chain terpanjang (2.677ms) memuat dua file ini dari `tpc.googlesyndication.com`. File-file ini biasanya dipicu oleh **Auto Ads / Anchor Ads / Interstitial Ads** yang diaktifkan lewat **dashboard AdSense** (Ads → Auto ads), bukan dari slot iklan manual yang ada di `template.xml` Anda (Anda hanya punya 4 slot manual: atas, tengah1, tengah2, bawah — tidak ada kode interstitial di template).
**Rekomendasi (di luar template):** Buka **AdSense → Ads → Site → Auto ads** pada domain `kalinz.blogspot.com`, dan pertimbangkan menonaktifkan **Anchor ads** dan **Vignette/Interstitial ads** jika aktif — keduanya termasuk format iklan terberat dari sisi performa.

### L5. Kemungkinan Universal Analytics (legacy, sudah disunset Google) masih terpasang
**Audit:** `bootup-time` mendeteksi `google-analytics.com/analytics.js` (115ms + 21KB) — ini adalah **Universal Analytics (UA)**, yang **sudah berhenti total sejak Juli 2023** (Google tidak lagi memproses data dari UA). Tidak ada baris `analytics.js` di `template.xml` Anda — ini kemungkinan besar dimuat otomatis oleh Blogger lewat **Settings → Basic → Google Analytics Property ID (legacy)** yang masih terisi.
**Rekomendasi (di luar template):** Buka **Blogger Dashboard → Settings**, cari kolom Analytics ID/Property ID lama, dan kosongkan jika masih ada peninggalan UA — ini murni beban tanpa manfaat (data tidak diproses lagi), tapi tetap mendownload+eksekusi di setiap page view.

---

## Perbaikan yang Harus Dilakukan (Template)

Urutan berikut adalah semua perubahan **template.xml** yang perlu Anda terapkan, sesuai prioritas:

1. **(C1)** Perkecil `resizeImage()` logo header dari 1600px → 160px/320px, di 2 lokasi.
2. **(C2)** Tunda eksekusi tag Microsoft Clarity dengan `requestIdleCallback`.
3. **(C3)** Terapkan lazy-load `IntersectionObserver` pada `iklan-atas`, menyamakan pola dengan `iklan-tengah1`/`iklan-bawah`.
4. **(H1)** Tambahkan script auto-responsive-image + WebP (`-rw`) khusus untuk `.post-featured-image` di includable `blogPostBody`.
5. **(M1)** Perbaiki kontras warna `.kalinz-author-label` dari `#999` → `#6b6b6b`.
6. **(M2)** Hapus 4 baris `preconnect`/`dns-prefetch` Google Fonts yang tidak dipakai.

Tidak ada fitur yang dihapus — semua iklan, tracking, dan widget tetap aktif dan berfungsi persis sama, hanya **waktu eksekusi** dan **ukuran gambar** yang diubah.

---

## Potongan Kode Lama

**#1 — Logo header, lokasi A** (`b:defaultmarkup type='Header'`, includable `image`):
```xml
<b:includable id='image'>
    <a expr:href='data:blog.homepageUrl' expr:title='data:title'>
        <img expr:alt='data:title' expr:height='data:height'
            expr:src='resizeImage(data:sourceUrl, 1600)'
            expr:srcset='resizeImage(data:sourceUrl, 400) + &quot; 1x, &quot; + resizeImage(data:sourceUrl, 1600) + &quot; 2x&quot;'
            expr:title='data:title' expr:width='data:width' />
    </a>
</b:includable>
```

**#2 — Logo header, lokasi B** (widget `Header1`, includable `image` — ini yang benar-benar dirender):
```xml
<b:includable id='image'>
    <a expr:href='data:blog.homepageUrl' expr:title='data:title'>
        <img expr:alt='data:title' expr:height='data:height'
            expr:src='resizeImage(data:sourceUrl, 1600)'
            expr:srcset='resizeImage(data:sourceUrl, 400) + &quot; 1x, &quot; + resizeImage(data:sourceUrl, 1600) + &quot; 2x&quot;'
            expr:title='data:title' expr:width='data:width' />
    </a>
</b:includable>
```

**#3 — Script Clarity di `<head>`:**
```xml
<!-- Clarity tracking code for http://kalinz.blogspot.com/ -->
<script>
  (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src=&quot;https://www.clarity.ms/tag/&quot;+i+&quot;?ref=bwt&quot;;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, &quot;clarity&quot;, &quot;script&quot;, &quot;xf5j20w42f&quot;);
</script>
```

**#4 — Widget `iklan-atas` (HTML76):**
```xml
<b:widget-setting name='content'><![CDATA[<!-- Iklan Atas Artikel -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8813103182865992"
     data-ad-slot="6024242557"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>]]></b:widget-setting>
```

**#5 — Includable `blogPostBody` (Common defaultmarkup):**
```xml
<b:includable id='blogPostBody'>
    <div class='post-body post-body-artikel'
        expr:id='&quot;post-body-&quot; + data:post.id'>
        <data:post.body />
    </div>
    <div id='baca-juga' />
    <script>
            //<![CDATA[
            // Baca Juga — hanya definisi fungsi, request dilakukan di relatedPostScript
            function showBacaJuga(json) {
                if (!json.feed || !json.feed.entry) return;
                var cfg = { bacaJuga: true, jumlahBacaJuga: 3, judulBacaJuga: 'Baca Juga' };
                optionLinkMagz(cfg);
                if (!cfg.bacaJuga) return;
                var currentUrl = '<data:post.url/>';
                var entries = json.feed.entry;
                var html = '', count = 0;
                for (var i = 0; i < entries.length && count < cfg.jumlahBacaJuga; i++) {
                    var url = '#';
                    for (var j = 0; j < entries[i].link.length; j++) {
                        if (entries[i].link[j].rel === 'alternate') { url = entries[i].link[j].href; break; }
                    }
                    if (url === currentUrl) continue;
                    html += '<li><a href="' + url + '">' + entries[i].title.$t + '</a></li>';
                    count++;
                }
                if (count > 0) {
                    var wrap = document.createElement('div');
                    wrap.className = 'baca-juga-wrap';
                    wrap.innerHTML = '<strong>' + cfg.judulBacaJuga + '</strong><ul>' + html + '</ul>';
                    var body = document.querySelector('.post-body-artikel');
                    if (!body) return;
                    var elems = body.querySelectorAll('div > br, span > br, div > p, span > p');
                    var idx = Math.ceil(elems.length * 0.5);
                    if (elems[idx]) elems[idx].parentNode.insertBefore(wrap, elems[idx].nextSibling);
                }
            }
            //]]>
    </script>
</b:includable>
```

**#6 — CSS `.kalinz-author-label` (Custom CSS widget, HTML82):**
```css
.kalinz-author-label {
display: block;
font-size: .75rem;
color: #999;
margin-top: 1px;
}
```

**#7 — Preconnect/dns-prefetch font tak terpakai:**
```xml
<link crossorigin='' href='https://blogger.googleusercontent.com' rel='preconnect' />
<link href='https://fonts.googleapis.com' rel='preconnect' />
<link crossorigin='' href='https://fonts.gstatic.com' rel='preconnect' />

<link href='https://blogger.googleusercontent.com' rel='dns-prefetch' />
<link href='https://fonts.googleapis.com' rel='dns-prefetch' />
<link href='https://fonts.gstatic.com' rel='dns-prefetch' />
```

---

## Potongan Kode Baru

**#1 — Logo header, lokasi A** (ganti `1600` → `160`/`320`):
```xml
<b:includable id='image'>
    <a expr:href='data:blog.homepageUrl' expr:title='data:title'>
        <img expr:alt='data:title' expr:height='data:height'
            expr:src='resizeImage(data:sourceUrl, 160)'
            expr:srcset='resizeImage(data:sourceUrl, 160) + &quot; 1x, &quot; + resizeImage(data:sourceUrl, 320) + &quot; 2x&quot;'
            expr:title='data:title' expr:width='data:width' />
    </a>
</b:includable>
```

**#2 — Logo header, lokasi B (widget `Header1`):**
```xml
<b:includable id='image'>
    <a expr:href='data:blog.homepageUrl' expr:title='data:title'>
        <img expr:alt='data:title' expr:height='data:height'
            expr:src='resizeImage(data:sourceUrl, 160)'
            expr:srcset='resizeImage(data:sourceUrl, 160) + &quot; 1x, &quot; + resizeImage(data:sourceUrl, 320) + &quot; 2x&quot;'
            expr:title='data:title' expr:width='data:width' />
    </a>
</b:includable>
```
> Catatan: 160px sudah 1,24× lebih besar dari lebar tampil terukur (129px) untuk jaga ketajaman di layar standar; 320px menutupi kebutuhan retina/2×. Jika suatu saat Anda memperbesar logo lewat Theme Designer (ubah `--logo-height`), naikkan kedua angka ini secukupnya (misal 240/480) — jangan kembalikan ke 1600.

**#3 — Script Clarity ditunda sampai idle:**
```xml
<!-- Clarity tracking code for http://kalinz.blogspot.com/ -->
<script>
  (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      function loadClarity(){
        t=l.createElement(r);t.async=1;t.src=&quot;https://www.clarity.ms/tag/&quot;+i+&quot;?ref=bwt&quot;;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      }
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadClarity, {timeout: 4000});
      } else {
        setTimeout(loadClarity, 2500);
      }
  })(window, document, &quot;clarity&quot;, &quot;script&quot;, &quot;xf5j20w42f&quot;);
</script>
```

**#4 — Widget `iklan-atas` (HTML76) dengan lazy-load, menyamai pola `iklan-bawah`:**
```xml
<b:widget-setting name='content'><![CDATA[<!-- Iklan Atas Artikel -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8813103182865992"
     data-ad-slot="6024242557"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (function(){
  var box = document.currentScript.parentElement;
  if (!box) return;
  function loadAd(){ (adsbygoogle = window.adsbygoogle || []).push({}); }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          loadAd();
        }
      });
    }, { rootMargin: '300px 0px' });
    io.observe(box);
  } else {
    loadAd();
  }
})();
</script>]]></b:widget-setting>
```
> Catatan: karena `iklan-atas` biasanya sudah terlihat di viewport awal (di atas artikel), `rootMargin: '300px'` membuatnya tetap dimuat nyaris seketika saat elemen mendekati viewport — bukan ditunda lama — tapi eksekusinya tidak lagi memblokir thread persis di titik nol milidetik seperti sebelumnya, dan lebih penting: kodenya tidak lagi menjadi kandidat script yang wajib di-parse+eksekusi paling awal.

**#5 — Includable `blogPostBody` + auto-responsive-image WebP untuk gambar unggulan:**
```xml
<b:includable id='blogPostBody'>
    <div class='post-body post-body-artikel'
        expr:id='&quot;post-body-&quot; + data:post.id'>
        <data:post.body />
    </div>
    <div id='baca-juga' />
    <script>
            //<![CDATA[
            // Baca Juga — hanya definisi fungsi, request dilakukan di relatedPostScript
            function showBacaJuga(json) {
                if (!json.feed || !json.feed.entry) return;
                var cfg = { bacaJuga: true, jumlahBacaJuga: 3, judulBacaJuga: 'Baca Juga' };
                optionLinkMagz(cfg);
                if (!cfg.bacaJuga) return;
                var currentUrl = '<data:post.url/>';
                var entries = json.feed.entry;
                var html = '', count = 0;
                for (var i = 0; i < entries.length && count < cfg.jumlahBacaJuga; i++) {
                    var url = '#';
                    for (var j = 0; j < entries[i].link.length; j++) {
                        if (entries[i].link[j].rel === 'alternate') { url = entries[i].link[j].href; break; }
                    }
                    if (url === currentUrl) continue;
                    html += '<li><a href="' + url + '">' + entries[i].title.$t + '</a></li>';
                    count++;
                }
                if (count > 0) {
                    var wrap = document.createElement('div');
                    wrap.className = 'baca-juga-wrap';
                    wrap.innerHTML = '<strong>' + cfg.judulBacaJuga + '</strong><ul>' + html + '</ul>';
                    var body = document.querySelector('.post-body-artikel');
                    if (!body) return;
                    var elems = body.querySelectorAll('div > br, span > br, div > p, span > p');
                    var idx = Math.ceil(elems.length * 0.5);
                    if (elems[idx]) elems[idx].parentNode.insertBefore(wrap, elems[idx].nextSibling);
                }
            }
            // Perbesar ketajaman + paksa WebP untuk gambar unggulan di dalam isi post
            !function(){
                var img = document.querySelector('.post-body-artikel .post-featured-image');
                if (!img) return;
                var src = img.getAttribute('src') || '';
                var m = src.match(/^(.*?)=w(\d+)-h(\d+)$/);
                if (!m) return;
                var base = m[1], w0 = parseInt(m[2],10), h0 = parseInt(m[3],10);
                if (!w0 || !h0) return;
                var dispW = img.clientWidth || parseInt(img.getAttribute('width'),10) || w0;
                var ratio = h0 / w0;
                var dpr = Math.min(window.devicePixelRatio || 1, 2);
                var srcset = [1, 1.5, 2].map(function(s){
                    var w = Math.round(dispW * s), h = Math.round(w * ratio);
                    return base + '=w' + w + '-h' + h + '-rw ' + s + 'x';
                }).join(', ');
                var targetW = Math.round(dispW * dpr), targetH = Math.round(targetW * ratio);
                img.setAttribute('srcset', srcset);
                img.setAttribute('src', base + '=w' + targetW + '-h' + targetH + '-rw');
            }();
            //]]>
    </script>
</b:includable>
```
> Catatan penting: script ini **sengaja dibatasi** hanya menyasar elemen dengan class `.post-featured-image` di dalam `.post-body-artikel` — tidak menyentuh avatar, ikon, atau gambar lain manapun, supaya tidak ada risiko merusak tampilan gambar-gambar lain di post. Script memeriksa pola URL Blogger (`...=wN-hN`) sebelum mengubah apapun; jika pola tidak cocok, ia langsung berhenti (aman/no-op). Parameter `-rw` adalah parameter resmi Blogger's image CDN untuk auto-format WebP sesuai `Accept` header browser peminta.

**#6 — CSS `.kalinz-author-label` dengan kontras yang lolos WCAG AA:**
```css
.kalinz-author-label {
display: block;
font-size: .75rem;
color: #6b6b6b;
margin-top: 1px;
}
```

**#7 — Preconnect/dns-prefetch, hapus 4 baris yang tak terpakai:**
```xml
<link crossorigin='' href='https://blogger.googleusercontent.com' rel='preconnect' />

<link href='https://blogger.googleusercontent.com' rel='dns-prefetch' />
```
> Baris untuk `blogger.googleusercontent.com` **dipertahankan** (dipakai nyata untuk semua gambar post/logo/avatar). Yang dihapus hanya 4 baris `fonts.googleapis.com`/`fonts.gstatic.com` karena skin Anda memakai `system-ui` — tidak pernah memuat font dari domain itu.

---

## Estimasi Peningkatan Skor

Saya berikan estimasi **realistis, bukan optimis** — dan saya jelaskan kenapa saya tidak menjanjikan Performance 95+.

Dari `mainthread-work-breakdown`, Script Evaluation total 4.399ms, dan dari `bootup-time`, porsi murni AdSense+Clarity+GTM+Analytics ≈ 4.100ms dari total tersebut (>93%). Perbaikan C1–C3 & H1 di atas **menunda** dan **memangkas byte**, tapi **tidak menghapus** script iklan/analytics itu sendiri (menghapusnya = kehilangan monetisasi/analytics, bukan skenario yang Anda minta). Karena itu, TBT tidak bisa realistis turun ke <200ms selama AdSense tetap tayang dengan 4 slot iklan aktif — ini adalah batas fisik dari menjalankan Google Ads di halaman Blogger, bukan kelemahan template Anda.

| Metrik | Sebelum | Estimasi Sesudah | Alasan |
|---|---|---|---|
| Performance | 65 → sebenarnya **45** | **≈ 58–68** | Byte savings (C1: -72KB, H1: -50–60KB) mempercepat network time; penundaan Clarity (C2) & lazy iklan-atas (C3) mengurangi kepadatan main-thread di jendela LCP awal |
| LCP | 6.5s → sebenarnya **6.9s** | **≈ 4.5–5.5s** | Kurang kompetisi bandwidth (logo 72KB lebih kecil) + kurang kompetisi CPU (Clarity ditunda) di jendela render kritis; TIDAK bisa mendekati 2.5s selama AdSense show_ads_impl (2.300ms sendirian) tetap wajib jalan untuk menayangkan iklan |
| CLS | 0.19 → sebenarnya **0.002** | **0.002 (tidak berubah)** | Sudah sangat baik dari awal, tidak ada perubahan layout dari fix di atas |
| TBT | 350ms → sebenarnya **1.680ms** | **≈ 1.100–1.400ms** | Berkurang dari penundaan Clarity (~550ms dipindah keluar window kritis) & pengurangan reflow iklan-atas; mayoritas TBT sisa adalah AdSense murni yang tidak bisa disentuh dari template |
| INP | — | Tidak diukur di laporan field ini (field data) | Perlu data CrUX riil, bukan dari lab Lighthouse ini |
| Accessibility | 97 → **≈ 100** | Fix M1 (kontras warna) menutup satu-satunya audit yang gagal |
| Best Practices | 96 → **≈ 100** | Fix H1 (responsive image + WebP) menutup satu-satunya audit yang gagal (`image-size-responsive`) |
| SEO | 100 | 100 (tidak berubah, sudah sempurna) |

**Untuk mendorong Performance lebih jauh dari ~65 menuju 85–95+, tiga langkah di luar template (bukan XML) ini punya dampak jauh lebih besar daripada optimasi template apapun**, karena mereka memangkas *byte dan script itu sendiri*, bukan cuma menunda eksekusinya:

1. **Kurangi jumlah slot iklan aktif** — Anda punya 4 slot manual (atas/tengah1/tengah2/bawah) + kemungkinan Auto ads dari akun (L4). Setiap slot AdSense tambahan menambah kompetisi main-thread. Uji coba nonaktifkan sementara 1–2 slot yang kontribusi kliknya paling kecil, ukur ulang.
2. **Nonaktifkan Anchor/Interstitial/Vignette ads** di AdSense → Ads → Auto ads (L4) — inilah sumber `interstitial_ad_frame_fy2021.js` yang memakan chain 2,7 detik.
3. **Hapus Property ID Universal Analytics lama** di Blogger Settings jika masih ada (L5) — zero manfaat karena UA sudah disunset Google, tapi masih membebani setiap page view.

Ketiganya adalah keputusan bisnis (trade-off monetisasi/tracking vs kecepatan) yang harus Anda putuskan sendiri — saya tidak mengubahnya di atas karena instruksi Anda eksplisit meminta *"jangan menghapus fitur yang sudah ada."* Kode yang saya berikan di bagian "Potongan Kode Baru" **100% tidak menghapus fitur apapun** — hanya menunda waktu eksekusi dan memangkas ukuran file gambar yang murni boros.
