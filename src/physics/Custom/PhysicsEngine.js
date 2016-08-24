var PhysicsEngine = function (){
  this.bodies = [];

  // TODO refactor

  // var canvas = document.getElementById("glcanvas");
  // alert("Width: "+canvas.width/64 + " Height: " + canvas.height/64);
  // this.tree = new QuadTree(canvas.width/64,canvas.height/64);
  this.tree = new QuadTree(100,100);
  this.contactManager = new ContactManager();

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

PhysicsEngine.prototype.setGravity = function (gravity){
  // this.world.SetGravity(new b2Vec2(gravity.x,gravity.y));
};

//----------------------------------------------------------------------


//----------------------------------------------------------------------

PhysicsEngine.prototype.simulate = function (dt){

  var deltaTime = dt;
  var currentTime = 0;
  // var tol = 0.01;
  var targetTime = deltaTime;
  var tryAgain = true;

  for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].saveState();
  }

  var it = 0;
  var maxIt = 10;
  var first = true;
  var status = Collider.STATUS_NONE;

  while (tryAgain  && it < maxIt /* && targetTime >= tol*/ && (currentTime < deltaTime)) {

      tryAgain = false;

      // Integrate
      for (var i = 0; i < this.bodies.length; i++) {

        var body = this.bodies[i];

        var hasPenetration = body.getStatus() === Collider.STATUS_PENETRATION;

        // Integrate the first time
        // OR
        // only re-integrate the penetration cases
        if(first || (hasPenetration)){
          if(!body.isStatic()){
            body.restoreState();
            body.integrate(targetTime - currentTime);
          }
        }
    	}

      first = false;
      this.contactManager.clearPenetrations();

      // check collisions
      this.tree.update(this.contactManager);
      status = this.tree.getStatus();

      if(status === Collider.STATUS_PENETRATION){

          if(it < maxIt)
            targetTime = (currentTime + targetTime)/2;
          // else
          //   targetTime = -(deltaTime);

          if(targetTime > 0.0001)
            tryAgain = true;

          // console.log("penetration");

          // if(it < maxIt)
            // this.contactManager.solvePenetrations();

      }else if (status === Collider.STATUS_COLLISION){
          currentTime = targetTime;
          targetTime = deltaTime;

          // console.log("collision");

          // this.solveCollisions(this.tree.getContacts(),false);
          this.contactManager.solveCollisions();
      }

      // this.contactManager.solvePenetrations();
      // this.contactManager.clearContacts();
      // this.tree.clearContacts();

      this.contactManager.solvePenetrations();
      this.contactManager.clearPenetrations();

      it++;
  }
  // console.log(it);

};

//----------------------------------------------------------------------

PhysicsEngine.prototype.update = function (time){

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
