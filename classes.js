import { nextAreas } from "./functions.js";

const 大気組成 = {
    O2 : 0,
    CO2 : 0,
    N2 : 100,

    incO2 : function(num){this.O2 += num;},
}

class area {
    constructor(x,y, isSea){
        this.address = [x,y];
        this.plant = none;
        this.animal = none;
        this.isSea = isSea;
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
    get getNextAreas(){
        return nextAreas(this.address);
    }
}