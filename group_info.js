var appendData = function (data) {
    var count = 1;
    $(data).each(function (index, value) {
        if (count == 1) {
            $('#group-info').append('<div class="item active">' +  
                '<img src="data:image/png;base64, ' + value.picture+ '" alt="group ' + count + '" class="img-responsive"/>' +
                '<div class="carousel-caption">' +
                '<h1>' + value.name + '</h1>' +
                '<p>' + value.short_description + '</p>' +
                '</div>' +
                '</div>');
                
        }
        else {
        $('#group-info').append('<div class="item">' +
            '<img src="data:image/png;base64, ' + value.picture+ '" alt="group ' + count + '" class="img-responsive"/>' +
            '<div class="carousel-caption">' +
            '<h1>' + value.id + " " + value.name + '</h1>' +
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
        console.log(data);
        appendData(data);
    }).fail(function (data) {
        console.error(data)
        //show error
    })
})