let canvas = document.getElementById('myCanvas');
canvas.width = 600;
canvas.height = 400;

let ctx = canvas.getContext('2d');

let startingPoint = { x: 50, y: 50 };
let t = 80;
let a = 60;

ctx.moveTo(startingPoint.x, startingPoint.y);
ctx.beginPath();
ctx.lineTo(startingPoint.x, startingPoint.y + t);
ctx.lineTo(startingPoint.x + a, startingPoint.y + t);
ctx.lineTo(startingPoint.x, startingPoint.y);
ctx.closePath();

ctx.fillStyle = 'red';
ctx.fill();

ctx.translate(0, startingPoint.y * 2 + t * 2 + 10);
ctx.scale(1, -1);

ctx.moveTo(startingPoint.x, startingPoint.y);
ctx.beginPath();
ctx.lineTo(startingPoint.x, startingPoint.y + t);
ctx.lineTo(startingPoint.x + a, startingPoint.y + t);
ctx.lineTo(startingPoint.x, startingPoint.y);
ctx.closePath();

ctx.fillStyle = 'blue';
ctx.fill();
