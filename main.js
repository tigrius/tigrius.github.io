import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

document.addEventListener('keypress', keypress_event);
document.addEventListener('keyup', keyup_event);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const gltfLoader = new GLTFLoader();
const controls = new OrbitControls(camera, document.body);

const icosphere = await (() => {
    return new Promise((resolve) => {
        gltfLoader.load('/src/ico.glb', (gltf) => {resolve(gltf.scene);}, (err) => {console.error(err);});
    });
})();


const T_ocean = new THREE.TextureLoader().load('/src/ocean.png');
const T_desert = new THREE.TextureLoader().load('/src/desert.png');
const M_ocean = new THREE.MeshStandardMaterial({map: T_ocean});
const M_desert = new THREE.MeshStandardMaterial({map: T_desert});

icosphere.traverse(function(node){
    if (node instanceof THREE.Mesh) {
        node.material = M_ocean;
    }
});

const continentdata = [16,15,14,52,33,21,22,23,7,24,45,65,51];
continentdata.forEach(function(num){
    icosphere.children[num].material = M_desert;
});



scene.add(icosphere);


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const pointlight = new THREE.PointLight(0xffffff,1,100);
const pointlight2 = new THREE.PointLight(0xffffff,1,100);
const pointlight3 = new THREE.PointLight(0xffffff,1,100);
const ambientlight = new THREE.AmbientLight(0xffffff,1);
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

window.addEventListener('click', (evt) => {
    const raycaster = new THREE.Raycaster();
    const vector = new THREE.Vector2(
      (evt.clientX / window.innerWidth) * 2 - 1,
      (evt.clientY / window.innerHeight) * -2 + 1
    );
  
    raycaster.setFromCamera(vector, camera);
  
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        intersects[0].object.material = M_desert;
    }
});

function keypress_event(){
    //scene.add(cube);
    icosphere.traverse(function(node){
        if (node instanceof THREE.Mesh) {
            node.material = M_desert;
        }
    });
}

function keyup_event(){
    scene.remove(cube);
    icosphere.traverse(function(node){
        if (node instanceof THREE.Mesh) {
            node.material = M_ocean;
        }
    });
}


function animate() {
	requestAnimationFrame( animate );
    cube.rotation.z += 0.0;
    cube.rotation.y += 0.0;
	renderer.render( scene, camera );

}
animate();