const teclado = document.getElementById("teclado");
teclado.addEventListener("click", tecla)

function tecla(event) {
    if(event.target.tagName == "INPUT") {
        const salida = document.getElementById("salida");
        console.log(salida)
        let letra=event.target.value;
        salida.value+=letra;

    }

   
}
