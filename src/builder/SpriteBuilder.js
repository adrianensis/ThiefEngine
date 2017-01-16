var SpriteBuilder = function (){
  GameObjectBuilder.call(this);
};

SpriteBuilder.prototype = new GameObjectBuilder();
SpriteBuilder.prototype.constructor = SpriteBuilder;

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
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
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
SpriteBuilder.prototype.setTexture = function (textureName) {

  var material = this.tmpObj.getComponent(MeshRenderer).getMaterial();

  if(material !== null && textureName !== null && textureName !== "")
    material.setTexture(Loader.loadTexture(textureName));

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

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
SpriteBuilder.prototype.create = function (textureName,pos,width,height) {

    return this.begin().
		setTexture(textureName).
    setPosition(pos).
    setScale(new Vector2(width,height));

};

//----------------------------------------------------------------------
