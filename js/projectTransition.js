$(() => window.addEventListener("onAddClick", () => attachClickBehaviour()));

PROJECT_IS_OPEN = false;

$(document).mousedown(function (e) {
  var container = $("#project-window");
  if (!container.is(e.target) && container.has(e.target).length === 0 && PROJECT_IS_OPEN && !HAS_IMAGE_IN_FULLSCREEN) {
    closeProject();
    return false;
  }
});

function attachClickBehaviour() {
  $(".project-preview").click(function () {
    openProject($(this), $(this).attr("id"));
    return false;
  });

  let sWidth = 0;
  let sHeight = 0;
  let sPos = { left: 0, top: 0 };
  const duration = 350;

  openProject = function (from, id) {

    const pWindow = $("#project-window");
    const blend = $("#project-popup-blend");
    const preview = $(pWindow).find(".preview");

    var itchLink = undefined;
    var githubLink = undefined;
    var websiteLink = undefined;

    const hasLinkouts = projectsData[id]["linkouts"] !== undefined;

    if (hasLinkouts) { itchLink = projectsData[id]["linkouts"]["itch"] }
    if (hasLinkouts) { githubLink = projectsData[id]["linkouts"]["github"] }
    if (hasLinkouts) { websiteLink = projectsData[id]["linkouts"]["website"] }

    populateLinkout("#LinkoutItch", itchLink);
    populateLinkout("#LinkoutGithub", githubLink);
    populateLinkout("#LinkoutWebsite", websiteLink);

    pWindow.show();
    blend.show();

    populatePageContent("#project-holder", projectsData[id]["pageContent"]);

    let clone = $(from).find(".preview").children(0).clone();
    clone.appendTo(preview);
    clone.css("width", "100%")
    $(from).find(".title").clone().appendTo($(pWindow).find(".logo-holder"));

    sPos = $(from).position();
    sWidth = $(from).width() * 1.2;
    sHeight = $(from).height() * 1.2;


    $(pWindow).css({ width: sWidth, top: sPos.top, left: sPos.left });

    preview.css("min-width", "0%");
    $(pWindow).find(".header").css("height", "auto");

    blend.css("background-color", "rgba(0,0,0,0.5);")

    $(pWindow).animate({
      opacity: 1,
      left: "20vw",
      top: "10vh",
      width: "60vw"
    }, duration, function () {

      PROJECT_IS_OPEN = true;

      $(".closeProject").click(function () {
        closeProject();
        return false;
      });

      setBackgroundBlurred(true);
      window.dispatchEvent(new CustomEvent("onProjectOpened", pWindow));
    })
  };

  closeProject = function () {

    var pWindow = $("#project-window");
    var blend = $("#project-popup-blend");
    $(pWindow).find(".closeProject").off("click");
    $(pWindow).find(".preview").css("min-width", "100%");
    $(pWindow).find(".header").css("height", "60vh");

    blend.css("background-color", "rgba(0,0,0,0);")

    $(pWindow).animate({
      opacity: 0.1,
      left: sPos.left + sWidth * 0.1,
      top: sPos.top + sHeight * 0.1,
      width: sWidth / 1.2,
    }, duration, function () {
      PROJECT_IS_OPEN = false;
      $(this).hide();
      $(pWindow).find(".preview").empty();
      $(pWindow).find(".logo-holder").empty();
      $("#project-holder").empty();
      blend.hide();
      setBackgroundBlurred(false);
    })
  };

  setBackgroundBlurred = function (blurred) {
    $("#content").removeClass("blurred")
    $("#sidebar").removeClass("blurred")

    if (blurred) {
      $("#content").addClass("blurred")
      $("#sidebar").addClass("blurred")
    }
  };

  function populateLinkout(element, link) {
    if (link !== undefined) {
      $(element).show();
      $(element).find("a").attr("href", link);
    } else {
      $(element).hide();
    }
  }

  function populatePageContent(parent, contentData) {
    if (contentData !== undefined) {
      var content = '<div class="row">';
      $(contentData).each((index) => {
        content += '<div class="col-12 col-xl-6">';
        $(contentData[index]).each((index2) => {
          content += createElementFromData(contentData[index][index2]);
        });
        content += '</div>';
      });
      content += '</div>';
      $(parent).append($(content));
    }
  }

  function createElementFromData(data) {
    const type = data["type"];
    switch (type) {
      case "img":
        var description = "";
        if (data["description"] !== undefined) {
          description = '<i>' + data["description"] + '</i>';
        }
        return '<img src="' + data["url"] + '">' + description;

      case "youtube":
        return '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="https://www.youtube.com/embed/' + data['url'] + '?rel=0" allowfullscreen></iframe></div>';
      case "p":
        return iterateThroughElementsAndCreate(type, data["content"]);
      case "li":
        return '<ul>' + iterateThroughElementsAndCreate(type, data["content"]) + '</ul>';
      case "h2":
        return '<h2 id ="' + data["content"] + '"> ' + data["content"] + '</h2>'
      default:
        return createElementOpenClose(type, data["content"]);
    }
  }
};