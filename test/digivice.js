var test = function () {

  Thief.init();
  Thief.createAndSetScene("digivice");

  Thief.setClearColor(new Color(152/256, 163/256, 108/256,1));

  Thief.empty().addComponent(new DigiviceLogic());

  Thief.sprite.begin("test/res/digi/map.png", new Vector2(0,0), 1, true).end();

  var w = 1/8;
  var h = 1/6;
  Thief.sprite.begin("test/res/digi/digi1.png", new Vector2(0,0.1), 0.5, true).
    setTextureRegion(new Vector2((1/8),(1/6)),1/8,1/6).
  end();


  // var player =
  // Thief.sprite.begin("test/res/pok-char.png", new Vector2(0,0), 1, false). // create a basic sprite
  //   addAnimation("up", 4, true, false, new Vector2(0,0), 1/4, 1/4, 6). // add UP animation
  //   addAnimation("down", 4, true, false, new Vector2(0,0.75), 1/4, 1/4, 6). // add DOWN animation
  //   addAnimation("left", 4, true, false, new Vector2(0,0.5), 1/4, 1/4, 6). // add LEFT animation
  //   addAnimation("right", 4, true, false, new Vector2(0,0.25), 1/4, 1/4, 6). // add RIGHT animation
  //   setAnimation("down"). // set the default animation
  //   setCollider(AABBCollider). // set a Box Collider
  //   addScript(new PlayerLogic()). // add a Logic Script
  // end();
  //
  // Thief.sprite.begin("test/res/soldier.png", new Vector2(0,2), 1, true). // create a basic sprite
  //   addAnimation("right", 12, true, true, new Vector2(0,0), 1/12, 1, 14). // add RIGHT animation
  //   setAnimation("right"). // set the default animation
  //   setCollider(AABBCollider). // set a Box Collider
  // end();

  var zoom = 2;
  var aspect = (16/9);
  var w = 1*aspect;
  var h = 1;

  Thief.camera.begin().
    setPosition(new Vector3(0,0,1)).
    setOrtho(w*zoom,h*zoom, -1,1).
  end();

  Thief.run();

};
