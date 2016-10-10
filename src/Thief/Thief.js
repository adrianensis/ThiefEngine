var Thief = function() {

};

Thief.engine = null;
Thief.currentScene = null;

//----------------------------------------------------------------------

Thief.init = function () {
  Thief.engine = new Engine();
  Thief.engine.init();
};

//----------------------------------------------------------------------

Thief.empty = function () {
  var obj = new GameObject();

  var transform = new Transform();
  obj.addComponent(transform);

  return obj;
};

//----------------------------------------------------------------------

Thief.setClearColor = function (color) {
  Thief.engine.setClearColor(color);
};

//----------------------------------------------------------------------

Thief.setGravity = function (gravity) {
  Thief.engine.setGravity(gravity);
};

//----------------------------------------------------------------------

Thief.enablePhysics = function () {
  Thief.engine.enablePhysics();
};

//----------------------------------------------------------------------

Thief.disablePhysics = function () {
  Thief.engine.disablePhysics();
};

//----------------------------------------------------------------------

Thief.run = function () {
  Thief.engine.run();
};

//----------------------------------------------------------------------

Thief.createScene = function (name) {
  Thief.currentScene = new Scene(name);
  Thief.engine.addScene(this.currentScene);
};

//----------------------------------------------------------------------

Thief.setScene = function (name) {
  Thief.engine.setCurrentScene(name);
};

//----------------------------------------------------------------------

Thief.getScene = function () {
  return Thief.engine.getCurrentScene();
};

//----------------------------------------------------------------------

Thief.createAndSetScene = function (name) {
  Thief.createScene(name);
  Thief.setScene(name);
};

//----------------------------------------------------------------------

Thief.setCamera = function (obj) {
  var renderContext = new RenderContext();

  renderContext.setCamera(obj.getComponent(Camera));

  Thief.getScene().setRenderContext(renderContext);

  // Thief.currentScene.addObject(obj);
};

//----------------------------------------------------------------------

Thief.addGameObjectToScene = function (obj) {
  Thief.currentScene.addObject(obj);
};

//----------------------------------------------------------------------
