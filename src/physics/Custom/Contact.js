// Class definition goes here.
var Contact = function (colliderA, colliderB, contactPoint, normal, relativeVelocity, depth){
  this.colliderA = colliderA; // Collider A
  this.colliderB = colliderB; // Collider B
  this.contactPoint = contactPoint;
  this.normal = normal; // From B to A
  this.relativeVelocity = relativeVelocity;
  this.depth = depth;
  this.solved = false;
};

//----------------------------------------------------------------------

Contact.prototype.setSolved = function () {
  this.solved = true;
};

//----------------------------------------------------------------------

Contact.prototype.isSolved = function () {
  return this.solved;
};

//----------------------------------------------------------------------

Contact.prototype.getColliderA = function () {
  return this.colliderA;
};

//----------------------------------------------------------------------

Contact.prototype.getColliderB = function () {
  return this.colliderB;
};

//----------------------------------------------------------------------

Contact.prototype.getBodyA = function () {
  return this.colliderA.gameObject.getComponent(RigidBody);
};

//----------------------------------------------------------------------

Contact.prototype.getBodyB = function () {
  return this.colliderB.gameObject.getComponent(RigidBody);
};

//----------------------------------------------------------------------

Contact.prototype.getContactPoint = function () {
  return this.contactPoint;
};

//----------------------------------------------------------------------

Contact.prototype.getNormal = function () {
  return this.normal;
};

//----------------------------------------------------------------------

Contact.prototype.getRelativeVelocity = function () {
  return this.relativeVelocity;
};

//----------------------------------------------------------------------

Contact.prototype.getDepth = function () {
  return this.depth;
};

//----------------------------------------------------------------------
