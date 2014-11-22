$(function() {
  var getLocation = function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var location = position.coords.latitude + ',' + position.coords.longitude;

      var url = '/google/inj/location=' +
        location + '&radius=500';

      if ($('#type').val()) { url += '&types=' + $('#type').val(); }
      if ($('#name').val()) { url += '&name=' + $('#name').val(); }
      $('#current').text(location).attr('href', url);
    });
  };

  $('#url').on('blur', function() {
    $('#start').attr('href', $('#url').val());
  });

  $('#type').on('blur', function() {
    $('#current').text('');
    getLocation();
  });

  $('#name').on('blur', function() {
    $('#current').text('');
    getLocation();
  });

  getLocation();
});
