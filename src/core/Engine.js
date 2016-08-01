var Engine = function (){
    this.renderEngine = null;
    this.physicsEngine = null;
    this.scriptEngine = null;
    this.currentScene = null;
    this.scenes = {};
    this.input = new Input();
};

// TODO: Singleton

Engine.prototype.getRenderengine = function (){
	return this.renderEngine;
};

Engine.prototype.setRenderengine = function (renderEngine){
	this.renderEngine=renderEngine;
};

Engine.prototype.getCurrentScene = function (){
	return this.currentScene;
};

Engine.prototype.addScene = function (currentScene){
	this.scenes[currentScene.getName()] = currentScene;
};

Engine.prototype.setCurrentScene = function (name){

  if(this.currentScene !== null)
    this.currentScene.setLoaded(false); // reset

	this.currentScene=this.scenes[name];
};

Engine.prototype.getScenes = function (){
	return this.scenes;
};

Engine.prototype.init = function (){

    this.renderEngine = new RenderEngine();
    this.physicsEngine = new PhysicsEngine();
    this.scriptEngine = new ScriptEngine();

};

Engine.prototype.loadScene = function(){
    var renderers = this.currentScene.getRoot().getComponentsInChildren(MeshRenderer);
    this.renderEngine.addRenderers(renderers);
    this.renderEngine.setRenderContext(this.currentScene.getRenderContext());

   var rigidBodies = this.currentScene.getRoot().getComponentsInChildren(RigidBody);
   this.physicsEngine.setBodies(this.physicsEngine.getBodies().concat(rigidBodies));

    var logics = this.currentScene.getRoot().getComponentsInChildren(Script);
    this.scriptEngine.setScripts(this.scriptEngine.getScripts().concat(logics));

    this.currentScene.setLoaded(true);
};

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

    this.binded = false;

    var main = function () {

        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

        if( ! currentScene.isLoaded()){
            engine.loadScene();
        }

        if(Loader.isDone()){
          engine.binded  = true;
          renderEngine.bind();
          Loader.reset();
        }



        if(engine.binded){
            scriptEngine.update();
            physicsEngine.update();
            renderEngine.update();
            renderEngine.render();
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


    var ONE_FRAME_TIME = 1000.0 / 60.0 ;
    setInterval( main, ONE_FRAME_TIME );
};
