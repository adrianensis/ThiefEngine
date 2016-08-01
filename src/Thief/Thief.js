var Thief = function() {

};

Thief.engine = null;
Thief.currentScene = null;

Thief.init = function () {
  Thief.engine = new Engine();
  Thief.engine.init();
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

Thief.empty = function () {
  var obj = new GameObject();

  var transform = new Transform();
  obj.addComponent(transform);

  return obj;
};

/**
 * #######################################################################
 * Camera Builder
 * #######################################################################
 */
Thief.camera = function () {
  this.tmpObj = null;
  this.cam = null;
};

Thief.camera.begin = function () {
  this.tmpObj = Thief.empty();

  return this;
};

Thief.camera.setOrtho = function (w,h,far,near) {

  // TODO: implement zoom into OrthoCamera class.
  this.cam = new OrthoCamera(-w,w,-h,h, far,near);
  this.tmpObj.addComponent(this.cam);

  return this;
};

Thief.camera.setPerspective = function (far,near,aspect,fov) {

  this.cam = new PerspectiveCamera(far,near,aspect,fov);
  this.tmpObj.addComponent(this.cam);

  return this;
};

Thief.camera.setPosition = function (pos) {
  this.tmpObj.getComponent(Transform).translate(pos);

  return this;
};

Thief.camera.addScript = function (script) {
  this.tmpObj.addComponent(script);

  return this;
};

Thief.camera.end = function () {

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
Thief.sprite = function () {
  this.tmpObj = null;
  this.tmpSize = 0;
};

Thief.sprite.begin = function (textureName, pos, size, isStatic) {

  this.tmpObj = Thief.empty();
  this.tmpSize = size;

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
Thief.sprite.addAnimation = function (name, frameCount, horizontal, reverse, startPosition, width, height, speed) {

  // TODO: check if coordinates are > 1 or < 0 !!!!!

  var animation = new Animation();
  animation.setSpeed(speed);

  var horizontalDir = 0;
  var verticalDir = 0;

  if(horizontal)
    horizontalDir = 1;
  else
    verticalDir = 1;

  if(reverse){
    horizontalDir *= -1;
    verticalDir *= -1;
  }

  var start = 0;
  var end = frameCount;
  var delta = 1;

  if(reverse){
    start = frameCount-1;
    end = 0;
    delta = -1;
  }

  for (var i = start; i !== end; i+=delta) {

    var pos = new Vector2(0,0);
    pos.add(startPosition);

    if(horizontalDir !== 0)
      pos.x += i*width;

    if(verticalDir !== 0)
      pos.y += i*height;

    var frame = new AnimationFrame();
    frame.set(pos,width,height);
    animation.addFrame(frame);

  }

  this.tmpObj.getComponent(SpriteRenderer).addAnimation(name,animation);

  return this;
};

Thief.sprite.setAnimation = function (name) {

  this.tmpObj.getComponent(SpriteRenderer).setAnimation(name);
  return this;
};

Thief.sprite.setStatic = function (isStatic) {

  this.tmpObj.setStatic(isStatic);
  return this;
};

Thief.sprite.setAlphaColor = function (color) {

  this.tmpObj.getComponent(SpriteRenderer).setAlphaColor(color);
  return this;
};

Thief.sprite.setTextureRegion = function (texCoord, width, height) {

  this.tmpObj.getComponent(SpriteRenderer).setRegion(texCoord, width, height);
  return this;
};

Thief.sprite.setCollider = function (colliderClass) {

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

Thief.sprite.addScript = function (script) {

  this.tmpObj.addComponent(script);

  return this;
};

Thief.sprite.end = function () {
  // return this.tmpObj;

  Thief.addGameObjectToScene(this.tmpObj);

  return this.tmpObj;
};
