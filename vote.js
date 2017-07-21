const arr_data = [];
var arr_popular = [];
var arr_software = [];
var arr_hardware = [];

$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:8080/group',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      $.map(data, function (el) {
        arr_data.push({
          id: el.code,
          name: el.name
        });
        arr_popular = arr_data;
        arr_software = arr_data;
        arr_hardware = arr_data;
        get_populars(arr_popular)
        get_softwares(arr_software)
        get_hardwares(arr_hardware);
    })
  }
})

$(document).on('change', 'select', function() {
  var group_type = ["popular-selected", "software-selected", "hardware-selected"];
  if(group_type[0] != $(this).attr("id")) {
    arr_software = remove_state($('#'+$(this).attr("id") +' option:selected').text());
    get_softwares(arr_software);
    arr_hardware = remove_state($('#'+$(this).attr("id") +' option:selected').text());
    get_hardwares(arr_hardware);
  }else if(group_type[1] != $(this).attr("id")) {
    arr_popular = remove_state($('#'+$(this).attr("id") +' option:selected').text());
    get_softwares(arr_popular);
    arr_hardware = remove_state($('#'+$(this).attr("id") +' option:selected').text());
    get_hardwares(arr_hardware);
  }else if(group_type[2] != $(this).attr("id")){
    arr_software = remove_state($('#'+$(this).attr("id") +' option:selected').text());
    get_softwares(arr_popular);
    arr_popular = remove_state($('#'+$(this).attr("id") +' option:selected').text());
    get_hardwares(arr_hardware);
  }
  console.log(arr_software);
  console.log(arr_popular);
  console.log(arr_hardware);
  $('#'+$(this).attr("id") +' option[value=0]').remove();
});

  $('#submit-vote').click(function () {
    $.ajax({
      url: 'http://localhost:8080/verify/' + Cookies.get("token")
    }).done(function (data) {
      console.log(data)
      var pop = $('#pop-selected').val()
      var hard = $('#hard-selected').val()
      var soft = $('#soft-selected').val()
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/vote',
        data: JSON.stringify({
          token: Cookies.get('token'),
          pop: pop,
          hard: hard,
          soft: soft
        }),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
      }).done(function (data) {
        console.log(data);
      }).fail(function (data) {
        console.log(data)
      })
    }).fail(function (data) {
      console.log(data)
      //alert that token is expire and return to login page
      location.href = "./index.html"
    })
  })
})

function remove_state(text) {
  return arr_data.filter(function(el) {
    return el.name !== text;
  });
}

function get_populars(populars) {
  var $popular = $('#popular-selected');
  $('#popular-selected option[value!=0]').remove();
  $.each(populars, function (i, data) {
    $popular.append($('<option>', { value: data.id, text : data.name })); 
  });
}

function get_softwares(softwares) {
  var $software = $('#software-selected');
  $('#software-selected option[value!=0]').remove();
  $.each(softwares, function(i, data) {
    $software.append($('<option>', { value: data.id, text : data.name }));
  });
}

function get_hardwares(hardwares) {
  var $hardware = $('#hardware-selected');
  $('#hardware-selected option[value!=0]').remove();
  $.each(hardwares, function(i, data) {
    $hardware.append($('<option>', { value: data.id, text : data.name }));
  })
}