'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;

require('../index');
chai.use(chaihttp);

describe('REST API tests', function() {
  it('test to make sure google api works', function(done) {
    chai.request('http://localhost:3000')
      .get('/google/api/location=-33.8670522,151.1957362&radius=500&types=food&name=cruise')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.results).to.be.a('Array');
        expect(res.body.results[0]).to.be.a('object');
        expect(res.body.results[0].place_id).to.be.a('string');
        done();
      });
  });
});

/*
describe('basic user login crud', function() {
    var id;
    var jwttoken;
    it('should create a user', function(done) {
        chai.request('http://localhost:3000')
        .post('/api/users')
        .send({email: 'test@example.com', password: 'foobar123'})
        .end(function(err, res) {
            expect(err).to.eql(null);
            expect(res.body).to.have.property('jwt');
            jwttoken = res.body.jwt;
            done();
        });
    });
*/
