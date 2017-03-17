// var Box2D = {};
// using(Box2D, "b2.+");

  b2Vec2 = Box2D.Common.Math.b2Vec2,
 b2BodyDef = Box2D.Dynamics.b2BodyDef,
 b2Body = Box2D.Dynamics.b2Body,
 b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
 b2Fixture = Box2D.Dynamics.b2Fixture,
 b2World = Box2D.Dynamics.b2World,
 b2MassData = Box2D.Collision.Shapes.b2MassData,
 b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
 b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
 b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
b2Listener = Box2D.Dynamics.b2ContactListener;
// b2Listener = b2ContactListener;
// console.log(Box2D);

// var Box2D = {};
// pattern = new RegExp("b2.+");
//
// for (var name in this) {
//   if (name.match(pattern)) {
//       console.log(this[name]);
//   }
// }

var PhysicsEngine = function (){
    this.bodies = [];
    this.destroyList = [];
    this.fixtures = [];


    this.listener = new b2Listener();

    this.listener.BeginContact = function(contact) {

        var gameObjectA = contact.GetFixtureA().GetBody().GetUserData();
        var gameObjectB = contact.GetFixtureB().GetBody().GetUserData();

        var bodyA = gameObjectA.getComponent(RigidBody);
        var bodyB = gameObjectB.getComponent(RigidBody);

        if(((! bodyA.isDestroyed()) && bodyA.isEnabled()) && ((! bodyB.isDestroyed()) && bodyB.isEnabled())){

          var listA = gameObjectA.getAllComponents(Script);
          var listB = gameObjectB.getAllComponents(Script);

          for (script of listA) {
            if(script !== null && (! script.isDestroyed()) && script.isEnabled())
              script.onEnterCollision(gameObjectB,contact);
          }

          for (script of listB) {
            if(script !== null && (! script.isDestroyed()) && script.isEnabled())
              script.onEnterCollision(gameObjectA,contact);
          }

        }
    };

    this.listener.EndContact = function(contact) {

        var gameObjectA = contact.GetFixtureA().GetBody().GetUserData();
        var gameObjectB = contact.GetFixtureB().GetBody().GetUserData();

        var bodyA = gameObjectA.getComponent(RigidBody);
        var bodyB = gameObjectB.getComponent(RigidBody);

        if(((! bodyA.isDestroyed()) && bodyA.isEnabled()) && ((! bodyB.isDestroyed()) && bodyB.isEnabled())){

          var listA = gameObjectA.getAllComponents(Script);
          var listB = gameObjectB.getAllComponents(Script);

          for (script of listA) {
            if(script !== null && (! script.isDestroyed()) && script.isEnabled())
              script.onExitCollision(gameObjectB,contact);
          }

          for (script of listB) {
            if(script !== null && (! script.isDestroyed()) && script.isEnabled())
              script.onExitCollision(gameObjectA,contact);
          }
        }
    };

    this.init();
};

//----------------------------------------------------------------------

PhysicsEngine.prototype.init = function (){
  this.world = new b2World(
        new b2Vec2(0,0),    //NO gravity
        false                 //allow sleep
  );

  this.world.SetContactListener(this.listener);
};


//----------------------------------------------------------------------

PhysicsEngine.prototype.setGravity = function (gravity){
  this.world.SetGravity(new b2Vec2(gravity.x,gravity.y));
};

//----------------------------------------------------------------------

PhysicsEngine.prototype.getBox2dWorld = function (){
  return this.world;
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

  body.adapt(this.world);

};

//----------------------------------------------------------------------

PhysicsEngine.prototype.clear = function (){
	this.bodies = [];

  for (var i = 0; i < this.bodies.length; i++) {
    this.world.DestroyBody(this.bodies[i].getBox2dBody());
  }

  this.init();
};

//----------------------------------------------------------------------

PhysicsEngine.prototype.update = function (dt){



  this.world.Step(
        dt,   //frame-rate
        6,       //velocity iterations
        3       //position iterations
  );

  var newList = [];

  for (var i = 0; i < this.bodies.length; i++) {

    var body = this.bodies[i];

    if(!body.isStatic() && body.isEnabled() && !body.isDestroyed()){

      var v = body.getBox2dBody().GetLinearVelocity();
      var x = body.getBox2dBody().GetPosition().x;
      var y = body.getBox2dBody().GetPosition().y;

      var angle = body.getBox2dBody().GetAngle();

      body.gameObject.getTransform().setPosition(new Vector2(x,y));
      body.gameObject.getTransform().setRotation(new Vector3(0,0,angle));

      newList.push(body);

    }else if(body.isDestroyed()){
      this.destroyList.push(body);
    }

  }

  this.bodies = newList;

  this.world.ClearForces();

  for (var i = 0; i < this.destroyList.length; i++){

    var box2dBody = this.destroyList[i].getBox2dBody();

    box2dBody.GetWorld().DestroyBody(box2dBody);
    this.destroyList[i].body = null;
  }

  this.destroyList = [];


  // this.world.DrawDebugData();


};
