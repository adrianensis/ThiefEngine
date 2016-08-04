var SpriteRenderer = function (){
  MeshRenderer.call(this);

  this.setMesh(new RectangleMesh());

  // Animations
  this.animations = [];
  this.animation = null;

};

SpriteRenderer.prototype = new MeshRenderer();
SpriteRenderer.prototype.constructor = SpriteRenderer;

SpriteRenderer.prototype.setAnimation = function (name){
	this.animation = this.animations[name];
};

SpriteRenderer.prototype.addAnimation = function (name, animation){
	this.animations[name] = animation;
};
