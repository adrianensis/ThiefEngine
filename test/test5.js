var test = function () {

Thief.init();
Thief.createAndSetScene("test");

var spriteBuilder = new SpriteBuilder();

 /*
  * PERLIN NOISE
  */

  var perlin = new PerlinNoise(25,10);

  var resolution = 50;
  var step = 0.1;

  var random = new Random(5);

  for ( var i=0; i<resolution; i++ ) {
      for ( var j=0; j<resolution; j++ ) {

          var v = perlin.generate(i,j);

          var tileSizeX = 1/88;
          var tileSizeY = 1/69;
          var borderX = 1/1408; // 1408 is the image width
          var borderY = 1/1104; // 1104 is the image height

          var pos = new Vector2(i*step,j*step);
          var size = step;

          var tex = "res/pokemonTiles.png";
          // var tex = null;

          spriteBuilder.begin(tex).
            setPosition(pos).
            setSize(size).
            setStatic(true);

          // v *= 10;
          // console.log(v);

          // if(v < 0)
          //   v *=-1;

          var color = new Color(v,v,v,1);

          if(v > 0.1){
            // spriteBuilder.setColor(color);
              spriteBuilder.setTextureRegion(new Vector2(tileSizeX*0 + borderX, borderY + 1-(tileSizeY*29)),tileSizeX-borderX,tileSizeY-borderY);

          }else{
            // spriteBuilder.setColor(color);
              // if(random.seededRandom() > 0.98){
                spriteBuilder.setTextureRegion(new Vector2(tileSizeX*5 + borderX, borderY + 1-(tileSizeY*2)),tileSizeX-borderX,tileSizeY-borderY);
              // }else{
                  // spriteBuilder.setTextureRegion(new Vector2(tileSizeX*10 + borderX, borderY + 1-tileSizeY),tileSizeX-borderX,tileSizeY-borderY);
              // }
            }
          // else{
              // if(random.seededRandom() > 0.8){
                  // spriteBuilder.setTextureRegion(new Vector2(tileSizeX*4 + borderX, borderY + 1-tileSizeY),tileSizeX-borderX,tileSizeY-borderY);
              // }else{
                  // spriteBuilder.setTextureRegion(new Vector2(tileSizeX + borderX, borderY + 1-tileSizeY),tileSizeX-borderX,tileSizeY-borderY);
              // }
          // }

          // Thief.addGameObjectToScene(spriteBuilder.end());

      }
  }

  /*
  * END PERLIN NOISE
  */

  /**
   * NOTE: NEW FACADE
   */



   // BITMAP FONTS
  var font =
  spriteBuilder.begin("res/font.bmp").
    setPosition(new Vector2(3,0)).
    setSize(6).
    setStatic(true).
    setAlphaColor(new Color(1,0,1,1)).
  end();



  var snorlax =
  spriteBuilder.begin("res/snorlax.bmp").
    setPosition(new Vector2(0,-2)).
    // setSize(1).
    setScale(new Vector2(1,1)).
    setStatic(true).
    setAlphaColor(new Color(1,0,1,1)).
    setRigidBody(). // set physics properties
    setCollider(new AABBCollider(1,1, false)). // set a Box Collider
  end();


  var player =
  spriteBuilder.begin("res/pok-char.png"). // create a basic sprite
    setPosition(new Vector2(0,0)).
    // setRotation(new Vector3(0,0,90)).
    setSize(1).
    setStatic(false).
    addAnimation("up", 4, true, false, new Vector2(0,0), 1/4, 1/4, 6). // add UP animation
    addAnimation("down", 4, true, false, new Vector2(0,0.75), 1/4, 1/4, 6). // add DOWN animation
    addAnimation("left", 4, true, false, new Vector2(0,0.5), 1/4, 1/4, 6). // add LEFT animation
    addAnimation("right", 4, true, false, new Vector2(0,0.25), 1/4, 1/4, 6). // add RIGHT animation
    setAnimation("down"). // set the default animation
    setRigidBody(). // set physics properties
    setCollider(new AABBCollider(1,1, false)). // set a Box Collider
    // setCollider(new CircleCollider(0.5)). // set a Box Collider
    addScript(new PlayerLogic()). // add a Logic Script
  end();


var createSoilder = function(x,y){

  var collider = new AABBCollider(1,1, false);

  // console.log(collider.getId());

  return spriteBuilder.begin("res/soldier.png"). // create a basic sprite
    setPosition(new Vector2(x,y)).
    setSize(1).
    setStatic(false).
    addAnimation("right", 12, true, true, new Vector2(0,0), 1/12, 1, 14). // add RIGHT animation
    setAnimation("right"). // set the default animation
    setRigidBody(). // set physics properties
    setCollider(collider). // set a Box Collider
  end();
};

  // player.addChild(soilder);

  Thief.addGameObjectToScene(createSoilder(2,-1.5));

  Thief.addGameObjectToScene(player);
  Thief.addGameObjectToScene(createSoilder(3.1,-1.3));
  Thief.addGameObjectToScene(createSoilder(4.2,-1.2));
  Thief.addGameObjectToScene(createSoilder(5.3,-1.1));
  Thief.addGameObjectToScene(snorlax);
  // Thief.addGameObjectToScene(font);


  var canvas = document.getElementById("glcanvas");
	// alert("Width: "+canvas.width + " Height: " + canvas.height);

  var screenW = canvas.width;
  var screenH = canvas.height;

  var zoom = 5;
  var aspect = (screenW/screenH);
  var w = 1*aspect;
  var h = 1;

  var camBuilder = new CameraBuilder();

  var cam =
  camBuilder.begin().
    setPosition(new Vector3(0,0,15)).
    setOrtho(w*zoom,h*zoom, -100,100).
    addScript(new CameraLogic(player)).
  end();

  Thief.setCamera(cam);

  // Thief.setGravity(new Vector2(0,-5));

  Thief.run();

};
