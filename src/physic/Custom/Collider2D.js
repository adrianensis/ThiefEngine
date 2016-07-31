var Collider2D = function (width,height) {
	Collider.call(this);

	this.width = width;
  this.height = height;
  this.LT = null;
  this.LB = null;
  this.RB = null;
  this.RT = null;
};

Collider2D.prototype = new Collider();
Collider2D.prototype.constructor = Collider2D;

Collider2D.prototype.getBoundingBox = function () {
	var t = this.gameObject.getComponent(Transform);

  if(t.isDirty()){
    var center = this.getCenter();

  	this.LT = new Vector3(center.x-(this.width/2),center.y+(this.height/2), center.z); // LEFT TOP VERTEX
  	this.LB = new Vector3(this.LT.x, this.LT.y - this.height, center.z); // LEFT BOTTOM
  	this.RB = new Vector3(this.LT.x + this.width, this.LT.y - this.height, center.z); // RIGHT BOTTOM
  	this.RT = new Vector3(this.LT.x + this.width, this.LT.y, center.z); // RIGHT TOP
  }

  return [this.LT, this.LB, this.RB, this.RT];
};

Collider2D.prototype.generateContacts = function (vertices, otherCollider, contactList) {

  // var hasCollision = false;
  // var hasInterpenetration = false;

  // var eps = Collider.depthEpsilon; // Error
	//
	// var otherVertices = otherCollider.getVertices();
	//
	// // VERTEX - VERTEX
	//
	// var foundVertexVertex = false; // true if d< eps
	// // var counter = 0;
	// // var double = new Array(2);
	//
	// var center = this.getCenter().cpy();
	//
  // // for all vertices
  // for (var i = 0; i < vertices.length && !foundVertexVertex; i++) {
	//
	// 	// foundVertexVertex = false;
	//
	// 	var vertex = vertices[i];
	//
  //   // flag interior vertex -> 1 , -1
  //   var interior = otherCollider.testPoint(vertex) ? -1 : 1;
	//
  //   var maxDistance = -Infinity; // distance
  //   var normal = null; // the collision normal
	//
	// 	// vertex - vertex
	//   for (var j = 0; j < otherVertices.length && !foundVertexVertex; j++) {
	//
	// 		var otherVertex = otherVertices[j];
	//
	//     // var d= vertex.dst(otherVertex);
	//     var d = vertex.dst(otherVertex);
	// 		d *= interior;
	//
	// 		// if "collision"
	// 		// if(Math.abs(d) <= Math.abs(eps)){
  //         if(d <= eps){
	//
	// 					foundVertexVertex = true;
	//
  //           // max
  //           if(d > maxDistance){
	//
  //               maxDistance = d;
	// 							normal = center.sub(otherCollider.getCenter()).nor();
	//
  //           }
  //         }
	// 		// }
  //   }
	//
	// 	if(foundVertexVertex){
	//
	// 		var vrel = this.getRelativeVelocity(otherCollider);
	//
	// 		var vrn = normal.dot(vrel);
	//
	//     if(maxDistance < -eps){ // penetration
  //       if(vrn < 0.0){
	// 				// console.log("VERTEX-VERTEX PENETRATION " + maxDistance);
  //         hasInterpenetration = true;
  //       }
	//
  //   	}else if(maxDistance < eps){ // collision
	//
  //       if(vrn < 0.0){
	//
	// 				// counter++;
	// 				//
	// 				// if(counter < 2){
	//
	// 				// console.log("VERTEX-VERTEX COLLISION ");
	// 				contactList.push(new Contact(this, otherCollider, vertex, normal, vrel));
	// 				                  hasCollision = true;
	// 				// hasInterpenetration = true;
	// 				// }else{
	// 				// 	hasInterpenetration = false;
	// 				// }
  //       }
  //     }
  //   }
	//
	// }

	// VERTEX - EDGE
	// var edges = otherCollider.getEdges(); // otherCollider's edges
	// var normals = otherCollider.getNormals(); // the normals of this collider
	//
	//
	//
	// for (var i = 0; i < vertices.length && !hasInterpenetration; i++) {
	//
	// 	var vertex = vertices[i];
	//
	// 	var normal = null; // the collision normal
	//
	// 	// var distanceToSegment= -Infinity; // distance
	// 	var foundVertexEdge = false; // true if d< eps
	// 	var maxDistance = -Infinity;
	//
  //   // flag interior vertex -> 1 , -1
  //   var interior = otherCollider.testPoint(vertex) ? -1 : 1;
	//
	//
  //   // vertex - edge
  //   for (var j = 0; j < edges.length && !hasInterpenetration; j++) {
	//
	// 		var a = edges[j][0];
	// 		var b = edges[j][1];
	//
	// 		// XXX: TEST
	// 		// -----------
	// 		// var edge = b.sub(a);
	// 		//
	// 		// var u = edge.nor();
	// 		//
	// 		// var p = vertex.sub(a);
	// 		//
	// 		// var proj = u.mulScl(p.dot(u));
	// 		//
	// 		// var dVec = p.cross(u);
	// 		//
	// 		// var dist = dVec.len();
	//
	// 		// ------------
	//
  //     var d = GeometryUtil.distanceToSegment(vertex,a,b);
	//
  //     d *= interior; // negative if interior
	//
  //     // if "collision"
  //     if( d < eps){
	//
	//
	// 			foundVertexEdge = true;
	//
	// 			// var dCenter = this.getCenter().dst(GeometryUtil.midPoint(b,a));
	// 			//
	// 			// var dMin = dCenter;
	//
	// 			// select the edge that minimizes the distance to the collider
	//
	// 			if(d > maxDistance){
	//
	// 				// distanceMin = dMin;
	// 				// distanceMin = d;
	//
  //         // max
  //         // if(d > distanceToSegment){
  //             // distanceToSegment = d;
	// 						maxDistance = d;
  //             normal = normals[j];
	// 						// collsionPoint = vertex;
  //         // }
	// 			}
  //     }
  //   }
	//
	// 	if(foundVertexEdge){
	//
	// 		var vrel = this.getRelativeVelocity(otherCollider);
	//
	// 		var vrn = normal.dot(vrel);
	//
	// 		// console.log(vrn);
	//
	// 		if(maxDistance < -eps){ // penetration
	//
	// 			if(vrn < 0.0){
	// 			// console.log("VERTEX-EDGE PENETRATION ");
	// 				hasInterpenetration = true;
	// 			}
	//
	// 		} else if(maxDistance < eps){ // collision
	//
	// 			if(vrn < 0.0){
	// 				// console.log("VERTEX-EDGE COLLISION ");
	// 				contactList.push(new Contact(this, otherCollider, vertex, normal, vrel));
	// 				hasCollision = true;
	// 			}
	// 		}
	// 	}
  // }

	var resultVertexVertex = this.testVertexVertex(vertices, otherCollider, contactList);

	// var resultVertexEdge = Collider.STATUS_NONE;

	// if penetration/collision has been detected in vertex-vertex phase, we don't need to check vertex-edge.
	// if(resultVertexVertex !== Collider.STATUS_PENETRATION){
	if(resultVertexVertex === Collider.STATUS_NONE){
		resultVertexEdge = this.testVertexEdge(vertices, otherCollider, contactList);
	}

	// if one test has detected something.
	if(resultVertexVertex !== Collider.STATUS_NONE || resultVertexEdge !== Collider.STATUS_NONE){

	  var hasInterpenetration = resultVertexVertex === Collider.STATUS_PENETRATION || resultVertexEdge === Collider.STATUS_PENETRATION;
		var hasCollision = resultVertexVertex === Collider.STATUS_COLLISION || resultVertexEdge === Collider.STATUS_COLLISION;

		if(hasInterpenetration){
			// console.log("PENETRATION");
			return Collider.STATUS_PENETRATION;
		}else if(hasCollision){
			// console.log("COLLISION");
			return Collider.STATUS_COLLISION;
		}
	}


	// console.log("none");
  return Collider.STATUS_NONE;
};
