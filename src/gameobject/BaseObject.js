var BaseObject = function (){
    this.id = BaseObject.lastId;
    BaseObject.lastId++;
};

BaseObject.lastId = 0;

//----------------------------------------------------------------------

/**
* DESCRIPTION
* @param {TYPE} NAME DESCRIPTION
* @returns {TYPE} DESCRIPTION
*/
BaseObject.prototype.getId = function (){
	return this.id;
};

//----------------------------------------------------------------------
