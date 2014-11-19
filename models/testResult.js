
// {
//   "placeID":"google api unique location identificer",
//   "downloadMbps":[],
//   "uploadMbps":[],
//   "pingMS":[],
//   "parkingRating":[]
// }
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultsSchema = new Schema({
  placeID:  String,
  downloadMbps: [Number],
  uploadMbps: [Number],
  pingMs: [Number],
  parkingRating: [Number]
});

resultsSchema.methods.addPing = function(placeId, ping) {

};

module.exports = mongoose.model('Result', resultsSchema);
