var Transform = function (){
	Component.call(this);
	this.position = new Vector3(0,0,0);
	this.rotation = new Vector3(0,0,0);
	this.scale = new Vector3(1,1,1);

	this.right = new Vector3(1,0,0);
	this.up = new Vector3(0,1,0);
	this.forward = new Vector3(0,0,1);

  this.matrix = Matrix4.identity();
	// this.matrixStaticGenerated = false;

	this.target = this.forward.cpy();

	this.dirty = true;
	this.matrixCreated = false;
};

Transform.prototype = new Component();
Transform.prototype.constructor = Transform;

Transform.prototype.isStatic = function () {
	return this.gameObject.isStatic();
};

Transform.prototype.isDirty = function () {
	return this.dirty;
};

Transform.prototype.generateMatrix = function (){
	// MATRIX
	this.matrix = Matrix4.scale(this.scale);
	this.matrix = Matrix4.mulMM(this.matrix, Matrix4.rotation(new Vector3(this.rotation.x, 0, 0)));
	this.matrix = Matrix4.mulMM(this.matrix, Matrix4.rotation(new Vector3(0, this.rotation.y, 0)));
	this.matrix = Matrix4.mulMM(this.matrix, Matrix4.rotation(new Vector3(0, 0, this.rotation.z)));
	this.matrix = Matrix4.mulMM(this.matrix, Matrix4.translation(this.position));

	var parent = this.getParent();

	if(parent !== null)
		this.matrix = Matrix4.mulMM(this.matrix,parent.getMatrix());

		this.matrixCreated = true;
};

Transform.prototype.getMatrix = function (){

	if(! this.matrixCreated)
		this.generateMatrix();

	if(! this.isStatic()){
		if(this.dirty){
			this.generateMatrix();

			this.dirty = false;
		}
	}



	// DebugRenderer.setTransformationMatrix(this.matrix);
    // DebugRenderer.drawLine(this.position,this.position.cpy().add(this.right).mulScl(-20),Color.GREEN);
    // DebugRenderer.drawLine(new Vector3(0,0,0),new Vector3(0,0.5,0),Color.BLUE);
    // DebugRenderer.drawLine(new Vector3(0,0,0),new Vector3(0,0,0.5),Color.RED);
	// DebugRenderer.setTransformationMatrix(null);

	return this.matrix;
};

Transform.prototype.setMatrix = function(matrix){
	this.matrix = matrix;

	this.dirty = true;
};

Transform.prototype.setPosition = function (vec){

	if( ! this.position.equals(vec)){
		this.dirty = true;

		// this.position.x = vec.x;
		// this.position.y = vec.y;
		// this.position.z = vec.z;

		this.position.set(vec);
	}
};

Transform.prototype.setRotation = function (vec){

	if( ! this.rotation.equals(vec)){
		this.dirty = true;

		// this.rotation.x = vec.x;
		// this.rotation.y = vec.y;
		// this.rotation.z = vec.z;

		this.rotation.set(vec);
	}
};

Transform.prototype.setScale = function (vec){

	if( ! this.scale.equals(vec)){
		this.dirty = true;

		// this.scale.x = vec.x;
		// this.scale.y = vec.y;
		// this.scale.z = vec.z;

		this.scale.set(vec);
	}
};

Transform.prototype.getPosition = function (){
	return this.position;
};

Transform.prototype.getRotation = function (){
	return this.rotation;
};

Transform.prototype.getScale = function (){
	return this.scale;
};


Transform.prototype.translate = function (vec){

	if(vec.len() > 0){
		// this.position.x = vec.x + this.position.x;
		// this.position.y = vec.y + this.position.y;
		// this.position.z = vec.z + this.position.z;

		this.position.add(vec);

		this.dirty = true;
	}
};

Transform.prototype.rotate = function (vec){

	if(vec.len() > 0){
		// this.rotation.x = vec.x + this.rotation.x;
		// this.rotation.y = vec.y + this.rotation.y;
		// this.rotation.z = vec.z + this.rotation.z;

		this.rotation.add(vec);

		this.dirty = true;
	}
};

Transform.prototype.setScale = function (vec){

	if(vec.len() > 0){
		// this.scale.x = vec.x; //+ this.scale.x;
		// this.scale.y = vec.y; //+ this.scale.y;
		// this.scale.z = vec.z; //+ this.scale.z;

		this.scale.set(vec);

		this.dirty = true;
	}
};

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
