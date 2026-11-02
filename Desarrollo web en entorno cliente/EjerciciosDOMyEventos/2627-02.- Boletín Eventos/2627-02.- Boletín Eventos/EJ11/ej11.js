document.getElementById("formulario").addEventListener("click", pantalla);

function pantalla(event){
    console.log(event.target.tagName);
    console.log(event.currentTarget.tagName);
    console.log(this)
}

