// Class definition goes here.
var ContactManager = function (){
  this.list = [];
  this.tmpList = [];
  this.map = [];
  this.alive = 0;
};

ContactManager.prototype.addContact = function(colliderA, colliderB, contactPoint, normal, relativeVelocity, depth) {
  var a = colliderA;
  var b = colliderB;

  var contact = this.find(colliderA,colliderB);

  // console.log(a.getId() + " " + b.getId() + " " + depth);

  // If contact not exists
  if(contact === undefined){

    contact = new Contact(colliderA, colliderB, contactPoint, normal, relativeVelocity, depth);
    this.list.push(contact);

    // console.log(" a:"+colliderA.getId() + " b:" + colliderB.getId() + " p:(" + contactPoint.x + "," + contactPoint.y  + ") \n" + " norm:(" + normal.x + "," + normal.y  + ") \n" + " vrel:(" + relativeVelocity.x + "," + relativeVelocity.y  + ") \n" + depth);

    // console.log(relativeVelocity.len());

    colliderA.onEnterCollision(contact);
    colliderB.onEnterCollision(contact);

    if(this.map[a.getId()] === undefined)
      this.map[a.getId()] = [];

    if(this.map[b.getId()] === undefined)
      this.map[b.getId()] = [];

    if(this.map[b.getId()][a.getId()] !== undefined)
      this.map[b.getId()][a.getId()] = contact;
    else
      this.map[a.getId()][b.getId()] = contact;

  }else{ // If contact exists then update

    // console.log("update");

    // console.log(" a:"+colliderA.getId() + " b:" + colliderB.getId() + " p:(" + contactPoint.x + "," + contactPoint.y  + ") \n" + " norm:(" + normal.x + "," + normal.y  + ") \n" + " vrel:(" + relativeVelocity.x + "," + relativeVelocity.y  + ") \n" + depth);

    // console.log(depth);
    contact.setAlive(true);
    colliderA.onCollision(contact);
    colliderB.onCollision(contact);

    if(contact.colliderA.getId() === a.getId() && contact.colliderB.getId() === b.getId())
      contact.update(contactPoint, normal, relativeVelocity, depth);

  }



  return contact;
};

//----------------------------------------------------------------------

ContactManager.prototype.remove = function (colliderA,colliderB) {

  var a = colliderA;
  var b = colliderB;

  var contact = this.find(a,b);

  if(contact !== undefined){

    a.onExitCollision(contact);
    b.onExitCollision(contact);

    if(this.map[a.getId()] !== undefined && this.map[a.getId()][b.getId()] !== undefined){
      delete this.map[a.getId()][b.getId()];
    }

    if(this.map[b.getId()] !== undefined && this.map[b.getId()][a.getId()] !== undefined){
      delete this.map[b.getId()][a.getId()];
    }
  }


    // console.log("remove");



};

//----------------------------------------------------------------------

ContactManager.prototype.find = function (colliderA,colliderB) {

  var ab = undefined;
  var ba = undefined;

  if(this.map[colliderA.getId()] !== undefined)
    ab = this.map[colliderA.getId()][colliderB.getId()];

  if(this.map[colliderB.getId()] !== undefined)
	 ba = this.map[colliderB.getId()][colliderA.getId()];

  if(ab !== undefined)
    return ab;
  else
    return ba;
};

//----------------------------------------------------------------------

ContactManager.prototype.testAndRemove = function (colliderA,colliderB,eps) {
  var a = colliderA;
  var b = colliderB;

  if( ! a.testEpsilon(b,eps) && ! b.testEpsilon(a,eps)){
    this.alive = 0;
    this.remove(a,b);
  }
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

ContactManager.prototype.solve = function () {

    // console.log(this.list.length);

  // var it = 0;

  for (var i = 0; i < this.list.length; i++) {

    var contact = this.list[i];

    var a = contact.colliderA;
    var b = contact.colliderB;
    var normal = contact.normal;
    var vrel = contact.relativeVelocity;
    var depth = contact.depth;
    var contactPoint = contact.contactPoint;

    // console.log(contact.isAlive());
    // console.log(a.getId() + " " + b.getId());



    if(this.find(a,b) !== undefined /*&& contact.isAlive()*/){

      // it++;
      //
      // console.log(it);


      contact.setAlive(false);
      // if(this.find(a,b) !== undefined){
      this.tmpList.push(contact);
      // }



      var bodyA = a.gameObject.getComponent(RigidBody);
      var bodyB = b.gameObject.getComponent(RigidBody);

      // if(depth === 0)
      //   console.log(depth);

      if(depth < -Collider.depthEpsilon){
        // console.log("penetration");

          this.alive++;
          var force = Math.abs(depth)*this.alive*50;
          // var force = 10000*Math.abs(depth)*(1/this.alive);

          // console.log(force);

          // bodyA.linear = new Vector3(0,0,0);
          // bodyB.linear = new Vector3(0,0,0);
          bodyA.linear.mulScl(Math.abs(depth));
          bodyB.linear.mulScl(Math.abs(depth));
          // bodyA.linear.mulScl( Math.abs(depth)*1/this.alive);
          // bodyB.linear.mulScl( Math.abs(depth)*1/this.alive);

          bodyA.applyForce(normal.cpy().mulScl(force));
          bodyB.applyForce(normal.cpy().mulScl(-force));

          var accum = bodyA.getForceAccumulator().len();
            // console.log(accum);
          // if(force > 3333)
            // console.log(force);
          //   console.log(vrel.len());
          // console.log(contactPoint.x + " " + contactPoint.y);

          // if(this.find(a,b) !== undefined){
            // contact.setAlive(true);
          // }
          // this.remove(a,b);


          // console.log(this.alive);

      }else{
        ContactManager.applyImpulse(bodyA,bodyB,vrel,normal,0);
        // console.log("collision");

      }

    }

    this.testAndRemove(a,b,Collider.depthEpsilon);

  }

  this.list = this.tmpList; // copy
  this.tmpList = [];
  // this.list = [];
};

//----------------------------------------------------------------------
