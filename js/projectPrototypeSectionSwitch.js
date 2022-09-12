$(() => {
    $(".project-tab").click(function () {
        if (!$(this).hasClass("project-tab-active")) {

            var isProto = $(this).attr("target") == "prototypes";
            var id = isProto ? "#prototypeWrapper" : "#projectWrapper";

            $(".p-col").each(function () {

                var visible = $(this).is(id);
                $(this).css({
                    "opacity": visible ? "1" : "0"
                })

                if (visible)
                    $(this).css({ "height": "auto" })
                else
                    $(this).delay(500).css({ "height": "0" })
            });

            $(".p-row").css({
                "transform": "translateX( " + (isProto ? "-50%" : "0") + ")"
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