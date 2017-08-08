
/**
* @class
* @classdesc This class is the heart of the application.
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
* Return the current scene.
* @returns {Scene} The current scene.
*/
Engine.prototype.getCurrentScene = function (){
	return this.currentScene;
};

//----------------------------------------------------------------------

/**
* Add a new scene.
* @param {Scene} scene The new scene.
*/
Engine.prototype.addScene = function (scene){
	this.scenes[scene.getName()] = scene;
};

//----------------------------------------------------------------------

/**
* Set the current scene as the scene named as 'name'.
* @param {String} name The name of the scene.
*/
Engine.prototype.setCurrentScene = function (name){

  if(this.currentScene === null)
    this.currentScene=this.scenes[name];
  else if(this.currentScene.getName() !== name){
    this.currentScene.reset(); // reset old scene
    this.currentScene=this.scenes[name];
  }


};

//----------------------------------------------------------------------

/**
* Return the scenes.
* @returns {Array} The scenes.
*/
Engine.prototype.getScenes = function (){
	return this.scenes;
};

//----------------------------------------------------------------------

/**
* Set the clear color. WebGL will use this value to repaint the screen.
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
* Set the gravity.
* @param {Vector4} gravity The gravity.
*/
Engine.prototype.setGravity = function (gravity){
  this.physicsEngine.setGravity(gravity);
};

//----------------------------------------------------------------------

/**
* Disable the physics engine,
*/
Engine.prototype.disablePhysics = function (){
  this.physicsEnabled = false;
};

//----------------------------------------------------------------------

/**
* Set the fps.
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
* Update the current scene.
*/
Engine.prototype.updateScene = function(){

  var root = this.currentScene.getNewsRoot();

  var renderers = root.getComponentsInChildren(MeshRenderer);
  var rigidBodies = root.getComponentsInChildren(RigidBody);
  var scripts = root.getComponentsInChildren(Script);

  this.currentScene.flush();


  this.renderEngine.addRenderers(renderers);
  this.renderEngine.setRenderContext(this.currentScene.getRenderContext());

  this.physicsEngine.addBodies(rigidBodies);

  this.scriptEngine.addScripts(scripts);

  // console.log("update");

};

//----------------------------------------------------------------------

/**
* Load the current scene.
*/
Engine.prototype.loadScene = function(){

  this.renderEngine.clear();
  this.physicsEngine.clear();
  this.scriptEngine.clear();

  this.updateScene();

  this.loaded = false;

  // console.log("load");

};

//----------------------------------------------------------------------


/**
* Runs the engine.
*/
Engine.prototype.run = function () {

  var step = (1/this.fps);

  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, step*1000);
            };
  })();

  var renderEngine = this.renderEngine;
  var physicsEngine = this.physicsEngine;
  var scriptEngine = this.scriptEngine;

  var engine = this;

  var dt = 0;

  var main = function () {

    Time.tick();

    dt = dt + Time.deltaTime();

    if(! engine.getCurrentScene().isLoaded())
      engine.loadScene();

    if(engine.getCurrentScene().hasNewObjects())
      engine.updateScene();

    if(Loader.isDone() && !renderEngine.isBinded()){
      engine.loaded = true;
      renderEngine.bind();
    }

    if(engine.loaded){

      scriptEngine.update();

      while(dt > step){
        dt = dt - step;

        if(engine.physicsEnabled){
          physicsEngine.update(step);
        }
      }

      Time.delta = dt*1000;
      Time.deltaInSeconds = dt;

      renderEngine.update();
      renderEngine.render();

      engine.getCurrentScene().cleanTrash();

    }

    window.requestAnimFrame(main);
  };

  Time.init();

  window.requestAnimFrame(main);

};

//----------------------------------------------------------------------
