'use strict';

var Results = require('../models/testResult');

var deleteByIdHandler = function(req, res) {
  if (!req.params) { return res.status(500).json({}); }

  Results.remove({_id: req.params.id}, function(err) {
    if (err) { return res.status(500).json({}); }
    res.json({});
  });
};

module.exports = deleteByIdHandler;
