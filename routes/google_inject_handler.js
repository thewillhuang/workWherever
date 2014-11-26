/*jshint node:true*/
'use strict';
var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
var apiKey = process.env.GOOGLESERVERAPIKEY;
var request = require('superagent');
var Results = require('../models/testResult');
var async = require('async');

var googleInjHandler = function(req, res) {
  if (!req.params) {
    return res.status(500).send('invalid params');
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
        if (err) {return console.err(err);}
        if (!results) {
          var input = new Results(key);
          input.save(function(err) {
            if (err) return console.err(err);
          });
        } else {
          object.speedTestResults = results.createTestResult();
        }
        done(null, object);
      });
    };

    async.mapSeries(tempResults, dbquery, function(err, data) {
      if (err) return console.err(err);
      parsedData.results = data;
      res.json(parsedData);
    });
  });
};

module.exports = googleInjHandler;
