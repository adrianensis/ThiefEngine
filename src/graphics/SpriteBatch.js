/**
* @class
* @classdesc This class manages multiple sprites wich have the same texture.
*/
var SpriteBatch = function (material){
  this.material = material;
  this.renderers = {};
  this.renderContext = null;
  this.vboColor = 0;

};

SpriteBatch.mesh = new RectangleMesh();

SpriteBatch.vboPosition = 0;
SpriteBatch.vboElemIndices = 0;
SpriteBatch.vboTexture = 0;
SpriteBatch.vboNormal = 0;
SpriteBatch.vao = 0;

SpriteBatch.binded = false;

//----------------------------------------------------------------------

/**
* Adds a sprite renderer.
* @param {SpriteRenderer} renderer The sprite renderer.
*/
SpriteBatch.prototype.add = function (renderer){

  // stored by id
  if( ! (renderer.getId() in this.renderers))
    this.renderers[renderer.getId()] = renderer;
};

//----------------------------------------------------------------------

/**
* Binds the batch.
*/
SpriteBatch.prototype.bind = function (){

  this.material.bind();

  // only bind the rectangle once
  if(! SpriteBatch.binded){

    SpriteBatch.binded = true;

    // create VAO
    SpriteBatch.vao = vao_ext.createVertexArrayOES();
    vao_ext.bindVertexArrayOES(SpriteBatch.vao);


    // POSITION
    gl.enableVertexAttribArray(0);
    SpriteBatch.vboPosition = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, SpriteBatch.vboPosition);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(SpriteBatch.mesh.getVerticesData()), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);


    // TEXTURE
    gl.enableVertexAttribArray(1);
    SpriteBatch.vboTexture = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, SpriteBatch.vboTexture);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(SpriteBatch.mesh.getTexCoordData()), gl.STATIC_DRAW);
    gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);





    // NORMALS
    gl.enableVertexAttribArray(3);
    SpriteBatch.vboNormal = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, SpriteBatch.vboNormal);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( SpriteBatch.mesh.getNormalsData()), gl.STATIC_DRAW);
    gl.vertexAttribPointer(3, 4, gl.FLOAT, false, 0, 0);


    // ELEMENTS
    SpriteBatch.vboElemIndices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, SpriteBatch.vboElemIndices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(SpriteBatch.mesh.getFacesData()), gl.STATIC_DRAW);

    // Finised setting up VAO
    vao_ext.bindVertexArrayOES(null);

    // var children = this.getChildren();
    // for (var i = 0; i < children.length; i++) {
    // 	children[i].bind();
    // }

    }


  // COLOR
  gl.enableVertexAttribArray(2);
  this.vboColor = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, this.vboColor);
  // var color = [];
  // for (var i = 0; i < SpriteBatch.mesh.getVerticesData().length/4; i++) {
  // 	color = color.concat(this.material.color.getVector().toArray(());
  // }
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW); // TODO DYNAMIC
  // gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 0, 0);

};

//----------------------------------------------------------------------

/**
* Updates the batch.
* @param {renderContext} renderContext The render context.
*/
SpriteBatch.prototype.update = function (renderContext){
  this.renderContext = renderContext;

	this.material.enable();

  this.material.getShader().addMatrix(this.renderContext.getCamera().getProjectionMatrix(), "projectionMatrix");
	this.material.getShader().addMatrix(this.renderContext.getCamera().getViewMatrix(), "viewMatrix");

	this.material.disable();

};

//----------------------------------------------------------------------

/**
* Renders a layer of the batch.
* @param {Number} layer The layer to render.
*/
SpriteBatch.prototype.render = function (layer){

  this.material.enable();

  vao_ext.bindVertexArrayOES(SpriteBatch.vao);

  gl.enableVertexAttribArray(0);

  // if(SpriteBatch.mesh.hasTexture())
    gl.enableVertexAttribArray(1);

  gl.enableVertexAttribArray(3);

  var cam = this.renderContext.getCamera();

  for (var key in this.renderers) {

    var renderer = this.renderers[key];

    if(renderer.getLayer() === layer && renderer.isEnabled() && !renderer.isDestroyed()){

      var isInFrustum = cam.getFrustum().testSphere(renderer.getGameObject().getTransform().getPosition(), renderer.getRadius());

      if(isInFrustum){

        gl.enableVertexAttribArray(2);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vboColor);

      	var color = [];
      	for (var i = 0; i < SpriteBatch.mesh.getVerticesData().length/4; i++) {
      	   color = color.concat(renderer.getMaterial().getColor().toArray());
      	}
      	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
      	gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 0, 0);

        renderer.gameObject.getTransform().generateMatrix();
        this.material.getShader().addMatrix(renderer.gameObject.getTransform().getMatrix(), "modelMatrix");

        renderer.updateMaterial(this.material);

        gl.drawElements(gl.TRIANGLES, SpriteBatch.mesh.getNumFaces()*3, gl.UNSIGNED_SHORT, 0);

        this.material.reset();
      }
    }
  }

  gl.disableVertexAttribArray(0);
	gl.disableVertexAttribArray(1);
	gl.disableVertexAttribArray(2);
	gl.disableVertexAttribArray(3);

	this.material.disable();
};

//----------------------------------------------------------------------
