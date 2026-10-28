const teclado = document.getElementsByClassName("calculator-keys")[0];
const resultado = document.getElementById("resultado");

teclado.addEventListener("click", manejadorEvento);
let primerNumero;
let operacion;
let segundoNumero;
let resul;

function manejadorEvento(event) {
  if (event.target.tagName == "BUTTON") {
    const salida = document.getElementById("pantalla");
    if (event.target.value == "=") {
      segundoNumero = parseFloat(salida.value.split(operacion)[1]);
      switch (operacion) {
        case "+":
          resul = primerNumero + segundoNumero;
          break;
        case "-":
          resul = primerNumero - segundoNumero;
          break;
        case "*":
          resul = primerNumero * segundoNumero;
          break;
        case "/":
          resul = primerNumero / segundoNumero;
          break;
      }
      salida.value = resul;
    } else if (event.target.value == "all-clear") {
      salida.value = "";
      console.log("AC");
    } else if (event.target.value == ".") {
      let numeroActual;
      if (operacion) {
        numeroActual = salida.value.split(operacion)[1];
      } else {
        numeroActual = salida.value;
      }

      if (!numeroActual.includes(".")) {
        salida.value += ".";
      }
    } else if (
      event.target.value == "+" ||
      event.target.value == "-" ||
      event.target.value == "*" ||
      event.target.value == "/"
    ) {
      operacion = event.target.value;
      primerNumero = parseFloat(salida.value);
      salida.value += operacion;
    } else {
      let digito = event.target.value;
      salida.value += parseFloat(digito);
    }
  }
}
