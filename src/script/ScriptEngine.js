var ScriptEngine = function (){
  this.scripts = [];
};

ScriptEngine.prototype.getScripts = function (){
	return this.scripts;
};

ScriptEngine.prototype.addScripts = function (scripts){
  for (var i = 0; i < scripts.length; i++) {
    scripts[i].start();
    this.scripts.push(scripts[i]);
	}
};

ScriptEngine.prototype.clear = function (){
	this.scripts = [];
};

ScriptEngine.prototype.update = function (){
    for (script of this.scripts)
        script.update();

};
