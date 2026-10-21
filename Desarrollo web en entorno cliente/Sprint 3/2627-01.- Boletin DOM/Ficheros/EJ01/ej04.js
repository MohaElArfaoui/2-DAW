document.getElementById("boton").addEventListener("click", crearTabla);

function crearTabla() {
    const filas=parseInt(document.querySelector("input[name=filas]").value);
    const columnas=parseInt(document.querySelector("input[name=columnas]").value);
    
    let tabla=document.createElement("table");

    let contador=1;
for (let i = 0; i < filas; i++) {
    let fila=tabla.insertRow();

  for (let j = 0; j < columnas; j++) {
    let celda=fila.insertCell();
    //celda.innerHTML=contador;
    let textoCelda = document.createTextNode(contador);
    celda.appendChild(textoCelda);
    contador++;
  }
    
  }

document.getElementById("tabla").appendChild(tabla);
}
