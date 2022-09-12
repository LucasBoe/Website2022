/// <reference path="./jquery-3.6.0.js" />prototypesData

var prototypesData;

$(() => {

    $.getJSON("/json/prototypes.json", (data) => {

        prototypesData = data;

        $.each(prototypesData, (key, val) => {

            var prototype = prototypesData[key];

            $.ajax({
                type: "GET",
                url: 'components/prototypeTemplate.html',
                async: false
            }).done((data) => {
                $(data).appendTo('#prototypeWrapper');

                var instance = $("#prototypeWrapper").children().last();

                //load name
                var name = $(instance).find(".name");
                name.html(prototype["name"]);

                //load description
                var description = $(instance).find(".description");
                $.each(prototype["description"], function (index, text) {
                    $(description).append($(['<p>', text, '</p>'].join("")))
                });

                //load links
                var description = $(instance).find(".links");
                $.each(prototype["linkouts"], function (index, link) {
                    $(description).append($(['<li><a href="', link["link"], '" class="button">', link["text"], '</a></li>'].join("")))
                });

                //load thumbnail
                var thumbnail = $(instance).find("img");
                thumbnail.attr("src", prototype["thumbnailUrl"]);
            });
        });

        window.dispatchEvent(new CustomEvent("onLoadedPrototypes"));
    });
});