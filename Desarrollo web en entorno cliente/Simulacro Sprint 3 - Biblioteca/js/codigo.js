// =====================================================
//  SIMULACRO SPRINT REVIEW 3 — Biblioteca DAW
//  Lee el enunciado.pdf antes de empezar.
// =====================================================

// Datos iniciales: objetos NORMALES (todavía NO son Libro)
const datosLibros = [
  {
    isbn: "978-84-01",
    titulo: "El Quijote",
    autor: "Miguel de Cervantes",
    anio: 1605,
  },
  {
    isbn: "978-84-02",
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    anio: 1967,
  },
  {
    isbn: "978-84-03",
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafón",
    anio: 2001,
  },
  {
    isbn: "978-84-04",
    titulo: "Patria",
    autor: "Fernando Aramburu",
    anio: 2016,
  },
  {
    isbn: "978-84-05",
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
    anio: 1943,
  },
  { isbn: "978-84-06", titulo: "1984", autor: "George Orwell", anio: 1949 },
  {
    isbn: "978-84-07",
    titulo: "La casa de los espíritus",
    autor: "Isabel Allende",
    anio: 1982,
  },
  { isbn: "978-84-08", titulo: "Rayuela", autor: "Julio Cortázar", anio: 1963 },
];

/** @type {Libro[]} */
let libros = [];
let libroPulsado= null;

document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {
    ocultar();
    document.getElementById("divListaLibros").addEventListener("click", mostrarDatos);
    document.getElementById("btnPrestar").addEventListener("click", prestar);
    document.getElementById("btnBorrar").addEventListener("click", borrarLibro);
    document.getElementById("btnNuevo").addEventListener("click", nuevoLibro);
    document.getElementById("btnGuardar").addEventListener("click", validarDatos);
    document.getElementById("btnEditar").addEventListener("click", editarLibro);
  for (const libro of datosLibros) {
    const nuevoLibro = new Libro(
      libro.isbn,
      libro.titulo,
      libro.autor,
      libro.anio,
    );
    libros.push(nuevoLibro);
  }
  cargarLista();
}
function cargarLista() {
  const listaLibros = document.getElementById("divListaLibros");
  listaLibros.innerHTML = "";
  const tabla = document.createElement("table");
  tabla.className = "table table-striped";
  for (const libro of libros) {
    let fila = document.createElement("tr");
    let celda1 = document.createElement("td");
    celda1.innerHTML = libro.getTitulo();
    celda1.dataset.isbn = libro.getIsbn();
    fila.appendChild(celda1);
    let celda2 = document.createElement("td");
    celda2.dataset.isbn = libro.getIsbn();
    if (libro.isPrestado() == false) {
      celda2.innerHTML = "Disponible";
    } else {
      celda2.innerHTML = "Prestado";
    }
    fila.appendChild(celda2);
    tabla.appendChild(fila);
  }
  listaLibros.appendChild(tabla);
}

function ocultar() {
  document.getElementById("formLibro").style.display = "none";
  document.getElementById("divDetalle").style.display = "none";
}

function mostrarDatos(event) {
  
  for (const libro of libros) {
    if (event.target.dataset.isbn == libro.getIsbn()) {
      libroPulsado=libro;
     pintarFicha(libro);
     

  }
}
}

function prestar(){
  libroPulsado.cambiarEstado();
  pintarFicha(libroPulsado);
  cargarLista();
}

function pintarFicha(libro){
  ocultar();
  document.getElementById("divDetalle").style.display = "block";

    const ficha = document.getElementById("divFicha");
    let estado="";
   if (libro.isPrestado() == false) {
        estado= "Disponible";
      } else {
        estado = "Prestado";
      }
   
      ficha.innerHTML=
        libro.getIsbn() +
        "<p>" +
        libro.getTitulo() +
        "<p>" +
        libro.getAutor() +
        "<p>" +
        libro.getAnio() +
        "<p>" +
        estado;
      }

function borrarLibro() {

  if(libroPulsado.isPrestado()==true) {
    alert("No se puede borrar un libro prestado");
    return;
  } else {
    if(confirm("Seguro que lo quieres borrar")) {
      const posicion=libros.findIndex(li => li.getIsbn() == libroPulsado.getIsbn())
      if(posicion!=-1) {
        libros.splice(posicion, 1)
      }
    } else {
      return;
    }
  }
  cargarLista()
  ocultar();
}    

function nuevoLibro(){
ocultar()
  document.getElementById("formLibro").style.display = "block";
  const boton=document.getElementById("btnGuardar");
  boton.innerHTML="Registrar";
  document.querySelector("input[name=isbn]").readOnly=false;

  document.getElementById("formLibro").reset();
  
  
}

function validarDatos(){
  const isbn= document.querySelector("input[name=isbn]").value;
  const titulo= document.querySelector("input[name=titulo]").value;
  const autor= document.querySelector("input[name=autor]").value;
  const anio= parseInt(document.querySelector("input[name=anio]").value);
  const boton=document.getElementById("btnGuardar").innerHTML;

  if(isbn=="" || titulo=="" || autor=="" || anio==""){
    alert("Todos los campos deben de estar llenos")
    return;
  }
  if(anio<1000 || anio>9999 || isNaN(anio)){
    alert("Debe tener exactamente 4 cifras");
    return;
  }
  if(boton=="Registrar"){
    for (const libro of libros) {
      if(libro.getIsbn()==isbn){
        alert("Ya existe un libro con el isbn: " + isbn);
        return
      }
    }
    const libro =new Libro(isbn, titulo, autor, anio);
    libros.push(libro);
    alert("Libro registrado");
    cargarLista();
  } else {
    libroPulsado.setTitulo(titulo);
    libroPulsado.setAutor(autor);
    libroPulsado.setAnio(anio);
    cargarLista();
    alert("Libro actualizado");
    pintarFicha(libroPulsado);
  }
}


function editarLibro(){
  ocultar();
  document.getElementById("formLibro").style.display = "block";
  const boton=document.getElementById("btnGuardar");
  boton.innerHTML="Actualizar";
  document.querySelector("input[name=isbn]").readOnly=true;
  document.querySelector("input[name=isbn]").value =  libroPulsado.getIsbn();
  document.querySelector("input[name=titulo]").value =  libroPulsado.getTitulo();
  document.querySelector("input[name=autor]").value =  libroPulsado.getAutor();
  document.querySelector("input[name=anio]").value =  libroPulsado.getAnio();

}
