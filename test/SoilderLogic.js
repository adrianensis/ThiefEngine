var SoilderLogic = function () {
    Script.call(this);
};

SoilderLogic.prototype = new Script();
SoilderLogic.prototype.constructor = SoilderLogic;

//----------------------------------------------------------------------

SoilderLogic.prototype.start = function () {

};

//----------------------------------------------------------------------

SoilderLogic.prototype.update = function (){


};

//----------------------------------------------------------------------

SoilderLogic.prototype.onEnterCollision = function (otherGameObject, contact){
  // console.log("onEnterCollision");

  // otherGameObject.destroy();
};

//----------------------------------------------------------------------

SoilderLogic.prototype.onExitCollision = function (otherGameObject, contact){
  // console.log("onExitCollision");
};

//----------------------------------------------------------------------

SoilderLogic.prototype.onDestroy = function (){
  // console.log("onDestroy");
};

//----------------------------------------------------------------------
