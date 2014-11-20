'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');

var server = 'http://localhost:' + (process.env.PORT || 3000);
var expect = chai.expect;

require('../index');
chai.use(chaihttp);

// describe('REST API tests (GET)', function() {
//   it('test to make sure google api works', function(done) {
//     chai.request('http://localhost:3000')
//       .get('/google/api/location=-33.8670522,151.1957362&radius=500&types=food&name=cruise')
//       .end(function(err, res) {
//         expect(err).to.eql(null);
//         expect(res.body.results).to.be.a('Array');
//         expect(res.body.results[0]).to.be.a('object');
//         expect(res.body.results[0].place_id).to.be.a('string');
//         done();
//       });
//   });
// });

describe('REST API tests (POST)', function() {
  var id;
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
    field('placeID', 'ChIJN1t_tDeuEmsRUsoyG83frY4').
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('placeID');
      placeID = res.body.placeID;
      expect(res.body).to.have.property('id');
      id = res.body.id;
      expect(res.body).to.have.property('url');
      expect(res.body.url).to.equal('/speedtest?id=' + id);
      done();
    });
  });

  it('should be able to find test results by place ID', function(done) {
    chai.request(server).
    post('/api').
    field('placeID', 'ChIJN1t_tDeuEmsRUsoyG83frY4').
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body.placeID).to.equal(placeID);
      expect(res.body.id).to.equal(id);
      done();
    });
  });

  it('should be able to delete test results by database id', function(done) {
    chai.request(server).
    delete('/api/' + id).
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      done();
    });
  });
});
