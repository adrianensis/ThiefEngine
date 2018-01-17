var createMap = function (spriteBuilder) {

  /*
  * RANDOM TILED MAP - PERLIN NOISE
  */

  var texture = "res/pokemonTiles.png"; // collection of pokemon tiles, the texture atlas.

  var perlin = new PerlinNoise(5,10); // perlin noise generator

  var resolution = 30; // number of tiles on x and y axes
  var size = 1; // size of each tile
  var n = size * resolution/2;

  // this loop create the tiled map
  for ( var i=-n; i<n; i+= size ) {
      for ( var j=-n; j<n; j+= size ) {

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
            x = tileWidth*63;
            y = (tileHeight*68);
            width = tileWidth;
            height = tileHeight;


            spriteBuilder.setRigidBody(0,0,0).
            setCollider(new CircleCollider(size/2,false)); // set a Cricle Collider

          }else{

            x = tileWidth*61;
            y = (tileHeight*68);
            width = tileWidth;
            height = tileHeight;
          }

          spriteBuilder.setTextureRegion(new Vector2(x,y),width,height); // select the region of the texture atlas.

          Thief.addGameObjectToScene(spriteBuilder.end()); // add sprite

      }
    }
}
