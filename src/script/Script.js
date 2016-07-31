var Script = function (){
    Component.call(this);
};

Script.prototype = new Component();
Script.prototype.constructor = Script;

Script.prototype.bind = function (){

};

Script.prototype.update = function (){
    var children = this.getChildren();
	for (var i = 0; i < children.length; i++) {
	children[i].update();
	}
};


// ... onCollision, onDestroy, etc.
