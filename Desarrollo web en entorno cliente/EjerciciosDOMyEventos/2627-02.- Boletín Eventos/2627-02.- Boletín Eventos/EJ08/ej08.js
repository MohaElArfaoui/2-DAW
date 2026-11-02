document.getElementById("txtEntrada").addEventListener("keydown", tecla);

function tecla(event){
    const numeros="0123456789";
    let tecla=event.key;
    if(numeros.includes(tecla)){
        event.preventDefault();
    }
    
}