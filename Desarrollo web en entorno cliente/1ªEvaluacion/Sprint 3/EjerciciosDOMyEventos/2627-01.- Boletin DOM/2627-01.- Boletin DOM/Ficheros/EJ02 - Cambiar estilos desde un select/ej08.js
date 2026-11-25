document.querySelector("select[name=opciones]").addEventListener("change",opcionDesplegable);
const texto=document.getElementById("texto") 
const id=document.getElementById("estilo")

function limpiar(){ 
    texto.removeAttribute("style");
    texto.removeAttribute("class");
    id.removeAttribute("href");
}

function opcionDesplegable(){
    let opcion=document.querySelector("select[name=opciones]").value;

    if (opcion=="quitarEstilos") {
        limpiar();
    }
    if(opcion=="atributoStyle") {
       limpiar();
        texto.setAttribute("style", "color:blue; font-size:20px; font-family:Helvetica")
    }
    if(opcion=="asignandoClases") {
        limpiar();
        texto.setAttribute("class", "claseEstilo")
    }
    if(opcion=="estilosPagina") {
        limpiar();
        id.setAttribute("href","./ej08.css")

    }
}