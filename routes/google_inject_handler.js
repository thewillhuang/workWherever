/*jshint node:true*/
'use strict';
var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
var apiKey = process.env.GOOGLESERVERAPIKEY;
var errMessage = 'please send google place api parameters excluding api key';
var errMessage2 = 'expected parameter string is similar to "location=-33.8670522,151.1957362&radius=500&types=food&name=cruise"';
var request = require('superagent');
var Results = require('../models/testResult');
var async = require('async');

var googleInjHandler = function(req, res) {
  if (!req.params) {
    return res.status(500).send(errMessage + '\n' + errMessage2);
  }
  request
  .get(url + 'key=' + apiKey + '&' + req.params.search)
  .end(function(req, gData) {
    //grab data from google
    var parsedData = JSON.parse(gData.text);
    //copy results from google
    var tempResults = parsedData.results;
    //delete it to reinsert it later
    delete parsedData.results;
    //async method
    var dbquery = function(object, done) {
      var key = {placeID: object.place_id};
      var query = Results.findOne(key);
      query.exec(function(err, results) {
        if (err) {return console.log('error with db');}
        if (!results) {
          var input = new Results(key);
          input.save(function(err, data) {
            if (err) return console.err(err);
            console.log(data);
          });
        } else {
          object.speedTestResults = results.createTestResult();
        }
        done(null, object);
      });
    };

    async.mapSeries(tempResults, dbquery, function(err, data) {
      parsedData.results = data;
      res.json(parsedData);
    });
  });
};

module.exports = googleInjHandler;
