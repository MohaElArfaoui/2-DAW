document.getElementById("consultar").addEventListener("click",consultarDatos);

function consultarDatos(){

     let inputs= document.getElementsByName("actores")

     for (let input of inputs) {
        if(input.checked==true){
            console.log(input.value)

        }
     }


}