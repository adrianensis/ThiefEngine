var AABBCollider = function (width, height) {
    Collider.call(this);
    this.width = width;
    this.height = height;


    // this.bodyDef.position.x = this.gameObject.getComponent(Transform).position.x;
    // this.bodyDef.position.y = this.gameObject.getComponent(Transform).position.y;
};

AABBCollider.prototype = new Collider();
AABBCollider.prototype.constructor = AABBCollider;

AABBCollider.prototype.adapt = function(fixDef){
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(
        this.width/2 //half width
        ,this.height/2 //half height
  );
}

//
// AABBCollider.prototype.isInCircle = function(center, radius){
//     var vertices = this.getVertices();
//
// 	var collisionOK = false;
//
// 	for (var i = 0; i < vertices.length && !collisionOK; i++) {
// 	collisionOK = collisionOK || (Vector4.dst(center,vertices[i]) < radius);
// 	}
// 	return collisionOK;
// }
//
// AABBCollider.prototype.getVertices = function () {
//     var center = this.gameObject.getComponent(Transform).position;
//
// 	this.LT = new Vector2(center.x-(this.width/2),center.y+(this.height/2));
// 	var LT = this.LT; // LEFT TOP VERTEX
// 	var LB = new Vector2(LT.x, LT.y - this.height); // LEFT BOTTOM
// 	var RB = new Vector2(LT.x + this.width, LT.y - this.height); // RIGHT BOTTOM
// 	var RT = new Vector2(LT.x + this.width, LT.y); // RIGHT BOTTOM
//
//     return [LT, LB, RB, RT];
// };
//
// AABBCollider.prototype.contains = function (vec) {
// 	return (this.LT.x < vec.x && this.LT.y > vec.y &&
// 	this.LT.x + this.width > vec.x && this.LT.y - this.height < vec.y);
// };
//
// AABBCollider.prototype.checkCollisionWithAABB = function (otherCollider) {
//     var vertices = otherCollider.getVertices();
//
// 	var collisionOK = false;
//
// 	for (var i = 0; i < vertices.length && !collisionOK; i++) {
// 	collisionOK = collisionOK || this.contains(vertices[i]);
// 	}
//
// 	return collisionOK;
// };
//
// AABBCollider.prototype.checkCollisionWithCircle = function (otherCollider) {
//     var vertices = this.getVertices();
//
// 	var collisionOK = false;
//
// 	for (var i = 0; i < vertices.length && !collisionOK; i++) {
// 	collisionOK = collisionOK || other.contains(vertices[i]);
// 	}
//
// 	return collisionOK;
// };
//
// AABBCollider.prototype.simulate = function () {
//
//
// };
