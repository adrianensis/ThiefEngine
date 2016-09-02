var Collider = function (isSensor) {
	Component.call(this);
	this.sensor = isSensor;
};

Collider.prototype = new Component();
Collider.prototype.constructor = Collider;

//----------------------------------------------------------------------

// Collider.prototype.setSensor = function (bool) {
// 	this.sensor = bool;
// };

//----------------------------------------------------------------------

Collider.prototype.isSensor = function () {
	return this.sensor;
};

//----------------------------------------------------------------------

Collider.prototype.adapt = function(fixDef){
  fixDef.isSensor = this.isSensor();
};

//----------------------------------------------------------------------
