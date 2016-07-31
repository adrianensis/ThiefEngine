var test = function () {

  var engine = new Engine();
  engine.init();

    var scene = new Scene();

    var createFloor = function (x,y, sizeX, sizeY) {
        var obj = new GameObject();

        // var rect = new RectangleMesh();

        var renderer = new SpriteRenderer();

        var material = new Material();
        material.setColor(Color.NONE);

        // var texture = new Texture();

        // texture.setData(imageSoldier);

        material.setTexture(Loader.loadTexture("res/sand.png"));

        renderer.setMaterial(material);
        // renderer.setMesh(rect);
        // renderer.bind();

         var collider = new AABBCollider(sizeX, sizeY);
         var rigidBody = new RigidBody();

        var transform = new Transform();

        obj.addComponent(transform);
        obj.addComponent(renderer);
        obj.addComponent(collider);
        obj.addComponent(rigidBody);

        // var logic = new PlayerLogic();

        // obj.addComponent(logic);

        // var pika = createPika(0,50);
        // obj.addChild(pika);

        transform.translate(new Vector3(x,y,0));
        transform.setScale(new Vector2(sizeX, sizeY));

        obj.setStatic(true);

        return obj;
    }

    var createHeightTile = function (x,y,size,texture, texCoord, width, height) {
        var obj = new GameObject();

        // var rect = new RectangleMesh();

        var renderer = new SpriteRenderer();
        renderer.setRegion(texCoord, width, height);

        var material = new Material();

        // var texture = new Texture();

        // var collider = new AABBCollider(3,1);
        // var rigidBody = new RigidBody();


        var transform = new Transform();

        obj.addComponent(transform);
        obj.addComponent(renderer);
        // obj.addComponent(collider);
        // obj.addComponent(rigidBody);

        transform.translate(new Vector3(x,y,0));
        // transform.rotate(new Vector3(-90,0,0));
        transform.setScale(new Vector2(size,size));

        // texture.setData(imageSand);
        material.setTexture(texture);


        // material.setColor(Color.NONE);

        renderer.setMaterial(material);
        // renderer.setMesh(rect);
        // renderer.bind();

    //    rigidBody.setStatic(true);

        return obj;
    };

    var createSnorlax = function (x,y) {
        var obj = new GameObject();

        // var rect = new RectangleMesh();

        var renderer = new SpriteRenderer();

        var material = new Material();

        // var texture = new Texture();

        // var collider = new AABBCollider(3,1);
        // var rigidBody = new RigidBody();


        var transform = new Transform();

        obj.addComponent(transform);
        obj.addComponent(renderer);
        // obj.addComponent(collider);
        // obj.addComponent(rigidBody);

        transform.translate(new Vector3(x,y,0));
        // transform.rotate(new Vector3(-90,0,0));
        transform.setScale(new Vector2(2,2));

        // texture.setData(imageSand);
        material.setTexture(Loader.loadTexture("res/snorlax.bmp"));

        material.setColor(Color.NONE);

        renderer.setMaterial(material);
        renderer.setAlphaColor(new Color(1,0,1,1));

        obj.setStatic(true);


        return obj;
    }

    var createDemoAnimatedObj = function (x, y, size) {

        var obj = new GameObject();

        // var rect = new RectangleMesh();

        var renderer = new SpriteRenderer();

        var animationRight = new Animation();
        animationRight.setSpeed(6);

        var animationLeft = new Animation();
        animationLeft.setSpeed(6);

        var animationUp = new Animation();
        animationUp.setSpeed(6);

        var animationDown = new Animation();
        animationDown.setSpeed(6);

        var colSize = 1.0/4;
        var posX;
        for (var i = 0; i < 4; i++) {

            posX = colSize*i;
            var frame = new AnimationFrame();
            frame.set(new Vector2(posX,0.75),colSize,0.25);
            animationDown.addFrame(frame);

            frame = new AnimationFrame();
            frame.set(new Vector2(posX,0.5),colSize,0.25);
            animationLeft.addFrame(frame);

            frame = new AnimationFrame();
            frame.set(new Vector2(posX,0.25),colSize,0.25);
            animationRight.addFrame(frame);

            frame = new AnimationFrame();
            frame.set(new Vector2(posX,0.0),colSize,0.25);
            animationUp.addFrame(frame);
        }

        renderer.addAnimation("right",animationRight);
        renderer.addAnimation("left",animationLeft);
        renderer.addAnimation("up",animationUp);
        renderer.addAnimation("down",animationDown);

        renderer.setAnimation("down");



        var material = new Material();
        material.setColor(Color.NONE);
        material.setTexture(Loader.loadTexture("res/pok-char.png"));

        renderer.setMaterial(material);
        // renderer.setMesh(rect);
        // renderer.bind();

        //  var collider = new AABBCollider(size,size);
         var collider = new CircleCollider(size/2);
         var rigidBody = new RigidBody();

        var transform = new Transform();

        obj.addComponent(transform);
        obj.addComponent(renderer);
        obj.addComponent(collider);
        obj.addComponent(rigidBody);

        var logic = new PlayerLogic();

        obj.addComponent(logic);

        // var pika = createPika(0,50);
        // obj.addChild(pika);

        transform.translate(new Vector2(x,y));
        transform.setScale(new Vector2(size,size));

        return obj;
    }

    var createSoldier = function (x, y, size) {

        var obj = new GameObject();

        // var rect = new RectangleMesh();

        var renderer = new SpriteRenderer();

        var animationRight = new Animation();
        animationRight.setSpeed(14);

        var colSize = 1.0/12;
        var posX;
        var rand = Math.floor(Math.random()*100%24);
        for (var i = 11; i >= 0; i--) {

            posX = colSize*((i+rand)%12);
            frame = new AnimationFrame();
            frame.set(new Vector2(posX,0),colSize,1);
            animationRight.addFrame(frame);
        }

        var material = new Material();
        material.setColor(Color.NONE);
        renderer.addAnimation("right",animationRight);

        renderer.setAnimation("right");

        // var texture = new Texture();

        // texture.setData(imageSoldier);

        material.setTexture(Loader.loadTexture("res/soldier.png"));

        renderer.setMaterial(material);
        // renderer.setMesh(rect);
        // renderer.bind();

         var collider = new AABBCollider(size,size);
        //  var collider = new CircleCollider(size/2);
         var rigidBody = new RigidBody();

        var transform = new Transform();

        obj.addComponent(transform);
        obj.addComponent(renderer);
        obj.addComponent(collider);
        obj.addComponent(rigidBody);

        // var logic = new PlayerLogic();

        // obj.addComponent(logic);

        // var pika = createPika(0,50);
        // obj.addChild(pika);

        transform.translate(new Vector3(x,y,0));
        transform.setScale(new Vector2(size,size));

        obj.setStatic(true);

        return obj;
    };

    var createCube = function (x,y,z) {
        var obj = new GameObject();

        var cube = new CubeMesh(1,1,1);
        // var cube = Mesh.load("res/cube.obj");
        var renderer = new MeshRenderer();
        var material = new Material();
        var transform = new Transform();

        obj.addComponent(transform);
        obj.addComponent(renderer);

        // var texture = new Texture();

        material.setTexture(Loader.loadTexture("res/sand.png"));
        material.setColor(Color.NONE);

        // var logic = new CubeLogic();
        // obj.addComponent(logic);

        // material.setColor(Color.RED);

        renderer.setMaterial(material);
        renderer.setMesh(cube);

        transform.translate(new Vector3(x,y,z));
        // transform.setScale(new Vector3(1,1,1));

        return obj;
    };

    var createOrc = function (x, y) {

        var size = 0.2;

        var obj = new GameObject();

        var renderer = new SpriteRenderer();

        var material = new Material();
        material.setColor(Color.NONE);

        material.setTexture(Loader.loadTexture("res/orc.png"));

        renderer.setMaterial(material);

        var collider = new AABBCollider(size,size);
        var rigidBody = new RigidBody();

        var transform = new Transform();

        obj.addComponent(transform);
        obj.addComponent(renderer);
        obj.addComponent(collider);
        obj.addComponent(rigidBody);

        transform.translate(new Vector3(x,y,0));
        transform.setScale(new Vector2(size,size));

        return obj;
    };

    var createBitmapFont = function (x, y) {

        var size = 5;

        var obj = new GameObject();

        var renderer = new SpriteRenderer();

        var material = new Material();
        material.setColor(Color.NONE);

        material.setTexture(Loader.loadTexture("res/font.bmp"));

        renderer.setMaterial(material);
        renderer.setAlphaColor(new Color(1,0,1,1));

        var collider = new AABBCollider(size,size);
        var rigidBody = new RigidBody();

        var transform = new Transform();

        obj.addComponent(transform);
        obj.addComponent(renderer);
        // obj.addComponent(collider);
        // obj.addComponent(rigidBody);

        transform.translate(new Vector3(x,y,0));
        transform.setScale(new Vector2(size,size));

        return obj;
    };

    /*
    * PERLIN NOISE
    */

    var perlin = new PerlinNoise(10,11);


    var resolution = 5;
    var step = 0.1;

    for ( var i=-resolution; i<resolution; i+=step ) {
        for ( var j=-resolution; j<resolution; j+=step ) {

            var v = perlin.generate(i,j);

            var tex = Loader.loadTexture("res/pokemonTiles.png");

            var tileSizeX = 1/88;
            var tileSizeY = 1/69;
            var borderX = 1/1408;
            var borderY = 1/1104;

            // if(v > 0.2){
            //     scene.addObject(createHeightTile(i/step,j/step, step/step,tex, new Vector2(tileSizeX*5 + borderX, borderY + 1-(tileSizeY*2)),tileSizeX-borderX,tileSizeY-borderY));
            // }else if(v < 0.2 && v > 0){
            //     if(Math.random() > 0.98)
            //         scene.addObject(createHeightTile(i/step,j/step, step/step,tex, new Vector2(tileSizeX*0 + borderX, borderY + 1-(tileSizeY*29)),tileSizeX-borderX,tileSizeY-borderY));
            //     else
            //         scene.addObject(createHeightTile(i/step,j/step, step/step,tex, new Vector2(tileSizeX*10 + borderX, borderY + 1-tileSizeY),tileSizeX-borderX,tileSizeY-borderY));
            // }else{
            //     if(Math.random() > 0.8)
            //         scene.addObject(createHeightTile(i/step,j/step, step/step,tex, new Vector2(tileSizeX*4 + borderX, borderY + 1-tileSizeY),tileSizeX-borderX,tileSizeY-borderY));
            //     else
            //         scene.addObject(createHeightTile(i/step,j/step, step/step,tex, new Vector2(tileSizeX + borderX, borderY + 1-tileSizeY),tileSizeX-borderX,tileSizeY-borderY));
            //
            // }

            // var c = new Color(v,v,v,1.0);

            // scene.addObject(createOrc(i/step,j/step));

        }
    }

    /*
    * END PERLIN NOISE
    */

    // var player = createDemoAnimatedObj(0,0,1);
    // scene.addObject(player);
    // scene.addObject(createSnorlax(-2,1));

    scene.addObject(createSoldier(-2,0,1));
    //
    //
    //
    // scene.addObject(createSoldier(4,1,1));
    // scene.addObject(createSoldier(4,3,1));
    // scene.addObject(createSoldier(4,-1,1));
    //
    // scene.addObject(createSoldier(1,1,1));
    // scene.addObject(createSoldier(1,3,1));
    // scene.addObject(createSoldier(1,-2,1));


    // scene.addObject(createFloor(0,0,3,1));



    /**
     * NOTE: NEW FACADE
     */

    // var snorlax = Thief.sprite.begin("res/snorlax.bmp", new Vector2(0,0), 2, true).
    // setAlphaColor(new Color(1,0,1,1)).
    // end();
    //
    // scene.addObject(snorlax);




    var player = Thief.sprite.begin("res/pok-char.png", new Vector2(0,0), 1, false). // create a basic sprite

      addAnimation("up", 4, 1, 0, new Vector2(0,0), 6). // add UP animation
      addAnimation("down", 4, 1, 0, new Vector2(0,0.75), 6). // add DOWN animation
      addAnimation("left", 4, 1, 0, new Vector2(0,0.5), 6). // add LEFT animation
      addAnimation("right", 4, 1, 0, new Vector2(0,0.25), 6). // add RIGHT animation

      setAnimation("down"). // set the default animation

      setCollider(AABBCollider). // set a Box Collider

      addScript(new PlayerLogic()). // add a Logic Script

    end();

    scene.addObject(player);



    /*
    *
    * TODO TODO TODO TODO
    *
    * BITMAP FONTS !!!!!
    *
    */
    // scene.addObject(createBitmapFont(-5,3));

    var renderContext = new RenderContext();
    var canvas = document.getElementById("glcanvas");
  	// alert("Width: "+canvas.width + " Height: " + canvas.height);

    var w = (canvas.width/2) /70;
    var h = (canvas.height/2) /70;

    var camObj = new GameObject();

    var transform = new Transform();
    transform.translate(new Vector3(0,0,15));
    camObj.addComponent(transform);

    var cam = new OrthoCamera(-w,w,-h,h, -100,100);
    // var cam = new PerspectiveCamera(-10,10,4/3,45);
    camObj.addComponent(cam);

    camObj.addComponent(new CameraLogic(player));

    scene.addObject(camObj);

    renderContext.setCamera(cam);

    scene.setRenderContext(renderContext);

    engine.setCurrentScene(scene);

    engine.run();

};
