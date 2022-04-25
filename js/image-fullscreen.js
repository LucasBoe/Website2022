$(() => window.addEventListener("onProjectOpened", () => attachClickBehaviourToImages()));

HAS_IMAGE_IN_FULLSCREEN = false;

$(document).mouseup(function (e) {
    var container = $("#image-container");
    if (!container.is(e.target) && container.has(e.target).length === 0 && HAS_IMAGE_IN_FULLSCREEN) {
        closeImageFullscreen();
        return false;
    }
});

function attachClickBehaviourToImages() {
    $("#project-window").find("img").each(function () {
        $(this).click(() => openInFullscreen(this));
    });
}

function openInFullscreen(image) {
    HAS_IMAGE_IN_FULLSCREEN = true;
    $("#image-fullscreen-overlay").fadeIn(500);
    $("#image-fullscreen-overlay").find("img").attr("src", $(image).attr("src"));
    $("#image-fullscreen-overlay").find("#button-back").click(() => closeImageFullscreen());
}

function closeImageFullscreen() {
    HAS_IMAGE_IN_FULLSCREEN = false;
    $("#image-fullscreen-overlay").fadeOut(500);
}