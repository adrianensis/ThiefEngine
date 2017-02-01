var PlayerLogic = function () {
    Script.call(this);
    this.v = 0;
};

PlayerLogic.prototype = new Script();
PlayerLogic.prototype.constructor = PlayerLogic;

//----------------------------------------------------------------------

PlayerLogic.prototype.start = function () {
  this.v = 2;
};

//----------------------------------------------------------------------

PlayerLogic.prototype.update = function (){

  var start = new Vector3(0,0,0);
  var end = new Vector3(1,0,0);

  var body = this.gameObject.getComponent(RigidBody);
  var linear = body.getBox2dBody().GetLinearVelocity();

  // var dt = Time.deltaTime();


  // var t = this.gameObject.getTransform();


  if (Input.isKeyPressed(32)) {
    // SPACE

    var createSoilder = function(x,y, name){
      // note that spriteBuilder is a global variable !
      var spriteBuilder = new SpriteBuilder();
      return spriteBuilder.create("res/soldier.png",new Vector2(x,y),1,1).
        addAnimation("right", 12, true, true, new Vector2(0,0), 1/12, 1, 14). // add RIGHT animation
        setAnimation("right"). // set the default animation
        setRigidBody(1,0,0). // set physics properties
        setCollider(new AABBCollider(1,1, false)). // set a Box Collider
      end();
    };

    Thief.addGameObjectToScene(createSoilder(-1,-1, "solx"));

  }else if (Input.isKeyPressed(37)) {
    // LEFT

    // t.translate(new Vector2(-this.v*Time.deltaTime(),0));

    linear.x = -this.v;
    linear.y = 0;


    this.gameObject.getComponent(SpriteRenderer).setAnimation("left");

  }else if (Input.isKeyPressed(38)) {
    // UP

    // t.translate(new Vector2(0,this.v*Time.deltaTime()));

    linear.y = this.v;
    linear.x = 0;

    this.gameObject.getComponent(SpriteRenderer).setAnimation("up");

  }else if (Input.isKeyPressed(39)) {
    // RIGHT

    // t.translate(new Vector2(this.v*Time.deltaTime(),0));

    linear.x = this.v;
    linear.y = 0;

    this.gameObject.getComponent(SpriteRenderer).setAnimation("right");

 }else if (Input.isKeyPressed(40)) {
    // DOWN

    // t.translate(new Vector2(0,-this.v*Time.deltaTime()));

    linear.y = -this.v;
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
