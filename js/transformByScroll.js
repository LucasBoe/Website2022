$(() => {
    $(".onScroll-makeOpaque").each(function () {
        $(this).css({
            "opacity": "0"
        });
    });
});

$(() => window.addEventListener("onApply3DEffect", () => {

    $(".onScroll-makeOpaque").each(function () {
        $(this).css({
            "transition": "opacity 1s linear"
        });
    });

    rotateByScroll(0);
    transformByScroll(0);
    makeOpaqueByScroll(0);

    $("#wrapper").scroll(function () {
        var amount = $("#wrapper").scrollTop();
        rotateByScroll(amount);
        transformByScroll(amount);
        makeOpaqueByScroll(amount);
    });
}));

function map_range(value, low1, high1, low2, high2) {
    return low2 + (value - low1) * (high2 - low2) / (high1 - low1)
}

function makeOpaqueByScroll(amount) {
    $(".onScroll-makeOpaque").each(function () {

        var centerY = $(this).offset().top - $(window).height() / 2;
        var opacity = Math.max(0, Math.min((amount - centerY), 1));

        var pointerEvents = opacity > 0.5 ? "all" : "none";

        $(this).css({
            "opacity": opacity,
            "pointer-events": pointerEvents
        });
    });
}

function rotateByScroll(amount) {
    $(".onScroll-rotate").each(function () {
        var fromLow = $(this).attr("srollStart");
        var fromHigh = $(this).attr("srollEnd");
        var toLow = $(this).attr("rotMin");
        var toHigh = $(this).attr("rotMax");
        var offset = $(this).attr("rotOff");
        var sign = $(this).attr("rotSign");

        var deg = (+map_range(amount, fromLow, fromHigh, toLow, toHigh) + +offset) * sign;

        var { x, y, z } = getTranslateValues(this);

        $(this).css({
            "transform": "translate(" + x + "px , " + y + "px ) rotate(" + deg + "deg) "
        });
    });
}

function transformByScroll(amount) {
    $(".on-scroll-transform-projects").each(function () {
        var border = $("#projects").offset().top + $(window).height() * 0.1;

        var strength = Math.pow(Math.min((amount - border), 0) * -0.0021, 0.5);

        $(this).css({
            "transform": "translateZ(" + strength * -1 + "px) translateY(" + strength * 300 + "px) rotateX(" + strength * 0.1 + "deg) "
        });
    });
}


/**
 * Gets computed translate values
 * @param {HTMLElement} element
 * @returns {Object}
 */
function getTranslateValues(element) {
    const style = window.getComputedStyle(element)
    const matrix = style['transform'] || style.webkitTransform || style.mozTransform

    // No transform property. Simply return 0 values.
    if (matrix === 'none' || typeof matrix === 'undefined') {
        return {
            x: 0,
            y: 0,
            z: 0
        }
    }

    // Can either be 2d or 3d transform
    const matrixType = matrix.includes('3d') ? '3d' : '2d'
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

    // 2d matrices have 6 values
    // Last 2 values are X and Y.
    // 2d matrices does not have Z value.
    if (matrixType === '2d') {
        return {
            x: matrixValues[4],
            y: matrixValues[5],
            z: 0
        }
    }

    // 3d matrices have 16 values
    // The 13th, 14th, and 15th values are X, Y, and Z
    if (matrixType === '3d') {
        return {
            x: matrixValues[12],
            y: matrixValues[13],
            z: matrixValues[14]
        }
    }
}