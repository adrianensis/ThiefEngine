var CameraLogic = function (player) {
    Script.call(this);
    this.v = 5;
    this.player = player;
};

CameraLogic.prototype = new Script();
CameraLogic.prototype.constructor = CameraLogic;


CameraLogic.prototype.start = function () {

};

CameraLogic.prototype.update = function (){


    var t = this.gameObject.getTransform();

    var newCamPos = this.player.getTransform().position.cpy();
    newCamPos.z = t.getPosition().z;

    // t.setPosition(newCamPos);

    if (Input.getKey() === 37) {
        // LEFT

        // t.lookAt(new Vector3(-10,0,0));

        // t.translate(new Vector2(-this.v*Time.deltaTime(),0));

    }
    else if (Input.getKey() === 39) {
        // RIGHT

        // t.lookAt(new Vector3(10,0,0));

        // t.translate(new Vector2(this.v*Time.deltaTime(),0));

   }else if (Input.getKey() === 38) {
        // UP

        // t.lookAt(new Vector3(0,10,0));

        // t.translate(new Vector2(0,this.v*Time.deltaTime()));

    }else if (Input.getKey() === 40) {
        // DOWN

        // t.lookAt(new Vector3(0,-10,0));

        // t.translate(new Vector2(0,-this.v*Time.deltaTime()));

    }

    // t.lookAt(new Vector3(0,0,0));

};
