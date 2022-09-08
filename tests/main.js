const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById("canvas_on_bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

function create_cube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({ color: "#8AC" });
  return new THREE.Mesh(geometry, material);
}

const cube = create_cube();
const cube2 = create_cube();
const cube3 = create_cube();
const cube4 = create_cube();
var light = new THREE.HemisphereLight(0x404040, 0xffffff, 1);
scene.add(light);
scene.add(cube);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4);
camera.position.z = 7;

setInterval(() => {
  dist = camera.position.z - cube.position.z;
  var vFOV = THREE.MathUtils.degToRad(camera.fov);
  var height = 2 * Math.tan(vFOV / 2) * dist;
  var width = height * camera.aspect;
}, 1000);

function intRenderLoop() {
  requestAnimationFrame(intRenderLoop);

  dist = camera.position.z - cube.position.z;
  var vFOV = THREE.MathUtils.degToRad(camera.fov);
  var height = 2 * Math.tan(vFOV / 2) * dist;
  var width = height * camera.aspect;

  cubeSize = 1;
  extra = 0.7;
  cube.position.x = width / 2 - (cubeSize + extra) / 2;
  cube.position.y = height / 2 - (cubeSize + extra) / 2;

  cube2.position.x = -1 * (width / 2) + (cubeSize + extra) / 2;
  cube2.position.y = -1 * (height / 2) + (cubeSize + extra) / 2;

  // cube3.position.y = height/2 - (cubeSize/2)

  // cube4.position.y = -1 * height/2;


  renderer.render(scene, camera);
}

intRenderLoop();

window.addEventListener(
  "resize",
  () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  },
  false
);

let ticking = false;

document.addEventListener("scroll", (e) => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      camera.position.y = -1 * window.scrollY * 0.005;
      ticking = false;
    });

    ticking = true;
  }
});
