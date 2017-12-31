$(document).ready(function() {
  var menuAttached = false, //defualt menu state
      skipHeight = $("#nav-bar").position().top, // get height of nav bar in container
      menuDetachHeight = $("#nav-bar").position().top + 1; // set default for reset

  $(window).scroll(function() {

    // console.log("window scrolltop: " + $(window).scrollTop());

    if (($(window).scrollTop() > skipHeight) && !menuAttached ) {
      menuDetachHeight = $(window).scrollTop(); // Remember height of menu attach

      $('#nav-bar').addClass('navbar-fixed');
      $('.media-menu').addClass('attached');
      $('.spacer').removeClass('hide');


      $('.rotator-container').addClass('menu-attached');

      menuAttached = true; // report menu attached
      // console.log("Menu attached");

    };
    if (($(window).scrollTop() < menuDetachHeight) && menuAttached ) {
      $('#nav-bar').removeClass('navbar-fixed');
      $('.media-menu').removeClass('attached');
      $('.spacer').addClass('hide');

      $('.rotator-container').removeClass('menu-attached');


      menuAttached = false; // report menu attached
      // console.log("Menu default");
      skipHeight = $("#nav-bar").position().top; // get height of nav bar in container

    };
  });
});

// input a month (0-11)
// match month to img url
// update bgimg of .month-bg
var monthBgUrls = [
'img/monthbg/monthbg-00.jpg',
'img/monthbg/monthbg-01.jpg',
'img/monthbg/monthbg-02.jpg',
'img/monthbg/monthbg-03.jpg',
'img/monthbg/monthbg-04.jpg',
'img/monthbg/monthbg-05.jpg',
'img/monthbg/monthbg-06.jpg',
'img/monthbg/monthbg-07.jpg',
'img/monthbg/monthbg-08.jpg',
'img/monthbg/monthbg-09.jpg',
'img/monthbg/monthbg-10.jpg',
'img/monthbg/monthbg-11.jpg'
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
