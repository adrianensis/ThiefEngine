var Random = function(seed){
    this.seed = seed;
};

//----------------------------------------------------------------------

// http://programmers.stackexchange.com/questions/260969/original-source-of-seed-9301-49297-233280-random-algorithm

Random.prototype.seededRandom = function(max, min) {


    this.seed = (this.seed * 9301 + 49297) % 233280;
    var rnd = this.seed / 233280;

    return rnd;
};

//----------------------------------------------------------------------
