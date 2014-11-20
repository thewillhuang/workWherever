
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

//insert functions
resultsSchema.methods.addPing = function(ping) {
  this.pingMs.push(ping);
};

resultsSchema.methods.addDownloadSpeed = function(downloadMbps) {
  this.downloadMbps.push(downloadMbps);
};

resultsSchema.methods.addUploadSpeed = function(uploadMbps) {
  this.uploadMbps.push(uploadMbps);
};

resultsSchema.methods.addParkingRating = function(parkingRating) {
  this.parkingRating.push(parkingRating);
};

//averaging functions
resultsSchema.methods.avgPing = function() {
  var total = 0;
  var len = this.pingMs.length;
  if (len === 0) {return 0;}
  for (var i = len - 1; i >= 0; i--) {
    total += this.pingMs[i];
  }
  var avg = total / len;
  return avg;
};

resultsSchema.methods.avgDl = function() {
  var total = 0;
  var len = this.downloadMbps.length;
  if (len === 0) {return 0;}
  for (var i = len - 1; i >= 0; i--) {
    total += this.downloadMbps[i];
  }
  var avg = total / len;
  return avg;
};

resultsSchema.methods.avgUl = function() {
  var total = 0;
  var len = this.uploadMbps.length;
  if (len === 0) {return 0;}
  for (var i = len - 1; i >= 0; i--) {
    total += this.uploadMbps[i];
  }
  var avg = total / len;
  return avg;
};

resultsSchema.methods.avgPark = function() {
  var total = 0;
  var len = this.parkingRating.length;
  if (len === 0) {return 0;}
  for (var i = len - 1; i >= 0; i--) {
    total += this.parkingRating[i];
  }
  var avg = total / len;
  return avg;
};

resultsSchema.methods.createTestResult = function() {
  var speedTestResult = {};
  speedTestResult.avgPark = this.avgPark;
  speedTestResult.avgUl = this.avgUl;
  speedTestResult.avgDl = this.avgDl;
  speedTestResult.avgPing = this.avgPing;
  return speedTestResult;
};

module.exports = mongoose.model('Result', resultsSchema);
