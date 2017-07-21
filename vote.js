$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:8080/group',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        var arr = $.map(data, function(el) { return el.name });
        get_option(arr);
    }
  })

  function get_option(data_name) {
    var $popular = $('#popular-selected');
    var $software = $('#software-selected');
    var $hardware = $('#hardware-selected');

    $.each(data_name, function (i, name) {
      $popular.append($('<option>', { value: i, text : name }));
      $software.append($('<option>', { value: i, text : name }));
      $hardware.append($('<option>', { value: i, text : name }));
    });
  }

  // console.log(Cookies.get("token"))
    // console.log('2222');
})