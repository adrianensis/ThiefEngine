var Camera = function (matrix){
	Component.call(this);
	this.target = null;
	this.projectionMatrix = matrix;
	this.frustum = new Frustum(this);
	this.viewMatrix = Matrix4.identity();
};

Camera.prototype = new Component();
/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Camera.prototype.constructor = Camera;

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Camera.prototype.getFrustum = function (){
	return this.frustum;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Camera.prototype.setProjection = function (projectionMatrix){
    this.projectionMatrix = projectionMatrix;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Camera.prototype.getProjectionMatrix = function (){
    return this.projectionMatrix;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
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
