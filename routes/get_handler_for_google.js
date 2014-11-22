/*jshint node:true*/
'use strict';

var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
var apiKey = process.env.GOOGLESERVERAPIKEY;
var errMessage = 'please send google place api parameters excluding api key';
var errMessage2 = 'expected parameter string is "location=-33.8670522,151.1957362&radius=500&types=food&name=cruise"';
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
