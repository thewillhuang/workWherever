'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var Results = require('../models/testResult');
var jwt = require('../lib/jwt');

var server = 'http://localhost:' + (process.env.PORT || 3000);
var expect = chai.expect;

require('../index');
chai.use(chaihttp);

describe('REST API tests', function() {
  var id;
  var token;
  var placeID;

  it('should return 500 when place ID is not specified', function(done) {
    chai.request(server).
    post('/api').
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(500);
      done();
    });
  });

  it('should be able to create new test results', function(done) {
    chai.request(server).
    post('/api').
    send({
      placeID: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
      parkingRating: 5
    }).
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('results');
      expect(res.body.results).to.have.property('placeID');
      placeID = res.body.results.placeID;
      expect(res.body.results).to.have.property('_id');
      id = res.body.results._id;
      token = jwt.encode(id);
      expect(res.body).to.have.property('url');
      expect(res.body.url).to.equal('/speedtest?id=' + token);
      expect(res.body.results.parkingRating.length).to.not.equal(0);
      done();
    });
  });

  it('should be able to add download speed to test results', function(done) {
    chai.request(server).
    post('/speedtest/api').
    send({_id: token, downloadMbps: 20.0}).
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should be able to find test results by place ID', function(done) {
    chai.request(server).
    post('/api').
    field('placeID', 'ChIJN1t_tDeuEmsRUsoyG83frY4').
    field('parkingRating', 10).
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.results.placeID).to.equal(placeID);
      expect(res.body.results._id).to.equal(id);
      expect(res.body.results.downloadMbps.length).to.not.equal(0);
      done();
    });
  });

  it('should reject request for download size > 10MB', function(done) {
    chai.request(server).
    get('/speedtest/api/10241').
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(500);
      done();
    });
  });

  it('cleanup', function(done) {
    Results.remove({_id: id}, function(err) {
      expect(err).equals(null);
      done();
    });
  });
});
