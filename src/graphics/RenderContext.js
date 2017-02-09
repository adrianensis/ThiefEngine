/**
* @class
* @classdesc This class holds the elements tha are shared by the renderers, like the camera.
*/
var RenderContext = function (){
  // this.lights = null;
  this.camera = null;
};

//----------------------------------------------------------------------

// RenderContext.prototype.getLights = function (){
// 	return this.lights;
// };

//----------------------------------------------------------------------

// RenderContext.prototype.setLights = function (lights){
// 	this.lights=lights;
// };

//----------------------------------------------------------------------

/**
* Return the camera.
* @returns {Camera} The camera
*/
RenderContext.prototype.getCamera = function (){
	return this.camera;
};

//----------------------------------------------------------------------

/**
* Set the camera.
* @param {Camera} camera The camera.
*/
RenderContext.prototype.setCamera = function (camera){
	this.camera=camera;
};

//----------------------------------------------------------------------
