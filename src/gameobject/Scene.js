var Scene = function (){
    this.root = new GameObject();
    this.camera = null;
    this.renderContext = null;
    this.newsRoot = new GameObject();

    this.newObjects = false;
};

Scene.prototype.getRoot = function (){
    this.root.setChildren(this.root.getChildren().concat(this.newsRoot.getChildren()));
    this.newsRoot.setChildren(new Array(0));
    this.newObjects = false;
	return this.root;
};

Scene.prototype.setRoot = function (root){
	this.root=root;
};

Scene.prototype.hasNewObjects = function (){
	return this.newObjects;
};

Scene.prototype.addObject = function (obj){
    // console.log("ADD OBJECT: " + obj.getId());
    this.newObjects = true;
    obj.setScene(this);
	this.newsRoot.addChild(obj);
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
