$(document).ready(function() {
    //login function
    $('#submit-button').on('click',function() {
        var username = $('#username').val()
        var password = $('#password').val()
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/login',
            data: JSON.stringify({
                id: username,
                name: password
            }),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
        }).done(function(data) {
            console.log(data.token);
            //TODO cache data.token for use to sent back the vote
            Cookies.set("token", data.token, { expires: 1});
            location.href = "./vote.html" 
        }).fail(function(data) {
            console.log(data)
            //show error
        })
    })
})