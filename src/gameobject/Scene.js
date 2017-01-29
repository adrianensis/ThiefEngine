/**
* @class
* @classdesc This class represents a scene. Contains a camera, a render context and the game objects.
* @param {String} name The name of the scene.
*/
var Scene = function (name){

  this.name = name;

  this.root = new GameObject();
  this.camera = null;
  this.renderContext = null;

  this.newsRoot = new GameObject(); // Root Node where the new objects are stored.

  this.newObjects = false;
  this.loaded = false;

  this.trash = [];

};


//----------------------------------------------------------------------

/**
* Returns the name of the scene.
* @returns {String} The name.
*/
Scene.prototype.getName = function (){
	return this.name;
};

//----------------------------------------------------------------------

/**
* Sets the scene as loaded.
* @param {Boolean} bool The boolean.
*/
Scene.prototype.setLoaded = function (bool){
	this.loaded=bool;
};

//----------------------------------------------------------------------

/**
* Returns true if the scene is loaded.
* @returns {Boolean} True if the scene is loaded.
*/
Scene.prototype.isLoaded = function (){
	return this.loaded;
};

//----------------------------------------------------------------------

/**
* Returns the root of the scene,
* @returns {GameObject} The root.
*/
Scene.prototype.getRoot = function (){
  return this.root;
};

//----------------------------------------------------------------------

/**
* Returns the root that contains the new game objects added.
* @returns {GameObject} The news-root.
*/
Scene.prototype.getNewsRoot = function (){
	return this.newsRoot;
};

//----------------------------------------------------------------------

/**
* Adds all the new game objects to the main root. Clears the news-root
*/
Scene.prototype.flush = function (){
  this.root.setChildren(this.root.getChildren().concat(this.newsRoot.getChildren()));
  this.newsRoot.setChildren([]);
  this.newObjects = false;
  this.loaded = true;
};

//----------------------------------------------------------------------

/**
* un-flush
*/
Scene.prototype.reset = function (){
  if(this.loaded){
    this.newsRoot.setChildren(this.root.getChildren());
    this.root.setChildren([]);
  }
  this.newObjects = true;
  this.loaded = false;
};

//----------------------------------------------------------------------

/**
* Returns true if the scene has new game objects.
* @returns {Boolean} True if the scene has new game objects.
*/
Scene.prototype.hasNewObjects = function (){
	return this.newObjects;
};

//----------------------------------------------------------------------

/**
* Adds a game object.
* @param {GameObject} obj The game object.
*/
Scene.prototype.addObject = function (obj){
  // console.log("ADD OBJECT: " + obj.getId());
  this.newObjects = true;

  obj.setScene(this);
  obj.getTransform().initMatrix();
  this.newsRoot.addChild(obj);
};

//----------------------------------------------------------------------

/**
* Deletes a game object.
* @param {GameObject} obj The game object.
*/
Scene.prototype.deleteObject = function (obj){
  this.trash.push(obj);
};

//----------------------------------------------------------------------

/**
* Cleans the destroyed objects.
*/
Scene.prototype.cleanTrash = function (){

  for (var i = 0; i < this.trash.length; i++) {
    // TODO remove deleted objects

    var gameObject = this.trash[i];

    var script = gameObject.getComponent(Script);

    if(script !== null){
      script.onDestroy();
    }
  }

  this.trash = [];
};

//----------------------------------------------------------------------

/**
* Returns the render context.
* @returns {RenderContext} The render context.
*/
Scene.prototype.getRenderContext = function (){
	return this.renderContext;
};

//----------------------------------------------------------------------

/**
* Sets the render context.
* @param {RenderContext} renderContext The render context.
*/
Scene.prototype.setRenderContext = function (renderContext){
	this.renderContext=renderContext;
};

//----------------------------------------------------------------------

/**
* Returns the camera.
* @returns {Camera} The camera.
*/
Scene.prototype.getCamera = function (){
	return this.camera;
};

//----------------------------------------------------------------------

/**
* Sets the camera.
* @param {Camera} camera The camera.
*/
Scene.prototype.setCamera = function (camera){
	this.camera=camera;
};

//----------------------------------------------------------------------
