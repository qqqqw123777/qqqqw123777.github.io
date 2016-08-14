var li = $("li");
var card = $(".card");
var top = li.length;
var cards = 4;

(function(){
	if(window.innerWidth > 1551){
		cards = 4;
	}else if(window.innerWidth < 1551 && window.innerWidth > 1115){
		cards = 3;
	}else if(window.innerWidth < 1115 && window.innerWidth > 783){
		cards = 2;
	}else if(window.innerWidth < 783){
		cards = 1;
	}
  var s = Math.floor(window.innerWidth / li.length) - 10;
  var w = Math.floor(window.innerWidth / cards) - 10;
  $("li").css("width", s + "px");
  $(".card").css("width", w + "px");
})

window.onresize = function(){
	if(window.innerWidth > 1551){
		cards = 4;
	}else if(window.innerWidth <1551 && window.innerWidth > 1115){
		cards = 3;
	}else if(window.innerWidth < 1115 && window.innerWidth > 783){
		cards = 2;
	}else if(window.innerWidth < 783){
		cards = 1;
	}
  var s = Math.floor(window.innerWidth / li.length) - 10;
  var w = Math.floor(window.innerWidth / cards) - 10;
  $("li").css("width", s + "px");
  $(".card").css("width", w + "px");
}