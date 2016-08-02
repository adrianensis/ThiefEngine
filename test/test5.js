var test = function () {

Thief.init();
Thief.createAndSetScene("test");

 /*
  * PERLIN NOISE
  */

  // var perlin = new PerlinNoise(10,11);
  //
  //
  // var resolution = 5;
  // var step = 0.1;
  //
  // for ( var i=-resolution; i<resolution; i+=step ) {
  //     for ( var j=-resolution; j<resolution; j+=step ) {
  //
  //         var v = perlin.generate(i,j);
  //
  //         var tex = "test/res/pokemonTiles.png";
  //
  //         var tileSizeX = 1/88;
  //         var tileSizeY = 1/69;
  //         var borderX = 1/1408;
  //         var borderY = 1/1104;
  //
  //         if(v > 0.2){
  //             Thief.sprite.begin(tex, new Vector2(i/step,j/step), step/step, true).
  //               setTextureRegion(new Vector2(tileSizeX*5 + borderX, borderY + 1-(tileSizeY*2)),tileSizeX-borderX,tileSizeY-borderY).
  //             end();
  //
  //
  //         }else if(v < 0.2 && v > 0){
  //             if(Math.random() > 0.98){
  //                 Thief.sprite.begin(tex, new Vector2(i/step,j/step), step/step, true).
  //                   setTextureRegion(new Vector2(tileSizeX*0 + borderX, borderY + 1-(tileSizeY*29)),tileSizeX-borderX,tileSizeY-borderY).
  //                 end();
  //             }else{
  //                 Thief.sprite.begin(tex, new Vector2(i/step,j/step), step/step, true).
  //                   setTextureRegion(new Vector2(tileSizeX*10 + borderX, borderY + 1-tileSizeY),tileSizeX-borderX,tileSizeY-borderY).
  //                 end();
  //             }
  //         }else{
  //             if(Math.random() > 0.8){
  //                 Thief.sprite.begin(tex, new Vector2(i/step,j/step), step/step, true).
  //                   setTextureRegion(new Vector2(tileSizeX*4 + borderX, borderY + 1-tileSizeY),tileSizeX-borderX,tileSizeY-borderY).
  //                 end();
  //             }else{
  //                 Thief.sprite.begin(tex, new Vector2(i/step,j/step), step/step, true).
  //                   setTextureRegion(new Vector2(tileSizeX + borderX, borderY + 1-tileSizeY),tileSizeX-borderX,tileSizeY-borderY).
  //                 end();
  //             }
  //         }
  //
  //     }
  // }

  /*
  * END PERLIN NOISE
  */

  /**
   * NOTE: NEW FACADE
   */

   // BITMAP FONTS
  //  Thief.sprite.begin("test/res/font.bmp", new Vector2(3,0), 5, true).
  //    setAlphaColor(new Color(1,0,1,1)).
  //  end();
  //
  Thief.sprite.begin("test/res/snorlax.bmp", new Vector2(-3,0), 1, true).
    setAlphaColor(new Color(1,0,1,1)).
  end();

  // Thief.sprite.begin("test/res/digi/map.png", new Vector2(-3,2), 2, true).
    // setAlphaColor(new Color(1,0,1,1)).
  // end();


  var player =
  Thief.sprite.begin("test/res/pok-char.png", new Vector2(0,0), 1, false). // create a basic sprite
    addAnimation("up", 4, true, false, new Vector2(0,0), 1/4, 1/4, 6). // add UP animation
    addAnimation("down", 4, true, false, new Vector2(0,0.75), 1/4, 1/4, 6). // add DOWN animation
    addAnimation("left", 4, true, false, new Vector2(0,0.5), 1/4, 1/4, 6). // add LEFT animation
    addAnimation("right", 4, true, false, new Vector2(0,0.25), 1/4, 1/4, 6). // add RIGHT animation
    setAnimation("down"). // set the default animation
    setCollider(AABBCollider). // set a Box Collider
    addScript(new PlayerLogic()). // add a Logic Script
  end();
  //
  // Thief.sprite.begin("test/res/soldier.png", new Vector2(0,2), 1, true). // create a basic sprite
  //   addAnimation("right", 12, true, true, new Vector2(0,0), 1/12, 1, 14). // add RIGHT animation
  //   setAnimation("right"). // set the default animation
  //   setCollider(AABBCollider). // set a Box Collider
  // end();


  // var canvas = document.getElementById("glcanvas");
	// // alert("Width: "+canvas.width + " Height: " + canvas.height);
  //
  // var screenW = (canvas.width/2) /70;
  // var screenH = (canvas.height/2) /70;

  var zoom = 3;
  var aspect = (16/9);
  var w = 1*aspect;
  var h = 1;

  Thief.camera.begin().
    setPosition(new Vector3(0,0,15)).
    setOrtho(w*zoom,h*zoom, -100,100).
    addScript(new CameraLogic(player)).
  end();

  Thief.run();

};
