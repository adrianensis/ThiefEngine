var MeshRenderer = function (){
	Component.call(this);
	this.mesh = null;
	this.material = null;

	// texture region
  this.regionPosition = new Vector2(0.0,0.0);
  this.regionWidth = 1.0;
  this.regionHeight = 1.0;

  // alpha color
  this.alphaColor = new Color(-1,-1,-1,-1);
};

MeshRenderer.prototype = new Component();
MeshRenderer.prototype.constructor = MeshRenderer;

//----------------------------------------------------------------------

MeshRenderer.prototype.getMesh = function (){
	return this.mesh;
};

//----------------------------------------------------------------------

MeshRenderer.prototype.setMesh = function (mesh){
	this.mesh=mesh;
};

//----------------------------------------------------------------------

MeshRenderer.prototype.getMaterial = function (){
	return this.material;
};

//----------------------------------------------------------------------

MeshRenderer.prototype.setMaterial = function (material){
	this.material=material;
};

//----------------------------------------------------------------------

MeshRenderer.prototype.getRadius = function () {

	var t = this.gameObject.getTransform();
	var scale = t.getScale();

	var max = this.mesh.getMax();

	var width = max.x * scale.x;
	var height = max.y * scale.y;
	var depth = max.z * scale.z;

	return Math.sqrt(( width * width ) + (  height * height ) + (  depth * depth )) / 2.0;
};

//----------------------------------------------------------------------

MeshRenderer.prototype.getAlphaColor = function (){
	return this.alphaColor;
};

//----------------------------------------------------------------------

MeshRenderer.prototype.setAlphaColor = function (color){
	this.alphaColor = color;
};

//----------------------------------------------------------------------

MeshRenderer.prototype.setRegion = function (pos, width, height){
  this.regionPosition = pos;
  this.regionWidth = width;
  this.regionHeight = height;
};

//----------------------------------------------------------------------

MeshRenderer.prototype.getRegionPosition = function (){
	return this.regionPosition;
};

//----------------------------------------------------------------------

MeshRenderer.prototype.getRegionWidth = function (){
	return this.regionWidth;
};

//----------------------------------------------------------------------

MeshRenderer.prototype.getRegionHeight = function (){
	return this.regionHeight;
};

//----------------------------------------------------------------------

MeshRenderer.prototype.updateMaterial = function (material){
  if(material.getTexture() !== null){


    var shader = material.getShader();

    shader.addFloatVector(this.alphaColor.toArray(),"alphacolor");

    shader.addFloat(this.getRegionPosition().x, "regionX");
    shader.addFloat(this.getRegionPosition().y, "regionY");
    shader.addFloat(this.getRegionWidth(), "regionWidth");
    shader.addFloat(this.getRegionHeight(), "regionHeight");

    if(this.animation !== null){
      var frame = this.animation.getNextFrame();

      shader.addFloat(frame.getPosition().x, "animationX");
    	shader.addFloat(frame.getPosition().y, "animationY");
    	shader.addFloat(frame.getWidth(), "animationWidth");
    	shader.addFloat(frame.getHeight(), "animationHeight");
    }


  }
};

//----------------------------------------------------------------------
