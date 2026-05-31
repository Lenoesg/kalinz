# Rekomendasi Redesign Header Blogger KALINZ

Dokumen ini menjelaskan perubahan yang disarankan untuk membuat header Blogger `kalinz.blogspot.com` mirip dengan screenshot:
- **Desktop**: menu kiri — logo tengah — menu kanan + search
- **Mobile**: hamburger kiri — logo tengah — search kanan
- **Mobile overlay**: menu penuh layar dengan animasi

---

## 1) Identifikasi Blok Widget Header

Di `template.xml` Anda, bagian yang paling relevan adalah:

### A. Logo / Title Blog
Lokasi:
```xml
<b:section class='header' id='header' maxwidgets='1' showaddelement='no'>
  <b:widget id='Header1' locked='true' ... type='Header' version='2' visible='true'>
```

Widget ini bertanggung jawab untuk:
- `<data:title />`
- gambar/logo header
- `<data:this.description />` bila dipakai

**Kesimpulan:** widget `Header1` sebaiknya **dipertahankan** dan hanya diubah struktur wrapper / styling-nya.

---

### B. Navigasi Header Saat Ini
Lokasi:
```xml
<div id='navmenu-wrap'>
  <b:include name='searchFormContainer' />
  <div id='navmenu-wrap-sticky'>
    <div class='menu-sticky'>
      <div class='nav-outer nav-copy'>
      </div>
    </div>
  </div>
  <b:section class='navmenu' id='navmenu' maxwidgets='1' showaddelement='no'>
    <b:widget id='HTML72' ... type='HTML' version='2' visible='true'>
```

Isi menu saat ini masih **hard-code**:
```xml
<b:widget-setting name='content'><![CDATA[
<li><a href='https://kalinz.blogspot.com/search/label/Lagu%20Nias'>Lagu Nias</a></li>
...
]]></b:widget-setting>
```

**Kesimpulan penting:**
- `HTML72` adalah sumber menu header sekarang.
- Jika targetnya menu yang tetap bisa diedit dari **Dashboard Blogger**, maka **HTML72 sebaiknya diganti**.
- Untuk layout kiri-kanan yang fleksibel, paling aman adalah:
  - **buat 2 widget PageList** di header: kiri dan kanan
  - biarkan `PageList1` footer tetap ada bila masih dipakai untuk footer

---

### C. Widget PageList Bawaan Blogger
Di template Anda sudah ada definisi default:
```xml
<b:defaultmarkup type='PageList'>
  ...
  <b:includable id='pageLink'>
    <li>
      <b:class cond='data:overflow' name='overflowable-item' />
      <b:class cond='data:link.isCurrentPage' name='selected' />
      <a expr:href='data:link.href'>
        <data:link.title />
      </a>
    </li>
  </b:includable>
```

Ini sangat bagus karena:
- menu tetap bisa diatur dari dashboard
- link title/href tidak hard-code
- aman untuk struktur header baru

**Rekomendasi:**  
**Jangan hapus** dukungan `PageList` bawaan.  
**Ganti** `HTML72` header menu dengan `PageList` widget di header.

---

## 2) Modifikasi HTML/XML

Di bawah ini saya buat contoh **SEBELUM** dan **SESUDAH** secara ringkas.

---

### A. SEBELUM
Struktur header saat ini:

```xml
<header id='header-outer'>
  <div id='header-wrap'>
    <div id='header-content'>
      <b:section class='header' id='header' maxwidgets='1' showaddelement='no'>
        <b:widget id='Header1' locked='true' type='Header' version='2' visible='true'>
          ...
        </b:widget>
      </b:section>
    </div>
  </div>

  <div id='navmenu-wrap'>
    <b:include name='searchFormContainer' />
    <div id='navmenu-wrap-sticky'>
      <div class='menu-sticky'>
        <div class='nav-outer nav-copy'></div>
      </div>
    </div>

    <b:section class='navmenu' id='navmenu' maxwidgets='1' showaddelement='no'>
      <b:widget id='HTML72' locked='true' title='Kode Menu Navigasi' type='HTML' version='2' visible='true'>
        <b:widget-settings>
          <b:widget-setting name='content'><![CDATA[
<li><a href='https://kalinz.blogspot.com/search/label/Lagu%20Nias'>Lagu Nias</a></li>
<li><a href='https://kalinz.blogspot.com/search/label/Lagu%20Rohani'>Lagu Rohani</a></li>
<li><a href='https://kalinz.blogspot.com/search/label/Maena%20Nias'>Maena Nias</a></li>
          ]]></b:widget-setting>
        </b:widget-settings>
        <b:includable id='main'>
          <div class='nav-outer nav-original'>
            <nav class='navmenu-content'>
              <ul><data:content /></ul>
            </nav>
            <div class='nav-secondary'>
              <b:include name='searchIcon' />
            </div>
            <button aria-label='menu' class='navmenu-button'>
              <span />
              <span />
              <span />
            </button>
          </div>
          <b:include name='mobileMenuContainer' />
        </b:includable>
      </b:widget>
    </b:section>
  </div>
</header>
```

---

### B. SESUDAH
Struktur yang disarankan:

```xml
<header id='header-outer' class='site-header'>
  <div id='header-wrap'>
    <div id='header-content' class='site-header__inner'>

      <!-- KIRI: menu kiri -->
      <b:section class='header-nav header-nav-left' id='header-nav-left' maxwidgets='1' showaddelement='no'>
        <b:widget id='PageListHeaderLeft' locked='true' title='Menu Kiri' type='PageList' version='2' visible='true'>
          <b:widget-settings>
            <b:widget-setting name='homeTitle'>Home</b:widget-setting>
            <b:widget-setting name='pageListJson'><![CDATA[{}]]></b:widget-setting>
          </b:widget-settings>
          <b:includable id='main'>
            <nav class='site-nav site-nav--left' aria-label='Navigasi kiri'>
              <b:include name='content' />
            </nav>
          </b:includable>
          <b:includable id='content'>
            <b:include name='pageList' />
          </b:includable>
          <b:includable id='pageList'>
            <ul class='site-nav__list'>
              <b:loop values='data:links' var='link'>
                <b:include name='pageLink' />
              </b:loop>
            </ul>
          </b:includable>
          <b:includable id='pageLink'>
            <li class='site-nav__item'>
              <a class='site-nav__link' expr:href='data:link.href'>
                <data:link.title />
              </a>
            </li>
          </b:includable>
        </b:widget>
      </b:section>

      <!-- TENGAH: logo -->
      <b:section class='header header-center' id='header' maxwidgets='1' showaddelement='no'>
        <b:widget id='Header1' locked='true' title='KALINZ' type='Header' version='2' visible='true'>
          <b:widget-settings>
            <b:widget-setting name='imagePlacement'>REPLACE</b:widget-setting>
            <b:widget-setting name='useImage'>true</b:widget-setting>
          </b:widget-settings>
          <b:includable id='main' var='this'>
            <b:include cond='data:imagePlacement in {"REPLACE","BEFORE_DESCRIPTION"}' name='image' />
            <b:include name='title' />
            <b:include cond='data:imagePlacement != "REPLACE"' name='description' />
          </b:includable>
          <b:includable id='title'>
            <div class='blog-title-wrap'>
              <b:if cond='data:view.isSingleItem'>
                <h2 class='blog-title'>
                  <a expr:href='data:blog.homepageUrl' expr:title='data:title'>
                    <data:title />
                  </a>
                </h2>
                <b:else />
                <h1 class='blog-title'>
                  <a expr:href='data:blog.homepageUrl' expr:title='data:title'>
                    <data:title />
                  </a>
                </h1>
              </b:if>
            </div>
          </b:includable>
        </b:widget>
      </b:section>

      <!-- KANAN: menu kanan + search -->
      <b:section class='header-nav header-nav-right' id='header-nav-right' maxwidgets='1' showaddelement='no'>
        <b:widget id='PageListHeaderRight' locked='true' title='Menu Kanan' type='PageList' version='2' visible='true'>
          <b:widget-settings>
            <b:widget-setting name='homeTitle'>Home</b:widget-setting>
            <b:widget-setting name='pageListJson'><![CDATA[{}]]></b:widget-setting>
          </b:widget-settings>
          <b:includable id='main'>
            <nav class='site-nav site-nav--right' aria-label='Navigasi kanan'>
              <b:include name='content' />
            </nav>
          </b:includable>
          <b:includable id='content'>
            <b:include name='pageList' />
          </b:includable>
          <b:includable id='pageList'>
            <ul class='site-nav__list'>
              <b:loop values='data:links' var='link'>
                <b:include name='pageLink' />
              </b:loop>
            </ul>
          </b:includable>
          <b:includable id='pageLink'>
            <li class='site-nav__item'>
              <a class='site-nav__link' expr:href='data:link.href'>
                <data:link.title />
              </a>
            </li>
          </b:includable>
        </b:widget>

        <button class='header-search-btn' aria-label='Search' type='button'>
          <span class='header-search-btn__icon' />
        </button>
      </b:section>

      <!-- MOBILE: hamburger -->
      <button class='header-menu-toggle' aria-label='Open menu' type='button' aria-expanded='false'>
        <span></span>
        <span></span>
        <span></span>
      </button>

    </div>
  </div>

  <!-- MOBILE OVERLAY -->
  <div class='header-mobile-overlay' id='header-mobile-overlay' aria-hidden='true'>
    <div class='header-mobile-overlay__backdrop' data-close-mobile-menu='true'></div>

    <div class='header-mobile-overlay__panel' role='dialog' aria-modal='true' aria-label='Menu navigasi'>
      <div class='header-mobile-overlay__topbar'>
        <button class='header-mobile-close' type='button' aria-label='Close menu'>×</button>
      </div>

      <nav class='header-mobile-menu' id='header-mobile-menu'></nav>
    </div>
  </div>
</header>
```

---

### C. Catatan penting untuk struktur di atas
1. **`PageListHeaderLeft` dan `PageListHeaderRight`** membuat menu tetap bisa diedit lewat Dashboard Blogger.
2. Jika Anda ingin hanya satu daftar menu, Anda bisa pakai **satu PageList** lalu duplikasi secara visual, tetapi itu **tidak ideal** untuk desain kiri-kanan yang berbeda.
3. `Header1` tetap memakai `<data:title />` agar title blog bisa diubah dari dashboard.
4. Search icon di kanan bisa tetap memakai `searchFormContainer`/`searchIcon` yang sudah ada, atau diganti tombol yang memicu overlay pencarian.

---

## 3) Penambahan CSS

### Letak terbaik
Tambahkan CSS **di paling bawah `<b:skin><![CDATA[ ... ]]>`**, tepat **sebelum** `]]></b:skin>`.

Jika ingin aman, taruh sebagai blok override terpisah agar tidak tertimpa CSS lama.

---

### CSS yang disarankan

```css
/* ========== HEADER REDESIGN KALINZ ========== */
#header-outer.site-header {
  position: relative;
  z-index: 50;
  background: #f7f4ee;
}

#header-outer .site-header__inner {
  max-width: var(--theme-width);
  margin: 0 auto;
  padding: 14px 36px;
  box-sizing: border-box;
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.header-nav,
.header-center {
  min-width: 0;
}

.header-nav {
  flex: 1 1 33.333%;
}

.header-center {
  flex: 0 0 auto;
  text-align: center;
}

.header-nav--left {
  justify-content: flex-start;
}

.header-nav--right {
  justify-content: flex-end;
}

.site-nav {
  width: 100%;
}

.site-nav__list {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 28px;
  margin: 0;
  padding: 0;
  white-space: nowrap;
}

.site-nav__item {
  margin: 0;
  padding: 0;
}

.site-nav__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: #111;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
}

.site-nav__link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 10px;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.25s ease;
}

.site-nav__link:hover::after,
.site-nav__link:focus-visible::after,
.site-nav__item.selected .site-nav__link::after {
  width: 100%;
}

.site-nav__link:focus-visible,
.header-search-btn:focus-visible,
.header-menu-toggle:focus-visible,
.header-mobile-close:focus-visible {
  outline: 2px solid #111;
  outline-offset: 3px;
}

.blog-title-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

#header .blog-title {
  margin: 0;
  padding: 0;
  line-height: 1;
}

#header .blog-title a {
  color: #111;
  text-decoration: none;
  font-family: "Didot", "Bodoni MT", "Times New Roman", serif;
  font-size: clamp(2rem, 4vw, 3.75rem);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 400;
}

#header .blog-title a:hover {
  opacity: 0.85;
}

.header-search-btn {
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #111;
}

.header-search-btn__icon {
  width: 18px;
  height: 18px;
  display: inline-block;
  position: relative;
}

.header-search-btn__icon::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid currentColor;
  border-radius: 50%;
  box-sizing: border-box;
  transform: scale(0.72);
}

.header-search-btn__icon::after {
  content: "";
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 8px;
  height: 2px;
  background: currentColor;
  transform: rotate(45deg);
  transform-origin: right center;
}

/* Desktop: hamburger hidden */
.header-menu-toggle {
  display: none;
}

/* Mobile overlay base */
.header-mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.28s ease, visibility 0.28s ease;
}

.header-mobile-overlay.is-open {
  pointer-events: auto;
  opacity: 1;
  visibility: visible;
}

.header-mobile-overlay__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
}

.header-mobile-overlay__panel {
  position: absolute;
  inset: 0;
  background: #f7f4ee;
  transform: translateY(12px);
  opacity: 0;
  transition: transform 0.28s ease, opacity 0.28s ease;
  display: flex;
  flex-direction: column;
}

.header-mobile-overlay.is-open .header-mobile-overlay__panel {
  transform: translateY(0);
  opacity: 1;
}

.header-mobile-overlay__topbar {
  display: flex;
  justify-content: flex-end;
  padding: 18px 18px 0;
}

.header-mobile-close {
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  color: #111;
}

.header-mobile-menu {
  flex: 1;
  overflow: auto;
  padding: 30px 22px 40px;
}

.header-mobile-menu .site-nav__list {
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

.header-mobile-menu .site-nav__link {
  width: 100%;
  font-size: 1.15rem;
  letter-spacing: 0.12em;
  padding: 14px 0;
}

/* Responsive */
@media (max-width: 768px) {
  #header-outer .site-header__inner {
    padding: 12px 16px;
    min-height: 60px;
    display: grid;
    grid-template-columns: 44px 1fr 44px;
    align-items: center;
    gap: 8px;
  }

  .header-nav {
    display: none;
  }

  .header-center {
    grid-column: 2;
    justify-self: center;
  }

  .header-search-btn {
    display: inline-flex;
    grid-column: 3;
    justify-self: end;
  }

  .header-menu-toggle {
    display: inline-flex;
    grid-column: 1;
    justify-self: start;
    width: 44px;
    height: 44px;
    border: 0;
    background: transparent;
    cursor: pointer;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    padding: 0;
  }

  .header-menu-toggle span {
    display: block;
    width: 18px;
    height: 2px;
    background: #111;
    border-radius: 2px;
    margin-left: 0;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .header-menu-toggle.is-active span:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }

  .header-menu-toggle.is-active span:nth-child(2) {
    opacity: 0;
  }

  .header-menu-toggle.is-active span:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }

  #header .blog-title a {
    font-size: clamp(1.5rem, 8vw, 2.3rem);
    letter-spacing: 0.18em;
  }
}

@media (max-width: 480px) {
  #header-outer .site-header__inner {
    padding: 10px 14px;
  }

  .header-mobile-menu {
    padding: 22px 18px 32px;
  }

  .header-mobile-menu .site-nav__link {
    font-size: 1rem;
  }
}
```

---

## 4) Penambahan JavaScript

### Letak terbaik
Tambahkan script ini:
- **sebelum `</body>`**, atau
- ke section `custom-javascript-footer`

Jika Anda ingin tetap rapi, letakkan di `custom-javascript-footer` atau tepat sebelum `</body>` agar tidak bentrok dengan script lama.

---

### Script toggle hamburger + overlay menu

Script di bawah ini:
- membuka / menutup overlay
- menyalin menu kiri + kanan ke overlay mobile
- menutup overlay saat klik backdrop / tombol close / Escape
- mengubah `aria-expanded`

```html
<script>
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("header-outer");
  if (!header) return;

  const toggle = header.querySelector(".header-menu-toggle");
  const overlay = header.querySelector(".header-mobile-overlay");
  const closeBtn = header.querySelector(".header-mobile-close");
  const backdrop = header.querySelector(".header-mobile-overlay__backdrop");
  const mobileMenu = header.querySelector("#header-mobile-menu");
  const desktopNavs = header.querySelectorAll(".site-nav");

  if (!toggle || !overlay || !closeBtn || !backdrop || !mobileMenu) return;

  function buildMobileMenu() {
    mobileMenu.innerHTML = "";
    desktopNavs.forEach(function (nav) {
      const cloned = nav.cloneNode(true);
      mobileMenu.appendChild(cloned);
    });
  }

  function openMenu() {
    overlay.classList.add("is-open");
    toggle.classList.add("is-active");
    toggle.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    overlay.classList.remove("is-open");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  buildMobileMenu();

  toggle.addEventListener("click", function () {
    if (overlay.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeBtn.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && overlay.classList.contains("is-open")) {
      closeMenu();
    }
  });

  overlay.addEventListener("click", function (event) {
    const link = event.target.closest("a");
    if (link) closeMenu();
  });
});
</script>
```

---

## 5) Rekomendasi Implementasi Praktis

### Opsi yang paling rapi
1. **Pertahankan** widget `Header1`
2. **Ganti** menu `HTML72` menjadi:
   - `PageListHeaderLeft`
   - `PageListHeaderRight`
3. **Tambahkan** overlay mobile di header
4. **Tambahkan** CSS override sebelum `]]></b:skin>`
5. **Tambahkan** JS toggle sebelum `</body>`

---

### Jika Anda ingin tetap satu widget menu saja
Bisa, tetapi:
- layout kiri dan kanan akan sulit dibedakan
- menu tidak sefleksibel screenshot
- hasil desktop bisa kurang presisi

**Saran saya:** pakai **2 PageList widgets** di header.

---

## 6) Urutan kerja yang disarankan

1. Backup `template.xml`
2. Tambahkan CSS override
3. Ubah struktur header XML
4. Tambahkan JavaScript toggle
5. Simpan, lalu cek:
   - Desktop: menu kiri / logo / menu kanan + search
   - Mobile: hamburger / logo / search
   - Overlay: full-screen menu tampil dan bisa ditutup
6. Jika perlu, rapikan jarak dan ukuran font

---

## 7) Ringkasan singkat

- **Widget yang relevan:** `Header1` + `HTML72`
- **Yang harus diubah:** `HTML72` header hard-code
- **Yang dipertahankan:** `Header1`, `PageList` default markup
- **Menu editable dashboard:** gunakan **PageList widget**
- **CSS:** taruh sebelum `]]></b:skin>`
- **JS:** taruh sebelum `</body>` atau di `custom-javascript-footer`
