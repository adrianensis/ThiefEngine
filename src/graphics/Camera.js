var Camera = function (matrix){
	Component.call(this);
	this.target = null;
	this.projectionMatrix = matrix;
	this.frustum = new Frustum(this);
	this.viewMatrix = Matrix4.identity();
};

Camera.prototype = new Component();
Camera.prototype.constructor = Camera;

//----------------------------------------------------------------------

Camera.prototype.getFrustum = function (){
	return this.frustum;
};

//----------------------------------------------------------------------

Camera.prototype.setProjection = function (projectionMatrix){
    this.projectionMatrix = projectionMatrix;
};

//----------------------------------------------------------------------

Camera.prototype.getProjectionMatrix = function (){
    return this.projectionMatrix;
};

//----------------------------------------------------------------------

Camera.prototype.getViewMatrix = function (){

	var t = this.gameObject.getTransform();

	if(t.isDirty()){
		this.viewMatrix = new Matrix4(
	        t.right,
	        t.up,
	        t.forward,
	        new Vector4(0,0,0,1));

		this.viewMatrix = Matrix4.mulMM( Matrix4.translation(t.position.cpy().mulScl(-1)),this.viewMatrix);

		// viewMatrix.print()
	}


	return this.viewMatrix;
};

//----------------------------------------------------------------------
