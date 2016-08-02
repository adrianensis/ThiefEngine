var DigiviceLogic = function () {
    Script.call(this);
    this.v = 2;

};

DigiviceLogic.prototype = new Script();
DigiviceLogic.prototype.constructor = DigiviceLogic;


DigiviceLogic.prototype.start = function () {

  // var w = 1/8;
  // var h = 1/6;
  // Thief.sprite.begin("test/res/digi/digi1.png", new Vector2(2,0.1), 0.5, true).
  //   setTextureRegion(new Vector2((1/8),(1/6)),1/8,1/6).
  // end();
};

DigiviceLogic.prototype.update = function (){

    if (Input.getKey() === 37) {
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
