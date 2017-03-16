
/**
* @class
* @extends {Component}
* @classdesc This class represents a script.
*/
var Script = function (){
    Component.call(this);
};

Script.prototype = new Component();
Script.prototype.constructor = Script;

//----------------------------------------------------------------------

/**
* This function runs when the engine starts at first time.
*/
Script.prototype.start = function (){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

/**
* This function runs each frame.
*/
Script.prototype.update = function (){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

/**
* This function runs when the game element collides with other game element.
* @param {GameObject} otherGameObject The other gameobject.
* @param {b2Contact} contact The contact.
*/
Script.prototype.onEnterCollision = function (otherGameObject, contact){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

/**
* This function runs when the collision is finished.
* @param {GameObject} otherGameObject The other gameobject.
* @param {b2Contact} contact The contact.
*/
Script.prototype.onExitCollision = function (otherGameObject, contact){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------

/**
* This function runs when the game element is destroyed.
*/
Script.prototype.onDestroy = function (){
  throw new Error("Abstract method!");
};

//----------------------------------------------------------------------
