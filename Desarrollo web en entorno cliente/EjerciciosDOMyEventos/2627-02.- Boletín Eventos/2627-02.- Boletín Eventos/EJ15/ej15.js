document.querySelector("input[name=btnGuardar]").addEventListener("click", guardar);
document.querySelector("input[name=btnRecuperar]").addEventListener("click", recuperar);
document.querySelector("input[name=btnEliminar]").addEventListener("click", eliminar);

const formulario = document.querySelector("form[name=formulario]");

// Guardar: crea (o sobrescribe) la cookie clave=valor
function guardar() {
    const clave = document.querySelector("input[name=txtClave]").value.trim();
    const valor = document.querySelector("input[name=txtValor]").value.trim();

    if (clave === "") {
        alert("Debes escribir una clave");
        return;
    }

    // encodeURIComponent evita problemas con espacios, ";" o "=" dentro del texto
    // max-age en segundos: 7 días
    document.cookie = encodeURIComponent(clave) + "=" + encodeURIComponent(valor) + "; max-age=" + 60 * 60 * 24 * 7 + "; path=/";

    formulario.reset();
}

// Recuperar: busca la cookie por su clave y muestra su valor
function recuperar() {
    const clave = document.querySelector("input[name=txtClave]").value.trim();

    if (clave === "") {
        alert("Debes escribir una clave");
        return;
    }

    const valor = leerCookie(clave);

    if (valor === null) {
        alert("No existe ninguna cookie con la clave " + clave);
    } else {
        alert("El valor de la cookie " + clave + " es: " + valor);
    }

    formulario.reset();
}

// Eliminar: se "borra" poniendo su duración a 0 (caduca en el momento)
function eliminar() {
    const clave = document.querySelector("input[name=txtClave]").value.trim();

    if (clave === "") {
        alert("Debes escribir una clave");
        return;
    }

    if (leerCookie(clave) === null) {
        alert("No existe ninguna cookie con la clave " + clave);
    } else {
        document.cookie = encodeURIComponent(clave) + "=; max-age=0; path=/";
        alert("Cookie " + clave + " eliminada");
    }

    formulario.reset();
}

// document.cookie devuelve TODAS las cookies en un texto: "clave1=valor1; clave2=valor2"
// Esta función la parte en trozos y devuelve el valor de la clave buscada, o null si no está
function leerCookie(clave) {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
        const partes = cookie.split("=");
        if (decodeURIComponent(partes[0]) === clave) {
            return decodeURIComponent(partes[1]);
        }
    }
    return null;
}
