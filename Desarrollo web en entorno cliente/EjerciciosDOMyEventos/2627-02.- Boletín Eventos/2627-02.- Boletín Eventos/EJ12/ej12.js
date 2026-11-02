document.querySelector("form[name=formulario]").addEventListener("submit", enviarForm);

function enviarForm(event){
    const texto= document.querySelector("input[name=txtTexto]").value
    if (texto==""){
        alert("No hay texto no se puede enviar")
        event.preventDefault();
    } else {
        alert("Se ha enviado con exito")
    }

}
