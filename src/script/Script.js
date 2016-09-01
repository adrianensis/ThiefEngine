var Script = function (){
    Component.call(this);
};

Script.prototype = new Component();
/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Script.prototype.constructor = Script;

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Script.prototype.start = function (){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Script.prototype.update = function (){
  var children = this.getChildren();
	for (var i = 0; i < children.length; i++) {
	   children[i].update();
	}
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Script.prototype.onEnterCollision = function (otherGameObject, contact){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Script.prototype.onExitCollision = function (otherGameObject, contact){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Script.prototype.onDestroy = function (){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------
