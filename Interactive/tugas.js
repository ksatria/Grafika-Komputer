const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();

const camera1 = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera1.position.z = 5;

const camera2 = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);
camera2.position.z = 10;
camera2.position.y = 8;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const pointLight = new THREE.PointLight('white', 1);
pointLight.position.set(0, 10, 0);
pointLight.castShadow = true;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight('white', 0.7);
scene.add(ambientLight);

const lantaiGeometry = new THREE.PlaneGeometry(16, 16);
const lantaiMaterial = new THREE.MeshLambertMaterial({
	color: 0xb97a20,
	side: THREE.DoubleSide,
});
const lantai = new THREE.Mesh(lantaiGeometry, lantaiMaterial);
lantai.position.y -= 4;
lantai.rotation.x -= Math.PI / 2;
lantai.receiveShadow = true;
scene.add(lantai);

const dindingGeometry = new THREE.PlaneGeometry(16, 8);
const dindingMaterial = new THREE.MeshLambertMaterial({
	color: 0x561223,
	side: THREE.DoubleSide,
});

const dinding1 = new THREE.Mesh(dindingGeometry, dindingMaterial);
dinding1.position.z -= 8;
dinding1.receiveShadow = true;
scene.add(dinding1);

const dinding2 = new THREE.Mesh(dindingGeometry, dindingMaterial);
dinding2.position.x += 8;
dinding2.rotation.y += Math.PI / 2;
dinding2.receiveShadow = true;
scene.add(dinding2);

const dinding3 = new THREE.Mesh(dindingGeometry, dindingMaterial);
dinding3.position.z += 8;
dinding3.rotation.y += Math.PI;
dinding3.receiveShadow = true;
scene.add(dinding3);

const dinding4 = new THREE.Mesh(dindingGeometry, dindingMaterial);
dinding4.position.x -= 8;
dinding4.rotation.y -= Math.PI / 2;
dinding4.receiveShadow = true;
scene.add(dinding4);

const bolaGeometry = new THREE.SphereGeometry(0.8, 36, 36);

const bola1Material = new THREE.MeshPhongMaterial({
	color: 'yellow',
	shininess: 80,
});
const bola2Material = new THREE.MeshPhongMaterial({
	color: 'green',
	shininess: 80,
});
const bola3Material = new THREE.MeshPhongMaterial({
	color: 'blue',
	shininess: 80,
});

const bola1 = new THREE.Mesh(bolaGeometry, bola1Material);
bola1.castShadow = true;
bola1.receiveShadow = true;
scene.add(bola1);

const bola2 = new THREE.Mesh(bolaGeometry, bola2Material);
bola2.scale.set(1.2, 1.2, 1.2);
bola2.position.x -= 2;
bola2.castShadow = true;
bola2.receiveShadow = true;
scene.add(bola2);

const bola3 = new THREE.Mesh(bolaGeometry, bola3Material);
bola3.scale.set(0.7, 0.7, 0.7);
bola3.position.x += 2;
bola3.castShadow = true;
bola3.receiveShadow = true;
scene.add(bola3);

let activeCamera = 'firstperson';

document.body.onkeydown = (e) => {
	if (e.key == '1') {
		activeCamera = 'firstperson';
	} else if (e.key == '2') {
		activeCamera = 'orbital';
	} else if (e.key == '3') {
		activeCamera = 'drag';
	}
};

const firstPersonControl = new THREE.FirstPersonControls(
	camera1,
	renderer.domElement
);
firstPersonControl.lookSpeed = 0.1;
firstPersonControl.movementSpeed = 0.5;
firstPersonControl.mouseDragOn = false;

const orbitalControl = new THREE.OrbitControls(camera2, renderer.domElement);
orbitalControl.autoRotate = true;

const dragControl = new THREE.DragControls(
	[bola1, bola2, bola3],
	camera1,
	renderer.domElement
);

function render() {
	requestAnimationFrame(render);

	if (activeCamera == 'firstperson') {
		firstPersonControl.update(0.03);
		renderer.render(scene, camera1);
	} else if (activeCamera == 'orbital') {
		orbitalControl.update();
		renderer.render(scene, camera2);
	} else {
		renderer.render(scene, camera1);
	}
}

render();
