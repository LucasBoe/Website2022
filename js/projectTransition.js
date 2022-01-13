$(".project-preview").click(function(){
    openProject($(this), $(this).attr("id"));
    return false;
});

var sWidth = 0;
var sHeight = 0;
var sPos = {left: 0, top: 0};
var duration = 500;

openProject = function(from, id) {

    var pWindow = $("#project-window");
    var blend = $("#project-popup-blend");
    var preview = $(pWindow).find(".preview");

    pWindow.show();
    blend.show();

    $("#project-holder").load('atlb.html');
    var clone = $(from).find(".preview").children(0).clone();
    clone.appendTo(preview);
    clone.css("width", "100%")
    $(from).find(".title").clone().appendTo($(pWindow).find(".logo-holder"));

    sPos = $(from).position();
    sWidth = $(from).width() * 1.2;
    sHeight = $(from).height() * 1.2;

    
    $(pWindow).css({width: sWidth,top: sPos.top, left: sPos.left});

    preview.css("min-width", "0%");
    $(pWindow).find(".header").css("height", "auto");

    blend.css("background-color", "rgba(0,0,0,0.5);")

    $(pWindow).animate({
        opacity: 1,
        left: "20vw",
        top: "10vh",
        width: "60vw"
      }, duration, function() {
        $(pWindow).find("#close").click(function(){
            closeProject();
            return false;
        });
        setBackgroundBlurred(true);
      })
};

closeProject = function() {

    var pWindow = $("#project-window");
    var blend = $("#project-popup-blend");
    $(pWindow).find("#close").off("click");
    $(pWindow).find(".preview").css("min-width", "100%");
    $(pWindow).find(".header").css("height", "60vh");

    blend.css("background-color", "rgba(0,0,0,0);")

    $(pWindow).animate({
        opacity: 0.1,
        left: sPos.left + sWidth * 0.1,
        top: sPos.top + sHeight * 0.1,
        width: sWidth / 1.2,
      }, duration, function() {
        $(this).hide();
        $(pWindow).find(".preview").empty();
        $(pWindow).find(".logo-holder").empty();
        blend.hide();
        setBackgroundBlurred(false);
      })
};

setBackgroundBlurred = function(blurred) {
    $("#content").removeClass("blurred")
    $("#sidebar").removeClass("blurred")

    if (blurred) {
        $("#content").addClass("blurred")
        $("#sidebar").addClass("blurred")
    }
};