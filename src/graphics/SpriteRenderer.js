var SpriteRenderer = function (){
  MeshRenderer.call(this);

  this.setMesh(new RectangleMesh());

  // Animations
  this.animations = [];
  this.animation = null;

};

SpriteRenderer.prototype = new MeshRenderer();
/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
SpriteRenderer.prototype.constructor = SpriteRenderer;

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
SpriteRenderer.prototype.setAnimation = function (name){
	this.animation = this.animations[name];
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
SpriteRenderer.prototype.addAnimation = function (name, animation){
	this.animations[name] = animation;
};

//----------------------------------------------------------------------
