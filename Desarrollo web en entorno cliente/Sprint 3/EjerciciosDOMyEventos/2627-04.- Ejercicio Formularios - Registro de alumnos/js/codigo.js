// ===== Eventos de los botones =====
document.getElementById("btnCrearUsuario").addEventListener("click", crearUsuario);
document.getElementById("btnRegistrarAlumno").addEventListener("click", registrarAlumno);
document.getElementById("btnRegListadoAlumno").addEventListener("click", listarAlumnos);

// ===== Array donde se guardan los alumnos (fuera de las funciones) =====
let alumnos = [];

// ===== Botón CREAR: genera el usuario =====
// Ejemplo: Ramón / Morales Pacheco -> rmorpac
function crearUsuario() {
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

// ===== Validar contraseña: mínimo 6 caracteres, un dígito, una minúscula y una mayúscula =====
function validarContrasena(contrasena) {
    if (contrasena.length < 6) {
        return false;
    }

    let tieneDigito = false;
    let tieneMinuscula = false;
    let tieneMayuscula = false;

    for (const letra of contrasena) {
        if (letra >= "0" && letra <= "9") {
            tieneDigito = true;
        } else if (letra === letra.toLowerCase() && letra !== letra.toUpperCase()) {
            tieneMinuscula = true;
        } else if (letra === letra.toUpperCase() && letra !== letra.toLowerCase()) {
            tieneMayuscula = true;
        }
    }

    return tieneDigito && tieneMinuscula && tieneMayuscula;
}

// ===== Validar correo: debe contener "@" y "." =====
function validarCorreo(correo) {
    return correo.includes("@") && correo.includes(".");
}

// ===== Botón REGISTRAR: valida y guarda el alumno =====
function registrarAlumno() {
    const alumno = {
        nombre: document.getElementById("nombre").value.trim(),
        apellidos: document.getElementById("apellidos").value.trim(),
        usuario: document.getElementById("usuario").value,
        contrasena: document.getElementById("contrasena").value,
        correo: document.getElementById("correo").value.trim()
    };

    if (alumno.nombre === "" || alumno.apellidos === "") {
        alert("El nombre y los apellidos son obligatorios");
        return;
    }
    if (alumno.usuario === "") {
        alert("Debes pulsar 'Crear' para generar el usuario");
        return;
    }
    if (!validarContrasena(alumno.contrasena)) {
        alert("La contraseña debe tener al menos 6 caracteres, un número, una minúscula y una mayúscula");
        return;
    }
    if (!validarCorreo(alumno.correo)) {
        alert("El correo debe contener '@' y '.'");
        return;
    }

    alumnos.push(alumno);
    alert("Alumno registrado correctamente");
    document.getElementById("formRegistrarAlumno").reset();
}

// ===== Botón LISTADO: muestra los alumnos en una tabla =====
function listarAlumnos() {
    // Si ya había una tabla de un listado anterior, se borra
    const tablaAnterior = document.getElementById("tablaAlumnos");
    if (tablaAnterior) {
        tablaAnterior.remove();
    }

    if (alumnos.length === 0) {
        alert("No hay alumnos registrados");
        return;
    }

    const tabla = document.createElement("table");
    tabla.id = "tablaAlumnos";
    tabla.className = "table table-striped col-6";
    tabla.style.margin = "20px auto";

    // Cabecera
    const cabecera = document.createElement("tr");
    for (const titulo of ["Nombre", "Apellidos", "Usuario", "Correo"]) {
        const th = document.createElement("th");
        th.textContent = titulo;
        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);

    // Una fila por alumno
    for (const alumno of alumnos) {
        const fila = document.createElement("tr");
        for (const dato of [alumno.nombre, alumno.apellidos, alumno.usuario, alumno.correo]) {
            const td = document.createElement("td");
            td.textContent = dato;
            fila.appendChild(td);
        }
        tabla.appendChild(fila);
    }

    document.body.appendChild(tabla);
}