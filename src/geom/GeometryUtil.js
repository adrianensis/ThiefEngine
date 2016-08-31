/**
* @class
* @classdesc Provides geometry related methods.
*/
var GeometryUtil = function () {

};

//----------------------------------------------------------------------

/**
* Returns if the rectangle contains the point.
* @param {Vector4} leftTopVertex The leftTopVertex of the rectangle.
* @param {Number} width The width of the rectangle.
* @param {Number} height The height of the rectangle.
* @param {Number} point The point.
* @returns {Boolean} True if the rectangle contains the point.
*/
GeometryUtil.testRectanglePoint = function(leftTopVertex,width,height,point, eps){
	return (leftTopVertex.x-eps < point.x && leftTopVertex.y+eps > point.y &&
	leftTopVertex.x + width +eps > point.x && leftTopVertex.y - height -eps < point.y);
};

//----------------------------------------------------------------------
/**
* Returns if the spheres are colliding.
* @param {Vector4} centerA The center of the A sphere.
* @param {Vector4} radiusA The radius of the A sphere.
* @param {Number} centerB The center of the B sphere.
* @param {Number} radiusB The radius of the B sphere.
* @returns {Boolean} True if the spheres are colliding.
*/
GeometryUtil.testSphereSphere = function(centerA, centerB, radiusA, radiusB){
	var distance = centerA.dst(centerB);
	return (distance < radiusA+radiusB);
};

//----------------------------------------------------------------------

/**
* Returns the middle point.
* @param {Vector4} a The a point.
* @param {Vector4} b The b point.
* @returns {Vector4} The middle point.
*/
GeometryUtil.midPoint = function(a,b){
	return new Vector3((a.x+b.x)/2.0, (a.y+b.y)/2.0, (a.z+b.z)/2.0 );
};

//----------------------------------------------------------------------

/**
* Returns the closest point in a segment to the point p.
* @param {Vector4} p The p point.
* @param {Vector4} a The a point of the segment.
* @param {Vector4} b The b point of the segment.
* @returns {Vector4} The closest point.
*/
GeometryUtil.closestPointInSegment = function (p,a,b){

	var closest = null;

	var subVector = b.cpy().sub(a);

  if ((subVector.x === 0) && (subVector.y === 0) && (subVector.z === 0)){
      // It's a point not a line segment.
			// return P.sub(A).len();

			return a;
  }

  // Calculate the t that minimizes the distance.
	// Perpendicular Distance from a Point to a Line.
  // var t = ((p.x - a.x) * dx + (p.y - a.y) * dy + (p.z - a.z) * dz) /
  //     (dx * dx + dy * dy + dz * dz);

	var t = p.cpy().sub(a).dot(subVector)/(subVector.dot(subVector));

  // See if this represents one of the segment's
  // end points or a point in the middle.
  if (t < 0){
		closest = a;
  }else if (t > 1){
		closest = b;
  }else{
    closest = a.cpy().add(subVector.mulScl(t));
  }

	return closest;
};

//----------------------------------------------------------------------

/**
* Returns the squared distance between a point and a segment.
* @param {Vector4} p The p point.
* @param {Vector4} a The a point of the segment.
* @param {Vector4} b The b point of the segment.
* @returns {Number} The squared distance.
*/
GeometryUtil.sqDistanceToSegment = function (p,a,b){

	var closest = GeometryUtil.closestPointInSegment(p,a,b);

	var subVector = p.cpy().sub(closest);

  // return (dx * dx + dy * dy + dz * dz);
	return (subVector.dot(subVector));

};

//----------------------------------------------------------------------

/**
* Returns the distance between a point and a segment.
* @param {Vector4} p The p point.
* @param {Vector4} a The a point of the segment.
* @param {Vector4} b The b point of the segment.
* @returns {Number} The distance.
*/
GeometryUtil.distanceToSegment = function (p,a,b){
	return Math.sqrt(GeometryUtil.sqDistanceToSegment(p,a,b));
};

//----------------------------------------------------------------------

/**
* Returns the closest point in a sphere to the point p.
* @param {Vector4} p The p point.
* @param {Vector4} center The center of the sphere.
* @param {Number} b The radius of the sphere.
* @returns {Vector4} The closest point.
*/
GeometryUtil.closestPointInSphere = function (p,center,radius){
	var pToCenter = p.cpy().sub(center);

	var radiusVector = pToCenter.nor().mulScl(radius); // vector with length = radius

	var closestPoint = center.cpy().add(radiusVector);

	return closestPoint;
};
