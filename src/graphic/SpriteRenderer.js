var SpriteRenderer = function (){
  MeshRenderer.call(this);

  this.setMesh(new RectangleMesh());

  // Animations
  this.animations = [];
  this.animation = null;

  // texture region
  this.regionPosition = new Vector2(0.0,0.0);
  this.regionWidth = 1.0;
  this.regionHeight = 1.0;

  // alpha color
  this.alphaColor = new Color(-1,-1,-1,-1);
};

SpriteRenderer.prototype = new MeshRenderer();
SpriteRenderer.prototype.constructor = SpriteRenderer;

SpriteRenderer.prototype.setRegion = function (pos, width, height){
  this.regionPosition = pos;
  this.regionWidth = width;
  this.regionHeight = height;
};

SpriteRenderer.prototype.getRegionPosition = function (){
	return this.regionPosition;
};

SpriteRenderer.prototype.getRegionWidth = function (){
	return this.regionWidth;
};

SpriteRenderer.prototype.getRegionHeight = function (){
	return this.regionHeight;
};

SpriteRenderer.prototype.setAnimation = function (name){
	this.animation = this.animations[name];
};

SpriteRenderer.prototype.addAnimation = function (name, animation){
	this.animations[name] = animation;
};

SpriteRenderer.prototype.getAlphaColor = function (){
	return this.alphaColor;
};

SpriteRenderer.prototype.setAlphaColor = function (color){
	this.alphaColor = color;
};

SpriteRenderer.prototype.updateMaterial = function (material){
  if(material.getTexture() !== null){


    var shader = material.getShader();

    shader.addFloatVector(this.alphaColor.toArray(),"alphacolor");

    shader.addFloat(this.getRegionPosition().x, "regionX");
    shader.addFloat(this.getRegionPosition().y, "regionY");
    shader.addFloat(this.getRegionWidth(), "regionWidth");
    shader.addFloat(this.getRegionHeight(), "regionHeight");

    if(this.animation !== null){
      var frame = this.animation.getNextFrame();

      shader.addFloat(frame.getPosition().x, "animationX");
    	shader.addFloat(frame.getPosition().y, "animationY");
    	shader.addFloat(frame.getWidth(), "animationWidth");
    	shader.addFloat(frame.getHeight(), "animationHeight");
    }


  }
};
