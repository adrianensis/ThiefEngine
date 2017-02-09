/**
* @class
* @classdesc This class represents a Texture.
*/
var Texture = function (name,data){
  this.name = name;
  this.data = data;
};

//----------------------------------------------------------------------

/**
* Return the data of the texture.
* @returns {Image} The data.
*/
Texture.prototype.getData = function (){
	return this.data;
};

//----------------------------------------------------------------------

/**
* Return the name of the texture.
* @returns {String} The name.
*/
Texture.prototype.getName = function (){
	return this.name;
};

//----------------------------------------------------------------------

/**
* Return the width of the texture.
* @returns {Number} The width.
*/
Texture.prototype.getWidth = function (){
	return this.data.width;
};

//----------------------------------------------------------------------

/**
* Return the height of the texture.
* @returns {Number} The height.
*/
Texture.prototype.getHeight = function (){
	return this.data.height;
};

//----------------------------------------------------------------------
