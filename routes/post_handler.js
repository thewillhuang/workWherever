'use strict';

var formidable = require('formidable');
var Results = require('../models/testResult');

var postHandler = function(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields) {
    if (err || !fields) { return res.status(500).json({}); }
    if (!fields.placeID) { return res.status(500).json({}); }
    if (!fields.parkingRating) { return res.status(500).json({}); }

    Results.findOne({placeID: fields.placeID}, function(err, data) {
      if (err) { return res.status(500).json({}); }

      if (!data) {
        data = new Results();
        data.placeID = fields.placeID;
      }

      data.addParkingRating(fields.parkingRating);

      data.save(function(err, data) {
        if (err) { return res.status(500).json({}); }

        res.json({
          url: '/speedtest?id=' + data._id,
          results: data
        });
      });
    });
  });
};

module.exports = postHandler;
