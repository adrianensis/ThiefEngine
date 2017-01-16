
/**
* @class
* @classdesc This class provides time-related functionality.
*/
var Time = function () {

};

Time.lastTime = 0.0;
Time.delta = 0.0;
Time.deltaInSeconds = 0.0;
Time.lastTimeInSeconds = 0.0;

//----------------------------------------------------------------------

/**
* Starts the timestamp.
*/
Time.init = function () {
    Time.lastTime = Date.now();
};

//----------------------------------------------------------------------

/**
* Generates the timestamp and calculates the delta time
* that has passed from the last timestamp.
*/
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

/**
* This function is used to obtain, within the same engine iteration, the
* same timestamp. For example: This allows synchronize the animations.
* @returns {Number} now.
*/
Time.now = function () {
    return Time.lastTimeInSeconds;
};

//----------------------------------------------------------------------

/**
* Returns the delta time.
* @returns {Number} The delta time.
*/
Time.deltaTime = function () {
    return Time.deltaInSeconds;
};

//----------------------------------------------------------------------
