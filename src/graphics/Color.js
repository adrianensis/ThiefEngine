var Color = function (r,g,b,a) {
  // this.vec = new Vector4(r,g,b,a);

  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
};

Color.NONE = new Color(0.0, 0.0, 0.0, 0.0);
Color.RED = new Color(1.0, 0.0, 0.0, 1.0);
Color.GREEN = new Color(0.0, 1.0, 0.0, 1.0);
Color.BLUE = new Color(0.0, 0.0, 1.0, 1.0);

//----------------------------------------------------------------------

Color.random = function () {
  var r = Math.random();
  var g = Math.random();
  var b = Math.random();
  // var a = Math.Random();

  return new Color(r,g,b,1.0);
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
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
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Color.prototype.equals = function(otherColor){
  // return this.vec.equals(otherColor.vec);
  return (this.r === vec.r) &&
      (this.g === vec.g) &&
      (this.b === vec.b) &&
      (this.a === vec.a);
};

//----------------------------------------------------------------------
