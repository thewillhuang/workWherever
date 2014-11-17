'use strict';
var expect = require('chai').expect;
var Counter = require('../myMod/test');

describe('Counter Object Testing', function() {
  it('should initialize with a count of 0', function(done) {
    var count1 = new Counter();
    expect(count1.count).to.eql(0);
    done();
  });
  it('should incriment the counter when called increment()', function(done) {
    var count1 = new Counter();
    count1.increment();
    expect(count1.count).to.eql(1);
    done();
  });
  it('should report and return the current counter', function(done) {
    var count1 = new Counter();
    count1.increment();
    count1.increment();
    expect(count1.getValue()).to.eql(2);
    done();
  });
});
