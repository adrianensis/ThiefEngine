var RectangleMesh = function () {
  Mesh.call(this, 4);

  this.width = 1;
  this.height = 1;

  var w = (this.width/2.0);
  var h = (this.height/2.0);


  // Vertices
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this,new Vector4(-w, -h, 0, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this,new Vector4(w, -h, 0, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this,new Vector4(w, h, 0, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this,new Vector4(-w, h, 0, 1));

  // TexCoords
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,0,0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,1,0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,1,1);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,0,1);

  // Faces
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addFace.call(this,0,1,2);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addFace.call(this,2,3,0);

};

RectangleMesh.prototype = new Mesh();
/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
RectangleMesh.prototype.constructor = RectangleMesh;

//----------------------------------------------------------------------
