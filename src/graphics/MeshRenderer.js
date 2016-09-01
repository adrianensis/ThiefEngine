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
/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
MeshRenderer.prototype.constructor = MeshRenderer;

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
MeshRenderer.prototype.getMesh = function (){
	return this.mesh;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
MeshRenderer.prototype.setMesh = function (mesh){
	this.mesh=mesh;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
MeshRenderer.prototype.getMaterial = function (){
	return this.material;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
MeshRenderer.prototype.setMaterial = function (material){
	this.material=material;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
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

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
MeshRenderer.prototype.getAlphaColor = function (){
	return this.alphaColor;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
MeshRenderer.prototype.setAlphaColor = function (color){
	this.alphaColor = color;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
MeshRenderer.prototype.setRegion = function (pos, width, height){
  this.regionPosition = pos;
  this.regionWidth = width;
  this.regionHeight = height;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
MeshRenderer.prototype.getRegionPosition = function (){
	return this.regionPosition;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
MeshRenderer.prototype.getRegionWidth = function (){
	return this.regionWidth;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
MeshRenderer.prototype.getRegionHeight = function (){
	return this.regionHeight;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
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
