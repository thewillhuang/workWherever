
// {
//   "_id":"defined by mongodb"
//   "placeID":"google api unique location identificer",
//   "downloadMbps":[],
//   "uploadMbps":[],
//   "pingMS":[],
//   "parkingRating":[]
// }
'use strict';
var _ = require('lodash');
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
  var sum = _.reduce(this.pingMs, function(sum, num) {
    return sum + num;
  });
  return sum / this.pingMs.length;
};

resultsSchema.methods.avgDl = function() {
  var sum = _.reduce(this.downloadMbps, function(sum, num) {
    return sum + num;
  });
  return sum / this.downloadMbps.length;
};

resultsSchema.methods.avgUl = function() {
  var sum = _.reduce(this.uploadMbps, function(sum, num) {
    return sum + num;
  });
  return sum / this.uploadMbps.length;
};

resultsSchema.methods.avgPark = function() {
  var sum = _.reduce(this.parkingRating, function(sum, num) {
    return sum + num;
  });
  return sum / this.parkingRating.length;
};

resultsSchema.methods.createTestResult = function() {
  var speedTestResult = {};
  if (this.parkingRating.length === 0) {
    speedTestResult.avgPark = 'no test result';
  } else {
    speedTestResult.avgPark = this.avgPark;
  }
  if (this.pingMs.length === 0) {
    speedTestResult.avgPing = 'no test result';
  } else {
    speedTestResult.avgPing = this.avgPing;
  }
  if (this.downloadMbps.length === 0) {
    speedTestResult.avgDl = 'no test result';
  } else {
    speedTestResult.avgDl = this.avgDl;
  }
  if (this.uploadMbps.length === 0) {
    speedTestResult.avgUl = 'no test result';
  } else {
    speedTestResult.avgUl = this.avgUl;
  }
  return speedTestResult;
};

module.exports = mongoose.model('Result', resultsSchema);
