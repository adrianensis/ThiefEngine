var MeshRenderer = function (){
	Component.call(this);
	this.mesh = null;
	this.material = null;

	// this.vboPosition = 0;
	// this.vboColor = 0;
	// this.vboElemIndices = 0;
	// this.vboTexture = 0;
	// this.vboNormal = 0;
	// this.vao = 0;
	//
	// this.renderContext=null;
};

MeshRenderer.prototype = new Component();
MeshRenderer.prototype.constructor = MeshRenderer;

MeshRenderer.prototype.getMesh = function (){
	return this.mesh;
};

MeshRenderer.prototype.setMesh = function (mesh){
	this.mesh=mesh;
};

MeshRenderer.prototype.getMaterial = function (){
	return this.material;
};

MeshRenderer.prototype.setMaterial = function (material){
	this.material=material;
};

MeshRenderer.prototype.getRadius = function () {

	var t = this.gameObject.getComponent(Transform);
	var scale = t.getScale();

	var max = this.mesh.getMax();

	var width = max.x * scale.x;
	var height = max.y * scale.y;
	var depth = max.z * scale.z;

	return Math.sqrt(( width * width ) + (  height * height ) + (  depth * depth )) / 2.0;
};

//
// MeshRenderer.prototype.getRenderContext = function (){
// 	return this.renderContext;
// };
//
// MeshRenderer.prototype.setRenderContext = function (renderContext){
// 	this.renderContext=renderContext;
// };
//
// MeshRenderer.prototype.bind = function () {
//
// 	this.material.bind();
//
// 	// create VAO
// 	this.vao = vao_ext.createVertexArrayOES();
// 	vao_ext.bindVertexArrayOES(this.vao);
//
//
// 	// POSITION
// 	gl.enableVertexAttribArray(0);
// 	this.vboPosition = gl.createBuffer();
// 	gl.bindBuffer(gl.ARRAY_BUFFER, this.vboPosition);
// 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.mesh.getVerticesData()), gl.STATIC_DRAW); // TODO DYNAMIC
// 	gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
//
//
// 	// TEXTURE
// 	gl.enableVertexAttribArray(1);
// 	this.vboTexture = gl.createBuffer();
// 	gl.bindBuffer(gl.ARRAY_BUFFER, this.vboTexture);
// 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.mesh.getTexCoordData()), gl.STATIC_DRAW);
// 	gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
//
//
// 	// COLOR
// 	gl.enableVertexAttribArray(2);
// 	this.vboColor = gl.createBuffer();
// 	gl.bindBuffer(gl.ARRAY_BUFFER, this.vboColor);
// 	var color = new Array(0);
// 	for (var i = 0; i < this.mesh.getVerticesData().length/4; i++) {
// 	color = color.concat(this.material.color);
// 	}
// 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW); // TODO DYNAMIC
// 	gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 0, 0);
//
//
// 	// NORMALS
// 	gl.enableVertexAttribArray(3);
// 	this.vboNormal = gl.createBuffer();
// 	gl.bindBuffer(gl.ARRAY_BUFFER, this.vboNormal);
// 	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( this.mesh.getNormalsData()), gl.STATIC_DRAW);
// 	gl.vertexAttribPointer(3, 4, gl.FLOAT, false, 0, 0);
//
//
// 	// ELEMENTS
// 	this.vboElemIndices = gl.createBuffer();
// 	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vboElemIndices);
// 	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.mesh.getFacesData()), gl.STATIC_DRAW);
//
// 	// Finised setting up VAO
// 	vao_ext.bindVertexArrayOES(null);
//
// 	var children = this.getChildren();
// 	for (var i = 0; i < children.length; i++) {
// 	children[i].bind();
// 	}
//
// };
//
// MeshRenderer.prototype.update = function (renderContext) {
// 	this.renderContext = renderContext;
//
// 	this.material.enable();
//
// 	this.material.getShader().addMatrix(this.gameObject.getComponent(Transform).getMatrix().transpose(), "transformationMatrix");
// 	this.material.getShader().addMatrix(this.renderContext.getCamera().getProjectionMatrix().transpose(), "projectionMatrix");
// 	this.material.getShader().addMatrix(this.renderContext.getCamera().getViewMatrix().transpose(), "viewMatrix");
//
// 	this.material.disable();
//
// 	var children = this.getChildren();
// 	for (var i = 0; i < children.length; i++) {
// 	children[i].update(renderContext);
// 	}
// };
//
// MeshRenderer.prototype.render = function (){
//
// 	this.material.enable();
//
// 	// this.material.getShader().addInt(0,"index");
//
// 	vao_ext.bindVertexArrayOES(this.vao);
//
// 	gl.enableVertexAttribArray(0);
//
// 	if(this.mesh.hasTexture())
// 	gl.enableVertexAttribArray(1);
//
// 	gl.enableVertexAttribArray(2);
// 	gl.enableVertexAttribArray(3);
//
// 	// instance_ext.drawElementsInstancedANGLE(gl.TRIANGLES, this.mesh.getNumFaces()*3, gl.UNSIGNED_SHORT, 0, 1);
// 	gl.drawElements(gl.TRIANGLES, this.mesh.getNumFaces()*3, gl.UNSIGNED_SHORT, 0); // TODO GL_UNSIGNED_BYTE --> 2^8 --> max. 256 vertices!! WARNING
//
// 	this.material.disable();
//
// 	gl.disableVertexAttribArray(0);
// 	gl.disableVertexAttribArray(1);
// 	gl.disableVertexAttribArray(2);
// 	gl.disableVertexAttribArray(3);
//
// 	gl.bindTexture(gl.TEXTURE_2D, null);
//
// 	var children = this.getChildren();
// 	for (var i = 0; i < children.length; i++) {
// 	children[i].render();
// 	}
//
// };
