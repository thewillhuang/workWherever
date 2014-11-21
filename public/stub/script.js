$(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var location = position.coords.latitude + ',' + position.coords.longitude;

    $('#current').text(location).attr('href',
      'https://work-wherever.herokuapp.com/google/inj/location=' +
      location + '&radius=500');
  });

  $('#url').on('blur', function() {
    $('#start').attr('href', 'https://work-wherever.herokuapp.com' +
      $('#url').val());
  });
});
