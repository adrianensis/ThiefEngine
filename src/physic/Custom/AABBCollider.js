var AABBCollider = function (width, height) {
  Polygon.call(this, width, height);
  // this.width = width;
  // this.height = height;
  // this.LT = null;
  // this.LB = null;
  // this.RB = null;
  // this.RT = null;
};

AABBCollider.prototype = new Polygon();
AABBCollider.prototype.constructor = AABBCollider;

AABBCollider.prototype.getVertices = function () {
  return this.getBoundingBox();
};

AABBCollider.prototype.getEdges = function () {

  var vertices = this.getVertices();
  var edges = [];

  for (var i = 0; i < vertices.length; i++) {
  	a = vertices[i];
  	b = vertices[(i+1)%4];

    edges.push([a,b]);
  }

  return edges;
};

AABBCollider.prototype.getRadius = function () {
	// diagonal
  return Math.sqrt(( this.width * this.width ) + (  this.height * this.height )) / 2.0;
};

AABBCollider.prototype.getNormals = function () {
  var normals = [];
  var center = this.getCenter();

  var p = new Vector2(center.x-1, center.y);
  normals[0] = p.sub(center);

  p = new Vector2(center.x, center.y-1);
  normals[1] = p.sub(center);

  p = new Vector2(center.x+1, center.y);
  normals[2] = p.sub(center);

  p = new Vector2(center.x, center.y+1);
  normals[3] = p.sub(center);

  return normals;
};

AABBCollider.prototype.testPoint = function (vec) {

  if(this.LT === null){
    var center = this.getCenter();
  	this.LT = new Vector3(center.x-(this.width/2),center.y+(this.height/2), center.z);
  }

	return GeometryUtil.testRectanglePoint(this.LT, this.width, this.height, vec);
};

AABBCollider.prototype.getCandidateVertices = function (otherCollider, contactList) {
  return this.getVertices();
};
