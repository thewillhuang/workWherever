'use strict';

var mongoose = require('mongoose');

var wifiHotspotSchema = mongoose.Schema({
  ipAddress: 'String',
  dateTime: 'Number',
  downloadMbps: 'Number',
  uploadMbps: 'Number',
  pingMsec: 'Number'
});

var WifiHotspot = mongoose.model('WifiHotspot', wifiHotspotSchema);

module.exports = WifiHotspot;
