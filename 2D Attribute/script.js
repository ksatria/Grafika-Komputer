let canvasKita = document.getElementById('myCanvas');
canvasKita.width = 600;
canvasKita.height = 400;
let ctx = canvasKita.getContext('2d');

/* Pendekatan Built-in Function */
/* Pewarnaan */
/* a. Solid Color */
// ctx.fillStyle = 'blue'; //1

// ctx.fillStyle = '#642'; //2

// ctx.fillStyle = 'rgba(100,100,100,0.8)'; //3

// ctx.fillStyle = 'rgb(200,0,0)'; //4

// ctx.fillStyle = 'hsl(20,62%,28%)'; //5

// ctx.fillStyle = 'hsla(40,82%,33%,0.6)'; //6

/* b. Gradient Color */
// var gr = ctx.createLinearGradient(0, 100, 100, 0);
var gr = ctx.createRadialGradient(75, 75, 10, 75, 75, 35);

gr.addColorStop(0, 'rgb(255,0,0)');
gr.addColorStop(0.5, 'rgb(0,255,0)');
gr.addColorStop(0.8, 'rgb(0,0,255)');
gr.addColorStop(1, 'rgb(255,255,0)');

ctx.fillStyle = gr;

/* c. Stroke Style */
// ctx.lineWidth = 10;
// ctx.lineJoin = 'mitter';

/* d. Pattern */
// var fillImg = new Image();
// fillImg.src = 'https://miro.medium.com/max/700/1*i8hFU86TqfhC0W28083U2w.png';
// fillImg.onload = function () {
// 	var fillPattern = ctx.createPattern(fillImg, 'repeat');
// 	ctx.fillStyle = fillPattern;

/* Obyek 2D yang digambar */
ctx.beginPath();
ctx.moveTo(75, 40);
ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
ctx.fill();
// ctx.stroke();
// };

/* Pembuatan Teks */
// ctx.font = 'bold italic 50pt Times';
// ctx.fillStyle = 'blue';
// ctx.textAlign = 'center';
// ctx.fillText('Coba Font', 100, 100, 200);
// ctx.strokeStyle = 'red';
// ctx.textBaseline = 'middle';
// ctx.strokeText('Coba Font', 100, 300, 200);

/* Shadow */
// ctx.font = 'bold italic 50pt Times';
// ctx.shadowOffsetX = 5;
// ctx.shadowOffsetY = 2;
// ctx.shadowBlur = 2;
// ctx.shadowColor = 'rgba(0, 0, 255, 0.5)';
// ctx.fillText('Coba Font', 200, 100, 200, 100);

/* Pendekatan Native JavaScript */
/* Mendefinisikan Image Data */
let imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

/* Algoritma Gambar Titik */
function gambar_titik(ImageDataTemp, x, y, r, g, b) {
	let indeks;
	indeks = 4 * (x + y * canvasKita.width);
	ImageDataTemp.data[indeks + 0] = r;
	ImageDataTemp.data[indeks + 1] = g;
	ImageDataTemp.data[indeks + 2] = b;
	ImageDataTemp.data[indeks + 3] = 255; // alpha
}

/* Algoritma Garis Lurus DDA */
function gradient_line(imageData, x1, y1, x2, y2, r, g, b) {
	let dx = x2 - x1; // Bisa positif atau negatif
	let dy = y2 - y1; // Bisa positif atau negatif

	if (Math.abs(dx) > Math.abs(dy)) {
		// Penambahan pada sumbu x
		let y = y1;
		if (x2 > x1) {
			// Bergerak ke kanan
			for (let x = x1; x < x2; x++) {
				y = y + dy / Math.abs(dx); // 1/m
				gambar_titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
			}
		} else {
			// Bergerak ke kiri
			for (let x = x1; x > x2; x--) {
				y = y + dy / Math.abs(dx); // 1/m
				gambar_titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
			}
		}
	} else {
		// Penambahan pada sumbu y
		let x = x1;
		if (y2 > y1) {
			// Bergerak ke kanan
			for (let y = y1; y < y2; y++) {
				x = x + dx / Math.abs(dy); // m
				gambar_titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
			}
		} else {
			// Bergerak ke kiri
			for (let y = y1; y > y2; y--) {
				x = x + dx / Math.abs(dy); // m
				gambar_titik(imageData, Math.ceil(x), Math.ceil(y), r, g, b);
			}
		}
	}
}

/* Algoritma Poligon */
function polygon(imageDataTemp, point_array, r, g, b) {
	let point = point_array[0];
	for (let i = 1; i < point_array.length; i++) {
		let point2 = point_array[i];
		gradient_line(
			imageDataTemp,
			point.x,
			point.y,
			point2.x,
			point2.y,
			r,
			g,
			b
		);
		point = point2;
	}
	gradient_line(
		imageDataTemp,
		point.x,
		point.y,
		point_array[0].x,
		point_array[0].y,
		r,
		g,
		b
	);
}

/* Algoritma Flood Fill */
function floodFill(imageDataTemp, canvas, x0, y0, toFlood, color) {
	let tumpukan = [];

	tumpukan.push({ x: x0, y: y0 });

	while (tumpukan.length > 0) {
		var titikSkrg = tumpukan.shift();
		var indexSkrg = 4 * (titikSkrg.x + titikSkrg.y * canvas.width);

		var r1 = imageDataTemp.data[indexSkrg + 0];
		var g1 = imageDataTemp.data[indexSkrg + 1];
		var b1 = imageDataTemp.data[indexSkrg + 2];

		if (r1 == toFlood.r && g1 == toFlood.g && b1 == toFlood.b) {
			imageDataTemp.data[indexSkrg + 0] = color.r;
			imageDataTemp.data[indexSkrg + 1] = color.g;
			imageDataTemp.data[indexSkrg + 2] = color.b;
			imageDataTemp.data[indexSkrg + 3] = 255;

			tumpukan.push({ x: titikSkrg.x + 1, y: titikSkrg.y });
			tumpukan.push({ x: titikSkrg.x - 1, y: titikSkrg.y });
			tumpukan.push({ x: titikSkrg.x, y: titikSkrg.y + 1 });
			tumpukan.push({ x: titikSkrg.x, y: titikSkrg.y - 1 });
		}
	}
}

/* Membuat Obyek Primitif berwarna */
// let pointArray = [
// 	{ x: 200, y: 100 },
// 	{ x: 250, y: 100 },
// 	{ x: 250, y: 150 },
// 	{ x: 200, y: 200 },
// ];

// polygon(imageDataSaya, pointArray, 255, 0, 0);
// floodFill(
// 	imageDataSaya,
// 	canvasKita,
// 	210,
// 	120,
// 	{ r: 0, g: 0, b: 0 },
// 	{ r: 0, g: 255, b: 0 }
// );

/* Menampilkan Image Data pada Canvas */
ctx.putImageData(imageDataSaya, 0, 0);
