/*jshint node:true*/
'use strict';

var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
var apiKey = process.env.GOOGLESERVERAPIKEY;
var request = require('superagent');
var googleGetHandler = function(req, res) {
  if (!req.params) {
    return res.status(500).send('invalid params');
  }
  request
    .get(url + 'key=' + apiKey + '&' + req.params.search)
    .end(function(req, gData) {
      var parsedData = JSON.parse(gData.text);
      res.json(parsedData);
    });
};

module.exports = googleGetHandler;
