const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10);
const renderer = new THREE.WebGLRenderer({ antialias: true });

camera.position.z = 5;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const geo = new THREE.BufferGeometry();

let vertices = new Float32Array([
	-1.0,
	-1.0,
	1.0, //0
	1.0,
	-1.0,
	1.0, //1
	0.0,
	1.0,
	0.0, //2
	0.0,
	-1.0,
	-1.0, //3
]);

geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

geo.setIndex([
	//sisi depan
	0, 1, 2,

	//sisi kiri
	0, 2, 3,

	//sisi kanan
	1, 3, 2,

	//sisi bawah
	1, 0, 3,
]);

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
let mesh = new THREE.Mesh(geo, material);

scene.add(mesh);

function draw() {
	//  geoSaya.rotation.x += 0.01;
	//  geoSaya.rotation.y += 0.01;
	//  geoSaya.rotation.z += 0.01;

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.01;
	mesh.rotation.z += 0.01;

	requestAnimationFrame(draw);
	renderer.render(scene, camera);
}

draw();
