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


Scene.prototype.getName = function (){
	return this.name;
};

Scene.prototype.setLoaded = function (bool){
	this.loaded=bool;
};

Scene.prototype.isLoaded = function (){
	return this.loaded;
};

Scene.prototype.getRoot = function (){
  return this.root;
};

Scene.prototype.getNewsRoot = function (){
	return this.newsRoot;
};

Scene.prototype.flush = function (){
  this.root.setChildren(this.root.getChildren().concat(this.newsRoot.getChildren()));
  this.newsRoot.setChildren([]);
  this.newObjects = false;
};

Scene.prototype.hasNewObjects = function (){
	return this.newObjects;
};

Scene.prototype.addObject = function (obj){
  // console.log("ADD OBJECT: " + obj.getId());
  this.newObjects = true;

  obj.setScene(this);
  obj.getTransform().initMatrix();
  this.newsRoot.addChild(obj);
};

Scene.prototype.deleteObject = function (obj){
  this.trash.push(obj);
};

Scene.prototype.cleanTrash = function (obj){

  for (var i = 0; i < this.trash.length; i++) {
    // TODO remove deleted objects
  }

  this.trash = [];
};

Scene.prototype.getRenderContext = function (){
	return this.renderContext;
};

Scene.prototype.setRenderContext = function (renderContext){
	this.renderContext=renderContext;
};

Scene.prototype.getCamera = function (){
	return this.camera;
};

Scene.prototype.setCamera = function (camera){
	this.camera=camera;
};
