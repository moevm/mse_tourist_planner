window.onload = function() {
    $.getJSON('auction/all',{}, function (j) {
        console.log(j);
        $("#newDate").val(j.date);
        $("#newTime").val(j.time);
        $("#newTimeout").val(j.timeout);
        $("#newInterval").val(j.interval);
    })
};
