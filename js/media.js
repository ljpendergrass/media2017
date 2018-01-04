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




function placeStickers(section, config, minAngle, maxAngle,) {
  var sectionXMax = $(section).width();
  var sectionYMax = $(section).height();
  var stickers    = $(section).children();
  var div         = sectionYMax/(stickers.length);
  var placeY      = 0;
  var i = 0;
  // var randOffset  = (getRandomInt(-($(stickers[0]).width()),($(stickers[0]).width())));

  var musicConfig = [ // manual offsets
    (($(stickers[0]).width())/5),
    sectionXMax - (($(stickers[1]).width())*1.25),
    (sectionXMax/2) - (($(stickers[2]).width())/2),
    sectionXMax - (($(stickers[3]).width())*1.25),
    (($(stickers[4]).width())/5),
    (sectionXMax/2) - (($(stickers[5]).width())/2),
    (($(stickers[6]).width())/5),
    sectionXMax - (($(stickers[7]).width())*1.25)
  ];
  if (config === "music"){
    for (stickerIndiv of stickers) {
      var stickerWidth  = $(stickerIndiv).width();
      var randomOffsetX = (getRandomInt(-(stickerWidth/4),(stickerWidth/4))); // offset X by a quarter of sticker size
      var randomOffsetY = (getRandomInt(-(stickerWidth/9),(stickerWidth/9))); // offset Y by an even smaller amount
      var randomDeg = getRandomInt(minAngle, maxAngle);
      $(stickerIndiv).css({ top: placeY + randomOffsetY + "px", left: musicConfig[i] + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      placeY += div - 80;
      i += 1;
    };
  };
  if (config === "film"){
    for (stickerIndiv of stickers) {
      var stickerWidth  = $(stickerIndiv).width();
      var randomOffsetX = (getRandomInt(-(stickerWidth/9),(stickerWidth/9))); // offset X
      // var randomOffsetY = (getRandomInt(0,(stickerWidth/10))); // offset Y, slight only downwards
      var randomDeg = getRandomInt(minAngle, maxAngle);

      if ((i === 0) || ((i%2) === 0)){
        var alignX = 16;
      } else {
        var alignX = sectionXMax - $(stickerIndiv).width(); // alignment is right with 1/9th additional space
      };

      $(stickerIndiv).css({ top: placeY + "px", left: alignX + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      placeY += div;
      i += 1;
    };
  };
  if (config === "television"){
    i = 6;
    for (stickerIndiv of stickers) {
      var stickerWidth  = $(stickerIndiv).width();
      var randomOffsetX = (getRandomInt(-(stickerWidth/4),(stickerWidth/4))); // offset X by a quarter of sticker size
      var randomOffsetY = (getRandomInt(-(stickerWidth/9),(stickerWidth/9))); // offset Y by an even smaller amount
      var randomDeg = getRandomInt(minAngle, maxAngle);
      $(stickerIndiv).css({ top: placeY + randomOffsetY + "px", left: musicConfig[i] + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      placeY += div - 80;
      i -= 1;
    };
  };

};

// vars
var divHover = null;     // stickers util
var windowClick = false;  // stickers util

$(function(){

  // sticker positioning at load
  placeStickers(".sticker-area-album", "music", -60, 60);
  placeStickers(".sticker-area-songs", "music", -60, 60);
  placeStickers(".sticker-area-films", "film",  -10, 10);
  placeStickers(".sticker-area-television", "television",  -10, 10);



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
    if(windowClick && (divHover != null)){
      var areaOffsetY = $(divHover).parent().position().top - $(window).scrollTop(); // correct for combined Y difference of scroll + sticker area
      var areaOffsetX = $(divHover).parent().offset().left; // this offset corrects for X coord of sticker area
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
