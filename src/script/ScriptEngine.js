/**
* @class
* @classdesc This class manages all the scripts.
*/
var ScriptEngine = function (){
  this.scripts = [];
};

//----------------------------------------------------------------------

/**
* Return the scritps to the engine.
* @return {Array} The scripts.
*/
ScriptEngine.prototype.getScripts = function (){
	return this.scripts;
};

//----------------------------------------------------------------------

/**
* Add the scritps to the engine.
* @param {Array} scripts The scripts.
*/
ScriptEngine.prototype.addScripts = function (scripts){
  for (var i = 0; i < scripts.length; i++) {
    scripts[i].start();
    this.scripts.push(scripts[i]);
	}
};

//----------------------------------------------------------------------

/**
* Clear all the scripts.
*/
ScriptEngine.prototype.clear = function (){
	this.scripts = [];
};

//----------------------------------------------------------------------

/**
* Update all the scripts.
*/
ScriptEngine.prototype.update = function (){
    for (script of this.scripts){

      if(!script.isDestroyed() && script.isEnabled())
        script.update();
    }

};

//----------------------------------------------------------------------
