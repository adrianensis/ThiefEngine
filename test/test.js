var test = function () {

Thief.init();
Thief.createAndSetScene("test");

// -----------------------------------------------------------------------------


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
    addScript(new CameraLogic()).
  end();

  Thief.addGameObjectToScene(cam);
  Thief.setCamera(cam);


// -----------------------------------------------------------------------------


var spriteBuilder = new SpriteBuilder();

// -----------------------------------------------------------------------------

/*
* RANDOM TILED MAP - PERLIN NOISE
*/

var texture = "res/pokemonTiles.png"; // collection of pokemon tiles, the texture atlas.

var perlin = new PerlinNoise(5,10); // perlin noise generator

var resolution = 10; // number of tiles on x and y axes
var size = 1; // size of each tile
var n = size * resolution/2;

// this loop create the tiled map
for ( var i=0; i<n; i+= size ) {
    for ( var j=0; j<n; j+= size ) {

        var v = perlin.generate(i,j); // generate random value

        var tileWidth = 1/88; // width in pixels of a tile
        var tileHeight = 1/69; // height in pixels of a tile

        var pos = new Vector2(i,j);

        // initialize sprite builder
        spriteBuilder.create(texture,pos,size,size).
          setStatic(true);

        // classifies the sprite according to random value

        var x,y,width,height;

        v = Math.abs(v);

        if(v < 0.1){
          // ROCK TILE
          // position of the tile within the texture: (0,40)
          x = tileWidth*0;
          y = (tileHeight*40);
          width = tileWidth;
          height = tileHeight;

        }else if(v >= 0.1 && v < 0.3){
          // WATER TILE
          // position of the tile within the texture: (40,67)
          x = tileWidth*40;
          y = (tileHeight*67);
          width = tileWidth;
          height = tileHeight;
        }else if(v >= 0.3 && v < 0.5){
          // FLOWER TILE
          // position of the tile within the texture: (5,67)
          x = tileWidth*4;
          y = (tileHeight*68);
          width = tileWidth;
          height = tileHeight;
        }else{
          // GRASS TILE
          // position of the tile within the texture: (5,67)
          x = tileWidth*5;
          y = (tileHeight*67);
          width = tileWidth;
          height = tileHeight;
        }

        spriteBuilder.setTextureRegion(new Vector2(x,y),width,height); // select the region of the texture atlas.

        Thief.addGameObjectToScene(spriteBuilder.end()); // add sprite

    }
  }

  /*
  * END PERLIN NOISE
  */

// -----------------------------------------------------------------------------

// Thief.createAndSetScene("test2");

  // BITMAP FONTS
  var font =
  spriteBuilder.create("res/font.bmp",new Vector2(3,0),6,6).
    setStatic(true).
    setAlphaColor(new Color(1,0,1,1)).
  end();



// -----------------------------------------------------------------------------


  // SNORLAX
  var snorlax =
  spriteBuilder.create("res/snorlax.bmp",new Vector2(0,-1.7),1,1).
    setStatic(true).
    setAlphaColor(new Color(1,0,1,1)).
    setRigidBody(0,0,0). // set physics properties
    setCollider(new BoxCollider(1,1, false)). // set a Box Collider
  end();


// -----------------------------------------------------------------------------


  // PLAYER
  var player =
  spriteBuilder.create("res/pok-char.png",new Vector2(-2,-2),0.5,0.5).
    addAnimation("up", 4, true, false, new Vector2(0,0), 1/4, 1/4, 6). // add UP animation
    addAnimation("down", 4, true, false, new Vector2(0,0.75), 1/4, 1/4, 6). // add DOWN animation
    addAnimation("left", 4, true, false, new Vector2(0,0.5), 1/4, 1/4, 6). // add LEFT animation
    addAnimation("right", 4, true, false, new Vector2(0,0.25), 1/4, 1/4, 6). // add RIGHT animation
    setAnimation("down"). // set the default animation
    setRigidBody(1,0,0). // set physics properties
    // setCollider(new BoxCollider(1,1, false)). // set a Box Collider
    setCollider(new CircleCollider(0.25,false)). // set a Box Collider
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

  Thief.addGameObjectToScene(player);

  var size = 0.5;
  var n = 30;
  var nn = n*size;

  for ( var i=0; i<nn; i+=size) {
    	Thief.addGameObjectToScene(createSoilder(i+1,0, size, "soilder"));
  }

  // Thief.addGameObjectToScene(createSoilder(2,-1.5, "soilder"));
  // Thief.addGameObjectToScene(createSoilder(3.1,-1.5, "soilder"));
  // Thief.addGameObjectToScene(createSoilder(4.2,-1.2, "soilder"));
  // Thief.addGameObjectToScene(createSoilder(5.3,-1.1, "soilder"));
  // Thief.addGameObjectToScene(snorlax);
  // Thief.addGameObjectToScene(font);

  // Thief.addGameObjectToScene(cam);
  // Thief.setCamera(cam);

  // Thief.setGravity(new Vector2(0,-3));

  Thief.run();

};
