$(document).ready(function () {

  $('span.tag').click(function(){
  console.log("clicked on tag");

  if ($(this)[0].innerHTML == "None") {
    console.log("passive tag");
  } else {
      if ($(this).hasClass("activeTag")) {
        console.log("set to available!");
        //$(this).appendTo(".availableTags");
        $(this).removeClass("activeTag");
      } else {

        //put all passive tags back
        $(".activeTag").each(function() {
          if (this.innerHTML != "None")
            //$(this).appendTo(".availableTags");
            $(this).removeClass("activeTag");
        })

        console.log("set to active!");
        //$(this).appendTo(".activeTags");
        $(this).addClass("activeTag");
      }

      //define if the "none" tag should be shown or not
      if ($(".activeTags").children().length == 2) {
        console.log("only none left");
        $(".none").show();
      } else {
        console.log("but wait... there is more!");
        $(".none").hide();
      }

      //update the projetcs which are shown
      var projects = $("#projects").children()

      //store active tags in list
      var activeTags = $(".activeTag");

      var projectPositionsBefore = getChildPositionArray(projects);
      /*let i = 0;
      var projectPositionsBefore = [];
      projects.each(function(){
        projectPositionsBefore[i] = [$(this).position().left, $(this).position().top];
        i++;
        console.log(i, $(this).position());
      });
      */

      //loop trough each project
      projects.each(function(){

        //get the tags of the project
        var projectTags = $(this).find("ul").children();

        //convert the tags into simple strings to compare the later
        var pTags = [""];
        for (var i = projectTags.length - 1; i >= 0; i--) {
          pTags[i] = projectTags[i].innerHTML;
        }

        //by default every project should be shown
        var show = true;

        //loop trough all active tags
        activeTags.each(function(){
          var tag = this.innerHTML;
          //is the currently selected tag not the placeholder 'None' tag?
          if (tag != "None") {

            //is the currently selected tag not part of the proejct tags?
            if ($.inArray(tag,pTags) == -1) {
              //if thats the case, dont show the project.
              show = false;
            }
          }
        })

        //update the visibility of the projects
        if (show == true) {
          $(this).show();
          $(this).animate({
            opacity: 1
          }, 250, function() {
            
          });
        } else {
          $(this).animate({
            opacity: 0
          }, 250, function() {
            $(this).hide();
          });
          
        }
      })

      var projectPositionsAfter = getChildPositionArray(projects);
      var arrayLength = projectPositionsAfter.length;
      for (var i = 0; i < arrayLength; i++) {
        var before = projectPositionsBefore[i];
        var after = projectPositionsAfter[i];
        var project = projects[i];

        //if (before.top != 0 && after.top != 0)
        {

        project.style.position = "absolute";
        console.log(before);
        project.style.left = before.left;
        project.style.top = before.top;

        $(project).animate({
          left: after.left,
          top: after.top
        }, 250, function() {
          console.log("hrlppp");
          this.style.position = "relative";
          this.style.left = 0;
          this.style.top = 0;
        });
       }
      }

    }
  })

  getChildPositionArray = function(projects) {
    var projectPositions = [];
    let i = 0;
    projects.each(function(){
      projectPositions[i] = $(this).position();
      i++;
    });
    return projectPositions;
  };

});