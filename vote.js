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
    $.each(data_name, function (i, name) {
      $('#pop-selected').append($('<option>', { 
          value: i,
          text : name 
        }));
        console.log(name);
    });
  }

  // console.log(Cookies.get("token"))
    // console.log('2222');
})