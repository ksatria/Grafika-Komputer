const width = window.innerWidth;
const height = window.innerHeight;

// Menyiapkan scene, camera, & renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 10);
const renderer = new THREE.WebGLRenderer({antialias: true});

camera.position.z = 5;
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// Membuat geometri objek kubus
const geo = new THREE.BoxGeometry(1, 1, 1);

/* Mengatur Light */
/* Menggunakan DirectionalLight */
const light = new THREE.DirectionalLight(0xffffff, 1);

/* Menggunakan AmbientLight */
//const light = new THREE.AmbientLight(0xff00ff, 1);

/* Menggunakan HemisphereLight */
//const light = new THREE.HemisphereLight(0xB1E1FF, 0xB97A20, 1);

// Mengatur posisi light & meletakkannya ke dalam scene
light.position.set(-1, 2, 4);
//light.position.set(1, 2, 4);
//light.position.set(1, -2, 4);
//light.position.set(1, -2, 0);
scene.add(light);

/* Menyiapkan Texture */
//const loader = new THREE.TextureLoader();
//let wood = loader.load('https://threejs.org/manual/resources/images/compressed-but-large-wood-texture.jpg');

/* Menggunakan Texture yang Berbeda-Beda */
//const material = [
//  new THREE.MeshBasicMaterial({map: loader.load('https://threejs.org/manual/examples/resources/images/flower-1.jpg')}),
//  new THREE.MeshBasicMaterial({map: loader.load('https://threejs.org/manual/examples/resources/images/flower-2.jpg')}),
//  new THREE.MeshBasicMaterial({map: loader.load('https://threejs.org/manual/examples/resources/images/flower-3.jpg')}),
//  new THREE.MeshBasicMaterial({map: loader.load('https://threejs.org/manual/examples/resources/images/flower-4.jpg')}),
//  new THREE.MeshBasicMaterial({map: loader.load('https://threejs.org/manual/examples/resources/images/flower-5.jpg')}),
//  new THREE.MeshBasicMaterial({map: loader.load('https://threejs.org/manual/examples/resources/images/flower-6.jpg')}),
//];

/* Mengatur Material */
/* Menggunakan MeshBasicMaterial */
//const material = new THREE.MeshBasicMaterial({
//  color: 0xff0000,
//  wireframe: true
//  map: wood
//});

//const material = new THREE.MeshBasicMaterial({color: 'red'});
//const material = new THREE.MeshBasicMaterial({color: '#F00'});
//const material = new THREE.MeshBasicMaterial({color: 'rgb(255,0,0)'});
//const material = new THREE.MeshBasicMaterial({color: 'hsl(0,100%,50%)'});

/* Menggunakan MeshLambertMaterial */
//const material = new THREE.MeshLambertMaterial({
//  color: 'red',
//  emissive: 'purple',
//  wireframe: true
//  map: wood
//});

/* Menggunakan MeshPhongMaterial*/
//const material = new THREE.MeshPhongMaterial({
//  color: 'red',
//  emissive: 'purple',
//  shininess: 80,
//  wireframe: true
//  map: wood
//});

// Membuat mesh & meletakkannya ke dalam scene
const mesh = new THREE.Mesh(geo, material);

//mesh.rotation.x = .5;
//mesh.rotation.y = .5;

scene.add(mesh);

// Rotasi objek
function update() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  mesh.rotation.z += 0.01;
  
  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

update();