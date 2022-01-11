let constrain = 100;
let mouseOverContainer = document.getElementById("projects");
let ex1Layer = document.getElementById("test");

function transforms(x, y, el) {
  let box = el.getBoundingClientRect();
  let calcX = -(y - box.y - (box.height / 2)) / constrain;
  let calcY = (x - box.x - (box.width / 2)) / constrain;
  
  return "perspective(100px) "
    + "   rotateX("+ calcX +"deg) "
    + "   rotateY("+ calcY +"deg) "
    + "   scale(1.2)";
};

 function transformElement(el, xyEl) {
  el.style.transform  = transforms.apply(null, xyEl);
}

mouseOverContainer.onmousemove = function(e) {
  let xy = [e.clientX, e.clientY];
  let position = xy.concat([ex1Layer]);

  window.requestAnimationFrame(function(){
      if (ex1Layer != null) {
    transformElement(ex1Layer, position);
    ex1Layer.style.transition = "all 0s"
    $(ex1Layer).clearQueue();
      }
  });
};

$('document').ready(function(){
    $( ".project-preview" ).mouseover(function() {
        setFokusElement(this);
    });
    $( ".project-preview" ).mouseleave(function() {
        if (ex1Layer == this){
        resetFokusElement(ex1Layer, this);
        }
    });
});

function setFokusElement(element) {

    if (ex1Layer != null) {
        ex1Layer.style.transition = "all 0.5s";
        ex1Layer.style.transform = "perspective(100px) "
        + "   rotateX(0deg) "
        + "   rotateY(0deg) "
        + "   scale(1)";
    }
    ex1Layer = element;

    ex1Layer.style.transition = "all 0.5s";
    
    if (ex1Layer != null) {
        $(ex1Layer).delay(500)
        $(ex1Layer).queue(function (next) { 
            this.style.transition = "all 0s";
        next(); 
        });
    }
}

function resetFokusElement(current, left) {

        left.style.transition = "all 0.5s";
        left.style.transform = "perspective(100px) "
    + "   rotateX(0deg) "
    + "   rotateY(0deg) "
    + "   scale(1)";
    
        $(left).delay(500)
        $(left).queue(function (next) { 
            this.style.transition = "all 0s";
        next(); 
        });
        ex1Layer = null;
}