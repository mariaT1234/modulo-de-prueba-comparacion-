const xlsx = require('xlsx');


function extraerDatos(ruta){
  const libro = xlsx.readFile(ruta);
  const nombreHoja = libro.SheetNames[0];

  return xlsx.utils.sheet_to_json(libro.Sheets[nombreHoja]);
}

let paquete_datos1 = extraerDatos('./src/app/excel/mallaElectronica.xlsx');
let paquete_datos2 = extraerDatos('./src/app/excel/historial.xlsx');

 function mostrar_datos(paquete1, paquete2){

    let fusion=[]
    paquete1.forEach(x => fusion.push(x));
    paquete2.forEach(x => fusion.push(x));
    console.log("---------------------------")

    return fusion;
}

console.log(mostrar_datos(paquete_datos1, paquete_datos2)); 

 function filtro(paquete1){
    
    const diferencia1 = paquete1.filter(function(elemento){
        return elemento.NIVEL == 8;
    })

    return diferencia1;
}

console.log("---------------------------");
console.log(filtro(paquete_datos1));
console.log("---------------------------"); 
/* 
 function filtro(paquete2){

    const diferencia2 = paquete2.filter(function(elemento){
        return elemento.Precio == 35;
    })
    
    return diferencia2;
}

console.log("---------------------------");
console.log(filtro(paquete_datos2));
console.log("---------------------------");  */


/* function filtro_fusion(){

    let fusion
    fusion= mostrar_datos (paquete_datos1, paquete_datos2);

    const diferencias = fusion.filter(function(elemento){
        return elemento.Nombre ; 
    })

    return diferencias; 
}

console.log("xxxxxxxxxxxxxxxxxxx")
console.log(filtro_fusion());
console.log("xxxxxxxxxxxxxxxxxxx") */

