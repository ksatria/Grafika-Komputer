const width = window.innerWidth;
const height = window.innerHeight;
const cameraDistance = 5;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10);
const renderer = new THREE.WebGLRenderer({ antialias: true });

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
// const controls = new THREE.FlyControls(camera, renderer.domElement);
// const controls = new THREE.FirstPersonControls(camera, renderer.domElement);

scene.background = new THREE.Color('white');
camera.position.z = cameraDistance;
renderer.setSize(width, height);
// canvas.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(3, 4, 5);

const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
const cubeMat = new THREE.MeshLambertMaterial({ color: 'red' });
const cube = new THREE.Mesh(cubeGeo, cubeMat);

const globeGeo = new THREE.SphereGeometry(0.6, 36, 36);
const globeMat = new THREE.MeshPhongMaterial({ color: 'blue', shininess: 80 });
const globe = new THREE.Mesh(globeGeo, globeMat);
globe.position.set(-1.3, 0, 0.6);

const donutGeo = new THREE.TorusGeometry(0.5, 0.3, 36, 100);
const donutMat = new THREE.MeshPhongMaterial({
	color: 'teal',
	shininess: 80,
	wireframe: true,
});
const donut = new THREE.Mesh(donutGeo, donutMat);
donut.position.set(1, 0.3, -1);

scene.add(light);
scene.add(cube);
scene.add(globe);
scene.add(donut);

// let keyboard = [];

// document.body.onkeydown = (e) => (keyboard[e.key] = true);
// document.body.onkeyup = (e) => (keyboard[e.key] = false);

// let radialMovement = Math.PI / 18;
// let sin = Math.sin(radialMovement);
// let cos = Math.cos(radialMovement);

// function keyboardControls() {
// 	let x = camera.position.x;
// 	let y = camera.position.y;
// 	let z = camera.position.z;

// 	if (keyboard['a']) {
// 		camera.position.x = x * cos - z * sin;
// 		camera.position.z = x * sin - z * cos;

// 		camera.rotation.y = -radialMovement;

// 		cameraLog();
// 	}
// }

// function cameraLog() {
// 	let position = {
// 		x: camera.position.x,
// 		y: camera.position.y,
// 		z: camera.position.z,
// 	};

// 	let rotation = {
// 		x: camera.rotation.x,
// 		y: camera.rotation.y,
// 		z: camera.rotation.z,
// 	};

// 	console.log(
// 		`Camera position : [${position.x},${position.y},${position.z}]`
// 	);
// 	console.log(
// 		`Camera rotation : [${rotation.x},${rotation.y},${rotation.z}]`
// 	);
// }

function draw() {
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	// keyboardControls();
	// camera.updateProjectionMatrix();
	requestAnimationFrame(draw);
	renderer.render(scene, camera);
}

draw();
