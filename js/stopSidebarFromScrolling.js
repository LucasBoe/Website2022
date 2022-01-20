$(document).ready(function () {
    $('#indicator').text('At the top!');

    $(document).on('scroll', function () {
        var scroll = $(document).scrollTop();
        var sidebarHeight = $("#sidebar").height();
        var windowHeight = $(window).height();

        var dif = Math.min(scroll, Math.max((windowHeight + scroll) - sidebarHeight, 0));

        if ($("#content").offset().top > 100)
            dif = 0;

        $("#sidebar").css({ top: dif });
    });
});