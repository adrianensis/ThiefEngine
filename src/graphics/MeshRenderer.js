/**
* @class
* @extends {Component}
* @classdesc This class renders a Mesh.
*/
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

	//layer
	this.layer = 0;

	// Animations
  this.animations = [];
  this.animation = null;
};

MeshRenderer.prototype = new Component();
MeshRenderer.prototype.constructor = MeshRenderer;

//----------------------------------------------------------------------

/**
* Return the layer where the mesh is.
* @returns {Number} The layer.
*/
MeshRenderer.prototype.getLayer = function (){
	return this.layer;
};

//----------------------------------------------------------------------

/**
* Set the layer of the mesh.
* @param {Number} layer The layer.
*/
MeshRenderer.prototype.setLayer = function (layer){
	if(layer < 0)
		this.layer = 0;
	else
		this.layer=layer;
};

//----------------------------------------------------------------------

/**
* Return the mesh.
* @returns {Mesh} The mesh.
*/
MeshRenderer.prototype.getMesh = function (){
	return this.mesh;
};

//----------------------------------------------------------------------

/**
* Set the mesh.
* @param {Mesh} mesh The mesh.
*/
MeshRenderer.prototype.setMesh = function (mesh){
	this.mesh=mesh;
};

//----------------------------------------------------------------------

/**
* Return the material.
* @returns {Material} The material.
*/
MeshRenderer.prototype.getMaterial = function (){
	return this.material;
};

//----------------------------------------------------------------------

/**
* Set the material.
* @param {Material} material The material.
*/
MeshRenderer.prototype.setMaterial = function (material){
	this.material=material;
};

//----------------------------------------------------------------------

/**
* Return the radius.
* @returns {Number} The radius.
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
* Return the radius.
* @returns {Number} The radius.
*/
MeshRenderer.prototype.getAlphaColor = function (){
	return this.alphaColor;
};

//----------------------------------------------------------------------

/**
* Return the alpha color.
* @param {Color} color The alpha color.
*/
MeshRenderer.prototype.setAlphaColor = function (color){
	this.alphaColor = color;
};

//----------------------------------------------------------------------

/**
* Selects a region of the texture.
* @param {Vector2} pos The position (in texture coordinates).
* @param {Number} width The width of the region.
* @param {Number} height The height of the region.
*/
MeshRenderer.prototype.setRegion = function (pos, width, height){
  this.regionPosition = pos;
  this.regionWidth = width;
  this.regionHeight = height;
};

//----------------------------------------------------------------------

/**
* Return the position of the region.
* @returns {TYPE} The position.
*/
MeshRenderer.prototype.getRegionPosition = function (){
	return this.regionPosition;
};

//----------------------------------------------------------------------

/**
* Return the width of the region.
* @returns {TYPE} The width.
*/
MeshRenderer.prototype.getRegionWidth = function (){
	return this.regionWidth;
};

//----------------------------------------------------------------------

/**
* Return the height of the region.
* @returns {TYPE} The height.
*/
MeshRenderer.prototype.getRegionHeight = function (){
	return this.regionHeight;
};

//----------------------------------------------------------------------


/**
* Set the animation, by name.
* @param {String} name The name.
*/
MeshRenderer.prototype.setAnimation = function (name){
	this.animation = this.animations[name];
};

//----------------------------------------------------------------------

/**
* Add an animation, by name.
* @param {String} name The name.
* @param {Animation} animation The animation.
*/
MeshRenderer.prototype.addAnimation = function (name, animation){
	this.animations[name] = animation;
};


//----------------------------------------------------------------------

/**
* Update de material with information about the region, the alphacolor and the animation.
* @param {Material} material The material.
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
