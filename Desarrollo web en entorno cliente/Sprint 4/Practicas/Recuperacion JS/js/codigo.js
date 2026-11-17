document.getElementById("btnRegistrarCuenta").addEventListener("click", registrarCuenta);

let viviendas=[]; 

function validarcodPostal(valor){
    return /^\d{5}$/.test(valor)
}

function validarCampos() {
    
    const vivienda={
        tipo: document.getElementsByTagName("input")[1].value,
        direccion: document.getElementsByTagName("input")[2].value,
        cp: document.getElementsByTagName("input")[3].value,
        precio: document.getElementsByTagName("input")[4].value,
    }
    
    if(vivienda.tipo=="" || vivienda.direccion=="" || vivienda.cp=="" || vivienda.precio=="") {
        alert("Los campos no pueden estar vacios");
        return false;
    }

    if(!validarcodPostal(vivienda.cp)) {
        alert("Debe tener 5 digitos exactos");
        return false;
    }
    viviendas.push(vivienda.tipo, vivienda.direccion, vivienda.cp, vivienda.precio);
    return true;
}

function registrarCuenta(){

    if(validarCampos()==false){
        return;
    }  
     // 1. Leer los campos
    const tipo = document.querySelector("select").value;
    const direccion = document.getElementsByTagName("input")[2].value;
    const cp = document.getElementsByTagName("input")[3].value;
    const precio = document.getElementsByTagName("input")[4].value;

    const vivienda= {tipo: tipo, direccion: direccion, cp:cp, precio:precio}

    const jsonString = JSON.stringify(vivienda)


  fetch('http://localhost:9999/crearVivienda', {
        method: 'POST',
        body: jsonString,
         headers: {
            'Content-Type': 'application/json'
        }
    })
      .then(respuesta => respuesta.text())
      .then(respuesta => {
           if (respuesta === "Ok") {
            alert("Se ha registrado correctamente")
        }else{
            alert("registrar");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("conectar con el servidor para insertar");
      });

}

function listdo(){

}



/*function eliminarVivienda(){

  const viviendaId = document.querySelector("input[]");
  if(viviendaId==""){
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
}*/
