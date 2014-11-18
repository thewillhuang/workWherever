'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var WifiHotspot = require('../myMod/wifi_hotspot');

var server = 'http://localhost:' + (process.env.PORT || 3000);
var expect = chai.expect;

require('../index');
chai.use(chaihttp);

describe('REST API tests', function() {
  var id;

  it('should be able to post Wi-Fi hotspot data', function(done) {
    chai.request(server).
    post('/api').
    field('ipAddress', '8.8.8.8').
    field('downloadMbps', 30.0).
    field('uploadMbps', 20.0).
    field('pingMsec', 100).
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('id');
      id = res.body.id;
      done();
    });
  });

  it('should be able to get data by database id', function(done) {
    chai.request(server).
    get('/api/' + id).
    end(function(err, res) {
      expect(err).equals(null);
      expect(res).to.be.a('object');
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.property('ipAddress');
      expect(res.body.ipAddress).to.equal('8.8.8.8');
      expect(res.body).to.have.property('ispName');
      expect(res.body.ispName).to.equal('Google');
      done();
    });
  });

  it('cleanup', function(done) {
    WifiHotspot.remove({_id: id}, function(err) {
      expect(err).to.equal(null);
      done();
    });
  })
});
