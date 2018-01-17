var PlayerLogic = function () {
    Script.call(this);
    this.v = 0;
    this.lastTime = 0;
    this.creationTime = 0;
    this.INVULNERABILITY_TIME = 5;
};

PlayerLogic.prototype = new Script();
PlayerLogic.prototype.constructor = PlayerLogic;

//----------------------------------------------------------------------

PlayerLogic.prototype.start = function () {
  this.v = 4;
  this.lastTime = Time.now();
  this.creationTime = Time.now();
};

//----------------------------------------------------------------------

PlayerLogic.prototype.update = function (){

  var now = Time.now();

  if(now - this.creationTime < this.INVULNERABILITY_TIME){
    var renderer = this.gameObject.getComponent(SpriteRenderer);
    if(renderer.isEnabled()){
      this.gameObject.getComponent(SpriteRenderer).disable();
    }else{
      this.gameObject.getComponent(SpriteRenderer).enable();
    }
  }else{
    this.gameObject.getComponent(SpriteRenderer).enable();
  }

  var body = this.gameObject.getComponent(RigidBody);
  var linear = body.getBox2dBody().GetLinearVelocity();

if (Input.isKeyPressed(37) || Input.isKeyPressed(65)) {
    // LEFT ARROW or A

    linear.x = -this.v;
    linear.y = 0;

    this.gameObject.getComponent(SpriteRenderer).setAnimation("left");

  }else if (Input.isKeyPressed(38) || Input.isKeyPressed(87)) {
    // UP ARROW or W

    linear.y = this.v;
    linear.x = 0;

    this.gameObject.getComponent(SpriteRenderer).setAnimation("up");

  }else if (Input.isKeyPressed(39) || Input.isKeyPressed(68)) {
    // RIGHT ARROW or D

    linear.x = this.v;
    linear.y = 0;

    this.gameObject.getComponent(SpriteRenderer).setAnimation("right");

 }else if (Input.isKeyPressed(40) || Input.isKeyPressed(83)) {
    // DOWN ARROW or S

    linear.y = -this.v;
    linear.x = 0;

    this.gameObject.getComponent(SpriteRenderer).setAnimation("down");

  }else{

    linear.y = 0;
    linear.x = 0;
  }
};

//----------------------------------------------------------------------

PlayerLogic.prototype.onEnterCollision = function (otherGameObject, contact){
  // console.log("onEnterCollision");

  var now = Time.now();

  if(now - this.lastTime > this.INVULNERABILITY_TIME && otherGameObject.getName() === "bullet"){
    otherGameObject.destroy();
    this.gameObject.destroy();
    var a = new Audio("res/fireball.mp3");
    a.play();

    this.lastTime = Time.now();
  }
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
