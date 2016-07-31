var Loader = function (){

};
//
// Loader.serverAddress = null;
//
// Loader.loadTextFile = function (name){
//     var req = new XMLHttpRequest();
//     req.open("GET", Loader.serverAddress.concat(name) , false);
//
//     // req.onreadystatechange = function() {
//     //     if (req.readyState == 4) {
//     //         console.log(req.responseText);
//     //     }
//     // }
//     req.send();
//
//     return req.responseText;
// };

Loader.images = {};
Loader.textures = {};
Loader.materials = {};

Loader.requests = 0;
Loader.loaded = 0;
Loader.done = false;
Loader.hasImageRequests = false;
// Loader.running = false;

// TODO: Loader.LoadTextFile(path) ==> The text file will be included
// within a div element like this ==> <div id=path> plain text </div>

Loader.isDone = function(){

    if( ! Loader.hasImageRequests)
        return true;

    return Loader.done;
};

Loader.reset = function(){
  Loader.done = false;
};

Loader.loadImageFile = function (path){

    Loader.hasImageRequests = true;

    if((path in Loader.images)){
        return Loader.images[path];

    }else{
        Loader.requests++;
        var img = new Image();

        Loader.images[path] = img;

        img.src = path; // DOWNLOADING!

        img.onload = function(){
            Loader.loaded++;
            if(Loader.requests == Loader.loaded)
                Loader.done = true;
            else
                Loader.done = false;
        };

        return Loader.images[path];
    }

};

Loader.loadTexture = function (path) {
    if( ! (path in Loader.textures)){
        var img = Loader.loadImageFile(path);

        var texture = new Texture(path,img);
        Loader.textures[path] = texture;
    }

    return Loader.textures[path];
};

// Loader.loadMaterial = function (path) {
//     if( ! (path in Loader.materials)){
//         var texture = Loader.loadTexture(path);
//
//         var material = new Material();
//         material.setTexture(texture);
//         Loader.materials[path] = material;
//     }
//
//     return Loader.materials[path];
// };
