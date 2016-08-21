var Engine = function (){
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

Engine.prototype.getCurrentScene = function (){
	return this.currentScene;
};

//----------------------------------------------------------------------

Engine.prototype.addScene = function (currentScene){
	this.scenes[currentScene.getName()] = currentScene;
};

//----------------------------------------------------------------------

Engine.prototype.setCurrentScene = function (name){

  if(this.currentScene !== null)
    this.currentScene.setLoaded(false); // reset

	this.currentScene=this.scenes[name];
};

//----------------------------------------------------------------------

Engine.prototype.getScenes = function (){
	return this.scenes;
};

//----------------------------------------------------------------------

Engine.prototype.setClearColor = function (color){
  this.renderEngine.setClearColor(color);
};

//----------------------------------------------------------------------

Engine.prototype.enablePhysics = function (){
  this.physicsEnabled = true;
};

//----------------------------------------------------------------------

Engine.prototype.setGravity = function (gravity){
  this.physicsEngine.setGravity(gravity);
};

//----------------------------------------------------------------------

Engine.prototype.disablePhysics = function (){
  this.physicsEnabled = false;
};

//----------------------------------------------------------------------

Engine.prototype.init = function (){

  this.renderEngine = new RenderEngine();
  this.physicsEngine = new PhysicsEngine();
  this.scriptEngine = new ScriptEngine();

};

//----------------------------------------------------------------------

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

Engine.prototype.loadScene = function(){

  this.renderEngine.clear();
  this.physicsEngine.clear();
  this.scriptEngine.clear();

  this.updateScene();

};

//----------------------------------------------------------------------



Engine.prototype.run = function () {

  // window.requestAnimFrame = (function(){
  //   return  window.requestAnimationFrame       ||
  //           window.webkitRequestAnimationFrame ||
  //           window.mozRequestAnimationFrame    ||
  //           function( callback ){
  //             window.setTimeout(callback, 1000 / 30);
  //           };
  // })();


  var renderEngine = this.renderEngine;
  var physicsEngine = this.physicsEngine;
  var scriptEngine = this.scriptEngine;
  var currentScene = this.currentScene;

  var engine = this;

  var max = 0;

  // this.binded = false;

  var main = function () {

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
      scriptEngine.update();

      if(engine.physicsEnabled)
        physicsEngine.update();

      renderEngine.update();
      renderEngine.render();

      currentScene.cleanTrash();
    }

    Time.tick();
  };

  // var render = function () {
  //     window.requestAnimFrame(render);
  //     if(this.binded){
  //         renderEngine.render();
  //     }
  // }

  Time.init();

  // render();


  var ONE_FRAME_TIME = 1000.0 / 30.0 ;
  setInterval( main, ONE_FRAME_TIME );
};

//----------------------------------------------------------------------
