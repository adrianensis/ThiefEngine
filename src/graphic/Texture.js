var Texture = function (name,data){
  this.name = name;
  this.data = data;
};

//----------------------------------------------------------------------

Texture.prototype.getData = function (){
	return this.data;
};

//----------------------------------------------------------------------

Texture.prototype.setData = function (data){
	this.data=data;
};

//----------------------------------------------------------------------

Texture.prototype.getName = function (){
	return this.name;
};

//----------------------------------------------------------------------
