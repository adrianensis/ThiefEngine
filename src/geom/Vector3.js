/**
* @class
* @extends {Vector4}
* @classdesc Represents a 3-dimensional vector.
* @param {float} x The x component.
* @param {float} y The y component.
* @param {float} z The z component.
*/
var Vector3 = function (x,y,z){
    Vector4.call(this,x,y,z,0);
};

Vector3.prototype = new Vector4();
Vector3.prototype.constructor = Vector3;
