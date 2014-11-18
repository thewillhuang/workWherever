'use strict';

var postHandler = function(req, res) {
  if (!req.isp || !req.wifiHotspot) { return res.status(500).json({}); }
  req.wifiHotspot.ispName = req.isp.isp;

  req.wifiHotspot.save(function(err) {
    if (err) { return res.status(500).json({}); }
    res.json({});
  });
};

module.exports = postHandler;
