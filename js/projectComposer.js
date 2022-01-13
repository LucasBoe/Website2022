/// <reference path="./jquery-3.6.0.js" />
$(() => {

    $.getJSON("projects.json", (projects) => {

        $.each(projects, (key, val) => {

            var project = projects[key];

            $.ajax({
                type: "GET",
                url: 'projectTemplate.html',
                async: false
            }).done((data) => {
                $(data).appendTo('#projects');

                var instance = $("#projects").children().last();

                //load preview
                var type = project["previewType"];
                var preview = $(instance).find(".preview");

                if (type == "gif") {
                    preview.append($(['<img src="', project["previewUrl"], '">'].join("\n")))
                } else {
                    preview.append($([
                        '<video autoplay loop muted inline>',
                        '<source src="',
                        project["previewUrl"],
                        '" type="video/mp4">',
                        '</video>'].join("\n")))
                }

                //load logo
                $(instance).find(".overlay img").attr("src", project["logoUrl"]);

                //load tags
                var tagParent = $(instance).find(".project-tags");
                $.each(project["tags"], function (index, tag) {
                    $(tagParent).append($(['<li>', tag, '</li>'].join("\n")))
                });

                //load describtion
                $(instance).find(".info").prepend(project["describtion"]);

            });

            window.dispatchEvent(new CustomEvent("onApply3DEffect"));
            window.dispatchEvent(new CustomEvent("onAddClick"));
            console.log(key);
        });

    });

    console.log("dispatch");


});