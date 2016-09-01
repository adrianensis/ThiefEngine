var RenderContext = function (){
  this.lights = null;
  this.camera = null;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
RenderContext.prototype.getLights = function (){
	return this.lights;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
RenderContext.prototype.setLights = function (lights){
	this.lights=lights;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
RenderContext.prototype.getCamera = function (){
	return this.camera;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
RenderContext.prototype.setCamera = function (camera){
	this.camera=camera;
};

//----------------------------------------------------------------------
