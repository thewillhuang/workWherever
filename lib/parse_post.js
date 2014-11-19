'use strict';

var _ = require('underscore');
var formidable = require('formidable');
var WifiHotspot = require('../lib/wifi_hotspot');

var parsePost = function(req, res, next) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields) {
    if (err || !fields) { return res.status(500).json({}); }
    var wifiHotspot = new WifiHotspot();
    wifiHotspot.dateTime = new Date().getTime();

    _.each(Object.keys(fields), function(field) {
      if (!wifiHotspot.validateField(field)) {
        return res.status(500).json({});
      }
      wifiHotspot[field] = fields[field];
    });

    req.wifiHotspot = wifiHotspot;
    next();
  });
};

module.exports = parsePost;
