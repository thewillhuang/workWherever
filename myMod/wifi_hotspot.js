'use strict';

var mongoose = require('mongoose');

var schema = {
  ipAddress: 'String',
  dateTime: 'Number',
  downloadMbps: 'Number',
  uploadMbps: 'Number',
  pingMsec: 'Number',
  ispName: 'String'
};

var wifiHotspotSchema = mongoose.Schema(schema);

wifiHotspotSchema.methods.validateField = function(field) {
  for (var key in schema) {
    if (key === field) { return true; }
  }
  return false;
};

module.exports = mongoose.model('WifiHotspot', wifiHotspotSchema);
