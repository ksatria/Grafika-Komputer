let canvas = document.getElementById('myCanvas');
canvas.width = 600;
canvas.height = 400;

let ctx = canvas.getContext('2d');

let x = 0,
	y = 0,
	r = 50;
let goingUp = false,
	goingDown = true;
let toRight = true,
	toLeft = false;

function animate() {
	ctx.save();
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	// ctx.strokeStyle = 'salmon';
	// ctx.lineWidth = 15;
	ctx.fillStyle = 'salmon';
	ctx.arc(x + r, y + r, r, 0, Math.PI * 2);
	// ctx.stroke();
	ctx.fill();

	positionUpdate();

	if (goingUp) y--;
	if (goingDown) y++;

	if (toRight) x++;
	if (toLeft) x--;

	ctx.restore();
}

function positionUpdate() {
	if (y + r == canvas.height - r) {
		goingUp = true;
		goingDown = false;
	} else if (y == 0) {
		goingUp = false;
		goingDown = true;
	}

	if (x + r == canvas.width - r) {
		toRight = false;
		toLeft = true;
	} else if (x == 0) {
		toRight = true;
		toLeft = false;
	}
}

setInterval(animate, 3);
