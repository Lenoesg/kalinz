<b:comment><!-- TOC.JS - Script untuk table of contents -->
</b:comment>
<script type='text/javascript'>
  <b:comment><!-- Table of contents generator -->
  </b:comment>
  (function() {
    'use strict';
    function generateTableOfContents() {
      var headings = document.querySelectorAll('h2, h3, h4');
      var toc = document.createElement('ul');
      
      headings.forEach(function(heading, index) {
        heading.id = heading.id || 'heading-' + index;
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;
        li.appendChild(a);
        toc.appendChild(li);
      });
      
      return toc;
    }
  })();
</script>
