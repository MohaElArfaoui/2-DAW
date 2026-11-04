// ===== Elementos =====
const pantalla = document.getElementById("pantalla");
const teclado = document.querySelector(".calculator-keys");

// ===== Estado de la calculadora =====
let primerNumero = null;       // número guardado antes de pulsar un operador
let operador = null;           // "+", "-", "*" o "/"
let esperandoSegundo = false;  // true justo después de pulsar un operador o "="

// ===== Un único evento para todos los botones =====
teclado.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button");
    if (!boton) return;

    const valor = boton.value;

    if (valor === "all-clear") {
        borrarTodo();
    } else if (valor === "=") {
        pulsarIgual();
    } else if (valor === ".") {
        pulsarDecimal();
    } else if (["+", "-", "*", "/"].includes(valor)) {
        pulsarOperador(valor);
    } else {
        pulsarNumero(valor);
    }
});

// ===== Números =====
function pulsarNumero(numero) {
    if (esperandoSegundo) {
        pantalla.value = numero;
        esperandoSegundo = false;
    } else {
        pantalla.value += numero;
    }
}

// ===== Punto decimal (solo uno por número) =====
function pulsarDecimal() {
    if (esperandoSegundo) {
        pantalla.value = "0.";
        esperandoSegundo = false;
        return;
    }
    if (pantalla.value === "") {
        pantalla.value = "0.";
    } else if (!pantalla.value.includes(".")) {
        pantalla.value += ".";
    }
}

// ===== Operadores =====
function pulsarOperador(nuevoOperador) {
    if (pantalla.value === "" || pantalla.value === "Error") return;

    // Si ya había una operación pendiente, se resuelve primero (ej: 2 + 3 + ...)
    if (operador !== null && !esperandoSegundo) {
        pulsarIgual();
        if (pantalla.value === "Error") return;
    }

    primerNumero = parseFloat(pantalla.value);
    operador = nuevoOperador;
    esperandoSegundo = true;
}

// ===== Igual =====
function pulsarIgual() {
    if (operador === null || esperandoSegundo) return;

    const segundoNumero = parseFloat(pantalla.value);
    const resultado = calcular(primerNumero, segundoNumero, operador);

    pantalla.value = resultado;
    operador = null;
    primerNumero = null;
    esperandoSegundo = true;   // si luego pulsas un número, empieza de nuevo
}

// ===== Cálculo =====
function calcular(a, b, op) {
    let resultado;

    switch (op) {
        case "+": resultado = a + b; break;
        case "-": resultado = a - b; break;
        case "*": resultado = a * b; break;
        case "/":
            if (b === 0) return "Error";
            resultado = a / b;
            break;
    }

    // Evita resultados como 0.30000000000000004
    return parseFloat(resultado.toFixed(10));
}

// ===== AC =====
function borrarTodo() {
    pantalla.value = "";
    primerNumero = null;
    operador = null;
    esperandoSegundo = false;
}