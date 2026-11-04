
document.querySelector("input[name=boton]").addEventListener("click",mostrarInfo);

function mostrarInfo(){
    const opciones=document.querySelector("select[name=provincias]");
    for (let provincia of opciones ) {
        if(provincia.selected==true){
            console.log(provincia.textContent + " - " + provincia.value)

        }
    }


}