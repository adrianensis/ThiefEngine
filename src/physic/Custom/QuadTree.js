var QuadTree = function (width,height){
	this.root = new QuadTreeNode(new Vector2(-width/2,height/2), width, height, 2, 2, this);
	this.status = Collider.STATUS_NONE;
	this.contacts = new Array(0);
};

QuadTree.prototype.addCollider = function (collider){
	this.root.addCollider(collider);
};

QuadTree.prototype.getStatus = function (){
	return this.status;
};

QuadTree.prototype.setStatus = function (status){
	this.status = status;
};

QuadTree.prototype.getContacts = function (){
	return this.contacts;
};

QuadTree.prototype.addContacts = function (contactList){
	this.contacts = this.contacts.concat(contactList);
};

QuadTree.prototype.update = function (){
	this.status = Collider.STATUS_NONE;
	this.root.update();
};

QuadTree.prototype.clearContacts = function (){
	this.contacts = new Array(0);
	this.status = Collider.STATUS_NONE;
};
