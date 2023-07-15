import * as THREE from 'three';

export function createCanvasMaterial(){
    const canvas = document.createElement('canvas');

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    /*texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBAFormat;*/

    const material = new THREE.MeshStandardMaterial({map: texture});

    return material;
}