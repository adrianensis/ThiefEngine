// Class definition goes here.
var Vector2 = function (x,y){
    Vector3.call(this,x,y,0);
};

Vector2.prototype = new Vector3();
Vector2.prototype.constructor = Vector2;
