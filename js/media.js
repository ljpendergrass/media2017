$(window).on("load", function() {
  $(".rotator-container").delay(400).removeClass("unload");
  $(".curtain").delay(400).fadeOut(400);
});

// Globalvars ------------------------------------------------------------------
let divHover = null;     // stickers util
let windowClick = false;  // stickers util
const mobileBreakpoint = 768;
let menuAttached;
let skipHeight;
let menuDetachHeight;
let currentMenuStyle;
let sections = [];
let sectionTops = [];
let menuClick;
const monthBgUrls = [
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
// End Globalvars


// Functions -------------------------------------------------------------------

// util ------------------------------------------------------------------------
// Random Int
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
// end random int

// Month hover event
function monthBgHover(monthIndex) {
  let month = monthBgUrls[monthIndex];
  $(".month-bg").css("background-image","url('" + month + "')");
}
// end util

// Spawn stickers function -----------------------------------------------------
function placeStickers(section, config, stickerAmount, minAngle, maxAngle) {
  let i           = 0;
  let placeY      = 0;
  let sectionXMax = $(section).width();
  let sectionYMax = $(section).height();
  let stickers    = $(section).children();
  let windowWidth = $(window).width();
  let musicConfig = [ // manual offsets
    (($(stickers[0]).width())/5),
    sectionXMax - (($(stickers[1]).width())*1.25),
    (sectionXMax/2) - (($(stickers[2]).width())/2),
    sectionXMax - (($(stickers[3]).width())*1.25),
    (($(stickers[4]).width())/5),
    (sectionXMax/2) - (($(stickers[5]).width())/2),
    (($(stickers[6]).width())/5),
    sectionXMax - (($(stickers[7]).width())*1.25)
  ];
  let gameConfig = [ // manual offsets
    (sectionXMax/2) - (($(stickers[2]).width())/2), // Center
    32,                                             // Left
    sectionXMax - (($(stickers[1]).width())+32),    // Right
    (sectionXMax/2) - (($(stickers[2]).width())/2), // C
    32,                                             // L
    sectionXMax - (($(stickers[1]).width())+32),    // R
    (sectionXMax/2) - (($(stickers[2]).width())/2), // C
    32,                                             // L
    sectionXMax - (($(stickers[1]).width())+32)     // R
  ];

  if ((config === "music") && (windowWidth >= mobileBreakpoint)){
    let stickerOverlap = 40;
    let div = (sectionYMax - stickerOverlap)/(stickers.length);
    for (stickerIndiv of stickers) {
      let stickerWidth  = $(stickerIndiv).width();
      let randomOffsetX = (getRandomInt(-(stickerWidth/4),(stickerWidth/4))); // offset X by a quarter of sticker size
      let randomOffsetY = (getRandomInt(-(stickerWidth/9),(stickerWidth/9))); // offset Y by an even smaller amount
      let randomDeg = getRandomInt(minAngle, maxAngle);
      $(stickerIndiv).css({ top: placeY + randomOffsetY + "px", left: musicConfig[i] + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      placeY += div - stickerOverlap;
      i += 1;
    };
  };
  if ((config === "film") && (windowWidth >= mobileBreakpoint)){
    let stickerOverlap = 400;
    let div = (sectionYMax - stickerOverlap)/(stickers.length);
    let alignx = 16;
    for (stickerIndiv of stickers) {
      let stickerWidth  = $(stickerIndiv).width();
      let randomOffsetX = (getRandomInt(-(stickerWidth/9),(stickerWidth/9))); // offset X
      let randomDeg     = getRandomInt(minAngle, maxAngle);

      if ((i === 0) || ((i%2) === 0)){
        alignX = 16;
      } else {
        alignX = sectionXMax - $(stickerIndiv).width(); // alignment is right with 1/9th additional space
      };

      $(stickerIndiv).css({ top: placeY + "px", left: alignX + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      placeY += div;
      i += 1;
    };
  };
  if ((config === "television") && (windowWidth >= mobileBreakpoint)){
    let stickerOverlap = 260;
    let div = (sectionYMax - stickerOverlap)/(stickers.length);
    for (stickerIndiv of stickers) {
      let stickerWidth  = $(stickerIndiv).width();
      let randomOffsetX = (getRandomInt(-16,16)); // offset X by a quarter of sticker size
      let randomOffsetY = (getRandomInt(-16,16)); // offset Y by an even smaller amount
      let randomDeg = getRandomInt(minAngle, maxAngle);
      if (i === 6) {
        $(stickerIndiv).css({ top: placeY + randomOffsetY + "px", left: musicConfig[3] + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      } else {
        $(stickerIndiv).css({ top: placeY + randomOffsetY + "px", left: musicConfig[i] + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      };
      placeY += div;
      i += 1;
    };
  };
  if ((config === "game") && (windowWidth >= mobileBreakpoint)){
    let stickerOverlap = 150;
    let div = (sectionYMax - stickerOverlap)/6;
    for (stickerIndiv of stickers) {
      let stickerWidth  = $(stickerIndiv).width();
      let randomOffsetX = (getRandomInt(-16,16)); // offset X
      let randomOffsetY = (getRandomInt(-16,16)); // offset Y
      let randomDeg = getRandomInt(minAngle, maxAngle);
      $(stickerIndiv).css({ top: placeY + randomOffsetY + "px", left: gameConfig[i] + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      i += 1;
      if (((i+1) % 3) != 0) {
        placeY += div;
      };
    };
  };
  if (windowWidth < mobileBreakpoint) {
    let div = (sectionYMax)/stickerAmount;
    for (stickerIndiv of stickers) {
      let stickerWidth  = $(stickerIndiv).width();
      let stickerHeight = $(stickerIndiv).height();
      let randomOffsetX = (getRandomInt(-16,16)); // offset X
      let randomOffsetY = (getRandomInt(-8,2)); // offset Y
      let randomDeg = getRandomInt(minAngle/3, maxAngle/3);
      $(stickerIndiv).css({ top: placeY + randomOffsetY + "px", left: ((sectionXMax/2) - (stickerWidth/2)) + randomOffsetX + "px", transform: "rotate(" + randomDeg + "deg)"});
      placeY += ((div + div + (stickerHeight))/3);
    };
  };
};
// end spawn stickers function

// Menu Scroll Function --------------------------------------------------------
function menuScroll() {
  if (($(window).scrollTop() > skipHeight) && !menuAttached ) { // attach menu
    menuDetachHeight = $(".intro").outerHeight() + $(".introspace").outerHeight() // simulate menu height in order to avoid nasty things caused by selecting window scroll

    $("#nav-bar").addClass("navbar-fixed");
    $(".media-menu").addClass("attached");
    $(".spacer").removeClass("hide");

    $(".rotator-container").addClass("menu-attached");

    menuAttached = true; // report menu attached
    // console.log("Menu attached");

  };
  if (($(window).scrollTop() < menuDetachHeight) && menuAttached ) { // detach menu
    $("#nav-bar").removeClass("navbar-fixed");
    $(".media-menu").removeClass("attached");
    $(".spacer").addClass("hide");

    $(".rotator-container").removeClass("menu-attached");

    menuAttached = false; // report menu unattached
    // console.log("Menu default");
    skipHeight = $("#nav-bar").position().top; // get height of nav bar in container
  };
  // menu style update
}
// End Menu scroll

// menuUtilities Begin
function menuUtilities(newStyle){
  $("#nav-bar").removeClass(currentMenuStyle);
  $("#Layer_1").removeClass(currentMenuStyle);
  $("span."+currentMenuStyle).removeClass("active");
  currentMenuStyle = newStyle;
  $("#nav-bar").addClass(currentMenuStyle);
  $("#Layer_1").addClass(currentMenuStyle);
  $("span."+newStyle).addClass("active");
  // console.log("Menu style is " + newStyle);
}
// menuUtilities End

// Menustyler
function menuStyler(section) {
  let topOffset = $("#nav-bar").outerHeight(); // offset for menu
  // let topOffset = 0; // TODO
  switch (true) {
    case ($(window).scrollTop() < (sectionTops[0] - topOffset)) && (currentMenuStyle != "default"):
      menuUtilities("default");
      // console.log("Menu styler fired as default");
      break;
    case (($(window).scrollTop() > (sectionTops[0] - topOffset)) && (($(window).scrollTop()) < (sectionTops[1] - topOffset))) && (currentMenuStyle != "films"):
      menuUtilities("films");
      // console.log("Menu styler fired as films");
      break;
      case (($(window).scrollTop() > (sectionTops[1] - topOffset)) && (($(window).scrollTop()) < (sectionTops[2] - topOffset))) && (currentMenuStyle != "television"):
      menuUtilities("television");
      // console.log("Menu styler fired as television");
      break;
    case ($(window).scrollTop() > (sectionTops[2] - topOffset)) && (currentMenuStyle != "game"):
      menuUtilities("game");
      // console.log("Menu styler fired as game");
      break;
  };
}
// End Menustyler

// End Functions

// Document Ready --------------------------------------------------------------
$(function(){
  // update vars
  menuAttached = false;                                 // defualt menu state (unattached)
  skipHeight = $("#nav-bar").position().top;            // get height of nav bar in container
  menuDetachHeight = $("#nav-bar").position().top + 1;  // set default for reset
  detachHeightInit = $("#nav-bar").position().top + 1;  // set default for reset
  currentMenuStyle = "default";
  sections = [
    ".films-container",
    ".television-container",
    ".game-container"
  ];
  sectionTops = [
    $(sections[0]).position().top, // films section
    $(sections[1]).position().top,  // television section
    $(sections[2]).position().top // games section
  ];
  // end update vars

  // sticker positioning at load
  placeStickers(".sticker-area-album",      "music",      8, -60, 60);
  placeStickers(".sticker-area-songs",      "music",      8, -60, 60);
  placeStickers(".sticker-area-films",      "film",       8, -10, 10);
  placeStickers(".sticker-area-television", "television", 7, -10, 10);
  placeStickers(".sticker-area-game",       "game",       9, -10, 10);
  // end sticker positioning at load

  // Sticker updating logic ----------------------------------------------------
  // click events
  $(window).mousedown(function(){ windowClick = true;   });
  $(window).mouseup(function(){   windowClick = false;  });

  // hover selecting
  $(".sticker").hover(function(){
    if(divHover === null){
      divHover = $(this);
    }
  }, function(){
    if(windowClick === false){
      divHover = null;
      $(this).css("z-index", "0");
    }
  });

  // move stickers based on offsets based on sticker area + cursor, etc
  $(window).mousemove(function(e){
    if(windowClick && (divHover != null)){
      let areaOffsetY = $(divHover).parent().position().top - $(window).scrollTop(); // correct for combined Y difference of scroll + sticker area
      let areaOffsetX = $(divHover).parent().offset().left; // this offset corrects for X coord of sticker area, virtually zero
      divHover.css({ top: (e.clientY - divHover.height() / 2) - areaOffsetY + 'px', left: (e.clientX - divHover.width() / 2) - areaOffsetX + 'px', position: 'absolute', zIndex: '1' });
    }
  });
  // end sticker logic

  // run menuScroll on window scroll
  $(window).scroll(function() {
    menuScroll();
    menuStyler();
  // end menu logic
  });
  // run menuScroll on page load if scrolled beyond detach height
  if ($(window).scrollTop() > skipHeight ) {
    menuScroll();
    menuStyler();
  };
});

// End Doc Ready ---------------------------------------------------------------
