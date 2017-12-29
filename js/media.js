$(document).ready(function() {
  var menuAttached = false //defualt menu state

  $(window).scroll(function () {

    // set height of elements
    var skipHeight = ($(".month-bg").height()) - ($("#nav-bar").outerHeight());

    // logging
    // console.log("Height .month-bg:" + ($(".month-bg").outerHeight()) + ", Height #nav-bar:" + ($("#nav-bar").outerHeight()));
    // console.log("window scrolltop: " + $(window).scrollTop());

    if (($(window).scrollTop() > skipHeight) && !menuAttached ) {
      $('#nav-bar').addClass('navbar-fixed');
      $('.media-menu').addClass('attached');
      $('.spacer').removeClass('hide');

      menuAttached = true; // report menu attached
      // console.log("Menu attached");

    };
    if (($(window).scrollTop() < skipHeight + 1) && menuAttached ) {
      $('#nav-bar').removeClass('navbar-fixed');
      $('.media-menu').removeClass('attached');

      $('.spacer').addClass('hide');

      menuAttached = false; // report menu attached
      // console.log("Menu default");
    };
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


var divHover = null,
    windowClick = false;

$(function(){
  $(window).mousedown(function(){
    windowClick = true;
  });

  $(window).mouseup(function(){
    windowClick = false;
  });

  $('.sticker').hover(function(){
    if(divHover === null){
      divHover = $(this);
    }
  }, function(){
    if(windowClick === false){
      divHover = null;
      $(this).css('z-index', '0');
    }
  });

  $(window).mousemove(function(e){
    var areaOffsetY = $(".sticker-area").position().top - $(window).scrollTop(), // correct for combined Y difference of scroll + sticker area
        areaOffsetX = $(".sticker-area").offset().left; // this offset corrects for X coord of sticker area
    if(windowClick && (divHover != null)){
      divHover.css({ top: (e.clientY - divHover.height() / 2) - areaOffsetY + 'px', left: (e.clientX - divHover.width() / 2) - areaOffsetX + 'px', position: 'absolute', zIndex: '1' });
    }
  });
})
