var BaseObject = function (){
    this.id = BaseObject.lastId;
    BaseObject.lastId++;
};

BaseObject.lastId = 0;

//----------------------------------------------------------------------

BaseObject.prototype.getId = function (){
	return this.id;
};

//----------------------------------------------------------------------
