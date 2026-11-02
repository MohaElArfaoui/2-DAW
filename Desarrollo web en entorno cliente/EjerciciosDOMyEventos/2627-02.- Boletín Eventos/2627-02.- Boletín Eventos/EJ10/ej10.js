document.addEventListener("mousedown", mostrarBoton)
document.addEventListener("contextmenu", mostrarBoton);

function mostrarBoton(event){
    const salida=document.getElementById("salida")
    if(event.button==0){
        salida.textContent="Has pulsado el boton izquierdo"
    } else {
        salida.textContent="Has pulsado el boton derecho"
        event.preventDefault();

    }
}
