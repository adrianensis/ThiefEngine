/**
* @class
* @classdesc This class represents a frame of an animation.
*/
var AnimationFrame = function () {
    this.position = new Vector2(0,0);
    this.width = 1.0;
    this.height = 1.0;
};

//----------------------------------------------------------------------

/**
* Set the animation frame.
* @param {Vector2} position The position of the frame.
* @param {Number} width The width of the frame.
* @param {Number} height The height of the frame.
*/
AnimationFrame.prototype.set = function (position, width, height) {
    this.position = position
    this.width = width;
    this.height = height;
};

//----------------------------------------------------------------------

/**
* Return the position.
* @returns {Vector2} The position of the frame.
*/
AnimationFrame.prototype.getPosition = function (){
	return this.position;
};

//----------------------------------------------------------------------

/**
* Return the width.
* @returns {Number} The width of the frame.
*/
AnimationFrame.prototype.getWidth = function (){
	return this.width;
};

//----------------------------------------------------------------------

/**
* Return the height.
* @returns {Number} The height of the frame.
*/
AnimationFrame.prototype.getHeight = function (){
	return this.height;
};

//----------------------------------------------------------------------
