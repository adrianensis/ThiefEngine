var Collider = function () {
	Component.call(this);
	this.fixture = null;
};

Collider.prototype = new Component();
Collider.prototype.constructor = Collider;
