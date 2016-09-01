
/**
* @class
* @classdesc This class is the main application.
* It holds all the scenes and objects.
*/
var Engine = function (){

  this.fps = 30;

  this.renderEngine = null;
  this.physicsEngine = null;
  this.scriptEngine = null;
  this.currentScene = null;
  this.scenes = {};
  this.input = new Input();

  this.loaded = false;
  this.physicsEnabled = true;
};

//----------------------------------------------------------------------

// TODO: Singleton

/**
* Returns the current scene.
* @returns {Scene} The current scene.
*/
Engine.prototype.getCurrentScene = function (){
	return this.currentScene;
};

//----------------------------------------------------------------------

/**
* Adds a new scene.
* @param {Scene} scene The new scene.
*/
Engine.prototype.addScene = function (scene){
	this.scenes[scene.getName()] = scene;
};

//----------------------------------------------------------------------

/**
* Sets the current scene as the scene named as 'name'.
* @param {String} name The scene's name.
*/
Engine.prototype.setCurrentScene = function (name){

  if(this.currentScene !== null)
    this.currentScene.setLoaded(false); // reset

	this.currentScene=this.scenes[name];
};

//----------------------------------------------------------------------

/**
* Returns the scenes.
* @returns {Array} The scenes.
*/
Engine.prototype.getScenes = function (){
	return this.scenes;
};

//----------------------------------------------------------------------

/**
* Sets the clear color. WebGL will use this value to repaint the screen.
* @param {Color} color The color.
*/
Engine.prototype.setClearColor = function (color){
  this.renderEngine.setClearColor(color);
};

//----------------------------------------------------------------------

/**
* Enables the physics engine,
*/
Engine.prototype.enablePhysics = function (){
  this.physicsEnabled = true;
};

//----------------------------------------------------------------------

/**
* Sets the gravity.
* @param {Vector4} gravity The gravity.
*/
Engine.prototype.setGravity = function (gravity){
  this.physicsEngine.setGravity(gravity);
};

//----------------------------------------------------------------------

/**
* Disables the physics engine,
*/
Engine.prototype.disablePhysics = function (){
  this.physicsEnabled = false;
};

//----------------------------------------------------------------------

/**
* Sets the fps.
* @param {Number} fps The fps.
*/
Engine.prototype.setFPS = function (fps){
  this.fps = fps;
};

//----------------------------------------------------------------------

/**
* Starts the engine.
*/
Engine.prototype.init = function (){

  this.renderEngine = new RenderEngine();
  this.physicsEngine = new PhysicsEngine();
  this.scriptEngine = new ScriptEngine();

};

//----------------------------------------------------------------------

/**
* Updates the current scene.
*/
Engine.prototype.updateScene = function(){

  var root = this.currentScene.getNewsRoot();

  var renderers = root.getComponentsInChildren(MeshRenderer);
  var rigidBodies = root.getComponentsInChildren(RigidBody);
  var scripts = root.getComponentsInChildren(Script);

  this.currentScene.setLoaded(true);
  this.currentScene.flush();

  this.renderEngine.addRenderers(renderers);
  this.renderEngine.setRenderContext(this.currentScene.getRenderContext());

  this.physicsEngine.addBodies(rigidBodies);

  this.scriptEngine.addScripts(scripts);

};

//----------------------------------------------------------------------

/**
* Loads the current scene.
*/
Engine.prototype.loadScene = function(){

  this.renderEngine.clear();
  this.physicsEngine.clear();
  this.scriptEngine.clear();

  this.updateScene();

};

//----------------------------------------------------------------------


/**
* Runs the engine.
*/
Engine.prototype.run = function () {

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, (1/this.fps)*1000);
            };
  })();
  // window.requestAnimFrame = (function(){
  //   return  function( callback ){
  //             window.setTimeout(callback, (1/this.fps)*1000);
  //           };
  // })();


  var renderEngine = this.renderEngine;
  var physicsEngine = this.physicsEngine;
  var scriptEngine = this.scriptEngine;
  var currentScene = this.currentScene;

  var engine = this;
  var physicsDeltaTime = (1/this.fps)/2;
  var accumulator = 0;
  var currentTime = 0;


  var main = function () {

    Time.tick();

    // console.log(Time.deltaTime());

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

    if(! currentScene.isLoaded())
      engine.loadScene();

    if(currentScene.hasNewObjects())
      engine.updateScene();

    if(Loader.isDone()){
      engine.loaded = true;
      renderEngine.bind();
      Loader.reset();
    }

    if(engine.loaded){


      // if(frameTime > 0.25){ frameTime = 0.25; }
      //   currentTime = newTime;
      //
      // accumulator += frameTime;
      //
      // while(accumulator >= physicsDeltaTime)
      // {
      //     accumulator -= physicsDeltaTime;
          scriptEngine.update();
          if(engine.physicsEnabled){
            physicsEngine.update(physicsDeltaTime);
            // physicsEngine.update(physicsDeltaTime);
          }
      // }



      renderEngine.update();
      renderEngine.render();

      currentScene.cleanTrash();

      // currentTime = newTime;
    }

    window.requestAnimFrame(main);
  };



  Time.init();


  // var main2 = function () {
  //     window.requestAnimFrame(main);
  //     main2();
  // };

  // main2();


  window.requestAnimFrame(main);


  // var ONE_FRAME_TIME = (1/this.fps)*1000 ;
  // setInterval( main, ONE_FRAME_TIME );
};

//----------------------------------------------------------------------
