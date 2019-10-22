window.onload = init;

var canvas;
var ctx;

var pointImg;
var pointpos = [];

var co = [];
var copos = [];

var Scoregrade = 0;

var cnt = 0, minute = 0, second = 0;
var timer;
var timedif = 60000;

var istimeout = false;
var ismusic = true;
var ispause = false;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    score = document.getElementById('score');
    pointImg = document.getElementById('target');
    time = document.getElementById('time');

    se = document.getElementById('se');
    bgm = document.getElementById('bgm');

    bgm.play();

    Scoregrade = 0;
    istimeout = false;
    cnt = 0, minute = 0, second = 0;

    ctx.font = "bold 40px sans";
    ctx.fillText("R E A D Y", 300, 320);

    setTimeout(function() {
        setInterval(draw, 50);
        setInterval(randomposco, 700);
        setInterval("checktime()", 1000);
        timer = setTimeout("timeout()", timedif);
        
        canvas.addEventListener("mousemove", pointer, false);
    
        if(!ispause) {
            canvas.addEventListener("mousedown", diediedie, false);
            canvas.addEventListener("mousedown", bang, false);
        }    
    }, 2000);
}

function draw() {     
    if(!istimeout && !ispause) {
        ctx.clearRect(0,0,800,600);

        var background = new Image();
        background.src = "../img/다운로드.jpg.png";
    
        ctx.drawImage(background, 0, 0, 800, 600);

        if(!ismusic) {
            ctx.font = "bold 20px sans";
            ctx.fillStyle = 'rgba(180,180,180,0.6)';
            ctx.fillText("BackgroundMusic is muted.", 520, 580);
        }

        for(i = 0; i < co.length; i++) {
            co[i].level();
            co[i].create();
        }
    }
}

function pointer(e) {
    pointpos = [e.offsetX, e.offsetY];

    pointImg.style.visibility = 'visible';

    pointImg.style.left = (pointpos[0] + (window.innerWidth / 11.5)) + 'px';
    pointImg.style.top = (pointpos[1] + (window.innerHeight / 4.5)) + 'px';
        
    if(!ispause) {
        pointImg.addEventListener("mousedown", diediedie, false);
        pointImg.addEventListener("mousedown", bang, false);
    }
}

function randomposco() {
    if(!istimeout && !ispause) {
        var randx, randy;

        randx = Math.floor(Math.random() * 300) + 1;
        randy = Math.floor(Math.random() * 300) + 1;
    
        co.push(new cock(randx, randy));
    }
}

function cock(x, y) {
    this.x = x;
    this.y = y;

    this.width = (Math.random() * 80) + 20;
    this.height = this.width;

    this.xsign = 1;
    this.ysign = 1;
    this.renderx = this.x;
    this.rendery = this.y;
    this.speed = 2;

    this.xsign = (Math.random() > 0.5) ? 1 : -1;
    this.ysign = (Math.random() > 0.5) ? 1 : -1;

    this.booddlx;
    this.booddly;

    this.level = function () {
        this.speed = (Scoregrade < 30) ?  (Math.random() * 3) + 1 : (Scoregrade < 100) ? (Math.random() * 6) + 1: (Scoregrade < 160) ? (Math.random() * 10) + 1 : (Math.random() * 14) + 1;
    }

    this.sign = function () {
        this.booddlx = (Math.random() > 0.5) ? 1 : -1;
        this.booddly = (Math.random() > 0.5) ? 1 : -1;
    }

    this.render = function () {       
        this.x += this.xsign * this.speed;
        this.y += this.ysign * this.speed; 

        this.renderx += this.booddlx * this.speed;
        this.rendery += this.booddly * this.speed;
    }

    this.create = function () {
        this.sign();
        this.render();

        if(this.renderx + this.x < 810 && this.rendery + this.y < 610
             && this.renderx + this.x > -10 && this.rendery + this.y > -10) {
            var cosimg = new Image();
            cosimg.src = "../img/co.png";
            
            ctx.drawImage(cosimg, this.renderx + this.x, this.rendery + this.y, this.width, this.height);
        } else {
            dest(this);
        }
    }

    this.re = function retu() {
        return pos = [this.renderx + this.x, this.rendery + this.y, this.width, this.height ];
    }
}

function diediedie() {

    if(!ispause) {
        se.play();

        var cockpos = [];
    
        for(i = 0; i < co.length; i++) {
            cockpos = co[i].re();
    
            if((cockpos[0] <= pointpos[0] && pointpos[0] <= cockpos[0]+cockpos[2]) 
                && (cockpos[1] <= pointpos[1] && pointpos[1] <= cockpos[1] + cockpos[3])) {
                
                Scoregrade += 10;
    
                score.innerHTML = Scoregrade + "점";
                
                dest(co[i]);
    
                break;
            }
        }
    }

}

function dest(cock) {
    for(i = 0; i < co.length; i++) {
        if(co[i] == cock) {
            co.splice(i,1);
        }
    } 
}

function bang(e) {
    if(!ispause) {
        var bang = new Image();
        bang.src = "../img/빵야!.png";
        ctx.drawImage(bang, pointpos[0]-45, pointpos[1]-20, 100, 60);
    }
}

function checktime() {
    if(!istimeout && !ispause) {
        cnt++;

        cnt2 = 60 - cnt;
        
        minute = Math.floor(cnt2/60);
        second = cnt2 % 60;

        time.innerHTML = minute + " : " + second;
    }
}

function timeout() {
    istimeout = true;
    ctx.font = "bold 40px sans";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillText("TIME OUT!",400,300);
    time.innerHTML = "0 : 0";

    if(Scoregrade >= 300) {
        setTimeout(function() {
            window.location = "good.html";
        }, 3000);
    } else {
        setTimeout(function() {
            window.location = "bad.html";
        }, 3000);
    }
    
}

function pause() {
    ctx.fillStyle = "rgba(0,0,0,1)";
    if(ispause) {
        document.getElementById('pause').innerHTML = "중지";
        ispause = false;
        timer = setTimeout(timeout, timedif);
    } else {
        document.getElementById('pause').innerHTML = "계속하기";
        ispause = true;
        ctx.font = "bold 40px sans";
        ctx.fillText("P A U S E", 300, 320);
        timedif -= cnt * 1000;
        clearTimeout(timer);
    }
}

function bgmstop() {
    if(document.getElementById('bgmstop').innerHTML == '배경음악끄기') {
        ismusic = false;
        bgm.muted = true;
        document.getElementById('bgmstop').innerHTML = '배경음악재생';
    } else {
        ismusic = true;
        bgm.muted = false;
        document.getElementById('bgmstop').innerHTML = '배경음악끄기';
    }
}