var ScriptEngine = function (){
    this.scripts = new Array(0);
};

ScriptEngine.prototype.getScripts = function (){
	return this.scripts;
};

ScriptEngine.prototype.setScripts = function (scripts){
	this.scripts = scripts;
};

ScriptEngine.prototype.update = function (){
    for (script of this.scripts)
        script.update();

};
