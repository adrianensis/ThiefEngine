var CameraBuilder = function (){
  GameObjectBuilder.call(this);
};

CameraBuilder.prototype = new GameObjectBuilder();
CameraBuilder.prototype.constructor = CameraBuilder;

//----------------------------------------------------------------------

CameraBuilder.prototype.setOrtho = function (w,h,far,near) {

  // TODO: implement zoom into OrthoCamera class.
  this.cam = new OrthoCamera(-w,w,-h,h, far,near);
  this.tmpObj.addComponent(this.cam);

  return this;
};

//----------------------------------------------------------------------

CameraBuilder.prototype.setPerspective = function (far,near,aspect,fov) {

  this.cam = new PerspectiveCamera(far,near,aspect,fov);
  this.tmpObj.addComponent(this.cam);

  return this;
};

//----------------------------------------------------------------------
