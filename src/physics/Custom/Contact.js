// Class definition goes here.
var Contact = function (colliderA, colliderB, contactPoint, normal, relativeVelocity, depth){
  this.colliderA = colliderA; // Collider A
  this.colliderB = colliderB; // Collider B
  this.contactPoint = contactPoint;
  this.normal = normal; // From B to A
  this.relativeVelocity = relativeVelocity;
  this.depth = depth;
  this.solved = false;
  this.alive = 0;
};

//----------------------------------------------------------------------

Contact.prototype.update = function (contactPoint, normal, relativeVelocity, depth) {
  this.contactPoint = contactPoint;
  this.normal = normal; // From B to A
  this.relativeVelocity = relativeVelocity;
  this.depth = depth;
};

//----------------------------------------------------------------------

Contact.prototype.addAlive = function () {
  this.alive++;
};

//----------------------------------------------------------------------

Contact.prototype.getAlive = function () {
  return this.alive;
};

//----------------------------------------------------------------------

Contact.prototype.setAlive = function (n) {
  this.alive = n;
};

//----------------------------------------------------------------------

Contact.prototype.setSolved = function (bool) {
  this.solved = bool;
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
