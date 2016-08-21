var AABBCollider = function (width, height, isSensor) {
    Collider.call(this, isSensor);
    this.width = width;
    this.height = height;


    // this.bodyDef.position.x = this.gameObject.getTransform().position.x;
    // this.bodyDef.position.y = this.gameObject.getTransform().position.y;
};

AABBCollider.prototype = new Collider();
AABBCollider.prototype.constructor = AABBCollider;

//----------------------------------------------------------------------

AABBCollider.prototype.adapt = function(fixDef){

  Collider.prototype.adapt.call(this,fixDef);

  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(
        this.width/2 //half width
        ,this.height/2 //half height
  );
};

//----------------------------------------------------------------------
