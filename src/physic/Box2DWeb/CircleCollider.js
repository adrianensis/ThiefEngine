var CircleCollider = function (radius) {
    Collider.call(this);
    this.radius = radius;
};

CircleCollider.prototype = new Collider();
CircleCollider.prototype.constructor = CircleCollider;

CircleCollider.prototype.isInCircle = function(center, radius){
    // return (Vector4.dst(center,this.gameObject.getComponent(Transform).position), )
}

CircleCollider.prototype.contains = function (vec) {
    // console.log(this.LT.x() + " " + this.LT.y());
    // console.log(vec.x() + " " + vec.y());

    var distance = Vector4.dst(vec, this.gameObject.getComponent(Transform).position);

	return (distance < radius);
};

CircleCollider.prototype.checkCollisionWithAABB = function (otherCollider) {
    var vertices = otherCollider.getVertices();

	var collisionOK = false;

	for (var i = 0; i < vertices.length && !collisionOK; i++) {
	collisionOK = collisionOK || this.contains(vertices[i]);
	}

	return collisionOK;
};

CircleCollider.prototype.checkCollisionWithCircle = function (otherCollider) {
    return (Vector4.dst(this.center, other.center) < (this.radius + other.radius))
};

CircleCollider.prototype.simulate = function () {


};
