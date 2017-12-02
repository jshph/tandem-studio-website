var prev_scrollY = 0;
var ticking = false;
const contentHeight = $('#content').offset().top;
const navHeight = $('nav').height();
var nav = $('nav');

$(document).ready(function() {

  window.addEventListener('scroll', function(e) {
    prev_scrollY = window.scrollY;
    if (!ticking && prev_scrollY < contentHeight - navHeight) {
      if (nav.hasClass('scrolled-to-limit'))
        nav.removeClass('scrolled-to-limit');

      window.requestAnimationFrame(function() {

        dim = (1 + scrollY / 30);
        console.log(dim);

        $('#logo-circle').css({
          "transform": "scale("+dim+")"
        })

        // $('#hero table').css({
        //   'margin-top': -scrollY * 2
        // })

        ticking = false;
      });

      ticking = true;

    } else {
      nav.addClass('scrolled-to-limit');
    }
  });

});