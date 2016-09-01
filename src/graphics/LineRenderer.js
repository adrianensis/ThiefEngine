var LineRenderer = function (shader,start,end,color, transformationMatrix){
    this.shader = shader;
    this.color = color;

    this.transformationMatrix = transformationMatrix;

    this.start = start.cpy();
    this.end = end.cpy();

    this.start.w = 1;
    this.end.w = 1;

    this.vertices = this.start.toArray().concat(this.end.toArray());

    this.colors = this.color.vec.toArray().concat(this.color.vec.toArray());

    this.elem = [];
    this.elem[0] = 0;
    this.elem[1] = 1;


    this.vboPosition = 0;
  	this.vboColor = 0;
  	this.vboElemIndices = 0;

  	this.vao = 0;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
LineRenderer.prototype.bind = function () {

    this.vao = vao_ext.createVertexArrayOES();

    vao_ext.bindVertexArrayOES(this.vao);

    gl.enableVertexAttribArray(0);

  	// Create some buffers
  	this.vboPosition = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, this.vboPosition);
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW); // TODO DYNAMIC
  	gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);

  	gl.enableVertexAttribArray(1);

    this.vboColor = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, this.vboColor);

  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW); // TODO DYNAMIC
  	gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);


      this.vboElemIndices = gl.createBuffer();

  	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vboElemIndices);
  	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.elem), gl.STATIC_DRAW);

    vao_ext.bindVertexArrayOES(null);
};

//----------------------------------------------------------------------


/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
LineRenderer.prototype.render = function () {
    this.shader.enable();

    this.shader.addMatrix(this.transformationMatrix.transpose(), "transformationMatrix");

  	vao_ext.bindVertexArrayOES(this.vao);

  	gl.enableVertexAttribArray(0);
  	gl.enableVertexAttribArray(1);

  	gl.drawElements(gl.LINES, 2, gl.UNSIGNED_SHORT, 0);

      this.shader.disable();

  	gl.disableVertexAttribArray(0);
  	gl.disableVertexAttribArray(1);

};

//----------------------------------------------------------------------
