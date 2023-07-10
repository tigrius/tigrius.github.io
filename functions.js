
function nextAreaL(trgl){
    return [(trgl[0] -1 + 5* trgl[1])%(5* trgl[1]),trgl[1]];
}

function nextAreaR(trgl){
    return [(trgl[0] +1)%(5* trgl[1]),trgl[1]];
}

function nextAreaC(trgl){
    switch (Math.abs(trgl[1])){
        case 4:
            if (trgl[0] % 2 == 0){
                return [trgl[0],-trgl[1]];
            }
            else{
                return [(trgl[0] - Math.round((trgl[0]-1)/4))%15, 3*trgl[1] /4];
            }
        case 3:
            if (trgl[0] % 3 == 0){
                return [trgl[0] /3, trgl[1] /3];
            }
            else{
                return [(trgl[0] + Math.round(trgl[0]/3))%20, 4* trgl[1]/3];
            }
        case 1:
            return [trgl[0] *3, trgl[1] *3];
    }
}

function nextAreas(trgl){
    return [nextAreaL(trgl),nextAreaR(trgl),nextAreaC(trgl)];
}

