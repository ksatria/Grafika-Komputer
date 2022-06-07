let canvas = document.getElementById('myCanvas');
canvas.width = 1280;
canvas.height = 720;

let ctx = canvas.getContext('2d');

let ball1 = {
	x: 0,
	y: 0,
	r: 50,
	color: 'red',
	direction: { up: false, down: true, right: true, left: false },
};

let ball2 = {
	x: 0,
	y: 0,
	r: 30,
	color: 'blue',
	direction: { up: false, down: true, right: true, left: false },
};

let ball3 = {
	x: 0,
	y: 0,
	r: 20,
	color: 'teal',
	direction: { up: false, down: true, right: true, left: false },
};

function animate(ball) {
	ctx.save();
	// ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.fillStyle = ball.color;
	ctx.arc(ball.x + ball.r, ball.y + ball.r, ball.r, 0, Math.PI * 2);
	ctx.fill();

	positionUpdate(ball);

	if (ball.direction.up) ball.y--;
	if (ball.direction.down) ball.y++;

	if (ball.direction.right) ball.x++;
	if (ball.direction.left) ball.x--;

	ctx.restore();
}

function positionUpdate(ball) {
	if (ball.y + ball.r == canvas.height - ball.r) {
		ball.direction.up = true;
		ball.direction.down = false;
	} else if (ball.y == 0) {
		ball.direction.up = false;
		ball.direction.down = true;
	}

	if (ball.x + ball.r == canvas.width - ball.r) {
		ball.direction.right = false;
		ball.direction.left = true;
	} else if (ball.x == 0) {
		ball.direction.right = true;
		ball.direction.left = false;
	}
}

setInterval(function () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ball1.bounce();
	// ball2.bounce();
	animate(ball1);
	animate(ball2);
	animate(ball3);
}, 3);
