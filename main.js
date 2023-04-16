//import * as THREE from 'three';
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import * as THREEARL from 'https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 10000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const arjs = new THREEARL.LocationBased(scene , camera);
const webcam = new THREEARL.WebcamRenderer(renderer);

const geometry = new THREE.BoxGeometry( 2, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.x = 1;
camera.position.z = 5;

function animate(){
  requestAnimationFrame(animate);

  cube.rotation.x += 0.02;
	cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();