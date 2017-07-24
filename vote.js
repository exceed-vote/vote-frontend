const arr_data = [];
var pop = '';
var soft = '';
var hard = '';

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
      })
      getAllData();
    }
  })

  $(document).on('change', 'select', function(evt) {
    var select = $('#' + evt.target.id + ' option:selected');
    if (evt.target.id === 'popular-selected') {
      pop = select.text();
    } else if (evt.target.id === 'software-selected') {
      soft = select.text();
    } else {
      hard = select.text();
    }
    getAvailable();
    $('#'+ evt.target.id +' option[value=0]').remove();
  });

  $('#submit-vote').click(function () {
    $.ajax({
      url: 'http://localhost:8080/verify/' + Cookies.get("token")
    }).done(function (data) {
      console.log(data)
      var pop = $('#popular-selected').val()
      var hard = $('#hardware-selected').val()
      var soft = $('#software-selected').val()
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
        alert('Vote Successful');
        location.href = "./index.html"
      }).fail(function (data) {
        console.error(data)
      })
    }).fail(function (data) {
      alert('Request timeout please login again')
      location.href = "./index.html"
    })
  })
})

function getAllData() {
  var $popular = $('#popular-selected');
  var $software = $('#software-selected');
  var $hardware = $('#hardware-selected');
  $.each(arr_data, function (i, data) {
        $popular.append($('<option>', { value: data.id, text : data.name })); 
        $software.append($('<option>', { value: data.id, text : data.name }));
        $hardware.append($('<option>', { value: data.id, text : data.name }));
  })
}

function getAvailable() {
  var $popular = $('#popular-selected');
  var $software = $('#software-selected');
  var $hardware = $('#hardware-selected');
    $('select option[value!=0]').remove();
    addSelected();
    $.each(arr_data, function (i, data) {
      if(data.name !== pop && data.name !== soft && data.name !== hard) {
        $popular.append($('<option>', { value: data.id, text : data.name })); 
        $hardware.append($('<option>', { value: data.id, text : data.name }));
        $software.append($('<option>', { value: data.id, text : data.name }));
      }
    })
}

function addSelected() {
  var $popular = $('#popular-selected');
  var $software = $('#software-selected');
  var $hardware = $('#hardware-selected');
  $.each(arr_data, function (i, data) {
    if (data.name === pop) {
      $popular.append($('<option>', { value: data.id, text : data.name })); 
    } else if (data.name === soft) {
      $software.append($('<option>', { value: data.id, text : data.name }));
    } else if (data.name === hard) {
      $hardware.append($('<option>', { value: data.id, text : data.name }));
    }
  })
}