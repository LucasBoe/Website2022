$(() => window.addEventListener("onProjectOpened", () => attachClickBehaviourToImages("#project-window")));
$(() => window.addEventListener("onLoadedPrototypes", () => attachClickBehaviourToImages("#prototypeWrapper")))

HAS_IMAGE_IN_FULLSCREEN = false;
TRANSITION_DURATION = 200;

$(document).mouseup(function (e) {
    var container = $("#image-container");
    if (!container.is(e.target) && container.has(e.target).length === 0 && HAS_IMAGE_IN_FULLSCREEN) {
        closeImageFullscreen();
        return false;
    }
});

function attachClickBehaviourToImages(imageContainer) {
    $(imageContainer).find("img").each(function () {
        $(this).click(() => openInFullscreen(this));
    });
}

function openInFullscreen(image) {


    console.log("openInFullscreen");

    HAS_IMAGE_IN_FULLSCREEN = true;


    console.log($("#image-fullscreen-overlay"));

    $("#image-fullscreen-overlay").fadeIn(TRANSITION_DURATION);
    $("#image-fullscreen-overlay").find("img").attr("src", $(image).attr("src"));
    $("#image-fullscreen-overlay").find("#button-back").click(() => closeImageFullscreen());
    $("#image-fullscreen-overlay").find(".image-container").css({
        "transform": "scale( " + 1 + ")"
    });
}

function closeImageFullscreen() {
    HAS_IMAGE_IN_FULLSCREEN = false;
    $("#image-fullscreen-overlay").fadeOut(TRANSITION_DURATION);
    $("#image-fullscreen-overlay").find(".image-container").css({
        "transform": "scale( " + 0.5 + ")"
    });
}