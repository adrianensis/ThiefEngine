var RigidBody = function (){
	Component.call(this);

	this.fixDef = new b2FixtureDef;
	this.fixDef.density = 0.0;
	this.fixDef.friction = 0.0;
	this.fixDef.restitution = 0.0;

	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;

	this.fixture = null;
};

RigidBody.prototype = new Component();
RigidBody.prototype.constructor = RigidBody;

RigidBody.prototype.adapt = function () {
	this.gameObject.getComponent(Collider).adapt(this.fixDef);
};

RigidBody.prototype.getCollider = function () {
	return this.gameObject.getComponent(Collider);
};

RigidBody.prototype.setStatic = function (bool) {
	if(bool) this.bodyDef.type = b2Body.b2_staticBody;
	else this.bodyDef.type = b2Body.b2_dynamicBody;
};

RigidBody.prototype.isStatic = function () {
	return (this.bodyDef.type == b2Body.b2_staticBody);
};

RigidBody.prototype.setDensity = function (density) {
	this.fixDef.density = density;
};

RigidBody.prototype.getDensity = function () {
	return this.fixDef.density;
};

RigidBody.prototype.setFriction = function (friction) {
	this.fixDef.friction = friction;
};

RigidBody.prototype.getFriction = function () {
	return this.fixDef.friction;
};

RigidBody.prototype.setRestitution = function (restitution) {
	this.fixDef.restitution = restitution;
};

RigidBody.prototype.getRestitution = function () {
	return this.fixDef.restitution;
};
