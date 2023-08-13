import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";



export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const controls = new OrbitControls(camera, document.body);




/*icosphere.traverse(function(node){
    if (node instanceof THREE.Mesh) {
        node.material = M_ocean;
    }
});*/

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const pointlight = new THREE.PointLight(0xffffff,1,80);
const pointlight2 = new THREE.PointLight(0xffffff,1,80);
const pointlight3 = new THREE.PointLight(0xffffff,1,80);
const ambientlight = new THREE.AmbientLight(0xffffff,0.5);
const geometry = new THREE.IcosahedronGeometry( 1, 0 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const cube = new THREE.Mesh( geometry, material );

controls.enableDamping = true;
controls.dampingFactor = 0.3;

camera.position.z = 2;
camera.lookAt(0,0,0);
pointlight.position.set(2,3,5);
pointlight2.position.set(-2,-3,-1);
pointlight3.position.set(-2,4,-5);
scene.add(pointlight);
scene.add(pointlight2);
scene.add(pointlight3);
scene.add(ambientlight);

let n_players = 3;
let points = new Array(n_players);




function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();