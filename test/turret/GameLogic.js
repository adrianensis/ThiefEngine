var GameLogic = function () {
    Script.call(this);
    this.spriteBuilder;
    this.player = null;
    this.MAX_LIFES = 3;
    this.lastTime = 0;
    this.lifes = [];
    this.turrets = [];
    this.explosion = null;
};

GameLogic.prototype = new Script();
GameLogic.prototype.constructor = GameLogic;

GameLogic.prototype.start = function () {

  this.song = new Audio("res/opening.mp3");
  this.song.loop = true;

  alert("TEST #2 - TURRETS\nDodge the bullets. You have 5 seconds for invulnerability. You have 3 lifes.");

  this.spriteBuilder = new SpriteBuilder();
  this.lastTime = Time.now();

  this.createCamera();
  this.createGame();
};

GameLogic.prototype.createCamera = function(){
  // CAMERA

  var canvas = Canvas.get();

  var screenW = canvas.width;
  var screenH = canvas.height;

  var zoom = 7;
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

  createMap(this.spriteBuilder);

  for (var i = 0; i < this.MAX_LIFES; i++) {
    this.lifes.push(this.createHeart(-13+(i*1.5),6));
  }

  this.player = this.createPlayer(0,0);

  var perlin = new PerlinNoise(56,78); // perlin noise generator

  var n = 10;

  for ( var i=-n; i<n; i++ ) {
    for ( var j=-n; j<n; j++ ) {
      if(Math.abs(perlin.generate(i,j)) <= 0.01)
        this.turrets.push(this.createTurret(i,j))
    }
  }
};

GameLogic.prototype.createHeart = function(x,y){
  var size = 0.8;
  var obj =
  this.spriteBuilder.create("res/heart.png",new Vector2(x,y),size,size).
    setName("heart").
    setLayer(1).
  end();

  Thief.addGameObjectToScene(obj);

  return obj;
};

GameLogic.prototype.createTurret = function(x,y){
  var size = 1.2;
  var obj =
  this.spriteBuilder.create("res/turret.png",new Vector2(x,y),size,size).
    setName("snorlax").
    setLayer(1).
    setStatic(true).
    setRigidBody(0,0,0). // set physics properties
    setCollider(new CircleCollider(0.5,false)). // set a Cricle Collider
    addScript(new TurretLogic(this.player)). // add a Logic Script
  end();

  Thief.addGameObjectToScene(obj);

  return obj;
};

GameLogic.prototype.createExplosion = function(x,y){
  var size = 2;
  var obj =
  this.spriteBuilder.create("res/explosion.png",new Vector2(x,y),size,size).
    setName("explosion").
    addAnimation("right", 6, true, false, new Vector2(0,0), 1/6, 1, 10). // add RIGHT animation
    setAnimation("right"). // set the default animation
    addScript(new ExplosionLogic()). // add a Logic Script
  end();

  Thief.addGameObjectToScene(obj);

  return obj;
};

GameLogic.prototype.createPlayer = function(x,y){
  var size = 1.5;
  var obj =
  this.spriteBuilder.create("res/pok-char.png",new Vector2(x,y),size,size).
    addAnimation("up", 4, true, false, new Vector2(0,0), 1/4, 1/4, 6). // add UP animation
    addAnimation("down", 4, true, false, new Vector2(0,0.75), 1/4, 1/4, 6). // add DOWN animation
    addAnimation("left", 4, true, false, new Vector2(0,0.5), 1/4, 1/4, 6). // add LEFT animation
    addAnimation("right", 4, true, false, new Vector2(0,0.25), 1/4, 1/4, 6). // add RIGHT animation
    setAnimation("down"). // set the default animation
    setRigidBody(1,0,0). // set physics properties
    // setCollider(new BoxCollider(size,size, false)). // set a Box Collider
    setCollider(new CircleCollider(0.4,false)). // set a Cricle Collider
    addScript(new PlayerLogic()). // add a Logic Script
  end();

  Thief.addGameObjectToScene(obj);

  return obj;
};

GameLogic.prototype.isDead = function(){
  return this.player.getComponent(PlayerLogic).isDestroyed();
}

GameLogic.prototype.update = function (){

  if(this.lifes.length > 0){
    if(!this.isDead()){

    }else{
        this.player.destroy();
        var pos = this.player.getTransform().getPosition();
        this.explosion = this.createExplosion(pos.x, pos.y);

        if(this.lifes.length > 1){
          // create player and reasign player to each turret
          this.player = this.createPlayer(0,0);
          for (var i = 0; i < this.turrets.length; i++) {
            this.turrets[i].player = this.player;
          }
        }else
          alert("GAME OVER. Press F5 to restart.");

        this.lifes[this.lifes.length-1].destroy();
        this.lifes.splice(-1,1); // remove last
    }
  }

};
