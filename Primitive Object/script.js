let canvasKita = document.getElementById('myCanvas');
canvasKita.width = 600;
canvasKita.height = 400;
let ctx = canvasKita.getContext('2d');

/*Menggambar lingkaran (arc) */
ctx.beginPath();
ctx.arc(
	canvasKita.width / 2,
	canvasKita.height / 2,
	100,
	0,
	2 * Math.PI,
	false
);
ctx.stroke();

/* Penggunaan Image Data*/
let imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

/* Menggambar Sebuah Titik Pada Pixel*/
function gambar_titik(ImageDataTemp, x, y, r, g, b) {
	let indeks;
	indeks = 4 * (x + y * canvasKita.width);
	ImageDataTemp.data[indeks + 0] = r;
	ImageDataTemp.data[indeks + 1] = g;
	ImageDataTemp.data[indeks + 2] = b;
	ImageDataTemp.data[indeks + 3] = 255; // alpha
}

/* Algoritma Bressenham */
function bressenham(imageData, x1, y1, x2, y2, r, g, b) {
	let dy, dx, d1, d2, p, m;
	let x = x1,
		y = y1,
		x_dir = 1,
		y_dir = 1;

	dx = x2 - x1;
	dy = y2 - y1;

	//antisipasi nilai m = negatif
	if (dx < 0) (dx = -dx), (x_dir = -1);
	if (dy < 0) (dy = -dy), (y_dir = -1);

	m = dy / dx;
	d2 = 2 * (dx - dy);

	if (m >= 0 && m <= 1) {
		d1 = 2 * dy;
		p = d1 - dx;

		for (let i = 1; i <= dx; i++) {
			gambar_titik(imageDataSaya, x, y, r, g, b);

			if (p >= 0) (p -= d2), (x += x_dir), (y += y_dir);
			else (p += d1), (x += x_dir);
		}
	} else if (m > 1) {
		d1 = 2 * dx;
		p = d1 - dy;

		for (let i = 1; i <= dy; i++) {
			gambar_titik(imageDataSaya, x, y, r, g, b);

			if (p >= 0) (p += d2), (x += x_dir), (y += y_dir);
			else (p += d1), (y += y_dir);
		}
	}
}

// Jarum panjang
bressenham(
	imageDataSaya,
	canvasKita.width / 2,
	canvasKita.height / 2,
	canvasKita.width / 2,
	canvasKita.height / 2 - 75,
	255,
	0,
	0
);

// Jarum pendek
bressenham(
	imageDataSaya,
	canvasKita.width / 2,
	canvasKita.height / 2,
	canvasKita.width / 2 + 52,
	canvasKita.height / 2 - 30,
	255,
	0,
	0
);

/* Menampilkan Image Data pada Canvas*/
ctx.putImageData(imageDataSaya, 0, 0);
