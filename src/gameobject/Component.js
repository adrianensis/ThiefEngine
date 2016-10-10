/**
* @class
* @extends {BaseObject}
* @classdesc Represents a component of a game object. A component provides specific functionality to the game object.
*/
var Component = function (){
    BaseObject.call(this);
    this.gameObject = null;
    this.enabled = true;
    this.destroyed = false;
};

Component.prototype = new BaseObject();
Component.prototype.constructor = Component;

//----------------------------------------------------------------------

/**
* Returns the game object.
* @returns {GameObject} The game object.
*/
Component.prototype.getGameObject = function (){
	return this.gameObject;
};

//----------------------------------------------------------------------

/**
* Sets the game object.
* @param {GameObject} gameObject The Game object.
*/
Component.prototype.setGameObject = function (gameObject){
	this.gameObject=gameObject;
};

//----------------------------------------------------------------------

/**
* Enables the component.
*/
Component.prototype.enable = function (){
	this.enabled=true;
};

//----------------------------------------------------------------------

/**
* Disables the component.
*/
Component.prototype.disable = function (){
	this.enabled=false;
};

//----------------------------------------------------------------------

/**
* Returns true if component is enabled.
* @returns {Boolean} True if component is enabled.
*/
Component.prototype.isEnabled = function (){
	return this.enabled;
};

//----------------------------------------------------------------------

/**
* Returns the component's parent. The componet's parent is the component ,with the same class of
* this component, in the game object's parent.
* @returns {Component} The component's parent.
*/
Component.prototype.getParent = function(){
    var parent = this.gameObject.getParent();

    if(parent !== null)
      return parent.getComponent(this.constructor);

    return null;

};

//----------------------------------------------------------------------

/**
* Returns the component's children. Returns all the components, with the same class of this component,
* in the game component's children.
* @returns {Component} The component's children.
*/
Component.prototype.getChildren = function (){
    return this.gameObject.getComponentsInChildren(this.constructor);
};

//----------------------------------------------------------------------

/**
* Destroys the component.
*/
Component.prototype.destroy = function (){
  // this.gameObject = null;
  this.destroyed = true;
};

//----------------------------------------------------------------------

/**
* Returns true if the component is destroyed.
* @returns {Boolean} True if the component is destroyed.
*/
Component.prototype.isDestroyed = function (){
	return this.destroyed;
};

//----------------------------------------------------------------------
