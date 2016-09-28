/**
* @class
* @classdesc This class represents a scene. Contains a camera, a render context and the game objects.
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
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.getName = function (){
	return this.name;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.setLoaded = function (bool){
	this.loaded=bool;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.isLoaded = function (){
	return this.loaded;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.getRoot = function (){
  return this.root;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.getNewsRoot = function (){
	return this.newsRoot;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.flush = function (){
  this.root.setChildren(this.root.getChildren().concat(this.newsRoot.getChildren()));
  this.newsRoot.setChildren([]);
  this.newObjects = false;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.hasNewObjects = function (){
	return this.newObjects;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
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
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.deleteObject = function (obj){
  this.trash.push(obj);
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.cleanTrash = function (obj){

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
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.getRenderContext = function (){
	return this.renderContext;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.setRenderContext = function (renderContext){
	this.renderContext=renderContext;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.getCamera = function (){
	return this.camera;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Scene.prototype.setCamera = function (camera){
	this.camera=camera;
};

//----------------------------------------------------------------------
