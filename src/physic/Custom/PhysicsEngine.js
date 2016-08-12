var PhysicsEngine = function (){
  this.bodies = [];

  // TODO refactor

  // var canvas = document.getElementById("glcanvas");
  // alert("Width: "+canvas.width/64 + " Height: " + canvas.height/64);
  // this.tree = new QuadTree(canvas.width/64,canvas.height/64);
  this.tree = new QuadTree(100,100);

};

//----------------------------------------------------------------------

PhysicsEngine.prototype.getBodies = function (){
  return this.bodies;
};

//----------------------------------------------------------------------

PhysicsEngine.prototype.addBodies = function (bodies){
  for (var i = 0; i < bodies.length; i++) {
    this.addBody(bodies[i]);
	}
};

//----------------------------------------------------------------------

PhysicsEngine.prototype.addBody = function (body){
  this.bodies.push(body);
  this.tree.addCollider(body.gameObject.getComponent(Collider));
};

//----------------------------------------------------------------------

PhysicsEngine.prototype.clear = function (){
	this.bodies = [];
  this.tree.clear();
};

//----------------------------------------------------------------------

PhysicsEngine.prototype.applyImpulse = function(bodyA, bodyB, vrel, normal){

  var invMass = 1/1;

  var vrn = vrel.dot(normal);



  // Do not resolve if bodies are separating
  if(vrn < 0){



    // Calculate restitution
    // var e = 2.5;
    var e = 0;

    // Calculate impulse scalar
    var j = -(1.0 + e) * vrn;
    j /= invMass + invMass;

    // Apply impulse
    var impulse = normal.cpy().mulScl(j);
    // console.log("impulse");
    // console.log(impulse);

    if( ! bodyA.isStatic()){
      bodyA.linear.add(impulse.cpy().mulScl(invMass));
      // console.log("A " + bodyA.getId());
      // console.log(bodyA.linear);
    }

    if( ! bodyB.isStatic()){
      bodyB.linear.sub(impulse.cpy().mulScl(invMass));
      // console.log("B " + bodyB.getId());
      // console.log(bodyB.linear);
    }


  }
};

//----------------------------------------------------------------------

PhysicsEngine.prototype.solveCollisions = function (contacts){

  var solved = {}; // colliders

  for (var i = 0; i < contacts.length; i++) {

    var normal = contacts[i].normal;
    var vrel = contacts[i].relativeVelocity;
    var a = contacts[i].colliderA;
    var b = contacts[i].colliderB;

    if(solved[a.getId()] === undefined){
      solved[a.getId()] = {};
      solved[a.getId()][b.getId()] = false;
    }

    if(solved[b.getId()] === undefined){
      solved[b.getId()] = {};
      solved[b.getId()][a.getId()] = false;
    }

    if( ! solved[a.getId()][b.getId()] && ! solved[b.getId()][a.getId()]){
      var bodyA = a.gameObject.getComponent(RigidBody);
      var bodyB = b.gameObject.getComponent(RigidBody);

      bodyA.setOnCollision(true);
      bodyB.setOnCollision(true);

      this.applyImpulse(bodyA,bodyB,vrel,normal);

      solved[a.getId()][b.getId()] = true;
      solved[b.getId()][a.getId()] = true;

    }
  }

  // console.log(solved);
};

//----------------------------------------------------------------------

PhysicsEngine.prototype.simulate = function (deltaTime){

  var currentTime = 0;
  // var deltaTime = Time.deltaTime();
  // var targetTime = Time.deltaTime();
  // var deltaTime = 1/30;
  var targetTime = deltaTime;
  var tol = 0.01;
  // var penetration = false;
  var tryAgain = true;

  // var dTime = Time.deltaTime();
  // var tol = 0.00001;

  for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].saveState();
  }

  var it = 0;
  var maxIt = 10;
  var first = true;

  while ( tryAgain && (currentTime < deltaTime)) {
  // while ( tryAgain && deltaTime > tol) {

      tryAgain = false;

      // Integrate
      for (var i = 0; i < this.bodies.length; i++) {
        // Integrate the first time
        // OR
        // only re-integrate the penetration cases
        if(first || this.bodies[i].gameObject.getComponent(Collider).getStatus() === Collider.STATUS_PENETRATION){
          this.bodies[i].restoreState();
          this.bodies[i].simulate(targetTime - currentTime);
        }
    	}

      first = false;

      // check collisions
      this.tree.update();
      var status = this.tree.getStatus();

      if(status == Collider.STATUS_PENETRATION){

        // deltaTime -= deltaTime/2;
        //
        // console.log(deltaTime);

          if(it < maxIt)
              targetTime = (currentTime + targetTime)/2.0;
          else
              targetTime -= (deltaTime)/2.0; // HACK NEW

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

  // console.log(it);

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

//----------------------------------------------------------------------

PhysicsEngine.prototype.update = function (){
  // var deltaTime = Time.deltaTime();

  var time = 1/30;
  var timeStep = (1/30)/10;
  var dt;
  var lastTime = 0;

  // Euler integration subdivision
  while (lastTime < time){

    dt = time - lastTime;

    if(dt > timeStep)
      dt = timeStep;

    this.simulate(dt);
    lastTime += dt;
  }
};

//----------------------------------------------------------------------
