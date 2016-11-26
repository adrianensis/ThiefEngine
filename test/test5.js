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
    setName("snorlax").
    setPosition(new Vector2(0,-2)).
    // setSize(1).
    setScale(new Vector2(1,1)).
    setStatic(true).
    setAlphaColor(new Color(1,0,1,1)).
    setRigidBody(0,0,0). // set physics properties
    setCollider(new AABBCollider(1,1, false)). // set a Box Collider
    setLayer(1).
  end();


  var player =
  spriteBuilder.begin("res/pok-char.png"). // create a basic sprite
    setName("player").
    setPosition(new Vector2(0,0)).
    // setRotation(new Vector3(0,0,90)).
    setSize(1).
    setStatic(false).
    addAnimation("up", 4, true, false, new Vector2(0,0), 1/4, 1/4, 6). // add UP animation
    addAnimation("down", 4, true, false, new Vector2(0,0.75), 1/4, 1/4, 6). // add DOWN animation
    addAnimation("left", 4, true, false, new Vector2(0,0.5), 1/4, 1/4, 6). // add LEFT animation
    addAnimation("right", 4, true, false, new Vector2(0,0.25), 1/4, 1/4, 6). // add RIGHT animation
    setAnimation("down"). // set the default animation
    setRigidBody(1,0,0). // set physics properties
    // setCollider(new AABBCollider(1,1, false)). // set a Box Collider
    setCollider(new CircleCollider(0.5,false)). // set a Box Collider
    addScript(new PlayerLogic()). // add a Logic Script
    setLayer(2).
  end();


var createSoilder = function(x,y, name){

  var collider = new AABBCollider(1,1, false);

  // console.log(collider.getId());

  return spriteBuilder.begin("res/soldier.png"). // create a basic sprite
    setName(name).
    setPosition(new Vector2(x,y)).
    setSize(1).
    setStatic(false).
    addAnimation("right", 12, true, true, new Vector2(0,0), 1/12, 1, 14). // add RIGHT animation
    setAnimation("right"). // set the default animation
    setRigidBody(1,0,0). // set physics properties
    setCollider(collider). // set a Box Collider
    setLayer(1).
  end();
};

  // player.addChild(soilder);

  var green =
  spriteBuilder.begin(null).
    setName("green").
    setPosition(new Vector2(0,-5)).
    setScale(new Vector2(10,5)).
    setColor(new Color(0,1,0,1)).
    setStatic(true).
    setLayer(0).
  end();


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
    setName("cam").
    setPosition(new Vector3(0,0,15)).
    setOrtho(w*zoom,h*zoom, -100,100).
    addScript(new CameraLogic(player)).
  end();

  // player.addChild(cam);
  // player.addChild(createSoilder(0,2, "sol0"));


  Thief.addGameObjectToScene(player);
  // Thief.addGameObjectToScene(green);

  Thief.addGameObjectToScene(createSoilder(2,-1.5, "sol1"));
  Thief.addGameObjectToScene(createSoilder(3.1,-1.3, "sol2"));
  Thief.addGameObjectToScene(createSoilder(4.2,-1.2, "sol3"));
  Thief.addGameObjectToScene(createSoilder(5.3,-1.1, "sol4"));
  // Thief.addGameObjectToScene(snorlax);
  // Thief.addGameObjectToScene(font);


  for (var i = 0; i < 100; i++){

    var randomX = (Math.random()*1000)%10;
    var randomY = (Math.random()*1000)%10;

    randomX *= (Math.random() > 0.5 ? 1 : -1);
    randomY *= (Math.random() > 0.5 ? 1 : -1);


    // Thief.addGameObjectToScene(createSoilder(randomX,randomY, "sol"+i));
  }

  Thief.addGameObjectToScene(cam);
  Thief.setCamera(cam);

  // Thief.setGravity(new Vector2(0,-3));

  Thief.run();

};
