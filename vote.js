const arr_data = [];
$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:8080/group',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        $.map(data, function(el) { 
          arr_data.push({
            id: el.code,
            name: el.name
          });
        });
        get_options(arr_data);
    }
  })

})

$(document).on('change', 'select', function() {
  console.log(this);
  // $('#software-selected', this).remove();
});

function get_options(arr) {
  $('select option').remove();
  var $popular = $('#popular-selected');
  var $software = $('#software-selected');
  var $hardware = $('#hardware-selected');
  $popular.append($('<option value="" disabled selected>Select popular vote</option>'));
  $software.append($('<option value="" disabled selected>Select software vote</option>'));
  $hardware.append($('<option value="" disabled selected>Select hardware vote</option>'));
  $.each(arr, function (i, data) {
    $popular.append($('<option>', { value: data.id, text : data.name }));
    $software.append($('<option>', { value: data.id, text : data.name }));
    $hardware.append($('<option>', { value: data.id, text : data.name }));
  });
}

function remove_state() {
  
}