#! /bin/bash

# THIS SCRIPT GENERATE THE DOCUMENTATION
# WITH THE jsdoc3 FRAMEWORK

 # for x in `ls src/`
 # do
 #   jsdoc "src/$x" -d doc # test
 # done

# jsdoc src/core src/graphics src/geom src/script src/gameobject src/random -d=doc # test
./min.sh
jsdoc thief.js -d doc
