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
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Component.prototype.getGameObject = function (){
	return this.gameObject;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Component.prototype.setGameObject = function (gameObject){
	this.gameObject=gameObject;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Component.prototype.enable = function (){
	this.enabled=true;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Component.prototype.disable = function (){
	this.enabled=false;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Component.prototype.isEnabled = function (){
	return this.enabled;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Component.prototype.getParent = function(){
    var parent = this.gameObject.getParent();

    if(parent !== null)
        return parent.getComponent(this.constructor);

    return null;

};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Component.prototype.getChild = function (){
    return this.gameObject.getComponent(this.constructor);
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Component.prototype.getChildren = function (){
    return this.gameObject.getComponentsInChildren(this.constructor);
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Component.prototype.destroy = function (){
  // this.gameObject = null;
  this.destroyed = true;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Component.prototype.isDestroyed = function (){
	return this.destroyed;
};

//----------------------------------------------------------------------
