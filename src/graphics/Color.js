/**
* @class
* @classdesc This class represents a color.
* @param {Number} r The red component.
* @param {Number} g The green component.
* @param {Number} b The blue component.
* @param {Number} a The alpha component.
*/
var Color = function (r,g,b,a) {
  // this.vec = new Vector4(r,g,b,a);

  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
};

// PRE-DEFINED COLORS
Color.NONE = new Color(0.0, 0.0, 0.0, 0.0);
Color.RED = new Color(1.0, 0.0, 0.0, 1.0);
Color.GREEN = new Color(0.0, 1.0, 0.0, 1.0);
Color.BLUE = new Color(0.0, 0.0, 1.0, 1.0);
Color.CYAN = new Color(0.0, 1.0, 1.0, 1.0);
Color.YELLOW = new Color(1.0, 1.0, 0.0, 1.0);

//----------------------------------------------------------------------

/**
* Returns a random color.
* @returns {Color} The color.
*/
Color.random = function () {
  var r = Math.random();
  var g = Math.random();
  var b = Math.random();
  // var a = Math.Random();

  return new Color(r,g,b,1.0);
};

//----------------------------------------------------------------------

/**
* Returns an array representation of the color.
* @returns {Array} An array representation of the color.
*/
Color.prototype.toArray = function(){
  // return this.vec.toArray;
  var array = new Array(4);
  array[0] = this.r;
  array[1] = this.g;
  array[2] = this.b;
  array[3] = this.a;
  return array;
};


//----------------------------------------------------------------------

/**
* Tests if this color is equal to the other color.
* @param {Vector4} vec The other color.
* @returns {boolean} this True if this color is equal to the other color.
*/
Color.prototype.equals = function(otherColor){
  // return this.vec.equals(otherColor.vec);
  return (this.r === vec.r) &&
      (this.g === vec.g) &&
      (this.b === vec.b) &&
      (this.a === vec.a);
};

//----------------------------------------------------------------------
