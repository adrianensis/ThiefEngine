/**
* @class
* @classdesc This class represents a mesh.
* @param {Number} numVertices The number of vertices.
*/
var Mesh = function (numVertices) {

    this.numVertices = numVertices;
    // var size = numVertices*4;

    this.vertices = [];
    this.normals = [];
    this.faces = [];
    this.texCoord = [];

    this.vIndex = 0; // Vertices index
    this.nIndex = 0; // Normals index
    this.fIndex = 0; // Face index
    this.txIndex = 0; // TexCoord index

    this.max = new Vector3(0,0,0); // store the max width, height, depth;

};

//----------------------------------------------------------------------

/**
* Adds a new vertex.
* @param {Vector3} vec The vertex.
*/
Mesh.prototype.addVertex = function (vec) {
    this.vertices[this.vIndex] = vec.x; this.vIndex++;
    this.vertices[this.vIndex] = vec.y; this.vIndex++;
    this.vertices[this.vIndex] = vec.z; this.vIndex++;
    this.vertices[this.vIndex] = vec.w; this.vIndex++;


    // find the max width, height, depth;

    var x = Math.abs(vec.x)*2; // width
    var y = Math.abs(vec.y)*2; // height
    var z = Math.abs(vec.z)*2; // depth

    if(x > this.max.x)
        this.max.x = x;

    if(y > this.max.y)
        this.max.y = y;

    if(z > this.max.z)
        this.max.z = z;

};

//----------------------------------------------------------------------

/**
* Adds a new normal.
* @param {Vector3} vec The normal.
*/
Mesh.prototype.addNormal = function (vec) {
    this.normals[this.nIndex] = vec.x; this.nIndex++;
    this.normals[this.nIndex] = vec.y; this.nIndex++;
    this.normals[this.nIndex] = vec.z; this.nIndex++;
    this.normals[this.nIndex] = vec.w; this.nIndex++;
};

//----------------------------------------------------------------------

/**
* Adds a new face. A face (triangle) is composed by three indices (integers).
* @param {Number} v1 The 1st index of the face.
* @param {Number} v2 The 2nd index of the face.
* @param {Number} v3 The 3rd index of the face.
*/
Mesh.prototype.addFace = function (v1,v2,v3) {
    this.faces[this.fIndex] = v1; this.fIndex++;
    this.faces[this.fIndex] = v2; this.fIndex++;
    this.faces[this.fIndex] = v3; this.fIndex++;
};

//----------------------------------------------------------------------

/**
* Adds a new coordinate texture.
* @param {Number} u The u coordinate.
* @param {Number} v The v coordinate.
*/
Mesh.prototype.addTexCoord = function (u,v) {
    this.texCoord[this.txIndex] = u; this.txIndex++;
    this.texCoord[this.txIndex] = v; this.txIndex++;
};

//----------------------------------------------------------------------

/**
* Returns a vertex by index.
* @param {Number} index The index of the vertex.
* @returns {Vector3} The vertex.
*/
Mesh.prototype.getVertex = function (index) {
    return new Vector4(this.vertices[(index*4)],this.vertices[(index*4)+1],
        this.vertices[(index*4)+2],this.vertices[(index*4)+3]);
};

//----------------------------------------------------------------------


// Mesh.prototype.setVertex = function (index,vec) {
//     this.vertices[(index*4)] = vec.x;
//     this.vertices[(index*4)+1] = vec.y;
//     this.vertices[(index*4)+2] = vec.z;
//     this.vertices[(index*4)+3] = vec.w;
// };

//----------------------------------------------------------------------

/**
* Returns the number of vertices.
* @returns {Number} The number of vertices.
*/
Mesh.prototype.getNumVertices = function () {
    return this.vertices.length/4;
};

//----------------------------------------------------------------------

/**
* Returns the number of faces.
* @returns {Number} The number of faces.
*/
Mesh.prototype.getNumFaces = function () {
    return this.faces.length/3;
};

//----------------------------------------------------------------------

/**
* Returns the vertices data.
* @returns {Array} The vertices data.
*/
Mesh.prototype.getVerticesData = function () {
    return this.vertices;
};

//----------------------------------------------------------------------

/**
* Returns the normals data.
* @returns {Array} The normals data.
*/
Mesh.prototype.getNormalsData = function () {
    return this.normals;
};

//----------------------------------------------------------------------


/**
* Returns the faces data.
* @returns {Array} The faces data.
*/
Mesh.prototype.getFacesData = function () {
    return this.faces;
};

//----------------------------------------------------------------------

/**
* Returns the coordinates texture data.
* @returns {Array} The coordinates texture data.
*/
Mesh.prototype.getTexCoordData = function () {
    return this.texCoord;
};

//----------------------------------------------------------------------

/**
* Returns a vector with the max value of width, height and depth.
* @returns {Vector3} The max vector.
*/
Mesh.prototype.getMax = function () {
    return this.max.cpy();
};

//----------------------------------------------------------------------

// Mesh.prototype.print = function () {
//     var str = "";
//     for (var i = 0; i < (this.numVertices*4); i++) {
//         str += this.vertices[i] + "\n";
//     }
//
//     console.log(str);
// };

//----------------------------------------------------------------------
