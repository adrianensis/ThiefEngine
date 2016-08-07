var Input = function (){

    var onKeyDown = function(event){

        Input.key = event.keyCode;

        // this allow reload page with F5
        if(event.keyCode !== 116)
            event.preventDefault();

    };

    var onKeyUp = function(event){

        Input.key = -1;

        event.preventDefault();

    };

    var onMouseMove = function(event){

      var canvas = document.getElementById("glcanvas");


        Input.cursorPos.x = event.clientX;
        Input.cursorPos.y = event.clientY * -1;

        Input.cursorPos.x -= canvas.width/2;
        Input.cursorPos.y += canvas.height/2;


        event.preventDefault();

    };

    var onMouseDown = function(event){

        // Input.cursorPos.x = event.clientX;
        // Input.cursorPos.y = event.clientY;
        Input.button = event.button;

        event.preventDefault();

    };

    var onMouseUp = function(event){

        // Input.cursorPos.x = event.clientX;
        // Input.cursorPos.y = event.clientY;
        Input.button = -1;

        event.preventDefault();

    };

    document.addEventListener("keydown", onKeyDown,false);
    document.addEventListener("keyup", onKeyUp,false);

    var canvas = document.getElementById("glcanvas");
    canvas.addEventListener("mousedown", onMouseDown,false);
    canvas.addEventListener("mouseup", onMouseUp,false);
    canvas.addEventListener("mousemove", onMouseMove,false);

    canvas.addEventListener("contextmenu", function(event){
        event.preventDefault();
        return false;
    },false);

};

Input.key = -1;
Input.button = -1;

Input.cursorPos = new Vector2(0,0);

//----------------------------------------------------------------------

Input.getKey = function (){
	return Input.key;
};

//----------------------------------------------------------------------

Input.getButton = function (){
	return Input.button;
};

//----------------------------------------------------------------------

Input.getCursorPosition = function (){

	return Input.cursorPos;
};

//----------------------------------------------------------------------

// TODO: Implement input stack, implement key codes, char?
