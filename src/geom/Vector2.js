/**
* @class
* @extends {Vector3}
* @classdesc Represents a 2-dimensional vector.
* @param {float} x The x component.
* @param {float} y The y component.
*/
var Vector2 = function (x,y){
    Vector3.call(this,x,y,0);
};

Vector2.prototype = new Vector3();
Vector2.prototype.constructor = Vector2;

//----------------------------------------------------------------------
