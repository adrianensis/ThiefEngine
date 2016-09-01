var AnimationFrame = function () {
    this.position = new Vector2(0,0);
    this.width = 1.0;
    this.height = 1.0;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
AnimationFrame.prototype.set = function (position, width, height) {
    this.position = position
    this.width = width;
    this.height = height;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
AnimationFrame.prototype.getPosition = function (){
	return this.position;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
AnimationFrame.prototype.getWidth = function (){
	return this.width;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
AnimationFrame.prototype.getHeight = function (){
	return this.height;
};

//----------------------------------------------------------------------
