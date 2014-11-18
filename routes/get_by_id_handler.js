'use strict';

var WifiHotspot = require('../myMod/wifi_hotspot');

var getByIdHandler = function(req, res) {
  if (!req.params) { return res.status(500).json({}); }

  WifiHotspot.findOne({_id: req.params.id}, function(err, data) {
    if (err) { return res.status(500).json({}); }
    res.json(data);
  });
};

module.exports = getByIdHandler;
