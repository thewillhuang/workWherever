'use strict';

var fs = require('fs');
var genData = require('../lib/speedtest');

var speedTestGetHandler = function(req, res) {
  if (!req.params) { return res.status(500).send(); }
  if (+req.params.sizeKbs > 10240) { return res.status(500).send(); }
  var textFile = __dirname + '/test.txt';

  if (req.query) {
    textFile = __dirname + '/test_' + req.query.id +
      new Date().getTime() + Math.floor(Math.random() * 100) + '.txt';
  }

  fs.writeFile(textFile, genData(+req.params.sizeKbs), function(err) {
    if (err) { return res.status(500).send(); }

    res.set({
      'x-Date': new Date().getTime(),
      'x-SizeKbs': req.params.sizeKbs
    });

    var rs = fs.createReadStream(textFile);
    rs.pipe(res);
    rs.on('end', function() { fs.unlink(textFile); });
  });
};

module.exports = speedTestGetHandler;
