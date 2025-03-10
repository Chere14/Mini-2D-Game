import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { World } from './world';

const gui = new GUI();
const stats = new Stats();
document.body.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);

const world = new World();
scene.add(world);

const star = new THREE.DirectionalLight();
star.intensity = 3;
star.position.set(1, 2, 3);
scene.add(star);

const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
scene.add(ambient);

camera.position.set(20, 20, 20); // isometric view
camera.lookAt(0, 0, 0);
controls.update();

function animate() {
    controls.update();
    renderer.render(scene, camera);
    stats.update();
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const worldFolder = gui.addFolder('World');

worldFolder.add(world, 'generate').name('Generate');