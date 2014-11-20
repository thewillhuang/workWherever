'use strict';

var fs = require('fs');
var genData = require('../lib/speedtest');
var textFile = __dirname + '/test.txt';

var speedTestGetHandler = function(req, res) {
  if (!req.params) { return res.status(500).send(); }
  if (+req.params.sizeKbs > 10240) { return res.status(500).send(); }

  fs.writeFile(textFile, genData(+req.params.sizeKbs), function(err) {
    if (err) { return res.status(500).send(); }

    res.set({
      'x-Date': new Date().getTime(),
      'x-SizeKbs': req.params.sizeKbs
    });

    fs.createReadStream(textFile).pipe(res);
  });
};

module.exports = speedTestGetHandler;
