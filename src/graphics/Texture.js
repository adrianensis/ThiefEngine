var Texture = function (name,data){
  this.name = name;
  this.data = data;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Texture.prototype.getData = function (){
	return this.data;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Texture.prototype.getName = function (){
	return this.name;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Texture.prototype.getWidth = function (){
	return this.data.width;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Texture.prototype.getHeight = function (){
	return this.data.height;
};

//----------------------------------------------------------------------
