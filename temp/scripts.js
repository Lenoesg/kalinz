!function(){
    var containers = document.querySelectorAll(".featured-img-bg");
    containers.forEach(function(container) {
        var img = container.querySelector("img");
        if (img) {
            ["data-src", "srcset", "src"].forEach(function(attr) {
                var val = img.getAttribute(attr);
                if (val && val.indexOf("-p-k-no-nu") !== -1) {
                    img.setAttribute(attr, val.replace(/-p-k-no-nu/g, "-c-rw"));
                }
            });
        }
    });
}();