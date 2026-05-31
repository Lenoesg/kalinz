<b:comment><!-- SEARCH.JS - Script untuk fungsi pencarian -->
</b:comment>
<script type='text/javascript'>
  <b:comment><!-- Search functionality -->
  </b:comment>
  (function() {
    'use strict';
    var searchForm = document.querySelector('.search-form');
    var searchInput = document.querySelector('.search-input');
    
    if (searchForm) {
      searchForm.addEventListener('submit', function(e) {
        if (!searchInput.value.trim()) {
          e.preventDefault();
        }
      });
    }
  })();
</script>
