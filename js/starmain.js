var can;
var ctx;

var w;
var h;

var deltaTime;
var lastTime;

var starPic = new Image();

var stars = [];
var num = 50;

$(document).ready(function () {
	can = document.getElementById("canvas");
	ctx = can.getContext("2d");
	var cheight=document.getElementById('panel_2').offsetHeight;
	var cwidth=document.getElementById('panel_2').offsetWidth;
	can.width= cwidth;
	can.height=cheight;
	w=can.width;
	h=can.height;

	starPic.src = "img/star.png";

	for (var i = 0; i < num; i++) {
		stars[i] = new starObj();
		stars[i].init();
	}

	lastTime = Date.now();
	gameLoop();
});

function gameLoop() {
	window.requestAnimationFrame(gameLoop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	sky();
	drawStars();
	fillMoon(ctx, 2, w* 0.9, h * 0.15, 50, 30);
}

function sky() {
	var radialGrad = ctx.createRadialGradient(w/ 2, h, 0,w / 2, h, h);
	radialGrad.addColorStop(0.0, '#035');
	radialGrad.addColorStop(1.0, 'black');
	ctx.fillStyle = radialGrad;
	ctx.fillRect(0, 0, w, h);
}
function fillMoon(cxt,d,x,y,R,rot,/*option*/fillColor){
	cxt.save();
	cxt.translate(x,y);
	cxt.rotate(rot*Math.PI/180);
	cxt.scale(R,R);
	pathMoon(cxt,d);
	cxt.fillStyle=fillColor||'#ffff00';
	cxt.shadowColor='#f0e68c';
	cxt.shadowOffsetX=1.5;
	cxt.shadowBlur=1.5;
	cxt.fill();
	cxt.restore();
}
function pathMoon(cxt,d){
	cxt.beginPath();
	cxt.arc(0,0,1,0.5*Math.PI,1.5*Math.PI,true);
	cxt.moveTo(0,-1);
	cxt.arcTo(d,0,0,1,dis(0,-1,d,0)/d);
	cxt.closePath();
}
function dis(x1,y1,x2,y2){
	return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
