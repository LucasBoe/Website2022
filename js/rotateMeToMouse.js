
$(() => {
    $(document).mousemove(function (evt) {
        var center_x = $('#eyes').offset().left + $('#me').width() / 2;
        var center_y = $('#eyes').offset().top + $('#me').height() / 2;
        var mouse_x = evt.pageX;
        var mouse_y = evt.pageY;
        var left = calculateOffset(mouse_x - center_x);
        var top = calculateOffset(mouse_y - center_y);

        $('#eyes').css({
            '-webkit-transform': 'translate(' + left + 'px, ' + top + 'px)',
            '-moz-transform': 'translate(' + left + 'px, ' + top + 'px)',
            '-ms-transform': 'translate(' + left + 'px, ' + top + 'px)',
            '-o-transform': 'translate(' + left + 'px, ' + top + 'px)',
            'transform': 'translate(' + left + 'px, ' + top + 'px)',
        });
    })
})

function calculateOffset(relativePosition) {
    return (Math.sign(relativePosition) * Math.sqrt(Math.abs(relativePosition))) / 10;
}