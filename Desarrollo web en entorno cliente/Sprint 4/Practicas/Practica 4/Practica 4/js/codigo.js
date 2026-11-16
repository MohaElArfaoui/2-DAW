document.getElementById("")



function crearButacas() {
    const cine = document.getElementById("cine");
    const numFilas = 10;
    const numButacas = 20;
    const tabla=document.createElement("table");
    tabla.className="table";

    for (let i = 0; i < numFilas; i++) {
        const fila = document.createElement("tr");
        fila.setAttribute("class", )
        for (let j = 0; j < numButacas; j++) {
        const columna = document.createElement("td");
        fila.appendChild(columna);
    }
    tabla.appendChild(fila);
    }
    cine.appendChild(tabla);
}
