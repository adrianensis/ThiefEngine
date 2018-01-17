var TurretLogic = function (player) {
    Script.call(this);
    this.bullet = null;
    this.launched = false;
    this.firstDelay = true;
    this.player = player;
    this.lastTime = 0;
    this.speed = 2;
    this.MAX_SPEED = 5;
};

TurretLogic.prototype = new Script();
TurretLogic.prototype.constructor = TurretLogic;

//----------------------------------------------------------------------

TurretLogic.prototype.start = function () {
  var turretPos = this.gameObject.getTransform().getPosition();
  this.bullet = this.createBullet(turretPos.x,turretPos.y);
  this.lastTime = Time.now();
};

//----------------------------------------------------------------------

TurretLogic.prototype.createBullet = function(x,y){

  this.spriteBuilder = new SpriteBuilder();

  var size = 1;
  var obj =
  this.spriteBuilder.create("res/rasengan.png",new Vector2(x,y),size+0.2,size).
    setName("bullet").
    addAnimation("right", 3, true, false, new Vector2(0,0), 1/3, 1, 10). // add RIGHT animation
    setAnimation("right"). // set the default animation
    setRigidBody(1,0,0). // set physics properties
    setCollider(new CircleCollider(0.4,true)). // set a Cricle Collider
  end();

  Thief.addGameObjectToScene(obj);

  return obj;
};

TurretLogic.prototype.launchBullet = function (){

  var turretPos = this.gameObject.getTransform().getPosition();

  var b2Body = this.bullet.getComponent(RigidBody).getBox2dBody();

  if(b2Body){
    var linear = this.bullet.getComponent(RigidBody).getBox2dBody().GetLinearVelocity();
    var playerPos = this.player.getTransform().getPosition();
    var desiredVel = turretPos.cpy().sub(playerPos).nor().mulScl(-this.speed);
    linear.x = desiredVel.x;
    linear.y = desiredVel.y;

    if(this.speed < this.MAX_SPEED)
      this.speed++;
  }

  this.launched = true;
};

TurretLogic.prototype.reloadBullet = function (){
  this.bullet.destroy(); // first destroy last bullet.
  var turretPos = this.gameObject.getTransform().getPosition();
  this.bullet = this.createBullet(turretPos.x,turretPos.y);
  this.launched = false;
};

TurretLogic.prototype.update = function (){

  var now = Time.now();

  if(this.firstDelay && now - this.lastTime > 5){
    this.firstDelay = false;
    this.lastTime = Time.now();
  }else if(!this.firstDelay){
    if(!this.launched){
      this.launchBullet();
    }else if(this.launched && now - this.lastTime > 8.5){
      this.reloadBullet();
      this.lastTime = Time.now();
    }
  }

};

//----------------------------------------------------------------------

TurretLogic.prototype.onEnterCollision = function (otherGameObject, contact){
  // console.log("onEnterCollision");

};

//----------------------------------------------------------------------

TurretLogic.prototype.onExitCollision = function (otherGameObject, contact){
  // console.log("onExitCollision");
};

//----------------------------------------------------------------------

TurretLogic.prototype.onDestroy = function (){
  // console.log("onDestroy");
};

//----------------------------------------------------------------------
