let Usuario1 = {"nombre": "Maria del Mar", "apellidos": "García España", "usuario": "maria_garcia", "contrasena": "password123", "correo": "maria.garcia@example.com"};
let Usuario2 = {"nombre": "Juan", "apellidos": "Pérez López", "usuario": "juan_perez", "contrasena": "password456", "correo": "juan.perez@example.com"};
let Usuario3 = {"nombre": "Ana", "apellidos": "Martínez Ruiz", "usuario": "ana_martinez", "contrasena": "password789", "correo": "ana.martinez@example.com"};
let Usuario4 = {"nombre": "Carlos", "apellidos": "Gómez Fernández", "usuario": "carlos_gomez", "contrasena": "password012", "correo": "carlos.gomez @example.com"};
let Usuario5 = {"nombre": "Elena", "apellidos": "Moreno España", "usuario": "elena_moreno", "contrasena": "password123", "correo": "elena.moreno@example.com"};
let Usuario6  = {"nombre": "Emilio", "apellidos": "Begines Utrera", "usuario": "emilio_begines", "contrasena": "password123", "correo": "emilio.begines@example.com"};
let usuario7  = {"nombre": "Antonio", "apellidos": "García España", "usuario": "antonio_garcia", "contrasena": "password123", "correo": "antonio.garcia@example.com"};
let usuario8  = {"nombre": "María", "apellidos": "López Fernández", "usuario": "maria_lopez", "contrasena": "password123", "correo": "maria.lopez@example.com"};
let usuario9  = {"nombre": "José", "apellidos": "Martínez Ruiz", "usuario": "jose_martinez", "contrasena": "password123", "correo": "jose.martinez@example.com"};
let usuario10 = {"nombre": "Laura", "apellidos": "Gómez Fernández", "usuario": "laura_gomez", "contrasena": "password123", "correo": "laura.gomez@example.com"};

let arrayUsuarios = [Usuario1, Usuario2, Usuario3, Usuario4, Usuario5, Usuario6, usuario7, usuario8, usuario9, usuario10];

document.getElementById("btnRegistrar").addEventListener("click", mostrarFormulario);
document.getElementById("btnGestionarUsuarios").addEventListener("click", altaUsuarios);
document.getElementById("btnActualizar").addEventListener("click", actualizarUsuario)
document.getElementById("divTablaUsuarios").addEventListener("click", mostrarDatos);
document.getElementById("btnEliminar").addEventListener("click", eliminarUsuario);


cargarDatos();
ocultar();
let usuarioSeleccionado=null;

function cargarDatos(){
    const user = document.getElementById("divTablaUsuarios");
    const tabla= document.createElement("table")
    tabla.className="table table-striped";
    user.innerHTML="";
    for (const usuario of arrayUsuarios) {
        const user= usuario.usuario;
        let celda=document.createElement("td")
        let fila=document.createElement("tr")
        celda.dataset.usuario=user;
        celda.innerHTML=user;
        fila.appendChild(celda);
        tabla.appendChild(fila);
        
    }
    user.appendChild(tabla);
}

function eliminarUsuario(){   
    if (!confirm("¿Seguro que quieres eliminar a " + usuarioSeleccionado.usuario + "?")) {
        return;
    }
    const posicion = arrayUsuarios.findIndex(p => p.usuario == usuarioSeleccionado.usuario);
    arrayUsuarios.splice(posicion, 1);
    cargarDatos();
    ocultar();
    usuarioSeleccionado = null;
}



function ocultar(){
    document.getElementById("divMensajes").style.display="none";
    document.getElementById("btnGestionarUsuarios").style.display="none";
    document.getElementById("formUsuarios").style.display="none";
}

function mostrarFormulario(){
    ocultar();
    document.getElementById("btnGestionarUsuarios").style.display="flex";
    document.getElementById("formUsuarios").style.display="flex";

    document.getElementById("btnGestionarUsuarios").innerHTML="Registrar";   
    document.getElementById("formUsuarios").reset();  
}


function altaUsuarios(){
const boton = document.getElementById("btnGestionarUsuarios").innerHTML;

    const usuario = {
        nombre: document.getElementById("nombre").value.trim(),
        apellidos: document.getElementById("apellidos").value.trim(),
        usuario: document.getElementById("usuario").value,
        contrasena: document.getElementById("contrasena").value,
        correo: document.getElementById("correo").value.trim()
    };

    if(usuario.nombre==="" || usuario.apellidos==="" || usuario.usuario==="" || usuario.contrasena==="" || usuario.correo==="") {
        alert("Todos los campos deben de estar rellenos")
        return;
    } else {
        if(boton=="Actualizar"){
            usuarioSeleccionado.nombre = usuario.nombre;
            usuarioSeleccionado.apellidos = usuario.apellidos;
            usuarioSeleccionado.usuario = usuario.usuario;
            usuarioSeleccionado.contrasena = usuario.contrasena;
            usuarioSeleccionado.correo = usuario.correo;
            cargarDatos();
            alert("Usuario actualizado")
            pintarFicha(usuarioSeleccionado);
        } else if(boton=="Registrar") {
            arrayUsuarios.push(usuario);
            cargarDatos();
            alert("Usuario registrado");
        }
        }

    document.getElementById("formUsuarios").reset();
   
}

function actualizarUsuario(event){
    ocultar();
    document.getElementById("formUsuarios").style.display="flex";
    document.getElementById("btnGestionarUsuarios").style.display="flex";

    const boton=document.getElementById("btnGestionarUsuarios")
    boton.innerHTML="Actualizar";

    document.getElementById("nombre").value=usuarioSeleccionado.nombre;
    document.getElementById("apellidos").value=usuarioSeleccionado.apellidos;
    document.getElementById("usuario").value=usuarioSeleccionado.usuario;
    document.getElementById("contrasena").value=usuarioSeleccionado.contrasena;
    document.getElementById("correo").value=usuarioSeleccionado.correo;

}

function mostrarDatos(event){
    ocultar();

    if(event.target.dataset.usuario!==undefined){

       const usuario = arrayUsuarios.find(p => p.usuario == event.target.dataset.usuario)
        pintarFicha(usuario);
}
}

function pintarFicha(usuario){
    ocultar();
    document.getElementById("divMensajes").style.display="flex";
    const capa=document.getElementById("divCapaFicha");
    capa.innerHTML="";
    const detalle=document.createElement("table");

    usuarioSeleccionado=usuario;
    const fila=document.createElement("tr");
    const columnaNombre=document.createElement("td");
    const columnaApellidos=document.createElement("td");
    const columnaUsuario=document.createElement("td");
    const columnaContrasena=document.createElement("td");
    const columnaCorreo=document.createElement("td");
    columnaNombre.textContent=usuario.nombre;
    columnaApellidos.textContent=usuario.apellidos;
    columnaUsuario.textContent=usuario.usuario;
    columnaContrasena.textContent=usuario.contrasena;
    columnaCorreo.textContent=usuario.correo;
               
    fila.appendChild(columnaNombre);
    fila.appendChild(columnaApellidos);
    fila.appendChild(columnaUsuario);
    fila.appendChild(columnaCorreo);
    fila.appendChild(columnaContrasena);
    detalle.appendChild(fila);
    capa.appendChild(detalle);      
}
        

