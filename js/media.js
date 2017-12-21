$(document).ready(function() {

  $(window).scroll(function () {
      //if you hard code, then use console
      //.log to determine when you want the
      //nav bar to stick.
      // console.log($(window).scrollTop())
    if ($(window).scrollTop() > 448) {
      $('#nav-bar').addClass('navbar-fixed');
      $('.spacer').removeClass('hide');
    }
    if ($(window).scrollTop() < 449) {
      $('#nav-bar').removeClass('navbar-fixed');
      $('.spacer').addClass('hide');
    }
  });
});
