var PerspectiveCamera = function (near, far, aspect, fov){
	Camera.call(this,Matrix4.perspective(near, far, aspect, fov));

	this.near = near;
	this.far = far;
	this.aspect = aspect;
	this.fov = fov;
};

PerspectiveCamera.prototype = new Camera();
/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
PerspectiveCamera.prototype.constructor = PerspectiveCamera;

//----------------------------------------------------------------------
