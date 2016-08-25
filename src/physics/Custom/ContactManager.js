// Class definition goes here.
var ContactManager = function (){
  this.collisionsList = [];
  this.penetrationsList = [];
  this.collisionsMap = [];
  this.penetrationsMap = [];

  // this.notSolvedPenetrations = [];
};

ContactManager.add = function(map, list, colliderA, colliderB, contactPoint, normal, relativeVelocity, depth) {
  var a = colliderA;
  var b = colliderB;

  var contact = new Contact(colliderA, colliderB, contactPoint, normal, relativeVelocity, depth);
  // list.push(contact);

  if(map[a.getId()] === undefined)
    map[a.getId()] = [];

  if(map[b.getId()] === undefined)
    map[b.getId()] = [];

  if(map[a.getId()][b.getId()] === undefined && map[b.getId()][a.getId()] === undefined){
    colliderA.onEnterCollision(contact);
    colliderB.onEnterCollision(contact);
    list.push(contact);
  }else{
    colliderA.onCollision(contact);
    colliderB.onCollision(contact);
  }

  if(map[b.getId()][a.getId()] !== undefined)
    map[b.getId()][a.getId()] = contact;
  else
    map[a.getId()][b.getId()] = contact;

  return contact;
};

//----------------------------------------------------------------------

ContactManager.prototype.addCollision = function (colliderA, colliderB, contactPoint, normal, relativeVelocity, depth) {
  return ContactManager.add(this.collisionsMap, this.collisionsList, colliderA, colliderB, contactPoint, normal, relativeVelocity, depth);
};

//----------------------------------------------------------------------

ContactManager.prototype.addPenetration = function (colliderA, colliderB, contactPoint, normal, relativeVelocity, depth) {
  return ContactManager.add(this.penetrationsMap, this.penetrationsList, colliderA, colliderB, contactPoint, normal, relativeVelocity, depth);
};

//----------------------------------------------------------------------

ContactManager.prototype.getCollisions = function () {
  return this.collisionsList;
};

//----------------------------------------------------------------------

ContactManager.prototype.getPenetrations = function () {
  return this.penetrationsList;
};

//----------------------------------------------------------------------

ContactManager.prototype.checkExitCollision = function (colliderA, colliderB) {

	var contact = this.findRegisteredCollision(colliderA,colliderB);

	if(contact !== undefined){
		this.removeCollision(colliderA,colliderB);
		colliderA.onExitCollision(contact);
		colliderB.onExitCollision(contact);
	}
};


//----------------------------------------------------------------------

ContactManager.prototype.removeCollision = function (colliderA,colliderB) {
	delete this.collisionsMap[colliderA.getId()][colliderB.getId()];
	delete this.collisionsMap[colliderB.getId()][colliderA.getId()];
};

//----------------------------------------------------------------------

ContactManager.find = function (colliderA,colliderB, map) {

  var ab = undefined;
  var ba = undefined;

  if(map[colliderA.getId()] !== undefined)
    ab = map[colliderA.getId()][colliderB.getId()];

  if(map[colliderB.getId()] !== undefined)
	 ba = map[colliderB.getId()][colliderA.getId()];

  if(ab !== undefined)
    return ab;
  else
    return ba;
};

//----------------------------------------------------------------------

ContactManager.prototype.findRegisteredCollision = function (colliderA,colliderB) {
  return ContactManager.find(colliderA, colliderB, this.collisionsMap);
};

//----------------------------------------------------------------------

ContactManager.prototype.findRegisteredPenetration = function (colliderA,colliderB) {
  return ContactManager.find(colliderA, colliderB, this.penetrationsMap);
};

//----------------------------------------------------------------------

ContactManager.applyImpulse = function(bodyA, bodyB, vrel, normal, restitution){

  var invMass = 1/1;

  var vrn = vrel.dot(normal);



  // Do not resolve if bodies are separating
  if(vrn < 0){



    // Calculate restitution
    // var e = 2.5;
    var e = restitution; // TODO: min( A.restitution, B.restitution)

    // Calculate impulse scalar
    var j = -(1.0 + e) * vrn;
    j /= invMass + invMass;

    // Apply impulse
    var impulse = normal.cpy().mulScl(j);

    if( ! bodyA.isStatic()){
      bodyA.applyImpulse(impulse);
    }

    if( ! bodyB.isStatic()){
      bodyB.applyImpulse(impulse.cpy().mulScl(-1));
    }


  }
};

//----------------------------------------------------------------------

ContactManager.prototype.solve = function (list, isCollision) {
  // var solved = {}; // boolean matrix

  for (var i = 0; i < list.length; i++) {



    var normal = list[i].normal;
    var vrel = list[i].relativeVelocity;
    var a = list[i].colliderA;
    var b = list[i].colliderB;
    var depth = list[i].depth;

    var contact = list[i];
    // var contact = this.findRegisteredPenetration(a,b);

    if(!contact.isSolved()){
      var bodyA = a.gameObject.getComponent(RigidBody);
      var bodyB = b.gameObject.getComponent(RigidBody);

      if(isCollision){
        ContactManager.applyImpulse(bodyA,bodyB,vrel,normal, 0);
        contact.setSolved(true);
      }else{
        // ContactManager.applyImpulse(bodyA,bodyB,vrel,normal, 0.5 + 1*Collider.depthEpsilon/Math.abs(depth));
        // if(depth < Collider.depthEpsilon){
          var force = 10000*Math.abs(depth)*Math.abs(vrel.len());
          // console.log(force);

          // var e = Collider.depthEpsilon;
          // if(depth > -5*e ){
          //   force = 1000*Math.abs(depth);
          // }

          // var force = 100;


          // console.log(depth < Collider.depthEpsilon);
          bodyA.applyForce(normal.cpy().mulScl(force));
          bodyB.applyForce(normal.cpy().mulScl(-force));

        // }else
        //   contact.setSolved(true);

      }

    }
  }
};


//----------------------------------------------------------------------

ContactManager.prototype.solveCollisions = function () {
  this.solve(this.collisionsList, true);
  this.clearCollisions();
};

//----------------------------------------------------------------------

ContactManager.prototype.solvePenetrations = function () {
  this.solve(this.penetrationsList, false);
  // this.clearPenetrations();
};

//----------------------------------------------------------------------

ContactManager.prototype.clearCollisions = function () {
  this.collisionsList = [];
  this.collisionsMap = [];
};

//----------------------------------------------------------------------

ContactManager.prototype.clearPenetrations = function () {
  // this.penetrationsList = this.notSolvedPenetrations.slice(); // NOTE: slice == copy
  this.penetrationsList = [];
  this.penetrationsMap = [];
};

//----------------------------------------------------------------------
