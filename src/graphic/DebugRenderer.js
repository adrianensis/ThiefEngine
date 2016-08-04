var DebugRenderer = function (){
};

DebugRenderer.shader = null;
DebugRenderer.transformationMatrix = Matrix4.identity();

DebugRenderer.list = [];

DebugRenderer.getRenderers = function () {
    return DebugRenderer.list;
};

DebugRenderer.clear = function () {
    DebugRenderer.list = [];
};

DebugRenderer.init = function() {
    DebugRenderer.shader = Shader.create('debug');

    DebugRenderer.shader.compile();
};

DebugRenderer.setTransformationMatrix = function (matrix) {
    if(matrix === null)
        DebugRenderer.transformationMatrix = Matrix4.identity();
    else
        DebugRenderer.transformationMatrix = matrix;
}

DebugRenderer.update = function (renderContext) {
	DebugRenderer.shader.enable();

	// // Camera matrix
	// glm::mat4 view = glm::lookAt(
	// 	glm::vec3(4,3,3), // Camera is at (4,3,3), in World Space
	// 	glm::vec3(0,0,0), // and looks at the origin
	// 	glm::vec3(0,1,0)  // Head is up (set to 0,-1,0 to look upside-down)
	// );

	// TODO fail --> this.gameObject.getScene().getCamera();

	// if(this.gameObject.getTransform().hasChanged()){
	//
	// }

	DebugRenderer.shader.addMatrix(renderContext.getCamera().getProjectionMatrix().transpose(), "projectionMatrix");
	// this.material.getShader().addMatrix(Matrix4.identity(), "viewMatrix");
	DebugRenderer.shader.addMatrix(renderContext.getCamera().getViewMatrix().transpose(), "viewMatrix");

	DebugRenderer.shader.disable();

};

DebugRenderer.drawLine = function (start,end,color){

    DebugRenderer.list.push(new LineRenderer(DebugRenderer.shader,start,end,color,this.transformationMatrix));
};
