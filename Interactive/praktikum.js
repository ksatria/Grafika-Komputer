/* --- PERSIAPAN SCENE, CAMERA, & RENDERER ---*/
const width = window.innerWidth;
const height = window.innerHeight;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb1e1ff);

// Camera
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.y = 1;
camera.position.z = 10;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

/* --- INISIALISASI OBJEK & CAHAYA ---*/
// Pencahayaan: Point light
const pointLight = new THREE.PointLight('white', 1);
pointLight.position.set(3, 5, 4);
pointLight.castShadow = true;
scene.add(pointLight);

// Pencahayaan: Ambient light
const ambientLight = new THREE.AmbientLight('white', 0.7);
scene.add(ambientLight);

// Objek: Lantai
const lantaiGeometry = new THREE.PlaneGeometry(25, 25);
const lantaiMaterial = new THREE.MeshLambertMaterial({
	color: 0xb97a20,
	side: THREE.DoubleSide,
});
const lantai = new THREE.Mesh(lantaiGeometry, lantaiMaterial);
lantai.rotation.x -= Math.PI / 2;
lantai.receiveShadow = true;
scene.add(lantai);

// Objek: Kotak
const kotakGeometry = new THREE.BoxGeometry(1, 1, 1);
const kotakMaterial = new THREE.MeshLambertMaterial({
	color: 'red',
});
const kotak = new THREE.Mesh(kotakGeometry, kotakMaterial);
kotak.position.y = 0.5;
kotak.castShadow = true;
kotak.receiveShadow = true;
scene.add(kotak);

// Objek: Bola
const bolaGeometry = new THREE.SphereGeometry(0.6, 36, 36);
const bolaMaterial = new THREE.MeshPhongMaterial({
	color: 'blue',
	shininess: 80,
});
const bola = new THREE.Mesh(bolaGeometry, bolaMaterial);
bola.position.set(-1.3, 0.6, 0.6);
bola.castShadow = true;
bola.receiveShadow = true;
scene.add(bola);

// Objek: Donat
const donatGeometry = new THREE.TorusGeometry(0.5, 0.3, 36, 36);
const donatMaterial = new THREE.MeshPhongMaterial({
	color: 'teal',
	shininess: 80,
	wireframe: true,
});
const donat = new THREE.Mesh(donatGeometry, donatMaterial);
donat.position.set(1, 0.8, -1);
donat.castShadow = true;
donat.receiveShadow = true;
scene.add(donat);

/* --- AREA KONTROL ---*/
// Keyboard Event
let keyboard = [];

// keyboard event handler
document.body.onkeydown = (e) => (keyboard[e.key] = true);
document.body.onkeyup = (e) => (keyboard[e.key] = false);

function kontrolKeyboard() {
	let kecepatan = 0.03;
	let putaran = Math.PI / 180;

	// arah kiri-kanan
	if (keyboard['a']) {
		kotak.translateX(-kecepatan);
	} else if (keyboard['d']) {
		kotak.translateX(kecepatan);
	}

	// arah mundur-maju
	if (keyboard['w']) {
		kotak.translateZ(-kecepatan);
	} else if (keyboard['s']) {
		kotak.translateZ(kecepatan);
	}

	// putar kiri-kanan
	if (keyboard['ArrowLeft']) {
		kotak.rotateY(-putaran);
	} else if (keyboard['ArrowRight']) {
		kotak.rotateY(putaran);
	}

	//putar atas-bawah
	if (keyboard['ArrowUp']) {
		kotak.rotateX(-putaran);
	} else if (keyboard['ArrowDown']) {
		kotak.rotateX(putaran);
	}
}

// Mouse Event
document.body.onmousemove = (e) => {
	let kecepatan = 0.05;
	let mouseX = (e.pageX - width / 2) * kecepatan;
	let mouseY = (height / 2 - e.pageY) * kecepatan;

	camera.lookAt(mouseX, mouseY, 0);
};

// ThreeJS Orbit Controls
// let controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true;
// controls.target = new THREE.Vector3(1, 0, 1);
// controls.minPolarAngle = (Math.PI * 1) / 6; // sudut 30 derajat
// controls.maxPolarAngle = (Math.PI * 3) / 6; // sudut 90 derajat

// ThreeJS First Person Controls
// let controls = new THREE.FirstPersonControls(camera, renderer.domElement);
// controls.lookSpeed = 0.1;
// controls.movementSpeed = 0.5;

// ThreeJS Drag Controls
// let controls = new THREE.DragControls(
// 	[kotak, bola, donat],
// 	camera,
// 	renderer.domElement
// );

/* RENDERING */
function draw() {
	// let delta = 0.03;

	kontrolKeyboard();
	// controls.update(delta);

	requestAnimationFrame(draw);
	renderer.render(scene, camera);
}

draw();
