'use strict';

var genData = function(sizeKb) {
  var data = [];
  var oneKb = 512;

  for (var i = oneKb * sizeKb - 1; i >= 0; i--) {
    data.push('a');
  }
  return data;
};

module.exports = genData;
//generate 1mb data
// var fs = require('fs');
// fs.writeFile('test.txt', genData(1024));
