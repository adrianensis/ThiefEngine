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
