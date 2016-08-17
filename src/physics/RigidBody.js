var RigidBody = function (){
	Component.call(this);
	this.linear = new Vector3(0,0,0);
	this.angular = new Vector3(0,0,0);
	this.mass = 0;
	this.onCollision = false;
	this.savedState = null;
};

RigidBody.prototype = new Component();
RigidBody.prototype.constructor = RigidBody;

//----------------------------------------------------------------------

RigidBody.prototype.getCollider = function () {
	return this.gameObject.getComponent(Collider);
};

//----------------------------------------------------------------------

RigidBody.prototype.isStatic = function () {
	return this.gameObject.isStatic();
};

//----------------------------------------------------------------------

RigidBody.prototype.isQuiet = function (error) {
	return this.linear.len() === 0 || this.linear.len() < error;
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

RigidBody.prototype.simulate = function (time) {

	// var v = this.linear.len();
	// if(v === 0 || v < 0.01)
	// 	this.linear = new Vector3(0,0,0);

	var t = this.gameObject.getTransform();
	t.translate(this.linear.cpy().mulScl(time));
};

//----------------------------------------------------------------------
