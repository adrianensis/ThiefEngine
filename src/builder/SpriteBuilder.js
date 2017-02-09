/**
* @class
* @classdesc This class is a sprite builder.
* @extends {GameObjectBuilder}
*/
var SpriteBuilder = function (){
  GameObjectBuilder.call(this);
};

SpriteBuilder.prototype = new GameObjectBuilder();
SpriteBuilder.prototype.constructor = SpriteBuilder;

//----------------------------------------------------------------------


SpriteBuilder.prototype.begin = function () {
  GameObjectBuilder.prototype.begin.call(this);

  this.setRenderer(new SpriteRenderer());

  var material = new Material();
  material.setColor(Color.NONE);
  this.setMaterial(material);

  return this;
};

//----------------------------------------------------------------------

/**
* Set the texture.
* @param {String} textureName The texture.
* @returns {SpriteBuilder} this.
*/
SpriteBuilder.prototype.setTexture = function (textureName) {

  var material = this.tmpObj.getComponent(MeshRenderer).getMaterial();

  if(material !== null && textureName !== null && textureName !== "")
    material.setTexture(Loader.loadTexture(textureName));

  return this;
};

//----------------------------------------------------------------------


/**
* Set the size of the sprite.
* @param {Number} size The size.
* @returns {SpriteBuilder} this.
*/
SpriteBuilder.prototype.setSize = function (size) {
  this.setScale(new Vector2(size,size));
  return this;
};

//----------------------------------------------------------------------

/**
* Create a sprite.
* @param {String} textureName The texture.
* @param {Vector2} pos The position.
* @param {Number} width The width.
* @param {Number} height The height.
* @returns {SpriteBuilder} this.
*/
SpriteBuilder.prototype.create = function (textureName,pos,width,height) {

    return this.begin().
		setTexture(textureName).
    setPosition(pos).
    setScale(new Vector2(width,height));

};

//----------------------------------------------------------------------
