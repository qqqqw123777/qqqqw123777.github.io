var li = $("li");
var card = $(".card");

window.onload = function(){
  var s = Math.floor(window.innerWidth / li.length) - 10;
  var w = Math.floor(window.innerWidth / 4) - 10;
  $("li").css("width", s + "px");
  $(".card").css("width", w + "px");
}

window.onresize = function(){
  var s = Math.floor(window.innerWidth / li.length) - 10;
  var w = Math.floor(window.innerWidth / 4) - 10;
  $("li").css("width", s + "px");
  $(".card").css("width", w + "px");
}