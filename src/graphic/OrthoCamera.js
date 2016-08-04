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

// OrthoCamera.prototype.contains = function (renderer){
//
// 	var rendererPos = renderer.getGameObject().getTransform().position;
//
// 	var width = this.right*2;
// 	var height = this.top*2;
//
// 	var center = this.gameObject.getTransform().position.cpy();
// 	center.z = 0;
//
// 	var LT = new Vector3(center.x-(width/2),center.y+(height/2), center.z); // LEFT TOP VERTEX
// 	var LB = new Vector3(LT.x, LT.y - height, center.z); // LEFT BOTTOM
// 	var RB = new Vector3(LT.x + width, LT.y - height, center.z); // RIGHT BOTTOM
// 	var RT = new Vector3(LT.x + width, LT.y, center.z); // RIGHT TOP
//
// 	var m = this.getViewMatrix();
// 	var vertices = [Matrix4.mulMV(m,LT), Matrix4.mulMV(m,LB), Matrix4.mulMV(m,RB), Matrix4.mulMV(m,RT)];
//
// 	//
// 	// var result = false;
// 	//
// 	// for (var i = 0; (v < vertices.length) && ! collision; i++) {
// 	// 	result = result || (LT.x < vertices[i].x && LT.y > vertices[i].y &&
// 	// 	LT.x + width > vertices[i].x && LT.y - height < vertices[i].y);
// 	// }
// 	//
// 	// return result;
//
// 	// get box closest point to sphere center by clamping
// 	var x = Math.max(LB.x, Math.min(rendererPos.x, RB.x));
// 	var y = Math.max(LB.y, Math.min(rendererPos.y, RT.y));
// 	var z = Math.max(LB.z, Math.min(rendererPos.z, LB.z));
//
// 	var distance = rendererPos.dst(new Vector3(x,y,z));
//
// 	return distance < renderer.getMesh().getRadius();
// };
