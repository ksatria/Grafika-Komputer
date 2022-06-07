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
const lantaiTexture = new THREE.TextureLoader().load(
	'https://cdn.pixabay.com/photo/2016/07/31/16/24/banner-1559398__480.jpg'
);
const lantaiGeometry = new THREE.PlaneGeometry(25, 25);
const lantaiMaterial = new THREE.MeshLambertMaterial({
	// color: 0x555555,
	side: THREE.DoubleSide,
	map: lantaiTexture,
});
const lantai = new THREE.Mesh(lantaiGeometry, lantaiMaterial);
lantai.rotation.x -= Math.PI / 2;
lantai.receiveShadow = true;
scene.add(lantai);

/* RENDERING */
function draw() {
	// let delta = 0.03;

	// kontrolKeyboard();
	// controls.update(delta);

	requestAnimationFrame(draw);
	renderer.render(scene, camera);
}

draw();
