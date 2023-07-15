import * as THREE from 'three';

export function createCanvasMaterial(imgsrc = "/src/ocean.png"){
    const canvas = document.createElement('canvas');

    canvas.width = 256;
    canvas.height = 256;

    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = imgsrc;
    
    img.onload = function(){
        ctx.drawImage(img, 0, 0, 256, 256);
        let texture = new THREE.CanvasTexture(ctx.canvas);
        texture.needsUpdate = true;

        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBAFormat;

        let material = new THREE.MeshStandardMaterial({map: texture});
    
    return material;
    }

    //document.body.appendChild(ctx.canvas);

    
}