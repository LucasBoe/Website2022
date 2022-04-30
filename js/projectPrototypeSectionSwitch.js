$(() => {
    $(".project-tab").click(function () {
        if (!$(this).hasClass("project-tab-active")) {

            var target = $(this).attr("target");

            var x = "0";
            if (target == "prototypes")
                x = "-50%"

            $(".p-col").each(function () {
                if ($($(this).find(".row")).is("#" + target))
                    $(this).css({
                        "opacity": "1"
                    })
                else $(this).css({
                    "opacity": "0"
                })
            });

            $(".p-row").css({
                "transform": "translateX( " + x + ")"
            })

            $(".project-tab").each(function () {
                var className = "project-tab-active";
                if (!$(this).hasClass(className))
                    $(this).addClass(className);
                else
                    $(this).removeClass(className);
            });
        }
    })
});