document.getElementById("btnRegistrarCliente").addEventListener("click", registrarCliente);
document.getElementById("btnActualizarCliente").addEventListener("click", actualizarCliente);

document.getElementById("selEliminarCliente").addEventListener("change", eliminarCliente);
document.getElementById("selActualizarCliente").addEventListener("change", rellenarFormularioAct);
document.getElementById("selClienteDetalle").addEventListener("change", mostrarDetalle);

document.getElementById("registrarClientes").addEventListener("click", mostrarFormulario);
document.getElementById("actualizarClientes").addEventListener("click", mostrarActualizar);
document.getElementById("eliminarClientes").addEventListener("click", mostrarEliminar);

document.getElementById("consultaIndividual").addEventListener("click", mostrarConsultarInd);
document.getElementById("consultaTodas").addEventListener("click", mostrarConsultas);


ocultar();
function ocultar(){
    document.getElementById("formRegistrarCliente").style.display="none";
    document.getElementById("formActualizarCliente").style.display="none";
    document.getElementById("formEliminarCliente").style.display="none";
    document.getElementById("formDetalleCliente").style.display="none";

    const tablaAnterior = document.getElementById("todosLosDetalles");
    if (tablaAnterior) {          
        tablaAnterior.remove();
    }

    const detalleAnterior = document.getElementById("detallesIndividuales");
    if (detalleAnterior) {          
        detalleAnterior.remove();
    }
}

function mostrarFormulario(){
    ocultar();
    document.getElementById("formRegistrarCliente").style.display="flex";
}

function mostrarActualizar(){
    ocultar();
    document.getElementById("formActualizarCliente").style.display="flex";
    document.getElementById("formActualizarCliente").reset();
    cargarClientes();
}

function mostrarEliminar(){
    ocultar();
    document.getElementById("formEliminarCliente").style.display="flex";
    cargarClientesEliminar();
}

function mostrarConsultarInd(){
    ocultar();
    document.getElementById("formDetalleCliente").style.display="block";
    cargarClientesIndv();
}

function mostrarConsultas(){
    ocultar();
    cargarClientesDetalles();
}

// Mostrar detalle individual
function mostrarDetalle(){
    const anterior = document.getElementById("detallesIndividuales");
    if (anterior) {
        anterior.remove();
    }

    const clienteId = document.getElementById("selClienteDetalle").value;
    if (clienteId == "") {
        return;
    }

    fetch("http://localhost:9999/buscarClientePorId?id=" + clienteId, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })
    .then(respuesta => {
        if (respuesta.ok) {
            return respuesta.json();
        }
        throw new Error(respuesta.status);
    })
    .then(cliente => {                
        if (cliente) {
            const contenedorTabla = document.createElement("div");
            contenedorTabla.setAttribute("id", "detallesIndividuales");
            const tabla = document.createElement("table");
            tabla.className = "table table-striped";

            const fila = document.createElement("tr");

            const celdaNombre = document.createElement("td");
            celdaNombre.innerHTML = cliente.nombre;
            fila.appendChild(celdaNombre);

            const celdaApellidos = document.createElement("td");
            celdaApellidos.innerHTML = cliente.apellido;
            fila.appendChild(celdaApellidos);

            const celdaFechaNacimiento = document.createElement("td");
            celdaFechaNacimiento.innerHTML = cliente.fechaNacimiento.split("-").reverse().join("-");
            fila.appendChild(celdaFechaNacimiento);

            const celdaTelefono = document.createElement("td");
            celdaTelefono.innerHTML = cliente.telefono;
            fila.appendChild(celdaTelefono);

            const celdaDni = document.createElement("td");
            celdaDni.innerHTML = cliente.dni;
            fila.appendChild(celdaDni);

            tabla.appendChild(fila);
            contenedorTabla.appendChild(tabla);
            document.getElementById("formDetalleCliente").appendChild(contenedorTabla);
        }
    })
    .catch((error) => {
        console.log("Error" + error + " Cliente no encontrado");
        mensajeError("encontrar");
    });
}

//Relleno de formulario actualizar
function rellenarFormularioAct() {
    const formulario=document.getElementById("formActualizarCliente");
    const clienteSelec=document.getElementById("selActualizarCliente").value;
    if(clienteSelec==""){
        return;
    }
    
    fetch('http://localhost:9999/buscarClientePorId?id=' + clienteSelec, {
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
        if (datos) {
        const nombre=formulario.querySelector("input[name=nombre]");
        const apellido=formulario.querySelector("input[name=apellido]");
        const fechaNacimiento=formulario.querySelector("input[name=fechaNacimiento]");
        const telefono=formulario.querySelector("input[name=telefono]");
        const dni=formulario.querySelector("input[name=dni]");
        nombre.value=datos.nombre;
        apellido.value=datos.apellido;
        fechaNacimiento.value=datos.fechaNacimiento.split("-").reverse().join("-");
        telefono.value=datos.telefono;
        dni.value=datos.dni;
        
        }
      })

      .catch((error) => {
        console.log("Error" + error + " Cliente no encontrado");
        mensajeError("encontrar");
      });

    
}

//Carga de clientes para eliminar
function cargarClientesEliminar(){
    const select=document.getElementById("selEliminarCliente");
    select.innerHTML="";
    const primera = document.createElement("option");
    primera.innerHTML="Selecciona una opción"
    primera.value="";
    select.appendChild(primera);


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
        const option = document.createElement("option");
        option.value=cliente.id;
        option.innerHTML = cliente.apellido + ", " + cliente.nombre;
        select.appendChild(option);
        
    }
}

  })
  .catch((error) => {
    console.log("Error" + error + " No hay clientes para mostrar");
    mensajeError("consultar");
  });
}

//Carga de clientes de detalles
function cargarClientesDetalles(){
    const contenedorTabla= document.createElement("div");
    contenedorTabla.setAttribute("id", "todosLosDetalles");
    const tabla=document.createElement("table");
    tabla.classList="table table-striped";
    contenedorTabla.appendChild(tabla);
    

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
        const fila=document.createElement("tr");
        const celdaNombre=document.createElement("td");
        celdaNombre.innerHTML=cliente.nombre;
        fila.appendChild(celdaNombre);
        
        const celdaApellidos=document.createElement("td");
        celdaApellidos.innerHTML=cliente.apellido;
        fila.appendChild(celdaApellidos);

        const celdaFechaNacimiento=document.createElement("td");
        celdaFechaNacimiento.innerHTML=cliente.fechaNacimiento.split("-").reverse().join("-");
        fila.appendChild(celdaFechaNacimiento)
        
        const celdaTelefono=document.createElement("td");
        celdaTelefono.innerHTML=cliente.telefono;
        fila.appendChild(celdaTelefono);
        
        const celdaDni=document.createElement("td");
        celdaDni.innerHTML=cliente.dni;
        fila.appendChild(celdaDni);

        tabla.appendChild(fila);
        
    }
    contenedorTabla.appendChild(tabla)
    document.body.appendChild(contenedorTabla)
}

  })
  .catch((error) => {
    console.log("Error" + error + " No hay clientes para mostrar");
    mensajeError("consultar");
  });
}

//Carga de clientes individuales
function cargarClientesIndv(){
    const select = document.getElementById("selClienteDetalle");
    select.innerHTML = "";
    const primera = document.createElement("option");
    primera.innerHTML = "Selecciona una opción";
    primera.value = "";
    select.appendChild(primera);

    fetch("http://localhost:9999/buscarTodosLosClientes", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
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
                const option = document.createElement("option");
                option.value = cliente.id;
                option.innerHTML = cliente.apellido + ", " + cliente.nombre;
                select.appendChild(option);
            }
        }
    })
    .catch((error) => {
        console.log("Error" + error + " No hay clientes para mostrar");
        mensajeError("consultar");
    });
}

//Carga de clientes
function cargarClientes(){
    
    const select=document.getElementById("selActualizarCliente");
    select.innerHTML="";
    const primera = document.createElement("option");
    primera.innerHTML="Selecciona una opción";
    primera.value="";
    select.appendChild(primera);


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
        const option = document.createElement("option");
        option.value=cliente.id;
        option.innerHTML = cliente.apellido + ", " + cliente.nombre;
        select.appendChild(option);
        
    }
}

  })
  .catch((error) => {
    console.log("Error" + error + " No hay clientes para mostrar");
    mensajeError("consultar");
  });
}


function validarFecha(texto){
    return /^\d{2}-\d{2}-\d{4}$/.test(texto);
    // true si son 2 cifras-2 cifras-4 cifras"
}


function validarDatos(){

    const cliente= {
        nombre: document.querySelector("input[name= nombre]").value.trim(),
        apellido: document.querySelector("input[name= apellido]").value.trim(),
        fechaNacimiento: document.querySelector("input[name= fechaNacimiento]").value.trim(),
        telefono: document.querySelector("input[name= telefono]").value.trim(),
        dni: document.querySelector("input[name= dni]").value.trim(),
    }


    if(cliente.nombre=="" || cliente.apellido=="" ||  cliente.fechaNacimiento=="" || cliente.telefono=="" || cliente.dni=="") {
        alert("Todos los campos son obligatorios");
        return false;
    }

    if(validarFecha(cliente.fechaNacimiento)==false){
        alert("La fecha en formato “español” (DD-MM-YYYY)");
        return false;
    }
    if(isNaN(cliente.telefono) || cliente.telefono<600000000 || cliente.telefono>999999999){
        alert("Tiene que tener 9 digitos");
        return false;
    }

    if(cliente.dni.length>9) {
        alert("Longitud maxima 9");
        return false;
    }
    return true;
    
}
// Validar actualizar
function validarActualizar(){
    const formulario=document.getElementById("formActualizarCliente");

    const cliente= {
        nombre: formulario.querySelector("input[name= nombre]").value.trim(),
        apellido: formulario.querySelector("input[name= apellido]").value.trim(),
        fechaNacimiento: formulario.querySelector("input[name= fechaNacimiento]").value.trim(),
        telefono: formulario.querySelector("input[name= telefono]").value.trim(),
        dni: formulario.querySelector("input[name= dni]").value.trim(),
    }


    if(cliente.nombre=="" || cliente.apellido=="" ||  cliente.fechaNacimiento=="" || cliente.telefono=="" || cliente.dni=="") {
        alert("Todos los campos son obligatorios");
        return false;
    }

    if(validarFecha(cliente.fechaNacimiento)==false){
        alert("La fecha en formato “español” (DD-MM-YYYY)");
        return false;
    }
    if(isNaN(cliente.telefono) || cliente.telefono<600000000 || cliente.telefono>999999999){
        alert("Tiene que tener 9 digitos");
        return false;
    }

    if(cliente.dni.length>9) {
        alert("Longitud maxima 9");
        return false;
    }
    return true;
    
}

// Eliminar un cliente
function eliminarCliente(){

  const clienteId = document.getElementById("selEliminarCliente").value;
  if(clienteId==""){
    return;
  }
  const select=document.getElementById("selEliminarCliente");
  const nombre=select.options[select.selectedIndex].text;
  if(confirm("Seguro que quieres borrar a " + nombre + "?")){
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
          cargarClientesEliminar();
        } else {
          mensajeError("eliminar");
        }
      })
      .catch((error) => {
        console.log(error);
        mensajeError("conectar con el servidor para eliminar");
      });

  } else {
    alert("No se ha borrado");
  }
}

// Insertar un cliente.
function registrarCliente(){
ocultar();
mostrarFormulario();
    if(validarDatos()==false){
        return;
    }
    
  const miForm = new FormData(document.getElementById("formRegistrarCliente"));
  const jsonData = Object.fromEntries(miForm); // Convierte FormData en un objeto JavaScript
  jsonData.fechaNacimiento=jsonData.fechaNacimiento.split("-").reverse().join("-");
  const jsonString = JSON.stringify(jsonData)

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
            mensajeExito("registrado")
            document.getElementById("formRegistrarCliente").reset();
        }else{
            mensajeError("registrar");
        }
      })
      .catch((error) => {
        console.log(error);
        mensajeError("conectar con el servidor para insertar");
      });

}
//ActualizarCliente
function actualizarCliente(){
    if(validarActualizar()==false){
        return;
    }
    const select= document.getElementById("selActualizarCliente").value;

        if(select==""){
        alert("Elige un cliente");
        return;
    }



  const miForm = new FormData(document.querySelector("form[name=formActualizarCliente]"));
  const jsonData = Object.fromEntries(miForm); 
  jsonData.fechaNacimiento=jsonData.fechaNacimiento.split("-").reverse().join("-");
  jsonData.id=document.getElementById("selActualizarCliente").value;

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
      
    } else {
      mensajeError("editar");
    }
  })
  .catch((error) => {
    console.log(error);
    mensajeError("conectar con el servidor para editar");
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