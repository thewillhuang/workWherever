$(function() {
  // An example of the url:
  // https://workWherever.herokuapp.com/speedtest?id=546b732dd4aa83cf10ec0a80

  var getQueryStrings = function() {
    var assoc  = {};
    var queryString = location.search.substring(1);
    var keyValues = queryString.split('&');

    var decode = function (s) {
      return decodeURIComponent(s.replace(/\+/g, ' '));
    };

    for(var i in keyValues) {
      var key = keyValues[i].split('=');
      if (key.length > 1) {
        assoc[decode(key[0])] = decode(key[1]);
      }
    }

    return assoc;
  };

  var id = getQueryStrings().id;  // Database ID
  var stepKbs = 1024; // Initial size (KB) and increase by in each iteration
  var maxItr = 5;     // Total number of download tests

  var itr = maxItr;
  var msecTotal = 0;
  var msecPrev;

  var speedTest = function(sizeKbs, done) {
    var dfd = $.Deferred();

    var xhr = $.ajax({
      contentType: 'text/plain; charset=utf-8',
      url: '/speedtest/api/' + sizeKbs,
      dataType: 'text',
      success: dfd.resolve,
      error: dfd.reject
    });

    dfd.promise().then(function() {
      var msec = new Date().getTime() - +xhr.getResponseHeader('x-Date');
      if (msecPrev) { msecTotal += msec - msecPrev; }
      msecPrev = msec;
      if (itr-- > 0) return speedTest(sizeKbs + stepKbs, done);
      done();
    }).fail(function(err) {
      done(err);
    });
  };

  var hideWaitAnimation = function(done) {
    done = done || function() {};
    $('#wait').slideUp('fast', done);
  };

  speedTest(stepKbs, function(err) {
    if (err || msecTotal <= 0) {
      //TODO: Retry?
      hideWaitAnimation();
      return;
    }

    var mbps = stepKbs * 8 / (msecTotal / maxItr);  // Average M bits per sec

    var data = {
      _id: id,
      downloadMbps: mbps
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      url: '/speedtest/api',
      dataType: 'json',
      success: function() {
        hideWaitAnimation(function() {
          $('#downloadMbps').
            hide().
            text(data.downloadMbps.toFixed(1) + ' Mbps (down)').
            slideDown('fast');
        });
      },
      error: function() {
        //TODO: Retry post?
        hideWaitAnimation();
      }
    });
  });
});
