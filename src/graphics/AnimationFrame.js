var AnimationFrame = function () {
    this.position = new Vector2(0,0);
    this.width = 1.0;
    this.height = 1.0;
};

//----------------------------------------------------------------------

AnimationFrame.prototype.set = function (position, width, height) {
    this.position = position
    this.width = width;
    this.height = height;
};

//----------------------------------------------------------------------

AnimationFrame.prototype.getPosition = function (){
	return this.position;
};

//----------------------------------------------------------------------

AnimationFrame.prototype.getWidth = function (){
	return this.width;
};

//----------------------------------------------------------------------

AnimationFrame.prototype.getHeight = function (){
	return this.height;
};

//----------------------------------------------------------------------
