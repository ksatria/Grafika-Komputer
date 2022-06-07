const width = window.innerWidth;
const height = window.innerHeight;

const cameraDistance = 10;

// Menyiapkan scene, camera, & renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 20);
const renderer = new THREE.WebGLRenderer({ antialias: true });

camera.position.z = cameraDistance;

renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const ballGeometry = new THREE.SphereGeometry(1, 36, 36);
const ballMaterial = new THREE.MeshPhongMaterial({
	color: 0x008080,
	// wireframe: true,
});
const ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
ballMesh.castShadow = true;

const loader = new THREE.TextureLoader();
const bricks = loader.load(
	'https://threejs.org/manual/examples/resources/images/wall.jpg'
);

const wallGeometry = new THREE.PlaneGeometry(6, 6);
const wallMaterial = new THREE.MeshLambertMaterial({ map: bricks });
const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
wallMesh.receiveShadow = true;
wallMesh.position.z = -2;

scene.add(ballMesh);
scene.add(wallMesh);

const light = new THREE.DirectionalLight(0xfce205, 2);
light.castShadow = true;
light.position.y = 0;
light.position.z = 5;

const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
light2.castShadow = true;
light2.position.y = 0;
light2.position.z = 5;

scene.add(light);
scene.add(light2);

let theta = 0;
function update() {
	// mesh.rotation.x += 0.01;
	// mesh.rotation.y += 0.01;
	// mesh.rotation.z += 0.01;

	light.position.x = 30 * Math.sin((theta / 180) * Math.PI);
	light2.position.x = -light.position.x;
	theta += 0.5;

	requestAnimationFrame(update);
	renderer.render(scene, camera);
}

update();
