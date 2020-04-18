$(document).ready(function () {
    $('.date-data').each(function () {
        var crDate = $(this).text();
        $(this).html(Date_to_String(crDate));
    });   
});

$(document).ready(function() {
    var element = $('meta[name="active-menu"]').attr('content');
    $('#' + element).addClass('active');
});

function Date_to_String(date_model) {
    if (date_model == null || date_model.trim().length == 0) {
        return '';
    } else {
        var formated_date = new Date(date_model);
        var day = formated_date.getDate();
        if (day < 10) {
            day = '0' + day.toString();
        }

        var month = formated_date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month.toString();
        }

        var year = formated_date.getFullYear();

        var return_format = day + ' / ' + month + ' / ' + year;

        return return_format;
    }
};
