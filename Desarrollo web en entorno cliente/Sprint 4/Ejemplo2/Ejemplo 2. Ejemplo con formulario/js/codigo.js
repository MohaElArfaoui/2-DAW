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
    let capa = document.createElement("div");
    capa.setAttribute("id", "Listado");
    capa.setAttribute("style", "margin:auto; text-align: center;");
    let idCliente = document.getElementById("id").value;

    const clickAnterior= document.getElementById("Listado")

    if(clickAnterior) {
      clickAnterior.remove();
    }
    
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
      });

    document.body.appendChild(capa);
}

function consultarTodos(){
  const clickAnterior= document.getElementById("listadoClientes")

  if(clickAnterior) {
    clickAnterior.remove();
  }

  let tabla = document.createElement("table");
  tabla.setAttribute("id", "listadoClientes");
  tabla.className="table table-striped";
  
  fetch("http://localhost:9999/buscarTodosLosClientes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      
    }
  })
  .then(respuesta => {
    if(respuesta.ok){
      return respuesta.json();
    }
    throw new Error(respuesta.status);
  })
  .then(datos => {
    if(datos){
      for (const cliente of datos) {
        const fila=document.createElement("tr")
        const celda=document.createElement("td")
        celda.innerHTML =cliente.nombre + " " + cliente.apellido;
        fila.appendChild(celda);
        tabla.appendChild(fila)
        
      }

    }

    })
    .catch((error)=> {
      console.log("Error" + error + " No hay clientes para mostrar")
    })
    document.body.appendChild(tabla)
  }


// Insertar un clientes.
function registrarCliente(){
  const miForm = new FormData(formRegistrarCliente);
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
        console.log(error)
      });

}

function limpiarFormulario(){
    document.getElementById("formRegistrarCliente").reset();
}

function editarCliente(){
  const miForm = new FormData(formRegistrarCliente);
  const jsonData = Object.fromEntries(miForm); // Convierte FormData en un objeto JavaScript
  const jsonString = JSON.stringify(jsonData); 
  
  const botonEditar=document.querySelector("button[name=btnEditarCliente]");
 
  if(botonEditar.innerHTML=="Editar"){
    botonEditar.innerHTML="Actualizar";
    return;
  }

  fetch("http://localhost:9999/actualizarCliente", {
    method: "PUT",
    body: jsonString,
      headers: {
        "Content-Type": "application/json"
      }
  })
  .then(respuesta => respuesta.text())
  .then(respuesta => {
    if(respuesta === "Ok") {
      mensajeExito("Se ha editado con exito");
      limpiarFormulario();
      botonEditar.innerHTML="Editar";
    } else {
      mensajeError("No se ha podido editar");
    }
  })
.catch((error) => {
  console.log(error);
  mensajeError("Error de conexión con el servidor");

})
}

function eliminarCliente(){
  let clienteId= document.getElementById("id").value;
  fetch("http://localhost:9999/eliminarCliente?id=" + clienteId, {
    method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      } 
  })
  .then(respuesta => respuesta.text()) //formato del devolucion del servidor
  .then(respuesta => {
    if(respuesta === "Ok") {
      mensajeExito("eliminado");
    } else {
      mensajeError("No se ha podido eliminar");
    }
  })
  .catch((error) => {
    console.log(error)
  })
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
