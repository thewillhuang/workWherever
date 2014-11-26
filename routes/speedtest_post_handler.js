'use strict';

var Results = require('../models/testResult');
var jwt = require('../lib/jwt');

var speedTestPostHandler = function(req, res) {
  if (!req.body || !req.body._id || !req.body.downloadMbps) {
    return res.status(500).json({});
  }

  var id = jwt.decode(req.body._id);
  if (!id) { return res.status(500).json({}); }
  var key = {_id: id.id};

  Results.findOne(key, function(err, data) {
    if (err || !data) { return res.status(500).json({}); }

    data.addDownloadSpeed(req.body.downloadMbps);
    //TODO: uploadMbps, pingMs

    data.save(function(err) {
      if (err) { return res.status(500).json({}); }
      res.json({});
    });
  });
};

module.exports = speedTestPostHandler;
