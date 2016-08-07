// Class definition goes here.
var Matrix4 = function (row0,row1,row2,row3){
    this.data = new Array(16);
    this.transposed = null;
    this.set(row0, row1, row2, row3);
};

//----------------------------------------------------------------------

// Method definition goes here.
Matrix4.prototype.getData = function (){
	return this.data;
};

//----------------------------------------------------------------------

// Method definition goes here.
Matrix4.prototype.setData = function (data){
	this.data=data;
};

//----------------------------------------------------------------------

Matrix4.prototype.get = function (row,col){
	return this.data[col+(4*row)];
};

//----------------------------------------------------------------------

// Method definition goes here.
Matrix4.prototype.set = function (row0,row1,row2,row3){
    var rows = new Array(4);
    rows[0] = row0.toArray();
    rows[1] = row1.toArray();
    rows[2] = row2.toArray();
    rows[3] = row3.toArray();

    for (var row = 0; row < 4; row++)
        for (var col = 0; col < 4; col++)
            this.data[col+(4*row)] = rows[row][col];
};

//----------------------------------------------------------------------

Matrix4.prototype.transpose = function () {

    // REMEMBER
    // WebGL uses column-major ordering (transposed)
    // a webGL matrix : [ [column 0] [column 1] [column 2] [column 3] ]

    /*
        ROW-MAJOR ORDERING:

        row 0 | a b c d |
        row 1 | e f g h |
        row 2 | i j k l |
        row 3 | m n o p |

        COLUMN-MAJOR ORDERING:

        column 0 | a e i m |
        column 1 | b f j n |
        column 2 | c g k o |
        column 3 | d h l p |

    */

    if(this.transposed === null){
        var transposedData = new Array(16);

        for (var col = 0; col < 4; col++)
            for (var row = 0; row < 4; row++)
                transposedData[row+(4*col)] = this.data[col+(4*row)] ; //= rows[row][col];

        // this.data = t;

        this.transposed = Matrix4.zeros();
        this.transposed.setData(transposedData);
    }

    return this.transposed;
};

//----------------------------------------------------------------------

// Method definition goes here.
Matrix4.mulMM = function (M1,M2){

    // The result matrix
    var result = this.zeros();

    var resultTempValue=0;

    // Matrix 1 row
    for (var rowM1 = 0; rowM1 < 4; rowM1++) {
        // Matrix 2 column
        for (var colM2 = 0; colM2 < 4; colM2++) {
            // Result matrix column
            for (var colM1 = 0; colM1 < 4; colM1++){
                // M1 by rows, M2 by columns (REMEMBER, WebGL matrices are transposed!)
                resultTempValue += M1.data[rowM1+(4*colM1)] * M2.data[colM1+(4*colM2)];
            }

            result.data[rowM1+colM2*4]=resultTempValue;
            resultTempValue=0;
        }
    }

    return result;
};

//----------------------------------------------------------------------

// Method definition goes here.
Matrix4.mulMV = function (M,v){

    var vec = v.toArray();

    // console.log(vec);

    // The result vector
    var result = new Array(4);


    for (var row = 0; row < 4; row++){
        result[row] = 0;
        for (var col = 0; col < 4; col++)
            result[row] += M.data[row+(4*col)] * vec[col];
    }

    var vectorResult = new Vector4(0,0,0,0);
    vectorResult.fromArray(result);

    // console.log(result);

    return vectorResult;

};

//----------------------------------------------------------------------

Matrix4.zeros = function(){
    return new Matrix4(
        new Vector4(0.0,0.0,0.0,0.0),
        new Vector4(0.0,0.0,0.0,0.0),
        new Vector4(0.0,0.0,0.0,0.0),
        new Vector4(0.0,0.0,0.0,0.0));
};

//----------------------------------------------------------------------

Matrix4.identity = function(){
    return new Matrix4(
        new Vector4(1,0,0,0),
        new Vector4(0,1,0,0),
        new Vector4(0,0,1,0),
        new Vector4(0,0,0,1));
};

//----------------------------------------------------------------------

Matrix4.translation = function(vec){
    return new Matrix4(
        new Vector4(1,0,0,vec.x),
        new Vector4(0,1,0,vec.y),
        new Vector4(0,0,1,vec.z),
        new Vector4(0,0,0,1));
};

//----------------------------------------------------------------------

// where vec is axis of rotation (e.g. 0 1 0)
Matrix4.rotation = function(vec){
    var result = Matrix4.identity();

    if(vec.x !== 0){
        var rad = vec.x*(Math.PI/180);
        result = new Matrix4(
            new Vector4(1,0,0,0),
            new Vector4(0,Math.cos(rad),-Math.sin(rad),0),
            new Vector4(0,Math.sin(rad),Math.cos(rad),0),
            new Vector4(0,0,0,1));
    }else if(vec.y !== 0){
        var rad = vec.y*(Math.PI/180);
        result = new Matrix4(
            new Vector4(Math.cos(rad),0,Math.sin(rad),0),
            new Vector4(0,1,0,0),
            new Vector4(-Math.sin(rad),0,Math.cos(rad),0),
            new Vector4(0,0,0,1));
    }else if(vec.z !== 0){
        var rad = vec.z*(Math.PI/180);
        result = new Matrix4(
            new Vector4(Math.cos(rad),-Math.sin(rad),0,0),
            new Vector4(Math.sin(rad),Math.cos(rad),0,0),
            new Vector4(0,0,1,0),
            new Vector4(0,0,0,1));
    }

    return result;
};

//----------------------------------------------------------------------

// x,y,z are scalign factors
Matrix4.scale = function(vec){
    return new Matrix4(
        new Vector4(vec.x,0,0,0),
        new Vector4(0,vec.y,0,0),
        new Vector4(0,0,vec.z,0),
        new Vector4(0,0,0,1));
};

//----------------------------------------------------------------------

Matrix4.ortho = function(left, right, bottom, top, near, far){
    return new Matrix4(
        new Vector4(2.0/(right-left),0.0,0.0,-((right+left)/(right-left))),
        new Vector4(0.0,2.0/(top-bottom),0.0,-((top+bottom)/(top-bottom))),
        new Vector4(0.0,0.0,(-2.0/(far-near)),-((far+near)/(far-near))),
        new Vector4(0.0,0.0,0.0,1.0));
};

//----------------------------------------------------------------------

Matrix4.perspective = function(near, far, aspect, fov){

    var top = near * Math.tan((Math.PI/180)*(fov/2));
    var bottom = -top;
    var right = top*aspect;
    var left = -right;

    return new Matrix4(
        new Vector4(((2*near)/(right-left)),0,((right+left)/(right-left)),0),
        new Vector4(0,((2*near)/(top-bottom)),((top+bottom)/(top-bottom)),0),
        new Vector4(0,0,((far+near)/(far-near)),0),
        new Vector4(0,0,-1,0));
};

//----------------------------------------------------------------------

// Up probably is (0,1,0) or (0,-1,0) for upside-down
// Matrix4.camera = function(camPos, camTarget, camUp){
//
// };

Matrix4.prototype.print = function () {
    string = "";
    for (var row = 0; row < 4; row++){
        for (var col = 0; col < 4; col++){
            string += this.data[row+(4*col)] + " ";
        }
        string += "\n";
    }

    console.log(string);
};
