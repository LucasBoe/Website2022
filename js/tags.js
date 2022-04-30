let transitionDuration = 100;

$(document).ready(function () {

  $('span.tag').click(function () {

    if ($(this)[0].innerHTML !== "None") {
      if ($(this).hasClass("activeTag")) {
        $(this).removeClass("activeTag");
      } else {
        //put all passive tags back
        $(".activeTag").each(function () {
          if (this.innerHTML != "None")
            //$(this).appendTo(".availableTags");
            $(this).removeClass("activeTag");
        })

        console.log("set to active:", $(this).text());
        //$(this).appendTo(".activeTags");
        $(this).addClass("activeTag");
      }

      //update the projetcs which are shown
      var projects = $("#projects").children()
      var activeTags = $(".activeTag");

      //loop trough each project
      projects.each(function () {

        //get the tags of the project
        var projectTags = $(this).find("ul").children();

        //convert the tags into simple strings to compare the later
        var pTags = [""];
        for (var i = projectTags.length - 1; i >= 0; i--) {
          pTags[i] = $(projectTags[i]).text();
        }

        //by default every project should be shown
        var show = true;

        //loop trough all active tags
        activeTags.each(function () {
          var tag = this.innerHTML;
          //is the currently selected tag not the placeholder 'None' tag?
          if (tag != "None") {

            //is the currently selected tag not part of the proejct tags?
            if ($.inArray(tag, pTags) == -1) {
              //if thats the case, dont show the project.
              show = false;
            }
          }
        })

        //update the visibility of the projects
        var isVisbible = $(this).css("display") == "block";
        $(this).data("visibleBefore", isVisbible);
        $(this).data("visible", show);
      })

      //update visibility...
      projects.each(function () {
        var visible = $(this).data("visible") || $(this).data("visibleBefore");
        $(this).setElementActive(visible);
      });

      //fetch positions before transition
      var projectPositionsInbetween = getChildPositionArray(projects);

      //update visibility...
      projects.each(function () {
        var visible = $(this).data("visible");
        $(this).setElementActive(visible);
      });

      //fetch target positions
      var projectPositionsAfter = getChildPositionArray(projects);

      animateProjects(projects, transitionDuration, projectPositionsInbetween, projectPositionsAfter);
    }
  })

  getChildPositionArray = function (projects) {
    var projectPositions = [];
    let i = 0;
    projects.each(function () {
      projectPositions[i] = $(this).position();
      i++;
    });
    return projectPositions;
  };

  animateProjects = function (projects, duration, projectPositionsInbetween, projectPositionsAfter) {

    //set everything active
    projects.each(function () {
      $(this).setElementActive(true);
    });

    var arrayLength = projects.length;
    for (var i = 0; i < arrayLength; i++) {

      var inbetween = projectPositionsInbetween[i];
      var after = projectPositionsAfter[i];

      var end = {
        top: (after.top - inbetween.top), left: (after.left - inbetween.left)
      };

      var project = projects[i];

      var targetOpacity = 0;
      if ($(project).data("visible")) {
        targetOpacity = 1;
      }

      $(project).css("transition", "transform 0.25s ease")
      $(project).css("transform", "translate(" + +end.left + "px ," + +end.top + "px )");


      $(project).animate({
        opacity: targetOpacity,
      }, duration, function () {
        var visible = $(this).data("visible");

        var z = -9999;
        if (visible) z = 0;
        $(this).css("z-index", z)
      });
    }
  }

});

jQuery.fn.setElementActive = function (visible) {

  if (visible) {
    $(this).show();
  } else {
    $(this).hide();
  }
};