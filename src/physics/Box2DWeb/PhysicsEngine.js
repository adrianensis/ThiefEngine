var   b2Vec2 = Box2D.Common.Math.b2Vec2
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
    this.fixtures = [];

    this.world = new b2World(
          new b2Vec2(0, 0)    //NO gravity
       ,  false                 //allow sleep
    );

    var listener = new b2Listener;

    listener.BeginContact = function(contact) {
        //console.log(contact.GetFixtureA().GetBody().GetUserData());
        console.log("ENTER");
        // console.log(contact.GetFixtureA().GetBody().GetUserData().position);

    }

    listener.EndContact = function(contact) {
        // console.log(contact.GetFixtureA().GetBody().GetUserData());
        console.log("EXIT");
    }

    listener.PostSolve = function(contact, impulse) {
        // if (contact.GetFixtureA().GetBody().GetUserData() == 'ball' || contact.GetFixtureB().GetBody().GetUserData() == 'ball') {
        //     var impulse = impulse.normalImpulses[0];
        //     if (impulse < 0.2) return; //threshold ignore small impacts
        //     world.ball.impulse = impulse > 0.6 ? 0.5 : impulse;
        //     console.log(world.ball.impulse);
        // }

        //contact.GetFixtureA().GetBody().SetPosition(new b2Vec2(0,0));

        // var x = contact.GetFixtureA().GetBody().GetPosition().x;
        // var y = contact.GetFixtureA().GetBody().GetPosition().y;
        //
        // var i =contact.GetFixtureA().GetBody().GetUserData();
        // this.bodies[i].gameObject.getTransform().setPosition(new Vector3(x,y,0));

    }

    listener.PreSolve = function(contact, oldManifold) {
        // PreSolve
    }

    this.world.SetContactListener(listener);
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

PhysicsEngine.prototype.update = function (){

  this.world.Step(
        1 / 60   //frame-rate
     ,  6       //velocity iterations
     ,  4       //position iterations
  );

  for (var i = 0; i < this.bodies.length; i++) {
    // console.log(this.bodies[i]);
    if(!this.bodies[i].isStatic()){
      var v = this.bodies[i].getBox2dBody().GetLinearVelocity();
      var x = this.bodies[i].getBox2dBody().GetPosition().x;
      var y = this.bodies[i].getBox2dBody().GetPosition().y;
      this.bodies[i].gameObject.getTransform().setPosition(new Vector2(x,y));
    }
  }

  this.world.ClearForces();

};
