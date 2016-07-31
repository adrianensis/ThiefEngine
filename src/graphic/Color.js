var Color = function (r,g,b,a) {
  this.vec = new Vector4(r,g,b,a);
};

Color.NONE = new Color(0.0, 0.0, 0.0, 0.0);
Color.RED = new Color(1.0, 0.0, 0.0, 1.0);
Color.GREEN = new Color(0.0, 1.0, 0.0, 1.0);
Color.BLUE = new Color(0.0, 0.0, 1.0, 1.0);

Color.random = function () {
  var r = Math.random();
  var g = Math.random();
  var b = Math.random();
  // var a = Math.Random();

  return new Color(r,g,b,1.0);
};

Color.prototype.getData = function(){
  return this.vec.toArray();
};


Color.prototype.equals = function(otherColor){
  return this.vec.equals(otherColor.vec);
};



// Color.lastId = 0;
// Color.pool = new Array(0);

// Color.create = function (r,g,b,a) {
//
//     var newColor = new Color(Number((r).toFixed(2)),
//                             Number((g).toFixed(2)),
//                             Number((b).toFixed(2)),
//                             Number((a).toFixed(2)));
//
//     var found = false;
//     var foundColor = null;
//     for (var i = 0; i < Color.pool.length && !found; i++) {
//
//         // console.log(Color.pool[i]);
//         //     console.log(newColor);
//
//         if(Color.pool[i].equals(newColor)){
//             found = true;
//             foundColor = Color.pool[i];
//         }
//     }
//
//     if(!found){
//
//         newColor.id = Color.lastId;
//         Color.lastId++;
//
//         Color.pool.push(newColor);
//
//         return newColor;
//
//     }else
//         return foundColor;
//
//
// };
//
// Color.prototype.getId = function(){
//     return this.id;
// };
