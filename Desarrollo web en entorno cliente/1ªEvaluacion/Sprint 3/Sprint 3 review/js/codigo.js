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

document.getElementById("btnRegistrar").addEventListener("click", listarUsuarios);
document.getElementById("btnGestionarUsuarios").addEventListener("click", registrarUsuario);
document.getElementById("divCapaFicha").addEventListener("change",mostrarListado);
document.getElementById("btnRegistrar").addEventListener("click", cargarDatos)
document.getElementById("btnRegistrar").addEventListener("click", registrarUsuario)


cargarDatos();

function cargarDatos(){

    const cuerpo = document.getElementById("divTablaUsuarios");
    cuerpo.innerHTML = "";      
    for (const usuario of arrayUsuarios) {
        cuerpo.innerHTML += `<tr>
        <td>${usuario.usuario}</td>
        </tr>`;
        console.log(usuario)
    }

}


function ocultarTodo(){
    document.getElementById("formUsuarios").style.display = "none";
    document.getElementById("divCapaFicha").style.display = "none";
}

/** @param {Event} event */
function mostrarRegistro(event){
    event.preventDefault();
    ocultarTodo();
    switch (event.target.id) {
        case "formUsuarios":
            document.getElementById("formUsuarios").style.display="block";
            break;
        case "divCapaFicha":
            document.getElementById("divCapaFicha").style.display="block";
            mostrarListado();
            break;
        default:
            break;
    }
}


function crearUsuario(){
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();

    if (nombre === "" || apellidos === "") {
        alert("Escribe el nombre y los apellidos antes de crear el usuario");
        return;
    }

    const partes = apellidos.split(" ");
    const primerApellido = partes[0];
    const segundoApellido = partes.length > 1 ? partes[1] : "";

    const usuario = nombre.substring(0, 1)
        + primerApellido.substring(0, 3)
        + segundoApellido.substring(0, 3);

    document.getElementById("usuario").value = usuario.toLowerCase();
}

function registrarUsuario() {
    const usuario = {
        nombre: document.getElementById("nombre").value.trim(),
        apellidos: document.getElementById("apellidos").value.trim(),
        usuario: document.getElementById("usuario").value,
        contrasena: document.getElementById("contrasena").value,
        correo: document.getElementById("correo").value.trim()
    };

     if (usuario.nombre === "" || usuario.apellidos === "" || usuario.usuario === "" || usuario.contrasena === "" || usuario.correo === "") {
        alert("Todos los campos son obligatorios");
        return;
    }


    arrayUsuarios.push(usuario);
    actualizarUsuario();
    alert("Usuario registrado correctamente");
    document.getElementById("formUsuarios").reset();
}


function listarUsuarios() {
    const tablaAnterior = document.getElementById("divTablaUsuarios");
    if (tablaAnterior) {
        tablaAnterior.remove();
    }

    if (arrayUsuarios.length === 0) {
        alert("No hay usuarios registrados");
        return;
    }

    const tabla = document.createElement("table");
    tabla.id = "divTablaUsuarios";
    tabla.className = "table table-striped";

    
    const cabecera = document.createElement("tr");
    for (const titulo of ["Nombre", "Apellidos", "Usuario", "Contrasena",  "Correo"]) {
        const th = document.createElement("th");
        th.textContent = titulo;
        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);

    
    for (const usuario of arrayUsuarios) {
        const fila = document.createElement("tr");
        for (const dato of [usuario.nombre, usuario.apellidos, usuario.usuario, alumno.correo]) {
            const td = document.createElement("td");
            td.textContent = dato;
            fila.appendChild(td);
        }
        tabla.appendChild(fila);
    }

    document.body.appendChild(tabla);
}

function mostrarListado(){
    const usuario=document.getElementById("usuario").value;
    const capa=document.getElementById("divCapaFicha");

       if(usuario==""){
        capa.style.display="none";
        return;
    }

    for (const user of arrayUsuarios) {
        if(usuario==user.usuario){
            capa.style.display="block";
            const detalle=document.createElement("table");
            detalle.className="table table-striped";

            for (let i = 0; i < arrayUsuarios.length; i++) {
                
                const fila=document.createElement("tr");
                const columnaNombre=document.createElement("td");
                const columnaApellidos=document.createElement("td");
                const columnaUsuario=document.createElement("td");
                const columnaContrasena=document.createElement("td");
                const columnaCorreo=document.createElement("td");
                columnaNombre.textContent=user.nombre;
                columnaApellidos.textContent=user.apellidos;
                columnaUsuario.textContent=user.usuario;
                columnaContrasena.textContent=user.contrasena;
                columnaCorreo.textContent=user.correo;
               
                fila.appendChild(columnaNombre);
                fila.appendChild(columnaApellidos);
                fila.appendChild(columnaUsuario);
                fila.appendChild(columnaCorreo);
                fila.appendChild(columnaContrasena);
                detalle.appendChild(fila);
            }

            capa.appendChild(detalle);
        }
        }
}

function actualizarUsuario(){
    const select=document.getElementById("usuario");
    select.innerHTML="";
    const detalle=document.getElementById("divCapaFicha");
    detalle.innerHTML="";

    const opcionVacia=document.createElement("option");
    opcionVacia.value="";
    opcionVacia.textContent="Selecciona un usuario";
    detalle.appendChild(opcionVacia);

    for (const usuario of arrayUsuarios) {
        const option = document.createElement("option");
        option.value=usuario.usuario;
        option.innerHTML=usuario.nombre + " " + usuario.apellidos;
        select.appendChild(option);

        const option2=document.createElement("option");
        option2.value=usuario.usuario;
        option2.innerHTML=usuario.nombre + " " + usuario.apellidos;
        detalle.appendChild(option2);
    }
}





