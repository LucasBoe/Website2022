/// <reference path="./jquery-3.6.0.js" />

var projectsData;

$(() => {

    $.getJSON("/json/projects.json", (data) => {

        projectsData = data;

        $.each(projectsData, (key, val) => {

            var project = projectsData[key];

            $.ajax({
                type: "GET",
                url: 'projectTemplate.html',
                async: false
            }).done((data) => {
                $(data).appendTo('#projects');

                var instance = $("#projects").children().last();

                instance.attr("id", key);

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
                    $(tagParent).append($(['<li>', tag, '</li>'].join("")))
                });

                //load describtion
                $(instance).find(".info").prepend(iterateThroughElementsAndCreate("p", project["describtion"]));

            });
        });

        window.dispatchEvent(new CustomEvent("onApply3DEffect"));
        window.dispatchEvent(new CustomEvent("onAddClick"));
    });
});

function iterateThroughElementsAndCreate(type, content) {
    var string = "";
    $(content).each((index) => {
        string += createElementOpenClose(type, content[index]);
    })
    return string;
}

function createElementOpenClose(typePrefix, content) {
    return '<' + typePrefix + '>' +
        content +
        '</' + typePrefix + '>';
}