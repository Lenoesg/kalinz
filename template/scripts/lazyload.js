<b:comment><!-- LAZYLOAD.JS - Script untuk lazy loading images -->
</b:comment>
<script type='text/javascript'>
  <b:comment><!-- Lazy load images -->
  </b:comment>
  (function() {
    'use strict';
    if ('IntersectionObserver' in window) {
      var lazyImages = document.querySelectorAll('img[data-lazy]');
      var imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            img.src = img.dataset.lazy;
            img.removeAttribute('data-lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      lazyImages.forEach(function(img) { imageObserver.observe(img); });
    }
  })();
</script>
