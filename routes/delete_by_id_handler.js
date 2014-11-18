'use strict';

var WifiHotspot = require('../myMod/wifi_hotspot');

var deleteByIdHandler = function(req, res) {
  if (!req.params) { return res.status(500).json({}); }

  WifiHotspot.remove({_id: req.params.id}, function(err) {
    if (err) { return res.status(500).json({}); }
    res.json({});
  });
};

module.exports = deleteByIdHandler;
