var Collider = function () {
	Component.call(this);

	this.onCollisionFlag = false;
};

Collider.STATUS_NONE = 0;
Collider.STATUS_PENETRATION = 1;
Collider.STATUS_COLLISION = 2;

Collider.depthEpsilon = 0.01;

Collider.prototype = new Component();
Collider.prototype.constructor = Collider;

//----------------------------------------------------------------------

Collider.prototype.onEnterCollision = function (contact) {


	// if(!this.onCollisionFlag){
		// this.onCollisionFlag = true;
		console.log("on enter");
	// }
};

//----------------------------------------------------------------------

Collider.prototype.onCollision = function (contact) {
	// console.log("on collision");
};

//----------------------------------------------------------------------

Collider.prototype.onExitCollision = function (contact) {
	// console.log("on exit ");
	this.onCollisionFlag = false;
};

//----------------------------------------------------------------------

Collider.prototype.isStatic = function () {
	return this.gameObject.isStatic();
};

//----------------------------------------------------------------------

Collider.prototype.getVertices = function () {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Collider.prototype.getFaces = function () {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Collider.prototype.getEdges = function () {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Collider.prototype.getBoundingBox = function () {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Collider.prototype.getRadius = function () {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Collider.prototype.getCenter = function () {
	return this.gameObject.getTransform().position;
};

//----------------------------------------------------------------------

Collider.prototype.getNormals = function() {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Collider.prototype.getRelativeVelocity = function(otherCollider) {

	var velA = this.gameObject.getComponent(RigidBody).linear;
	var velB = otherCollider.gameObject.getComponent(RigidBody).linear;

	return velA.cpy().sub(velB);
};

//----------------------------------------------------------------------


Collider.prototype.testPoint = function (vec) {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Collider.prototype.getCandidateVertices = function (otherCollider) {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Collider.prototype.checkCollisionRadius = function (otherCollider) {
	var centerA = this.gameObject.getTransform().position;
	var centerB = otherCollider.gameObject.getTransform().position;

	return GeometryUtil.testSphereSphere(centerA,centerB,this.getRadius(),otherCollider.getRadius());
};

//----------------------------------------------------------------------

Collider.prototype.testVertexVertex = function (vertices, otherCollider, contactManager) {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Collider.prototype.testVertexEdge = function (vertices, otherCollider, contactManager) {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Collider.prototype.checkCollisionOrPenetration = function (vertex, eps, maxDistance, normal, otherCollider, contactManager) {

	var result = Collider.STATUS_NONE;
	//
	// var eps = Collider.depthEpsilon;

	var vrel = this.getRelativeVelocity(otherCollider);

	var vrn = vrel.dot(normal);

	// if(vrn <= 0){

		// penetration
		if(maxDistance < -eps && vrn <= 0){

				// var contact = contactManager.addPenetration(this, otherCollider, vertex, normal, vrel, maxDistance);
				var contact = contactManager.addContact(this, otherCollider, vertex, normal, vrel, maxDistance);

				result = Collider.STATUS_PENETRATION;

				this.gameObject.getComponent(RigidBody).setStatus(result);
				otherCollider.gameObject.getComponent(RigidBody).setStatus(result);


		// collision
	}else if(maxDistance < eps && vrn <= 0){

				// if(){
					// console.log("VERTEX-VERTEX COLLISION ");

					var contact = contactManager.addContact(this, otherCollider, vertex, normal, vrel, maxDistance);
					result = Collider.STATUS_COLLISION;

					var thisBody = this.gameObject.getComponent(RigidBody);
					var otherBody = otherCollider.gameObject.getComponent(RigidBody);

					thisBody.setStatus(result);
					otherBody.setStatus(result);

					// thisBody.setOnCollision(contact);
					// otherBody.setOnCollision(contact);

					// this.registerCollision(otherCollider,contact);
					// otherCollider.registerCollision(this,contact);
			// }
	}


	return result;

};

//----------------------------------------------------------------------

// TODO ?¿?¿?¿?
Collider.prototype.checkCollision = function (vertex, eps, maxDistance, normal, otherCollider, contactManager) {

	// var result = Collider.STATUS_NONE;
	// //
	// // var eps = Collider.depthEpsilon;
	//
	// var vrel = this.getRelativeVelocity(otherCollider);
	//
	// var vrn = vrel.dot(normal);
	//
	// if(vrn <= 0){
	//
	//
	// 			// console.log("VERTEX-VERTEX COLLISION ");
	// 			contactList.push(new Contact(this, otherCollider, vertex, normal, vrel));
	// 			result = Collider.STATUS_COLLISION;
	// 			this.gameObject.getComponent(RigidBody).setStatus(Collider.STATUS_COLLISION);
	// 			otherCollider.setStatus(Collider.STATUS_COLLISION);
	//
	// }
	//
	// return result;

};

//----------------------------------------------------------------------

Collider.prototype.generateContacts = function (vertices, otherCollider, contactManager) {
	throw new Error("Abstract method!");
};

//----------------------------------------------------------------------
