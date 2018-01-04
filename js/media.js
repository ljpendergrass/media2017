// begin svg place logic
// input sticker section
// get dimensions of sticker section
// get children in section
//
// apply random X,Y and deg foreach sticker in section

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

function placeStickers(section) {
  var sectionXMax = $(section).width();
  var sectionYMax = $(section).height();
  var stickers    = $(section).children();
  var div         = sectionYMax/(stickers.length);
  var placeY      = 0;
  var minAngle    = -100;
  var maxAngle    = 100;

  for (stickerIndiv of stickers) {
    var stickerWidth  = $(stickerIndiv).width();
    var stickerHeight = placeY;
    var randomX   = getRandomInt(0, (sectionXMax - stickerWidth));
    var randomY   = stickerHeight;
    var randomDeg = getRandomInt(minAngle, maxAngle);
    $(stickerIndiv).css({ top: randomY + "px", left: randomX + "px", transform: "rotate(" + randomDeg + "deg)"});
    placeY += div;
  };
};

// vars
var divHover = null;     // stickers util
var windowClick = false;  // stickers util

$(function(){

  // sticker positioning at load
  placeStickers(".sticker-area-music");

  // vars
  var menuAttached = false;                                 // defualt menu state
  var  skipHeight = $("#nav-bar").position().top;            // get height of nav bar in container
  var  menuDetachHeight = $("#nav-bar").position().top + 1;  // set default for reset
  // end init vars

  // begin sticker logic

  $(window).mousedown(function(){ windowClick = true;   });
  $(window).mouseup(function(){   windowClick = false;  });

  $('.sticker').hover(function(){
    if(divHover === null){
      divHover = $(this);
    }
  }, function(){
    if(windowClick === false){
      divHover = null;
      $(this).css("z-index", "0");
    }
  });

  $(window).mousemove(function(e){
    var areaOffsetY = $(".sticker-area-music").position().top - $(window).scrollTop(), // correct for combined Y difference of scroll + sticker area
        areaOffsetX = $(".sticker-area-music").offset().left; // this offset corrects for X coord of sticker area
    if(windowClick && (divHover != null)){
      divHover.css({ top: (e.clientY - divHover.height() / 2) - areaOffsetY + 'px', left: (e.clientX - divHover.width() / 2) - areaOffsetX + 'px', position: 'absolute', zIndex: '1' });
    }
  });

  // end sticker logic

  // begin menu logic
  $(window).scroll(function() {

    // console.log("window scrolltop: " + $(window).scrollTop());

    if (($(window).scrollTop() > skipHeight) && !menuAttached ) {
      menuDetachHeight = $(window).scrollTop(); // Remember height of menu attach

      $("#nav-bar").addClass("navbar-fixed");
      $(".media-menu").addClass("attached");
      $(".spacer").removeClass("hide");


      $(".rotator-container").addClass("menu-attached");

      menuAttached = true; // report menu attached
      // console.log("Menu attached");

    };
    if (($(window).scrollTop() < menuDetachHeight) && menuAttached ) {
      $("#nav-bar").removeClass("navbar-fixed");
      $(".media-menu").removeClass("attached");
      $(".spacer").addClass("hide");

      $(".rotator-container").removeClass("menu-attached");


      menuAttached = false; // report menu attached
      // console.log("Menu default");
      skipHeight = $("#nav-bar").position().top; // get height of nav bar in container

    };
  });
  // end menu logic
});

// begin monthbg logic
// input a month (0-11)
// match month to img url
// update bgimg of .month-bg
var monthBgUrls = [
"img/monthbg/monthbg-00.jpg",
"img/monthbg/monthbg-01.jpg",
"img/monthbg/monthbg-02.jpg",
"img/monthbg/monthbg-03.jpg",
"img/monthbg/monthbg-04.jpg",
"img/monthbg/monthbg-05.jpg",
"img/monthbg/monthbg-06.jpg",
"img/monthbg/monthbg-07.jpg",
"img/monthbg/monthbg-08.jpg",
"img/monthbg/monthbg-09.jpg",
"img/monthbg/monthbg-10.jpg",
"img/monthbg/monthbg-11.jpg"
];

function monthBgHover(monthIndex) {
  // debug array
  // console.log(monthBgUrls[monthIndex]);

  var month = monthBgUrls[monthIndex];
  $(".month-bg").css('background-image',"url('" + month + "')");
};
// end monthbg logic
