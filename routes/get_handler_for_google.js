/*jshint node:true*/
'use strict';
var _ = require('underscore');
var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
var apiKey = process.env.GOOGLESERVERAPIKEY || 'AIzaSyCCr0g9Jdq8lL_Te6-J1ob1ilh2ysDdzNE';
var errMessage = 'please send google place api parameters excluding api key';
var errMessage2 = 'expected parameter string is similar to "location=-33.8670522,151.1957362&radius=500&types=food&name=cruise"';
var request = require('superagent');
var googleGetHandler = function(req, res) {
  if (!req.params) {
    return res.status(500).send(errMessage + '\n' + errMessage2);
  }
  request
    .get(url + 'key=' + apiKey + '&' + req.params.search)
    .end(function(req, gData) {
      var parsedData = JSON.parse(gData.text);
      res.json(parsedData);
    });
};

module.exports = googleGetHandler;

/*
_.map([1, 2, 3], function(num){ return num * 3; });
=> [3, 6, 9]
_.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
=> [3, 6, 9]
*/

var injected = _.map(parsedData.results, function() {

});
