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

};

Collider.prototype.getFaces = function () {

};

Collider.prototype.getEdges = function () {

};

Collider.prototype.getBoundingBox = function () {

};

Collider.prototype.getRadius = function () {

};

Collider.prototype.getCenter = function () {
	return this.gameObject.getComponent(Transform).position;
};

Collider.prototype.getNormals = function() {

};

Collider.prototype.getRelativeVelocity = function(otherCollider) {

	var velA = this.gameObject.getComponent(RigidBody).linear;
	var velB = otherCollider.gameObject.getComponent(RigidBody).linear;

	return velA.cpy().sub(velB);
};


Collider.prototype.testPoint = function (vec) {

};

Collider.prototype.getCandidateVertices = function (otherCollider) {

};

// Collider.prototype.getCandidatesEdgePlane = function (otherCollider) {
//
// };

Collider.prototype.checkCollisionRadius = function (otherCollider) {
	var centerA = this.gameObject.getComponent(Transform).position;
	var centerB = otherCollider.gameObject.getComponent(Transform).position;

	return GeometryUtil.testSphereSphere(centerA,centerB,this.getRadius(),otherCollider.getRadius());
};

Collider.prototype.testVertexVertex = function (vertices, otherCollider, contactList) {

};

Collider.prototype.testVertexEdge = function (vertices, otherCollider, contactList) {

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
