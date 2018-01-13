var test = function () {

Thief.init();
Thief.createAndSetScene("test");

// -----------------------------------------------------------------------------

  
// -----------------------------------------------------------------------------

var spriteBuilder = new SpriteBuilder();
var gameObjectBuilder = new GameObjectBuilder();

// -----------------------------------------------------------------------------

var controller =
gameObjectBuilder.begin().
setName("GameController").
addScript(new GameLogic()).
end();

Thief.addGameObjectToScene(controller);

// -----------------------------------------------------------------------------

createMap(spriteBuilder);

// -----------------------------------------------------------------------------

  // BITMAP FONTS
  var font =
  spriteBuilder.create("res/font.bmp",new Vector2(-6,0),6,6).
    setStatic(true).
    setAlphaColor(new Color(1,0,1,1)).
  end();

// -----------------------------------------------------------------------------

  // SNORLAX
  var snorlax =
  spriteBuilder.create("res/snorlax.bmp",new Vector2(0,-1.7),2,2).
    setStatic(true).
    setAlphaColor(new Color(1,0,1,1)).
    setRigidBody(0,0,0). // set physics properties
    setCollider(new BoxCollider(2,2, false)). // set a Box Collider
  end();

// -----------------------------------------------------------------------------

  // PLAYER
  var player =
  spriteBuilder.create("res/pok-char.png",new Vector2(-2,-2),1,1).
    addAnimation("up", 4, true, false, new Vector2(0,0), 1/4, 1/4, 6). // add UP animation
    addAnimation("down", 4, true, false, new Vector2(0,0.75), 1/4, 1/4, 6). // add DOWN animation
    addAnimation("left", 4, true, false, new Vector2(0,0.5), 1/4, 1/4, 6). // add LEFT animation
    addAnimation("right", 4, true, false, new Vector2(0,0.25), 1/4, 1/4, 6). // add RIGHT animation
    setAnimation("down"). // set the default animation
    setRigidBody(1,0,0). // set physics properties
    // setCollider(new BoxCollider(1,1, false)). // set a Box Collider
    setCollider(new CircleCollider(0.5,false)). // set a Box Collider
    addScript(new PlayerLogic()). // add a Logic Script
  end();

// -----------------------------------------------------------------------------

  // SOILDER
  var createSoilder = function(x,y, size, name){
    // note that spriteBuilder is a global variable !
    return spriteBuilder.create("res/soldier.png",new Vector2(x,y),size,size).
      setName(name).
      addAnimation("right", 12, true, true, new Vector2(0,0), 1/12, 1, 14). // add RIGHT animation
      setAnimation("right"). // set the default animation
      setRigidBody(1,0,0). // set physics properties
      setCollider(new BoxCollider(size,size, false)). // set a Box Collider
    end();
  };

// -----------------------------------------------------------------------------

  // GREEN BLOCK
  var green =
  spriteBuilder.create("res/soldier.png",new Vector2(0,-5),10,5).
    setColor(new Color(0,1,0,1)).
    setStatic(true).
  end();

// -----------------------------------------------------------------------------

  // Thief.createAndSetScene("snake");
  // Thief.addGameObjectToScene(cam);
  // Thief.setCamera(cam);
  // Thief.addGameObjectToScene(controller);


  // Thief.addGameObjectToScene(player);

  // var size = 0.5;
  // var n = 30;
  // var nn = n*size;
  //
  // for ( var i=0; i<nn; i+=size) {
  //   	Thief.addGameObjectToScene(createSoilder(i+1,0, size, "soilder"));
  // }

  // Thief.addGameObjectToScene(snorlax);
  // Thief.addGameObjectToScene(font);

  // Thief.setScene("test");

  Thief.run();

};
