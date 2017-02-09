/**
* @class
* @classdesc This class provides seedable random.
* @param {Number} seed The seed.
*/
var Random = function(seed){
    this.seed = seed;
};

//----------------------------------------------------------------------

//

/**
* Return a random number, in a range. If max and min are undefined, they are setted to 1 and 0.
* @link  http://indiegamr.com/generate-repeatable-random-numbers-in-js/
* @param {Number} max The max.
* @param {Number} min The min.
* @returns {Number} The randon number.
*/
Random.prototype.seededRandom = function(max, min) {

    var _max = max || 1;
    var _min = min || 0;

    this.seed = (this.seed * 9301 + 49297) % 233280;
    var rnd = this.seed / 233280;

    return _min + rnd * (_max - _min);
};

//----------------------------------------------------------------------
