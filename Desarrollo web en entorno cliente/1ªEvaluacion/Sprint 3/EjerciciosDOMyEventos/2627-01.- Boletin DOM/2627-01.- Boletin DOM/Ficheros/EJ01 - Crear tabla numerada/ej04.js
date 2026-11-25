document.getElementById("boton").addEventListener("click",crearTabla);

function crearTabla(){
    const filas=document.querySelector("input[name=filas]").value;
    const columnas=document.querySelector("input[name=columnas]").value;
    let tabla=document.createElement("table")
    let numero=0;
    const contenedor=document.getElementById("tabla");
    contenedor.innerHTML="";
    for (let i = 0; i < filas; i++) {
        let fila=document.createElement("tr")
        for (let j = 0; j < columnas; j++) {
            let celda=document.createElement("td")
            fila.appendChild(celda);
         numero++;
         celda.textContent=numero;        }
        tabla.appendChild(fila);
    }
    contenedor.appendChild(tabla);
}


