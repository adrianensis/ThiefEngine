// Class definition goes here.
var Contact = function (colliderA, colliderB, contactPoint, normal, relativeVelocity){
  this.colliderA = colliderA; // Collider A
  this.colliderB = colliderB; // Collider B
  this.contactPoint = contactPoint;
  this.normal = normal; // From B to A
  this.relativeVelocity = relativeVelocity;
};

//----------------------------------------------------------------------
