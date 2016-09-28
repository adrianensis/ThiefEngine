/**
* @class
* @classdesc This is the root class for classes that need an ID, like Component or GameObject.
*/
var BaseObject = function (){
    this.id = BaseObject.lastId;
    BaseObject.lastId++;
};

BaseObject.lastId = 0;

//----------------------------------------------------------------------

/**
* Returns the id of the object.
* @returns {Number} The id.
*/
BaseObject.prototype.getId = function (){
	return this.id;
};

//----------------------------------------------------------------------
