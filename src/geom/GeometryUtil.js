var GeometryUtil = function () {

};

GeometryUtil.testRectanglePoint = function(leftTopVertex,width,height,point){
	return (leftTopVertex.x <= point.x && leftTopVertex.y >= point.y &&
	leftTopVertex.x + width >= point.x && leftTopVertex.y - height <= point.y);
};

GeometryUtil.testSphereSphere = function(centerA, centerB, radiusA, radiusB){
	var distance = centerA.dst(centerB);
	return (distance <= radiusA+radiusB);
};

GeometryUtil.midPoint = function(a,b){
	return new Vector3((a.x+b.x)/2.0, (a.y+b.y)/2.0, (a.z+b.z)/2.0 );
};

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

GeometryUtil.sqDistanceToSegment = function (p,a,b){

	var closest = GeometryUtil.closestPointInSegment(p,a,b);

	var subVector = p.cpy().sub(closest);

  // return (dx * dx + dy * dy + dz * dz);
	return (subVector.dot(subVector));

};

GeometryUtil.distanceToSegment = function (p,a,b){
	return Math.sqrt(GeometryUtil.sqDistanceToSegment(p,a,b));
};

GeometryUtil.closestPointInCircle = function (p,center,radius){
	var pToCenter = p.cpy().sub(center);

	var radiusVector = pToCenter.nor().mulScl(radius); // vector with length = radius

	var closestPoint = center.cpy().add(radiusVector);

	return closestPoint;
};
