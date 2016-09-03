var PlayerLogic = function () {
    Script.call(this);
    this.v = 5;

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



    // console.log(this.gameObject.getTransform().position);

    // this.gameObject.getTransform().rotate(new Vector3(0.5,0.5,0.0));


    var body = this.gameObject.getComponent(RigidBody);
    var linear = body.getBox2dBody().GetLinearVelocity();
    // var linear = body.linear;

    // console.log(this.gameObject.getTransform().position);
    // body.linear.x = 0;
    // body.linear.y = 0;

    // body.linear = body.linear.add(new Vector2(0,-0.3));


    if (Input.getButton() === 0) {

        // this.gameObject.getScene().addObject(createSnorlax(Math.random()*5,Math.random()*5,0.5));

        // body.linear = body.linear.add(new Vector2(0,2));
    }

    if (Input.isKeyPressed(37)) {
        // LEFT
            this.direction = -1;
            // this.gameObject.getTransform().rotate(new Vector2(10,0));

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
