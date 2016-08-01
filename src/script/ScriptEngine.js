var ScriptEngine = function (){
    this.scripts = new Array(0);
};

ScriptEngine.prototype.getScripts = function (){
	return this.scripts;
};

ScriptEngine.prototype.setScripts = function (scripts){
  for (var i = 0; i < scripts.length; i++) {
    this.scripts.push(scripts[i]);
	}
};

ScriptEngine.prototype.update = function (){
    for (script of this.scripts)
        script.update();

};
