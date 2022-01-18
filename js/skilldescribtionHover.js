currentSkillgroupHovered = undefined;

$(() => {
    $('.skillgroup').mouseenter(function () {
        trySetHighlight(this)
    });
    $('.skillgroup').mouseleave(function () {
        tryRemoveHighlight(this)
    });
});

function trySetHighlight(element) {
    currentSkillgroupHovered = element;
    var html = $(element).find("ul").html();
    console.log(html);
    $("#skillgroup-text-container").html(html);
}

function tryRemoveHighlight(element) {

    if (element == currentSkillgroupHovered) {
        $("#skillgroup-text-container").html("");
    }
}