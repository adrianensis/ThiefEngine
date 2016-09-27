var GameObject = function (){
    BaseObject.call(this);
    this.parent = null;
    this.children = [];
    this.components = [];
    this.scene = null;
    this.static = false;

    this.transform = null;
};

GameObject.prototype = new BaseObject();
GameObject.prototype.constructor = GameObject;

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.getTransform = function (){
	return this.transform;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.getParent = function (){
	return this.parent;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.setParent = function (parent){
	this.parent=parent;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.setStatic = function (bool){
	this.static = bool;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.isStatic = function (parent){
	return this.static;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.getScene = function (){
	return this.scene;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.setScene = function (scene){
	this.scene=scene;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.getChildren = function (){
	return this.children;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.setChildren = function (children){
    for (var child of children) {
        child.setParent(this);
    }

	this.children=children;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.getComponents = function (){
	return this.components;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.enable = function (){
	for (var component of this.components) {
    component.enable();
  }
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.disable = function (){
  for (var component of this.components) {
    component.disable();
  }
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.addChild = function (child){
  child.setParent(this);
  this.children.push(child);
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.getChild = function (){

};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.addComponent = function (component){

  if( (component instanceof Transform) && (this.transform === null)){

    this.transform = component;

    component.setGameObject(this);
    this.components.push(component);
  }else {
    component.setGameObject(this);
    this.components.push(component);
  }

};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
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

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.getComponent = function (componentClass){

    for (var component of this.components) {

        if(component instanceof componentClass){
            return component;
        }
    }

    return null;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.getComponentsInChildren = function (componentClass){
    var componentList = [];

    for (var child of this.children) {
        componentList = componentList.concat(child.getAllComponents(componentClass));
    }

    return componentList;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.destroyChildren = function (){
  for (var child of this.children)
    child.destroy();

};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.destroyAllComponents = function (){
  for (var component of this.components)
    component.destroy();
};


//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObject.prototype.destroy = function (){
  // this.setParent(null);
  this.disable();
	this.scene.deleteObject(this);
  this.destroyAllComponents();
  this.destroyChildren();
  // this.children = null;
  // this.components = null;
};

//----------------------------------------------------------------------
