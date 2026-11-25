document.getElementById("botonNegro").addEventListener("click",fondos);
document.body.style.background="white"
let contenido=document.getElementById("botonNegro");


function fondos () {
    if(document.body.style.background=="white") {
        document.body.style.background="black"
        contenido.textContent="Fondo Blanco";
    } else {
        contenido.textContent="Fondo Negro";
        document.body.style.background="white"
    }
}
