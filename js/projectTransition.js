$(".project-preview").click(function(){
    openProject($(this), $(this).attr("id"));
    return false;
});

var sWidth = 0;
var sHeight = 0;
var sPos = {left: 0, top: 0};
var duration = 2000;

openProject = function(from, id) {

    var pWindow = $("#project-window");
    var blend = $("#project-popup-blend");

    pWindow.show();
    blend.show();

    $("#project-holder").load('atlb.html');
    $(from).find(".preview").children(0).clone().appendTo($(pWindow).find(".preview"));
    $(from).find(".title").clone().appendTo($(pWindow).find(".logo"));

    sPos = $(from).position();
    sWidth = $(from).width();
    sHeight = $(from).height();

    $(pWindow).css({width: sWidth, height: sHeight ,top: sPos.top, left: sPos.left});

    $(blend).animate({
        opacity: 0.5
    }, duration);

    $(pWindow).animate({
        opacity: 1,
        left: "10vw",
        top: "10vh",
        width: "80vw",
        height: "100%",
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

    $(blend).animate({
        opacity: 0
    }, duration, function() {
        $(this).hide();
    });

    $(pWindow).animate({
        opacity: 0.9,
        left: sPos.left,
        top: sPos.top,
        width: sWidth,
        height: sHeight,
      }, duration, function() {
        $(this).hide();
        $(pWindow).find(".preview").empty();
        $(pWindow).find(".logo").empty();
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