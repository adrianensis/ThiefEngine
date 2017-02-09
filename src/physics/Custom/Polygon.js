var Polygon = function (width, height) {
  Collider2D.call(this, width, height);

  this.vertices = [];
  this.edges = [];
  this.normals = [];

  this.pair = [];
  this.pairNormal = null;
};

Polygon.prototype = new Collider2D();
Polygon.prototype.constructor = Polygon;

//----------------------------------------------------------------------

Polygon.prototype.getEdges = function () {

  var t = this.gameObject.getTransform();

  // if(t.isDirty()){

    var vertices = this.getVertices();
    this.edges = [];

    for (var i = 0; i < vertices.length; i++) {
    	a = vertices[i];
    	b = vertices[(i+1)%4];

      this.edges.push([a,b]);
    }
  // }

  return this.edges;
};

//----------------------------------------------------------------------

Polygon.prototype.getCandidateVertices = function (otherCollider) {
  return this.getVertices();
};

//----------------------------------------------------------------------

Polygon.prototype.testVertexVertex = function (vertices, otherCollider, contactManager) {

  var result = Collider.STATUS_NONE;

  var eps = Collider.depthEpsilon; // Error

	var otherVertices = otherCollider.getVertices();
  var normals = otherCollider.getNormals(); // the normals of the other collider

	// VERTEX - VERTEX

	var foundVertexVertex = false; // true if d< eps

  var maxDistance = -Infinity; // distance
  var normal = null; // the collision normal
  var selectedVertex = null;

	var center = this.getCenter().cpy();

  this.pair = [];

  // var it = 0;

  // for all vertices
  for (var i = 0; i < vertices.length && this.pair.length < 2; /*&& !foundVertexVertex;*/ i++) {

		foundVertexVertex = false;

		var vertex = vertices[i];

    // flag interior vertex -> 1 , -1
    var interior = otherCollider.testPoint(vertex) ? -1 : 1;

    maxDistance = -Infinity; // distance
    normal = null; // the collision normal

		// vertex - vertex
	  for (var j = 0; j < otherVertices.length && !foundVertexVertex; j++) {

			var otherVertex = otherVertices[j];

	    // var d= vertex.dst(otherVertex);
	    var d = vertex.dst(otherVertex);
			// d *= interior;

      if(d < eps*10){

        this.pair.push(otherVertex);
          // console.log(this.pair.length );

        // max
        if(d > maxDistance){

          foundVertexVertex = true;
          // it++;
          selectedVertex = vertex.cpy();
          maxDistance = d;
					normal = center.sub(otherCollider.getCenter()).nor();

        }
      }
    }



	}

  if(foundVertexVertex){
    // console.log(this.pair.length );
    if(this.pair.length < 2)
      result = this.checkCollision(selectedVertex, eps, maxDistance, normal, otherCollider, contactManager);
  }

  // console.log(this.getId() + " "+it);

  return result;
};

//----------------------------------------------------------------------

Polygon.prototype.testVertexEdge = function (vertices, otherCollider, contactManager) {

  var result = Collider.STATUS_NONE;

  var eps = Collider.depthEpsilon; // Error

  var edges = otherCollider.getEdges(); // edges of the otherCollider
  var normals = otherCollider.getNormals(); // the normals of the other collider

  var midPointFlag = false;

  var i1 = 0;
  var i2 = 0;

  // var pair = [];
  // var successive = false;

  // for (var i = 0; i < vertices.length*2 /*&& result !== Collider.STATUS_PENETRATION*/; i++) {
  for (var i = 0; i < vertices.length /*&& result !== Collider.STATUS_PENETRATION*/; i++) {

    var vertex = null;

    // if(midPointFlag){
    //   vertex = GeometryUtil.midPoint(vertices[i2],vertices[(i2+1)%vertices.length]).cpy();
    //   i2++;
    // }else{
    //   vertex = vertices[i1];
    //   i1++;
    // }

    vertex = vertices[i];

    midPointFlag = !midPointFlag;


    var normal = null; // the collision normal

    // var distanceToSegment= -Infinity; // distance
    var foundVertexEdge = false; // true if d< eps
    var maxDistance = -Infinity;

    // flag interior vertex -> 1 , -1
    var interior = otherCollider.testPoint(vertex) ? -1 : 1;



    if(otherCollider instanceof CircleCollider){

      var closest = GeometryUtil.closestPointInSphere(vertex,otherCollider.getCenter(),otherCollider.getRadius());

      var d = vertex.dst(closest);
      d *= interior; // negative if interior

      // console.log(d);

      if(d < eps){
        foundVertexEdge = true;
      }

      maxDistance = d;
      normal = closest.cpy().sub(vertex).nor();

    }else if(otherCollider instanceof Polygon){

      if(this.pair.length === 2){
        edges = [this.pair];
        vertex = GeometryUtil.midPoint(vertices[i],vertices[(i+1)%vertices.length]);
        // console.log(vertex);
        interior = otherCollider.testPoint(vertex) ? -1 : 1;
        // console.log(this.pair[0].x + " "+ this.pair[0].y +" - "+this.pair[1].x + " "+ this.pair[1].y);
      }

      // vertex - edge
      for (var j = 0; j < edges.length; j++) {

        var a = edges[j][0];
        var b = edges[j][1];

        var d = GeometryUtil.distanceToSegment(vertex,a,b);

        d *= interior; // negative if interior

        // if "collision"
        if(d < eps){ // HACK: d !== 0 &&

          // if(this.pair.length === 2)
          //   console.log( d);
            // console.log( vertex.x + " "+ vertex.y +" --> "+d);

          foundVertexEdge = true;

          if(d > maxDistance){
            maxDistance = d;

            if(this.pair.length === 2){
              normal = this.pair[0].cpy().sub(this.pair[1]);
              var aux = normal.x;
              normal.x = normal.y
              normal.y = -aux;
              normal.nor();
              // console.log(this.pair[0].x + " "+ this.pair[0].y +" - "+this.pair[1].x + " "+ this.pair[1].y);
              // console.log(normal);
            }else
              normal = normals[j];
          }
        }
      }
    }

    if(foundVertexEdge){
      // console.log(normal);
      result = this.checkCollisionOrPenetration(vertex, eps, maxDistance, normal, otherCollider, contactManager);
    }

  }

  return result;
};

//----------------------------------------------------------------------
