var GameLogic = function () {
    Script.call(this);
    this.timer = 1;
    this.t0 = 0;
    this.t1 = 0;

    this.MAX_MOVES = 4;
    this.moves = 0;
};

GameLogic.prototype = new Script();
GameLogic.prototype.constructor = GameLogic;

GameLogic.prototype.update = function (){
  if((Date.now() - this.t0)/1000 > 0.2){

    if (Input.getKey() === 65) {

      if(this.moves > 0){
        this.moves--;
        this.t0 = Date.now();
        this.gameObject.getTransform().translate(new Vector2(3.1,0));
      }

    }

    else if (Input.getKey() === 68) {

      if(this.moves < this.MAX_MOVES){
        this.moves++;
        this.t0 = Date.now();
        this.gameObject.getTransform().translate(new Vector2(-3.1,0));
      }
      
    }

  }
};
