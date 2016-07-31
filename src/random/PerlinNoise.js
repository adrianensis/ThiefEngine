var PerlinNoise = function(n,seed){

    this.random = new Random(seed);
    this.n = n;

    this.gradients = new Array(this.n);

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

    for ( var i=0; i<this.n; i++ )
    {
        this.gradients[ i ] = new Vector2(0,0);
        // this.gradients[ i ].x = Math.random() * 2.0 - 1.0;
        // this.gradients[ i ].y = Math.random() * 2.0 - 1.0;
        this.gradients[ i ].x = this.random.seededRandom() * 2.0 - 1.0;
        this.gradients[ i ].y = this.random.seededRandom() * 2.0 - 1.0;

        var lengthSq = this.gradients[ i ].x * this.gradients[ i ].x + this.gradients[ i ].y * this.gradients[ i ].y;
        var length = Math.sqrt( lengthSq );

        this.gradients[ i ].x /= length;
        this.gradients[ i ].y /= length;
    }


    this.permutation = new Array(this.n);

    for (var i = 0; i < this.n; i++) {
        this.permutation.push(i);
    }

    this.permutation = shuffle(this.permutation, this.random);

};

//  new Noise2D( indicies, gradients, gradients[ 0 ] );

PerlinNoise.prototype.getGradient = function( point )
{
    // TODO: use & or mod % ????

    var index = point.y  & (this.n - 1);
    index = ( point.x + this.permutation[ index ] ) & (this.n - 1);

    return this.gradients[ index ];
};

PerlinNoise.prototype.generate = function( x, y )
{
    // x += posOffset.x;
    // y += posOffset.y;

    xCoord = Math.floor( x );
    yCoord = Math.floor( y );



    var a = new Vector2( xCoord, yCoord );
    var b = new Vector2( xCoord + 1, yCoord );
    var c = new Vector2( xCoord + 1, yCoord + 1 );
    var d = new Vector2( xCoord, yCoord + 1 );

    var aGrad = this.getGradient( a );
    var bGrad = this.getGradient( b );
    var cGrad = this.getGradient( c );
    var dGrad = this.getGradient( d );

    var xOffset = x - xCoord;
    var yOffset = y - yCoord;

    var aOffset = new Vector2( xOffset, yOffset );
    var bOffset = new Vector2( xOffset - 1, yOffset );
    var cOffset = new Vector2( xOffset - 1, yOffset - 1 );
    var dOffset = new Vector2( xOffset, yOffset - 1 );

    var aContrib = aGrad.dot( aOffset );
    var bContrib = bGrad.dot( bOffset );
    var cContrib = cGrad.dot( cOffset );
    var dContrib = dGrad.dot( dOffset );

    var xOffsetSq = xOffset * xOffset;
    var yOffsetSq = yOffset * yOffset;

    var xParam = 3 * xOffsetSq - 2 * xOffsetSq * xOffset;
    var yParam = 3 * yOffsetSq - 2 * yOffsetSq * yOffset;

    var abContrib = ( 1 - xParam ) * aContrib + xParam * bContrib;
    var dcContrib = ( 1 - xParam ) * dContrib + xParam * cContrib;


    return ( 1 - yParam ) * abContrib + yParam * dcContrib;
};
