/**
* @class
* @extends {MeshRenderer}
* @classdesc This class renders a sprite, and manages the animations.
*/
var SpriteRenderer = function (){
  MeshRenderer.call(this);

  this.setMesh(new RectangleMesh());

};

SpriteRenderer.prototype = new MeshRenderer();
SpriteRenderer.prototype.constructor = SpriteRenderer;

//----------------------------------------------------------------------
