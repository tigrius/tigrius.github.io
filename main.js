//import * as THREE from 'three';
import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 10000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//const arjs = new THREEx.LocationBased(scene , camera);
//const webcam = new WebcamRenderer(renderer);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.x = 1;

const geometry2 = new THREE.BoxGeometry(1,1,1);
const material2 = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
const box = new THREE.Mesh( geometry2, material2);
scene.add( box);
box.position.x = -1;

camera.position.z = 5;

function animate(){
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();