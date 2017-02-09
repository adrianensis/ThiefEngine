/**
* @class
* @extends {Component}
* @classdesc  This component provides collision capabilities.
* @param {Boolean} isSensor True if the collider is a sensor.
*/
var Collider = function (isSensor) {
	Component.call(this);
	this.sensor = isSensor || false;
};

Collider.prototype = new Component();
Collider.prototype.constructor = Collider;

//----------------------------------------------------------------------

/**
* Return if collider is a sensor.
* @returns {Boolean} True if collider is a sensor.
*/
Collider.prototype.isSensor = function () {
	return this.sensor;
};

//----------------------------------------------------------------------

Collider.prototype.adapt = function(fixDef){
  fixDef.isSensor = this.isSensor();
};

//----------------------------------------------------------------------
