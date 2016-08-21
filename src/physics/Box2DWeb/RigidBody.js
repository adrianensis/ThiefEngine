var RigidBody = function (){
	Component.call(this);

	this.fixDef = new b2FixtureDef;
	this.fixDef.density = 0.0;
	this.fixDef.friction = 0.0;
	this.fixDef.restitution = 0.0;

	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;

	this.fixture = null;

	this.body = null;
};

RigidBody.prototype = new Component();
RigidBody.prototype.constructor = RigidBody;

//----------------------------------------------------------------------

RigidBody.prototype.adapt = function (world) {
	this.gameObject.getComponent(Collider).adapt(this.fixDef);

	if(this.isStatic())
		this.bodyDef.type = b2Body.b2_staticBody;
	else
		this.bodyDef.type = b2Body.b2_dynamicBody;

  this.bodyDef.position.x = this.gameObject.getTransform().position.x;
  this.bodyDef.position.y = this.gameObject.getTransform().position.y;

	this.body = world.CreateBody(this.bodyDef);
	this.body.SetUserData(this.gameObject);

  this.fixture = this.body.CreateFixture(this.fixDef);

};

//----------------------------------------------------------------------

RigidBody.prototype.getBox2dBody = function () {
	return this.body;
};

//----------------------------------------------------------------------

RigidBody.prototype.getCollider = function () {
	return this.gameObject.getComponent(Collider);
};

//----------------------------------------------------------------------

RigidBody.prototype.isStatic = function () {
	return this.gameObject.isStatic();
};

//----------------------------------------------------------------------


// RigidBody.prototype.setDensity = function (density) {
// 	this.fixDef.density = density;
// };

//----------------------------------------------------------------------

// RigidBody.prototype.getDensity = function () {
// 	return this.fixDef.density;
// };

//----------------------------------------------------------------------

// RigidBody.prototype.setFriction = function (friction) {
// 	this.fixDef.friction = friction;
// };

//----------------------------------------------------------------------

// RigidBody.prototype.getFriction = function () {
	// return this.fixDef.friction;
// };

//----------------------------------------------------------------------

// RigidBody.prototype.setRestitution = function (restitution) {
// 	this.fixDef.restitution = restitution;
// };

//----------------------------------------------------------------------

// RigidBody.prototype.getRestitution = function () {
// 	return this.fixDef.restitution;
// };

//----------------------------------------------------------------------

// RigidBody.prototype.getLinearVelocity = function () {
// 	return this.fixture.GetBody().GetLinearVelocity();
// };

//----------------------------------------------------------------------

// RigidBody.prototype.getPosition = function () {
// 	return this.fixture.GetBody().GetPosition();
// };

//----------------------------------------------------------------------
