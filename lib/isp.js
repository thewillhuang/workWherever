'use strict';

var request = require('superagent');

var isp = function(req, res, next) {
  var ip = req.wifiHotspot && req.wifiHotspot.ipAddress;
  if (!ip) { return res.status(500).json({}); }

  request.get('http://ip-api.com/json/' + ip).end(function(err, data) {
    if (err || !data) { return res.status(500).json({}); }
    req.isp = JSON.parse(data.text);
    next();
  });
};

module.exports = isp;
