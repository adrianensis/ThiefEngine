var RigidBody = function (density, friction, restitution){
	Component.call(this);

	this.fixDef = new b2FixtureDef;
	this.fixDef.density = density;
	this.fixDef.friction = friction;
	this.fixDef.restitution = restitution;

	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;

	this.fixture = null;

	this.body = null;

	this.world = null;
};

RigidBody.prototype = new Component();
RigidBody.prototype.constructor = RigidBody;

//----------------------------------------------------------------------

RigidBody.prototype.adapt = function (world) {

	this.world = world;

	this.gameObject.getComponent(Collider).adapt(this.fixDef);

	if(this.isStatic())
		this.bodyDef.type = b2Body.b2_staticBody;
	else
		this.bodyDef.type = b2Body.b2_dynamicBody;

	this.bodyDef.fixedRotation = this.isStatic();

  this.bodyDef.position.x = this.gameObject.getTransform().position.x;
  this.bodyDef.position.y = this.gameObject.getTransform().position.y;

	this.body = this.world.CreateBody(this.bodyDef);
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

// RigidBody.prototype.destroy = function (){
//
//
// 	Component.prototype.destroy.call(this);
// 	this.world.DestroyBody(this.body);
//
// 	this.world.DestroyBody(this.body);
// 	for (var fixture in this.body.GetFixtureList())
// 		this.body.DestroyFixture(fixture);
//
// 		this.body = null;
// 		this.fixture = null;
// };


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
