var read = function () {

var label=["Magic",
"version",
"skinwidth",
"skinheight",
"framesize",
"num_skins",
"num_xyz",
"num_st",
"num_tris",
"num_glcmds",
"num_frames",
"ofs_skins",
"ofs_st",
"ofs_tris",
"ofs_frames",
"ofs_glcmds",
"ofs_end"]

  var rawFile = new XMLHttpRequest();
  // "res/dolphin/dolphin.md2" "res/pknight.md2"
  rawFile.open("GET","res/dolphin/dolphin.md2" , true); // SYNC
  rawFile.onreadystatechange = function ()
  {
      if(rawFile.readyState === 4)
      {
          if(rawFile.status === 200 || rawFile.status == 0)
          {
              var allText = rawFile.responseText;
              console.log(allText);

              var bin = []

              var k=0;
              var lastIndex = 0;
              while (k<17) {

                bin.push(label[k] + " " + lastIndex);
                bin.push([allText.charCodeAt(lastIndex),allText.charCodeAt(lastIndex+1),allText.charCodeAt(lastIndex+2),allText.charCodeAt(lastIndex+3)]);

                var int = 0;
                for (var i= 3; i >= 0; i--) {

                  int += (allText.charCodeAt(i+lastIndex) << i*8);


                  // bin.push(allText[i]);
                }

                bin.push(int);
                lastIndex += 4;
                k++;
              }
              // for (var i = 0; i < allText.length/10000; i++) {
              //   bin.push(allText.charCodeAt(i));
              //   // bin.push(allText[i]);
              // }

              // alert(allText);

              // alert(bin);
              console.log(bin);
          }
      }
  }
  rawFile.send(null);

  var result = 0;

  result += 0 << 24;
  result += 1 << 16;
  result += 0 << 8;
  result += 0;

// (('2'<<24) + ('P'<<16) + ('D'<<8) + 'I') = ((50<<24) + (80<<16) + (68<<8) + 73)
  console.log(((50<<24) + (80<<16) + (68<<8) + 73));

}
