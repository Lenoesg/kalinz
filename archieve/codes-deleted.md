# History Blok Kode yang Dihapus

Berikut adalah blok blok yang telah saya hapus agar tercatat historynya:

### 1. Blok pertama mengenai meta description produk jasa

```xml
<b:if cond='data:view.isSearch and data:view.search.label in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]'>
    <b:if cond='data:blog.metaDescription'>
        <meta expr:content='data:blog.pageName + &quot; - &quot; + data:blog.title + &quot; - &quot; + data:blog.metaDescription' name='description'/> 
    </b:if>
<b:elseif cond='data:view.isHomepage'/>
    <b:if cond='data:blog.metaDescription'>
        <meta expr:content='data:blog.metaDescription' name='description'/>
    </b:if>
<b:elseif cond='data:view.isSingleItem'/>
    <b:if cond='data:blog.metaDescription'>
        <meta expr:content='data:blog.metaDescription' name='description'/>
    </b:if> 
</b:if>
```

### 2. Blok kedua terkait meta description

```xml
<b:comment><!-- Meta Robots start --></b:comment>
<b:if cond='data:view.isSearch and data:view.search.label not in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;] or data:view.isArchive or data:view.search.query'>
    <meta content='noindex, noarchive' name='robots'/>
</b:if>
<b:comment><!-- Meta Robots end --></b:comment>
```

### 3. Blok ketiga terkait banner-produk

```xml
<b:section class='banner-produk' cond='data:view.isLayoutMode or data:view.search.label in [&quot;Produk&quot;,&quot;Products&quot;]' id='banner-produk' maxwidgets='1' showaddelement='no'>
          <b:widget id='Image45' locked='true' title='Widget Banner (label produk)' type='Image' visible='true'>
            <b:includable id='main'>
        <b:if cond='data:title'>
            <div class='normalwidget-title'>
                <h2 class='title'><data:title/></h2>
            </div>
        </b:if>
        <b:include name='content'/>
    </b:includable>
            <b:includable id='content'>
        <div class='widget-content'>
            <b:tag cond='data:link' expr:href='data:link' name='a'>
                <img class='lazyload' expr:alt='data:title' expr:data-src='data:sourceUrl' expr:height='data:height' expr:id='data:widget.instanceId + &quot;_img&quot;' expr:width='data:width' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAABCAYAAAD9yd/wAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAPSURBVAiZY+zt7c1kwAIALtACEvr8z1AAAAAASUVORK5CYII='/>
                <div class='lazy-loading'/>
            </b:tag>
            <br/>
            <b:if cond='data:caption'>
                <span class='caption'><data:caption/></span>
            </b:if>
        </div>
    </b:includable>
          </b:widget>
        </b:section>
```

### 4. Blok keempat terkait banner-jasa

```xml
<b:section class='banner-jasa' cond='data:view.isLayoutMode or data:view.search.label in [&quot;Jasa&quot;,&quot;Services&quot;]' id='banner-jasa' maxwidgets='1' showaddelement='no'>
  <b:widget id='Image49' locked='true' title='Widget Banner (label jasa)' type='Image' visible='true'>
    <b:includable id='main'>
        <b:if cond='data:title'>
            <div class='normalwidget-title'>
                <h2 class='title'><data:title/></h2>
            </div>
        </b:if>
        <b:include name='content'/>
    </b:includable>
    <b:includable id='content'>
        <div class='widget-content'>
            <b:tag cond='data:link' expr:href='data:link' name='a'>
                <img class='lazyload' expr:alt='data:title' expr:data-src='data:sourceUrl' expr:height='data:height' expr:id='data:widget.instanceId + &quot;_img&quot;' expr:width='data:width' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAABCAYAAAD9yd/wAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAPSURBVAiZY+zt7c1kwAIALtACEvr8z1AAAAAASUVORK5CYII='/>
                <div class='lazy-loading'/>
            </b:tag>
            <br/>
            <b:if cond='data:caption'>
                <span class='caption'><data:caption/></span>
            </b:if>
        </div>
    </b:includable>
  </b:widget>
</b:section>
```

### 5. Blok kelima terkait html-produk

```xml
<b:section class='html-produk' cond='data:view.isLayoutMode or data:view.search.label in [&quot;Produk&quot;,&quot;Products&quot;]' id='html-produk' maxwidgets='1' showaddelement='no'>
          <b:widget id='HTML74' locked='true' title='Widget HTML (label produk)' type='HTML' visible='true'>
            <b:widget-settings>
              <b:widget-setting name='content'/>
            </b:widget-settings>
            <b:includable id='main'>
        <b:if cond='data:content'>
            <b:if cond='data:title'>
                <div class='normalwidget-title html'>
                    <h2 class='title'><data:title/></h2>
                </div>
            </b:if>
            <div class='widget-content'>
                <data:content/>
            </div>
        </b:if>
    </b:includable>
          </b:widget>
        </b:section>
```

### 6. Blok keenam terkait html-jasa

```xml
<b:section class='html-jasa' cond='data:view.isLayoutMode or data:view.search.label in [&quot;Jasa&quot;,&quot;Services&quot;]' id='html-jasa' maxwidgets='1' showaddelement='no'>
  <b:widget id='HTML75' locked='true' title='Widget HTML (label jasa)' type='HTML' visible='false'>
    <b:widget-settings>
      <b:widget-setting name='content'/>
    </b:widget-settings>
    <b:includable id='main'>
        <b:if cond='data:content'>
            <b:if cond='data:title'>
                <div class='normalwidget-title html'>
                    <h2 class='title'><data:title/></h2>
                </div>
            </b:if>
            <div class='widget-content'>
                <data:content/>
            </div>
        </b:if>
    </b:includable>
  </b:widget>
</b:section>
```

### 7. Blok ketujuh terkait content wrap terkat produk dan jasa

```xml
<b:attr cond='data:view.search.label in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]' name='id' value='content-wrap-produk-index'/>
```

### 8. Blok ketujuh terkait Pemanggilan CSS & Penanda Class baris kode atas

```xml
<b:include cond='data:view.isPost and data:posts any (p =&gt; p.labels any (l =&gt; l.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]))' name='halamanProdukCSS'/>
<b:class cond='data:view.isSingleItem and data:posts any (p =&gt; p.labels any (l =&gt; l.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]))' name='content-single-produk'/>
```

### 9. Blok sembilan terkait Pemanggilan CSS & Penanda Class baris kode bawah

```xml
<b:include cond='data:view.isPost and data:posts any (p =&gt; p.labels any (l =&gt; l.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]))' name='halamanProdukCSS'/>
<b:class cond='data:view.isSingleItem and data:posts any (p =&gt; p.labels any (l =&gt; l.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]))' name='content-single-produk'/>
```

### 10. Blok sepuluh terkait CSS `#content-wrap-produk-index ...` 

```css
body.darkmode #content-wrap-produk-index,
#content-wrap-produk-index>.google-auto-placed,
#content-wrap-produk-index{-webkit-transition:.2s;transition:.2s;background:var(--posts-bg-color);-webkit-box-flex:1;-ms-flex:1 1 100%;flex:1 1 100%;max-width:900px;min-width:0;margin:0 auto;padding:36px 0}#content-wrap-produk-index .content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;margin:0 -18px}#content-wrap-produk-index .content .post-outer{-webkit-box-flex:1;-ms-flex:1 1 33.3333333333%;flex:1 1 33.3333333333%;max-width:33.3333333333%;min-width:0;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0 auto;padding:0 18px 36px}@media only screen and (max-width:700px){#content-wrap-produk-index .content .post-outer{-ms-flex-preferred-size:50%;flex-basis:50%;max-width:50%}}@media only screen and (max-width:320px){#content-wrap-produk-index .content .post-outer{-ms-flex-preferred-size:100%;flex-basis:100%;max-width:100%}}#content-wrap-produk-index .content .post-outer .post-content{background:rgba(153,163,173,.08);height:100%;position:relative;-webkit-transition:.2s;transition:.2s;border-radius:4px;overflow:hidden}#content-wrap-produk-index .content .post-outer .post-content .produk-status{position:absolute;font-weight:400;top:4px;left:0;display:inline-block;padding:3px 8px;background:#333;color:#fff}#content-wrap-produk-index .content .post-outer .post-content:hover{-webkit-box-shadow:0 0 20px 5px rgba(0,0,0,.12);box-shadow:0 0 20px 5px rgba(0,0,0,.12)}#content-wrap-produk-index .content .post-outer .img-thumbnail{width:100%;position:relative}#content-wrap-produk-index .content .post-outer .img-thumbnail>a{display:block}#content-wrap-produk-index .content .post-outer .img-thumbnail img{width:100%;display:block}#content-wrap-produk-index .content .post-outer .post-title{font-size:1rem;padding:15px 10px 10px;font-weight:400;margin:0;text-align:center}#content-wrap-produk-index .content .post-outer .post-snippet{height:45px;overflow:hidden;padding:0 10px 15px;font-size:.6875rem}#content-wrap-produk-index .content .post-outer b.harga-produk{font-weight:400;font-size:1rem;display:block;height:22px;line-height:22px;text-align:center;margin-bottom:50px}#content-wrap-produk-index .content .post-outer b.harga-produk-coret{font-weight:400;text-decoration:line-through;display:block;height:22px;line-height:22px;text-align:center;font-size:.8125rem;color:#d0452f}#content-wrap-produk-index .content .post-outer b.info-produk{-webkit-transition:.2s;transition:.2s;background:var(--labels-bg-color);color:var(--labels-text-color)!important;position:absolute;border-radius:3px;top:0;left:0;padding:4px 8px 2px;font-size:.6875rem;text-transform:uppercase;font-weight:400}#content-wrap-produk-index h1{text-align:center}#content-wrap-produk-index .blog-pager a.blog-pager-newer-link,#content-wrap-produk-index .blog-pager a.blog-pager-older-link{float:none}#content-wrap-produk-index .banner-jasa .normalwidget-title,#content-wrap-produk-index .banner-produk .normalwidget-title,#content-wrap-produk-index .html-jasa .normalwidget-title,#content-wrap-produk-index .html-produk .normalwidget-title{display:none;visibility:hidden;height:0;opacity:0}#content-wrap-produk-index .banner-jasa .widget-content,#content-wrap-produk-index .banner-produk .widget-content,#content-wrap-produk-index .html-jasa .widget-content,#content-wrap-produk-index .html-produk .widget-content{text-align:center;margin:0 36px 36px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow-x:auto}
#content-wrap-produk-index{padding:22px 0}#content-wrap-produk-index .content{margin:0 -11px}#content-wrap-produk-index .content .post-outer{padding:0 11px 22px}#content-wrap-produk-index .banner-jasa .widget-content,#content-wrap-produk-index .banner-produk .widget-content,#content-wrap-produk-index .html-jasa .widget-content,#content-wrap-produk-index .html-produk .widget-content{margin:0 22px 22px}
.FeaturedPost .post-summary p.featured-desc b.harga-produk,.FeaturedPost .post-summary p.featured-desc b.harga-produk-coret{display:block;margin:5px 0}.FeaturedPost .post-summary p.featured-desc b.harga-produk-coret{text-decoration:line-through;color:#c23613}.FeaturedPost .post-summary p.featured-desc b.harga-produk{font-size:1.5rem;margin-bottom:1rem}.FeaturedPost .post-summary p.featured-desc b.info-produk,
#content-wrap-produk-index #banner-jasa .widget-content a,#content-wrap-produk-index #banner-produk .widget-content a{display:block}#content-wrap-produk-index #banner-jasa .widget-content img,#content-wrap-produk-index #banner-produk .widget-content img{width:100%;display:block;border-radius:4px}#content-wrap-produk-index #banner-jasa .widget-content br,#content-wrap-produk-index #banner-produk .widget-content br{display:none}#content-wrap-produk-index #banner-jasa .widget-content .caption,#content-wrap-produk-index #banner-produk .widget-content .caption{text-align:center;display:block;padding:15px}.order-produk{text-align:center;display:block}.order-produk a,.order-produk a:visited{-webkit-transition:.2s;transition:.2s;display:inline-block;text-align:center;background:#4c8e1a;padding:10px 30px;color:#fff!important;margin:2rem auto;border-radius:4px;-webkit-box-shadow:0 0 0 6px rgba(95,95,95,.1);box-shadow:0 0 0 6px rgba(95,95,95,.1);font-size:1.375rem;text-transform:uppercase;text-decoration:none!important;font-weight:700}.order-produk a:hover{background-color:#336909}.order-wa a{background-color:#4c8e1a;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB8AAAAfABTP6PgwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAM+SURBVEiJrZdbiFVlFMd/3zFs9NC9oYzIMtOGmQeTJDICqZcuD0UvRYFBglAvEfTQQ1ER2UMPUVFgZleIItKii1IKgdHFkCx9KKHJicJqsOziaObMr4fzHVzzzZ4z+5xaL/vs//qv9V/72+tb+zuJmqYuA64ClgOLgH5gDrAf+AXYDmwD3kwp/V4373RiSb1F3WF9+0tdp87vlDt1EB0A1gKXB/gosBP4FPgp3zeBhcClwLmBewh4GHgkpTRR90mvUf8ITzGs3qmeOEPcUvVZ9UiIfV89pY7ozerRHHRYvUc9rlbFx3IMFK/nc/XkTgFXhmpH1cu6ESxyzVVfDeJb1VlVxNPUHzPpgHpRr6IhZ1JfCOL3V5GeDIQbCt8y9UH12h7EZ6sfh1e3IDrPzqDqa0XgoDqWfb+pzR7Eh8IrfCk61mRwXF1YBG1xsq3qVjjneS7Hj6kntcHdGXyvIPeFlWjbth6FL55UvHpOAFYX5KZTbVSddvDMIN5u3ucbwIXB91kkppQOAl8HaBxYmVKyF2FasxxgSQM4Lzi+ryCvD7+/TClt6lEUYCRf5zeAucFRNVOfDgUtVa/7D8K/5muzARwMjilLmFIaA24LvnVl53dh7a14uBGqADijip1S2go8lm/7gS3qYOTYmnw3qbM7CJ+Vr6NlV984XYQ6S90QuAfU2zPeVD/J+HfqSivmsrozcza2gR8y8HKHalHnqG8U2+sbqw8KHxaxF6gT2Xd3G1ybgTH19BnEG7Ym3XiFWLSPirg1wbegDQ6Eah7tJBwSDalvh7ho/xi6X52n/pl9m8tE72TH33bRter56kN5ufepb6mXFJxXQlHLywT3hmr76wrXKOyuIPpiFeGL7PzgfxS9w2PHqGHLM5u6OFRVfijm9SDYdPLBYp+6qIp4X1jmM9Ur1CfUkdw8G9QlNQT71NXq3iC6Vx0quSkH7AKGaJ2FDwGnTpP7K2ATsAsYBo4H+oDFtM7VVwNxOd8Fbk0p7a+qcnDKZmjZqLpefcbWv4NubLd6/UzL80AIGFEfV1cYRp56grpK3az+XCE0oe5Rn1JXdBTMltTXgT3ARmBHnY+8rYZrD/wjwLf5K1bb/gWmMra2uud+NQAAAABJRU5ErkJggg==");background-repeat:no-repeat;background-position:15px 11px;padding:10px 20px 10px 55px} 
```

### 10. Blok sepuluh terkait CSS `.content-single-produk ...`

```css
.content-single-produk .post-outer-single .produk-container h1.post-title{text-align:center}
#content-wrap .post-snippet b.info-produk{display:none}#content-wrap .post-snippet b.harga-produk,#content-wrap .post-snippet b.harga-produk-coret{display:block}#content-wrap .post-snippet b.harga-produk-coret{color:#d0452f;text-decoration:line-through;font-size:.8125rem}#content-wrap .post-snippet b.harga-produk{margin-bottom:13px}.content-single-produk .breadcrumbs{text-align:center;-webkit-box-flex:1;-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%;min-width:0}.content-single-produk .post-outer-single{-webkit-box-flex:1;-ms-flex:1 1 100%;flex:1 1 100%;max-width:100%;min-width:0}.content-single-produk .post-outer-single .post-content{border-bottom:none!important;padding:0!important}.content-single-produk .post-outer-single .produk-container{position:relative;max-width:550px;margin:0 auto}.content-single-produk .post-outer-single .produk-container h1.post-title{margin:0 0 1.375rem;text-align:center;font-size:2rem}.content-single-produk .post-outer-single .produk-container .gambar-produk{position:relative;text-align:center;margin:0 -2rem 2rem;border-radius:4px;overflow:hidden}@media only screen and (max-width:600px){.content-single-produk .post-outer-single .produk-container .gambar-produk{position:relative;margin:0 0 36px}}.content-single-produk .post-outer-single .produk-container .gambar-produk img{width:100%;display:block}.content-single-produk .post-outer-single .produk-container .gambar-produk .gambar-slider{max-width:100%}.content-single-produk .post-outer-single .produk-container .gambar-produk .gambar-slider img{width:100%}.content-single-produk .post-outer-single .produk-container .gambar-produk button{position:absolute;outline:0;cursor:pointer;background:0 0;border:none;display:block;top:calc(50% - 18px);padding:10px}.content-single-produk .post-outer-single .produk-container .gambar-produk button.next{right:14px}.content-single-produk .post-outer-single .produk-container .gambar-produk button.prev{left:14px}.content-single-produk .post-outer-single .produk-container .gambar-produk button.next::after,.content-single-produk .post-outer-single .produk-container .gambar-produk button.prev::after{content:"";display:block;width:14px;height:14px;border-bottom:2px solid rgba(255,255,255,.6)}.content-single-produk .post-outer-single .produk-container .gambar-produk button.next::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);border-right:2px solid rgba(255,255,255,.6)}.content-single-produk .post-outer-single .produk-container .gambar-produk button.prev::after{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-left:2px solid rgba(255,255,255,.6)}.content-single-produk .post-outer-single .produk-container .keterangan-produk{color:inherit;background:rgba(234,202,83,.12);padding:15px;border:4px dashed rgba(234,202,83,.32);border-radius:8px}.content-single-produk .post-outer-single .produk-container .keterangan-produk b.harga-produk-coret{text-align:center;text-decoration:line-through;display:block;color:#c54816;font-weight:400}.content-single-produk .post-outer-single .produk-container .keterangan-produk b.harga-produk{text-align:center;font-size:1.75rem;display:block;font-weight:400}.content-single-produk .post-outer-single .produk-container .keterangan-produk b.info-produk{text-align:center;display:block;color:#2f7418;font-weight:400}.content-single-produk .post-outer-single .produk-container .produk-deskripsi{-webkit-box-sizing:border-box;box-sizing:border-box;margin-top:2rem}
```


### 11. Blok sebelas terkait CSS `.html-produk dan .html-jasa`

```css
body.darkmode .html-jasa .normalwidget-title h2.title,body.darkmode .html-jasa .normalwidget-title h3.title,body.darkmode .html-produk .normalwidget-title h2.title,body.darkmode .html-produk .normalwidget-title h3.title,
body.darkmode .html-jasa .normalwidget-title::after,body.darkmode .html-produk .normalwidget-title::after,
body.darkmode .html-jasa .normalwidget-title h2.title,
body.darkmode .html-jasa .normalwidget-title h3.title,body.darkmode .html-produk .normalwidget-title h2.title,body.darkmode .html-produk .normalwidget-title h3.title,body.darkmode .latestposts-title h2,
.html-jasa .normalwidget-title h2.title,.html-jasa .normalwidget-title h3.title,.html-produk .normalwidget-title h2.title,.html-produk .normalwidget-title h3.title{-webkit-transition:.2s;transition:.2s;background:var(--posts-bg-color);color:var(--latest-posts-title-color)}.html-jasa .normalwidget-title::after,.html-produk .normalwidget-title::after{-webkit-transition:.2s;transition:.2s;background:var(--latest-posts-title-bg-color)}
```

```xml

    <b:includable id='blogPostBodyProduk'>
        <style>.content-single-produk .post-body .widget-content{display:none;}</style>
        <div class='post-body' expr:id='&quot;post-body-&quot; + data:post.id'>
            <div class='produk-container'>
                <b:include name='blogPostTitle'/>                       
                <data:post.body/>
                <b:include name='tombolOrderWA'/>
            </div>
        </div>
    </b:includable>
```

```xml
<b:include name='blogPostBodyProduk'/>
<script>
    var waPostTitle = &quot;<data:post.title.jsonEscaped/>&quot;;
    //<![CDATA[
        !function(){var e,t;t={tombolPesanWA:!0},optionLinkMagz(t),1==t.tombolPesanWA?function(){var e={judulPesanWA:"Pesan Sekarang",nomorWA:6285e9,teksPesanWA:"Halo Admin. Saya mau pesan"};optionLinkMagz(e);var t=document.querySelector(".order-wa-link"),n=encodeURI(e.teksPesanWA),a=encodeURI(waPostTitle);t.href="https://api.whatsapp.com/send?phone="+e.nomorWA+"&text="+n+"%20*"+a+"*%20",t.innerHTML=e.judulPesanWA}():(e=document.querySelector(".order-wa")).parentNode.removeChild(e),function(){var e=document.createElement("button"),t=document.createElement("button");e.setAttribute("aria-label","Button"),t.setAttribute("aria-label","Button"),e.classList.add("prev"),t.classList.add("next");var n=document.querySelector(".gambar-produk"),a=document.querySelectorAll(".gambar-produk img");if(null!==n&&a.length>1){n.appendChild(e),n.appendChild(t);var o=new Siema({selector:".gambar-slider",loop:!0});document.querySelector(".prev").addEventListener("click",function(){o.prev()}),document.querySelector(".next").addEventListener("click",function(){o.next()})}}()}();
        //]]>
    </script> 
```

```xml
<b:includable id='defaultProdukIndexPage'>
        <b:include name='blogPostThumbnailProduk'/>
        <b:include name='blogPostTitle'/>
        <b:include name='blogPostSnippet'/>
    </b:includable>
```

```xml
<b:includable id='defaultProdukPage'>
        <script>
            //<![CDATA[
            /*! Siema Slider */
                !function(){var e,t;e="undefined"!=typeof self?self:this,t=function(){return function(e){function t(r){if(i[r])return i[r].exports;var n=i[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,r){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),s=function(){function e(t){var i=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config=e.mergeSettings(t),this.selector="string"==typeof this.config.selector?document.querySelector(this.config.selector):this.config.selector,null===this.selector)throw new Error("Something wrong with your selector 😭");this.resolveSlidesNumber(),this.selectorWidth=this.selector.offsetWidth,this.innerElements=[].slice.call(this.selector.children),this.currentSlide=this.config.loop?this.config.startIndex%this.innerElements.length:Math.max(0,Math.min(this.config.startIndex,this.innerElements.length-this.perPage)),this.transformProperty=e.webkitOrNot(),["resizeHandler","touchstartHandler","touchendHandler","touchmoveHandler","mousedownHandler","mouseupHandler","mouseleaveHandler","mousemoveHandler","clickHandler"].forEach(function(e){i[e]=i[e].bind(i)}),this.init()}return n(e,[{key:"attachEvents",value:function(){window.addEventListener("resize",this.resizeHandler),this.config.draggable&&(this.pointerDown=!1,this.drag={startX:0,endX:0,startY:0,letItGo:null,preventClick:!1},this.selector.addEventListener("touchstart",this.touchstartHandler),this.selector.addEventListener("touchend",this.touchendHandler),this.selector.addEventListener("touchmove",this.touchmoveHandler),this.selector.addEventListener("mousedown",this.mousedownHandler),this.selector.addEventListener("mouseup",this.mouseupHandler),this.selector.addEventListener("mouseleave",this.mouseleaveHandler),this.selector.addEventListener("mousemove",this.mousemoveHandler),this.selector.addEventListener("click",this.clickHandler))}},{key:"detachEvents",value:function(){window.removeEventListener("resize",this.resizeHandler),this.selector.removeEventListener("touchstart",this.touchstartHandler),this.selector.removeEventListener("touchend",this.touchendHandler),this.selector.removeEventListener("touchmove",this.touchmoveHandler),this.selector.removeEventListener("mousedown",this.mousedownHandler),this.selector.removeEventListener("mouseup",this.mouseupHandler),this.selector.removeEventListener("mouseleave",this.mouseleaveHandler),this.selector.removeEventListener("mousemove",this.mousemoveHandler),this.selector.removeEventListener("click",this.clickHandler)}},{key:"init",value:function(){this.attachEvents(),this.selector.style.overflow="hidden",this.selector.style.direction=this.config.rtl?"rtl":"ltr",this.buildSliderFrame(),this.config.onInit.call(this)}},{key:"buildSliderFrame",value:function(){var e=this.selectorWidth/this.perPage,t=this.config.loop?this.innerElements.length+2*this.perPage:this.innerElements.length;this.sliderFrame=document.createElement("div"),this.sliderFrame.style.width=e*t+"px",this.enableTransition(),this.config.draggable&&(this.selector.style.cursor="-webkit-grab");var i=document.createDocumentFragment();if(this.config.loop)for(var r=this.innerElements.length-this.perPage;r<this.innerElements.length;r++){var n=this.buildSliderFrameItem(this.innerElements[r].cloneNode(!0));i.appendChild(n)}for(var s=0;s<this.innerElements.length;s++){var l=this.buildSliderFrameItem(this.innerElements[s]);i.appendChild(l)}if(this.config.loop)for(var o=0;o<this.perPage;o++){var a=this.buildSliderFrameItem(this.innerElements[o].cloneNode(!0));i.appendChild(a)}this.sliderFrame.appendChild(i),this.selector.innerHTML="",this.selector.appendChild(this.sliderFrame),this.slideToCurrent()}},{key:"buildSliderFrameItem",value:function(e){var t=document.createElement("div");return t.style.cssFloat=this.config.rtl?"right":"left",t.style.float=this.config.rtl?"right":"left",t.style.width=(this.config.loop?100/(this.innerElements.length+2*this.perPage):100/this.innerElements.length)+"%",t.appendChild(e),t}},{key:"resolveSlidesNumber",value:function(){if("number"==typeof this.config.perPage)this.perPage=this.config.perPage;else if("object"===r(this.config.perPage))for(var e in this.perPage=1,this.config.perPage)window.innerWidth>=e&&(this.perPage=this.config.perPage[e])}},{key:"prev",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;if(this.config.loop)if(this.currentSlide-e<0){this.disableTransition();var r=this.currentSlide+this.innerElements.length,n=r+this.perPage,s=(this.config.rtl?1:-1)*n*(this.selectorWidth/this.perPage),l=this.config.draggable?this.drag.endX-this.drag.startX:0;this.sliderFrame.style[this.transformProperty]="translate3d("+(s+l)+"px, 0, 0)",this.currentSlide=r-e}else this.currentSlide=this.currentSlide-e;else this.currentSlide=Math.max(this.currentSlide-e,0);i!==this.currentSlide&&(this.slideToCurrent(this.config.loop),this.config.onChange.call(this),t&&t.call(this))}}},{key:"next",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments[1];if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;if(this.config.loop)if(this.currentSlide+e>this.innerElements.length-this.perPage){this.disableTransition();var r=this.currentSlide-this.innerElements.length,n=r+this.perPage,s=(this.config.rtl?1:-1)*n*(this.selectorWidth/this.perPage),l=this.config.draggable?this.drag.endX-this.drag.startX:0;this.sliderFrame.style[this.transformProperty]="translate3d("+(s+l)+"px, 0, 0)",this.currentSlide=r+e}else this.currentSlide=this.currentSlide+e;else this.currentSlide=Math.min(this.currentSlide+e,this.innerElements.length-this.perPage);i!==this.currentSlide&&(this.slideToCurrent(this.config.loop),this.config.onChange.call(this),t&&t.call(this))}}},{key:"disableTransition",value:function(){this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing}},{key:"enableTransition",value:function(){this.sliderFrame.style.webkitTransition="all "+this.config.duration+"ms "+this.config.easing,this.sliderFrame.style.transition="all "+this.config.duration+"ms "+this.config.easing}},{key:"goTo",value:function(e,t){if(!(this.innerElements.length<=this.perPage)){var i=this.currentSlide;this.currentSlide=this.config.loop?e%this.innerElements.length:Math.min(Math.max(e,0),this.innerElements.length-this.perPage),i!==this.currentSlide&&(this.slideToCurrent(),this.config.onChange.call(this),t&&t.call(this))}}},{key:"slideToCurrent",value:function(e){var t=this,i=this.config.loop?this.currentSlide+this.perPage:this.currentSlide,r=(this.config.rtl?1:-1)*i*(this.selectorWidth/this.perPage);e?requestAnimationFrame(function(){requestAnimationFrame(function(){t.enableTransition(),t.sliderFrame.style[t.transformProperty]="translate3d("+r+"px, 0, 0)"})}):this.sliderFrame.style[this.transformProperty]="translate3d("+r+"px, 0, 0)"}},{key:"updateAfterDrag",value:function(){var e=(this.config.rtl?-1:1)*(this.drag.endX-this.drag.startX),t=Math.abs(e),i=this.config.multipleDrag?Math.ceil(t/(this.selectorWidth/this.perPage)):1,r=e>0&&this.currentSlide-i<0,n=e<0&&this.currentSlide+i>this.innerElements.length-this.perPage;e>0&&t>this.config.threshold&&this.innerElements.length>this.perPage?this.prev(i):e<0&&t>this.config.threshold&&this.innerElements.length>this.perPage&&this.next(i),this.slideToCurrent(r||n)}},{key:"resizeHandler",value:function(){this.resolveSlidesNumber(),this.currentSlide+this.perPage>this.innerElements.length&&(this.currentSlide=this.innerElements.length<=this.perPage?0:this.innerElements.length-this.perPage),this.selectorWidth=this.selector.offsetWidth,this.buildSliderFrame()}},{key:"clearDrag",value:function(){this.drag={startX:0,endX:0,startY:0,letItGo:null,preventClick:this.drag.preventClick}}},{key:"touchstartHandler",value:function(e){-1!==["TEXTAREA","OPTION","INPUT","SELECT"].indexOf(e.target.nodeName)||(e.stopPropagation(),this.pointerDown=!0,this.drag.startX=e.touches[0].pageX,this.drag.startY=e.touches[0].pageY)}},{key:"touchendHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.enableTransition(),this.drag.endX&&this.updateAfterDrag(),this.clearDrag()}},{key:"touchmoveHandler",value:function(e){if(e.stopPropagation(),null===this.drag.letItGo&&(this.drag.letItGo=Math.abs(this.drag.startY-e.touches[0].pageY)<Math.abs(this.drag.startX-e.touches[0].pageX)),this.pointerDown&&this.drag.letItGo){e.preventDefault(),this.drag.endX=e.touches[0].pageX,this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing;var t=(this.config.loop?this.currentSlide+this.perPage:this.currentSlide)*(this.selectorWidth/this.perPage),i=this.drag.endX-this.drag.startX,r=this.config.rtl?t+i:t-i;this.sliderFrame.style[this.transformProperty]="translate3d("+(this.config.rtl?1:-1)*r+"px, 0, 0)"}}},{key:"mousedownHandler",value:function(e){-1!==["TEXTAREA","OPTION","INPUT","SELECT"].indexOf(e.target.nodeName)||(e.preventDefault(),e.stopPropagation(),this.pointerDown=!0,this.drag.startX=e.pageX)}},{key:"mouseupHandler",value:function(e){e.stopPropagation(),this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.enableTransition(),this.drag.endX&&this.updateAfterDrag(),this.clearDrag()}},{key:"mousemoveHandler",value:function(e){if(e.preventDefault(),this.pointerDown){"A"===e.target.nodeName&&(this.drag.preventClick=!0),this.drag.endX=e.pageX,this.selector.style.cursor="-webkit-grabbing",this.sliderFrame.style.webkitTransition="all 0ms "+this.config.easing,this.sliderFrame.style.transition="all 0ms "+this.config.easing;var t=(this.config.loop?this.currentSlide+this.perPage:this.currentSlide)*(this.selectorWidth/this.perPage),i=this.drag.endX-this.drag.startX,r=this.config.rtl?t+i:t-i;this.sliderFrame.style[this.transformProperty]="translate3d("+(this.config.rtl?1:-1)*r+"px, 0, 0)"}}},{key:"mouseleaveHandler",value:function(e){this.pointerDown&&(this.pointerDown=!1,this.selector.style.cursor="-webkit-grab",this.drag.endX=e.pageX,this.drag.preventClick=!1,this.enableTransition(),this.updateAfterDrag(),this.clearDrag())}},{key:"clickHandler",value:function(e){this.drag.preventClick&&e.preventDefault(),this.drag.preventClick=!1}},{key:"remove",value:function(e,t){if(e<0||e>=this.innerElements.length)throw new Error("Item to remove doesn't exist 😭");var i=e<this.currentSlide,r=this.currentSlide+this.perPage-1===e;(i||r)&&this.currentSlide--,this.innerElements.splice(e,1),this.buildSliderFrame(),t&&t.call(this)}},{key:"insert",value:function(e,t,i){if(t<0||t>this.innerElements.length+1)throw new Error("Unable to inset it at this index 😭");if(-1!==this.innerElements.indexOf(e))throw new Error("The same item in a carousel? Really? Nope 😭");var r=t<=this.currentSlide>0&&this.innerElements.length;this.currentSlide=r?this.currentSlide+1:this.currentSlide,this.innerElements.splice(t,0,e),this.buildSliderFrame(),i&&i.call(this)}},{key:"prepend",value:function(e,t){this.insert(e,0),t&&t.call(this)}},{key:"append",value:function(e,t){this.insert(e,this.innerElements.length+1),t&&t.call(this)}},{key:"destroy",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments[1];if(this.detachEvents(),this.selector.style.cursor="auto",e){for(var i=document.createDocumentFragment(),r=0;r<this.innerElements.length;r++)i.appendChild(this.innerElements[r]);this.selector.innerHTML="",this.selector.appendChild(i),this.selector.removeAttribute("style")}t&&t.call(this)}}],[{key:"mergeSettings",value:function(e){var t={selector:".siema",duration:200,easing:"ease-out",perPage:1,startIndex:0,draggable:!0,multipleDrag:!0,threshold:20,loop:!1,rtl:!1,onInit:function(){},onChange:function(){}},i=e;for(var r in i)t[r]=i[r];return t}},{key:"webkitOrNot",value:function(){return"string"==typeof document.documentElement.style.transform?"transform":"WebkitTransform"}}]),e}();t.default=s,e.exports=t.default}])},"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Siema",[],t):"object"==typeof exports?exports.Siema=t():e.Siema=t()}();
            //]]>
        </script> 
    </b:includable>
```


```xml
    <b:includable id='tombolOrderWA'>
        <span class='order-produk order-wa'>
            <a class='order-wa-link' href='#'>Pesan Sekarang</a>
        </span>
    </b:includable>
```


```xml
<b:includable id='blogPostThumbnailProduk'>
        <div class='img-thumbnail'>
            <b:if cond='data:post.featuredImage'>
                <b:if cond='data:post.featuredImage.isResizable'> 
                    <a expr:href='data:post.url'>
                        <img class='lazyload' expr:alt='data:post.title' expr:data-src='resizeImage(data:post.featuredImage, 400, &quot;1:1&quot;)' expr:title='data:post.title' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAD2AAAA9gBbkdjNQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAANSURBVAiZY2BgYGAEAAAGAAKHf+MhAAAAAElFTkSuQmCC'/>
                        <div class='lazy-loading'/>
                    </a>       
                </b:if>
            <b:else/>
                <a expr:href='data:post.url'>
                    <img class='lazyload' data-src='//1.bp.blogspot.com/-sLMytth04W8/XtoBMx9lUjI/AAAAAAAAHmM/zK-toM5XTacePvBHnpIO_tfzjg63BD3ZgCK4BGAsYHg/w400-h400-n-k-no-nu/nomage%2B%25281%2529.png' expr:alt='data:post.title' expr:title='data:post.title' height='400' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAD2AAAA9gBbkdjNQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAANSURBVAiZY2BgYGAEAAAGAAKHf+MhAAAAAElFTkSuQmCC' width='400'/>
                    <div class='lazy-loading'/>
                </a>
            </b:if>
        </div>
    </b:includable>
```


```xml
<b:includable id='recentPostTitleProduk'>
        <div class='latestposts-title'>
            <h2>
                <b:if cond='data:view.search.label in [&quot;Produk&quot;,&quot;Products&quot;]'>
                    <b:switch var='data:blog.locale'><b:case value='id'/>Produk Kami<b:default/>Our Products</b:switch>
                <b:elseif cond='data:view.search.label in [&quot;Jasa&quot;,&quot;Services&quot;]'/>
                    <b:switch var='data:blog.locale'><b:case value='id'/>Jasa Kami<b:default/>Our Services</b:switch>
                </b:if>
            </h2>
        </div>
    </b:includable>
```


```xml
<b:includable id='halamanProdukCSS'>
        <style>
        #content-wrap {
            flex: 1 1 100%;
            -webkit-box-flex: 1;
        }
        #wrapper #sidebar-wrap {
            display: none;
            visibility: hidden;
        }
        #content-wrap {
            margin: 0 auto;
        }
        </style>    
    </b:includable>
```


```xml
<b:includable id='olderPostTitle'>
    <b:if cond='data:view.search.label in [&quot;Produk&quot;,&quot;Products&quot;]'>
        <b:switch var='data:blog.locale'><b:case value='id'/>Produk Lainnya<b:default/>Other Products</b:switch>
    <b:elseif cond='data:view.search.label in [&quot;Jasa&quot;,&quot;Services&quot;]'/>
        <b:switch var='data:blog.locale'><b:case value='id'/>Jasa Lainnya<b:default/>Other Services</b:switch>
    <b:else/>
        <data:messages.olderPosts/>
    </b:if>
</b:includable>

<b:includable id='newerPostTitle'>
    <b:if cond='data:view.search.label in [&quot;Produk&quot;,&quot;Products&quot;]'>
        <b:switch var='data:blog.locale'><b:case value='id'/>Produk Terbaru<b:default/>Newer Products</b:switch>
    <b:elseif cond='data:view.search.label in [&quot;Jasa&quot;,&quot;Services&quot;]'/>
        <b:switch var='data:blog.locale'><b:case value='id'/>Jasa Terbaru<b:default/>Newer Services</b:switch>
    <b:else/>
        <data:messages.newerPosts/>
    </b:if>
</b:includable>
```


```xml
<b:includable id='blogPostSnippet'>
        <b:if cond='data:post.labels any (label =&gt; label.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;])'>
            <div class='post-snippet' expr:id='&quot;post-snippet-&quot; + data:post.id'>
                <b:eval expr='snippet(data:post.snippets.long, { length: 100 })'/><b:include name='postReadMore'/>
            </div>
            <div class='js-post-snippet' expr:id='&quot;js-post-snippet-&quot; + data:post.id'>&lt;!--<b:eval expr='snippet(data:post.body, { length: 140, links: false, linebreaks: false })'/><b:include name='postReadMore'/>--&gt;</div>
        <b:else/>
            <div class='post-snippet' expr:id='&quot;post-snippet-&quot; + data:post.id'>
                <b:eval expr='snippet(data:post.snippets.long, { length: 100 })'/><b:include name='postReadMore'/>  
            </div>
        </b:if>
    </b:includable>
```


```xml
<b:includable id='featuredSnippet'>
        <b:if cond='data:postDisplay.showSnippet'>
            <b:if cond='data:post.labels any (label =&gt; label.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;])'>
                <p class='featured-desc' expr:id='&quot;featured-desc-&quot; + data:post.id'>
                    <b:eval expr='snippet(data:post.snippets.long, { length: 120 })'/>
                </p>
                <div class='js-featured-desc' expr:id='&quot;js-featured-desc-&quot; + data:post.id'>&lt;!--<b:eval expr='snippet(data:post.body, { length: 170, links: false, linebreaks: false })'/>--&gt;</div>
            <b:else/>
                <p class='featured-desc'>
                    <b:eval expr='snippet(data:post.snippets.long, { length: 120 })'/>   
                </p>
            </b:if>
        </b:if>
    </b:includable>
```


```xml
<b:includable id='defaultHomepage'>
        <b:include name='blogPostThumbnail'/>
        <div class='post-summary-wrap'>
            <b:include name='blogPostTitle'/>
            <b:if cond='data:post.labels any (label =&gt; label.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;])'>
            <b:elseif cond='data:post.labels any (label =&gt; label.name in [&quot;Advertorial&quot;,&quot;Iklan&quot;,&quot;Sponsor&quot;])'/>
                <b:include name='postInfoAdvertorial'/>
            <b:else/>
                <b:include name='postInfo'/>
            </b:if>
            <b:include name='blogPostSnippet'/>
        </div>
    </b:includable>
```


```xml
<b:includable id='post' var='post'>
        <b:include data='post' name='postMetaCustom'/>
        <b:if cond='data:view.search.label in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]'>
            <b:include name='defaultProdukIndexPage'/>
        <b:elseif cond='data:view.isPage'/>
            <b:include name='defaultStaticPage'/>
        <b:elseif cond='data:view.isPost'/>
            <b:if cond='data:posts any (p =&gt; p.labels any (l =&gt; l.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]))'>
                <b:include name='defaultProdukPage'/>
            <b:elseif cond='data:view.isPost and data:posts any (p =&gt; p.labels any (l =&gt; l.name in [&quot;Advertorial&quot;,&quot;Iklan&quot;,&quot;Sponsor&quot;]))'/>
                <b:include name='defaultPostAdPage'/>
            <b:else/>
                <b:include name='defaultPostPage'/>
            </b:if>
        <b:else/>
            <b:include name='defaultHomepage'/>
        </b:if>
    </b:includable>
```


```xml
<b:includable id='postAndComments' var='post'>
        <article class='post-outer'>
            <b:attr cond='data:view.isSingleItem' name='class' value='post-outer-single'/>
            <div class='post-content'>
                <b:include data='post' name='post'/>
            </div>
            <b:if cond='data:view.isPost'>
                <b:if cond='not(data:posts any (p =&gt; p.labels any (l =&gt; l.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;,&quot;Advertorial&quot;,&quot;Iklan&quot;,&quot;Sponsor&quot;])))'>
                    <b:include data='post' name='commentPicker'/>
                </b:if>
            </b:if>
        </article>
    </b:includable>
```


```xml
<!-- kecualikan postingan dengan label produk pada widget popular posts -->
                <b:with value='data:view.isMultipleItems or data:view.isSingleItem ? data:posts filter (p =&gt; p.labels none (l =&gt; l.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;])) : data:posts' var='posts'>
                    <b:loop index='i' values='data:posts' var='post'> 
                        <div>
                            <b:class cond='data:i == 0' name='the-most-popular'/>
                            <b:class cond='data:i != 0' name='popular-post-content'/>
                            <!-- Featured image only first post -->
                            <b:if cond='data:i == 0'>
                                <b:include name='popularPostImage'/>
                            </b:if>
                            <!-- Content -->
                            <div class='popular-post-info'>
                                <b:class cond='data:i == 0 and data:postDisplay.showFeaturedImage' name='info-has-thumbnail'/>
                                <b:include name='popularPostTitle'/>
                                <b:include name='popularPostSnippet'/>
                            </div>
                        </div>
                    </b:loop>
                </b:with>
```


```xml
<b:include cond='data:view.search.label in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]' name='recentPostTitleProduk'/>

<b:include cond='data:view.search.label not in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]' name='filterPostMessage'/>
```

```xml
<b:comment><!-- kecualikan sidebar di halaman label produk/jasa--></b:comment>
<b:if cond='data:view.search.label not in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]'>
```


```xml
<b:includable id='post' var='post'>
        <b:include data='post' name='postMetaCustom'/>
        <b:if cond='data:view.search.label in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]'>
            <b:include name='defaultProdukIndexPage'/>
        <b:elseif cond='data:view.isPage'/>
            <b:include name='defaultStaticPage'/>
        <b:elseif cond='data:view.isPost'/>
            <b:if cond='data:posts any (p =&gt; p.labels any (l =&gt; l.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;]))'>
                <b:include name='defaultProdukPage'/>
            <b:elseif cond='data:view.isPost and data:posts any (p =&gt; p.labels any (l =&gt; l.name in [&quot;Advertorial&quot;,&quot;Iklan&quot;,&quot;Sponsor&quot;]))'/>
                <b:include name='defaultPostAdPage'/>
            <b:else/>
                <b:include name='defaultPostPage'/>
            </b:if>
        <b:else/>
            <b:include name='defaultHomepage'/>
        </b:if>
    </b:includable>
```


```xml
<!-- kecualikan postingan dengan label produk pada widget popular posts -->
<b:with value='data:view.isMultipleItems or data:view.isSingleItem ? data:posts filter (p =&gt; p.labels none (l =&gt; l.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;])) : data:posts' var='posts'>
....
</b:with>
```

```xml
<b:if cond='data:postDisplay.showSnippet'>
            <b:if cond='data:post.labels any (label =&gt; label.name in [&quot;Produk&quot;,&quot;Products&quot;,&quot;Jasa&quot;,&quot;Services&quot;])'>
                <p class='featured-desc' expr:id='&quot;featured-desc-&quot; + data:post.id'>
                    <b:eval expr='snippet(data:post.snippets.long, { length: 120 })'/>
                </p>
                <div class='js-featured-desc' expr:id='&quot;js-featured-desc-&quot; + data:post.id'>&lt;!--<b:eval expr='snippet(data:post.body, { length: 170, links: false, linebreaks: false })'/>--&gt;</div>
            <b:else/>
                <p class='featured-desc'>
                    <b:eval expr='snippet(data:post.snippets.long, { length: 120 })'/>   
                </p>
            </b:if>
        </b:if>
        
<b:includable id='newerPostTitle'>
    <b:if cond='data:view.search.label in [&quot;Produk&quot;,&quot;Products&quot;]'>
        <b:switch var='data:blog.locale'><b:case value='id'/>Produk Terbaru<b:default/>Newer Products</b:switch>
    <b:elseif cond='data:view.search.label in [&quot;Jasa&quot;,&quot;Services&quot;]'/>
        <b:switch var='data:blog.locale'><b:case value='id'/>Jasa Terbaru<b:default/>Newer Services</b:switch>
    <b:else/>
        <data:messages.newerPosts/>
    </b:if>
</b:includable>

<b:includable id='olderPostTitle'>
    <b:if cond='data:view.search.label in [&quot;Produk&quot;,&quot;Products&quot;]'>
        <b:switch var='data:blog.locale'><b:case value='id'/>Produk Lainnya<b:default/>Other Products</b:switch>
    <b:elseif cond='data:view.search.label in [&quot;Jasa&quot;,&quot;Services&quot;]'/>
        <b:switch var='data:blog.locale'><b:case value='id'/>Jasa Lainnya<b:default/>Other Services</b:switch>
    <b:else/>
        <data:messages.olderPosts/>
    </b:if>
</b:includable>
```


```xml
body#layout #banner-jasa h4,body#layout #banner-produk h4,
body#layout #html-jasa h4,body#layout #html-produk h4,
body#layout #banner-jasa div.widget .widget-content,body#layout #banner-produk div.widget .widget-content,body#layout #html-jasa div.widget .widget-content,body#layout #html-produk div.widget .widget-content{background:#ecf8ff;padding:6px 12px}body#layout #banner-jasa div.widget .widget-content .editlink.icon,body#layout #banner-produk div.widget .widget-content .editlink.icon,body#layout #html-jasa div.widget .widget-content .editlink.icon,body#layout #html-produk div.widget .widget-content .editlink.icon{top:5px}
```
