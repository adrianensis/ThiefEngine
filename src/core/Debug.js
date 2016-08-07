var Debug = function (){

};

// TODO: Use the Time.js class

Debug.log = new Log();

// RENDER VARIABLES
Debug.renderTotalCalls = 0;

Debug.renderTotalTime = 0;
Debug.renderLastDeltaTime = 0;
Debug.renderAverageDeltaTime = 0;

Debug.renderBeginTime = 0;

//----------------------------------------------------------------------

Debug.beginRender = function() {
    Debug.renderBeginTime = Date.now();
    Debug.renderTotalCalls += 1;
};

//----------------------------------------------------------------------

Debug.endRender = function() {
    Debug.renderLastDeltaTime = Date.now() - Debug.renderBeginTime;
    Debug.renderTotalTime += Debug.renderLastDeltaTime;
    Debug.renderAverageDeltaTime = Debug.renderTotalTime/Debug.renderTotalCalls;
};

//----------------------------------------------------------------------

Debug.print = function() {
    console.log("RENDER");
    console.log("TOTAL CALLS: " + Debug.renderTotalCalls);
    console.log("TOTAL TIME: " + Debug.renderTotalTime);
    console.log("AVERAGE: " + Debug.renderAverageDeltaTime);
};

//----------------------------------------------------------------------
