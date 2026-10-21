let numeros="";

do {
    numeros=prompt("Introduce una cadena de numero separados por el caracter ; ")
    if(numeros=="") {
        alert("La cadena esta vacia")
        break;
    }
}while(numeros=="");


function ordenarArray(numeros) {
    let arrayNumeros=numeros.split(";");
    arrayNumeros.sort(function(a, b){
        if(a > b) return 1;
        if(a == b) return 0;
        if(a < b) return -1;
    })
    console.log(arrayNumeros);
}
console.log(ordenarArray(numeros));


function numeroMayor(numeros) {
     let arrayNumeros=numeros.split(";");
   arrayNumeros.sort(function(a, b){
        if(a > b) return -1;
        if(a == b) return 0;
        if(a < b) return 1;
    })
    console.log(arrayNumeros);
   let numMayor=arrayNumeros[0];
   console.log(numMayor);
}

console.log(numeroMayor(numeros));
