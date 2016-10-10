var ScriptEngine = function (){
  this.scripts = [];
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
ScriptEngine.prototype.getScripts = function (){
	return this.scripts;
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
ScriptEngine.prototype.addScripts = function (scripts){
  for (var i = 0; i < scripts.length; i++) {
    scripts[i].start();
    this.scripts.push(scripts[i]);
	}
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
ScriptEngine.prototype.clear = function (){
	this.scripts = [];
};

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
ScriptEngine.prototype.update = function (){
    for (script of this.scripts){

      if(!script.isDestroyed() && script.isEnabled())
        script.update();
    }

};

//----------------------------------------------------------------------
