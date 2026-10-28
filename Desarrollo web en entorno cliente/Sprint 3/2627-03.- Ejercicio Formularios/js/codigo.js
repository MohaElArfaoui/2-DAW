document.getElementById("btnCrearUsuario").addEventListener("click", crearUsuario);
document.getElementById("btnRegistrarAlumno").addEventListener("click", registrarAlumno);
document.getElementById("btnRegListadoAlumno").addEventListener("click", listarAlumno);
 
let alumnos = [];
 
function validarCorreo(correo) {
    let correoValido = false;
 
    if (correo.includes("@") && correo.includes(".")) {
        correoValido = true;
    }
    return correoValido;
}
 
function validarContrasena(contrasena) {
    let contieneNumero = false;
    const abecedarioMin = 'abcdefghijklmnopqrstuvwxyz';
    const abecedarioMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numerosCadena = '0123456789';
    let longitudCorrecta = false;
    let letraMin = false;
    let letraMay = false;
    let contrasenaValida = false;
 
    if (contrasena.length >= 6) {
        longitudCorrecta = true;
    }
    for (let i = 0; i < contrasena.length; i++) {
        let letra = contrasena[i];
        if (numerosCadena.includes(letra)) {
            contieneNumero = true;
        }
        if (abecedarioMin.includes(letra)) {
            letraMin = true;
        }
        if (abecedarioMayusculas.includes(letra)) {
            letraMay = true;
        }
    }
 
    if (longitudCorrecta && contieneNumero && letraMin && letraMay) {
        contrasenaValida = true;
    }
    return contrasenaValida;
}
 
function crearUsuario() {
    const nombre = document.querySelector("input[name=nombre]").value;
    const apellido = document.querySelector("input[name=Apellidos]").value;
 
    let primerApellido = apellido.split(" ")[0];
    let segundoApellido = apellido.split(" ")[1];
 
    let nombreUsuario = nombre[0];
 
    for (let i = 0; i < primerApellido.length; i++) {
        let letra = primerApellido[i];
        if (i <= 2) {
            nombreUsuario += letra;
        }
    }
 
    for (let i = 0; i < segundoApellido.length; i++) {
        let letra = segundoApellido[i];
        if (i <= 2) {
            nombreUsuario += letra;
        }
    }
    nombreUsuario = nombreUsuario.toLowerCase();
    document.querySelector("input[name=usuario]").value = nombreUsuario;
}
 
function registrarAlumno() {
    const alumno = {
        nombre: document.querySelector("input[name=nombre]").value,
        apellidos: document.querySelector("input[name=Apellidos]").value,
        contrasena: document.querySelector("input[name=contrasena]").value,
        usuario: document.querySelector("input[name=usuario]").value,
        correo: document.querySelector("input[name=correo]").value,
    };
 
    if (alumno.nombre == "" || alumno.apellidos == "") {
        alert("El nombre y los apellidos son obligatorios");
        return;
    }
    // PENDIENTE: mover aquí la validación del usuario (antes de contraseña y correo)
    if (alumno.usuario === "") {
        alert("Debes pulsar en crear para generar el usuario.");
        return;
    }
    if (!validarContrasena(alumno.contrasena)) {
        alert("Debe contener un numero, letra minuscula, letra mayuscula y tener una longitud minima de 6.");
        return;
    }
    if (!validarCorreo(alumno.correo)) {
        alert("Debe contener un '@' y un '.'");
        return;
    }
    alumnos.push(alumno);
    console.log(alumnos);
 
    alert("Alumno registrado");
    document.querySelector("input[name=nombre]").value = "";
    document.querySelector("input[name=Apellidos]").value = "";
    document.querySelector("input[name=usuario]").value = "";
    document.querySelector("input[name=contrasena]").value = "";
    document.querySelector("input[name=correo]").value = "";
}
 
function listarAlumno() {
    const contenedor = document.getElementById("listadoAlumnos");
    contenedor.innerHTML = "";

    const tabla = document.createElement("table");
    tabla.className = "table table-striped";

    const cabecera = document.createElement("tr");
    const titulos = ["Reg.", "Nombre", "Apellidos", "Usuario", "Correo", "Editar"];
    for (let i = 0; i < titulos.length; i++) {
        const th = document.createElement("th");
        th.textContent = titulos[i];
        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);

    for (let i = 0; i < alumnos.length; i++) {
        const alumno = alumnos[i];
        const fila = document.createElement("tr");
        const datos = [i, alumno.nombre, alumno.apellidos, alumno.usuario, alumno.correo];

        for (let j = 0; j < datos.length; j++) {
            const td = document.createElement("td");
            td.textContent = datos[j];
            fila.appendChild(td);
        }

        const tdBoton = document.createElement("td");
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn btn-primary btn-sm";
        boton.textContent = "Eliminar";
        boton.addEventListener("click", function () {
            eliminarAlumno(i);
        });
        tdBoton.appendChild(boton);
        fila.appendChild(tdBoton);

        tabla.appendChild(fila);
    }

    contenedor.appendChild(tabla);
}

function eliminarAlumno(posicion) {
    const alumno = alumnos[posicion];
    if (confirm("¿Está seguro que desea eliminar al alumno " + alumno.nombre + " " + alumno.apellidos + "?")) {
        alumnos.splice(posicion, 1);
        alert("El alumno ha sido eliminado con éxito");
        listarAlumno();
    }
}
 