var DigiviceLogic = function () {
  Script.call(this);

  this.timeStep = 0.1;
  this.lastTime = 0;

  this.w = 1/8;
  this.h = 1/6;

  // this.screenNames = ["status","map","card","medical","vs"];
  this.screenNames = ["status","map","medical","vs"];
  this.screens = [];
  this.currentScreen = 0;

  this.currentDigimon = 0;
  this.currentEvolution = 0;
  this.digimons = [];

  this.MAX_SCREENS = this.screenNames.length;
  this.MAX_EVOLUTIONS = 6;
  this.MAX_DIGIMONS = 8;

  this.player = null;
};

DigiviceLogic.prototype = new Script();
DigiviceLogic.prototype.constructor = DigiviceLogic;

// 1 right, -1 left
DigiviceLogic.prototype.slideScreens = function (direction) {

  var newScreen = this.currentScreen + direction;

  if(newScreen >= 0 && newScreen < (this.MAX_SCREENS)){

    for (var i = 0; i < this.screenNames.length; i++) {
      this.screens[i].getComponent(Transform).translate(new Vector2(-direction,0,0));
    }

    this.screens[this.currentScreen].getComponent(SpriteRenderer).disable();
    this.currentScreen += direction;
    this.screens[this.currentScreen].getComponent(SpriteRenderer).enable();
  }
};

DigiviceLogic.prototype.start = function () {

  for (var i = 0; i < this.screenNames.length; i++) {
    var screen = Thief.sprite.begin("test/res/digi/"+ this.screenNames[i] +".png", new Vector2(i,0), 1, true).end();
    screen.getComponent(SpriteRenderer).disable();
    this.screens.push(screen);
  }

  this.screens[0].getComponent(SpriteRenderer).enable();

  // for (var i = 0; i < this.MAX_DIGIMONS; i++) {
  //   this.digimons[i] = [];
  //   for (var j = 0; j < this.MAX_EVOLUTIONS; j++) {
  //
  //     var digimon = Thief.sprite.begin("test/res/digi/digi1.png", new Vector2(0,0.1), 0.5, true).
  //       setTextureRegion(new Vector2(i*w,j*h),w,h).
  //     end();
  //
  //     digimon.getComponent(SpriteRenderer).disable();
  //
  //     this.digimons[i].push(digimon);
  //   }
  // }

  this.player = Thief.sprite.begin("test/res/digi/digi1.png", new Vector2(0,0.1), 0.5, true).
    setTextureRegion(new Vector2(this.currentDigimon*this.w,this.currentEvolution*this.h),this.w,this.h).
  end();

  // this.player = this.digimons[0];


};

DigiviceLogic.prototype.update = function (){

  var now = Time.now();

  if((now-this.lastTime) > this.timeStep){

    if (Input.getKey() === 37) {
      // LEFT
      // this.slideScreens(-1);
      this.currentDigimon--;


    }else if (Input.getKey() === 39) {
      // RIGHT
      // this.slideScreens(1);
      this.currentDigimon++;


    }else if (Input.getKey() === 38) {
      // UP
      this.currentEvolution--;

    }else if (Input.getKey() === 40) {
      // DOWN
      this.currentEvolution++;

    }

    this.player.getComponent(SpriteRenderer).
    setRegion(new Vector2(this.currentDigimon*this.w,this.currentEvolution*this.h),this.w,this.h);


    this.lastTime = now;
  }

};
