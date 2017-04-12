var RADIUS;//小球半径
var LIGHTRADIUS;//探照灯半径
var LIGHTX;//探照灯原点x
var LIGHTY;//探照灯原点y
var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var endtime=new Date();//距离当前日期不能超过四天，因为hours是两位数，最多24*4=96，可以增加位数来改变
endtime.setTime(endtime.getTime()+5*1000);//距离当前时间一个小时开始倒计时
var curShowTimeSeconds=0;//现在倒计时还有多少秒
var balls=[];//存放小球的数组
window.onload=function(){
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	WINDOW_WIDTH = document.body.scrollWidth || document.documentElement.scrollWidth;
	WINDOW_HEIGHT = document.body.scrollHeight || document.documentElement.scrollHeight;
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	RADIUS=Math.round(canvas.width*4/5/108)-1;
	curShowTimeSeconds=getCurShowTimeSeconds();
	light(context);

	setInterval(
		function(){
			render(context);//绘制
			update();//改变

		},50);
	setTimeout(function(){
		document.getElementById('header').style.display='inline';
	},5000);
	 setTimeout(function(){
		window.location.href='index.html';
	},8000);
}
function light(context){
	//clip剪切
	context.beginPath();
	var backStyle=context.createLinearGradient(0,0,canvas.width,0);//自顶向下,(0,0,800,0)自左向右,(0.0.800.800)对角线
	 backStyle.addColorStop(0.0,'#000033')//关键色取值点和颜色,0.0为最小1.0为最大
	 backStyle.addColorStop(0.3,'#035');
	 backStyle.addColorStop(0.5,'#67485A');
	 backStyle.addColorStop(0.8,'#AA5C58');
	context.fillStyle=backStyle;
	context.fillRect(0,0,canvas.width,canvas.height);
	if(canvas.width<=800){
		LIGHTRADIUS=150;
		LIGHTX=canvas.width/2-20;
		LIGHTY=canvas.height/2;
	}
	else{
		LIGHTRADIUS=230;
		LIGHTX=canvas.width/2-35;
		LIGHTY=canvas.height/2;
	}
	context.beginPath();
	context.arc(LIGHTX,LIGHTY,LIGHTRADIUS,0,Math.PI*2);
	context.fillStyle='#fff';
	context.fill();
	context.clip();//把上一行绘制的路径剪切为当前的绘制环境
}

function render(cxt){//绘制时间和小球
	cxt.clearRect(0,0,canvas.width,canvas.height);
	var hours=parseInt(curShowTimeSeconds/3600);
	var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds=curShowTimeSeconds%60; 
	renderDigit(canvas.width*3/7,canvas.height/3,parseInt(seconds%10),cxt);//秒针的个位数
	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
	}
}
function renderDigit(x,y,num,cxt){//(x,y)为数组起点位置，i为行数，j为列数
	cxt.fillStyle="rgb(0,102,153)";//给每一个小球填充颜色
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				
				cxt.fill();
			}
		}
	}
	
}
function getCurShowTimeSeconds(){
	var curTime=new Date();
	//倒计时算法
	var ret=endtime.getTime()-curTime.getTime();
	ret=Math.round(ret/1000);//毫秒转换为秒
	return ret>=0?ret:0;
	//时针算法
	//var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	return ret;
}
function update(){
	var nextShowTimeSeconds=getCurShowTimeSeconds();
	var nextseconds=nextShowTimeSeconds%60;
	var curseconds=curShowTimeSeconds%60; 
	
	if(nextseconds!=curseconds){
		if(parseInt(curseconds%10)!=parseInt(nextseconds%10)){
			addBalls(canvas.width*3/7,canvas.height/3,parseInt(curseconds/10));
		}
		curShowTimeSeconds=nextShowTimeSeconds;
	}
	updateballs();
}
function updateballs(){
	
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		
		if(balls[i].y>=canvas.height-RADIUS){
			balls[i].y=canvas.height;
			balls[i].vy=-balls[i].vy*0.75;
		}
	}
	//将跳出屏幕外的小球清除，优化性能
	var count=0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+RADIUS>0&&balls[i].x-RADIUS<canvas.width){
			balls[count++]=balls[i];
		}
	}
	while(balls.length>Math.min(300,count)){
		balls.pop();
	}
}
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aball={
					x:x+j*2*(RADIUS+1),
					y:y+i*2*(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,//Math.pow(-1,Math.cell(Math.radom()*1000))这句话得到的结果是随机正负1
					vy:-5,//也可随机
					color:getRandomColor()
				}
				balls.push(aball);
			}
		}
	}
}
function getRandomColor()
{
	var c='#';
	var cArray=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
	for(var i=0;i<6;i++)
	{
		var cIndex=Math.round(Math.random()*15);
		c+=cArray[cIndex];
	}
	return c;
}