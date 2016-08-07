var SpriteBuilder = function (){
  GameObjectBuilder.call(this);
};

SpriteBuilder.prototype = new GameObjectBuilder();
SpriteBuilder.prototype.constructor = SpriteBuilder;

//----------------------------------------------------------------------

SpriteBuilder.prototype.begin = function (textureName) {
  GameObjectBuilder.prototype.begin.call(this);

  this.setRenderer(new SpriteRenderer());

  var material = new Material();
  material.setTexture(Loader.loadTexture(textureName));

  this.setMaterial(material);

  return this;
};

//----------------------------------------------------------------------

SpriteBuilder.prototype.setSize = function (size) {
  this.setScale(new Vector2(size,size));
  return this;
};

//----------------------------------------------------------------------
