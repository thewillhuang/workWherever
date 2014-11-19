$(function() {
  $('#delete').on('click', function() {
    $.ajax({
      type: 'DELETE',
      url: '/api/' + $('#id').val(),
      success: function() {
        $('#id').val('');
      }
    });
  });
});
