var CameraLogic = function () {
    Script.call(this);
    this.foo = true;
};

CameraLogic.prototype = new Script();
CameraLogic.prototype.constructor = CameraLogic;


CameraLogic.prototype.start = function () {

};

CameraLogic.prototype.update = function (){



    if (Input.isKeyPressed(32)) {
      // SPACE
      // if(this.foo)
      //   Thief.setScene("test");
      // else
      //   Thief.setScene("test2");
      //
      // this.foo = ! this.foo;

    }else if (Input.getKey() === 37) {
        // LEFT

    }
    else if (Input.getKey() === 39) {
        // RIGHT

   }else if (Input.getKey() === 38) {
        // UP

    }else if (Input.getKey() === 40) {
        // DOWN

    }


};
