document
  .getElementById("btnRegistrarCuenta")
  .addEventListener("click", registrarCuenta);
document
  .getElementById("listadoViviendas")
  .addEventListener("click", mostrarListado);

document.getElementById("transferir").addEventListener("click", tranferirDatos);

let viviendas = [];

function validarcodPostal(valor) {
  return /^\d{5}$/.test(valor);
}

function validarCampos() {
  const vivienda = {
    tipo: document.querySelector("select").value,
    direccion: document.getElementsByTagName("input")[2].value,
    cp: document.getElementsByTagName("input")[3].value,
    precio: document.getElementsByTagName("input")[4].value,
  };

  if (
    vivienda.tipo == "" ||
    vivienda.direccion == "" ||
    vivienda.cp == "" ||
    vivienda.precio == ""
  ) {
    alert("Los campos no pueden estar vacios");
    return false;
  }

  if (!validarcodPostal(vivienda.cp)) {
    alert("Debe tener 5 digitos exactos");
    return false;
  }
  return true;
}

function registrarCuenta() {
  if (validarCampos() == false) {
    return;
  }
  // 1. Leer los campos
  const tipo = document.querySelector("select").value;
  const direccion = document.getElementsByTagName("input")[2].value;
  const cp = document.getElementsByTagName("input")[3].value;
  const precio = document.getElementsByTagName("input")[4].value;
  const formulario=document.querySelector("form");

  const vivienda = { tipo: tipo, direccion: direccion, cp: cp, precio: precio };

  if (document.getElementById("opcion1").checked) {
    viviendas.push(new Viviendas(tipo, direccion, cp, precio));
    alert("Vivienda guardada en memoria (Off-Line)");
    formulario.reset();
  } else {
    const jsonString = JSON.stringify(vivienda);
    
    fetch("http://localhost:9999/crearVivienda", {
      method: "POST",
      body: jsonString,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((respuesta) => respuesta.text())
    .then((respuesta) => {
      if (respuesta === "Ok") {
        alert("Se ha registrado correctamente");
        formulario.reset();
      } else {
        alert("registrar");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("conectar con el servidor para insertar");
      });
  }
}

function mostrarListado() {
  const contenedor = document.getElementById("listado");
  contenedor.innerHTML = "";
  const tabla = document.createElement("table");
  tabla.className = "table table-striped";
  const cabecera = document.createElement("thead");
  const fila = document.createElement("tr");
  const tituloCabeceraId = document.createElement("th");
  tituloCabeceraId.innerHTML = "ID";
  const tituloCabeceraDesc = document.createElement("th");
  tituloCabeceraDesc.innerHTML = "Descripcion";
  const tituloCabeceraPrecio = document.createElement("th");
  tituloCabeceraPrecio.innerHTML = "Precio";
  const tituloCabeceraAcciones = document.createElement("th");
  tituloCabeceraAcciones.innerHTML = "Acciones";
  const cuerpo = document.createElement("tbody");

  fila.appendChild(tituloCabeceraId);
  fila.appendChild(tituloCabeceraDesc);
  fila.appendChild(tituloCabeceraPrecio);
  fila.appendChild(tituloCabeceraAcciones);

  cabecera.appendChild(fila);
  tabla.appendChild(cabecera);

  cabecera.className = "table-dark";

  fetch("http://localhost:9999/buscarViviendas", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      }
      throw new Error(respuesta.status);
    })
    .then((datos) => {
      for (const vivienda of datos) {
        const fila = document.createElement("tr");
        const columnaId = document.createElement("td");
        columnaId.innerHTML = vivienda.id;
        const columnaDesc = document.createElement("td");
        columnaDesc.innerHTML =
          vivienda.tipo + ", " + vivienda.direccion + ", " + vivienda.cp;
        const columnaPrecio = document.createElement("td");
        columnaPrecio.innerHTML = vivienda.precio.toFixed(2);
        const columnaAcciones = document.createElement("td");
        fila.appendChild(columnaId);
        fila.appendChild(columnaDesc);
        fila.appendChild(columnaPrecio);
        fila.appendChild(columnaAcciones);
        const boton = document.createElement("button");
        boton.type = "button";
        boton.innerHTML = "Eliminar";
        boton.className = "btn btn-danger";
        boton.dataset.id = vivienda.id;
        columnaAcciones.appendChild(boton);
        boton.addEventListener("click", eliminarVivienda);
        cuerpo.appendChild(fila);
      }
      tabla.appendChild(cuerpo);
      contenedor.appendChild(tabla);
    })
    .catch((error) => {
      console.log(error);
      alert("Error al cargar el listado");
    });
}

function eliminarVivienda(event) {
  const viviendaId = event.target.dataset.id;
  if (viviendaId == "") {
    return;
  }

  fetch("http://localhost:9999/eliminarVivienda?id=" + viviendaId, {
    // sin espacio después del =
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => respuesta.text()) //formato del devolucion del servidor
    .then((respuesta) => {
      if (respuesta === "Ok") {
        alert("eliminado");
        mostrarListado();
      } else {
        alert("eliminar");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("conectar con el servidor para eliminar");
    });
}


function tranferirDatos(){
  if(viviendas.length==0){
    alert("No hay viviendas para transferir");
    return;
  }
 for (const vivienda of viviendas) {
  const datos= {
    tipo:vivienda.getTipo(),
    direccion:vivienda.getDireccion(),
    cp:vivienda.getCodigoPostal(),
    precio:vivienda.getPrecio(),

  };
  const jsonString=JSON.stringify(datos);

  fetch("http://localhost:9999/crearVivienda", {
      method: "POST",
      body: jsonString,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => respuesta.text())
      .then((respuesta) => {
        if (respuesta === "Ok") {
          alert("Se ha transferido correctamente");
        } else {
          alert("Error al registrar");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("conectar con el servidor para insertar");
      });
  }
  viviendas=[];
 }



