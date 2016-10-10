gl = null;

/**
* @class
* @classdesc This class manage the graphics of the application.
*/
var RenderEngine = function (){

  this.color = new Color(0,0,0,1);
  this.numLayers = 0;

  var canvas = document.getElementById("glcanvas");

  // ########################################
  // PATCH
  // http://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
  // ########################################
  var realToCSSPixels = window.devicePixelRatio || 1; // FOR HD RETINA SCREEN

  // Lookup the size the browser is displaying the canvas in CSS pixels
  // and compute a size needed to make our drawingbuffer match it in
  // device pixels.
  var displayWidth  = Math.floor(canvas.clientWidth  * realToCSSPixels);
  var displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

  canvas.width = displayWidth;
  canvas.height = displayHeight;

  // ########################################

  try {
    // Try to grab the standard context. If it fails, fallback to experimental.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  } catch(e) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
  }

  // If we don't have a GL context.
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
    gl = null;
  }

  vao_ext = gl.getExtension ("OES_vertex_array_object");
  instance_ext = gl.getExtension("ANGLE_instanced_arrays");

  if (!vao_ext) {
    alert("ERROR: Your browser does not support WebGL 'VAO' extension");
  }

  if (!instance_ext) {
    alert("ERROR: Your browser does not support WebGL 'ANGLE Instanced Rendering' extension");
  }

  // Only continue if WebGL is available and working

  if (gl) {

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(this.color.r, this.color.g, this.color.b, this.color.a); // Set clear color.

    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things
    gl.enable(gl.CULL_FACE); // BACK by default
    gl.cullFace(gl.BACK);

    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.enable(gl.BLEND);

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Clear the color and the depth buffer.
  }

    this.clear();

    DebugRenderer.init();
};

//----------------------------------------------------------------------

/**
* Clears all the renderers and the render context.
*/
RenderEngine.prototype.clear = function (){
  this.textureBatches = {};
  this.noTextureBatch = new SpriteBatch(new Material());
  this.renderContext = null;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
RenderEngine.prototype.setClearColor = function (color){
  this.color.r = color.r;
  this.color.g = color.g;
  this.color.b = color.b;
  this.color.a = color.a;

  gl.clearColor(this.color.r, this.color.g, this.color.b, this.color.a);
};

//----------------------------------------------------------------------

/**
* Adds a list of renderers.
* @param {Array} renderers The renderers.
*/
RenderEngine.prototype.addRenderers = function (renderers){

  for (var renderer of renderers) {

    this.numLayers = Math.max(this.numLayers,renderer.getLayer()); // Always check the max number of layers.


    // BATCHING BY TEXTURE

    var tex = renderer.getMaterial().getTexture();

    // if renderer has a texture.
    if(tex !== null){

      var texName = tex.getName();

      // if the batch exists.
      if((texName in this.textureBatches)){
          this.textureBatches[texName].add(renderer);
      }else {
          this.textureBatches[texName] = new SpriteBatch(renderer.getMaterial());
          this.textureBatches[texName].add(renderer);
      }

    }else // if renderer has not a texture.
      this.noTextureBatch.add(renderer);

  }
};



//----------------------------------------------------------------------

/**
* Returns the render context.
* @returns {renderContext} The render context.
*/
RenderEngine.prototype.getRenderContext = function (){
	return this.renderContext;
};

//----------------------------------------------------------------------

/**
* Sets the render context.
* @param {renderContext} renderContext The render context.
*/
RenderEngine.prototype.setRenderContext = function (renderContext){
	this.renderContext=renderContext;
};

//----------------------------------------------------------------------

/**
* Updates the render engine.
*/
RenderEngine.prototype.update = function (){

  // RE-BUILD frustum
  this.renderContext.getCamera().getFrustum().build();

  for (var i in this.textureBatches)
    this.textureBatches[i].update(this.renderContext);

  this.noTextureBatch.update(this.renderContext);

  DebugRenderer.update(this.renderContext);

};

//----------------------------------------------------------------------

/**
* Binds all the batches.
*/
RenderEngine.prototype.bind = function (){

  for (var i in this.textureBatches)
    this.textureBatches[i].bind();

  this.noTextureBatch.bind();
};

//----------------------------------------------------------------------

/**
* Renders all the batches and the debug renderer.
*/
RenderEngine.prototype.render = function (){

  // TODO: culling ????

  for (var i = 0; i <= this.numLayers; i++) {
    for (var j in this.textureBatches)
      this.textureBatches[j].render(i);
      this.noTextureBatch.render(i);
  }

  DebugRenderer.render();
  DebugRenderer.clear();

};

//----------------------------------------------------------------------
