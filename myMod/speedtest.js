'use strict';
var genData = function(sizeKbs) {
  var data = [];
  var oneKb = 512;

  for (var i = oneKb * sizeKbs - 1; i >= 0; i--) {
    data.push('a');
  }
  return data;
};

//generate 1mb data
// var fs = require('fs');
// fs.writeFile('test.txt', genData(1024));

module.exports = genData;
