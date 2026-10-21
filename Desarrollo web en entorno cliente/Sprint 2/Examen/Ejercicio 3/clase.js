class Viviendas {
    #viviendas=[];

    constructor(viviendas) {
        this.#viviendas=viviendas;
    }

    get viviendas (){
        return this.#viviendas;
    }

    altaVivienda(vivienda, metrosCuadrados, direccionPostal, valorMercado) {
    this.#viviendas.push({ vivienda: vivienda, metrosCuadrados: metrosCuadrados, direccionPostal:direccionPostal, valorMercado:valorMercado });
  }
    masCara() {
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
        return console.log(casaMasCara)
        })

  }
    menosDimension() {

    let pisos=[]
    let pisoMenordimension=[];
    for (let i=0; i<viviendas.length; i++) {
        if(viviendas[i].vivienda=="piso") {
            pisos.push(viviendas[i]);
        }
    }  
    pisos.sort(function(a, b) {
    
    if (a.metrosCuadrados>b.metrosCuadrados) return -1;
    if (a.metrosCuadrados==b.metrosCuadrados) return 0;
    if (a.metrosCuadrados<b.metrosCuadrados) return 1;
    })
    pisoMenordimension=pisos[0]
    return console.log(pisoMenordimension);
}

}


let oVivienda= new Viviendas();

oVivienda.altaVivienda("Casa", 200, "Rafael Alberti, 15 Los Palacios y Villafranca", 120000);
oVivienda.altaVivienda("Piso", 90, "Avenida Utrera, 18 Los Palacios y Villafranca", 75000);
alert(oVivienda.masCara());
alert(oVivienda.menosDimension());