
let viviendas=[
    {vivienda: "casa", metrosCuadrados: 150, direccionPostal: 41710, valorMercado: 100000},
    {vivienda: "piso", metrosCuadrados: 100, direccionPostal: 29042, valorMercado: 150540},
    {vivienda: "casa", metrosCuadrados: 50, direccionPostal: 23957, valorMercado: 30.094},
    {vivienda: "piso", metrosCuadrados: 300, direccionPostal: 49382, valorMercado: 500.343},
    {vivienda: "casa", metrosCuadrados: 19, direccionPostal: 41023, valorMercado: 15000},
    {vivienda: "piso", metrosCuadrados: 110, direccionPostal: 34322, valorMercado: 99000}
];


function masCara(viviendas) {
    let casas=[]
    let casaMasCara=[];
    for (let i=0; i<viviendas.length; i++) {
        if(viviendas[i].vivienda=="casa") {
            casas.push(viviendas[i]);
        }
    }
   
    casas.sort(function(a, b) {
    
    if(a.valorMercado>b.valorMercado) return 1;
    if(a.valorMercado==b.valorMercado) return 0;
    if(a.valorMercado<b.valorMercado) return -1;
    casaMasCara=casas[0];
    console.log(casaMasCara)
})
}
console.log(masCara(viviendas));

function menorDimension(viviendas) {
    let pisos=[]
    let pisoMenordimension=[];
    for (let i=0; i<viviendas.length; i++) {
        if(viviendas[i].vivienda=="piso") {
            pisos.push(viviendas[i]);
        }
    }  
    pisos.sort(function(a, b) {
    
if(a.metrosCuadrados>b.metrosCuadrados) return -1;
if(a.metrosCuadrados==b.metrosCuadrados) return 0;
if(a.metrosCuadrados<b.metrosCuadrados) return 1;
})
pisoMenordimension=pisos[0]
console.log(pisoMenordimension);
}
console.log(menorDimension(viviendas));