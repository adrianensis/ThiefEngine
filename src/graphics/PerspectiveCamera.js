/**
* @class
* @extends {Camera}
* @classdesc This class represents an Perspective Projection camera.
* @param {Number} near The distance of the near plane.
* @param {Number} far The distance of the far plane.
* @param {Number} aspect The aspect ratio.
* @param {Number} fov The Field of View, in degrees.
*/
var PerspectiveCamera = function (near, far, aspect, fov){
	Camera.call(this,Matrix4.perspective(near, far, aspect, fov));

	this.near = near;
	this.far = far;
	this.aspect = aspect;
	this.fov = fov;
};

PerspectiveCamera.prototype = new Camera();
PerspectiveCamera.prototype.constructor = PerspectiveCamera;

//----------------------------------------------------------------------
