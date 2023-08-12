import * as THREE from 'three';
import { nextAreas,drawTriag } from "./functions.js";

var canvasSize = 256;

const 大気組成 = {
    O2 : 0,
    CO2 : 0,
    N2 : 100,

    incO2 : function(num){this.O2 += num;},
}

export class Area {
    constructor(x,y,object, isSea){
        this.address = [x,y];
        this.object = object;
        this.plant = null;
        this.animal = null;
        this.isSea = isSea;
        this.isSelected = false;

        object.name = x + "," + y;

        const canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        if(isSea){ 
            img.src = '/src/texture/ocean.png'; 
        }else{
            img.src = '/src/texture/desert.png';
        }

        img.onload = function(){
            ctx.drawImage(img, 0, 0, 256, 256);
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshStandardMaterial({map: texture});
            object.material = material;

        }

        

        this.canvas = canvas;
        this.ctx = ctx;

        this.depict();
    }
    get getAdress(){
        return this.address;
    }
    get getPlant(){
        return this.plant;
    }
    get getAnimal(){
        return this.animal;
    }
    isSea(){
        return this.isSea;
    }
    set setPlant(plant){
        this.plant = plant;
    }
    set setAnimal(animal){
        this.animal = animal;
    }
    getNextAreas(){
        return nextAreas(this.address);
    }
    getObject(){
        return this.object;
    }
    showTexture(){
        try {document.getElementById('texture').children[0].remove();}catch{}
        
        document.getElementById('texture').appendChild(this.canvas);
        this.canvas.style.width = "70%";
        this.canvas.style.width = "70%";
    }
    emitEdge(){
        this.ctx.strokeStyle = '#ff0000';
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(0.5* canvasSize,canvasSize);
        this.ctx.lineTo(canvasSize,canvasSize * (1-Math.sqrt(3)/2));
        this.ctx.lineTo(0,canvasSize * (1-Math.sqrt(3)/2));
        this.ctx.closePath();
        //drawTriag(ctx);
        this.ctx.stroke();
        this.refresh();
    }
    refresh(){
        this.object.material.map.needsUpdate = true;
    }
    imgEdge(){
        if (this.isSelected){
            const canvas = document.createElement('canvas');
            canvas.width = canvasSize;
            canvas.height = canvasSize;
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0.5* canvasSize,canvasSize);
            ctx.lineTo(canvasSize,canvasSize * (1-Math.sqrt(3)/2));
            ctx.lineTo(0,canvasSize * (1-Math.sqrt(3)/2));
            ctx.closePath();
            ctx.stroke();
            const url = canvas.toDataURL();
            const img = new Image();
            img.src = url;
            return img;
        }
        else{
            const canvas = document.createElement('canvas');
            canvas.width = canvasSize;
            canvas.height = canvasSize;
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = '#cccccc';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0.5* canvasSize,canvasSize);
            ctx.lineTo(canvasSize,canvasSize * (1-Math.sqrt(3)/2));
            ctx.lineTo(0,canvasSize * (1-Math.sqrt(3)/2));
            ctx.closePath();
            ctx.stroke();
            const url = canvas.toDataURL();
            const img = new Image();
            img.src = url;
            return img;
        }
    }
    imgPlate(){
        const img = new Image();
        if(this.isSea){ 
            img.src = '/src/texture/ocean.png'; 
        }else{
            img.src = '/src/texture/desert.png';
        }
        return img;
    }
    imgPlant(){
        return null;
    }
    imgAnimal(){
        return null;
    }
    depict(){
        new Promise((resolve, reject) => {
            resolve(this.imgPlate());
        })
            .then((data) => {
                this.ctx.drawImage(data,0,0,canvasSize,canvasSize);
                return new Promise((resolve, reject) => resolve(this.imgPlant()))
            })
            .then((data) => {
                try{this.ctx.drawImage(data,0,0,canvasSize,canvasSize);}catch{}
                return new Promise((resolve, reject) => resolve(this.imgAnimal()))
            })
            .then((data) => {
                try{this.ctx.drawImage(data,0,0,canvasSize,canvasSize);}catch{}
                return new Promise((resolve, reject) => resolve(this.imgEdge()))
            })
            .then((data) => {
                try{this.ctx.drawImage(data,0,0,canvasSize,canvasSize);}catch{}
            })

        this.refresh();
    }
    select(){
        this.isSelected = true;
        this.depict();
    }
    unselect(){
        this.isSelected = false;
        this.depict();
    }
}