var snake = function () {

  Thief.init();
  Thief.createAndSetScene("test");

// -----------------------------------------------------------------------------

  var gameObjectBuilder = new GameObjectBuilder();

// -----------------------------------------------------------------------------

  var controller =
  gameObjectBuilder.begin().
  setName("GameController").
  addScript(new GameLogic()).
  end();

  Thief.addGameObjectToScene(controller);

  Thief.run();

};
