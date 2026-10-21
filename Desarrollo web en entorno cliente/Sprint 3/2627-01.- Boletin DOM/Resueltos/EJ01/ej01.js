document.getElementById("boton").addEventListener("click", crearTabla);

function crearTabla() {
  // 1º forma: const filas = formulario.filas.value;
  // 2º forma: const filas=document.getElementsByName("filas")[0].value;
  // 3º forma:
  const filas=document.querySelector('input[name="filas"]').value;
  const columnas = formulario.columnas.value;

  let tabla = document.createElement("table");
  let contador = 1;
  for (let i = 0; i < filas; i++) {
    //Dos formas de hacerlo, la primera es con insertRow y la segunda es con createElement

    let fila = tabla.insertRow();
    //let fila = document.createElement("tr");

    for (let j = 0; j < columnas; j++) {
      let celda = fila.insertCell();
      let textoCelda = document.createTextNode(contador);
      celda.appendChild(textoCelda);
      contador++;
    }
  }
  document.getElementById("tabla").appendChild(tabla);
}
