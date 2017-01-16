var CameraBuilder = function (){
  GameObjectBuilder.call(this);
};

CameraBuilder.prototype = new GameObjectBuilder();
CameraBuilder.prototype.constructor = CameraBuilder;

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
CameraBuilder.prototype.setOrtho = function (w,h,far,near) {

  // TODO: implement zoom into OrthoCamera class.
  this.cam = new OrthoCamera(-w,w,-h,h, far,near);
  this.tmpObj.addComponent(this.cam);

  return this;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
CameraBuilder.prototype.setPerspective = function (far,near,aspect,fov) {

  this.cam = new PerspectiveCamera(far,near,aspect,fov);
  this.tmpObj.addComponent(this.cam);

  return this;
};

//----------------------------------------------------------------------


/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
CameraBuilder.prototype.create = function (pos) {

  return this.begin().setPosition(pos);

};

//----------------------------------------------------------------------
