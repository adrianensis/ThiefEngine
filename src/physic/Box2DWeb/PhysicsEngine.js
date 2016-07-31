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
    this.bodies = Array(0);
    this.fixtures = Array(0);

    // TODO refactor

    var canvas = document.getElementById("glcanvas");
    //alert("Width: "+canvas.width + " Height: " + canvas.height);
    // this.tree = new QuadTree(canvas.width/64,canvas.height/64);

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
        // this.bodies[i].gameObject.getComponent(Transform).setPosition(new Vector3(x,y,0));

    }

    listener.PreSolve = function(contact, oldManifold) {
        // PreSolve
    }

    this.world.SetContactListener(listener);
};

PhysicsEngine.prototype.setBodies = function (bodies){
    this.bodies = bodies;
    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].adapt();
      this.bodies[i].bodyDef.position.x = this.bodies[i].gameObject.getComponent(Transform).position.x;
      this.bodies[i].bodyDef.position.y = this.bodies[i].gameObject.getComponent(Transform).position.y;
      var fixture = this.world.CreateBody(this.bodies[i].bodyDef).CreateFixture(this.bodies[i].fixDef);
      // fixture.GetBody().SetUserData("hello");
      this.bodies[i].fixture = fixture;

  	// this.tree.addCollider(this.bodies[i].gameObject.getComponent(AABBCollider));
  	}
};

PhysicsEngine.prototype.addBody = function (body){
    this.bodies.push(body);
    this.tree.addCollider(body.gameObject.getComponent(Collider));
};

PhysicsEngine.prototype.update = function (){
   //console.log("PHYSICS");
   // for (var i = 0; i < this.bodies.length; i++) {
   // 	for (var j= 0; j < this.bodies.length; j++){
   //         if(this.bodies[i].checkCollision(this.bodies[j])){
   //          //    this.bodies[i].setCollisionDetected(true);
   //          //    this.bodies[j].setCollisionDetected(true);
   //
   //          console.log(this.bodies[i].gameObject.getComponent(AABBCollider).id)
   //          console.log(this.bodies[j].gameObject.getComponent(AABBCollider).id)
   //
   //
   //             //this.bodies[i].gameObject.getComponent(Transform).restoreLastPosition();
   //
   //             this.bodies[j].gameObject.getComponent(Transform).restoreLastPosition();
   //             console.log("HIT");
   //         }
   //     }
   // }

    // this.tree.update();

  // TODO CONTINUE HERE. DON'T MOVE WITH THE TRANSFORM, MOVE WITH IMPULSES!!!!!

  // for (var i = 0; i < this.bodies.length; i++) {
  //
  //     this.bodies[i].fixture.GetBody().SetPosition(new b2Vec2(
  //     this.bodies[i].gameObject.getComponent(Transform).position.x,
  //   this.bodies[i].gameObject.getComponent(Transform).position.y));
  // }

  this.world.Step(
        1 / 60   //frame-rate
     ,  10       //velocity iterations
     ,  10       //position iterations
  );

  for (var i = 0; i < this.bodies.length; i++) {
    if(!this.bodies[i].isStatic()){
      var v = this.bodies[i].fixture.GetBody().GetLinearVelocity();
      var x = this.bodies[i].fixture.GetBody().GetPosition().x;
      var y = this.bodies[i].fixture.GetBody().GetPosition().y;
      // console.log("V: "+v.x + " " +v.y);
      // this.bodies[i].gameObject.getComponent(Transform).setPosition(new Vector3(x,y,0));
      // if(this.bodies[i].isOnCollision())
        this.bodies[i].gameObject.getComponent(Transform).setPosition(new Vector2(x,y));
      // else
        // this.bodies[i].gameObject.getComponent(Transform).translate(new Vector2(v.x/30,v.y/30));
      // console.log(this.bodies[i].gameObject.getComponent(Transform).position);
    }
  }

  this.world.ClearForces();

};
