var Polygon = function (width, height) {
  Collider2D.call(this, width, height);
};

Polygon.prototype = new Collider2D();
Polygon.prototype.constructor = Polygon;


Polygon.prototype.testVertexVertex = function (vertices, otherCollider, contactList) {

  var result = Collider.STATUS_NONE;

  var eps = Collider.depthEpsilon; // Error

	var otherVertices = otherCollider.getVertices();

	// VERTEX - VERTEX

	var foundVertexVertex = false; // true if d< eps
	// var counter = 0;
	// var double = new Array(2);

	var center = this.getCenter().cpy();

  // for all vertices
  for (var i = 0; i < vertices.length && !foundVertexVertex; i++) {

		// foundVertexVertex = false;

		var vertex = vertices[i];

    // flag interior vertex -> 1 , -1
    var interior = otherCollider.testPoint(vertex) ? -1 : 1;

    var maxDistance = -Infinity; // distance
    var normal = null; // the collision normal

		// vertex - vertex
	  for (var j = 0; j < otherVertices.length && !foundVertexVertex; j++) {

			var otherVertex = otherVertices[j];

	    // var d= vertex.dst(otherVertex);
	    var d = vertex.dst(otherVertex);
			d *= interior;

			// if "collision"
			// if(Math.abs(d) <= Math.abs(eps)){
          if(d <= eps){

						foundVertexVertex = true;

            // max
            if(d > maxDistance){

                maxDistance = d;
								normal = center.sub(otherCollider.getCenter()).nor();

            }
          }
			// }
    }

		if(foundVertexVertex){
      result = this.checkCollisionOrPenetration(vertex, maxDistance, normal, otherCollider, contactList);
    }

	}

  return result;
};

Polygon.prototype.testVertexEdge = function (vertices, otherCollider, contactList) {

  var result = Collider.STATUS_NONE;

  var eps = Collider.depthEpsilon; // Error

  var edges = otherCollider.getEdges(); // otherCollider's edges
  var normals = otherCollider.getNormals(); // the normals of this collider


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

    }else if(otherCollider instanceof Polygon){


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
