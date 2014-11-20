'use strict';

var formidable = require('formidable');
var Results = require('../models/testResult');

var postHandler = function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields) {
    if (err || !fields || !fields.placeID) {
      return res.status(500).json({});
    }

    var createJson = function(results) {
      return {
        url: '/speedtest?id=' + results._id,
        results: results
      };
    };

    Results.findOne({placeID: fields.placeID}, function(err, data) {
      if (err) { return res.status(500).json({}); }
      if (data) { return res.json(createJson(data)); }

      var results = new Results();
      results.placeID = fields.placeID;

      results.save(function(err, data) {
        if (err) { return res.status(500).json({}); }
        res.json(createJson(data));
      });
    });
  });
};

module.exports = postHandler;
