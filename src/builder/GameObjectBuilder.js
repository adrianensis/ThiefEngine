/**
* @class
* @classdesc This class is a game object builder.
*/
var GameObjectBuilder = function (){
  this.tmpObj = null;
};

//----------------------------------------------------------------------

/**
* Return an empty game object that just contains its Transform.
* @returns {GameObject} The game object.
*/
GameObjectBuilder.empty = function () {
  var obj = new GameObject();

  var transform = new Transform();
  obj.addComponent(transform);

  return obj;
};

//----------------------------------------------------------------------

/**
* Create an empty game object.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.begin = function () {
  this.tmpObj = GameObjectBuilder.empty();
  return this;
};

//----------------------------------------------------------------------

/**
* Set the name.
* @param {String} name The name.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setName = function (name){
  this.tmpObj.setName(name);
  return this;
};


//----------------------------------------------------------------------

/**
* Set if is static.
* @param {Boolean} isStatic True if is static.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setStatic = function (isStatic){
 this.tmpObj.setStatic(isStatic);
 return this;
};


//----------------------------------------------------------------------

/**
* Set the position.
* @param {Vector2} position The position.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setPosition = function (position){
  this.tmpObj.getTransform().setPosition(position);
  return this;
};

//----------------------------------------------------------------------

/**
* Set the rotation.
* @param {Vector2} vec The vector.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setRotation = function (vec){
  this.tmpObj.getTransform().setRotation(vec);
  return this;
};

//----------------------------------------------------------------------

/**
* Set the scale.
* @param {Vector2} vec The vector.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setScale = function (vec){
  this.tmpObj.getTransform().setScale(vec);
  return this;
};

//----------------------------------------------------------------------

/**
* Set the physic properties.
* @param {Number} density The density.
* @param {Number} friction The friction.
* @param {Number} restitution The restitution.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setRigidBody = function (density, friction, restitution){
  var rigidBody = new RigidBody(density, friction, restitution);
  this.tmpObj.addComponent(rigidBody);
  return this;
};

//----------------------------------------------------------------------

/**
* Set the collider.
* @param {Collider} collider The collider.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setCollider = function (collider){
  this.tmpObj.addComponent(collider);
  return this;
};

//----------------------------------------------------------------------

/**
* Set the renderer.
* @param {MeshRenderer} renderer The renderer.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setRenderer = function (renderer) {
  this.tmpObj.addComponent(renderer);
  return this;
};

//----------------------------------------------------------------------

/**
* Set the mesh.
* @param {Mesh} mesh The mesh.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setMesh = function (mesh) {
  this.tmpObj.getComponent(MeshRenderer).setMesh(mesh);
  return this;
};

//----------------------------------------------------------------------

/**
* Set the layer.
* @param {Number} layer The layer.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setLayer = function (layer) {
  this.tmpObj.getComponent(MeshRenderer).setLayer(layer);
  return this;
};

//----------------------------------------------------------------------

/**
* Set the material.
* @param {Material} material The material.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setMaterial = function (material) {
  this.tmpObj.getComponent(MeshRenderer).setMaterial(material);
  return this;
};

//----------------------------------------------------------------------

/**
* Set the color.
* @param {Color} color The color.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setColor = function (color) {
  this.tmpObj.getComponent(MeshRenderer).getMaterial().setColor(color);
  return this;
};

//----------------------------------------------------------------------

/**
* Set the alpha color.
* @param {Color} color The color.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setAlphaColor = function (color) {
  this.tmpObj.getComponent(MeshRenderer).setAlphaColor(color);
  return this;
};

//----------------------------------------------------------------------

/**
* Set the texture region.
* @param {Vector2} texCoord The texCoord.
* @param {Number} width The width.
* @param {Number} height The height.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setTextureRegion = function (texCoord, width, height) {
  this.tmpObj.getComponent(MeshRenderer).setRegion(texCoord, width, height);
  return this;
};

//----------------------------------------------------------------------

/**
* Add an animation.
* @param {String} name The name.
* @param {Number} frameCount The frameCount.
* @param {Number} horizontal The horizontal.
* @param {Number} reverse The reverse.
* @param {Vector2} startPosition The startPosition.
* @param {Number} width The width.
* @param {Number} height The height.
* @param {Number} speed The speed.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.addAnimation = function (name, frameCount, horizontal, reverse, startPosition, width, height, speed) {

  var animation = Animation.create(frameCount, horizontal, reverse, startPosition, width, height, speed);

  this.tmpObj.getComponent(MeshRenderer).addAnimation(name,animation);

  return this;
};

//----------------------------------------------------------------------

/**
* Set the name.
* @param {String} name The name.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.setAnimation = function (name) {

  this.tmpObj.getComponent(MeshRenderer).setAnimation(name);
  return this;
};

//----------------------------------------------------------------------

/**
* Set the script.
* @param {Script} script The script.
* @returns {GameObjectBuilder} this.
*/
GameObjectBuilder.prototype.addScript = function (script) {
  this.tmpObj.addComponent(script);
  return this;
};

//----------------------------------------------------------------------

/**
* Return the game object.
* @returns {GameObject} The game object.
*/
GameObjectBuilder.prototype.end = function () {
  return this.tmpObj;
};

//----------------------------------------------------------------------
