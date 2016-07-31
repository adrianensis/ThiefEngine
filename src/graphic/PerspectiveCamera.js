var PerspectiveCamera = function (near, far, aspect, fov){
	Camera.call(this,Matrix4.perspective(near, far, aspect, fov));

	this.near = near;
	this.far = far;
	this.aspect = aspect;
	this.fov = fov;
};

PerspectiveCamera.prototype = new Camera();
PerspectiveCamera.prototype.constructor = PerspectiveCamera;

// PerspectiveCamera.prototype.contains = function (renderer){
// 	return true;
// }
