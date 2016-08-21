var Script = function (){
    Component.call(this);
};

Script.prototype = new Component();
Script.prototype.constructor = Script;

//----------------------------------------------------------------------

Script.prototype.start = function (){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Script.prototype.update = function (){
  var children = this.getChildren();
	for (var i = 0; i < children.length; i++) {
	   children[i].update();
	}
};

//----------------------------------------------------------------------

Script.prototype.onEnterCollision = function (otherGameObject, contact){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Script.prototype.onExitCollision = function (otherGameObject, contact){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

Script.prototype.onDestroy = function (){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------
