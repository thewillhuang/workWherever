'use strict';

var WifiHotspot = require('../myMod/wifi_hotspot');

var getAllHandler = function(req, res) {
  WifiHotspot.find({}, function(err, data) {
    if (err) { return res.status(500).json({}); }
    res.json({WifiHotspots: data});
  });
};

module.exports = getAllHandler;
