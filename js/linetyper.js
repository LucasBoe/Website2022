var lines;
var lineIndex = 0;
var waitTickTimer = 0;
var currentLine = "";
var text = "";
var state;
const tickDuration = 40;
const lineStayDuration = 3000;

const states = {
    ReduceToMin: 0,
    AddToMax: 1,
    Wait: 2
};

$(() => {

    $.getJSON("lines.json", (data) => {
        lines = data;
        text = $("#line").text();
        state = states.ReduceToMin;
        currentLine = lines[lineIndex];
        Loop();
    })
});

function Loop() {
    Tick();
    setTimeout(() => {
        Loop();
    }, tickDuration);
}

function Tick() {

    switch (state) {
        case states.ReduceToMin:
            var remove = 0;
            if (Math.random() > 0.5)
                remove = 1;

            var len = text.length - remove;
            text = text.substring(0, len);

            if (text == currentLine.substring(0, len)) {
                setState(states.AddToMax);
            }
            break;

        case states.AddToMax:
            var len = text.length + 1;
            text = currentLine.substring(0, len);

            if (len >= currentLine.length) {
                console.log(len, currentLine.length);
                setState(states.Wait);
            }
            break;

        case states.Wait:
            waitTickTimer--;

            if (waitTickTimer == 0) {
                lineIndex++;
                if (lineIndex > lines.length - 1) {
                    lineIndex = 0;

                }
                currentLine = lines[lineIndex];
                setState(states.ReduceToMin);
            }
            break;

    }

    var barStr = "|";
    if (new Date().getTime() / 500 % 2 < 1) {
        barStr = "<i>|</i>";
    }

    $("#line").html(text + barStr);
}

function setState(newState) {

    if (newState == states.Wait) {
        waitTickTimer = 30;
    }

    state = newState;
}
