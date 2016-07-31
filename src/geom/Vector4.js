// Class definition goes here.
var Vector4 = function (x,y,z,w){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
};

// Method definition goes here.
Vector4.prototype.toArray = function (){
    var array = new Array(4);
    array[0] = this.x;
    array[1] = this.y;
    array[2] = this.z;
    array[3] = this.w;
    return array;
};

Vector4.prototype.fromArray = function (array){
    this.x = array[0];
    this.y = array[1];
    this.z = array[2];
    this.w = array[3];

    return this;
};

Vector4.prototype.set = function (vec){
    this.x = vec.x;
    this.y = vec.y;
    this.z = vec.z;
    this.w = vec.w;

    return this;
};

Vector4.prototype.cpy = function (){
    return new Vector4(this.x, this.y, this.z, this.w);
};

// Method definition goes here.
Vector4.prototype.len = function (){
    var x = this.x;
    var y = this.y;
    var z = this.z;

    return Math.sqrt((x*x) + (y*y) + (z*z));
};

Vector4.prototype.max = function (){
    var x = this.x;
    var y = this.y;
    var z = this.z;

    return Math.max(x , Math.max(y , z));
};

Vector4.prototype.min = function (){
    var x = this.x;
    var y = this.y;
    var z = this.z;

    return Math.min(x , Math.min(y , z));
};

// Method definition goes here.
Vector4.prototype.add = function (vec){
    this.x = this.x + vec.x;
    this.y = this.y + vec.y;
    this.z = this.z + vec.z;
    this.w = 0;

    return this;
};

Vector4.prototype.sub = function (vec){
    this.x = this.x - vec.x;
    this.y = this.y - vec.y;
    this.z = this.z - vec.z;
    this.w = 0;

    return this;
};

Vector4.prototype.addScl = function (v){
    this.x = this.x + v;
    this.y = this.y + v;
    this.z = this.z + v;
    this.w = 0;

    return this;
};

Vector4.prototype.subScl = function (v){
    this.x = this.x - v;
    this.y = this.y - v;
    this.z = this.z - v;
    this.w = 0;

    return this;
};

// Method definition goes here.
Vector4.prototype.mul = function (vec){
    this.x = this.x*vec.x;
    this.y = this.y*vec.y;
    this.z = this.z*vec.z;
    this.w = 0;

    return this;
};

Vector4.prototype.mulScl = function (value){
    this.x = this.x*value;
    this.y = this.y*value;
    this.z = this.z*value;
    this.w = 0;

    return this;
};

Vector4.prototype.div = function (vec){
    this.x = this.x/vec.x;
    this.y = this.y/vec.y;
    this.z = this.z/vec.z;
    this.w = 0;

    return this;
};

Vector4.prototype.divScl = function (value){
    this.x = this.x/value;
    this.y = this.y/value;
    this.z = this.z/value;
    this.w = 0;

    return this;
};

Vector4.prototype.abs = function (){
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    this.z = Math.abs(this.z);
    this.w = 0;

    return this;
};

// Method definition goes here.
Vector4.prototype.dot = function (vec){
  var x1 = this.x;
  var y1 = this.y;
  var z1 = this.z;

  var x2 = vec.x;
  var y2 = vec.y;
  var z2 = vec.z;

  return x1*x2 + y1*y2 + z1*z2;
};

// Method definition goes here.
Vector4.prototype.cross = function (vec){

    var x1 = this.x;
    var y1 = this.y;
    var z1 = this.z;

    var x2 = vec.x;
    var y2 = vec.y;
    var z2 = vec.z;

    this.x = y1 * z2 - z1 * y2;
	this.y = z1 * x2 - x1 * z2;
	this.z = x1 * y2 - y1 * x2;
    this.w = 0;

    return this;
};

// Method definition goes here.
Vector4.prototype.ang = function (vec){
    var dot = this.dot(vec);

    var len1 = this.len();
    var len2 = vec.len();

    var cos = (dot/(len1*len2));

    return Math.acos(cos);
};

// Method definition goes here.
Vector4.prototype.nor = function (){

    var len = this.len();

    if(len > 0){
        this.x = this.x/len;
        this.y = this.y/len;
        this.z = this.z/len;
        this.w = this.w/len;
    }

    return this;
};

Vector4.prototype.dst = function (vec){

    var deltaX = vec.x-this.x;
    var deltaY = vec.y-this.y;
    var deltaZ = vec.z-this.z;

    return Math.sqrt( (deltaX*deltaX) + (deltaY*deltaY) + (deltaZ*deltaZ) );
};

Vector4.prototype.equals = function(vec){
    return (this.x === vec.x) &&
        (this.y === vec.y) &&
        (this.z === vec.z);
};

Vector4.prototype.epsilonEquals = function(vec,e){
    // Points are equal if each component is within 'e' of each other
    if( (Math.abs(this.x - vec.x) <= e) &&
        (Math.abs(this.y - vec.y) <= e) &&
        (Math.abs(this.z - vec.z) <= e) )
        return true;
    else
        return false;
};
