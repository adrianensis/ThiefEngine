var Thief = function() {

};

Thief.engine = null;
Thief.currentScene = null;

Thief.init = function () {
  Thief.engine = new Engine();
  Thief.engine.init();
};

Thief.empty = function () {
  var obj = new GameObject();

  var transform = new Transform();
  obj.addComponent(transform);

  return obj;
};

Thief.setClearColor = function (color) {
  Thief.engine.setClearColor(color);
};

Thief.enablePhysics = function () {
  Thief.engine.enablePhysics();
};

Thief.disablePhysics = function () {
  Thief.engine.disablePhysics();
};

Thief.run = function () {
  Thief.engine.run();
};

Thief.createScene = function (name) {
  Thief.currentScene = new Scene(name);
  Thief.engine.addScene(this.currentScene);
};

Thief.setScene = function (name) {
  Thief.engine.setCurrentScene(name);
};

Thief.getScene = function () {
  return Thief.engine.getCurrentScene();
};

Thief.createAndSetScene = function (name) {
  Thief.createScene(name);
  Thief.setScene(name);
};

Thief.addGameObjectToScene = function (obj) {
  Thief.currentScene.addObject(obj);
};

/**
 * #######################################################################
 * Camera Builder
 * #######################################################################
 */
Thief.cameraBuilder = function () {
  this.tmpObj = null;
  this.cam = null;
};

Thief.cameraBuilder.begin = function () {
  this.tmpObj = Thief.empty();

  return this;
};

Thief.cameraBuilder.setOrtho = function (w,h,far,near) {

  // TODO: implement zoom into OrthoCamera class.
  this.cam = new OrthoCamera(-w,w,-h,h, far,near);
  this.tmpObj.addComponent(this.cam);

  return this;
};

Thief.cameraBuilder.setPerspective = function (far,near,aspect,fov) {

  this.cam = new PerspectiveCamera(far,near,aspect,fov);
  this.tmpObj.addComponent(this.cam);

  return this;
};

Thief.cameraBuilder.setPosition = function (pos) {
  this.tmpObj.getComponent(Transform).translate(pos);

  return this;
};

Thief.cameraBuilder.addScript = function (script) {
  this.tmpObj.addComponent(script);

  return this;
};

Thief.cameraBuilder.end = function () {

  var renderContext = new RenderContext();

  renderContext.setCamera(this.cam);

  Thief.getScene().setRenderContext(renderContext);

  Thief.addGameObjectToScene(this.tmpObj);

  return this.tmpObj;
};



/**
 * #######################################################################
 * Sprite Builder
 * #######################################################################
 */
Thief.spriteBuilder = function () {
  this.tmpObj = null;
  this.tmpSize = 0;
};

Thief.spriteBuilder.begin = function (textureName, pos, size, isStatic) {

  this.tmpObj = Thief.empty();
  this.tmpSize = size;

  this.tmpObj.setStatic(isStatic);

  var renderer = new SpriteRenderer();

  var material = new Material();

  this.tmpObj.addComponent(renderer);

  var transform = this.tmpObj.getComponent(Transform);

  transform.translate(pos);
  transform.setScale(new Vector2(size,size));

  material.setTexture(Loader.loadTexture(textureName));

  renderer.setMaterial(material);

  return this;
};


/**
 * horizontalDir: -1 -> left, 1 -> right, 0 -> not move
 * verticalDir: -1 -> down, 1 -> up, 0 -> not move
 */
Thief.spriteBuilder.addAnimation = function (name, frameCount, horizontal, reverse, startPosition, width, height, speed) {

  var animation = Animation.create(frameCount, horizontal, reverse, startPosition, width, height, speed);

  this.tmpObj.getComponent(SpriteRenderer).addAnimation(name,animation);

  return this;
};

Thief.spriteBuilder.setAnimation = function (name) {

  this.tmpObj.getComponent(SpriteRenderer).setAnimation(name);
  return this;
};

Thief.spriteBuilder.setStatic = function (isStatic) {

  this.tmpObj.setStatic(isStatic);
  return this;
};

Thief.spriteBuilder.setAlphaColor = function (color) {

  this.tmpObj.getComponent(SpriteRenderer).setAlphaColor(color);
  return this;
};

Thief.spriteBuilder.setTextureRegion = function (texCoord, width, height) {

  this.tmpObj.getComponent(SpriteRenderer).setRegion(texCoord, width, height);
  return this;
};

Thief.spriteBuilder.setCollider = function (colliderClass) {

  var rigidBody = new RigidBody();
  var collider = null;

  if(colliderClass === AABBCollider)
    collider = new AABBCollider(this.tmpSize,this.tmpSize);
  else if(colliderClass === CircleCollider)
    collider = new CircleCollider(this.tmpSize/2);

  this.tmpObj.addComponent(rigidBody);
  this.tmpObj.addComponent(collider);

  return this;
};

Thief.spriteBuilder.addScript = function (script) {

  this.tmpObj.addComponent(script);

  return this;
};

Thief.spriteBuilder.end = function () {
  // return this.tmpObj;

  Thief.addGameObjectToScene(this.tmpObj);

  return this.tmpObj;
};
