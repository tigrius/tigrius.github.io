import * as THREE from 'three';
import { nextAreas,drawTriag } from "./functions.js";

var canvasSize = 512;

const 大気組成 = {
    O2 : 0,
    CO2 : 0,
    N2 : 100,

    incO2 : function(num){this.O2 += num;},
}

const leaf = new Image();
leaf.src = "../src/icon/leaf.png";
const fruit = new Image();
fruit.src = "../src/icon/fruit.png";
const meat = new Image();
meat.src = "../src/icon/meat.png";
const point = new Image();
point.src = "../src/icon/point.png";
const a = 0.7;

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
            ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0.5* canvasSize,0);
            ctx.lineTo(canvasSize,canvasSize * (Math.sqrt(3)/2));
            ctx.lineTo(0,canvasSize * (Math.sqrt(3)/2));
            ctx.closePath();
            ctx.stroke();
            const texture = new THREE.CanvasTexture(canvas);
            const material = new THREE.MeshStandardMaterial({map: texture});
            object.material = material;

        }

        

        this.canvas = canvas;
        this.ctx = ctx;

        this.depict();
    }
    getAdress(){
        return this.address;
    }
    getPlant(){
        return this.plant;
    }
    getAnimal(){
        return this.animal;
    }
    isSea(){
        return this.isSea;
    }
    setPlant(plant){
        this.plant = plant;
    }
    setAnimal(animal){
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
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(0.5* canvasSize,0);
            ctx.lineTo(canvasSize,canvasSize * (Math.sqrt(3)/2));
            ctx.lineTo(0,canvasSize * (Math.sqrt(3)/2));
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
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0.5* canvasSize,0);
            ctx.lineTo(canvasSize,canvasSize * (Math.sqrt(3)/2));
            ctx.lineTo(0,canvasSize * (Math.sqrt(3)/2));
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
        if (this.plant == null){
            return null;
        }
        else{
            const img = new Image();
            img.src = this.plant.src;
            return img;
        }
    }
    imgAnimal(){
        if (this.animal == null){
            return null;
        }
        else{
            const img = new Image();
            img.src = this.animal.src;
            return img;
        }
    }
    plantUI(){
        if (this.plant == null){return null;}else{
            const canvas = document.createElement('canvas');
            canvas.width = canvasSize;
            canvas.height = canvasSize;
            const ctx = canvas.getContext('2d');

            for (let i =0; i < this.plant.PP; i++){
                ctx.drawImage(leaf,canvasSize/2 *((a+1)/2 -a*(i+0.5)/this.plant.PP), Math.sqrt(3)*0.5*canvasSize*((1-a)/2 + a*(i+0.5)/this.plant.PP), Math.ceil(Math.min(a*canvasSize*0.5*Math.sqrt(2)/this.plant.PP, Math.sqrt(6)*(1-a)*canvasSize/12)),Math.ceil(Math.min(a*canvasSize*0.5*Math.sqrt(2)/this.plant.PP, Math.sqrt(6)*(1-a)*canvasSize/12)));
            }
            for (let i =0; i < this.plant.HP; i++){
                ctx.drawImage(fruit,canvasSize/2 *((3-a)/2 +a*(i+0.5)/this.plant.HP) - Math.ceil(Math.min(a*canvasSize*0.5*Math.sqrt(2)/this.plant.HP, Math.sqrt(6)*(1-a)*canvasSize/12)), Math.sqrt(3)*0.5*canvasSize*((1-a)/2 + a*(i+0.5)/this.plant.HP), Math.ceil(Math.min(a*canvasSize*0.5*Math.sqrt(2)/this.plant.HP, Math.sqrt(6)*(1-a)*canvasSize/12)),Math.ceil(Math.min(a*canvasSize*0.5*Math.sqrt(2)/this.plant.HP, Math.sqrt(6)*(1-a)*canvasSize/12)));
            }
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#ffffff"
            ctx.textAlign = "right";
            ctx.textBaseline = "bottom";
            ctx.font = '24px sanserif'
            ctx.strokeText(this.plant.name, 0.4* canvasSize, canvasSize * Math.sqrt(3)/2 -6, 0.35* canvasSize);
            ctx.fillText(this.plant.name, 0.4* canvasSize, canvasSize * Math.sqrt(3)/2 -6, 0.35* canvasSize);
            ctx.font = '40px serif'
            ctx.strokeText(this.plant.CP, 0.5 * canvasSize -3, canvasSize * Math.sqrt(3)/2 -6, 0.1 * canvasSize);
            ctx.fillText(this.plant.CP, 0.5 * canvasSize -3, canvasSize * Math.sqrt(3)/2 -6, 0.1 * canvasSize);
            ctx.textAlign = "center";
            ctx.strokeText("/", 0.5 * canvasSize, canvasSize * Math.sqrt(3)/2 -6);
            ctx.fillText("/", 0.5 * canvasSize, canvasSize * Math.sqrt(3)/2 -6);

            ctx.translate(canvasSize/2,canvasSize/2);
            ctx.rotate(Math.PI);
            ctx.translate(-canvasSize/2,-canvasSize/2);

            ctx.font = '24px sanserif';
            ctx.textAlign = "right";
            ctx.textBaseline = "top";
            ctx.strokeText(this.plant.name, 0.4* canvasSize, canvasSize * (1-Math.sqrt(3)/2) +6, 0.35* canvasSize);
            ctx.fillText(this.plant.name, 0.4* canvasSize, canvasSize * (1-Math.sqrt(3)/2) +6, 0.35* canvasSize);
            ctx.font = '40px serif';
            ctx.strokeText(this.plant.CP, 0.5* canvasSize -3, canvasSize * (1-Math.sqrt(3)/2) +6, 0.1* canvasSize);
            ctx.fillText(this.plant.CP, 0.5* canvasSize -3, canvasSize * (1-Math.sqrt(3)/2) +6, 0.1* canvasSize);

            const url = canvas.toDataURL();
            const img = new Image();
            img.src = url;
            return img;
        }
    }
    animalUI(){
        if (this.animal == null){
            return null;
        }
        else{
            const canvas = document.createElement('canvas');
            canvas.width = canvasSize;
            canvas.height = canvasSize;
            const ctx = canvas.getContext('2d');

            for (let i =0; i < this.animal.HP; i++){
                const r = Math.ceil(Math.min(a*canvasSize*0.5*Math.sqrt(2)/this.animal.HP, Math.sqrt(6)*(1-a)*canvasSize/12));
                ctx.drawImage(point,canvasSize/2 -0.5*(Math.sqrt(3)*r +(a*canvasSize - 2*Math.sqrt(3)*r)*(i+0.5)/this.animal.HP), 2*r +Math.sqrt(3)*0.5*(Math.sqrt(3)*r +(a*canvasSize - 2*Math.sqrt(3)*r)*(i+0.5)/this.animal.HP), Math.ceil(Math.min(a*canvasSize*0.5*Math.sqrt(2)/this.animal.HP, Math.sqrt(6)*(1-a)*canvasSize/12)),Math.ceil(Math.min(a*canvasSize*0.5*Math.sqrt(2)/this.animal.HP, Math.sqrt(6)*(1-a)*canvasSize/12)));
            }
            for (let i =0; i < this.animal.EP; i++){
                const r = Math.ceil(Math.min(a*canvasSize*0.5*Math.sqrt(2)/this.animal.EP, Math.sqrt(6)*(1-a)*canvasSize/12));
                ctx.drawImage(meat,canvasSize/2 +0.5*(Math.sqrt(3)*r +(a*canvasSize - 2*Math.sqrt(3)*r)*(i+0.5)/this.animal.EP) - r,2*r +Math.sqrt(3)*0.5*(Math.sqrt(3)*r +(a*canvasSize - 2*Math.sqrt(3)*r)*(i+0.5)/this.animal.EP), Math.ceil(Math.min(a*canvasSize*0.5*Math.sqrt(2)/this.animal.EP, Math.sqrt(6)*(1-a)*canvasSize/12)),Math.ceil(Math.min(a*canvasSize*0.5*Math.sqrt(2)/this.animal.EP, Math.sqrt(6)*(1-a)*canvasSize/12)));
            }

            if (this.animal.PL == 1){ctx.fillStyle = "#ffff00";}else{
                if (this.animal.LE.includes(1)){ctx.fillStyle = "#ff0000";}else{ctx.fillStyle = "#555555";}
            }
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0.5* canvasSize,0);
            ctx.lineTo(0.5* canvasSize + canvasSize * 0.1 / 2,canvasSize * (Math.sqrt(3)/2) * 0.1);
            ctx.lineTo(0.5* canvasSize - canvasSize * 0.1 /2 ,canvasSize * (Math.sqrt(3)/2) * 0.1);
            ctx.closePath();
            ctx.fill();
            if (this.animal.PL == 2){ctx.fillStyle = "#ffff00";}else{
                if (this.animal.LE.includes(2)){ctx.fillStyle = "#ff0000";}else{ctx.fillStyle = "#555555";}
            }
            ctx.beginPath();
            ctx.moveTo(0.5* canvasSize,0);
            ctx.lineTo(0.5* canvasSize + canvasSize * 0.08 / 2,canvasSize * (Math.sqrt(3)/2) * 0.08);
            ctx.lineTo(0.5* canvasSize - canvasSize * 0.08 /2 ,canvasSize * (Math.sqrt(3)/2) * 0.08);
            ctx.closePath();
            ctx.fill();
            if (this.animal.PL == 3){ctx.fillStyle = "#ffff00";}else{
                if (this.animal.LE.includes(3)){ctx.fillStyle = "#ff0000";}else{ctx.fillStyle = "#555555";}
            }
            ctx.beginPath();
            ctx.moveTo(0.5* canvasSize,0);
            ctx.lineTo(0.5* canvasSize + canvasSize * 0.06 / 2,canvasSize * (Math.sqrt(3)/2) * 0.06);
            ctx.lineTo(0.5* canvasSize - canvasSize * 0.06 /2 ,canvasSize * (Math.sqrt(3)/2) * 0.06);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "right";
            ctx.textBaseline = "bottom";
            ctx.font = '24px sanserif';
            ctx.strokeText(this.animal.name, 0.4* canvasSize, (2+a) * canvasSize * Math.sqrt(3)/6 -6, a*0.35* canvasSize);
            ctx.fillText(this.animal.name, 0.4* canvasSize, (2+a) * canvasSize * Math.sqrt(3)/6 -6, a*0.35* canvasSize);
            ctx.font = '40px serif';
            ctx.strokeText(this.animal.CP, 0.5 * canvasSize -3, (2+a) * canvasSize * Math.sqrt(3)/6 -6, a* 0.1 * canvasSize);
            ctx.fillText(this.animal.CP, 0.5 * canvasSize -3, (2+a) * canvasSize * Math.sqrt(3)/6 -6, a* 0.1 * canvasSize);
            ctx.textAlign = "center";
            ctx.strokeText("/", 0.5 * canvasSize, canvasSize * Math.sqrt(3)/2 -9 -40);
            ctx.fillText("/", 0.5 * canvasSize, canvasSize * Math.sqrt(3)/2 -9 -40);

            ctx.translate(canvasSize/2,canvasSize/2);
            ctx.rotate(Math.PI);
            ctx.translate(-canvasSize/2,-canvasSize/2);

            ctx.font = '24px sanserif';
            ctx.textAlign = "right";
            ctx.textBaseline = "top";
            ctx.strokeText(this.animal.name, 0.4* canvasSize, canvasSize * (1-(2+a)*Math.sqrt(3)/6) +6, a* 0.35* canvasSize);
            ctx.fillText(this.animal.name, 0.4* canvasSize, canvasSize * (1-(2+a)*Math.sqrt(3)/6) +6, a* 0.35* canvasSize);
            ctx.font = '40px serif';
            ctx.strokeText(this.animal.CP, 0.5* canvasSize -3, canvasSize * (1-(2+a)*Math.sqrt(3)/6) +6, a* 0.1* canvasSize);
            ctx.fillText(this.animal.CP, 0.5* canvasSize -3, canvasSize * (1-(2+a)*Math.sqrt(3)/6) +6, a* 0.1* canvasSize);


            
            const url = canvas.toDataURL();
            const img = new Image();
            img.src = url;
            return img;
        }
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
                return new Promise((resolve, reject) => resolve(this.plantUI()))
            })
            .then((data) => {
                try{this.ctx.drawImage(data,0,0,canvasSize,canvasSize);}catch{}
                return new Promise((resolve, reject) => resolve(this.animalUI()))
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