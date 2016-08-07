// Class definition goes here.
var Contact = function (a,b,p, normal, relativeVelocity){
  this.a = a; // Collider A
  this.b = b; // Collider B
  this.contactPoint = p;
  this.normal = normal; // From B to A
  this.relativeVelocity = relativeVelocity;
};

//----------------------------------------------------------------------
