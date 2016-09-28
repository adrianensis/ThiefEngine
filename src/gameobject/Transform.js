/**
* @class
* @extends {Component}
* @classdesc This class holds de position, rotation and scale of the game object.
*/
var Transform = function (){
	Component.call(this);
	this.position = new Vector3(0,0,0);
	this.rotation = new Vector3(0,0,0);
	this.scale = new Vector3(1,1,1);

	this.right = new Vector3(1,0,0);
	this.up = new Vector3(0,1,0);
	this.forward = new Vector3(0,0,1);

  this.matrix = Matrix4.identity();
  // this.parentMatrix = Matrix4.identity();
	// this.matrixStaticGenerated = false;

	this.target = this.forward.cpy();

	this.dirty = true;
};

Transform.prototype = new Component();
Transform.prototype.constructor = Transform;

//----------------------------------------------------------------------

/**
* Returns true if the game object is static.
* @returns {Boolean} True if the game object is static.
*/
Transform.prototype.isStatic = function () {
	return this.gameObject.isStatic();
};

//----------------------------------------------------------------------

/**
* Returns true if the game object is dirty.
* @returns {Boolean} True if the game object is dirty.
*/
Transform.prototype.isDirty = function () {
	return this.dirty;
};

//----------------------------------------------------------------------

/**
* Generates the local space model matrix.
*/
Transform.prototype.generateLocalSpaceMatrix = function (){
	this.matrix = Matrix4.scale(this.scale);
	this.matrix = Matrix4.mulMM(this.matrix, Matrix4.rotation(new Vector3(this.rotation.x, 0, 0)));
	this.matrix = Matrix4.mulMM(this.matrix, Matrix4.rotation(new Vector3(0, this.rotation.y, 0)));
	this.matrix = Matrix4.mulMM(this.matrix, Matrix4.rotation(new Vector3(0, 0, this.rotation.z)));
	this.matrix = Matrix4.mulMM(this.matrix, Matrix4.translation(this.position));

};

//----------------------------------------------------------------------

/**
* Initializes the model matrix.
*/
Transform.prototype.initMatrix = function (){

	this.generateLocalSpaceMatrix();

	var parent = this.getParent();

	if(parent !== null)
		this.matrix = Matrix4.mulMM(this.matrix,parent.getMatrix());

	var children = this.getChildren();

	for (c of children){
		c.initMatrix();
	}
};


//----------------------------------------------------------------------

/**
* Returns the model matrix.
* @returns {Matrix4} The model matrix.
*/
Transform.prototype.getMatrix = function (){
	return this.matrix;
};

//----------------------------------------------------------------------

/**
* Generates the model matrix.
*/
Transform.prototype.generateMatrix = function (){

	// If this transform is not static
	if(! this.isStatic()){

		var parent = this.getParent();

		// If this transform has parent -> generate local + parent matrix
		if(parent !== null && parent.isDirty()){
			this.generateLocalSpaceMatrix();
			this.matrix = Matrix4.mulMM(this.matrix,parent.getMatrix());

		// Else, generate only local matrix
		}else if(this.dirty)
			this.generateLocalSpaceMatrix();

	}

	// update children
	for (c of this.getChildren()){
		c.generateMatrix();
	}

	this.dirty = false; // clear dirty flag

	// DebugRenderer.setTransformationMatrix(this.matrix);
    // DebugRenderer.drawLine(this.position,this.position.cpy().add(this.right).mulScl(-20),Color.GREEN);
    // DebugRenderer.drawLine(new Vector3(0,0,0),new Vector3(0,0.5,0),Color.BLUE);
    // DebugRenderer.drawLine(new Vector3(0,0,0),new Vector3(0,0,0.5),Color.RED);
	// DebugRenderer.setTransformationMatrix(null);


};


//----------------------------------------------------------------------

/**
* Sets the model matrix.
* @param {Matrix4} matrix The model matrix.
*/
Transform.prototype.setMatrix = function(matrix){
	this.matrix = matrix;

	this.dirty = true;
};

//----------------------------------------------------------------------

/**
* Sets the Position.
* @param {Vector3} vec The Position.
*/
Transform.prototype.setPosition = function (vec){

	if( ! this.position.equals(vec)){
		this.dirty = true;
		this.position.set(vec);
	}
};

//----------------------------------------------------------------------

/**
* Sets the Rotation.
* @param {Vector3} vec The Rotation.
*/
Transform.prototype.setRotation = function (vec){

	if( ! this.rotation.equals(vec)){
		this.dirty = true;
		this.rotation.set(vec);
	}
};

//----------------------------------------------------------------------

/**
* Sets the Scale.
* @param {Vector3} vec The Scale.
*/
Transform.prototype.setScale = function (vec){

	if( ! this.scale.equals(vec)){
		this.dirty = true;
		this.scale.set(vec);
	}
};

//----------------------------------------------------------------------

/**
* Returns the Position.
* @returns {Vector3} The Position.
*/
Transform.prototype.getPosition = function (){
	return this.position;
};

//----------------------------------------------------------------------

/**
* Returns the Rotation.
* @returns {Vector3} The Rotation.
*/
Transform.prototype.getRotation = function (){
	return this.rotation;
};

//----------------------------------------------------------------------

/**
* Returns the Scale.
* @returns {Vector3} The Scale.
*/
Transform.prototype.getScale = function (){
	return this.scale;
};

//----------------------------------------------------------------------


/**
* Translates the game object.
* @param {Vector3} vec The vector.
*/
Transform.prototype.translate = function (vec){

	if(vec.len() > 0){
		// this.position.x = vec.x + this.position.x;
		// this.position.y = vec.y + this.position.y;
		// this.position.z = vec.z + this.position.z;

		this.position.add(vec);

		this.dirty = true;
	}
};

//----------------------------------------------------------------------

/**
* Rotates the game object.
* @param {Vector3} vec The vector.
*/
Transform.prototype.rotate = function (vec){

	if(vec.len() > 0){
		// this.rotation.x = vec.x + this.rotation.x;
		// this.rotation.y = vec.y + this.rotation.y;
		// this.rotation.z = vec.z + this.rotation.z;

		this.rotation.add(vec);

		this.dirty = true;
	}
};

//----------------------------------------------------------------------

/**
* Directs the game object to a point.
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Transform.prototype.lookAt = function (vec){

	if( ! this.target.equals(vec)){
		this.dirty = true;

		this.target = vec.cpy();

		var pos = this.position.cpy();

		this.forward = pos.sub(vec).nor();

		var yAxis = new Vector3(0,1,0);
		this.right = yAxis.cross(this.forward).nor();
		this.up = this.forward.cpy().cross(this.right);

	}


};

//----------------------------------------------------------------------
