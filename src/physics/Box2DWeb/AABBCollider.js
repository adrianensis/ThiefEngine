var AABBCollider = function (width, height) {
    Collider.call(this);
    this.width = width;
    this.height = height;


    // this.bodyDef.position.x = this.gameObject.getTransform().position.x;
    // this.bodyDef.position.y = this.gameObject.getTransform().position.y;
};

AABBCollider.prototype = new Collider();
AABBCollider.prototype.constructor = AABBCollider;

//----------------------------------------------------------------------

AABBCollider.prototype.adapt = function(fixDef){

  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(
        this.width/2 //half width
        ,this.height/2 //half height
  );
};

//----------------------------------------------------------------------
