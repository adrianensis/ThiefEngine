/**
* @class
* @extends {Camera}
* @classdesc This class represents an Orthographic Projection camera.
* @param {Number} left The distance of the left plane.
* @param {Number} right The distance of the right plane.
* @param {Number} bottom The distance of the bottom plane.
* @param {Number} top The distance of the top plane.
* @param {Number} near The distance of the near plane.
* @param {Number} far The distance of the far plane.
*/
var OrthoCamera = function (left, right, bottom, top, near, far){
	Camera.call(this,Matrix4.ortho(left, right, bottom, top, near, far));

    this.left = left;
    this.right = right;
    this.bottom = bottom;
    this.top = top;
    this.near = near;
    this.far = far;

};

OrthoCamera.prototype = new Camera();
OrthoCamera.prototype.constructor = OrthoCamera;

//----------------------------------------------------------------------
