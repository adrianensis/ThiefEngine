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
* Returns the data of the texture.
* @returns {Image} The data.
*/
Texture.prototype.getData = function (){
	return this.data;
};

//----------------------------------------------------------------------

/**
* Returns the name of the texture.
* @returns {String} The name.
*/
Texture.prototype.getName = function (){
	return this.name;
};

//----------------------------------------------------------------------

/**
* Returns the width of the texture.
* @returns {Number} The width.
*/
Texture.prototype.getWidth = function (){
	return this.data.width;
};

//----------------------------------------------------------------------

/**
* Returns the height of the texture.
* @returns {Number} The height.
*/
Texture.prototype.getHeight = function (){
	return this.data.height;
};

//----------------------------------------------------------------------
