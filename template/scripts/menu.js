<b:comment><!-- MENU.JS - Script untuk menu navigasi interaktif -->
</b:comment>
<script type='text/javascript'>
  <b:comment><!-- Mobile menu toggle -->
  </b:comment>
  (function() {
    'use strict';
    var menuToggle = document.querySelector('.menu-toggle');
    var navMenu = document.querySelector('nav');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
      });
    }
  })();
</script>
