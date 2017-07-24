var appendData = function (data) {
    var count = 1;
    $(data).each(function (index, value) {
        if (count == 1) {
            $('#group-info').append('<div class="item active">' +  
                '<img src="/images/groupIMG/g' + count + '.jpg" alt="group ' + count + '" class="img-responsive group"/>' +
                '<div class="center">' +
                '<p>' + value.short_description + '</p>' +
                '</div>' +
                '</div>');
        }
        else {
        $('#group-info').append('<div class="item">' +
            '<img src="/images/groupIMG/g' + 1 + '.jpg" alt="group ' + count + '" class="img-responsive group"/>' +
            '<div class="center">' +
            '<p>' + value.short_description + '</p>' +
            '</div>' +
            '</div>');
        }
        count++;
    });

}

var appendDataM = function (data) {
    var count = 1;
    $(data).each(function (index, value) {
        if (count == 1) {
            $('#group-info').append('<div class="item active">' +  
                '<img src="/images/groupIMG/m' + count + '.jpg" alt="group ' + count + '" class="img-responsive group"/>' +
                '<div class="center">' +
                '<p>' + value.short_description + '</p>' +
                '</div>' +
                '</div>');
        }
        else {
        $('#group-info').append('<div class="item">' +
            '<img src="/images/groupIMG/m' + 1 + '.jpg" alt="group ' + count + '" class="img-responsive group"/>' +
            '<div class="center">' +
            '<p>' + value.short_description + '</p>' +
            '</div>' +
            '</div>');
        }
        count++;
    });

}

$(document).ready(function () {
    //login function
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/group',
    }).done(function (data) {
        if ($(window).width() <= 992) {
            appendDataM(data);
        } else {
            appendData(data);
        }
    }).fail(function (data) {
        console.error(data)
        //show error
    })

    $('.carousel').carousel({
        interval: 3000
    })    
    
})