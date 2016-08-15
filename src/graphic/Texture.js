var Texture = function (name,data){
  this.name = name;
  this.data = data;
};

//----------------------------------------------------------------------

Texture.prototype.getData = function (){
	return this.data;
};

//----------------------------------------------------------------------

Texture.prototype.getName = function (){
	return this.name;
};

//----------------------------------------------------------------------

Texture.prototype.getWidth = function (){
	return this.data.width;
};

//----------------------------------------------------------------------

Texture.prototype.getHeight = function (){
	return this.data.height;
};

//----------------------------------------------------------------------
