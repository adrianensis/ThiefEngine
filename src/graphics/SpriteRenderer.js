/**
* @class
* @extends {MeshRenderer}
* @classdesc This class renders a sprite, and manages the animations.
*/
var SpriteRenderer = function (){
  MeshRenderer.call(this);

  this.setMesh(new RectangleMesh());

  // Animations
  this.animations = [];
  this.animation = null;

};

SpriteRenderer.prototype = new MeshRenderer();
SpriteRenderer.prototype.constructor = SpriteRenderer;

//----------------------------------------------------------------------

/**
* Sets the animation, by name.
* @param {String} name The name.
*/
SpriteRenderer.prototype.setAnimation = function (name){
	this.animation = this.animations[name];
};

//----------------------------------------------------------------------

/**
* Adds an animation, by name.
* @param {String} name The name.
* @param {Animation} animation The animation.
*/
SpriteRenderer.prototype.addAnimation = function (name, animation){
	this.animations[name] = animation;
};

//----------------------------------------------------------------------
