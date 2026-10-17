      /*Clase Clasificacion — Es tu ejercicio de Python de la liga pasado a JS. Atributos equipo y puntos, un método toString(), y fuera de la clase:
• Pedir equipos con prompt hasta que el usuario diga “n”.
• Mostrar la clasificación ordenada, el mejor y el peor equipo.*/
class Clasificacion {
    #equipo ="";
    #puntos=0;

    constructor(equipo, puntos) {
        this.#equipo=equipo;
        this.#puntos=puntos;
    }

    get equipo() {
        return this.#equipo;
    }
    get puntos() {
        return this.#puntos;
    }
    set equipo(value) {
        this.#equipo = value;
    }
    set puntos(value) {
        this.#puntos = value;
    }
    toString() {
        return ("-" + this.#equipo + " " + this.#puntos + " puntos");
    }
}

let equipos=[];
while (true) {
    let aniadir=prompt("Quieres añadir equiopos y puntos(s/n");
    if(aniadir=="s") {
        let puntos=0
        let nombre=prompt("Introduce el equipo");
        puntos=Number(prompt("Introduce sus puntos"));
        let miClasificacion= new Clasificacion(nombre, puntos);
        equipos.push(miClasificacion);
    } else {
        break;
    }
}

//Clasificacion ordenada
function ordenarClasificacion(equipos) {
    equipos.sort(function(a, b){
        if(a.puntos < b.puntos) return 1;
        if(a.puntos == b.puntos) return 0;
        if(a.puntos > b.puntos) return -1;
    })
    return equipos;
}
ordenarClasificacion(equipos);
let mejorEquipo=equipos[0];
let peorEquipo=equipos[equipos.length-1];

console.log("La clasificacion quedaria de esta manera: " + equipos);
console.log("El mejor equipo: " + mejorEquipo);
console.log("El peor equipo: " + peorEquipo);

