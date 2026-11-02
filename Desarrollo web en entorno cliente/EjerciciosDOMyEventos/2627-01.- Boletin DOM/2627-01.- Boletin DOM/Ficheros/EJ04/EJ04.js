document.getElementById("boton").addEventListener("click",colorCelda);
document.getElementById("capa").addEventListener("click",cambiarFondo);

function colorCelda(){
    const colores = ["#ff0000", "#00ff00", "#0000ff",
                     "#ffff00", "#ff00ff", "#00ffff",
                     "#ffa500", "#808080", "#000000"];
    let contador=0;
    const capa=document.getElementById("capa")
    const tabla=document.createElement("table")
    capa.innerHTML="";
    
    for (let i = 0; i < 3; i++) {
        const fila=document.createElement("tr");
        tabla.appendChild(fila);
        
        for (let j = 0; j < 3; j++) {
            const celda=document.createElement("td");
            celda.style.backgroundColor = colores[contador];
            contador++;
            fila.appendChild(celda);            
            
        }
    }
capa.appendChild(tabla);
}

function cambiarFondo(event){
    const color=event.target.style.backgroundColor;
    document.body.style.backgroundColor=color;
}