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

SpriteBatch.prototype.add = function (renderer){

  if( ! (renderer.getId() in this.renderers))
    this.renderers[renderer.getId()] = renderer;
};

SpriteBatch.prototype.bind = function (){

  this.material.bind();

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
  // var color = new Array(0);
  // for (var i = 0; i < SpriteBatch.mesh.getVerticesData().length/4; i++) {
  // 	color = color.concat(this.material.color.getData());
  // }
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW); // TODO DYNAMIC
  // gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 0, 0);

};

SpriteBatch.prototype.update = function (renderContext){
  this.renderContext = renderContext;

	this.material.enable();

  // var matrices = new Array(0);
  // for (var renderer of this.renderers) {
  //     matrices.push(renderer.gameObject.getComponent(Transform).getMatrix().transpose());
  // }
  //
  // this.material.getShader().addMatrixArray(matrices, "transformationMatrix");
  //
	// // this.material.getShader().addMatrix(this.gameObject.getComponent(Transform).getMatrix().transpose(), "transformationMatrix");
	this.material.getShader().addMatrix(this.renderContext.getCamera().getProjectionMatrix().transpose(), "projectionMatrix");
	this.material.getShader().addMatrix(this.renderContext.getCamera().getViewMatrix().transpose(), "viewMatrix");

	this.material.disable();

	// var children = this.getChildren();
	// for (var i = 0; i < children.length; i++) {
	// 	children[i].update(renderContext);
	// }
};

SpriteBatch.prototype.render = function (){

  this.material.enable();

  vao_ext.bindVertexArrayOES(SpriteBatch.vao);

  gl.enableVertexAttribArray(0);

  if(SpriteBatch.mesh.hasTexture())
  gl.enableVertexAttribArray(1);



  gl.enableVertexAttribArray(3);



  // this.frustum.build(this.renderContext.getCamera());






  var cam = this.renderContext.getCamera();

  for (var key in this.renderers) {

    var renderer = this.renderers[key];

    var test = cam.getFrustum().testSphere(renderer.getGameObject().getComponent(Transform).position, renderer.getRadius());

    // console.log(renderer.getRadius());
    // console.log(test);

    if(test){
      // if(this.renderContext.getCamera().contains(renderer)){

      gl.enableVertexAttribArray(2);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.vboColor);
    	var color = new Array(0);
    	for (var i = 0; i < SpriteBatch.mesh.getVerticesData().length/4; i++) {
    	   color = color.concat(renderer.getMaterial().getColor().getData());
    	}
    	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
    	gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 0, 0);

      this.material.getShader().addMatrix(renderer.gameObject.getComponent(Transform).getMatrix().transpose(), "transformationMatrix");

      renderer.updateMaterial(this.material);

      gl.drawElements(gl.TRIANGLES, SpriteBatch.mesh.getNumFaces()*3, gl.UNSIGNED_SHORT, 0);

      this.material.reset();
    }
  }



  gl.disableVertexAttribArray(0);
	gl.disableVertexAttribArray(1);
	gl.disableVertexAttribArray(2);
	gl.disableVertexAttribArray(3);



	this.material.disable();
};
