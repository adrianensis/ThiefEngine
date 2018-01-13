var GameLogic = function () {
    Script.call(this);
    this.spriteBuilder;
    this.snake = [];
    this.INIT_LENGTH = 0;
    this.MAX_LENGTH = 15;
    this.lastTime = 0;
    this.index = 0;
    this.lifes = 3;
};

GameLogic.prototype = new Script();
GameLogic.prototype.constructor = GameLogic;

GameLogic.prototype.start = function () {


  alert("TEST #1 - SNAKE\nEarn coins to obtain more followers up to 14 followers. If you collide with a follower, you'll lose a life. You have 3 lifes.");

  this.spriteBuilder = new SpriteBuilder();
  this.lastTime = Time.now();

  this.createGame();

  // CAMERA

  var canvas = Canvas.get();

  var screenW = canvas.width;
  var screenH = canvas.height;

  var zoom = 5;
  var aspect = (screenW/screenH);
  var w = 1*aspect;
  var h = 1;

  var camBuilder = new CameraBuilder();

  var cam =
  camBuilder.create(new Vector3(0,0,15)).
    setOrtho(w*zoom,h*zoom, -100,100).
  end();

  Thief.addGameObjectToScene(cam);
  Thief.setCamera(cam);

};

GameLogic.prototype.createGame = function(){
  this.createSnake();

  var perlin = new PerlinNoise(56,78); // perlin noise generator

  for (var i = 0; i < 10; i++) {

  }

  var n = 10;

  for ( var i=0; i<n; i++ ) {
    for ( var j=0; j<n; j++ ) {
      this.createCoin(perlin.generate(i,j)*10, perlin.generate(j,i)*10);
    }
  }

  for ( var i=-n; i<n; i++ ) {
    for ( var j=-n; j<n; j++ ) {
      if(Math.abs(perlin.generate(i,j)) <= 0.015)
        this.createSnorlax(i,j);
    }
  }
}

GameLogic.prototype.createCoin = function(x,y){
  var size = 0.6;
  var obj =
  this.spriteBuilder.create("res/coin.png",new Vector2(x,y),size,size).
    setName("coin").
    setRigidBody(1,0,0). // set physics properties
    addAnimation("right", 10, true, true, new Vector2(0,0), 1/10, 1, 14). // add RIGHT animation
    setAnimation("right"). // set the default animation
    //setCollider(new BoxCollider(size,size, true)). // set a Box Collider, setted as sensor
    setCollider(new CircleCollider(size/2,true)). // set a Cricle Collider
  end();

  Thief.addGameObjectToScene(obj);

  return obj;
};

GameLogic.prototype.createSnorlax = function(x,y){
  var obj =
  this.spriteBuilder.create("res/snorlax.bmp",new Vector2(x,y),2,2).
    setStatic(true).
    setAlphaColor(new Color(1,0,1,1)).
    setRigidBody(0,0,0). // set physics properties
    // setCollider(new BoxCollider(2,2, false)). // set a Box Collider
    setCollider(new CircleCollider(1,false)). // set a Cricle Collider

  end();

  Thief.addGameObjectToScene(obj);

  return obj;
};

GameLogic.prototype.createBody = function(x,y){
  var size = 1;
  var obj =
  this.spriteBuilder.create("res/soldier.png",new Vector2(x,y),size,size).
    setName("body").
    addAnimation("right", 12, true, true, new Vector2(0,0), 1/12, 1, 14). // add RIGHT animation
    setAnimation("right"). // set the default animation
    setRigidBody(1,0,0). // set physics properties
    //setCollider(new BoxCollider(size,size, true)). // set a Box Collider, setted as sensor
    setCollider(new CircleCollider(0.1,true)). // set a Cricle Collider
  end();

  Thief.addGameObjectToScene(obj);

  return obj;
};

GameLogic.prototype.createHead = function(x,y){
  var size = 1;
  var obj =
  this.spriteBuilder.create("res/pok-char.png",new Vector2(x,y),size,size).
    addAnimation("up", 4, true, false, new Vector2(0,0), 1/4, 1/4, 6). // add UP animation
    addAnimation("down", 4, true, false, new Vector2(0,0.75), 1/4, 1/4, 6). // add DOWN animation
    addAnimation("left", 4, true, false, new Vector2(0,0.5), 1/4, 1/4, 6). // add LEFT animation
    addAnimation("right", 4, true, false, new Vector2(0,0.25), 1/4, 1/4, 6). // add RIGHT animation
    setAnimation("down"). // set the default animation
    setRigidBody(1,0,0). // set physics properties
    // setCollider(new BoxCollider(size,size, false)). // set a Box Collider
    setCollider(new CircleCollider(0.2,false)). // set a Cricle Collider
    addScript(new PlayerLogic()). // add a Logic Script
  end();

  Thief.addGameObjectToScene(obj);

  return obj;
};

GameLogic.prototype.createSnake = function(){

  this.snake[0] = this.createHead(0,4);

  for (var i = 1; i < this.INIT_LENGTH; i++) {
    this.snake[i] = this.createBody(-i,4);
  }
};

GameLogic.prototype.destroySnake = function(){
  for (var i = 0; i < this.snake.length; i++) {
    this.snake[i].destroy();
  }

  this.snake = []
  this.index = 0;
};

GameLogic.prototype.moveSnake = function(){

  var now = Time.now();

  var targetBody = this.snake[this.index].getComponent(RigidBody).getBox2dBody(); //.GetLinearVelocity();

  if(this.index + 1 < this.snake.length){

    var seekerBody = this.snake[this.index+1].getComponent(RigidBody).getBox2dBody(); //.GetLinearVelocity();

    var target = new Vector2(targetBody.GetPosition().x, targetBody.GetPosition().y);
    var seeker = new Vector2(seekerBody.GetPosition().x, seekerBody.GetPosition().y);

    if(target.dst(seeker) >= 1.2){
      var desiredVel = target.sub(seeker).nor().mulScl(2);
      var currentVel = new Vector2(seekerBody.GetLinearVelocity().x, seekerBody.GetLinearVelocity().y);
      var force = desiredVel.sub(currentVel).mulScl(1);

      var seekerVel = seekerBody.GetLinearVelocity();
      seekerVel.x = currentVel.x + force.x;
      seekerVel.y = currentVel.y + force.y;
    }else{
      var seekerVel = seekerBody.GetLinearVelocity();
      seekerVel.x = 0;
      seekerVel.y = 0;
    }
  }

  this.index++

  this.index = this.index % this.snake.length;

  this.lastTime = now;
};

GameLogic.prototype.isDead = function(){
  return this.snake.length > 0 && this.snake[0].getComponent(PlayerLogic).isDestroyed();
}

GameLogic.prototype.getCoins = function(){
  return this.snake.length > 0 ? this.snake[0].getComponent(PlayerLogic).coins : 0;
}

GameLogic.prototype.update = function (){

  if(!this.isDead()){

    this.moveSnake();

    if (Input.isKeyPressed(32)) {
      // SPACE

    }else if (Input.isKeyPressed(13)) {
      // ENTER

    }

    if(this.snake.length < this.MAX_LENGTH && this.getCoins() > this.snake.length-1){
      var lastPosition = this.snake[this.snake.length-1].getComponent(RigidBody).getBox2dBody().GetPosition();
      this.snake.push(this.createBody(lastPosition.x,lastPosition.y+3));
      this.index = 0;
    }

  }else{
      if(this.lifes > 0){
        this.destroySnake();
        this.createSnake();
        this.lifes--;
      }
  }

};
