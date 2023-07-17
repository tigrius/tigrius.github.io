import * as THREE from 'three';
import {camera,scene} from './main.js';
import {areas} from './createBoard.js';

document.addEventListener('keypress', keypress_event);
document.addEventListener('keyup', keyup_event);

const T_ocean = new THREE.TextureLoader().load('/src/ocean.png');
const T_desert = new THREE.TextureLoader().load('/src/desert.png');
const M_ocean = new THREE.MeshStandardMaterial({map: T_ocean});
const M_desert = new THREE.MeshStandardMaterial({map: T_desert});

let selectedArea = null;
let visibleTextureSample = false;

window.addEventListener('click', (evt) => {
    const raycaster = new THREE.Raycaster();
    const vector = new THREE.Vector2(
      (evt.clientX / window.innerWidth) * 2 - 1,
      (evt.clientY / window.innerHeight) * -2 + 1
    );
  
    raycaster.setFromCamera(vector, camera);
  
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        //console.log(intersects[0].object.name);
        const address = intersects[0].object.name.split(',');
        //console.log(address);
        try{selectedArea.unselect();}catch{}
        selectedArea = areas[address[0]][address[1]];
        
        selectedArea.select();

        if(visibleTextureSample){
            selectedArea.showTexture();
        }
    }
    else{
        try {document.getElementById('texture').children[0].remove();}catch{}
        try{selectedArea.unselect();}catch{}
        selectedArea = null;

        try {document.getElementById('texture').children[0].remove();}catch{}
    }
});

function keypress_event(){
    if(visibleTextureSample){
        visibleTextureSample = false;
        try {document.getElementById('texture').children[0].remove();}catch{}
    }
    else{
        visibleTextureSample = true;
        try{selectedArea.showTexture();}catch{}
    }
    
    //scene.add(cube);
    /*scene.traverse(function(node){
        if (node instanceof THREE.Mesh) {
            node.material = M_desert;
        }
    });*/
}

function keyup_event(){
    
    /*scene.traverse(function(node){
        if (node instanceof THREE.Mesh) {
            node.material = M_ocean;
        }
    });*/
}