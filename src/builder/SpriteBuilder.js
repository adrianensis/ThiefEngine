var SpriteBuilder = function (){
  GameObjectBuilder.call(this);
};

SpriteBuilder.prototype = new GameObjectBuilder();
/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
SpriteBuilder.prototype.constructor = SpriteBuilder;

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
SpriteBuilder.prototype.begin = function (textureName) {
  /**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
GameObjectBuilder.prototype.begin.call(this);

  this.setRenderer(new SpriteRenderer());

  var material = new Material();
  if(textureName !== null && textureName !== "")
    material.setTexture(Loader.loadTexture(textureName));

  this.setMaterial(material);

  return this;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
SpriteBuilder.prototype.setSize = function (size) {
  this.setScale(new Vector2(size,size));
  return this;
};

//----------------------------------------------------------------------
