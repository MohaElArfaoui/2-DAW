const teclado=document.getElementsByClassName("calculator-keys")[0];
const resultado=document.getElementById("resultado")

teclado.addEventListener("click", manejadorEvento);

function manejadorEvento(event){
    if(event.target.tagName== "BUTTON") {
        const salida=document.getElementById("pantalla");
        let digito= event.target.value;
        salida.value += digito;
         
        if(nombre=document.querySelector("button[value='=']")) {
           let 
        } else if (){
            

        } else if () {

        } else if(){

        }
    }
}