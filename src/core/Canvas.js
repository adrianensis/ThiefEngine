var Canvas = {};

Canvas.canvas = null;

Canvas.get = function() {
  if(Canvas.canvas === null)
    Canvas.canvas = document.getElementById("glcanvas");
  return Canvas.canvas;
};
