var GameObject = function (){
    BaseObject.call(this);
    this.parent = null;
    this.children = new Array(0);
    this.components = new Array(0);
    this.scene = null;
    this.static = false;
};

GameObject.prototype = new BaseObject();
GameObject.prototype.constructor = GameObject;

GameObject.prototype.getParent = function (){
	return this.parent;
};

GameObject.prototype.setParent = function (parent){
	this.parent=parent;
};

GameObject.prototype.setStatic = function (bool){
	this.static = bool;
};

GameObject.prototype.isStatic = function (parent){
	return this.static;
};

GameObject.prototype.getScene = function (){
	return this.scene;
};

GameObject.prototype.setScene = function (scene){
	this.scene=scene;
};

GameObject.prototype.getChildren = function (){
	return this.children;
};

GameObject.prototype.setChildren = function (children){
    for (var child of children) {
        child.setParent(this);
    }

	this.children=children;
};

GameObject.prototype.getComponents = function (){
	return this.components;
};

GameObject.prototype.setComponents = function (components){
	this.components=components;
};

GameObject.prototype.addChild = function (child){
    child.setParent(this);
    this.children.push(child);
};

GameObject.prototype.getChild = function (){

};

GameObject.prototype.addComponent = function (component){
    component.setGameObject(this);
    this.components.push(component);
};

GameObject.prototype.getAllComponents = function (componentClass){

    var componentList = [];

    component = this.getComponent(componentClass);

    if(component !== null)
      componentList.push(component);

    for (var child of this.children) {
        // var component = child.getComponent(componentClass);
        //
        // if(component != null)
        //   componentList.push(component);

        componentList = componentList.concat(child.getAllComponents(componentClass));
    }



    return componentList;

};

GameObject.prototype.getComponent = function (componentClass){

    for (var component of this.components) {

        if(component instanceof componentClass){
            return component;
        }
    }

    return null;
};

GameObject.prototype.getComponentsInChildren = function (componentClass){
    var componentList = [];

    for (var child of this.children) {
        componentList = componentList.concat(child.getAllComponents(componentClass));
    }

    return componentList;
};
