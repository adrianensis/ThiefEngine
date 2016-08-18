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

  var collider = body.gameObject.getComponent(Collider);
  if(collider !== null)
    this.tree.addCollider(collider);
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
      // console.log(bodyA.linear.len());
      // if(bodyA.linear.len() < 0.1)
      //   bodyA.linear = new Vector3(0,0,0);
    }

    if( ! bodyB.isStatic()){
      bodyB.linear.sub(impulse.cpy().mulScl(invMass));
      // console.log(bodyB.linear.len());
      // if(bodyB.linear.len() < 0.1)
      //   bodyB.linear = new Vector3(0,0,0);
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

PhysicsEngine.prototype.simulate = function (dt){

  var deltaTime = dt;
  var currentTime = 0;
  var targetTime = deltaTime;
  var tol = 0.001;
  var tryAgain = true;

  for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].saveState();
  }

  // var it = 0;
  // var maxIt = 50;
  var first = true;

  while (tryAgain && (currentTime < deltaTime)) {

      tryAgain = false;

      // Integrate
      for (var i = 0; i < this.bodies.length; i++) {

        var body = this.bodies[i];

        var inPenetration = body.gameObject.getComponent(Collider) !== null && body.gameObject.getComponent(Collider).getStatus() === Collider.STATUS_PENETRATION;

        // Integrate the first time
        // OR
        // only re-integrate the penetration cases
        if(first || (inPenetration)){
          body.restoreState();
          body.simulate(targetTime - currentTime);
        }
    	}

      first = false;

      // check collisions
      this.tree.update();
      var status = this.tree.getStatus();

      if(status === Collider.STATUS_PENETRATION){

          // if(targetTime < tol)
            targetTime = (currentTime + targetTime)/2.0;
          // else
            // targetTime -= (deltaTime)*2; // HACK NEW

            // if(body.gameObject.getComponent(Collider).getId() === 7532)
              // console.log(targetTime +" "+ (targetTime - currentTime));

          tryAgain = true;

          // console.log("penetration");

      }else if (status === Collider.STATUS_COLLISION){
          currentTime = targetTime;
          targetTime = deltaTime;

          // console.log("collision");

          this.solveCollisions(this.tree.getContacts());
      }

      this.tree.clearContacts();

      // it++;
  }

};

//----------------------------------------------------------------------

PhysicsEngine.prototype.update = function (){

  var time = 1/60;
  var timeStep = time/10;
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
