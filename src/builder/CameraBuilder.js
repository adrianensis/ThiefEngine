/**
* @class
* @classdesc This class is a camera builder.
* @extends {GameObjectBuilder}
*/
var CameraBuilder = function (){
  GameObjectBuilder.call(this);
};

CameraBuilder.prototype = new GameObjectBuilder();
CameraBuilder.prototype.constructor = CameraBuilder;

//----------------------------------------------------------------------

/**
* Set orthographic projection.
* @param {Number} width The width.
* @param {Number} height The height.
* @param {Number} far The far.
* @param {Number} near The near.
* @returns {CameraBuilder} this.
*/
CameraBuilder.prototype.setOrtho = function (width,height,far,near) {

  // TODO: implement zoom into OrthoCamera class.
  this.cam = new OrthoCamera(-width,width,-height,height, far,near);
  this.tmpObj.addComponent(this.cam);

  return this;
};

//----------------------------------------------------------------------

/**
* Set perspective projection.
* @param {Number} far The far.
* @param {Number} near The near.
* @param {Number} aspect The aspect.
* @param {Number} fov The fov.
* @returns {CameraBuilder} this.
*/
CameraBuilder.prototype.setPerspective = function (far,near,aspect,fov) {

  this.cam = new PerspectiveCamera(far,near,aspect,fov);
  this.tmpObj.addComponent(this.cam);

  return this;
};

//----------------------------------------------------------------------


/**
* Create a camera.
* @param {TYPE} pos The position
* @returns {CameraBuilder} this.
*/
CameraBuilder.prototype.create = function (pos) {

  return this.begin().setPosition(pos);

};

//----------------------------------------------------------------------
