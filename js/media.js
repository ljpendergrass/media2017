$(document).ready(function() {

  $(window).scroll(function () {
    var skipHeight = $(".month-bg").height();
    if ($(window).scrollTop() > skipHeight) {
      $('#nav-bar').addClass('navbar-fixed');
      $('.spacer').removeClass('hide');
    }
    if ($(window).scrollTop() < (skipHeight - 1)) {
      $('#nav-bar').removeClass('navbar-fixed');
      $('.spacer').addClass('hide');
    }
  });
});

// input a month (0-11)
// match month to img url
// update bgimg of .month-bg
var monthBgUrls = [
'http://via.placeholder.com/2000x1000?text=January',
'http://via.placeholder.com/2000x1000?text=February',
'http://via.placeholder.com/2000x1000?text=March',
'http://via.placeholder.com/2000x1000?text=April',
'http://via.placeholder.com/2000x1000?text=May',
'http://via.placeholder.com/2000x1000?text=June',
'http://via.placeholder.com/2000x1000?text=July',
'http://via.placeholder.com/2000x1000?text=August',
'http://via.placeholder.com/2000x1000?text=September',
'http://via.placeholder.com/2000x1000?text=October',
'http://via.placeholder.com/2000x1000?text=November',
'http://via.placeholder.com/2000x1000?text=December'
];

function monthBgHover(monthIndex) {
  // debug array
  // console.log(monthBgUrls[monthIndex]);

  var month = monthBgUrls[monthIndex];
  $(".month-bg").css('background-image',"url('" + month + "')");
};
