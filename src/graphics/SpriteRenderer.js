/**
* @class
* @extends {MeshRenderer}
* @classdesc This class renders a sprite, and manages the animations.
*/
var SpriteRenderer = function (){
  MeshRenderer.call(this);
  this.setMesh(SpriteRenderer.rectangleMesh); // All sprites share the same mesh.
};

SpriteRenderer.rectangleMesh = new RectangleMesh();

SpriteRenderer.prototype = new MeshRenderer();
SpriteRenderer.prototype.constructor = SpriteRenderer;

//----------------------------------------------------------------------
