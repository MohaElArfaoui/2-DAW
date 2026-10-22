document.querySelector("form[name=formulario]").addEventListener("change", atributoStyle);


function atributoStyle() {
    opcion=document.querySelector("select[name=opciones]");
    texto=document.getElementById("texto")
    switch (opcion.value) {
        case "atributoStyle":
            texto.style.cssText="color: blue; font-family: helvetica; font-size: 20px;"

            break;
        case "asignandoClases":
            
            break;
        case "estilosPagina":
            
            break;
    
        case "quitarEstilos":
            
            break;
    
            break;
    }

}