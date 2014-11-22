'use strict';

var formidable = require('formidable');
var Results = require('../models/testResult');
var jwt = require('../lib/jwt');

var postHandler = function(req, res) {
  var processFields = function(fields) {
    if (!fields.placeID) { return res.status(500).json({}); }

    Results.findOne({placeID: fields.placeID}, function(err, data) {
      if (err) { return res.status(500).json({}); }

      if (!data) {
        data = new Results();
        data.placeID = fields.placeID;
      }

      if (fields.parkingRating) {
        data.addParkingRating(fields.parkingRating);
      }

      data.save(function(err, data) {
        if (err) { return res.status(500).json({}); }
        var token = jwt.encode(data._id);

        res.json({
          url: '/speedtest?id=' + token,
          results: data
        });
      });
    });
  };

  if (req.body && req.body.placeID) {
    return processFields(req.body);
  }

  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields) {
    if (err || !fields) { return res.status(500).json({}); }
    processFields(fields);
  });
};

module.exports = postHandler;
