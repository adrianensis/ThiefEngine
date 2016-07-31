var Animation = function () {
    this.frames = new Array(0);
    this.currentFrame = 0;
    this.speed = 1;
    this.lastTime = 0;

};

Animation.prototype.setSpeed = function (speed) {
    this.speed = speed;
};

Animation.prototype.addFrame = function (frame) {
    this.frames.push(frame);
};

Animation.prototype.getNumberOfFrames = function () {
    return this.frames.length;
};

Animation.prototype.getCurrentFrameNumber = function () {
    return this.currentFrame;
};

Animation.prototype.getNextFrame = function () {

    // this.speed -> frame/second.
    // var time -> time of one frame.

    var time = (1.0/(this.speed));
    var tick = Time.now();

    // if delta time is greater than 'one frame time'
    // then -> change to the next frame.
    if((tick-this.lastTime) >= time){
        this.lastTime = tick;
        this.currentFrame = (this.currentFrame + 1)%this.frames.length;
    }

    return this.frames[this.currentFrame];
};
