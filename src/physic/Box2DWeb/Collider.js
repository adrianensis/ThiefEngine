var Collider = function () {
	Component.call(this);
	// this.static = false;

};

Collider.prototype = new Component();
Collider.prototype.constructor = Collider;

Collider.prototype.adapt = function(fixDef){

}
// 
//
// Collider.prototype.isInCircle = function(center, radius){
//
// }
//
// Collider.prototype.contains = function (vec) {
//
// };
//
// // Template method
// Collider.prototype.checkCollision = function (otherCollider) {
// 	if(otherCollider.constructor == AABBCollider)
// 	return this.checkCollisionWithAABB(otherCollider);
// 	else if(otherCollider.constructor == CircleCollider)
// 	return this.checkCollisionWithCircle(otherCollider);
// };
//
// Collider.prototype.checkCollisionWithAABB = function (otherCollider) {
//
// };
//
// Collider.prototype.checkCollisionWithCircle = function (otherCollider) {
//
// };
//
// Collider.prototype.simulate = function (otherCollider) {
//
// };
//
// Collider.prototype.setStatic = function (bool) {
//
// };
//
// Collider.prototype.isStatic = function () {
//
// };
