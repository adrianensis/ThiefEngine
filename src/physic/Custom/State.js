var State = function (body){
  this.position = body.gameObject.getTransform().position.cpy();
  this.rotation = body.gameObject.getTransform().rotation.cpy();
  this.static = body.static;
	this.linear = body.linear.cpy();
	this.angular = body.angular.cpy();
	this.mass = body.mass;
	this.onCollision = body.onCollision;
};

//----------------------------------------------------------------------

State.prototype.restore = function (body) {
  body.gameObject.getTransform().setPosition(this.position.cpy());
  body.gameObject.getTransform().setRotation(this.rotation.cpy());
  body.static = this.static;
	body.linear = this.linear.cpy();
	body.angular = this.angular.cpy();
	body.mass = this.mass;
	body.onCollision = this.onCollision;
};

//----------------------------------------------------------------------
