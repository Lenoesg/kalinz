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