var Collider = function () {
	Component.call(this);
};

Collider.STATUS_NONE = 0;
Collider.STATUS_PENETRATION = 1;
Collider.STATUS_COLLISION = 2;

Collider.depthEpsilon = 0.01;

Collider.prototype = new Component();
Collider.prototype.constructor = Collider;

Collider.prototype.getVertices = function () {
	throw new Error("Abstract method!");
};

Collider.prototype.getFaces = function () {
	throw new Error("Abstract method!");
};

Collider.prototype.getEdges = function () {
	throw new Error("Abstract method!");
};

Collider.prototype.getBoundingBox = function () {
	throw new Error("Abstract method!");
};

Collider.prototype.getRadius = function () {
	throw new Error("Abstract method!");
};

Collider.prototype.getCenter = function () {
	return this.gameObject.getTransform().position;
};

Collider.prototype.getNormals = function() {
	throw new Error("Abstract method!");
};

Collider.prototype.getRelativeVelocity = function(otherCollider) {

	var velA = this.gameObject.getComponent(RigidBody).linear;
	var velB = otherCollider.gameObject.getComponent(RigidBody).linear;

	return velA.cpy().sub(velB);
};


Collider.prototype.testPoint = function (vec) {
	throw new Error("Abstract method!");
};

Collider.prototype.getCandidateVertices = function (otherCollider) {
	throw new Error("Abstract method!");
};

// Collider.prototype.getCandidatesEdgePlane = function (otherCollider) {
//
// };

Collider.prototype.checkCollisionRadius = function (otherCollider) {
	var centerA = this.gameObject.getTransform().position;
	var centerB = otherCollider.gameObject.getTransform().position;

	return GeometryUtil.testSphereSphere(centerA,centerB,this.getRadius(),otherCollider.getRadius());
};

Collider.prototype.testVertexVertex = function (vertices, otherCollider, contactList) {
	throw new Error("Abstract method!");
};

Collider.prototype.testVertexEdge = function (vertices, otherCollider, contactList) {
	throw new Error("Abstract method!");
};

Collider.prototype.checkCollisionOrPenetration = function (vertex, maxDistance, normal, otherCollider, contactList) {

	var result = Collider.STATUS_NONE;

	var eps = Collider.depthEpsilon;

	var vrel = this.getRelativeVelocity(otherCollider);

	var vrn = normal.dot(vrel);

	if(maxDistance < -eps){ // penetration
		if(vrn < 0.0){
			// console.log("VERTEX-VERTEX PENETRATION " + maxDistance);
			// hasInterpenetration = true;

			result = Collider.STATUS_PENETRATION;
		}

	}else if(maxDistance < eps){ // collision

		if(vrn < 0.0){

			// counter++;
			//
			// if(counter < 2){

			// console.log("VERTEX-VERTEX COLLISION ");
			contactList.push(new Contact(this, otherCollider, vertex, normal, vrel));
			result = Collider.STATUS_COLLISION;
			// hasInterpenetration = true;
			// }else{
			// 	hasInterpenetration = false;
			// }
		}
	}

	return result;

};

Collider.prototype.generateContacts = function (vertices, otherCollider, contactList) {

};
