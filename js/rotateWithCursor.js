var strength = 7;
var mouseOverContainer = document.getElementById("projects");
var ex1Layer;

$(() => window.addEventListener("onApply3DEffect", () => {

    console.log("onApply3DEffect");

    function transforms(x, y, el) {
        let box = el.getBoundingClientRect();
        let calcX = -(y - box.y - (box.height / 2)) / window.innerWidth * strength;
        let calcY = (x - box.x - (box.width / 2)) / window.innerHeight * strength;

        return "perspective(100px) "
            + "   rotateX(" + calcX + "deg) "
            + "   rotateY(" + calcY + "deg) ";
    };

    function transformElement(el, xyEl) {
        el.style.transform = transforms.apply(null, xyEl);
    }

    mouseOverContainer.onmousemove = function (e) {
        let xy = [e.clientX, e.clientY];
        let position = xy.concat([ex1Layer]);

        window.requestAnimationFrame(function () {
            if (ex1Layer != null) {
                transformElement(ex1Layer, position);
                //ex1Layer.style.transition = "all 0s"
                $(ex1Layer).clearQueue();
            }
        });
    };

    $('document').ready(function () {
        $(".project-preview").mouseover(function () {
            setFokusElement(this);
        });
        $(".project-preview").mouseleave(function () {
            if (ex1Layer == this) {
                resetFokusElement(ex1Layer, this);
            }
        });
    });

    function setFokusElement(element) {

        if (ex1Layer != null) {
            ex1Layer.style.transition = "all 0.1s";
            ex1Layer.style.transform = "perspective(100px) "
                + "   rotateX(0deg) "
                + "   rotateY(0deg) ";
        }

        ex1Layer = element;

        ex1Layer.style.transition = "all 0.1s";

        var element = ex1Layer;

        setTimeout(function () {
            if (element != null) {
                element.style.transition = "all 0s";
            }
        }, 300);
    }

    function resetFokusElement(current, left) {

        left.style.transition = "all 0.1s";
        left.style.transform = "perspective(100px) "
            + "   rotateX(0deg) "
            + "   rotateY(0deg) ";

        ex1Layer = null;
    }
}));