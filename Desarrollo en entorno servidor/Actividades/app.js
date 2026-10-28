// ======================================================================
//  GESTIÓN DE CONTACTOS - Versión para principiantes
//  Este programa se comunica con una API REST (Spring Boot).
//
//  Llamadas que hace a la API:
//    GET    /api/contactos?nombre=..&fechaNacimiento=..  -> buscar
//
//  Campos de un contacto: id, nombre, apellidos, email,
//  fechaNacimiento (formato "2000-05-17", año-mes-día) y departamento.
//
//  Resto de llamadas:
//    POST   /api/contactos                          -> crear
//    PUT    /api/contactos/{id}                     -> modificar
//    DELETE /api/contactos/{id}                     -> eliminar
// ======================================================================

// Dirección de la API. Si cambia el puerto o la ruta, se cambia aquí.
var URL_API = "http://localhost:8080/api/contactos";


// ======================================================================
//  1. BUSCAR
// ======================================================================

// Construye la URL de búsqueda con los campos que el usuario haya rellenado.
function construirUrlBusqueda() {
  var nombre = document.getElementById("bNombre").value;
  var apellidos = document.getElementById("bApellidos").value;
  var email = document.getElementById("bEmail").value;
  var fechaNacimiento = document.getElementById("bFecha").value;
  var departamento = document.getElementById("bDepto").value;

  var url = URL_API;
  var parametros = "";   // aquí iremos añadiendo los filtros

  // Solo añadimos un filtro si el campo NO está vacío (son opcionales)
  if (nombre != "") {
    parametros = parametros + "&nombre=" + encodeURIComponent(nombre);
  }
  if (apellidos != "") {
    parametros = parametros + "&apellidos=" + encodeURIComponent(apellidos);
  }
  if (email != "") {
    parametros = parametros + "&email=" + encodeURIComponent(email);
  }
  if (fechaNacimiento != "") {
    parametros = parametros + "&fechaNacimiento=" + encodeURIComponent(fechaNacimiento);
  }
  if (departamento != "") {
    parametros = parametros + "&departamento=" + encodeURIComponent(departamento);
  }

  // Si hay filtros, los pegamos a la URL después del "?"
  if (parametros != "") {
    // parametros empieza por "&", le quitamos ese primer carácter
    url = url + "?" + parametros.substring(1);
  }

  return url;
}

// Llama a la API y pinta los resultados en la tabla.
// "async" y "await" sirven para ESPERAR la respuesta del servidor.
async function buscar() {
  var url = construirUrlBusqueda();

  try {
    var respuesta = await fetch(url);

    if (respuesta.ok == false) {
      alert("Error al buscar. Código: " + respuesta.status);
      return;
    }

    var lista = await respuesta.json();   // convierte la respuesta en un array
    pintarTabla(lista);
  } catch (error) {
    alert("No se pudo conectar con la API: " + error.message);
  }
}

// Vacía los campos de búsqueda y vuelve a buscar (sin filtros).
function limpiar() {
  document.getElementById("bNombre").value = "";
  document.getElementById("bApellidos").value = "";
  document.getElementById("bEmail").value = "";
  document.getElementById("bFecha").value = "";
  document.getElementById("bDepto").value = "";
  buscar();
}


// ======================================================================
//  2. PINTAR LA TABLA
// ======================================================================

// Recibe un array de contactos y crea una fila por cada uno.
function pintarTabla(lista) {
  var tbody = document.getElementById("tbody");
  tbody.innerHTML = "";   // borramos las filas anteriores

  document.getElementById("contador").textContent = lista.length + " resultado(s)";

  // Si no hay resultados mostramos un mensaje
  if (lista.length == 0) {
    tbody.innerHTML = "<tr><td colspan='6' class='vacio'>No se han encontrado resultados.</td></tr>";
    return;
  }

  // BUCLE: recorremos el array de contactos uno a uno
  for (var i = 0; i < lista.length; i++) {
    var contacto = lista[i];

    var fila = document.createElement("tr");

    // Creamos las celdas con los datos
    fila.appendChild(crearCelda(contacto.nombre));
    fila.appendChild(crearCelda(contacto.apellidos));
    fila.appendChild(crearCelda(contacto.email));
    fila.appendChild(crearCelda(formatearFecha(contacto.fechaNacimiento)));
    fila.appendChild(crearCelda(contacto.departamento));

    // Celda con los botones
    var celdaBotones = document.createElement("td");
    celdaBotones.className = "col-acc";

    var botonModificar = document.createElement("button");
    botonModificar.textContent = "Modificar";
    botonModificar.className = "btn-mod";
    // Al pulsar, guardamos el contacto en el formulario para editarlo
    botonModificar.onclick = crearAccionModificar(contacto);

    var botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "btn-del";
    botonEliminar.onclick = crearAccionEliminar(contacto);

    celdaBotones.appendChild(botonModificar);
    celdaBotones.appendChild(botonEliminar);
    fila.appendChild(celdaBotones);

    tbody.appendChild(fila);
  }
}

// La API envía la fecha como "2000-05-17" (año-mes-día).
// Esta función la convierte a "17/05/2000" (día/mes/año).
function formatearFecha(fecha) {
  // Si no hay fecha, devolvemos un texto vacío
  if (fecha == null || fecha == "") {
    return "";
  }

  // split("-") parte el texto por los guiones: "2000-05-17" -> ["2000", "05", "17"]
  var partes = fecha.split("-");
  var anio = partes[0];
  var mes = partes[1];
  var dia = partes[2];

  return dia + "/" + mes + "/" + anio;
}

// Crea una celda <td> con un texto dentro.
function crearCelda(texto) {
  var celda = document.createElement("td");
  celda.textContent = texto;
  return celda;
}

// Estas dos funciones devuelven la función que se ejecutará al pulsar
// el botón. Así cada botón "recuerda" el contacto de su fila.
function crearAccionModificar(contacto) {
  return function () {
    abrirFormulario(contacto);
  };
}

function crearAccionEliminar(contacto) {
  return function () {
    eliminar(contacto);
  };
}


// ======================================================================
//  3. CREAR Y MODIFICAR
// ======================================================================

// Abre la ventana del formulario.
// Si recibe un contacto -> modo MODIFICAR. Si recibe null -> modo CREAR.
function abrirFormulario(contacto) {
  if (contacto == null) {
    // CREAR: dejamos todo vacío
    document.getElementById("dlgTitulo").textContent = "Crear contacto";
    document.getElementById("cId").value = "";
    document.getElementById("cNombre").value = "";
    document.getElementById("cApellidos").value = "";
    document.getElementById("cEmail").value = "";
    document.getElementById("cFecha").value = "";
    document.getElementById("cDepto").selectedIndex = 0;
  } else {
    // MODIFICAR: rellenamos con los datos actuales
    document.getElementById("dlgTitulo").textContent = "Modificar contacto";
    document.getElementById("cId").value = contacto.id;
    document.getElementById("cNombre").value = contacto.nombre;
    document.getElementById("cApellidos").value = contacto.apellidos;
    document.getElementById("cEmail").value = contacto.email;
    document.getElementById("cFecha").value = contacto.fechaNacimiento;
    document.getElementById("cDepto").value = contacto.departamento;
  }

  document.getElementById("dlg").showModal();
}

function cerrarFormulario() {
  document.getElementById("dlg").close();
}

// Se ejecuta al pulsar "Guardar" en el formulario.
async function guardar(evento) {
  evento.preventDefault();   // evita que la página se recargue

  // Leemos los datos escritos y los metemos en un objeto
  var contacto = {
    nombre: document.getElementById("cNombre").value,
    apellidos: document.getElementById("cApellidos").value,
    email: document.getElementById("cEmail").value,
    fechaNacimiento: document.getElementById("cFecha").value,
    departamento: document.getElementById("cDepto").value
  };

  var id = document.getElementById("cId").value;

  // Preparamos la llamada: si hay id es PUT (modificar), si no, POST (crear)
  var url;
  var metodo;

  if (id != "") {
    url = URL_API + "/" + id;
    metodo = "PUT";
    contacto.id = Number(id);
  } else {
    url = URL_API;
    metodo = "POST";
  }

  try {
    var respuesta = await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contacto)   // convierte el objeto en texto JSON
    });

    if (respuesta.ok == false) {
      alert("Error al guardar. Código: " + respuesta.status);
      return;
    }

    cerrarFormulario();
    buscar();   // recargamos la tabla
  } catch (error) {
    alert("No se pudo conectar con la API: " + error.message);
  }
}


// ======================================================================
//  4. ELIMINAR
// ======================================================================

async function eliminar(contacto) {
  // confirm() devuelve true si el usuario pulsa "Aceptar"
  var seguro = confirm("¿Seguro que quieres eliminar a " + contacto.nombre + " " + contacto.apellidos + "?");

  if (seguro == false) {
    return;   // el usuario canceló, no hacemos nada
  }

  try {
    var respuesta = await fetch(URL_API + "/" + contacto.id, {
      method: "DELETE"
    });

    if (respuesta.ok == false) {
      alert("Error al eliminar. Código: " + respuesta.status);
      return;
    }

    buscar();   // recargamos la tabla
  } catch (error) {
    alert("No se pudo conectar con la API: " + error.message);
  }
}


// ======================================================================
//  5. CONECTAR LOS BOTONES CON SUS FUNCIONES
// ======================================================================

// Botón "Buscar" (formulario de búsqueda)
document.getElementById("formBusqueda").onsubmit = function (evento) {
  evento.preventDefault();
  buscar();
};

// Botón "Limpiar"
document.getElementById("btnLimpiar").onclick = limpiar;

// Botón "Crear"
document.getElementById("btnCrear").onclick = function () {
  abrirFormulario(null);
};

// Botón "Guardar" del formulario
document.getElementById("formContacto").onsubmit = guardar;

// Botón "Cancelar" del formulario
document.getElementById("btnCancelar").onclick = cerrarFormulario;
