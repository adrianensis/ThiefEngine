var RectangleMesh = function () {
  Mesh.call(this, 4);

  this.width = 1;
  this.height = 1;

  var w = (this.width/2.0);
  var h = (this.height/2.0);


  // Vertices
  Mesh.prototype.addVertex.call(this,new Vector4(-w, -h, 0, 1));
  Mesh.prototype.addVertex.call(this,new Vector4(w, -h, 0, 1));
  Mesh.prototype.addVertex.call(this,new Vector4(w, h, 0, 1));
  Mesh.prototype.addVertex.call(this,new Vector4(-w, h, 0, 1));

  // TexCoords
  Mesh.prototype.addTexCoord.call(this,0,0);
  Mesh.prototype.addTexCoord.call(this,1,0);
  Mesh.prototype.addTexCoord.call(this,1,1);
  Mesh.prototype.addTexCoord.call(this,0,1);

  // Faces
  Mesh.prototype.addFace.call(this,0,1,2);
  Mesh.prototype.addFace.call(this,2,3,0);

};

RectangleMesh.prototype = new Mesh();
RectangleMesh.prototype.constructor = RectangleMesh;

//----------------------------------------------------------------------
