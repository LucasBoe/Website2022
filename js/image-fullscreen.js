$(() => window.addEventListener("onProjectOpened", () => attachClickBehaviourToImages()));

function attachClickBehaviourToImages() {
    $("#project-window").find("img").each(function () {
        $(this).click(() => openInFullscreen(this));
    });
}

function openInFullscreen(image) {
    console.log("open ", image)
    $("#image-fullscreen-overlay").fadeIn(500);
    $("#image-fullscreen-overlay").find("img").attr("src", $(image).attr("src"));
    $("#image-fullscreen-overlay").find("#button-back").click(() => {
        $("#image-fullscreen-overlay").fadeOut(500);
    });
}