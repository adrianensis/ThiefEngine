var Frustum = function (camera){
	this.camera = camera;
	this.planes = new Array(6);

  for (var i = 0; i < this.planes.length; i++) {
      this.planes[i] = new Vector3(0,0,0); // x,y,z,w <=> A,B,C,D
  }

	this.VPmatrix = Matrix4.identity();
};

Frustum.prototype.testSphere = function (center, radius){
	// console.log("TEST SPHERE");
	for (var i = 0; i < this.planes.length; i++) {

		var A = this.planes[i].x;
		var B = this.planes[i].y;
		var C = this.planes[i].z;
		var D = this.planes[i].w;

		// console.log(A+" "+B+" "+C+" "+D);
		// console.log(-radius);
		// console.log((A*center.x)+(B*center.y)+(C*center.z)+D);

		if((A*center.x)+(B*center.y)+(C*center.z)+D <= -radius)
			return false;
	}

	return true;
};

Frustum.prototype.build = function (){

	var t = this.camera.getGameObject().getTransform();

	if(t.isDirty()){

	  var LEFT = 0;
	  var RIGHT = 1;
	  var BOTTOM = 2;
	  var TOP = 3;
	  var NEAR = 4;
	  var FAR = 5;

		// var camPos = t.position;

	  // var this.VPmatrix = Matrix4.mulMM(this.camera.getProjectionMatrix(),this.camera.getViewMatrix());
	  this.VPmatrix = Matrix4.mulMM(this.camera.getViewMatrix(),this.camera.getProjectionMatrix());
		this.VPmatrix = this.VPmatrix.transpose();

		// this.VPmatrix = Matrix4.mulMM(Matrix4.translation(new Vector3(-3,0,0)),this.VPmatrix)

		var d = new Array(6);

		/*
		* LEFT
		*/
	  this.planes[LEFT].x = this.VPmatrix.get(0,0) + this.VPmatrix.get(0,3);
	  this.planes[LEFT].y = this.VPmatrix.get(1,0) + this.VPmatrix.get(1,3);
	  this.planes[LEFT].z = this.VPmatrix.get(2,0) + this.VPmatrix.get(2,3);
	  // this.planes[LEFT].w = this.VPmatrix.get(3,0) + this.VPmatrix.get(3,3);

		// this.planes[LEFT] = this.planes[LEFT].nor();

		d[LEFT] =  this.VPmatrix.get(3,0) + this.VPmatrix.get(3,3) //+  ;;
		//
		// if(this.planes[LEFT].len() > 0)
		// 	d[LEFT] = d[LEFT]/this.planes[LEFT].len();
		//
		// this.planes[LEFT].w = d[LEFT] //+ camPos.x ;
		//
		// console.log("LEFT"+"\t"+this.planes[LEFT].x.toFixed(3) +" "+ this.planes[LEFT].y.toFixed(3) +" "+ this.planes[LEFT].z.toFixed(3) +" "+ this.planes[LEFT].w.toFixed(3));

		/*
		* RIGHT
		*/
	  this.planes[RIGHT].x = -this.VPmatrix.get(0,0) + this.VPmatrix.get(0,3);
	  this.planes[RIGHT].y = -this.VPmatrix.get(1,0) + this.VPmatrix.get(1,3);
	  this.planes[RIGHT].z = -this.VPmatrix.get(2,0) + this.VPmatrix.get(2,3);
	  // this.planes[RIGHT].w = -this.VPmatrix.get(3,0) + this.VPmatrix.get(3,3);

		// this.planes[RIGHT] = this.planes[RIGHT].nor();

		d[RIGHT] =  -this.VPmatrix.get(3,0) + this.VPmatrix.get(3,3) //+  ;
		//
		// if(this.planes[RIGHT].len() > 0)
		// 	d[RIGHT] = d[RIGHT]/this.planes[RIGHT].len();
		//
		// this.planes[RIGHT].w = d[RIGHT] //+ camPos.x ;
		//
		// console.log("RIGHT"+"\t"+this.planes[RIGHT].x.toFixed(3) +" "+ this.planes[RIGHT].y.toFixed(3) +" "+ this.planes[RIGHT].z.toFixed(3) +" "+ this.planes[RIGHT].w.toFixed(3));

		/*
		* BOTTOM
		*/
	  this.planes[BOTTOM].x = this.VPmatrix.get(0,1) + this.VPmatrix.get(0,3);
	  this.planes[BOTTOM].y = this.VPmatrix.get(1,1) + this.VPmatrix.get(1,3);
	  this.planes[BOTTOM].z = this.VPmatrix.get(2,1) + this.VPmatrix.get(2,3);
	  // this.planes[BOTTOM].w = this.VPmatrix.get(3,1) + this.VPmatrix.get(3,3);

		// this.planes[BOTTOM] = this.planes[BOTTOM].nor();

		d[BOTTOM] =  this.VPmatrix.get(3,1) + this.VPmatrix.get(3,3) //+  ;;
		//
		// if(this.planes[BOTTOM].len() > 0)
		// 	d[BOTTOM] = d[BOTTOM]/this.planes[BOTTOM].len();
		//
		// this.planes[BOTTOM].w = d[BOTTOM] //+ camPos.y ;
		//
		// console.log("BOTTOM"+"\t"+this.planes[BOTTOM].x.toFixed(3) +" "+ this.planes[BOTTOM].y.toFixed(3) +" "+ this.planes[BOTTOM].z.toFixed(3) +" "+ this.planes[BOTTOM].w.toFixed(3));

		/*
		* TOP
		*/
	  this.planes[TOP].x = -this.VPmatrix.get(0,1) + this.VPmatrix.get(0,3);
	  this.planes[TOP].y = -this.VPmatrix.get(1,1) + this.VPmatrix.get(1,3);
	  this.planes[TOP].z = -this.VPmatrix.get(2,1) + this.VPmatrix.get(2,3);
	  // this.planes[TOP].w = -this.VPmatrix.get(3,1) + this.VPmatrix.get(3,3);

		// this.planes[TOP] = this.planes[TOP].nor();

		d[TOP] =  -this.VPmatrix.get(3,1) + this.VPmatrix.get(3,3) //+  ;;
		//
		// if(this.planes[TOP].len() > 0)
		// 	d[TOP] = d[TOP]/this.planes[TOP].len();
		//
		// this.planes[TOP].w = d[TOP] //+ camPos.y ;
		//
		// console.log("TOP"+"\t"+this.planes[TOP].x.toFixed(3) +" "+ this.planes[TOP].y.toFixed(3) +" "+ this.planes[TOP].z.toFixed(3) +" "+ this.planes[TOP].w.toFixed(3));

		/*
		* NEAR
		*/
	  this.planes[NEAR].x = this.VPmatrix.get(0,2) + this.VPmatrix.get(0,3);
	  this.planes[NEAR].y = this.VPmatrix.get(1,2) + this.VPmatrix.get(1,3);
	  this.planes[NEAR].z = this.VPmatrix.get(2,2) + this.VPmatrix.get(2,3);
	  // this.planes[NEAR].w = this.VPmatrix.get(3,2) //+ this.VPmatrix.get(3,3);

		// this.planes[NEAR] = this.planes[NEAR].nor();

		d[NEAR] =  this.VPmatrix.get(3,2) + this.VPmatrix.get(3,3) ;;
		//
		// if(this.planes[NEAR].len() > 0)
		// 	d[NEAR] = d[NEAR]/this.planes[NEAR].len();
		//
		// this.planes[NEAR].w = d[NEAR] //+ camPos.z ;
		//
		// console.log("NEAR"+"\t"+this.planes[NEAR].x.toFixed(3) +" "+ this.planes[NEAR].y.toFixed(3) +" "+ this.planes[NEAR].z.toFixed(3) +" "+ this.planes[NEAR].w.toFixed(3));

		/*
		* FAR
		*/
	  this.planes[FAR].x = -this.VPmatrix.get(0,2) + this.VPmatrix.get(0,3);
	  this.planes[FAR].y = -this.VPmatrix.get(1,2) + this.VPmatrix.get(1,3);
	  this.planes[FAR].z = -this.VPmatrix.get(2,2) + this.VPmatrix.get(2,3);
	  // this.planes[FAR].w = -this.VPmatrix.get(3,2) + this.VPmatrix.get(3,3);

		// this.planes[FAR] = this.planes[FAR].nor();

		d[FAR] =  -this.VPmatrix.get(3,2) + this.VPmatrix.get(3,3) //+  ;;
		//
		// if(this.planes[FAR].len() > 0)
		// 	d[FAR] = d[FAR]/this.planes[FAR].len();
		//
		// this.planes[FAR].w = d[FAR] //+ camPos.z ;
		//
		// console.log("FAR"+"\t"+this.planes[FAR].x.toFixed(3) +" "+ this.planes[FAR].y.toFixed(3) +" "+ this.planes[FAR].z.toFixed(3) +" "+ this.planes[FAR].w.toFixed(3));



		// console.log(camPos);

		// var str = ["LEFT","RIGHT","BOTTOM","TOP","NEAR","FAR"];
		// var delta = [camPos.x,camPos.x,camPos.y,camPos.y,camPos.z,camPos.z];

	    for (var i = 0; i < this.planes.length; i++) {



				if(this.planes[i].len() > 0){

					// console.log(d[i] + "/"+ this.planes[i].len() + "=" +d[i]/this.planes[i].len());

					d[i] = d[i]/this.planes[i].len();


					this.planes[i] = this.planes[i].nor();

					this.planes[i].w = d[i]//+delta[i];
				}


				// console.log(str[i]+"\t"+this.planes[i].x.toFixed(3) +" "+ this.planes[i].y.toFixed(3) +" "+ this.planes[i].z.toFixed(3) +" "+ this.planes[i].w.toFixed(3));

	    }
		}
};
