
/**
* @class
* @classdesc This class offers line rendering.
*/
var DebugRenderer = function (){
};

DebugRenderer.shader = null;
DebugRenderer.transformationMatrix = Matrix4.identity();

DebugRenderer.list = [];

//----------------------------------------------------------------------

/**
* Returns a list of renderers.
* @returns {Array} The renderers.
*/
DebugRenderer.getRenderers = function () {
    return DebugRenderer.list;
};

//----------------------------------------------------------------------

/**
* Clears the list of renderers.
*/
DebugRenderer.clear = function () {
    DebugRenderer.list = [];
};

//----------------------------------------------------------------------

/**
* Inits the debug renderer.
*/
DebugRenderer.init = function() {
    DebugRenderer.shader = Shader.create('debug');

    DebugRenderer.shader.compile();
};

//----------------------------------------------------------------------

/**
* Sets the transformation matrix. If the matrix is null, the transformation
* matrix is setted to Identity.
* @param {Matrix4} matrix The matrix.
*/
DebugRenderer.setTransformationMatrix = function (matrix) {
    if(matrix === null)
        DebugRenderer.transformationMatrix = Matrix4.identity();
    else
        DebugRenderer.transformationMatrix = matrix;
};

//----------------------------------------------------------------------

/**
* Updates the debug renderer.
* @param {RenderContext} renderContext The render context.
*/
DebugRenderer.update = function (renderContext) {
	DebugRenderer.shader.enable();

	DebugRenderer.shader.addMatrix(renderContext.getCamera().getProjectionMatrix().transpose(), "projectionMatrix");
	DebugRenderer.shader.addMatrix(renderContext.getCamera().getViewMatrix().transpose(), "viewMatrix");

	DebugRenderer.shader.disable();

};

//----------------------------------------------------------------------

/**
* Draws a line.
* @param {Vector3} start The start.
* @param {Vector3} end The end.
* @param {Color} color The color.
*/
DebugRenderer.drawLine = function (start,end,color){
    DebugRenderer.list.push(new LineRenderer(DebugRenderer.shader,start,end,color,this.transformationMatrix));
};

//----------------------------------------------------------------------
