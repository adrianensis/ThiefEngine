var Log = function (){
    this.text="";
};

//----------------------------------------------------------------------

Log.prototype.print = function (string){
    this.text += string;
};

//----------------------------------------------------------------------

Log.prototype.println = function (string){
    this.text += string + "\n";
};

//----------------------------------------------------------------------

Log.prototype.getStr = function () {
    return this.text;
};

//----------------------------------------------------------------------
