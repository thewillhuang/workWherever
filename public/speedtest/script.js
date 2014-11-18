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

  var id = getQueryStrings().id;

  //TODO: Perform speed test (client side).

  //TODO: Post the speed test results to the server with the id.
});
