$(() => {
    $("include").each(function () {
        var data = $(this).attr("data");
        ($(this).load(data, function () {
            $(this).children().unwrap();
        }));
    });
})