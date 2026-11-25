const btnConsultarPorId = document.getElementById("btnConsultarPorId");
const btnRegistrarCliente = document.getElementById("btnRegistrarCliente");
const btnEliminarCliente = document.getElementById("btnEliminarCliente");
const btnEditarCliente = document.getElementById("btnEditarCliente");
const btnConsultarTodos = document.getElementById("btnConsultarTodos");


btnConsultarPorId.addEventListener("click", mostrarDatosPorId);
btnRegistrarCliente.addEventListener("click", registrarCliente);
btnEliminarCliente.addEventListener("click", eliminarCliente);
btnEditarCliente.addEventListener("click", editarCliente);
btnConsultarTodos.addEventListener("click", consultarTodos);

/* EJEMPLO DE CONSULTA EN BD USANDO METODO GET */
function mostrarDatosPorId(){
    // Borrar el resultado de una consulta anterior
    const clickAnterior = document.getElementById("Listado");
    if (clickAnterior) {
      clickAnterior.remove();
    }

    let capa = document.createElement("div");
    capa.setAttribute("id", "Listado");
    capa.setAttribute("style", "margin:auto; text-align: center;");
    let idCliente = document.getElementById("id").value;

    fetch('http://localhost:9999/buscarClientePorId?id=' + idCliente, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
      .then(respuesta => {
        if (respuesta.ok)
          return respuesta.json();
        throw new Error(respuesta.status);

      })
      .then(datos => {
        if (datos)
          capa.innerHTML += datos.nombre + " " + datos.apellido;
      })

      .catch((error) => {
        console.log("Error" + error + " Cliente no encontrado");
        mensajeError("encontrar");
      });

    document.body.appendChild(capa);
}

/* CONSULTAR TODOS LOS CLIENTES (GET) */
function consultarTodos(){
  // Borrar la tabla de una consulta anterior
  const clickAnterior = document.getElementById("listadoClientes");
  if (clickAnterior) {
    clickAnterior.remove();
  }

  const tabla = document.createElement("table");
  tabla.setAttribute("id", "listadoClientes");
  tabla.classList.add("table", "table-striped");

  fetch("http://localhost:9999/buscarTodosLosClientes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(respuesta => {
    if (respuesta.ok) {
      return respuesta.json();
    }
    throw new Error(respuesta.status);
  })
  .then(datos => {
    if (datos) {
      for (const cliente of datos) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");
        celda.innerHTML = cliente.nombre + " " + cliente.apellido;
        fila.appendChild(celda);
        tabla.appendChild(fila);
      }
    }
  })
  .catch((error) => {
    console.log("Error" + error + " No hay clientes para mostrar");
    mensajeError("consultar");
  });

  document.getElementById("contenedorTabla").appendChild(tabla);
}


// Insertar un clientes.
function registrarCliente(){
  const miForm = new FormData(document.getElementById("formRegistrarCliente"));
  const jsonData = Object.fromEntries(miForm); // Convierte FormData en un objeto JavaScript
  const jsonString = JSON.stringify(jsonData);

  fetch('http://localhost:9999/crearCliente', {
        method: 'POST',
        body: jsonString,
         headers: {
            'Content-Type': 'application/json'
        }
    })
      .then(respuesta => respuesta.text())
      .then(respuesta => {
           if (respuesta === "Ok") {
            mensajeExito("insertado");
            limpiarFormulario();
        }else{
            mensajeError("insertar");
        }
      })
      .catch((error) => {
        console.log(error);
        mensajeError("conectar con el servidor para insertar");
      });

}

function limpiarFormulario(){
    document.getElementById("formRegistrarCliente").reset();
}

/* EDITAR EN DOS CLICS:
   1er clic (el botón dice "Editar")     → solo cambia a "Actualizar"
   2º clic  (el botón dice "Actualizar") → envía al servidor */
function editarCliente(){
  const botonEditar = document.querySelector("button[name=btnEditarCliente]");

  if (botonEditar.innerHTML == "Editar") {     // == compara
    botonEditar.innerHTML = "Actualizar";      // =  asigna
    return;                                    // todavía no envía nada
  }

  const miForm = new FormData(document.getElementById("formRegistrarCliente"));
  const jsonData = Object.fromEntries(miForm); // el id va dentro del JSON (input name="id")
  const jsonString = JSON.stringify(jsonData);

  // La ruta del servidor es /actualizarCliente (sin id y sin barra final)
  fetch("http://localhost:9999/actualizarCliente", {
    method: "PUT",
    body: jsonString,
      headers: {
        "Content-Type": "application/json"
      }
  })
  .then(respuesta => respuesta.text())
  .then(respuesta => {
    if (respuesta === "Ok") {
      mensajeExito("editado");
      limpiarFormulario();
      botonEditar.innerHTML = "Editar";        // vuelve al modo inicial
    } else {
      mensajeError("editar");
    }
  })
  .catch((error) => {
    console.log(error);
    mensajeError("conectar con el servidor para editar");
  });
}

function eliminarCliente(){
  const clienteId = document.getElementById("id").value;
  fetch("http://localhost:9999/eliminarCliente?id=" + clienteId, {   // sin espacio después del =
    method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
  })
  .then(respuesta => respuesta.text()) //formato del devolucion del servidor
  .then(respuesta => {
    if (respuesta === "Ok") {
      mensajeExito("eliminado");
    } else {
      mensajeError("eliminar");
    }
  })
  .catch((error) => {
    console.log(error);
    mensajeError("conectar con el servidor para eliminar");
  });
}

// Alerta de éxito (reemplaza a alert())
function mensajeExito(accion){
    Swal.fire({
     title: "¡Éxito!",
     text: `El cliente ha sido ${accion} correctamente.`,
     icon: "success",
     confirmButtonText: "Ok"
});
}

function mensajeError(accion){
    Swal.fire({
    title: '¡Oops! Algo salió mal',
    text: `Error al ${accion} el cliente`,
    icon: 'error',
    confirmButtonText: "Ok"
});
}