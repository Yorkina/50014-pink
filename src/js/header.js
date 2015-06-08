(function() {
    var btnMenu = document.querySelector(".header__btn-menu");
    var headerHeadline = document.querySelector(".header__head-line");

    var handler = function(event) {
        event.preventDefault();
        if (!this.classList.contains("header__btn-menu--closed")) {
            this.classList.add("header__btn-menu--closed");
            headerHeadline.classList.add("header__head-line--menu-style");
        } else {
            this.classList.remove("header__btn-menu--closed");
            headerHeadline.classList.remove("header__head-line--menu-style");
        }
    };
    btnMenu.addEventListener("tap", handler);
    btnMenu.addEventListener("click", handler);
})();
