'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var server = 'http://localhost:' + (process.env.PORT || 3000);
require('../index');
chai.use(chaihttp);

describe('Google API tests', function() {
  it('should make sure google api works', function(done) {
    chai.request('http://localhost:3000')
    .get('/google/api/location=-33.8670522,151.1957362&radius=5000&types=food&name=cruise')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.results).to.be.a('Array');
      expect(res.body.results[0]).to.be.a('object');
      expect(res.body.results[0].place_id).to.be.a('string');
      done();
    });
  });

  it('should make sure google api works', function(done) {
    chai.request(server)
    .get('/google/inj/location=-33.8670522,151.1957362&radius=5000&types=food&name=cruise')
    .end(function(err, res) {
      console.log('=========================================');
      console.log('error', err);
      console.log('res.body', res.body);
      console.log('-----------------------------------------');
      console.log('res.body.results[0].mockTestResults', res.body.results[0].mockTestResults);
      done();
    });
  });
});
