var RenderContext = function (){
  this.lights = null;
  this.camera = null;
};

//----------------------------------------------------------------------

RenderContext.prototype.getLights = function (){
	return this.lights;
};

//----------------------------------------------------------------------

RenderContext.prototype.setLights = function (lights){
	this.lights=lights;
};

//----------------------------------------------------------------------

RenderContext.prototype.getCamera = function (){
	return this.camera;
};

//----------------------------------------------------------------------

RenderContext.prototype.setCamera = function (camera){
	this.camera=camera;
};

//----------------------------------------------------------------------
