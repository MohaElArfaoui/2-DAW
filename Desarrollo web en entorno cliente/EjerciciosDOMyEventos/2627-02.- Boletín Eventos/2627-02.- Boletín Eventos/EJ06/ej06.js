document.getElementById("cuadrado").addEventListener("mouseover",pintar);
document.getElementById("cuadrado").addEventListener("mouseout",despintar);
document.getElementById("txtEntrada").addEventListener("keydown", tecla)

function tecla(event){
    const salida= document.getElementById("salida");
    salida.innerHTML+="Tecla pulsada: " + event.key +"<br>";

}

function pintar(event){
    const salida= document.getElementById("salida");
    salida.textContent="Evento: " + event.type + " - Objeto: " + event.target.id + " - X: " + event.clientX + "- Y: " + event.clientY;
    const cuadrado=document.getElementById("cuadrado");
    cuadrado.classList.add("amarillo");
}
function despintar(){
    const salida= document.getElementById("salida");
    salida.textContent="";
    const cuadrado=document.getElementById("cuadrado");
    cuadrado.classList.remove("amarillo");
}
