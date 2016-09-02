var RigidBody = function (){
	Component.call(this);
	this.linear = new Vector3(0,0,0);
	this.forceAccumulator = new Vector3(0,0,0);
	this.counterPenetrationAccumulator = new Vector3(0,0,0);
	this.angular = new Vector3(0,0,0);
	this.mass = 1;
	this.onCollision = false;
	this.savedState = null;
	this.status = Collider.STATUS_NONE;
};

RigidBody.prototype = new Component();
RigidBody.prototype.constructor = RigidBody;

//----------------------------------------------------------------------

RigidBody.prototype.setMass = function (mass) {
	this.mass = mass;
};

//----------------------------------------------------------------------

RigidBody.prototype.getForceAccumulator = function () {
	return this.forceAccumulator;
};

//----------------------------------------------------------------------

RigidBody.prototype.setForceCounterPenetrationAccumulator = function (vec) {
	this.forceAccumulator.set(vec);
};

//----------------------------------------------------------------------

RigidBody.prototype.setForceAccumulator = function (vec) {
	this.forceAccumulator.set(vec);
};

//----------------------------------------------------------------------

RigidBody.prototype.applyForce = function (vec) {
		this.counterPenetrationAccumulator.add(vec);
};

//----------------------------------------------------------------------

RigidBody.prototype.applyForceCounterPenetration = function (vec) {
	this.forceAccumulator.add(vec);
};

//----------------------------------------------------------------------

RigidBody.prototype.applyImpulse = function (vec) {
	this.linear.add(vec.cpy().mulScl(1/this.mass));
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

RigidBody.prototype.getStatus = function () {
	return this.status;
};

//----------------------------------------------------------------------

RigidBody.prototype.setStatus = function (status) {
	this.status = status;
};

//----------------------------------------------------------------------


RigidBody.prototype.setOnCollision = function (bool) {
	this.onCollision = bool;
};

//----------------------------------------------------------------------

RigidBody.prototype.isOnCollision = function () {
	return this.onCollision;
};

//----------------------------------------------------------------------

RigidBody.prototype.saveState = function () {
	this.savedState = new State(this);
};

//----------------------------------------------------------------------

RigidBody.prototype.restoreState = function () {
	if(this.savedState !== null)
		this.savedState.restore(this);
};

//----------------------------------------------------------------------

RigidBody.prototype.integrate = function (dt) {

	var t = this.gameObject.getTransform();

	// Symplectic Euler

	// v += (1/m * F) * dt
	this.linear.add(this.forceAccumulator.cpy().mulScl(1/this.mass).mulScl(dt));
	this.linear.add(this.counterPenetrationAccumulator.cpy().mulScl(1/this.mass).mulScl(dt));

	// x += v * dt
	t.translate(this.linear.cpy().mulScl(dt));

	// clear forces
	this.forceAccumulator = new Vector3(0,0,0);
};

//----------------------------------------------------------------------
