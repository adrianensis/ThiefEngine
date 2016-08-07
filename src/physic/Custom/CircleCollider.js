var CircleCollider = function (radius) {
    Collider2D.call(this, radius*2, radius*2);
    this.radius = radius;
};

CircleCollider.prototype = new Collider2D();
CircleCollider.prototype.constructor = CircleCollider;


//----------------------------------------------------------------------

CircleCollider.prototype.getVertices = function () {
  return [];
};

//----------------------------------------------------------------------

CircleCollider.prototype.getEdges = function () {
  return [];
};

//----------------------------------------------------------------------

CircleCollider.prototype.getRadius = function () {
  return this.radius;
};

//----------------------------------------------------------------------

CircleCollider.prototype.getNormals = function() {
  return [];
};

//----------------------------------------------------------------------

CircleCollider.prototype.testPoint = function (vec) {
  var distance = vec.dst(this.getCenter());
	return (distance <= this.radius);
};

//----------------------------------------------------------------------

CircleCollider.prototype.getCandidateVertices = function (otherCollider) {

  var candidates = [];

  var center = this.getCenter();

  if(otherCollider instanceof CircleCollider){

    var otherCenterToCenter = otherCollider.getCenter().cpy().sub(this.getCenter());

    var radiusVector = otherCenterToCenter.cpy().nor().mulScl(this.getRadius());

    // var closestPointInCircle = vertexToCenter.cpy().sub(radiusVector);

    var closestPointInCircle = this.getCenter().cpy().add(radiusVector);

    // closest point in circle to the other circle
    candidates.push(closestPointInCircle);


  }else if(otherCollider instanceof Polygon){

    var edges =  otherCollider.getEdges();

    var minDistance = Infinity;
    var closest = null;

    for (var i = 0; i < edges.length; i++){

      var a = edges[i][0];
      var b = edges[i][1];

      var p = GeometryUtil.closestPointInSegment(center,a,b);
      var d = center.dst(p);

      if(d < minDistance){
        minDistance = d;
        closest = p;
      }
    }

    var closestPointInCircle = GeometryUtil.closestPointInCircle(closest,center,this.getRadius());

    // closest point in circle to the edge
    candidates.push(closestPointInCircle);
  }



  return candidates; // here there is only one vertex.
};

//----------------------------------------------------------------------

CircleCollider.prototype.testVertexVertex = function (vertices, otherCollider, contactList) {

  var result = Collider.STATUS_NONE;

  var eps = Collider.depthEpsilon; // Error

  for (var i = 0; i < vertices.length && result !== Collider.STATUS_PENETRATION; i++) {

    var vertex = vertices[i];

    var normal = null; // the collision normal

    // var distanceToSegment= -Infinity; // distance
    var foundVertexEdge = false; // true if d< eps
    var maxDistance = -Infinity;

    // flag interior vertex -> 1 , -1
    var interior = otherCollider.testPoint(vertex) ? -1 : 1;


    if(otherCollider instanceof CircleCollider){

      var closest = GeometryUtil.closestPointInCircle(vertex,otherCollider.getCenter(),otherCollider.getRadius());

      var d = vertex.dst(closest);
      d *= interior; // negative if interior

      // console.log(d);

      if( d < eps){
        foundVertexEdge = true;
      }

      maxDistance = d;
      normal = closest.cpy().sub(vertex).nor();

    }else if(otherCollider instanceof AABBCollider){

      var edges = otherCollider.getEdges(); // otherCollider's edges
      var normals = otherCollider.getNormals(); // the normals of this collider

      // vertex - edge
      for (var j = 0; j < edges.length && result !== Collider.STATUS_PENETRATION; j++) {

        var a = edges[j][0];
        var b = edges[j][1];

        var d = GeometryUtil.distanceToSegment(vertex,a,b);

        d *= interior; // negative if interior

        // if "collision"
        if( d < eps){

          foundVertexEdge = true;

          if(d > maxDistance){
            maxDistance = d;
            normal = normals[j];

          }
        }
      }


    }

    if(foundVertexEdge){
      result = this.checkCollisionOrPenetration(vertex, maxDistance, normal, otherCollider, contactList);
    }


  }

  return result;
};

//----------------------------------------------------------------------

CircleCollider.prototype.testVertexEdge = function (vertices, otherCollider, contactList) {
  return Collider.STATUS_NONE;
};

//----------------------------------------------------------------------
