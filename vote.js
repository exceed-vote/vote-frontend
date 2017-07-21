$(document).ready(function() {
  $.ajax({
        url: 'http://localhost:8080/group/',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data)
        }
    })
  console.log(Cookies.get("token"))
  
})