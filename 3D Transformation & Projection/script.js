const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb1e1ff);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Create cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
	generateMipmaps: true,
	minFilter: THREE.LinearMipmapLinearFilter,
});

// Create cube camera
const cubeCamera = new THREE.CubeCamera(0.1, 100000, cubeRenderTarget);
// scene.add(cubeCamera);

// Pencahayaan: Ambient light
const ambientLight = new THREE.AmbientLight('white', 0.7);
scene.add(ambientLight);

const mainLight = new THREE.PointLight('white', 1);
mainLight.position.set(5, 2, 4);
mainLight.castShadow = true;
scene.add(mainLight);

const planeGeometry = new THREE.PlaneGeometry(25, 25);
const texture = new THREE.TextureLoader().load('img/grid.png');
const plane = new THREE.Mesh(
	planeGeometry,
	new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide })
);
plane.rotateX(-Math.PI / 2);
plane.position.y = -0.6;
plane.receiveShadow = true;
scene.add(plane);

const bolaGeometry = new THREE.SphereGeometry(0.6, 36, 36);
const bolaMaterial = new THREE.MeshStandardMaterial({
	color: 'yellow',
	envMap: cubeRenderTarget.texture,
	roughness: 0.1,
	metalness: 0.8,
});
const bola = new THREE.Mesh(bolaGeometry, bolaMaterial);
bola.castShadow = true;
bola.receiveShadow = true;
// bola.add(cubeCamera);
scene.add(bola);

cubeCamera.position.copy(bola.position);

const kotakGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
const kotakMaterial = new THREE.MeshPhongMaterial({
	color: 'red',
	shininess: 80,
});
const kotak = new THREE.Mesh(kotakGeometry, kotakMaterial);
kotak.position.x += 1.2;
kotak.rotateY((60 / 180) * Math.PI);
kotak.castShadow = true;
kotak.receiveShadow = true;
scene.add(kotak);

const kerucutGeometry = new THREE.ConeGeometry(0.5, 1.5, 36);
const kerucutMaterial = new THREE.MeshLambertMaterial({ color: 'green' });
const kerucut = new THREE.Mesh(kerucutGeometry, kerucutMaterial);
kerucut.position.set(-1, 0.2, 1.1);
kerucut.castShadow = true;
kerucut.receiveShadow = true;
scene.add(kerucut);

const control = new THREE.OrbitControls(camera, renderer.domElement);

function render() {
	requestAnimationFrame(render);

	bola.visible = false;
	cubeCamera.update(renderer, scene);
	bola.visible = true;

	renderer.render(scene, camera);
}

render();
