var Time = function () {

};

Time.lastTime = 0.0;
Time.delta = 0.0;
Time.deltaInSeconds = 0.0;
Time.lastTimeInSeconds = 0.0;

//----------------------------------------------------------------------

Time.init = function () {
    Time.lastTime = Date.now();
};

//----------------------------------------------------------------------

Time.tick = function () {
    var now = Date.now();

    Time.delta = now-Time.lastTime;
    Time.deltaInSeconds = Time.delta/1000;

    Time.lastTime = now;
    Time.lastTimeInSeconds = Time.lastTime/1000;
};

//----------------------------------------------------------------------

// This time is the same for the whole frame (engine loop).
// This allows synchronize the animations !!!!
Time.now = function () {
    return Time.lastTimeInSeconds;
};

//----------------------------------------------------------------------

Time.deltaTime = function () {
    return Time.deltaInSeconds;
};

//----------------------------------------------------------------------
