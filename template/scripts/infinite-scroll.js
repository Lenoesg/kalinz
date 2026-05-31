<b:comment><!-- INFINITE-SCROLL.JS - Script untuk infinite scroll -->
</b:comment>
<script type='text/javascript'>
  <b:comment><!-- Infinite scroll pagination -->
  </b:comment>
  (function() {
    'use strict';
    var isLoading = false;
    
    window.addEventListener('scroll', function() {
      if (isLoading) return;
      
      var scrollTop = window.scrollY;
      var documentHeight = document.documentElement.scrollHeight;
      var windowHeight = window.innerHeight;
      
      if (scrollTop + windowHeight >= documentHeight - 500) {
        <b:comment><!-- Load more posts -->
        </b:comment>
      }
    });
  })();
</script>
