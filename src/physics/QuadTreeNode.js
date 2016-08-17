var QuadTreeNode = function (leftTop, width, height, minWidth, minHeight, tree){
	this.LT = leftTop;
	this.width = width;
	this.height = height;
	this.minWidth = minWidth;
	this.minHeight = minHeight;
	this.tree = tree;

	// console.log("NEW NODE: LT:" + this.LT.x + "," + this.LT.y + " w:" + this.width + " h:" + this.height);

	this.colliders = [];
	this.children = new Array(4);

	this.children[0] = null;
	this.children[1] = null;
	this.children[2] = null;
	this.children[3] = null;

	// This array testPartialCollider the LeftTop Vertices of the 4 children.
	this.LTArray = new Array(4);
	this.LTArray[0] = new Vector2(this.LT.x, this.LT.y);
	this.LTArray[1] = new Vector2(this.LT.x, this.LT.y - this.height/2);
	this.LTArray[2] = new Vector2(this.LT.x + this.width/2, this.LT.y - this.height/2);
	this.LTArray[3] = new Vector2(this.LT.x + this.width/2, this.LT.y);

	this.enabledChildren = 0;
};

//----------------------------------------------------------------------

QuadTreeNode.prototype.draw = function() {
	DebugRenderer.setTransformationMatrix(Matrix4.identity());

	DebugRenderer.drawLine(this.LT, this.LT.cpy().add(new Vector3(this.width,0,0)),Color.RED);
	DebugRenderer.drawLine(this.LT, this.LT.cpy().add(new Vector3(0,-this.height,0)),Color.RED);
	DebugRenderer.drawLine(this.LT.cpy().add(new Vector3(0,-this.height,0)), this.LT.cpy().add(new Vector3(this.width,-this.height,0)),Color.RED);
	DebugRenderer.drawLine(this.LT.cpy().add(new Vector3(this.width,-this.height,0)), this.LT.cpy().add(new Vector3(this.width,0,0)),Color.RED);

	DebugRenderer.setTransformationMatrix(null);
};

//----------------------------------------------------------------------


QuadTreeNode.prototype.isLeaf = function() {
	return this.enabledChildren === 0;
};

//----------------------------------------------------------------------

QuadTreeNode.prototype.getCollidersCount = function() {
	return this.colliders.length;
};

//----------------------------------------------------------------------

QuadTreeNode.prototype.testCompleteCollider = function (collider){

	var vertices = collider.getBoundingBox();

	var collision = true;

	for (var v = 0; (v < vertices.length); v++) {
		collision = collision && GeometryUtil.testRectanglePoint(this.LT,this.width,this.height,vertices[v]);
	}

	return collision;



};

//----------------------------------------------------------------------

QuadTreeNode.prototype.testPartialCollider = function (collider){

	var vertices = collider.getBoundingBox();

	var collision = false;

	for (var v = 0; (v < vertices.length) && ! collision; v++) {
		collision = collision  || GeometryUtil.testRectanglePoint(this.LT,this.width,this.height,vertices[v]);
	}

	return collision;
};

//----------------------------------------------------------------------

QuadTreeNode.prototype.childNodeTestPartialCollider = function (i, collider){

	var vertices = collider.getBoundingBox();

	var collision = false;

	// For each collider vertex
	for (var v = 0; (v < vertices.length) && ! collision; v++) {
		collision = collision  || GeometryUtil.testRectanglePoint(this.LTArray[i],this.width/2,this.height/2,vertices[v]);
	}

	return collision;
};

//----------------------------------------------------------------------

QuadTreeNode.prototype.createChildNode = function (i){
	this.enabledChildren++;
	return new QuadTreeNode(this.LTArray[i], this.width/2, this.height/2, this.minWidth, this.minHeight, this.tree);
};

//----------------------------------------------------------------------

QuadTreeNode.prototype.isDivisible = function (){
 	return (this.width/2 >= this.minWidth) && (this.height/2 >= this.minHeight);
};

//----------------------------------------------------------------------

QuadTreeNode.prototype.addCollider = function (collider){

	// If this node is divisible
	if(this.isDivisible()){
		//console.log("IS DIVISIBLE");

		// For each "posible" child node
		for (var i = 0; i < this.LTArray.length; i++){

			var isPartiallyInChildren = this.childNodeTestPartialCollider(i,collider);

			if( ( ! collider.isStatic()) || isPartiallyInChildren){

				if(isPartiallyInChildren){

					// If child doesn't exist, create it.
					if(this.children[i] === null)
						this.children[i] = this.createChildNode(i);

					this.children[i].addCollider(collider);
				}

			}
		}

	}else{

		if ( ( ! collider.isStatic()) || this.testPartialCollider(collider)) {

			var found = false;

			for (var i = 0; !found && i < this.colliders.length; i++) {
				found = (this.colliders[i].getId() == collider.getId());
			}

			if(!found){
				this.colliders.push(collider);
				// console.log("ADD COLLIDER " + collider.getId() +" TO -> " + this.LT.x + "," + this.LT.y + " w:" + this.width + " h:" + this.height);
			}
		}
	}
};

//----------------------------------------------------------------------

QuadTreeNode.prototype.update = function (){

	// this.draw();

	var exitColliders = []; // colliders which have left the node.

	// If is leaf node.
	if(this.isLeaf()){

		// console.log(this.colliders.length);

		// FOR EACH COLLIDER
		for (var i = 0; i < this.colliders.length; i++){

			// if collider has left the node.
			if(this.checkExit(this.colliders[i]))
				exitColliders.push(this.colliders[i]);

			// if there are 2 or more colliders within the same node.
			if(this.colliders.length > 1){

				// CHECK COLLISIONS WITH THE OTHERS COLLIDERS
				for (var j= 0; j < this.colliders.length; j++){

					// ifthey aren't the same collider
					if(this.colliders[i].getId() !== this.colliders[j].getId()){

						// check bounding radius
						if(this.colliders[i].checkCollisionRadius(this.colliders[j])){

							// candidate vertices
							var vertices = this.colliders[i].getCandidateVertices(this.colliders[j]);

							// Compute candidates and generate contacts
							var contacts = [];
							var status = this.colliders[i].generateContacts(vertices, this.colliders[j], contacts);

							this.tree.addContacts(contacts);

							// console.log(this.tree.getStatus());
							if(this.tree.getStatus() !== Collider.STATUS_PENETRATION && status!== Collider.STATUS_NONE)
								this.tree.setStatus(status);
						}
					}
				}
			}
		}


		this.manageExits(exitColliders);

	}else{
		this.updateChildren();
	}
};

//----------------------------------------------------------------------

QuadTreeNode.prototype.updateChildren = function() {
	//console.log("CHECK");
	// for (var i = 0; i < this.children.length; i++)
	for (var i = 0; i < this.children.length; i++){

		var child = this.children[i];

		if(child !== null){

			if(child.isLeaf() && child.getCollidersCount() === 0){
				this.children[i] = null;
				this.enabledChildren--;
			}else{
				child.update();
			}
		}
	}
};

//----------------------------------------------------------------------

QuadTreeNode.prototype.checkExit = function (collider){
	// CHECK if collider is out of this node.
	// only dynamic objects can escape from their nodes !!!
	return ( ! collider.isStatic() && ! this.testCompleteCollider(collider));
};

//----------------------------------------------------------------------

QuadTreeNode.prototype.manageExits = function (exitColliders){

	// If any collider has left the node
	if(exitColliders.length > 0){

		var remainingColliders = [];

		// for each collider
		for (var i = 0; i < this.colliders.length; i++) {

			var erased = false;

			// check if the collider has left the nodes
			for (var j = 0; j < exitColliders.length && !erased ; j++) {
				if(exitColliders[j].getId() === this.colliders[i].getId()){
					erased = true;
				}
			}

			if(!erased){
				remainingColliders.push(this.colliders[i]);
			}
		}

		this.colliders = remainingColliders;

		// RE-INSERT
		for (var i = 0; i < exitColliders.length; i++) {
			this.tree.addCollider(exitColliders[i]);
		}
	}
};

//----------------------------------------------------------------------
