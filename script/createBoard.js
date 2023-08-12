import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { Area } from "./classes.js";
import { scene } from './main.js';
import { binaryRandom } from './functions.js';

const gltfLoader = new GLTFLoader();
const icosphere = await (() => {
    return new Promise((resolve) => {
        gltfLoader.load('/src/model/icosphere.glb', (gltf) => {resolve(gltf.scene);}, (err) => {console.error(err);});
    });
})();

export let areas = new Array();

let areas1 = new Array(5);
let areas6 = new Array(5);
let areas2 = new Array(15);
let areas5 = new Array(15);
let areas3 = new Array(20);
let areas4 = new Array(20);

for (let i=0;i < 5; i++){
    areas1[i] = new Area(0,i,icosphere.children[i],binaryRandom(0.3));
}
for (let i=0;i<15;i++){
    areas2[i] = new Area(1,i,icosphere.children[i + 5],binaryRandom(0.3));
}
for (let i=0;i<20;i++){
    areas3[i] = new Area(2,i,icosphere.children[i + 20],binaryRandom(0.3));
}
for (let i=0;i<20;i++){
    areas4[i] = new Area(3,i,icosphere.children[i + 40], binaryRandom(0.3));
}
for (let i=0;i<15;i++){
    areas5[i] = new Area(4,i,icosphere.children[i + 60],binaryRandom(0.3));
}
for (let i=0;i < 5; i++){
    areas6[i] = new Area(5,i,icosphere.children[i + 75],binaryRandom(0.3));
}
areas.push(areas1);
areas.push(areas2);
areas.push(areas3);
areas.push(areas4);
areas.push(areas5);
areas.push(areas6);

for (let i of areas){
    for (let j of i){
        j.depict();
    }
}

scene.add(icosphere);