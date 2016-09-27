/**
* @class
* @extends {Mesh}
* @classdesc This class represents a cube mesh.
*/
var CubeMesh = function () {
  Mesh.call(this, 24);

  var w = 1/2.0;
  var h = 1/2.0;
  var d = 1/2.0;

  // Vertices
  // Front Face
Mesh.prototype.addVertex.call(this, new Vector4(-w, -h, d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(w, -h, d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(w, h, d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(-w, h, d, 1));

  // Back face
Mesh.prototype.addVertex.call(this, new Vector4(-w, -h, -d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(-w, h, -d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(w, h, -d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(w, -h, -d, 1));

  // Top face
Mesh.prototype.addVertex.call(this, new Vector4(-w, h, -d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(-w, h, d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(w, h, d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(w, h, -d, 1));

  // Bottom face
Mesh.prototype.addVertex.call(this, new Vector4(-w, -h, -d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(w, -h, -d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(w, -h, d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(-w, -h, d, 1));

  // Right face
Mesh.prototype.addVertex.call(this, new Vector4(w, -h, -d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(w, h, -d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(w, h, d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(w, -h, d, 1));

  // Left face
Mesh.prototype.addVertex.call(this, new Vector4(-w, -h, -d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(-w, -h, d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(-w, h, d, 1));
Mesh.prototype.addVertex.call(this, new Vector4(-w, h, -d, 1));

  // TexCoords
Mesh.prototype.addTexCoord.call(this,0.0, 1.0);
Mesh.prototype.addTexCoord.call(this,0.0, 0.0);
Mesh.prototype.addTexCoord.call(this,1.0, 0.0);
Mesh.prototype.addTexCoord.call(this,1.0, 1.0);

Mesh.prototype.addTexCoord.call(this,0,0);
Mesh.prototype.addTexCoord.call(this,1,0);
Mesh.prototype.addTexCoord.call(this,1,1);
Mesh.prototype.addTexCoord.call(this,0,1);

Mesh.prototype.addTexCoord.call(this,0.0, 1.0);
Mesh.prototype.addTexCoord.call(this,0.0, 0.0);
Mesh.prototype.addTexCoord.call(this,1.0, 0.0);
Mesh.prototype.addTexCoord.call(this,1.0, 1.0);

Mesh.prototype.addTexCoord.call(this,1.0, 1.0);
Mesh.prototype.addTexCoord.call(this,0.0, 1.0);
Mesh.prototype.addTexCoord.call(this,0.0, 0.0);
Mesh.prototype.addTexCoord.call(this,1.0, 0.0);

Mesh.prototype.addTexCoord.call(this,1.0, 0.0);
Mesh.prototype.addTexCoord.call(this,1.0, 1.0);
Mesh.prototype.addTexCoord.call(this,0.0, 1.0);
Mesh.prototype.addTexCoord.call(this,0.0, 0.0);

Mesh.prototype.addTexCoord.call(this,0.0, 0.0);
Mesh.prototype.addTexCoord.call(this,1.0, 0.0);
Mesh.prototype.addTexCoord.call(this,1.0, 1.0);
Mesh.prototype.addTexCoord.call(this,0.0, 1.0);

  // Normals

  // Front face
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));

  // Back face
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));
Mesh.prototype.addNormal.call(this,new Vector4(0,0,1,0));

  // Top face
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));

  // Bottom face
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));
Mesh.prototype.addNormal.call(this,new Vector4(0,1,0,0));

  // Right face
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));

  // Left face
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));
Mesh.prototype.addNormal.call(this,new Vector4(1,0,0,0));




  // Faces

Mesh.prototype.addFace.call(this,0,1,2);
Mesh.prototype.addFace.call(this,0,2,3);

Mesh.prototype.addFace.call(this,4,  5,  6);
Mesh.prototype.addFace.call(this,4,  6,  7);

Mesh.prototype.addFace.call(this,8,  9,  10);
Mesh.prototype.addFace.call(this,8,  10, 11);

Mesh.prototype.addFace.call(this,12, 13, 14);
Mesh.prototype.addFace.call(this,12, 14, 15);

Mesh.prototype.addFace.call(this,16, 17, 18);
Mesh.prototype.addFace.call(this,16, 18, 19);

Mesh.prototype.addFace.call(this, 20, 21, 22);
Mesh.prototype.addFace.call(this, 20, 22, 23);
};

CubeMesh.prototype = new Mesh();
CubeMesh.prototype.constructor = CubeMesh;
