const marcar=document.getElementById("verano")


function deleteManejador(){
    document.getElementById("botonMarcar").removeEventListener("click",marcarVerano);

}

function addManejador(){
    document.getElementById("botonMarcar").addEventListener("click",marcarVerano);   
}

function marcarVerano(){
    if(marcar.checked==true) {
        marcar.checked=false;
    } else {
         marcar.checked=true
    }

}
