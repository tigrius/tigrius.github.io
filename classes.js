import { nextAreas } from "./functions.js";

var canvasSize = 256;

const 大気組成 = {
    O2 : 0,
    CO2 : 0,
    N2 : 100,

    incO2 : function(num){this.O2 += num;},
}

export class area {
    constructor(x,y,object, isSea){
        this.address = [x,y];
        this.object = object
        this.plant = none;
        this.animal = none;
        this.isSea = isSea;

        this.canvas = document.createElement('canvas');
        this.canvas.width = canvasSize;
        this.canvas.height = canvasSize;
        this.ctx = this.canvas.getContext('2d');
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
    get isSea(){
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
}