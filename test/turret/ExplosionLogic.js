var ExplosionLogic = function (player) {
    Script.call(this);
    this.MAX_TIME = 0.5;
    this.lastTime = 0;
};

ExplosionLogic.prototype = new Script();
ExplosionLogic.prototype.constructor = ExplosionLogic;

//----------------------------------------------------------------------

ExplosionLogic.prototype.start = function () {
  this.lastTime = Time.now();
};

//----------------------------------------------------------------------

ExplosionLogic.prototype.update = function (){

  var now = Time.now();

  if(now - this.lastTime > this.MAX_TIME){
    this.gameObject.destroy();
  }

};

//----------------------------------------------------------------------

ExplosionLogic.prototype.onEnterCollision = function (otherGameObject, contact){
  // console.log("onEnterCollision");

};

//----------------------------------------------------------------------

ExplosionLogic.prototype.onExitCollision = function (otherGameObject, contact){
  // console.log("onExitCollision");
};

//----------------------------------------------------------------------

ExplosionLogic.prototype.onDestroy = function (){
  // console.log("onDestroy");
};

//----------------------------------------------------------------------
