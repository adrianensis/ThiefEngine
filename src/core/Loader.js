
/**
* @class
* @classdesc This loader stores textures and avoid duplication of them.
*/
var Loader = function (){

};

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

//----------------------------------------------------------------------

/**
* Return if all loads have finished.
* @returns {Boolean} If all loads have finished.
*/
Loader.isDone = function(){

    // if( ! Loader.hasImageRequests)
    //     return true;

    return Loader.done;
};

//----------------------------------------------------------------------

/**
* Reset the loader.
*/
Loader.reset = function(){
  Loader.done = false;
};

//----------------------------------------------------------------------

/**
* Load the image in async mode.
* NOTE: Do not worry about the 'async' word.
* The engine will wait until all the images are loaded.
* @param {String} path The path.
*/
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

//----------------------------------------------------------------------

/**
* Load the texture in async mode.
* NOTE: Do not worry about the 'async' word.
* The engine will wait until all the images are loaded.
* @param {String} path The path.
*/
Loader.loadTexture = function (path) {
    if( ! (path in Loader.textures)){
        var img = Loader.loadImageFile(path);

        var texture = new Texture(path,img);
        Loader.textures[path] = texture;
    }

    return Loader.textures[path];
};

//----------------------------------------------------------------------
