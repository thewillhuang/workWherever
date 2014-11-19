'use strict';

var speedTestPostHandler = function(req, res) {
  if (!req.body) { return res.status(500).json({}); }

  //TODO: Merge posted speed test results into the db.
  console.log(req.body._id, req.body.downloadMbps);//TODO

  res.json({});
};

module.exports = speedTestPostHandler;
