window.onload = init;

var canvas;
var ctx;
var img = new Image();
var playbutton = new Image();

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    bgm = document.getElementById("bgm");

    bgm.play();
    
    draw();

    bgm.addEventListener("ended", function() { this.currentTime = 0; bgm.play();}, false);
}

function draw() {

    ctx.globalCompositeOperation = 'destination-over';

    img.src = "../img/title.png";
    img.onload = function() {
        ctx.drawImage(img,0,0,800,600);
    }
}

function start() {
    document.getElementById('se').play();

    window.location = 'main.html';
}

function how() {
    document.getElementById('se').play();

    window.location = 'howtoplay.html';
}
