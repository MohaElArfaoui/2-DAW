document.getElementById("registrar").addEventListener("click", insertarProducto);
document.getElementById("buscar").addEventListener("keyup", buscarProducto);


cargarProductos();
let listaProductos=[];

function buscarProducto(){
  const busqueda=document.getElementById("buscar").value.toLowerCase();
  let productoCoincidencia=[];
  for (let i = 0; i < listaProductos.length; i++) {
    const producto = listaProductos[i];
    if(producto.producto.toLowerCase().includes(busqueda)){
    productoCoincidencia.push(producto);
  }
}
crearTablaProducto(productoCoincidencia);
}

function validarPrecio(numeros){
    return /^\d+(\.\d{1,2})?$/.test(numeros);
}
function validarCantidad(cant){
    return /^\d+$/.test(cant);
}

function validarDatos(){
    const formulario=document.getElementById("frm");

    const producto= {
        codigo: formulario.querySelector("input[name=codigo]").value.trim(),
        producto: formulario.querySelector("input[name=producto]").value.trim(),
        precio: formulario.querySelector("input[name=precio]").value.trim(),
        cantidad: formulario.querySelector("input[name=cantidad]").value.trim(),
    }

    if (producto.codigo=="" || producto.producto=="" || producto.precio=="" ||producto.cantidad==""){
        alert("Todos los campos son obligatorios");
        return false;
    }

    if(producto.codigo.length>20){
        alert("El codigo puede tener como maximo 20 caracteres")
        return false;
    }

    if (producto.precio<=0 || validarPrecio(producto.precio)==false){
        alert("El precio debe ser un número mayor que 0, con como mucho 2 decimales.")
        return false;
    }

    if(validarCantidad(producto.cantidad)==false || producto.cantidad<0){
        alert("La cantidad debe ser un número entero mayor o igual que 0.")
        return false;
    }
    return true;

}

// Insertar producto
function insertarProducto(){
    if(validarDatos()==false){
        return;
    }

    if(document.getElementById("idp").value!=""){
      actualizarProducto();
      return;
    }
    
  const miForm = new FormData(document.getElementById("frm"));
  const jsonData = Object.fromEntries(miForm); // Convierte FormData en un objeto JavaScript
  const jsonString = JSON.stringify(jsonData)

  fetch('http://localhost:9999/crearProducto', {
        method: 'POST',
        body: jsonString,
         headers: {
            'Content-Type': 'application/json'
        }
    })
      .then(respuesta => respuesta.text())
      .then(respuesta => {
           if (respuesta === "Ok") {
            cargarProductos()
            mensajeExito("registrado")
            document.getElementById("frm").reset();
        }else{
            mensajeError("registrar");
        }
      })
      .catch((error) => {
        console.log(error);
        mensajeError("conectar con el servidor para insertar");
      });

}

function eliminarProducto(event){

    const productoId=event.target.dataset.id;
    const producto=event.target.dataset.producto;

    if(confirm("Seguro que quieres borrar el producto: " + producto + "?")){
      fetch("http://localhost:9999/eliminarProducto?id=" + productoId, {   // sin espacio después del =
        method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
      })
      .then(respuesta => respuesta.text()) //formato del devolucion del servidor
      .then(respuesta => {
        if (respuesta === "Ok") {
          mensajeExito("eliminado");
          cargarProductos();
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


//ActualizarProducto
function actualizarProducto(){
    if(validarDatos()==false){
        return;
      }
  const botonRegistrar=document.getElementById("registrar");
  const miForm = new FormData(document.getElementById("frm"));
  const jsonData = Object.fromEntries(miForm); 
  jsonData.id=document.getElementById("idp").value;

  const jsonString = JSON.stringify(jsonData);

  fetch("http://localhost:9999/actualizarProducto", {
    method: "PUT",
    body: jsonString,
      headers: {
        "Content-Type": "application/json"
      }
  })
  .then(respuesta => respuesta.text())
  .then(respuesta => {
    if (respuesta === "Ok") {
      document.getElementById("frm").reset();
      document.getElementById("idp").value="";
      botonRegistrar.value="Registrar"
      cargarProductos();
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

function editarProducto(event){

    const productoId=event.target.dataset.id;
    if(productoId==""){
        return;
    }

    const botonRegistrar=document.getElementById("registrar");
    botonRegistrar.value="Actualizar"

    const codigo= event.target.dataset.codigo;  
    const producto= event.target.dataset.producto;  
    const precio= event.target.dataset.precio;  
    const cantidad= event.target.dataset.cantidad;  


    document.getElementById("idp").value=productoId;
    document.getElementById("codigo").value=codigo;
    document.getElementById("producto").value=producto;
    document.getElementById("precio").value=precio;
    document.getElementById("cantidad").value=cantidad;
}


// Crear Tabla
function crearTablaProducto(datos){

    const cuerpo=document.getElementById("resultado");
    cuerpo.innerHTML="";
      for (const producto of datos) {
        const fila=document.createElement("tr")
        const celdaId = document.createElement("td");
        const celdaProducto = document.createElement("td");
        const celdaPrecio = document.createElement("td");
        const celdaCantidad = document.createElement("td");
        const celdaAcciones = document.createElement("td");
       
        const botonEliminar=document.createElement("button");
        botonEliminar.addEventListener("click", eliminarProducto);
        botonEliminar.innerHTML="Eliminar";
        const botonEditar=document.createElement("button");
        botonEditar.addEventListener("click", editarProducto);
        botonEditar.innerHTML="Editar";
       
        celdaId.innerHTML = producto.id;
        botonEliminar.dataset.id=producto.id;
        botonEliminar.dataset.producto=producto.producto;
        botonEditar.dataset.id=producto.id;
        botonEditar.dataset.codigo=producto.codigo;
        botonEditar.dataset.producto=producto.producto;
        botonEditar.dataset.precio=producto.precio;
        botonEditar.dataset.cantidad=producto.cantidad;


        celdaProducto.innerHTML = producto.producto;
        celdaPrecio.innerHTML = producto.precio;
        celdaCantidad.innerHTML = producto.cantidad;
        celdaAcciones.appendChild(botonEliminar);
        celdaAcciones.appendChild(botonEditar);

        fila.appendChild(celdaId);
        fila.appendChild(celdaProducto);
        fila.appendChild(celdaPrecio);
        fila.appendChild(celdaCantidad);
        fila.appendChild(celdaAcciones);
        cuerpo.appendChild(fila);
    }
}

function cargarProductos(){


    fetch("http://localhost:9999/buscarTodosLosProductos", {
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
        crearTablaProducto(datos);
        listaProductos=datos;
}

  })
  .catch((error) => {
    console.log("Error" + error + " No hay productos para mostrar");
    mensajeError("consultar");
  });
}


// Alerta de éxito (reemplaza a alert())
function mensajeExito(accion){
    Swal.fire({
     title: "¡Éxito!",
     text: `El producto ha sido ${accion} correctamente.`,
     icon: "success",
     confirmButtonText: "Ok"
});
}

function mensajeError(accion){
    Swal.fire({
    title: '¡Oops! Algo salió mal',
    text: `Error al ${accion} el producto`,
    icon: 'error',
    confirmButtonText: "Ok"
});
}