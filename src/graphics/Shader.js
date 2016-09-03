var Shader = function (){
    this.programID = gl.createProgram();
    this.vertShaderID = 0;
    this.fragShaderID = 0;
    this.compiled = false;
};

Shader.defaultShader = null;
Shader.debugShader = null;


// SHADERS

Shader.vs =
"uniform mat4 projectionMatrix;"+
"uniform mat4 viewMatrix;"+
"uniform mat4 transformationMatrix;"+

"attribute vec4 position;"+
"attribute vec4 color; "+ // REMEMBER: IF AN ATTRIBUTE IS NEVER USED getAttribLocation RETURNS -1 !!!
"attribute vec2 texcoord;"+

"varying lowp vec4 vColor;"+
"varying vec2 vTexcoord;"+

"void main() {"+
"  gl_Position = projectionMatrix*viewMatrix*transformationMatrix*position;"+

  // Pass the texcoord to the fragment shader.
"  vTexcoord = texcoord;"+
"  vColor = color;"+
"}";

Shader.fs=
"precision mediump float;"+

// Passed in from the vertex shader.
"varying vec2 vTexcoord;"+
"varying lowp vec4 vColor;"+
"varying lowp vec4 vAlphaColor;"+

// The texture.
"uniform int hasTexture;"+
"uniform sampler2D uSampler;"+
"uniform vec4 alphacolor;"+ // color used as transparent

"uniform float regionX;"+
"uniform float regionY;"+
"uniform float regionWidth;"+
"uniform float regionHeight;"+


"uniform float animationX;"+
"uniform float animationY;"+
"uniform float animationWidth;"+
"uniform float animationHeight;"+

"void main() {"+

"    if(hasTexture == 1){"+

"        vec2 aux_texcoord = vTexcoord;"+

"        aux_texcoord.x = aux_texcoord.x*regionWidth + regionX;"+
"        aux_texcoord.y = aux_texcoord.y*regionHeight + regionY;"+

"        aux_texcoord.x = aux_texcoord.x*animationWidth + animationX;"+
"        aux_texcoord.y = aux_texcoord.y*animationHeight + animationY;"+

"        vec4 texColor = texture2D(uSampler, aux_texcoord);"+

"        gl_FragColor = texColor + vColor;"+

"    }else{"+
"        gl_FragColor = vColor;"+
"    }"+

// Alpha

"    if(gl_FragColor.r == alphacolor.r && gl_FragColor.g == alphacolor.g && gl_FragColor.b == alphacolor.b && gl_FragColor.a == alphacolor.a){"+
"        gl_FragColor.a = 0.0;"+
"    }"+
"}";

Shader.vsDebug=
"uniform mat4 projectionMatrix;"+
"uniform mat4 viewMatrix;"+
"uniform mat4 transformationMatrix;"+

"attribute vec4 position;"+
"attribute vec4 color;"+ // // IF AN ATTRIBUTE IS NEVER USED getAttribLocation RETURNS -1 !!!

"varying lowp vec4 vColor;"+

"void main() {"+
"    gl_Position = projectionMatrix*viewMatrix*transformationMatrix*position;"+
"    vColor = color;"+ // Pass the color to the fragment shader.
"}"

Shader.fsDebug=
"precision mediump float;"+

"varying lowp vec4 vColor;"+ // Passed in from the vertex shader.

"void main() {"+
"    gl_FragColor = vColor;"+
"}";

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.isCompiled = function (){
	return this.compiled;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.getProgramid = function (){
	return this.programID;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.setProgramid = function (programID){
	this.programID=programID;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.getVertshaderid = function (){
	return this.vertShaderID;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.setVertshaderid = function (vertShaderID){
	this.vertShaderID=vertShaderID;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.getFragshaderid = function (){
	return this.fragShaderID;
};

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.setFragshaderid = function (fragShaderID){
	this.fragShaderID=fragShaderID;
};

//----------------------------------------------------------------------

// Method definition goes here.
/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.addVertexShader = function (sourceText){

  var shaderID = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(shaderID,sourceText);

  this.vertShaderID = shaderID;
};

//----------------------------------------------------------------------

// Method definition goes here.
/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.addFragmentShader = function (sourceText){

  var shaderID = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(shaderID,sourceText);

  this.fragShaderID = shaderID;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.addSource = function (type,name){
  var src = document.getElementById(name).text;

  var shaderID = gl.createShader(type);
  gl.shaderSource(shaderID,src);

  if(type == gl.VERTEX_SHADER)
      this.vertShaderID = shaderID;
  else
      this.fragShaderID = shaderID;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.addAttribute = function (location,name){
  gl.bindAttribLocation(this. programID, location, name);
};

//----------------------------------------------------------------------

// Method definition goes here.
/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.addMatrix = function (matrix,name){
  matrixLocation = gl.getUniformLocation(this.programID, name);
  gl.uniformMatrix4fv(matrixLocation, false, new Float32Array(matrix.getData()));
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.addMatrixArray = function (matrixArray,name){
  matrixLocation = gl.getUniformLocation(this.programID, name);

  var raw = [];
  for (var m of matrixArray) {
      raw = raw.concat(matrix.getData());
  }

  gl.uniformMatrix4fv(matrixLocation, false, new Float32Array(raw));
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.addInt = function (value, name){
  valueLocation = gl.getUniformLocation(this.programID, name);
  gl.uniform1i(valueLocation, value);
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.addFloat = function (value, name){
  valueLocation = gl.getUniformLocation(this.programID, name);
  gl.uniform1f(valueLocation, value);
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.addFloatVector = function (value, name){
  valueLocation = gl.getUniformLocation(this.programID, name);
  gl.uniform4fv(valueLocation, new Float32Array(value));
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.compile = function (){
  if( ! this.isCompiled()){
    gl.compileShader(this.fragShaderID);

    var compiled = gl.getShaderParameter(this.fragShaderID, gl.COMPILE_STATUS);
    //    console.log('Shader compiled successfully: ' + compiled); // TODO uncomment console.log()
    var compilationLog = gl.getShaderInfoLog(this.fragShaderID);
    //    console.log('Shader compiler log: ' + compilationLog);

    gl.compileShader(this.vertShaderID);

    compiled = gl.getShaderParameter(this.vertShaderID, gl.COMPILE_STATUS);
    //    console.log('Shader compiled successfully: ' + compiled);
    compilationLog = gl.getShaderInfoLog(this.vertShaderID);
    //    console.log('Shader compiler log: ' + compilationLog);

    gl.attachShader(this.programID,this.fragShaderID);
    gl.attachShader(this.programID,this.vertShaderID);
    gl.linkProgram(this.programID);

    this.compiled = true;
  }
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.enable = function (){
  gl.useProgram(this.programID);
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
Shader.prototype.disable = function (){
  gl.useProgram(null);
};

//----------------------------------------------------------------------

Shader.create = function(typeStr){

  var shader = null;

  if(typeStr === 'default'){

    if(Shader.defaultShader === null){

      Shader.defaultShader = new Shader();

      Shader.defaultShader.addVertexShader(Shader.vs);
      Shader.defaultShader.addFragmentShader(Shader.fs);
      Shader.defaultShader.addAttribute(0, "position");

      //REMEMBER: IF AN ATTRIBUTE IS NEVER USED getAttribLocation RETURNS -1 !!!
      Shader.defaultShader.addAttribute(2, "color");
      Shader.defaultShader.addAttribute(1, "texcoord");
    }

    shader = Shader.defaultShader;

  }else if(typeStr === 'debug'){

    if(Shader.debugShader === null){

      Shader.debugShader = new Shader();

      Shader.debugShader.addVertexShader(Shader.vsDebug);
      Shader.debugShader.addFragmentShader(Shader.fsDebug);
      Shader.debugShader.addAttribute(0, "position");

      //REMEMBER: IF AN ATTRIBUTE IS NEVER USED getAttribLocation RETURNS -1 !!!
      Shader.debugShader.addAttribute(1, "color");
    }

    shader = Shader.debugShader;
  }

  return shader;
};

//----------------------------------------------------------------------
