var total = 17;//图片总数

var zWin = $(window);//获取窗口
var cid;//目前大图id索引
var wImage = $('#large_img');//获取大图img
var imgDom = wImage[0];//获取大图img的Dom
//根据img数据渲染出图片列表
var render = function(){
	var padding = 2;
	var winWidth = zWin.width();
	var picWidth = Math.floor((winWidth - padding * 3) / 4);
	var tmpl = '';
	for(var i = 1; i<= total; i++){
		var p = padding; 
		var imgSrc = 'image/' + i + '.jpg';
		if( i % 4 == 1){
			p = 0;
		}
		tmpl += '<li class="animated bounceIn" data-id="' + i + '" style="width:' + picWidth + 'px;height:' + picWidth + 'px;padding-left:' + p + 'px;"><canvas id="cvs_' + i + '"><canvas/></li>';
		var imageObj = new Image();
		imageObj.index = i;
		imageObj.onload = function(){
			var cvs = $('#cvs_' + this.index)[0];
			var cvs_2d = cvs.getContext('2d');
			cvs.width = this.width;
			cvs.height = this.height;
			cvs_2d.drawImage(this, 0, 0);
		}
		imageObj.src = imgSrc;

		$('#container').html(tmpl);
	}
}
//初始化
render();
//串口大小改变时重新渲染
window.onresize = function(){
	render();
}
//给列表进行时间绑定，来显示大图
$('#container').delegate('li', 'tap', function(){
	var _id = $(this).attr('data-id');
	cid = _id;
	loadImg(_id);
});

//大图交互逻辑，点击关闭，左右滑动切换
$('#large_container').tap(function(){
	wImage.attr('src', '').attr('class', '');
	$(this).hide();
}).swipeLeft(function(){
	wImage.attr('class', '');
	cid++;
	if(cid > total){
		cid = total;
	}else{
		loadImg(cid, function(){
			wImage.addClass('animated bounceInRight');
		});
	}
}).swipeRight(function(){
	wImage.attr('class', '');
	cid--;
	if(cid < 1){
		cid = 1;
	}else{
		loadImg(cid, function(){
			wImage.addClass('animated bounceInLeft');
		});
	}
});
/**
 * 显示大图
 * @param  {number}   id       图片序列id
 * @param  {Function} callback 回调函数，用来显示动画
 */
function loadImg(id, callback){
	$('#large_container').css({
		width : zWin.width(),
		height : zWin.height(),
		top : zWin.scrollTop()
	}).show();
	var imgSrc = 'image/' + id + '.large.jpg';
	var imageObj = new Image();
	imageObj.src = imgSrc;
	imageObj.onload = function(){
		var w = this.width;
		var h = this.height;
		var winWidth = zWin.width();
		var winHeight = zWin.height();
		if(h/w>=1.2){
			var realW = winHeight * w/h;
			var paddingLeft = parseInt((winWidth - realW) / 2);
			wImage.attr('src', imgSrc).css('height', winHeight).css('width', realW).css('padding-left', paddingLeft).css('padding-top', 0);
		}else{
			var realH = winWidth * h/w;
			var paddingTop = parseInt((winHeight - realH) / 2);
			wImage.attr('src', imgSrc).css('width', winWidth).css('height', realH).css('padding-top', paddingTop). css('padding-left', 0);
		}
		if(callback){
			callback();
		}
	}
}