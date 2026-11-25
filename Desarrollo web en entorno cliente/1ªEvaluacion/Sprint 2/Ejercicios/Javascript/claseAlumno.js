/*Clase Alumno — nombre y un array notas. Métodos añadirNota(n), media() y aprobado()
       (media ≥ 5). Luego crea un array de alumnos y muestra los aprobados 
       ordenados por media de mayor a menor.*/

class Alumno {
#nombre="";
#notas = [];

  constructor(nombre) {
    this.#nombre=nombre;
    
  }

  set nombre(value) {
     this.#nombre = value;
  }
  get nombre() {
    return this.#nombre;
  }
  set notas(value) {
    this.#notas = value;
  }
  get notas() {
    return this.#notas;
  }

  aniadirNotas(notas) {
    return this.#notas.push(notas);
  }
  media() {
    
        let sumaNotas = 0;
        let media = 0;
        for (let i = 0; i < this.#notas.length; i++) {
          let nota = this.#notas[i];
          sumaNotas += nota;
        }
        media = sumaNotas / this.#notas.length;
        return media;

  }

  aprobado() {
    if (this.media()>=5) {
        return true;
    } else {
        return false;;
    }

  }
}


let ana= new Alumno("Ana");
ana.aniadirNotas(7);
ana.aniadirNotas(8.5);
ana.aniadirNotas(6);

let juan= new Alumno("Juan");
juan.aniadirNotas(4);
juan.aniadirNotas(3);
juan.aniadirNotas(8);
let mara= new Alumno("Mara");
mara.aniadirNotas(1);
mara.aniadirNotas(5);
mara.aniadirNotas(4.5);
let david= new Alumno("David");
david.aniadirNotas(3);
david.aniadirNotas(9);
david.aniadirNotas(2);

 let alumnos=[ana, juan, mara, david];
 for (let i = 0; i < alumnos.length; i++) {
  let nombre = alumnos[i];
  let nota=alumnos[i].notas
  console.log(nombre.nombre + ": " +  nota)
  
}
console.log("Aprobados: ")

 function sortByNotas(alumnos) {
  alumnos.sort(function(a, b){
    if(a.media() < b.media()) return 1
    if(a.media() == b.media()) return 0
    if(a.media() > b.media()) return -1
  });
  return alumnos;
 }
 sortByNotas(alumnos);

 let aprobados=[];
 for (let i = 0; i < alumnos.length; i++) {
    let alumno = alumnos[i];
   if(alumno.aprobado()) {
     aprobados.push(alumno);
     console.log(alumno.nombre + ": " + alumno.media());
}
}
  

