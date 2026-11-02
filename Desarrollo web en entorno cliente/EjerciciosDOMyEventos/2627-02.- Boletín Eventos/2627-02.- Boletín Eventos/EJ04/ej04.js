
function agregarProvincia() {
    // 1. Campos vacíos
    if (codigo === "" || provincia === "") {
        alert("Debes rellenar el código y la provincia");
        return;
    }

    // 2. Duplicados: recorrer las opciones de LAS DOS listas
    const todas = document.querySelectorAll("#lstProvincias option, #lstDestino option");
    for (const opcion of todas) {
        if (opcion.value === codigo) {
            alert("La provincia con código " + codigo + " ya existe");
            return;
        }
    }

    // 3. Si llega aquí, no está repetida: crearla y añadirla
    const opt = document.createElement("option");
    opt.value = codigo;
    opt.textContent = provincia;
    select.appendChild(opt);

}

function pasarDerecha(){
    const destino = document.querySelector("select[name=lstDestino]");      // el select derecho
    const opciones = document.querySelectorAll("select[name=lstProvincias] option"); // foto de las opciones
    for (const provincia of opciones) {
        if(provincia.selected==true){
            destino.appendChild(provincia)
        }
        
    }

}

function pasarIzquierda(){
    const lista = document.querySelector("select[name=lstProvincias]");     // el select izquierdo
    const destino=document.querySelectorAll("select[name=lstDestino] option")

    for (const provincia of destino) {
        if(provincia.selected==true){
            lista.appendChild(provincia)
        }
        
    }


}