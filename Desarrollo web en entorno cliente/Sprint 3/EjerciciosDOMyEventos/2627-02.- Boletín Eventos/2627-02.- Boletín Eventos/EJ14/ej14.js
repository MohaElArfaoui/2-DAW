document.querySelector("form[name=formulario]").addEventListener("submit", validarFormulario);

// Nombre de cada campo, texto para mostrar y expresión regular que debe cumplir
const campos = [
    { nombre: "apellidos",       texto: "Apellidos",           regex: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/ },
    { nombre: "nombre",          texto: "Nombre",              regex: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/ },
    { nombre: "fechaNacimiento", texto: "Fecha de nacimiento", regex: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/ },
    { nombre: "dni",             texto: "DNI",                 regex: /^[0-9]{7,8}[A-Z]$/ },
    { nombre: "email",           texto: "Correo electrónico",  regex: /^[a-z._-]+@[a-z_-]+\.[a-z]{2,4}$/ },
    { nombre: "usuario",         texto: "Usuario IDEA",        regex: /^[a-z]{7}[0-9]{3}$/ },
    { nombre: "telefono",        texto: "Teléfono",            regex: /^[6-9][0-9]{8}$/ },
    { nombre: "twitter",         texto: "Usuario de Twitter",  regex: /^@.{4,15}$/ }
];

function validarFormulario(event) {
    const vacios = [];
    const errores = [];

    for (const campo of campos) {
        const valor = document.querySelector("input[name=" + campo.nombre + "]").value.trim();

        if (valor === "") {
            vacios.push(campo.texto);
        } else if (!campo.regex.test(valor)) {
            errores.push(campo.texto);
        }
    }

    const salida = document.getElementById("salida");
    salida.innerHTML = "";

    // Si todo es correcto, no se cancela nada y el formulario se envía
    if (vacios.length === 0 && errores.length === 0) {
        return;
    }

    event.preventDefault();

    if (vacios.length > 0) {
        salida.appendChild(crearLista("Campos vacíos:", vacios));
    }
    if (errores.length > 0) {
        salida.appendChild(crearLista("Campos con errores:", errores));
    }
}

// Crea un bloque con un título y una lista <ul> con un <li> por cada elemento
function crearLista(titulo, elementos) {
    const bloque = document.createElement("div");

    const p = document.createElement("p");
    p.textContent = titulo;
    bloque.appendChild(p);

    const ul = document.createElement("ul");
    for (const elemento of elementos) {
        const li = document.createElement("li");
        li.textContent = elemento;
        ul.appendChild(li);
    }
    bloque.appendChild(ul);

    return bloque;
}
