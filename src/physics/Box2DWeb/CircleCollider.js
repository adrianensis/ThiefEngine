var CircleCollider = function (radius, isSensor) {
    Collider.call(this, isSensor);
    this.radius = radius;
};

CircleCollider.prototype = new Collider();
CircleCollider.prototype.constructor = CircleCollider;

//----------------------------------------------------------------------

CircleCollider.prototype.adapt = function(fixDef){

  Collider.prototype.adapt.call(this,fixDef);

  fixDef.shape = new b2CircleShape();
  fixDef.shape.SetRadius(this.radius);
};

//----------------------------------------------------------------------
