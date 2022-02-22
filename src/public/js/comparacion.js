const xlsx = require('xlsx');

let comparacion_module = {}

// -------------- Extraccion de datos del excel ----------------//

function extraerDatos(ruta){
  const libro = xlsx.readFile(ruta);
  const nombreHoja = libro.SheetNames[0];

  return xlsx.utils.sheet_to_json(libro.Sheets[nombreHoja]);
}

var paquete_datos1 = extraerDatos('./src/app/excel/Ps4.xlsx');
var paquete_datos2 = extraerDatos('./src/app/excel/Xbox.xlsx');

//--------------------------------------------------------------//


//------------------ Fusionar y mostrar datos----------------------//

function mostrar_datos(paquete1, paquete2){

    let fusion=[]
    paquete1.forEach(x => fusion.push(x));
    paquete2.forEach(x => fusion.push(x));
    console.log("---------------------------")

    return fusion;
}

console.log(mostrar_datos(paquete_datos1, paquete_datos2)); 

//------------------------------------------------------------------//

//---------------------Filtro #1(provedor)-------------------//

function filtroProvedor(paquete1){
    
    const diferencia1 = paquete1.filter(function(elemento){
        return elemento.provedor == "mercado libre";
    })

    return diferencia1;
}

console.log("1---------------------------1");
console.log(filtroProvedor(paquete_datos1));
console.log("1---------------------------1");

//------------------------------------------------------------//


//---------------------Filtro #2(precio)-------------------//

function filtroPrecio(paquete2){

    const diferencia2 = paquete2.filter(function(elemento){
        return elemento.Precio == 35;
    })
    
    return diferencia2;
}

console.log("2---------------------------2");
console.log(filtroPrecio(paquete_datos2));
console.log("2---------------------------2");

//----------------------------------------------------------//


//---------------------Filtro #3(Objetos fusionados)-------------------//

function filtro_fusion(){

    let fusion
    fusion= mostrar_datos (paquete_datos1, paquete_datos2);

    const diferencias = fusion.filter(function(elemento){
        return elemento.Precio == 35; 
    })

    return diferencias; 
}

console.log("3-------------------3")
console.log(filtro_fusion());
console.log("3-------------------3")

//--------------------------------------------------------------------//



// ----------------- array de arrays --------------------//

var ArraydeArrays1 = []

for(elemento of mostrar_datos(paquete_datos1, paquete_datos2)){

    ArraydeArrays1.push([

        elemento.Nro_Juego,
        elemento.Nombre,
        elemento.Precio,
        elemento.provedor

    ])
}

console.log(".________________.");
console.log(ArraydeArrays1);
console.log(".________________.");

//---------------------------------------------------------//

// ----------------- array de arrays --------------------//

var ArraydeArrays2 = []

for(elemento of filtroProvedor(paquete_datos1)){

    ArraydeArrays2.push([

        elemento.Nro_Juego,
        elemento.Nombre,
        elemento.Precio,
        elemento.provedor

    ])
}

console.log("2.________________.2");
console.log(ArraydeArrays2);
console.log("2.________________.2");

//---------------------------------------------------------//

//-----------------------creacion del excel------------------------------//

const HojaDeTrabajo1 = xlsx.utils.aoa_to_sheet(ArraydeArrays1);
const HojaDeTrabajo2 = xlsx.utils.aoa_to_sheet(ArraydeArrays2);
const LibroDeTrabajo = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(LibroDeTrabajo, HojaDeTrabajo1,'Diferencias');
xlsx.utils.book_append_sheet(LibroDeTrabajo, HojaDeTrabajo2,'DiferenciasFiltro');
xlsx.writeFile(LibroDeTrabajo, 'diferencias8.xlsx');

/*--------------------EXPORTAR MODULO---------------------------*/

comparacion_module.extraerDatos = extraerDatos 
comparacion_module.mostrar_datos = mostrar_datos 
comparacion_module.filtroProvedor = filtroProvedor 
comparacion_module.filtroPrecio = filtroPrecio 
comparacion_module.filtro_fusion = filtro_fusion 

module.exports = comparacion_module; 