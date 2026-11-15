document.getElementById("regArticulos").addEventListener("click", crearFormulario);
document.getElementById("ventaArticulos").addEventListener("click", formularioVentas);

let lineasVenta=[];
function validarNumeroEntero(unidades){
return /^\d+$/.test(unidades);
}

function chucheElegida(event){
  if (document.getElementById("divPrecio")){
    document.getElementById("divPrecio").remove();
  }

  if(event.target.value==""){
    return;
  }

  const precio =event.target.options[event.target.selectedIndex].dataset.precio;
  const divPrecio=document.createElement("div");
  divPrecio.setAttribute("id", "divPrecio");
  const parrafoPrecio=document.createElement("p");
  parrafoPrecio.innerHTML="Precio " + precio;
  divPrecio.appendChild(parrafoPrecio);
  document.getElementById("divChucherias").appendChild(divPrecio);
  const unidades=document.createElement("input");
  unidades.setAttribute("id", "idUnidades")
  unidades.setAttribute("placeholder", "Unidades");
  divPrecio.appendChild(unidades);




}

function categoriaElegida(){
    const eleccion=document.querySelector("select[name=categoriaArticulo]");
    const content=document.getElementById("contenido");
    const divChuche=document.getElementById("divChucherias");
    
    if(divChuche){
        divChuche.remove();
    }


    fetch("http://localhost:9999/buscarTodosLosArticulos", {
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
        const contenidoFrmCategoria=document.createElement("div");
        contenidoFrmCategoria.setAttribute("id", "divChucherias")
        contenidoFrmCategoria.setAttribute("style", "padding-top: 15px");
        const select=document.createElement("select");
        select.setAttribute("name", "chucheriasAsociadas");
        select.className="form-select";
        const opcionText=document.createElement("option");
        opcionText.value="";
        opcionText.innerHTML="Selecciona una chucheria";
        select.appendChild(opcionText);
        for (const chuche of datos) {
           if(chuche.categoriaArticulo==eleccion.value) {
               const opcionChucheria=document.createElement("option");
               opcionChucheria.innerHTML=chuche.nombreArticulo;
               opcionChucheria.dataset.precio=chuche.precioArticulo;
               select.appendChild(opcionChucheria);
            }
        }
        select.addEventListener("change", chucheElegida);
        contenidoFrmCategoria.appendChild(select);
        content.appendChild(contenidoFrmCategoria);
}

  })
  .catch((error) => {
    console.log("Error" + error + " No hay productos para mostrar");
    mensajeError("consultar");
  });
}


function crearFormulario(){
    const opcionesArray=["Gominolas", "Paquete", "Caramelos", "Varios"];
    const content=document.getElementById("contenido");
    

    const formulario = document.createElement("form");
    formulario.setAttribute("id", "frm");
    formulario.setAttribute("style", "max-width: 400px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;");    const contenido=document.createElement("div");
    contenido.setAttribute("style", "margin: 20px auto; padding: 20px;");
    const titulo=document.createElement("h2");
    titulo.innerHTML="Registrar artículo";
    contenido.appendChild(titulo);
    formulario.appendChild(contenido);
    
    const contenidoFrmNombre=document.createElement("div");
    contenidoFrmNombre.setAttribute("style", "padding-top: 15px");
    const nombre=document.createElement("input")
    nombre.setAttribute("name", "nombreArticulo");
    nombre.setAttribute("placeholder", "Nombre");
    nombre.className="form-control";
    contenidoFrmNombre.appendChild(nombre);
    formulario.appendChild(contenidoFrmNombre);
    
    
    const contenidoFrmCategoria=document.createElement("div");
    contenidoFrmCategoria.setAttribute("style", "padding-top: 15px");
    const select=document.createElement("select");
    select.setAttribute("name", "categoriaArticulo");
    select.className="form-select";
    for (const categoria of opcionesArray) {
        const opciones=document.createElement("option");
        opciones.innerHTML=categoria;
        select.appendChild(opciones);
    }
    contenidoFrmCategoria.appendChild(select);
    formulario.appendChild(contenidoFrmCategoria);
    
    const contenidoFrmExistArt=document.createElement("div");
    contenidoFrmExistArt.setAttribute("style", "padding-top: 15px");
    const existencias=document.createElement("input")
    existencias.setAttribute("name", "existenciasArticulo");
    existencias.setAttribute("placeholder", "Existencias");
    existencias.className="form-control";
    contenidoFrmExistArt.appendChild(existencias);
    formulario.appendChild(contenidoFrmExistArt);
   
    const contenidoFrmPrecio=document.createElement("div");
    contenidoFrmPrecio.setAttribute("style", "padding-top: 15px");
    const precio=document.createElement("input")
    precio.setAttribute("name", "precioArticulo");
    precio.setAttribute("placeholder", "Precio (ej: 1.50)");
    precio.className="form-control";
    contenidoFrmPrecio.appendChild(precio);
    formulario.appendChild(contenidoFrmPrecio);
   
    const botonRegistrar=document.createElement("button");
    botonRegistrar.setAttribute("type", "button"); // si va dentro de un formulario es type=button
    botonRegistrar.innerHTML="Registrar";
    botonRegistrar.className="btn btn-primary w-100 mt-3";
    botonRegistrar.addEventListener("click", registrarOActualizarArticulo);
    formulario.appendChild(botonRegistrar);
    content.innerHTML="";
    content.appendChild(formulario)
}

function formularioVentas(){

    const opcionesArray=["Gominolas", "Paquete", "Caramelos", "Varios"];
    const content=document.getElementById("contenido");
    

    const formulario = document.createElement("form");
    formulario.setAttribute("id", "frm");
    formulario.setAttribute("style", "max-width: 400px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;");    const contenido=document.createElement("div");
    contenido.setAttribute("style", "margin: 20px auto; padding: 20px;");
    const titulo=document.createElement("h2");
    titulo.innerHTML="Venta articulo";
    contenido.appendChild(titulo);
    formulario.appendChild(contenido);

    const contenidoFrmCategoria=document.createElement("div");
    contenidoFrmCategoria.setAttribute("style", "padding-top: 15px");
    const select=document.createElement("select");
    select.setAttribute("name", "categoriaArticulo");
    select.className="form-select";
    for (const categoria of opcionesArray) {
        const opciones=document.createElement("option");
        opciones.innerHTML=categoria;
        select.appendChild(opciones);
    }
    contenidoFrmCategoria.appendChild(select);
    formulario.appendChild(contenidoFrmCategoria);
    
    const botonSeguirVendiendo=document.createElement("button");
    botonSeguirVendiendo.setAttribute("type", "button"); // si va dentro de un formulario es type=button
    botonSeguirVendiendo.innerHTML="Seguir Vendiendo";
    botonSeguirVendiendo.className="btn btn-primary w-100 mt-3";
    botonSeguirVendiendo.addEventListener("click", seguirVendiendo);
    formulario.appendChild(botonSeguirVendiendo);
    
    const botonFinalizarCompra=document.createElement("button");
    botonFinalizarCompra.setAttribute("type", "button"); // si va dentro de un formulario es type=button
    botonFinalizarCompra.innerHTML="Finalizar Compra";
    botonFinalizarCompra.className="btn btn-danger w-100 mt-3";
    botonFinalizarCompra.addEventListener("click", finalizarCompra);
    formulario.appendChild(botonFinalizarCompra);
    content.innerHTML="";
    content.appendChild(formulario);

    const resumenVenta=document.createElement("div");
    resumenVenta.setAttribute("id", "resumenVenta");
    content.appendChild(resumenVenta);
    
    select.addEventListener("change", categoriaElegida);
    
}

function pintarResumen(){
  const resumenVenta=document.getElementById("resumenVenta");
  resumenVenta.innerHTML="";
  let total=0;

  for (const chuche of lineasVenta) {
    const parrafo=document.createElement("p");
    parrafo.innerHTML= chuche.nombreArticulo + " uds - " + chuche.unidadesVendidas +" - "+ chuche.precioVenta + "€"
    resumenVenta.appendChild(parrafo);
    total +=chuche.precioVenta;
  }
  const totalVenta=document.createElement("p");
  totalVenta.innerHTML="Total: " + total;
  resumenVenta.appendChild(totalVenta);

}

function seguirVendiendo(){
  const select=document.querySelector("select[name=chucheriasAsociadas]")
  if(!select || select.value==""){
    alert("Elige una chucheria")
    return;
  }
  const nombre=select.value;
  const precio=select.options[select.selectedIndex].dataset.precio;
  const unidades= document.getElementById("idUnidades").value;
  const precioVenta=Number(precio) * Number(unidades);

  if(validarNumeroEntero(unidades)==false || unidades<=0){
    alert("Debe ser un numero entero y mayor a 0")
    return;
  }
  lineasVenta.push({nombreArticulo: nombre, unidadesVendidas: unidades, precioVenta: precioVenta});

  pintarResumen();
  const formChuche=document.getElementById("divChucherias");
  formChuche.remove();
  const form= document.getElementById("frm");
  form.reset();


}

function finalizarCompra(){
 

  if(lineasVenta.length==0){

    alert("No hay nada que vender");
    return;
  }
  
  fetch("http://localhost:9999/buscarTodasLasVentas", {
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
      let maximo=0;
      for (const venta of datos) {
        if(venta.idVentas> maximo) {
          maximo=venta.idVentas;
        }
          
      }
      const idVenta=maximo+1 
      for (const linea of lineasVenta) {
        linea.idVentas=idVenta;  
        fetch('http://localhost:9999/crearVenta', {
        method: 'POST',
        body: JSON.stringify(linea),
         headers: {
            'Content-Type': 'application/json'
        }
    })
      .then(respuesta => respuesta.text())
      .then(respuesta => {
           if (respuesta !== "Ok") {
            mensajeError("registrar la venta de");
        }
      })
      .catch((error) => {
        console.log(error);
        mensajeError("conectar con el servidor para insertar");
      }); 
      }
    }

  })
  .catch((error) => {
    console.log("Error" + error + " No hay ventas para mostrar");
    mensajeError("consultar");
  });

}
function registrarOActualizarArticulo(){

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