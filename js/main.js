// Imágenes del sistema solar
let sun = new Image();
let moon = new Image();
let earth = new Image();

const ctxSolarSystem = document.getElementById("canvasSolarSystem").getContext("2d");

function initSolarSystem() {
    sun.src = 'canvas_sun.png';
    moon.src = 'canvas_moon.png';
    earth.src = 'canvas_earth.png';
    window.requestAnimationFrame(drawSolarSystem);
}

function drawSolarSystem() {
    ctxSolarSystem.globalCompositeOperation = "destination-over";
    ctxSolarSystem.clearRect(0, 0, 300, 300); // limpiar canvas

    ctxSolarSystem.fillStyle = "rgba(0,0,0,0.4)";
    ctxSolarSystem.strokeStyle = "rgba(0,153,255,0.4)";
    ctxSolarSystem.save();
    ctxSolarSystem.translate(150, 150);

    // La tierra
    var time = new Date();
    ctxSolarSystem.rotate(
        ((2 * Math.PI) / 60) * time.getSeconds() +
        ((2 * Math.PI) / 60000) * time.getMilliseconds()
    );
    ctxSolarSystem.translate(105, 0);
    ctxSolarSystem.fillRect(0, -12, 50, 24); // Sombra
    ctxSolarSystem.drawImage(earth, -12, -12);

    // La luna
    ctxSolarSystem.save();
    ctxSolarSystem.rotate(
        ((2 * Math.PI) / 6) * time.getSeconds() +
        ((2 * Math.PI) / 6000) * time.getMilliseconds()
    );
    ctxSolarSystem.translate(0, 28.5);
    ctxSolarSystem.drawImage(moon, -3.5, -3.5);
    ctxSolarSystem.restore();

    ctxSolarSystem.restore();

    ctxSolarSystem.beginPath();
    ctxSolarSystem.arc(150, 150, 105, 0, Math.PI * 2, false); // Órbita terrestre
    ctxSolarSystem.stroke();

    ctxSolarSystem.drawImage(sun, 0, 0, 300, 300);

    window.requestAnimationFrame(drawSolarSystem);
}

initSolarSystem();

// Función de reloj
function clock() {
    const now = new Date();
    const canvas = document.getElementById("canvasReloj");
    const ctxReloj = canvas.getContext("2d");
    ctxReloj.save();
    ctxReloj.clearRect(0, 0, 150, 150);
    ctxReloj.translate(75, 75);
    ctxReloj.scale(0.4, 0.4);
    ctxReloj.rotate(-Math.PI / 2);
    ctxReloj.strokeStyle = "black";
    ctxReloj.fillStyle = "white";
    ctxReloj.lineWidth = 8;
    ctxReloj.lineCap = "round";

    // Hour marks
    ctxReloj.save();
    for (let i = 0; i < 12; i++) {
        ctxReloj.beginPath();
        ctxReloj.rotate(Math.PI / 6);
        ctxReloj.moveTo(100, 0);
        ctxReloj.lineTo(120, 0);
        ctxReloj.stroke();
    }
    ctxReloj.restore();

    // Minute marks
    ctxReloj.save();
    ctxReloj.lineWidth = 5;
    for (let i = 0; i < 60; i++) {
        if (i % 5 !== 0) {
            ctxReloj.beginPath();
            ctxReloj.moveTo(117, 0);
            ctxReloj.lineTo(120, 0);
            ctxReloj.stroke();
        }
        ctxReloj.rotate(Math.PI / 30);
    }
    ctxReloj.restore();

    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hr = now.getHours() % 12;

    ctxReloj.fillStyle = "black";

    // Write Hours
    ctxReloj.save();
    ctxReloj.rotate(
        (Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
    );
    ctxReloj.lineWidth = 14;
    ctxReloj.beginPath();
    ctxReloj.moveTo(-20, 0);
    ctxReloj.lineTo(80, 0);
    ctxReloj.stroke();
    ctxReloj.restore();

    // Write Minutes
    ctxReloj.save();
    ctxReloj.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
    ctxReloj.lineWidth = 10;
    ctxReloj.beginPath();
    ctxReloj.moveTo(-28, 0);
    ctxReloj.lineTo(112, 0);
    ctxReloj.stroke();
    ctxReloj.restore();

    // Write seconds
    ctxReloj.save();
    ctxReloj.rotate((sec * Math.PI) / 30);
    ctxReloj.strokeStyle = "#D40000";
    ctxReloj.fillStyle = "#D40000";
    ctxReloj.lineWidth = 6;
    ctxReloj.beginPath();
    ctxReloj.moveTo(-30, 0);
    ctxReloj.lineTo(83, 0);
    ctxReloj.stroke();
    ctxReloj.beginPath();
    ctxReloj.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctxReloj.fill();
    ctxReloj.beginPath();
    ctxReloj.arc(95, 0, 10, 0, Math.PI * 2, true);
    ctxReloj.stroke();
    ctxReloj.fillStyle = "rgb(0 0 0 / 0%)";
    ctxReloj.arc(0, 0, 3, 0, Math.PI * 2, true);
    ctxReloj.fill();
    ctxReloj.restore();

    ctxReloj.beginPath();
    ctxReloj.lineWidth = 14;
    ctxReloj.strokeStyle = "#325FA2";
    ctxReloj.arc(0, 0, 142, 0, Math.PI * 2, true);
    ctxReloj.stroke();

    ctxReloj.restore();

    window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);


const img = new Image();
img.src = "Panoramica.jpg";
const canvasXSize = 800;
const canvasYSize = 500;
const speed = 30; 
const scale = 1.05;
const y = -4.5; 

// Programa principal
const dx = 0.75;
let imgW;
let imgH;
let x = 0;
let clearX;
let clearY;
let ctxScrolling;

img.onload = () => {
    imgW = img.width * scale;
    imgH = img.height * scale;

    if (imgW > canvasXSize) {
        
        x = canvasXSize - imgW;
    }

    clearX = Math.max(imgW, canvasXSize);
    clearY = Math.max(imgH, canvasYSize);

    
    ctxScrolling = document.getElementById("canvasPanoramica").getContext("2d");

    
    return setInterval(drawScrollingImage, speed);
};

function drawScrollingImage() {
    ctxScrolling.clearRect(0, 0, clearX, clearY); 

    
    if (imgW <= canvasXSize) {
        
        if (x > canvasXSize) {
            x = -imgW + x;
        }

        
        if (x > 0) {
            ctxScrolling.drawImage(img, -imgW + x, y, imgW, imgH);
        }

        
        if (x - imgW > 0) {
            ctxScrolling.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
        }
    } else {
        
        if (x > canvasXSize) {
            x = canvasXSize - imgW;
        }

        
        if (x > canvasXSize - imgW) {
            ctxScrolling.drawImage(img, x - imgW + 1, y, imgW, imgH);
        }
    }

   
    ctxScrolling.drawImage(img, x, y, imgW, imgH);

   
    x += dx;
}

