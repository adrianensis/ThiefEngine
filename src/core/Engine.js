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

Engine.prototype.setFPS = function (fps){
  this.fps = fps;
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


  var ONE_FRAME_TIME = (1/this.fps)*1000 ;
  // setInterval( main, ONE_FRAME_TIME );
};

//----------------------------------------------------------------------
