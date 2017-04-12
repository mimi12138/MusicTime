var starObj = function() {
	this.x;
	this.y;


	this.picNo;

	this.timer;

}
starObj.prototype.init = function() {
	this.x = Math.random() *w;
	this.y = Math.random()*h;

	
	this.picNo = Math.floor(Math.random() * 7);
	this.timer = 0;

	this.beta = Math.random() * Math.PI * 0.5;
}

starObj.prototype.update = function() {

	this.timer += deltaTime;
	if (this.timer > 30) {
		this.picNo += 1;
		this.picNo %= 7;
		this.timer = 0;
	}
}

starObj.prototype.draw = function() {
	ctx.drawImage(starPic, this.picNo * 7, 0, 7, 7, this.x, this.y, 7, 7);
}

function drawStars() {
	for (var i = 0; i < num; i++) {
		stars[i].update();
		stars[i].draw();
	}
}


