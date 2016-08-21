var Component = function (){
    BaseObject.call(this);
    this.gameObject = null;
    this.enabled = true;
    this.destroyed = false;
};

Component.prototype = new BaseObject();
Component.prototype.constructor = Component;

//----------------------------------------------------------------------

Component.prototype.getGameObject = function (){
	return this.gameObject;
};

//----------------------------------------------------------------------

Component.prototype.setGameObject = function (gameObject){
	this.gameObject=gameObject;
};

//----------------------------------------------------------------------

Component.prototype.enable = function (){
	this.enabled=true;
};

//----------------------------------------------------------------------

Component.prototype.disable = function (){
	this.enabled=false;
};

//----------------------------------------------------------------------

Component.prototype.isEnabled = function (){
	return this.enabled;
};

//----------------------------------------------------------------------

Component.prototype.getParent = function(){
    var parent = this.gameObject.getParent();

    if(parent !== null)
        return parent.getComponent(this.constructor);

    return null;

};

//----------------------------------------------------------------------

Component.prototype.getChild = function (){
    return this.gameObject.getComponent(this.constructor);
};

//----------------------------------------------------------------------

Component.prototype.getChildren = function (){
    return this.gameObject.getComponentsInChildren(this.constructor);
};

//----------------------------------------------------------------------

Component.prototype.destroy = function (){
  // this.gameObject = null;
  this.destroyed = true;
};

//----------------------------------------------------------------------

Component.prototype.isDestroyed = function (){
	return this.destroyed;
};

//----------------------------------------------------------------------
