// Class definition goes here.
var Vector3 = function (x,y,z){
    Vector4.call(this,x,y,z,0);
};

Vector3.prototype = new Vector4();
Vector3.prototype.constructor = Vector3;
