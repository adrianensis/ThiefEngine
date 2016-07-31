var State = function (body){
  this.position = body.gameObject.getComponent(Transform).position.cpy();
  this.rotation = body.gameObject.getComponent(Transform).rotation.cpy();
  this.static = body.static;
	this.linear = body.linear.cpy();
	this.angular = body.angular.cpy();
	this.mass = body.mass;
	this.onCollision = body.onCollision;
};

State.prototype.restore = function (body) {
  body.gameObject.getComponent(Transform).setPosition(this.position.cpy());
  body.gameObject.getComponent(Transform).setRotation(this.rotation.cpy());
  body.static = this.static;
	body.linear = this.linear.cpy();
	body.angular = this.angular.cpy();
	body.mass = this.mass;
	body.onCollision = this.onCollision;
};
