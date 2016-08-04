var ZombieLogic = function () {
    Script.call(this);
    this.v = 50+(Math.random()*1000%100);
};

ZombieLogic.prototype = new Script();
ZombieLogic.prototype.constructor = ZombieLogic;

ZombieLogic.prototype.bind = function () {
    //this.gameObject.getComponent(MeshRenderer).getMaterial().setAnimation("right");
};

ZombieLogic.prototype.update = function (){
    this.gameObject.getTransform().translate(new Vector2(this.v*Time.deltaTime(),0));
};
