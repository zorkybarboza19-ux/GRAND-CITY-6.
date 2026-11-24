import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

// GRAND CITY 6 — prototipo de mundo 3D, fase 2.
// Controles: WASD para moverse, V para alternar cámara y ratón para mirar.

const canvas = document.querySelector("#world");
const menu = document.querySelector("#menu");
const startButton = document.querySelector("#startButton");
const hud = document.querySelector("#hud");
const cameraLabel = document.querySelector("#cameraLabel");
const crosshair = document.querySelector("#crosshair");
const loading = document.querySelector("#loading");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x91b9d0);
scene.fog = new THREE.Fog(0x91b9d0, 65, 190);

const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 350);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;

scene.add(new THREE.HemisphereLight(0xd8efff, 0x53616b, 2.0));
const sun = new THREE.DirectionalLight(0xfff0d6, 2.2);
sun.position.set(-35, 55, 25);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.left = -75;
sun.shadow.camera.right = 75;
sun.shadow.camera.top = 75;
sun.shadow.camera.bottom = -75;
scene.add(sun);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(240, 240),
  new THREE.MeshStandardMaterial({ color: 0x526b58, roughness: 1 })
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

function box(name, x, y, z, sx, sy, sz, color) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(sx, sy, sz),
    new THREE.MeshStandardMaterial({ color, roughness: 0.88 })
  );
  mesh.name = name;
  mesh.position.set(x, y + sy / 2, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return mesh;
}

// Avenidas y aceras de una pequeña zona de prueba.
box("avenida central", 0, 0.035, 0, 15, 0.08, 190, 0x303a43);
box("calle transversal", 0, 0.04, -48, 190, 0.08, 12, 0x303a43);
box("acera oeste", -9, 0.08, 0, 3, 0.16, 190, 0xb4b7ad);
box("acera este", 9, 0.08, 0, 3, 0.16, 190, 0xb4b7ad);
box("acera norte", 0, 0.08, -56, 190, 0.16, 3, 0xb4b7ad);

const lineMaterial = new THREE.MeshStandardMaterial({ color: 0xf2df9b, emissive: 0x30250b });
for (let z = -85; z <= 85; z += 12) {
  const dash = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.025, 5), lineMaterial);
  dash.position.set(0, 0.1, z);
  scene.add(dash);
}

// Edificios sencillos, agrupados alrededor de la avenida.
const buildingColors = [0x87949c, 0xb2a18b, 0x667d88, 0xc0b8a7, 0x65716f];
const buildings = [
  [-19,-25,12,22,13], [19,-25,13,28,15], [-23,12,15,18,16], [24,18,14,25,14],
  [-20,57,13,20,16], [20,62,15,30,15], [-42,-20,18,15,20], [43,-12,17,22,18],
  [-43,35,20,24,17], [44,45,18,19,20], [-65,-38,22,32,20], [66,-35,24,27,22],
  [-68,30,20,25,18], [68,35,23,35,20]
];
buildings.forEach((b, i) => {
  const [x,z,w,h,d] = b;
  box("edificio", x, 0, z, w, h, d, buildingColors[i % buildingColors.length]);
  // Ventanas frontales decorativas.
  const windowMat = new THREE.MeshStandardMaterial({ color: 0x9ed0d7, emissive: 0x172e35, roughness: 0.35 });
  const rows = Math.min(5, Math.floor(h / 4));
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < 3; col++) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(1.35, 1.45, 0.08), windowMat);
      win.position.set(x - w/2 + (col + 1) * w/4, 3 + row * 3.5, z - d/2 - 0.05);
      scene.add(win);
    }
  }
});

// Árboles básicos para dar escala a la calle.
for (const side of [-1, 1]) {
  for (let z = -78; z <= 78; z += 22) {
    const x = side * 13;
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 2.2, 7), new THREE.MeshStandardMaterial({color:0x70513a}));
    trunk.position.set(x, 1.1, z);
    trunk.castShadow = true;
    scene.add(trunk);
    const crown = new THREE.Mesh(new THREE.SphereGeometry(1.5, 10, 8), new THREE.MeshStandardMaterial({color:0x477b50}));
    crown.position.set(x, 3, z);
    crown.castShadow = true;
    scene.add(crown);
  }
}

// Personaje provisional.
const player = new THREE.Group();
const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.55, 1.0, 4, 8), new THREE.MeshStandardMaterial({color:0x1c3446}));
body.position.y = 1.05;
body.castShadow = true;
player.add(body);
const head = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 12), new THREE.MeshStandardMaterial({color:0xd4a27e}));
head.position.y = 2.0;
head.castShadow = true;
player.add(head);
player.position.set(0, 0, 20);
scene.add(player);

const keys = new Set();
let started = false;
let firstPerson = false;
let yaw = 0;
let pitch = -0.12;
let mouseDown = false;
const clock = new THREE.Clock();

function updateCamera() {
  const target = new THREE.Vector3(player.position.x, player.position.y + (firstPerson ? 1.85 : 1.55), player.position.z);
  if (firstPerson) {
    camera.position.copy(target);
    const look = new THREE.Vector3(
      Math.sin(yaw) * Math.cos(pitch),
      Math.sin(pitch),
      -Math.cos(yaw) * Math.cos(pitch)
    );
    camera.lookAt(target.clone().add(look));
    body.visible = false;
    head.visible = false;
  } else {
    const distance = 7.5;
    const offset = new THREE.Vector3(
      Math.sin(yaw) * distance,
      3.2 + Math.max(0, pitch * 3),
      Math.cos(yaw) * distance
    );
    camera.position.copy(target).add(offset);
    camera.lookAt(target);
    body.visible = true;
    head.visible = true;
  }
  cameraLabel.textContent = firstPerson ? "PRIMERA PERSONA" : "TERCERA PERSONA";
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onResize);

startButton.addEventListener("click", () => {
  started = true;
  menu.classList.add("hidden");
  hud.classList.remove("hidden");
  loading.classList.add("hidden");
  updateCamera();
  canvas.requestPointerLock?.();
});

document.addEventListener("pointerlockchange", () => {
  crosshair.classList.toggle("hidden", document.pointerLockElement !== canvas || !started);
});

document.addEventListener("mousemove", (event) => {
  if (document.pointerLockElement !== canvas || !started) return;
  yaw -= event.movementX * 0.0025;
  pitch = THREE.MathUtils.clamp(pitch - event.movementY * 0.002, -0.75, 0.55);
});

document.addEventListener("keydown", (event) => {
  keys.add(event.code);
  if (event.code === "KeyV" && started && !event.repeat) {
    firstPerson = !firstPerson;
    updateCamera();
  }
  if (["KeyW","KeyA","KeyS","KeyD","Space"].includes(event.code)) event.preventDefault();
});
document.addEventListener("keyup", (event) => keys.delete(event.code));
window.addEventListener("blur", () => keys.clear());

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.05);
  if (started) {
    const forward = (keys.has("KeyW") ? 1 : 0) - (keys.has("KeyS") ? 1 : 0);
    const sideways = (keys.has("KeyD") ? 1 : 0) - (keys.has("KeyA") ? 1 : 0);
    const speed = keys.has("ShiftLeft") ? 10 : 6;
    const direction = new THREE.Vector3(sideways, 0, -forward);
    if (direction.lengthSq() > 0) {
      direction.normalize().applyAxisAngle(new THREE.Vector3(0,1,0), yaw);
      player.position.addScaledVector(direction, speed * delta);
      if (!firstPerson) player.rotation.y = Math.atan2(direction.x, direction.z);
    }
    player.position.x = THREE.MathUtils.clamp(player.position.x, -82, 82);
    player.position.z = THREE.MathUtils.clamp(player.position.z, -88, 88);
    updateCamera();
  }
  renderer.render(scene, camera);
}
animate();
loading.classList.add("hidden");
console.log("GRAND CITY 6 — escena 3D cargada.");
