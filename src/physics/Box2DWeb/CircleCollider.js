var CircleCollider = function (radius) {
    Collider.call(this);
    this.radius = radius;
};

CircleCollider.prototype = new Collider();
CircleCollider.prototype.constructor = CircleCollider;

//----------------------------------------------------------------------

CircleCollider.prototype.adapt = function(fixDef){
  fixDef.shape = new b2CircleShape();
  fixDef.shape.SetRadius(this.radius);
};

//----------------------------------------------------------------------
