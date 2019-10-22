window.onload = init;

var canvas;
var ctx;
var bgm;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    bgm = document.getElementById('bbgm');

    bgm.play();

    img = new Image();
    img.src = "../img/badend.png";
    img.onload = function() {
        ctx.drawImage(img,0,0,800,600);
    }

    bgm.addEventListener("ended", function() { this.currentTime = 0; bgm.play();}, false);
}

function restart() {
    window.location = "main.html";
}

function gotitle() {
    window.location = "title.html";
}

function exit() {
    window.close();
}