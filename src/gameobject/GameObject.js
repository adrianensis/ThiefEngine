/**
* @class
* @classdesc Represents a game object, every entity in our game is a GameObject. This class needs
* the Component class to have functionality, like rendering or physics properties.
*/
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
* Returns the game object's transform. This function is more useful than getComponent(Transform)
* because this function avoid the search of the transform component in the components list.
* @returns {Transform} The game object's transform.
*/
GameObject.prototype.getTransform = function (){
	return this.transform;
};

//----------------------------------------------------------------------

/**
* Returns the game object's parent.
* @returns {GameObject} The game object's parent.
*/
GameObject.prototype.getParent = function (){
	return this.parent;
};

//----------------------------------------------------------------------

/**
* Sets the game object's parent.
* @param {GameObject} parent The game object's parent.
*/
GameObject.prototype.setParent = function (parent){
	this.parent=parent;
};

//----------------------------------------------------------------------

/**
* Sets the game object as static.
* @param {Boolean} bool The boolean value.
*/
GameObject.prototype.setStatic = function (bool){
	this.static = bool;
};

//----------------------------------------------------------------------

/**
* Returns true if the game object is static.
* @returns {Boolean True if the game object is static.
*/
GameObject.prototype.isStatic = function (){
	return this.static;
};

//----------------------------------------------------------------------

/**
* Returns the scene where the game object is.
* @returns {Scene} The scene where the game object is.
*/
GameObject.prototype.getScene = function (){
	return this.scene;
};

//----------------------------------------------------------------------

/**
* Sets the scene where the game object is.
* @param {Scene} scene The scene where the game object is.
*/
GameObject.prototype.setScene = function (scene){
	this.scene=scene;
};

//----------------------------------------------------------------------

/**
* Returns the game object's children.
* @returns {Array} The game object's children.
*/
GameObject.prototype.getChildren = function (){
	return this.children;
};

//----------------------------------------------------------------------

/**
* Sets the game object's children.
* @param {Array} children The game object's children.
*/
GameObject.prototype.setChildren = function (children){
    for (var child of children) {
        child.setParent(this);
    }

	this.children=children;
};

//----------------------------------------------------------------------

/**
* Returns the game object's components.
* @returns {Array} The game object's components.
*/
GameObject.prototype.getComponents = function (){
	return this.components;
};

//----------------------------------------------------------------------

/**
* Enables all the components.
*/
GameObject.prototype.enable = function (){
	for (var component of this.components) {
    component.enable();
  }
};

//----------------------------------------------------------------------

/**
* Disables all the components.
*/
GameObject.prototype.disable = function (){
  for (var component of this.components) {
    component.disable();
  }
};

//----------------------------------------------------------------------

/**
* Adds a child and sets this game object as its parent.
* @param {GameObject} child The child.
*/
GameObject.prototype.addChild = function (child){
  child.setParent(this);
  this.children.push(child);
};

//----------------------------------------------------------------------

// TODO: create function to get only one child ???
// GameObject.prototype.getChild = function (){
//
// };

//----------------------------------------------------------------------

/**
* Adds a component.
* @param {Component} component The component.
*/
GameObject.prototype.addComponent = function (component){

  // TODO: only allow one transform component. What if there are many?
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
* Returns all the components in this game object and in children.
* @param {function} componentClass The component class.
* @returns {Array} The components.
*/
GameObject.prototype.getAllComponents = function (componentClass){

    var componentList = [];

    component = this.getComponent(componentClass);

    if(component !== null)
      componentList.push(component);

    for (var child of this.children) {
        componentList = componentList.concat(child.getAllComponents(componentClass));
    }



    return componentList;

};

//----------------------------------------------------------------------

/**
* Returns one component in this game object.
* @param {function} componentClass The component class.
* @returns {Component} The components.
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
* Returns all the components in children.
* @param {function} componentClass The component class.
* @returns {Array} The components.
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
* Destroys the game object's children.
*/
GameObject.prototype.destroyChildren = function (){
  for (var child of this.children)
    child.destroy();

};

//----------------------------------------------------------------------

/**
* Destroys the game object's component.
*/
GameObject.prototype.destroyAllComponents = function (){
  for (var component of this.components)
    component.destroy();
};


//----------------------------------------------------------------------

/**
* Destroys the game object.
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
