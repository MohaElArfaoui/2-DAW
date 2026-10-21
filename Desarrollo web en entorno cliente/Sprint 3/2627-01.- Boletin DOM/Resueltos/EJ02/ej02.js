//Una forma: formulario.opciones.addEventListener("change", procesarFormulario);
// Otra forma:
const selector = document.getElementsByName("opciones")[0];
selector.addEventListener("change", procesarFormulario);

function procesarFormulario() {
  //Una forma:  const opcion = formulario.opciones.value;
  // Otra forma:
  const opcion = selector.value;
  
  switch (opcion) {
    case "atributoStyle":
      asignarEstilosAtributoStyle();
      break;
    case "asignandoClases":
      asignarEstilosConClases();
      break;
    case "estilosPagina":
      asignarEstilosPagina();
      break;
    case "quitarEstilos":
      limpiarEstilosYClases();
      break;
    default:
      alert("Opción inválida");
  }
}

function limpiarEstilosYClases() {
  const texto = document.getElementById("texto");
  const enlaceEstilos = document.getElementById("estilo");
  enlaceEstilos.setAttribute("href", "");
  texto.style.color = "";
  texto.style.fontSize = "";
  texto.style.fontFamily = "";
  texto.classList.remove("claseEstilo");
}

function asignarEstilosAtributoStyle() {
  limpiarEstilosYClases();
  const texto = document.getElementById("texto");
  texto.style.color = "blue";
  texto.style.fontSize = "20px";
  texto.style.fontFamily = "Helvetica";
}

function asignarEstilosConClases() {
  limpiarEstilosYClases();
  const texto = document.getElementById("texto");
  texto.classList.add("claseEstilo");
}

function asignarEstilosPagina() {
  limpiarEstilosYClases();
  const enlaceEstilos = document.getElementById("estilo");
  enlaceEstilos.setAttribute("href", "ej02.css");
}
