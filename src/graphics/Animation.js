/**
* @class
* @classdesc This class represents a texture animation.
*/
var Animation = function () {
  this.frames = [];
  this.currentFrame = 0;
  this.speed = 1;
  this.lastTime = 0;

};

//----------------------------------------------------------------------

/**
* Creates an animation.
* @param {Number} frameCount The number of frames of the animation.
* @param {Boolean} horizontal True if horizontal (left to right), False if vertical (down to up).
* @param {Boolean} reverse True to use the reverse direction.
* @param {Vector2} startPosition The start position (bottom-left corner of the frame) in texture coordinates (see OpenGL texture coordinates).
* @param {Number} width The frame width.
* @param {Number} height The frame height.
* @param {Number} speed The speed of the animation.
* @returns {Animation} The animation.
*/
Animation.create = function (frameCount, horizontal, reverse, startPosition, width, height, speed) {

    // TODO: check if coordinates are > 1 or < 0 !!!!!

    var animation = new Animation();
    animation.setSpeed(speed);

    var horizontalDir = 0;
    var verticalDir = 0;

    if(horizontal)
      horizontalDir = 1;
    else
      verticalDir = 1;

    if(reverse){
      horizontalDir *= -1;
      verticalDir *= -1;
    }

    var start = 0;
    var end = frameCount;
    var delta = 1;

    if(reverse){
      start = frameCount-1;
      end = 0;
      delta = -1;
    }

    for (var i = start; i !== end; i+=delta) {

      var pos = new Vector2(0,0);
      pos.add(startPosition);

      if(horizontalDir !== 0)
        pos.x += i*width;

      if(verticalDir !== 0)
        pos.y += i*height;

      var frame = new AnimationFrame();
      frame.set(pos,width,height);
      animation.addFrame(frame);

    }

    return animation;
};

//----------------------------------------------------------------------

/**
* Set the speed of the animation.
* @param {Number} speed The speed of the animation.
*/
Animation.prototype.setSpeed = function (speed) {
    this.speed = speed;
};

//----------------------------------------------------------------------

/**
* Add a frame to the animation.
* @param {AnimationFrame} frame The frame.
*/
Animation.prototype.addFrame = function (frame) {
    this.frames.push(frame);
};

//----------------------------------------------------------------------

/**
* Return the number of frames.
* @returns {Number} The number of frames.
*/
Animation.prototype.getNumberOfFrames = function () {
    return this.frames.length;
};

//----------------------------------------------------------------------

/**
* Return the current frame number.
* @returns {Number} The current frame number.
*/
Animation.prototype.getCurrentFrameNumber = function () {
    return this.currentFrame;
};

//----------------------------------------------------------------------

/**
* Return the next frame.
* @returns {AnimationFrame} The next frame.
*/
Animation.prototype.getNextFrame = function () {

    // this.speed -> frame/second.
    // var time -> time of one frame.

    var time = (1.0/(this.speed)); // in seconds !
    var now = Time.now(); // in seconds !

    // if delta time is greater than 'one frame time'
    // then -> change to the next frame.
    if((now-this.lastTime) >= time){
        this.lastTime = now;
        this.currentFrame = (this.currentFrame + 1)%this.frames.length;
    }

    return this.frames[this.currentFrame];
};

//----------------------------------------------------------------------
