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
* Return the game object.
* @returns {GameObject} The game object.
*/
Component.prototype.getGameObject = function (){
	return this.gameObject;
};

//----------------------------------------------------------------------

/**
* Set the game object.
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
* Disable the component.
*/
Component.prototype.disable = function (){
	this.enabled=false;
};

//----------------------------------------------------------------------

/**
* Return true if component is enabled.
* @returns {Boolean} True if component is enabled.
*/
Component.prototype.isEnabled = function (){
	return this.enabled;
};

//----------------------------------------------------------------------

/**
* Return the parent of this component. The parent of this component is the component ,with the same class of
* this component, in the parent of the game object.
* @returns {Component} The parent of this component.
*/
Component.prototype.getParent = function(){
    var parent = this.gameObject.getParent();

    if(parent !== null)
      return parent.getComponent(this.constructor);

    return null;

};

//----------------------------------------------------------------------

/**
* Return the children of the component. Return all the components, with the same class of this component,
* in the children of the game component.
* @returns {Component} The children of the component.
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
* Return true if the component is destroyed.
* @returns {Boolean} True if the component is destroyed.
*/
Component.prototype.isDestroyed = function (){
	return this.destroyed;
};

//----------------------------------------------------------------------
