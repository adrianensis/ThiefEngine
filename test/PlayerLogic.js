var PlayerLogic = function () {
    Script.call(this);
    this.v = 1;

};

PlayerLogic.prototype = new Script();
PlayerLogic.prototype.constructor = PlayerLogic;

//----------------------------------------------------------------------

PlayerLogic.prototype.start = function () {

  // var w = 1/8;
  // var h = 1/6;
  // Thief.spriteBuilder.begin("test/res/digi/digi1.png", new Vector2(2,0.1), 0.5, true).
  //   setTextureRegion(new Vector2((1/8),(1/6)),1/8,1/6).
  // end();
};

//----------------------------------------------------------------------

PlayerLogic.prototype.update = function (){

  var start = new Vector3(0,0,0);
  var end = new Vector3(1,0,0);

  // var t = this.gameObject.getTransform();
  // var m = t.getMatrix();

  // DebugRenderer.setTransformationMatrix(m);
  // DebugRenderer.drawLine(start,end,Color.BLUE);
  // DebugRenderer.setTransformationMatrix(null);

    var body = this.gameObject.getComponent(RigidBody);
    var linear = body.getBox2dBody().GetLinearVelocity();

    this.v = 50*Time.deltaTime();


    // var t = this.gameObject.getTransform();
    // var m = t.getMatrix();
    // console.log(m.data);
    // m.print();
    // DebugRenderer.setTransformationMatrix(m);
    // DebugRenderer.drawLine(new Vector3(0,0,0),new Vector3(0,1,0),Color.BLUE);
    // DebugRenderer.drawLine(new Vector3(0,0,0),new Vector3(1,0,0),Color.RED);
    // DebugRenderer.drawLine(new Vector3(0,0,0),t.up,Color.BLUE);
    // DebugRenderer.drawLine(new Vector3(0,0,0),t.right,Color.RED);
	  // DebugRenderer.setTransformationMatrix(null);

    if (Input.isKeyPressed(32)) {

      body.getBox2dBody().SetAngularVelocity(5);

        // this.gameObject.getScene().addObject(createSnorlax(Math.random()*5,Math.random()*5,0.5));

        // body.linear = body.linear.add(new Vector2(0,2));

        // var spriteBuilder = new SpriteBuilder();
        //
        // var green =
        // spriteBuilder.begin(null).
        //   setPosition(new Vector2(0,0)).
        //   setScale(new Vector2(10,5)).
        //   setColor(new Color(0,1,0,1)).
        //   setStatic(true).
        //   setLayer(0).
        // end();
        //
        //
        // Thief.addGameObjectToScene(green);

    }

    if (Input.isKeyPressed(37)) {
        // LEFT
            this.direction = -1;
            // this.gameObject.getTransform().rotate(new Vector3(0,0,1));

            // this.gameObject.getTransform().translate(new Vector2(-this.v*Time.deltaTime(),0));
            //
            //
              linear.x = -this.v;
              linear.y = 0;

            // body.SetLinearVelocity(vel);

            // this.gameObject.getComponent(RigidBody).linearVelocity = new Vector2(-5,0);
            this.gameObject.getComponent(SpriteRenderer).setAnimation("left");

    }
    else if (Input.isKeyPressed(38)) {
        // UP

        // console.log(Input.isKeyPressed(39));

            // this.gameObject.getTransform().translate(new Vector2(0,this.v*Time.deltaTime()));

            linear.y = this.v;
            linear.x = 0;

        //   body.SetLinearVelocity(vel);
          // this.gameObject.getComponent(RigidBody).linearVelocity = new Vector2(0,10);

            this.gameObject.getComponent(SpriteRenderer).setAnimation("up");

    }else if (Input.isKeyPressed(39)) {
        // RIGHT
            this.direction = 1;

            // this.gameObject.getTransform().translate(new Vector2(this.v*Time.deltaTime(),0));

            linear.x = this.v;
            linear.y = 0;

        //   body.SetLinearVelocity(vel);

          // this.gameObject.getComponent(RigidBody).linearVelocity = Vector4.sum(this.gameObject.getComponent(RigidBody).linearVelocity,new Vector2(1,0));
          // this.gameObject.getComponent(RigidBody).linearVelocity = new Vector2(50,0);

            this.gameObject.getComponent(SpriteRenderer).setAnimation("right");

   }else if (Input.isKeyPressed(40)) {
        // DOWN

            // this.gameObject.getTransform().translate(new Vector2(0,-this.v*Time.deltaTime()));

            linear.y = -this.v;
            linear.x = 0;

        //   body.SetLinearVelocity(vel);

          // this.gameObject.getComponent(RigidBody).linearVelocity = new Vector2(0,-10);
            this.gameObject.getComponent(SpriteRenderer).setAnimation("down");


    }else{
        // body.linear.y = 0;
        // body.linear.x = 0;
    }

};

//----------------------------------------------------------------------

PlayerLogic.prototype.onEnterCollision = function (otherGameObject, contact){
  // console.log("onEnterCollision");

  // otherGameObject.destroy();
};

//----------------------------------------------------------------------

PlayerLogic.prototype.onExitCollision = function (otherGameObject, contact){
  // console.log("onExitCollision");
};

//----------------------------------------------------------------------

PlayerLogic.prototype.onDestroy = function (){
  // console.log("onDestroy");
};

//----------------------------------------------------------------------
