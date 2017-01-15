var PlayerLogic = function () {
    Script.call(this);
    this.v = 0;
};

PlayerLogic.prototype = new Script();
PlayerLogic.prototype.constructor = PlayerLogic;

//----------------------------------------------------------------------

PlayerLogic.prototype.start = function () {
  this.v = 50;
};

//----------------------------------------------------------------------

PlayerLogic.prototype.update = function (){

  var start = new Vector3(0,0,0);
  var end = new Vector3(1,0,0);

  var body = this.gameObject.getComponent(RigidBody);
  var linear = body.getBox2dBody().GetLinearVelocity();

  var dt = Time.deltaTime();


  // var t = this.gameObject.getTransform();


  if (Input.isKeyPressed(32)) {
    // SPACE

  }else if (Input.isKeyPressed(37)) {
    // LEFT

    // t.translate(new Vector2(-this.v*Time.deltaTime(),0));

    linear.x = -this.v*dt;
    linear.y = 0;


    this.gameObject.getComponent(SpriteRenderer).setAnimation("left");

  }else if (Input.isKeyPressed(38)) {
    // UP

    // t.translate(new Vector2(0,this.v*Time.deltaTime()));

    linear.y = this.v*dt;
    linear.x = 0;

    this.gameObject.getComponent(SpriteRenderer).setAnimation("up");

  }else if (Input.isKeyPressed(39)) {
    // RIGHT

    // t.translate(new Vector2(this.v*Time.deltaTime(),0));

    linear.x = this.v*dt;
    linear.y = 0;

    this.gameObject.getComponent(SpriteRenderer).setAnimation("right");

 }else if (Input.isKeyPressed(40)) {
    // DOWN

    // t.translate(new Vector2(0,-this.v*Time.deltaTime()));

    linear.y = -this.v*dt;
    linear.x = 0;

    this.gameObject.getComponent(SpriteRenderer).setAnimation("down");

  }else{


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
