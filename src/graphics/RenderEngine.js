var RenderEngine = function (){

  this.color = new Color(0,0,0,1);

  var canvas = document.getElementById("glcanvas");

  var realToCSSPixels = window.devicePixelRatio || 1; // FOR HD RETINA SCREEN

  // Lookup the size the browser is displaying the canvas in CSS pixels
  // and compute a size needed to make our drawingbuffer match it in
  // device pixels.
  var displayWidth  = Math.floor(canvas.clientWidth  * realToCSSPixels);
  var displayHeight = Math.floor(canvas.clientHeight * realToCSSPixels);

  canvas.width = displayWidth;
  canvas.height = displayHeight;

  gl = null;

  try {
  // Try to grab the standard context. If it fails, fallback to experimental.
  gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
// console.log("MAX_TEXTURE_SIZE: " + gl.getParameter(gl.MAX_TEXTURE_SIZE));
  }
  catch(e) {
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

    //   console.log(gl.getParameter(gl.MAX_TEXTURE_SIZE));
    //   console.log(gl.DEPTH_FUNC);

    // canvas.width  = window.innerWidth;
    // canvas.height = window.innerHeight;

    // gl.viewport(0, 0, canvas.width, canvas.height);
    //   gl.viewport(0, 0, 1, 1);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(this.color.r, this.color.g, this.color.b, this.color.a);                      // Set clear color to black, fully opaque

    gl.enable(gl.DEPTH_TEST);                               // Enable depth testing
    gl.depthFunc(gl.LEQUAL);                                // Near things obscure far things
    gl.enable(gl.CULL_FACE); // BACK by default
    gl.cullFace(gl.BACK);

    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.enable(gl.BLEND);

    //gl.enable(gl.TEXTURING);
    //gl.enable(gl.TEXTURE_2D);

    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // Clear the color and the depth buffer.
  }

    // this.renderers = []; // TODO: remove
    this.clear();
    // this.noTextureIndex = 1;

    DebugRenderer.init();
};

//----------------------------------------------------------------------

RenderEngine.prototype.setClearColor = function (color){
  this.color.r = color.r;
  this.color.g = color.g;
  this.color.b = color.b;
  this.color.a = color.a;

  gl.clearColor(this.color.r, this.color.g, this.color.b, this.color.a);
};

//----------------------------------------------------------------------

RenderEngine.prototype.addRenderers = function (renderers){

  for (var renderer of renderers) {

    var tex = renderer.getMaterial().getTexture();

    if(tex !== null){

      var texName = tex.getName();

      if((texName in this.textureBatches)){
          this.textureBatches[texName].add(renderer);
      }else {
          this.textureBatches[texName] = new SpriteBatch(renderer.getMaterial());
          this.textureBatches[texName].add(renderer);
      }

    }else
      this.noTextureBatch.add(renderer);

  }
};

//----------------------------------------------------------------------

RenderEngine.prototype.clear = function (){
  this.textureBatches = {};
  this.noTextureBatch = new SpriteBatch(new Material());
  this.renderContext = null;
};

//----------------------------------------------------------------------

RenderEngine.prototype.getRenderContext = function (){
	return this.renderContext;
};

//----------------------------------------------------------------------

RenderEngine.prototype.setRenderContext = function (renderContext){
	this.renderContext=renderContext;
};

//----------------------------------------------------------------------

RenderEngine.prototype.update = function (){

  // RE-BUILD frustum
  this.renderContext.getCamera().getFrustum().build();

  // for (var renderer of this.renderers)
  //     renderer.update(this.renderContext);

  for (var i in this.textureBatches)
    this.textureBatches[i].update(this.renderContext);


  this.noTextureBatch.update(this.renderContext);

  DebugRenderer.update(this.renderContext);

};

//----------------------------------------------------------------------

RenderEngine.prototype.bind = function (){

  // for (var renderer of this.renderers){
  //     renderer.bind();
  // }


  // TODO IF there are new batches THEN bind !!!!

  for (var i in this.textureBatches)
    this.textureBatches[i].bind();

  this.noTextureBatch.bind();
};

//----------------------------------------------------------------------

RenderEngine.prototype.render = function (){


  // for (var renderer of this.renderers){
  //     renderer.render();
  // }

  // TODO: culling ????


  for (var i in this.textureBatches){
    // console.log(this.batches[i].material.texture.name);
    this.textureBatches[i].render();
  }


  this.noTextureBatch.render();


  for (var renderer of DebugRenderer.getRenderers()){
    renderer.bind();
    renderer.render();
  }

  DebugRenderer.clear();

};

//----------------------------------------------------------------------
