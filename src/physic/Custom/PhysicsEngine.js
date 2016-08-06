var PhysicsEngine = function (){
  this.bodies = [];

  // TODO refactor

  // var canvas = document.getElementById("glcanvas");
  // alert("Width: "+canvas.width/64 + " Height: " + canvas.height/64);
  // this.tree = new QuadTree(canvas.width/64,canvas.height/64);
  this.tree = new QuadTree(100,100);

};

PhysicsEngine.prototype.getBodies = function (){
  return this.bodies;
};

PhysicsEngine.prototype.addBodies = function (bodies){
  for (var i = 0; i < bodies.length; i++) {
    this.addBody(bodies[i]);
	}
};

PhysicsEngine.prototype.addBody = function (body){
  this.bodies.push(body);
  this.tree.addCollider(body.gameObject.getComponent(Collider));
};

PhysicsEngine.prototype.clear = function (){
	this.bodies = [];
  this.tree.clear();
};

PhysicsEngine.prototype.applyImpulse = function(body1, body2, vrel, normal){

  // var fCr = 0;
  //
  // var j = (-(1+fCr) * (vRelativeVelocity*vCollisionNormal)) /
  // ( (vCollisionNormal*vCollisionNormal) *
  // (1/body1->fMass + 1/body2->fMass) );
  // body1->vVelocity += (j * vCollisionNormal) / body1->fMass;
  // body2->vVelocity -= (j * vCollisionNormal) / body2->fMass;
};

PhysicsEngine.prototype.solveCollisions = function (contacts){
  for (var i = 0; i < contacts.length; i++) {

    var normal = contacts[i].normal;
    var vrel = contacts[i].relativeVelocity;
    var a = contacts[i].a;
    var b = contacts[i].b;


    var bodyA = a.gameObject.getComponent(RigidBody);
    var bodyB = b.gameObject.getComponent(RigidBody);


    bodyA.setOnCollision(true);
    bodyB.setOnCollision(true);

    //
    // a.gameObject.getComponent(RigidBody).linear.x *=0;
    // b.gameObject.getComponent(RigidBody).linear.x *=0;
    // a.gameObject.getComponent(RigidBody).linear.y *=0;
    // b.gameObject.getComponent(RigidBody).linear.y *=0;
    // a.gameObject.getComponent(RigidBody).linear.z *=0;
    // b.gameObject.getComponent(RigidBody).linear.z *=0;

    // linearA.x *=0;
    // linearB.x *=0;
    // linearA.y *=0;
    // linearB.y *=0;
    // linearA.z *=0;
    // linearB.z *=0;



    var vrn = vrel.dot(normal);

    // Do not resolve if velocities are separating
    if(vrn < 0){

      // Calculate restitution
      var e = 0;

      // Calculate impulse scalar
      var j = -(1.0 + e) * vrn;
      j /= (1/10) + (1/10);

      // Apply impulse
      var impulse = normal.cpy().mulScl(j);

      if( ! bodyA.isStatic())
        bodyA.linear.add(impulse.cpy().mulScl((1/10)));

      if( ! bodyB.isStatic())
        bodyB.linear.sub(impulse.cpy().mulScl((1/10)));
    }
  }
};

PhysicsEngine.prototype.update = function (){

  var currentTime = 0;
  var targetTime = Time.deltaTime();
  var deltaTime = Time.deltaTime();
  var penetration = false;
  var tryAgain = true;

  // var dTime = Time.deltaTime();
  // var tol = 0.00001;

  for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].saveState();
  }

  var it = 0;
  var maxIt = 10;

  while ( tryAgain && (currentTime < deltaTime)) {

      tryAgain = false;

      // Integrate
      for (var i = 0; i < this.bodies.length; i++) {
        this.bodies[i].restoreState();
        this.bodies[i].simulate(targetTime - currentTime);
    	}

      // check collisions
      this.tree.update();
      var status = this.tree.getStatus();

      if(status == Collider.STATUS_PENETRATION){

          if(it < maxIt)
              targetTime = (currentTime + targetTime)/2.0;
          else
              targetTime -= (deltaTime)/2.0; // HACK NEW

          penetration = true;

          // if(targetTime > tol)
              tryAgain = true;

          // console.log("penetration");

      }else if (status == Collider.STATUS_COLLISION) {
          currentTime = targetTime;
          targetTime = deltaTime;

          // console.log("collision");

          this.solveCollisions(this.tree.getContacts());
      }
      // else{
      //     console.log(i+" none");
      // }

      this.tree.clearContacts();

      it++;
  }

  // if(it == maxIt){
  //     console.log(it);
  //     console.log(this.tree.getStatus());
  // }


  // if( ! penetration){
      // for (var i = 0; i < this.bodies.length; i++) {
          // this.bodies[i].restoreState();
   //  	}
  // }
};
