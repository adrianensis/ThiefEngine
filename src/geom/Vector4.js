/**
* @class
* @classdesc Represents a 4-dimensional vector.
* @param {Number} x The x component.
* @param {Number} y The y component.
* @param {Number} z The z component.
* @param {Number} w The w component.
*/
var Vector4 = function (x,y,z,w){
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
};

//----------------------------------------------------------------------

/**
* Returns an array representation of the vector.
* @returns {Array} An array representation of the vector.
*/
Vector4.prototype.toArray = function (){
    var array = new Array(4);
    array[0] = this.x;
    array[1] = this.y;
    array[2] = this.z;
    array[3] = this.w;
    return array;
};

//----------------------------------------------------------------------

/**
* Sets the vector from an array.
* @param {Array} array The original array.
* @returns {Vector4} this.
*/
Vector4.prototype.fromArray = function (array){
    this.x = array[0];
    this.y = array[1];
    this.z = array[2];
    this.w = array[3];

    return this;
};

//----------------------------------------------------------------------

/**
* Sets the vector from another vector.
* @param {Vector4} vec The original vector.
* @returns {Vector4} this.
*/
Vector4.prototype.set = function (vec){
    this.x = vec.x;
    this.y = vec.y;
    this.z = vec.z;
    this.w = vec.w;

    return this;
};

//----------------------------------------------------------------------

/**
* Returns a copy of this vector.
* @returns {Vector4} The copy of this vector.
*/
Vector4.prototype.cpy = function (){
    return new Vector4(this.x, this.y, this.z, this.w);
};

//----------------------------------------------------------------------

/**
* Returns the length of this vector.
* @returns {Number} The length of this vector.
*/
Vector4.prototype.len = function (){
    var x = this.x;
    var y = this.y;
    var z = this.z;

    return Math.sqrt((x*x) + (y*y) + (z*z));
};

//----------------------------------------------------------------------

/**
* Returns the maximum v in this vector.
* @returns {Number} The maximum v in this vector.
*/
Vector4.prototype.max = function (){
    var x = this.x;
    var y = this.y;
    var z = this.z;

    return Math.max(x , Math.max(y , z));
};

//----------------------------------------------------------------------

/**
* Divides this vector by a scalar.
* @returns {Vector4} this.
*/
Vector4.prototype.min = function (){
    var x = this.x;
    var y = this.y;
    var z = this.z;

    return Math.min(x , Math.min(y , z));
};

//----------------------------------------------------------------------

/**
* Adds a vector to this vector.
* @param {Vector4} vec The other vector.
* @returns {Vector4} this.
*/
Vector4.prototype.add = function (vec){
    this.x = this.x + vec.x;
    this.y = this.y + vec.y;
    this.z = this.z + vec.z;
    this.w = 0;

    return this;
};

//----------------------------------------------------------------------

/**
* Subtracts a vector to this vector.
* @param {Vector4} vec The other vector.
* @returns {Vector4} this.
*/
Vector4.prototype.sub = function (vec){
    this.x = this.x - vec.x;
    this.y = this.y - vec.y;
    this.z = this.z - vec.z;
    this.w = 0;

    return this;
};

//----------------------------------------------------------------------

/**
* Adds a scalar to all the components of this vector.
* @param {Number} value The scalar value.
* @returns {Vector4} this.
*/
Vector4.prototype.addScl = function (value){
    this.x = this.x + value;
    this.y = this.y + value;
    this.z = this.z + value;
    this.w = 0;

    return this;
};

//----------------------------------------------------------------------

/**
* Subtracts a scalar to all the components of this vector.
* @param {Number} value The scalar value.
* @returns {Vector4} this.
*/
Vector4.prototype.subScl = function (value){
    this.x = this.x - value;
    this.y = this.y - value;
    this.z = this.z - value;
    this.w = 0;

    return this;
};

//----------------------------------------------------------------------

/**
* Multiplies this vector by other vector.
* @param {Vector4} vec The other vector.
* @returns {Vector4} this.
*/
Vector4.prototype.mul = function (vec){
    this.x = this.x*vec.x;
    this.y = this.y*vec.y;
    this.z = this.z*vec.z;
    this.w = 0;

    return this;
};

//----------------------------------------------------------------------

/**
* Multiplies this vector by a scalar.
* @param {Number} value The scalar value.
* @returns {Vector4} this.
*/
Vector4.prototype.mulScl = function (value){
    this.x = this.x*value;
    this.y = this.y*value;
    this.z = this.z*value;
    this.w = 0;

    return this;
};

//----------------------------------------------------------------------

/**
* Divides this vector by other vector.
* @param {Vector4} vec The other vector.
* @returns {Vector4} this.
*/
Vector4.prototype.div = function (vec){
    this.x = this.x/vec.x;
    this.y = this.y/vec.y;
    this.z = this.z/vec.z;
    this.w = 0;

    return this;
};

//----------------------------------------------------------------------

/**
* Divides this vector by a scalar.
* @param {Number} value The scalar value.
* @returns {Vector4} this.
*/
Vector4.prototype.divScl = function (value){
    this.x = this.x/value;
    this.y = this.y/value;
    this.z = this.z/value;
    this.w = 0;

    return this;
};

//----------------------------------------------------------------------

/**
* Returns the dot product between this vector and other vector.
* @param {Vector4} vec The other vector.
* @returns {Number} The dot product between this vector and other vector..
*/
Vector4.prototype.dot = function (vec){
  var x1 = this.x;
  var y1 = this.y;
  var z1 = this.z;

  var x2 = vec.x;
  var y2 = vec.y;
  var z2 = vec.z;

  return x1*x2 + y1*y2 + z1*z2;
};

//----------------------------------------------------------------------

/**
* Calculates the cross product between this vector and other vector.
* @param {Vector4} vec The other vector.
* @returns {Vector4} this.
*/
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

//----------------------------------------------------------------------

/**
* Returns the angle in degrees relative to other vector.
* @param {Vector4} vec The other vector.
* @returns {Number} The angle in degrees relative to other vector.
*/
Vector4.prototype.ang = function (vec){
    var dot = this.dot(vec);

    var len1 = this.len();
    var len2 = vec.len();

    var cos = (dot/(len1*len2));

    if(len1*len2 === 0)
      return 0;

    return Math.acos(cos);
};

//----------------------------------------------------------------------

/**
* Normalizes this vector.
* @returns {Vector4} this.
*/
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

//----------------------------------------------------------------------

/**
* Returns the distance between this vector and other vector.
* @param {Vector4} vec The other vector.
* @returns {Number} The distance between this vector and other vector.
*/
Vector4.prototype.dst = function (vec){

    var deltaX = vec.x-this.x;
    var deltaY = vec.y-this.y;
    var deltaZ = vec.z-this.z;

    return Math.sqrt( (deltaX*deltaX) + (deltaY*deltaY) + (deltaZ*deltaZ) );
};

//----------------------------------------------------------------------

/**
* Tests if this vector is equal to the other vector.
* @param {Vector4} vec The other vector.
* @returns {boolean} this True if this vector is equal to the other vector.
*/
Vector4.prototype.equals = function(vec){
    return (this.x === vec.x) &&
        (this.y === vec.y) &&
        (this.z === vec.z);
};

//----------------------------------------------------------------------

/**
* Tests if this vector is equal to the other vector, whit an epsilon error.
* @param {Vector4} vec The other vector.
* @param {Number} epsilon The error.
* @returns {boolean} this True if this vector is equal to the other vector, whit an epsilon error.
*/
Vector4.prototype.epsilonEquals = function(vec,epsilon){
    // Points are equal if each component is within 'epsilon' of each other
    if( (Math.abs(this.x - vec.x) <= epsilon) &&
        (Math.abs(this.y - vec.y) <= epsilon) &&
        (Math.abs(this.z - vec.z) <= epsilon) )
        return true;
    else
        return false;
};

//----------------------------------------------------------------------
