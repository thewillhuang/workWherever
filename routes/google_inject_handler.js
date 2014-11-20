//goal, grab data, find the right entry in the database, inject avg results into the same location for ios to load
//1. grab res.body data
//2. make a copy of res.body.results array
//3. delete res.body.results array
//4. find place_id under each element of results array, these elements are objects
//5. find the same place_id IF it exist for in our server database
//6. grab the results under each mongoDb document with predefined method
//6. inject speedTestResults to the copy of results array element[0]
//7. loop through every element in results
//8. re-add the results array into the res.body

/*jshint node:true*/
'use strict';
var _ = require('underscore');
var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
var apiKey = process.env.GOOGLESERVERAPIKEY || 'AIzaSyCCr0g9Jdq8lL_Te6-J1ob1ilh2ysDdzNE';
var errMessage = 'please send google place api parameters excluding api key';
var errMessage2 = 'expected parameter string is similar to "location=-33.8670522,151.1957362&radius=500&types=food&name=cruise"';
var request = require('superagent');
var Results = require('../models/testResult');

var googleInjHandler = function(req, res) {
  if (!req.params) {
    return res.status(500).send(errMessage + '\n' + errMessage2);
  }
  request
  .get(url + 'key=' + apiKey + '&' + req.params.search)
  .end(function(req, gData) {
    var parsedData = JSON.parse(gData.text);
    var tempResults = parsedData.results;
    delete parsedData.results;
    var mergedResults = _.map(tempResults, function(object) {
      // var key = {
      //   placeID: object.place_id
      // };
      // var query = Results.findOne(key);
      // query.exec(function(err, results) {
      //   if (err) {
      //     return console.log('no data');
      //   }
      //   object.speedTestResults = results.createTestResult();
      //   object.mockTestResults = {leeroy:'jenkins'};
      //   console.log(object);
      //   return object;
      // });
      object.mockTestResults = {leeroy:'jenkins'};
      return object;
    });
    console.log(mergedResults);
    parsedData.results = mergedResults;
    res.json(parsedData);
  });
};

module.exports = googleInjHandler;
