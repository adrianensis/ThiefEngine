  b2Vec2 = Box2D.Common.Math.b2Vec2
, b2BodyDef = Box2D.Dynamics.b2BodyDef
, b2Body = Box2D.Dynamics.b2Body
, b2FixtureDef = Box2D.Dynamics.b2FixtureDef
, b2Fixture = Box2D.Dynamics.b2Fixture
, b2World = Box2D.Dynamics.b2World
, b2MassData = Box2D.Collision.Shapes.b2MassData
, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
, b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
b2Listener = Box2D.Dynamics.b2ContactListener;

var PhysicsEngine = function (){
    this.bodies = [];
    this.destroyList = [];
    this.fixtures = [];



    this.world = new b2World(
          new b2Vec2(0,0)    //NO gravity
       ,  false                 //allow sleep
    );
    var listener = new b2Listener();

    listener.BeginContact = function(contact) {

        var gameObjectA = contact.GetFixtureA().GetBody().GetUserData();
        var gameObjectB = contact.GetFixtureB().GetBody().GetUserData();

        var scriptA = gameObjectA.getComponent(Script);
        var scriptB = gameObjectB.getComponent(Script);

        if(scriptA !== null)
          scriptA.onEnterCollision(gameObjectB,contact);

        if(scriptB !== null)
          scriptB.onEnterCollision(gameObjectA,contact);
    };

    listener.EndContact = function(contact) {

        var gameObjectA = contact.GetFixtureA().GetBody().GetUserData();
        var gameObjectB = contact.GetFixtureB().GetBody().GetUserData();

        var scriptA = gameObjectA.getComponent(Script);
        var scriptB = gameObjectB.getComponent(Script);

        if(scriptA !== null)
          scriptA.onExitCollision(gameObjectB,contact);

        if(scriptB !== null)
          scriptB.onExitCollision(gameObjectA,contact);
    };

    this.world.SetContactListener(listener);
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
};

//----------------------------------------------------------------------

PhysicsEngine.prototype.update = function (dt){

  this.world.Step(
        dt   //frame-rate
     ,  6       //velocity iterations
     ,  4       //position iterations
  );

  for (var i = 0; i < this.bodies.length; i++) {

    var body = this.bodies[i];

    if(!body.isStatic() && body.isEnabled() && !body.isDestroyed()){

      var v = body.getBox2dBody().GetLinearVelocity();
      var x = body.getBox2dBody().GetPosition().x;
      var y = body.getBox2dBody().GetPosition().y;

      var angle = body.getBox2dBody().GetAngle();

      body.gameObject.getTransform().setPosition(new Vector2(x,y));
      body.gameObject.getTransform().setRotation(new Vector3(0,0,angle));



    }else if(body.isDestroyed())
      this.destroyList.push(body);

    // if(body.isStatic()){
    //   body.getBox2dBody().SetAngle(0);
    //   body.getBox2dBody().SetSpin(0);
    // }

  }

  for (var i = 0; i < this.destroyList.length; i++) {
    var body = this.destroyList[i];

    this.world.DestroyBody(body.getBox2dBody());
  }

  this.world.ClearForces();
  this.destroyList = [];


  // this.world.DrawDebugData();


};
