/**
* @class
* @classdesc This class provides seedable random.
* @param {Number} seed The seed.
* @param {Number} n The number of gradients.
*/
var PerlinNoise = function(n,seed){

    this.random = new Random(seed);
    this.n = n;
    // this.posOffset = posOffset.cpy();

    this.gradients = new Array(this.n);

    // -------------------------------

    // Shuffle function
    function shuffle(array, randomGenerator) {

      var currentIndex = array.length;
      var aux;
      var randomIndex;

      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(randomGenerator.seededRandom() * currentIndex);
        currentIndex -= 1; // lenght--

        // swap
        aux = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = aux;
      }

      return array;
    }

    // -------------------------------

    // Gradients array
    for ( var i=0; i<this.n; i++) {
      this.gradients[ i ] = new Vector2(0,0);

      this.gradients[ i ].x = this.random.seededRandom() * 2.0 - 1.0;
      this.gradients[ i ].y = this.random.seededRandom() * 2.0 - 1.0;

      var lengthSq = this.gradients[ i ].x * this.gradients[ i ].x + this.gradients[ i ].y * this.gradients[ i ].y;
      var length = Math.sqrt( lengthSq );

      this.gradients[ i ].x /= length;
      this.gradients[ i ].y /= length;
    }

    // -------------------------------

    // Permutations array
    this.permutation = new Array(this.n);

    for (var i = 0; i < this.n; i++)
        this.permutation.push(i);

    this.permutation = shuffle(this.permutation, this.random);

    // -------------------------------
};

//----------------------------------------------------------------------


PerlinNoise.prototype.getGradient = function( x,y ){
    // TODO: use & or mod % ????

    var index = y  & (this.n - 1);
    index = ( x + this.permutation[ index ] ) & (this.n - 1);

    return this.gradients[ index ];
};

//----------------------------------------------------------------------

PerlinNoise.prototype.lerp = function(a, b, t) {
     return (1.0 - t)*a + t*b;
};

//----------------------------------------------------------------------

// Compute the dot product of the distance and gradient vectors.
PerlinNoise.prototype.dotGridGradient = function(ix, iy, x, y) {

  // Compute the distance vector
  var offset = new Vector2(x - ix, y - iy);

  var grad = this.getGradient(new Vector2(ix,iy));

  // Compute the dot-product
  return grad.dot(offset);
};

//----------------------------------------------------------------------

/**
* Return a random number.
* @param {Number} x The x coordinate.
* @param {Number} y The y coordinate.
* @returns {Number} The randon number.
*/
PerlinNoise.prototype.generate = function(x, y){

  x += this.random.seededRandom(); // in [0,1] range
  y += this.random.seededRandom(); // in [0,1] range

  var xCoord = Math.floor(x);
  var yCoord = Math.floor(y);

  // Determine grid cell coordinates
  var x0 = (xCoord > 0.0 ? xCoord : xCoord - 1);
  var x1 = x0 + 1;
  var y0 = (yCoord > 0.0 ? yCoord : yCoord - 1);
  var y1 = y0 + 1;

  // Determine interpolation weights
  // Could also use higher order polynomial/s-curve here
  var sx = xCoord - x0;
  var sy = yCoord - y0;

  // Interpolate between grid point gradients
  var n0, n1, ix0, ix1, value;

  n0 = this.dotGridGradient(x0, y0, x, y);
  n1 = this.dotGridGradient(x1, y0, x, y);
  ix0 = this.lerp(n0, n1, sx);
  n0 = this.dotGridGradient(x0, y1, x, y);
  n1 = this.dotGridGradient(x1, y1, x, y);
  ix1 = this.lerp(n0, n1, sx);

  // console.log(ix0);
  // console.log(ix1);
  value = this.lerp(ix0, ix1, sy);

  // console.log(value);

  return value;
};

//----------------------------------------------------------------------
