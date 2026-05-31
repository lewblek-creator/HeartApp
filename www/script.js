var startBtn = document.getElementById("startBtn");
var startScreen = document.getElementById("startScreen");
var heartWrapper = document.getElementById("heartWrapper");
var heartContainer = document.getElementById("heartContainer");

var shortPhrases = [
    "Солнце",
    "Бебебе",
    "Купыть"
];

var mediumPhrases = [
    "Худак не взяк",
    "Солнце",
    "Бебебе"
];

var longPhrases = [
    "Я люблю тебя",
    "Худак не взяк"
];

var points = [];
var words = [];
var pointSlots = [];

startBtn.onclick = function(){

    startScreen.style.display = "none";
    heartWrapper.style.display = "flex";

    createHeart();

    setInterval(updateWords, 2500);

};

function heartPoint(t){

    return {

        x:16 * Math.pow(Math.sin(t),3),

        y:
            13*Math.cos(t)
            -5*Math.cos(2*t)
            -2*Math.cos(3*t)
            -Math.cos(4*t)

    };

}

function distance(a,b){

    var dx = a.x - b.x;
    var dy = a.y - b.y;

    return Math.sqrt(dx*dx + dy*dy);

}

function createHeart(){

    var width = window.innerWidth;
    var height = window.innerHeight;

    var centerX = width / 2 - 30;
    var centerY = height / 2;

    var scale =
        Math.min(width,height) / 35;

    points = [];
    words = [];
    pointSlots = [];

    heartContainer.innerHTML = "";

    var candidates = [];

    for(var i=0;i<250;i++){

        var t =
            (Math.PI*2*i)/250;

        var p =
            heartPoint(t);

        candidates.push({

            x:centerX + p.x*scale,
            y:centerY - p.y*scale

        });

    }

    for(var j=0;j<120;j++){

        var t2 =
            Math.random()*Math.PI*2;

        var p2 =
            heartPoint(t2);

        var shrink =
            0.65 + Math.random()*0.25;

        candidates.push({

            x:centerX + p2.x*scale*shrink,
            y:centerY - p2.y*scale*shrink

        });

    }

    var minDistance = 22;

    for(var k=0;k<candidates.length;k++){

        var ok = true;

        for(var n=0;n<points.length;n++){

            if(
                distance(
                    candidates[k],
                    points[n]
                ) < minDistance
            ){

                ok = false;
                break;

            }

        }

        if(ok){

            points.push(
                candidates[k]
            );

        }

    }

    for(var i=0;i<points.length;i++){

        var point =
            points[i];

        var dx =
            Math.abs(
                point.x - centerX
            );

        var allowed;

        if(
            point.y < centerY - 120 ||
            point.y > centerY + 170
        ){

            allowed =
                shortPhrases;

        }
        else if(dx < 60){

            allowed =
                mediumPhrases;

        }
        else{

            allowed =
                longPhrases;

        }

        pointSlots.push({

            phrases: allowed,
            index:
                Math.floor(
                    Math.random()
                    * allowed.length
                )

        });

        var div =
            document.createElement(
                "div"
            );

        div.className = "word";

        div.innerHTML =
            allowed[
                pointSlots[i].index
            ];

        div.style.left =
            point.x + "px";

        div.style.top =
            point.y + "px";

        heartContainer.appendChild(
            div
        );

        words.push(div);

    }

}

function updateWords(){

    for(
        var i=0;
        i<words.length;
        i++
    ){

        if(
            Math.random() > 0.25
        ){
            continue;
        }

        var slot =
            pointSlots[i];

        slot.index++;

        if(
            slot.index >=
            slot.phrases.length
        ){

            slot.index = 0;

        }

        var word =
            words[i];

        var nextText =
            slot.phrases[
                slot.index
            ];

        word.style.opacity = "0";

        (function(el,text){

            setTimeout(
                function(){

                    el.innerHTML =
                        text;

                    el.style.opacity =
                        "1";

                },
                250
            );

        })(word,nextText);

    }

              }
