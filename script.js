// script.js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var painting = false;
var color = document.getElementById('color');
var size = document.getElementById('size');
var clear = document.getElementById('clear');

function startDraw(e) {
    painting = true;
    draw(e);
}

function endDraw() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;
    ctx.lineWidth = size.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color.value;

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mousemove', draw);
clear.addEventListener('click', clearCanvas);