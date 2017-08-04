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
  this.translationMatrix = Matrix4.identity();
  this.rotationMatrix = Matrix4.identity();
  this.scaleMatrix = Matrix4.identity();

	this.target = this.forward.cpy();

	this.dirty = true;
};

Transform.prototype = new Component();
Transform.prototype.constructor = Transform;

//----------------------------------------------------------------------

/**
* Return true if the game object is static.
* @returns {Boolean} True if the game object is static.
*/
Transform.prototype.isStatic = function () {
	return this.gameObject.isStatic();
};

//----------------------------------------------------------------------

/**
* Return true if the game object is dirty.
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

	// this.translationMatrix = Matrix4.identity();
	this.rotationMatrix = Matrix4.identity();
	// this.scaleMatrix = Matrix4.identity();

	this.scaleMatrix = Matrix4.scale(this.scale);
	this.translationMatrix = Matrix4.translation(this.position);

	if(this.rotation.x !== 0)
		this.rotationMatrix = Matrix4.mulMM(this.rotationMatrix, Matrix4.rotation(new Vector3(this.rotation.x, 0, 0)));
	if(this.rotation.y !== 0)
		this.rotationMatrix = Matrix4.mulMM(this.rotationMatrix, Matrix4.rotation(new Vector3(0, this.rotation.y, 0)));
	if(this.rotation.z !== 0)
		this.rotationMatrix = Matrix4.mulMM(this.rotationMatrix, Matrix4.rotation(new Vector3(0, 0, this.rotation.z)));

	this.matrix = Matrix4.mulMM(Matrix4.mulMM(this.scaleMatrix, this.translationMatrix),this.rotationMatrix);



};

//----------------------------------------------------------------------

/**
* Initializes the model matrix.
*/
Transform.prototype.initMatrix = function (){

	this.generateLocalSpaceMatrix();

	var parent = this.getParent();

	if(parent !== null)
		this.matrix = Matrix4.mulMM(parent.getMatrix(), this.matrix);

	var children = this.getChildren();

	for (var c of children){
		c.initMatrix();
	}
};


//----------------------------------------------------------------------

/**
* Return the model matrix.
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
			this.matrix = Matrix4.mulMM(parent.getMatrix(),this.matrix);

			// console.log(this.position.cpy().add(parent.position));
			// console.log(this.position);

		// Else, generate only local matrix
		}else if(this.dirty)
			this.generateLocalSpaceMatrix();
	}

	// update children
	for (var c of this.getChildren()){
		c.generateMatrix();
	}



	this.dirty = false; // clear dirty flag


	var pos = this.getPosition();

	// DebugRenderer.drawLine(pos,this.right.cpy().add(pos),Color.RED);
  // DebugRenderer.drawLine(pos,this.up.cpy().add(pos),Color.BLUE);
  // DebugRenderer.drawLine(pos,this.forward.cpy().add(pos),Color.GREEN);

};

//----------------------------------------------------------------------

/**
* Set the model matrix.
* @param {Matrix4} matrix The model matrix.
*/
Transform.prototype.setMatrix = function(matrix){
	this.matrix = matrix;

	this.dirty = true;
};

//----------------------------------------------------------------------

/**
* Set the Position.
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
* Set the Rotation.
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
* Set the Scale.
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
* Return the Position.
* @returns {Vector3} The Position.
*/
Transform.prototype.getPosition = function (){

	var parent = this.getParent();
	if(parent !== null){

		this.position.w = 1;

		var worldPos = Matrix4.mulMV(Matrix4.mulMM(this.translationMatrix,Matrix4.mulMM(parent.translationMatrix,parent.rotationMatrix)),this.position);
		return worldPos;
	}

	return this.position;
};

//----------------------------------------------------------------------

/**
* Return the Rotation.
* @returns {Vector3} The Rotation.
*/
Transform.prototype.getRotation = function (){
	return this.rotation;
};

//----------------------------------------------------------------------

/**
* Return the Scale.
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

	if(vec.len() > 0)
		this.setPosition(this.position.cpy().add(vec));
};

//----------------------------------------------------------------------

/**
* Rotates the game object.
* @param {Vector3} vec The vector.
*/
Transform.prototype.rotate = function (vec){

	if(vec.len() > 0){

		this.rotation.add(vec);

		this.dirty = true;
	}
};

//----------------------------------------------------------------------

Transform.prototype.lookAt = function (vec){

	this.dirty = true;

	this.target = vec.cpy();

	var pos = this.getPosition().cpy();

	this.forward = this.target.cpy().sub(pos).nor();
	// this.forward = pos.sub(this.target).nor();
	// console.log(this.forward);

	var yAxis = new Vector3(0,1,0);
	this.right = yAxis.cross(this.forward).nor();
	this.up = this.forward.cpy().cross(this.right);

};

//----------------------------------------------------------------------
