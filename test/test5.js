var test = function () {

Thief.init();
Thief.createAndSetScene("test");

var spriteBuilder = new SpriteBuilder();

// -----------------------------------------------------------------------------

/*
* RANDOM TILED MAP - PERLIN NOISE
*/

var tex = "res/pokemonTiles.png"; // collection of pokemon tiles

var perlin = new PerlinNoise(5,10); // perlin noise generator

var resolution = 20; // number of tiles on x and y axes
var r = resolution/2;
var size = 1; // size of each tile

// this loop create the tiled map
for ( var i=-r; i<r; i++ ) {
    for ( var j=-r; j<r; j++ ) {

        var v = perlin.generate(i,j); // generate random value

        var tileWidth = 1/88; // width in pixels of a tile
        var tileHeight = 1/69; // height in pixels of a tile
        var pixelWidth = 1/1408; // 1408 is the texture width
        var pixelHeight = 1/1104; // 1104 is the texture height

        var pos = new Vector2(i,j);

        // initialize sprite builder
        spriteBuilder.begin(tex). // set the texture atlas.
          setPosition(pos).
          setSize(size).
          setStatic(true);

        // classifies the sprite according to random value

        var x,y,width,height;

        if(v > 0.1){
          // ROCK TILE
          // tile's position within the texture: (0,40)
          x = tileWidth*0 + pixelWidth;
          y = (tileHeight*40) + pixelHeight;
          width = tileWidth - pixelWidth;
          height = tileHeight - pixelHeight;
        }else{
          // GRASS TILE
          // tile's position within the texture: (5,67)
          x = tileWidth*5 + pixelWidth;
          y = (tileHeight*67) + pixelHeight;
          width = tileWidth - pixelWidth;
          height = tileHeight - pixelHeight;
        }

        spriteBuilder.setTextureRegion(new Vector2(x,y),width,height); // select the region of the texture atlas.

        Thief.addGameObjectToScene(spriteBuilder.end()); // add sprite

    }
  }

  /*
  * END PERLIN NOISE
  */

// -----------------------------------------------------------------------------



  // BITMAP FONTS
  var font =
  spriteBuilder.begin("res/font.bmp").
    setPosition(new Vector2(3,0)).
    setSize(6).
    setStatic(true).
    setAlphaColor(new Color(1,0,1,1)).
  end();



// -----------------------------------------------------------------------------


  // SNORLAX
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


// -----------------------------------------------------------------------------


  // PLAYER
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


// -----------------------------------------------------------------------------


  // SOILDER
  var createSoilder = function(x,y, name){
    // note that spriteBuilder is a global variable !
    return spriteBuilder.begin("res/soldier.png"). // create a basic sprite
      setName(name).
      setPosition(new Vector2(x,y)).
      setSize(1).
      setStatic(false).
      addAnimation("right", 12, true, true, new Vector2(0,0), 1/12, 1, 14). // add RIGHT animation
      setAnimation("right"). // set the default animation
      setRigidBody(1,0,0). // set physics properties
      setCollider(new AABBCollider(1,1, false)). // set a Box Collider
      setLayer(1).
    end();
  };


// -----------------------------------------------------------------------------


  // GREEN BLOCK
  var green =
  spriteBuilder.begin(null).
    setName("green").
    setPosition(new Vector2(0,-5)).
    setScale(new Vector2(10,5)).
    setColor(new Color(0,1,0,1)).
    setStatic(true).
    setLayer(0).
  end();


// -----------------------------------------------------------------------------


  // CAMERA

  var canvas = document.getElementById("glcanvas");

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


// -----------------------------------------------------------------------------

  Thief.addGameObjectToScene(player);

  Thief.addGameObjectToScene(createSoilder(2,-1.5, "sol1"));
  Thief.addGameObjectToScene(createSoilder(3.1,-1.3, "sol2"));
  Thief.addGameObjectToScene(createSoilder(4.2,-1.2, "sol3"));
  Thief.addGameObjectToScene(createSoilder(5.3,-1.1, "sol4"));
  // Thief.addGameObjectToScene(snorlax);
  // Thief.addGameObjectToScene(font);

  Thief.addGameObjectToScene(cam);
  Thief.setCamera(cam);

  // Thief.setGravity(new Vector2(0,-3));

  Thief.run();

};
