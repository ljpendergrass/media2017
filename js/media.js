// util
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

function placeStickers(section, config, minAngle, maxAngle,) {
  var sectionXMax = $(section).width();
  var sectionYMax = $(section).height();
  var stickers    = $(section).children();
  var div         = sectionYMax/(stickers.length); //default, may not need
  var placeY      = 0;
  var i = 0;

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
  var gameConfig = [ // manual offsets
    (sectionXMax/2) - (($(stickers[2]).width())/2), // C
    32,                                             // L
    sectionXMax - (($(stickers[1]).width())+32),    // R
    (sectionXMax/2) - (($(stickers[2]).width())/2), // C
    32,                                             // L
    sectionXMax - (($(stickers[1]).width())+32),    // R
    (sectionXMax/2) - (($(stickers[2]).width())/2), // C
    32,                                             // L
    sectionXMax - (($(stickers[1]).width())+32)     // R

  ];
  if (config === "music"){
    var stickerOverlap = 100;
    var div = (sectionYMax - stickerOverlap)/(stickers.length);
    for (stickerIndiv of stickers) {
      var stickerWidth  = $(stickerIndiv).width();
      var randomOffsetX = (getRandomInt(-(stickerWidth/4),(stickerWidth/4))); // offset X by a quarter of sticker size
      var randomOffsetY = (getRandomInt(-(stickerWidth/9),(stickerWidth/9))); // offset Y by an even smaller amount
      var randomDeg = getRandomInt(minAngle, maxAngle);
      $(stickerIndiv).css({ top: placeY + randomOffsetY + "px", left: musicConfig[i] + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      placeY += div;
      i += 1;
    };
  };
  if (config === "film"){
    var stickerOverlap = 400;
    var div = (sectionYMax - stickerOverlap)/(stickers.length);
    for (stickerIndiv of stickers) {
      var stickerWidth  = $(stickerIndiv).width();
      var randomOffsetX = (getRandomInt(-(stickerWidth/9),(stickerWidth/9))); // offset X
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
    var stickerOverlap = 230;
    var div = (sectionYMax - stickerOverlap)/(stickers.length);
    for (stickerIndiv of stickers) {
      var stickerWidth  = $(stickerIndiv).width();
      var randomOffsetX = (getRandomInt(-16,16)); // offset X by a quarter of sticker size
      var randomOffsetY = (getRandomInt(-16,16)); // offset Y by an even smaller amount
      var randomDeg = getRandomInt(minAngle, maxAngle);
      if (i === 6) {
        $(stickerIndiv).css({ top: placeY + randomOffsetY + "px", left: musicConfig[3] + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      } else {
        $(stickerIndiv).css({ top: placeY + randomOffsetY + "px", left: musicConfig[i] + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      };
      placeY += div;
      i += 1;
    };
  };
  if (config === "game"){
    var stickerOverlap = 150;
    var div = (sectionYMax - stickerOverlap)/6;
    for (stickerIndiv of stickers) {
      var stickerWidth  = $(stickerIndiv).width();
      var randomOffsetX = (getRandomInt(-16,16)); // offset X
      var randomOffsetY = (getRandomInt(-16,16)); // offset Y
      var randomDeg = getRandomInt(minAngle, maxAngle);
      $(stickerIndiv).css({ top: placeY + randomOffsetY + "px", left: gameConfig[i] + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      i += 1;
      if (((i+1) % 3) != 0) {
        placeY += div;
      };
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
  placeStickers(".sticker-area-game", "game",  -10, 10);

  // end sticker positioning at load
  // init doc ready vars
  var menuAttached = false;                                 // defualt menu state (unattached)
  var skipHeight = $("#nav-bar").position().top;            // get height of nav bar in container
  var menuDetachHeight = $("#nav-bar").position().top + 1;  // set default for reset
  var currentMenuStyle = "default";
  var sections = [
    ".films-container",
    ".television-container",
    ".game-container"
  ];
  var sectionTops = [
    $(sections[0]).position().top, // films section
    $(sections[1]).position().top,  // television section
    $(sections[2]).position().top // games section
  ];
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

  function menuStyler(section) {
    var topOffset = $("#nav-bar").outerHeight(); // offset for menu
    // var topOffset = 0; // TODO
    switch (true) {
      case ($(window).scrollTop() < (sectionTops[0] - topOffset)) && (currentMenuStyle != "default"):
        $("#nav-bar").removeClass(currentMenuStyle);
        $("#Layer_1").removeClass(currentMenuStyle);
        currentMenuStyle = "default";
        $("#nav-bar").addClass(currentMenuStyle);
        $("#Layer_1").addClass(currentMenuStyle);
        // console.log("Menu style is default");
        break;
      case (($(window).scrollTop() > (sectionTops[0] - topOffset)) && (($(window).scrollTop()) < (sectionTops[1] - topOffset))) && (currentMenuStyle != "films"):
        $("#nav-bar").removeClass(currentMenuStyle);
        $("#Layer_1").removeClass(currentMenuStyle);
        currentMenuStyle = "films";
        $("#nav-bar").addClass(currentMenuStyle);
        $("#Layer_1").addClass(currentMenuStyle);
        // console.log("Menu Style is Films");
        break;
        case (($(window).scrollTop() > (sectionTops[1] - topOffset)) && (($(window).scrollTop()) < (sectionTops[2] - topOffset))) && (currentMenuStyle != "television"):
        $("#nav-bar").removeClass(currentMenuStyle);
        $("#Layer_1").removeClass(currentMenuStyle);
        currentMenuStyle = "television";
        $("#nav-bar").addClass(currentMenuStyle);
        $("#Layer_1").addClass(currentMenuStyle);
        currentMenuStyle = "television";
        // console.log("Menu Style is Television");
        break;
      case ($(window).scrollTop() > (sectionTops[2] - topOffset)) && (currentMenuStyle != "game"):
        $("#nav-bar").removeClass(currentMenuStyle);
        $("#Layer_1").removeClass(currentMenuStyle);
        currentMenuStyle = "game";
        $("#nav-bar").addClass(currentMenuStyle);
        $("#Layer_1").addClass(currentMenuStyle);
        currentMenuStyle = "game";
        // console.log("Menu Style is Game");
        break;
    };
  };

  // begin menu logic
  function menuScroll() {
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
    // menu style update

  };
  // run menuScroll on window scroll
  $(window).scroll(function() {
    menuScroll();
    menuStyler();
  // end menu logic
  });
  // run menuScroll on page load if scrolled beyond detach height
  if ($(window).scrollTop() > skipHeight ) {
    menuScroll();
    menuDetachHeight = $(".intro").outerHeight() + $(".introspace").outerHeight() // simulate menu height and override default menuScroll behavior as to avoid 'flicker'
    // console.log($(".intro").outerHeight() + $(".introspace").outerHeight()); debug
    menuStyler();
  };
// end doc ready
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
