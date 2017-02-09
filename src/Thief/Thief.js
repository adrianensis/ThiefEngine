/**
* @class
* @classdesc This class is a facade for the user.
*/
var Thief = function() {

};

Thief.engine = null;
Thief.currentScene = null;

//----------------------------------------------------------------------

/**
* Initialize the engine.
*/
Thief.init = function () {
  Thief.engine = new Engine();
  Thief.engine.init();
};

//----------------------------------------------------------------------

/**
* Return an empty game object that just contains its Transform.
*/
Thief.empty = function () {
  var obj = new GameObject();

  var transform = new Transform();
  obj.addComponent(transform);

  return obj;
};

//----------------------------------------------------------------------

/**
* Set the clear color.
* @param {Color} color The color.
*/
Thief.setClearColor = function (color) {
  Thief.engine.setClearColor(color);
};

//----------------------------------------------------------------------

/**
* Set the gravity.
* @param {Number} gravity The gravity.
*/
Thief.setGravity = function (gravity) {
  Thief.engine.setGravity(gravity);
};

//----------------------------------------------------------------------

/**
* Enable the physics engine.
*/
Thief.enablePhysics = function () {
  Thief.engine.enablePhysics();
};

//----------------------------------------------------------------------

/**
* Disable the physics engine.
*/
Thief.disablePhysics = function () {
  Thief.engine.disablePhysics();
};

//----------------------------------------------------------------------

/**
* Run the engine.
*/
Thief.run = function () {
  Thief.engine.run();
};

//----------------------------------------------------------------------

/**
* Create a new scene.
* @param {String} name The name.
*/
Thief.createScene = function (name) {
  Thief.currentScene = new Scene(name);
  Thief.engine.addScene(this.currentScene);
};

//----------------------------------------------------------------------

/**
* Set a scene.
* @param {String} name The name.
*/
Thief.setScene = function (name) {
  Thief.engine.setCurrentScene(name);
};

//----------------------------------------------------------------------

Thief.getScene = function () {
  return Thief.engine.getCurrentScene();
};

//----------------------------------------------------------------------

/**
* Create and set a new scene.
* @param {String} name The name.
*/
Thief.createAndSetScene = function (name) {
  Thief.createScene(name);
  Thief.setScene(name);
};

//----------------------------------------------------------------------

/**
* Set the camera. Note that, cam is a GameObject not a Camera Component.
* @param {GameObject} cam The camera.
*/
Thief.setCamera = function (cam) {
  var renderContext = new RenderContext();

  renderContext.setCamera(cam.getComponent(Camera));

  Thief.getScene().setRenderContext(renderContext);

};

//----------------------------------------------------------------------

/**
* Add a game object to the current scene.
* @param {GameObject} obj The game object.
*/
Thief.addGameObjectToScene = function (obj) {
  Thief.currentScene.addObject(obj);
};

//----------------------------------------------------------------------
