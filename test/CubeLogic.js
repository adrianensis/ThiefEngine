var CubeLogic = function () {
    Script.call(this);

    this.directionX = Math.random() < 0.5 ? -1 : 1;
    this.directionY = Math.random() < 0.5 ? -1 : 1;

    this.delta = 1;

};

CubeLogic.prototype = new Script();
CubeLogic.prototype.constructor = CubeLogic;


CubeLogic.prototype.bind = function () {

};

CubeLogic.prototype.update = function (){


//   if (Input.getKey() === 37) {
//
//     this.gameObject.getTransform().rotate(new Vector3(0.0,-this.delta,0.0));
//
//   }else if (Input.getKey() === 39) {
//
//     this.gameObject.getTransform().rotate(new Vector3(0.0,this.delta,0.0));
// }else if (Input.getKey() === 38) {
//
//     this.gameObject.getTransform().rotate(new Vector3(-this.delta,0.0,0.0));
// }else if (Input.getKey() === 40) {
//
//     this.gameObject.getTransform().rotate(new Vector3(this.delta,0.0,0.0));
//   }

};
