// script.js
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var painting = false;
var color = document.getElementById('color');
var size = document.getElementById('size');
var clear = document.getElementById('clear');
var mode = document.getElementById('mode');
var eraser = document.getElementById('eraser');

var currentMode = 'brush';

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

    var canvasRect = canvas.getBoundingClientRect();
    var canvasX = e.clientX - canvasRect.left;
    var canvasY = e.clientY - canvasRect.top;

    if (currentMode === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = size.value;
        ctx.lineCap = 'round';
        ctx.lineTo(canvasX, canvasY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
    } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = color.value;

        if (mode.value === 'brush') {
            ctx.lineWidth = size.value;
            ctx.lineCap = 'round';
            ctx.strokeStyle = color.value;

            ctx.lineTo(canvasX, canvasY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(canvasX, canvasY);
        } else if (mode.value === 'pixel') {
            ctx.fillRect(canvasX, canvasY, size.value, size.value);
        }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function activateEraser() {
    currentMode = 'eraser';
}

function deactivateEraser() {
    currentMode = mode.value;
}

eraser.addEventListener('mousedown', activateEraser);
eraser.addEventListener('mouseup', deactivateEraser);
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mousemove', draw);
clear.addEventListener('click', clearCanvas);