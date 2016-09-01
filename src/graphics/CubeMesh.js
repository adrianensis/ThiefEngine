var CubeMesh = function () {
  Mesh.call(this, 24);

  var w = 1/2.0;
  var h = 1/2.0;
  var d = 1/2.0;

  // Vertices
  // Front Face
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(-w, -h, d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(w, -h, d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(w, h, d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(-w, h, d, 1));

  // Back face
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(-w, -h, -d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(-w, h, -d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(w, h, -d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(w, -h, -d, 1));

  // Top face
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(-w, h, -d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(-w, h, d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(w, h, d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(w, h, -d, 1));

  // Bottom face
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(-w, -h, -d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(w, -h, -d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(w, -h, d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(-w, -h, d, 1));

  // Right face
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(w, -h, -d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(w, h, -d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(w, h, d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(w, -h, d, 1));

  // Left face
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(-w, -h, -d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(-w, -h, d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(-w, h, d, 1));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addVertex.call(this, new Vector4(-w, h, -d, 1));

  // TexCoords
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,0.0, 1.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,0.0, 0.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,1.0, 0.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,1.0, 1.0);

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

  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,0.0, 1.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,0.0, 0.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,1.0, 0.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,1.0, 1.0);

  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,1.0, 1.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,0.0, 1.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,0.0, 0.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,1.0, 0.0);

  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,1.0, 0.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,1.0, 1.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,0.0, 1.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,0.0, 0.0);

  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,0.0, 0.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,1.0, 0.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,1.0, 1.0);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addTexCoord.call(this,0.0, 1.0);

  // Normals

  // Front face
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));

  // Back face
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));

  // Top face
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));

  // Bottom face
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));

  // Right face
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));

  // Left face
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));




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
Mesh.prototype.addFace.call(this,0,2,3);

  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addFace.call(this,4,  5,  6);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addFace.call(this,4,  6,  7);

  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addFace.call(this,8,  9,  10);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addFace.call(this,8,  10, 11);

  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addFace.call(this,12, 13, 14);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addFace.call(this,12, 14, 15);

  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addFace.call(this,16, 17, 18);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addFace.call(this,16, 18, 19);

  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addFace.call(this, 20, 21, 22);
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Mesh.prototype.addFace.call(this, 20, 22, 23);
};

CubeMesh.prototype = new Mesh();
/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
CubeMesh.prototype.constructor = CubeMesh;
