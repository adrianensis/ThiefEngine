var DigiviceLogic = function () {
  Script.call(this);

  // TIMER
  this.timeStep = 0.1;
  this.lastTime = 0;

  // SCREENS
  // this.screenNames = ["status","map","card","medical","vs"];
  this.screenNames = ["status","map","medical","vs"];
  this.screens = [];
  this.MAX_SCREENS = this.screenNames.length;
  this.currentScreen = 0;

  // SPRITES
  this.w = 1/8;
  this.h = 1/6;
  this.MAX_EVOLUTIONS = 6;
  this.MAX_DIGIMONS = 8;
  this.currentDigimon = 0;
  this.currentEvolution = 0;
  this.digimons = [];

  // MAP
  this.wMap = 1/2;
  this.hMap = 1/2;
  this.MAX_MAPS = 4;
  this.stepsByMap = [500,500,500,500]; // TODO: steps to run for each map.
  this.currentMap = 0;
  this.currentSteps = this.stepsByMap[this.currentMap];
  this.maps = [];

  // MEDICAL
  this.heartIcon = null;

  // FONT
  this.wFont = 1/16;
  this.hFont = 1/16;
  this.words = {};
  this.distanceText = [];








  this.digimon = null;
};

DigiviceLogic.prototype = new Script();
DigiviceLogic.prototype.constructor = DigiviceLogic;


DigiviceLogic.prototype.displayWord = function (word,pos,size) {

  for (var i = 0; i < this.distanceText.length; i++) {

    this.distanceText[i].delete();
  }

  this.distanceText = [];

  if(this.words[word] === undefined || this.words[word].length === 0){

    this.words[word] = [];

    for (var k = 0, len = word.length; k < len; k++) {

      var c = word.charAt(k).charCodeAt(0);

      var isLetter = (c >= 97) && (c <= 122);



      var letterPos = pos.cpy().add(new Vector2(k*0.1,0));



      if(isLetter){

        c -= "a".charCodeAt(0);

        if(c < 15){
          // for (var i = 0; i < 15; i++) {
            var char = Thief.spriteBuilder.begin("test/res/digi/font.png", letterPos, size, true).
              setTextureRegion(new Vector2(1*this.wFont+c*this.wFont,9*this.hFont),this.wFont,this.hFont).
            end();

            // char.getComponent(SpriteRenderer).disable();
            // this.chars.push(char);

            this.words[word].push(char);

          // }
        }else{
          // for (var i = 0; i < 11; i++) {
            var char = Thief.spriteBuilder.begin("test/res/digi/font.png", letterPos, size, true).
              setTextureRegion(new Vector2(0*this.wFont+(c-15)*this.wFont,8*this.hFont),this.wFont,this.hFont).
            end();

            // char.getComponent(SpriteRenderer).disable();
            // this.chars.push(char);

            this.words[word].push(char);
          // }
        }
      }else{

        c -= "0".charCodeAt(0);

        // for (var i = 0; i < 10; i++) {
          var number = Thief.spriteBuilder.begin("test/res/digi/font.png", letterPos, size, true).
            setTextureRegion(new Vector2(0*this.wFont+c*this.wFont,12*this.hFont),this.wFont,this.hFont).
          end();

          // char.getComponent(SpriteRenderer).disable();
          this.distanceText.push(number);
        // }
      }
    }
  }

  for (var i = 0; i < this.words[word].length; i++) {
    this.words[word][i].getComponent(SpriteRenderer).enable();
  }

};

DigiviceLogic.prototype.writeDistance = function () {
  this.displayWord("distance",new Vector2(-0.6,0.7),0.1);
  this.displayWord(this.currentSteps.toString(),new Vector2(-0.6,0.5),0.1);
};

DigiviceLogic.prototype.hideDistance = function () {
  for (var i = 0; i < this.words["distance"].length; i++) {
    this.words["distance"][i].getComponent(SpriteRenderer).disable();
  }
  for (var i = 0; i < this.distanceText.length; i++) {
    this.distanceText[i].getComponent(SpriteRenderer).disable();
  }
};

DigiviceLogic.prototype.step = function () {
  if(this.currentSteps > 0)
    this.currentSteps--;
};

DigiviceLogic.prototype.evolve = function () {

};

DigiviceLogic.prototype.changeDigimon = function () {

};

DigiviceLogic.prototype.enterScreen = function () {

  switch (this.currentScreen) {
    case 0: // STATUS
      this.writeDistance();
      this.digimon.getComponent(SpriteRenderer).enable();
      break;
    case 1: // MAP
      this.maps[this.currentMap].getComponent(SpriteRenderer).enable();
      break;
    case 2: // MEDICAL
      this.heartIcon.getComponent(SpriteRenderer).enable();
      break;
    case 3: // VS

      break;
    default:

  }
};

DigiviceLogic.prototype.exitScreen = function () {

  switch (this.currentScreen) {
    case 0: // STATUS
      this.hideDistance();
      this.digimon.getComponent(SpriteRenderer).disable();
      break;
    case 1: // MAP
      this.maps[this.currentMap].getComponent(SpriteRenderer).disable();
      break;
    case 2: // MEDICAL
      this.heartIcon.getComponent(SpriteRenderer).disable();
      break;
    case 3: // VS

      break;
    default:

  }
};

// 1 right, -1 left
DigiviceLogic.prototype.slideScreens = function (direction) {

  var newScreen = this.currentScreen + direction;

  if(newScreen >= 0 && newScreen < (this.MAX_SCREENS)){

    // for (var i = 0; i < this.screenNames.length; i++) {
    //   this.screens[i].getComponent(Transform).translate(new Vector2(-direction,0,0));
    // }

    this.screens[this.currentScreen].getComponent(SpriteRenderer).disable();
    this.exitScreen();

    this.currentScreen = newScreen;
    this.screens[this.currentScreen].getComponent(SpriteRenderer).enable();
    this.enterScreen();
  }
};

DigiviceLogic.prototype.start = function () {



  // SCREENS
  for (var i = 0; i < this.MAX_SCREENS; i++) {
    var screen = Thief.spriteBuilder.begin("test/res/digi/"+ this.screenNames[i] +".png", new Vector2(0,0), 2, true).end();
    screen.getComponent(SpriteRenderer).disable();
    this.screens.push(screen);
  }

  this.screens[0].getComponent(SpriteRenderer).enable();

  // MAP
  for (var i = 0; i < this.MAX_MAPS/2; i++) {
    for (var j = 0; j < this.MAX_MAPS/2; j++) {
      this.maps[j+(i*2)] = Thief.spriteBuilder.begin("test/res/digi/map1.png", new Vector2(0,0.3), 1, true).
        setTextureRegion(new Vector2(this.wMap*i,this.hMap*j),this.wMap,this.hMap).
      end();

      this.maps[j+(i*2)].getComponent(SpriteRenderer).disable();
    }
  }

  //MEDICAL
  this.heartIcon = Thief.spriteBuilder.begin("test/res/digi/heart.png", new Vector2(0,0.3), 1, true).end();
  this.heartIcon.getComponent(SpriteRenderer).disable();

  // this.maps[this.currentMap].getComponent(SpriteRenderer).enable();

  // SPRITE
  this.digimon = Thief.spriteBuilder.begin("test/res/digi/digi1.png", new Vector2(0.2,0), 0.7, true).
    setTextureRegion(new Vector2(this.currentDigimon*this.w,(this.MAX_EVOLUTIONS-this.currentEvolution)*this.h),this.w,this.h).
  end();

  this.enterScreen();

};

DigiviceLogic.prototype.update = function (){

  var now = Time.now();

  if((now-this.lastTime) >= this.timeStep){

    if (Input.getKey() === 37) {
      // LEFT
      this.slideScreens(-1);
      // this.currentDigimon--;


    }else if (Input.getKey() === 39) {
      // RIGHT
      this.slideScreens(1);
      // this.currentDigimon++;


    }else if (Input.getKey() === 38) {
      // UP
      // this.currentEvolution--;
      this.currentDigimon--;

    }else if (Input.getKey() === 40) {
      // DOWN
      // this.currentEvolution++;
      this.currentDigimon++;

    }else if (Input.getKey() === 32) {
      // SPACE
      if(this.currentScreen === 0){
        this.step();
        this.writeDistance();
      }

      this.maps[this.currentMap].getComponent(Transform).translate(new Vector2(0.1,0));

    }

    this.digimon.getComponent(SpriteRenderer).
    setRegion(new Vector2(this.currentDigimon*this.w,(this.MAX_EVOLUTIONS-1-3)*this.h),this.w,this.h);


    this.lastTime = now;
  }

};
