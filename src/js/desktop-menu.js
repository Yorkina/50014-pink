;
(function() {
var linkNav = document.querySelectorAll('[href^="#nav"]'),
    V = 0.5;
for (var i = 0; i < linkNav.length; i++) {
  linkNav[i].addEventListener('click', function(e) {
    e.preventDefault();
    var scroll = window.pageYOffset,
        hash = this.href.replace(/[^#]*(.*)/, '$1');
        position = document.querySelector(hash).getBoundingClientRect().top,
        start = null;
    requestAnimationFrame(step);
    function step(time) {
      if (start === null) start = time;
      var progress = time - start,
          roll = (position < 0 ? Math.max(w - progress/V, scroll + position) : Math.min(scroll + progress/V, scroll + position));
      window.scrollTo(0,roll);
      if (roll != scroll + position) {
        requestAnimationFrame(step)
      } else {
        location.hash = hash;
      }
    }
  }, false);
}
})();
