$(function() {
  var onTestCompleted = function(testResult) {
    $('#ipAddress').val(testResult.ip_address);
    $('#downloadMbps').val(testResult.download);
    $('#uploadMbps').val(testResult.upload);
    $('#pingMsec').val(testResult.latency);
  };

  var onError = function(error) {
    console.log(error);
  };

  var onProgress = function(progress) {
  };

  SomApi.account = 'SOM5464bf2dc2f02';  //your API Key here
  SomApi.domainName = 'speedof.me';     //your domain or sub-domain here
  SomApi.onTestCompleted = onTestCompleted;
  SomApi.onError = onError;
  SomApi.onProgress = onProgress;

  SomApi.config.sustainTime = 1; // 1 (Faster Test) - 8 (More Accurate)
  SomApi.config.testServerEnabled = true;
  SomApi.config.userInfoEnabled = true;
  SomApi.config.latencyTestEnabled = true;
  SomApi.config.uploadTestEnabled = true;
  SomApi.config.progress.enabled = false;
  SomApi.config.progress.verbose = false;

  //SomApi.startTest();
});

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
