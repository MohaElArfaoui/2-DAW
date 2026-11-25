/*Clase Agenda — Tu agenda de Python, pero ahora como clase con un array interno de contactos y 
métodos añadir(nombre, tlf), buscar(cadena), borrar(nombre) y listar(). 
Si el contacto existe al añadir, que avise.*/

class Agenda {
  #contactos = [];

  get contactos() {
    return this.#contactos;
  }

  aniadir(nombre, telefono) {
    for (let i = 0; i < this.#contactos.length; i++) {
      if (this.#contactos[i].nombre == nombre) {
        alert("El contacto ya existe");
        return; // sale del método sin añadir
      }
    }
    this.#contactos.push({ nombre: nombre, tlf: telefono });
  }

  // FALLOS ANTERIORES en buscar y borrar:
  // - Usaba miAgenda dentro de la clase: miAgenda es el objeto Agenda, no un array,
  //   así que no tiene includes. Dentro de la clase el array es this.#contactos.
  // - Usaba buscarContacto / borrarContacto, que son variables del switch y aquí no existen.
  //   Lo que llega al método son los parámetros: cadena y nombre.
  // - miAgenda.buscar(...) dentro de buscar (y borrar dentro de borrar) hacía que el
  //   método se llamara a sí mismo sin fin.
  // - includes sobre el array no sirve para buscar por nombre en objetos: hay que
  //   comparar this.#contactos[i].nombre.
  // - El splice estaba fuera del bucle, donde i no existe.
  // - El "no existe" se mostraba en cada vuelta del bucle; ahora solo se muestra una vez al final.
  buscar(cadena) {
    let encontrado = false;
    for (let i = 0; i < this.#contactos.length; i++) {
      if (this.#contactos[i].nombre.includes(cadena)) {
        console.log(this.#contactos[i]);
        encontrado = true;
      }
    }
    if (!encontrado) {
      console.log("El contacto no existe");
    }
  }

  borrar(nombre) {
    for (let i = 0; i < this.#contactos.length; i++) {
      if (this.#contactos[i].nombre == nombre) {
        this.#contactos.splice(i, 1);
        console.log("Contacto borrado");
        return;
      }
    }
    console.log("El contacto no existe");
  }

  listar() {
    console.log(this.#contactos);
  }
}
let opcion;
let miAgenda = new Agenda();
do {
  opcion = Number(
    prompt(
      "Introduce una opcion 1.añadir(nombre, tlf) \n2.buscar(cadena) \n3.borrar(nombre)\n4.listar() \n5.Salir",
    ),
  );

  switch (opcion) {
    case 1:
      let nombre = prompt("Nombre del contacto");
      let tlf = Number(prompt("Teléfono"));
      miAgenda.aniadir(nombre, tlf);
      break;

    case 2:
      let buscarContacto = prompt("Introduce un contacto para buscar");
      miAgenda.buscar(buscarContacto);
      break;

    case 3:
      let borrarContacto = prompt("Introduce un contacto para borrar");
      miAgenda.borrar(borrarContacto);
      break;

    case 4:
      miAgenda.listar();
      break;
    case 5:
      console.log("Saliendo...");
      break;
  }
} while (opcion != 5);
