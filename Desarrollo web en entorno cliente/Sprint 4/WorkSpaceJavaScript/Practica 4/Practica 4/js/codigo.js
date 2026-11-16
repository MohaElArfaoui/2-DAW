document.getElementById("DOMContentLoaded", crearButacas);
document.getElementById("cine").addEventListener("click", clickButaca)


crearButacas();
function crearButacas() {
    const cine = document.getElementById("cine");
    const numFilas = 10;
    const numButacas = 20;
    const tabla=document.createElement("table");
    
    for (let i = 0; i < numFilas; i++) {
        const fila = document.createElement("tr");
        
        for (let j = 0; j < numButacas; j++) {
            const columna = document.createElement("td");
            const butacaIcono= document.createElement("i");
            butacaIcono.className="fa-solid fa-couch fa-lg";
            butacaIcono.style.color="blue";
            columna.appendChild(butacaIcono);
            fila.appendChild(columna);
            butacaIcono.dataset.fila=i+1;
            butacaIcono.dataset.columna=j+1;
            butacaIcono.dataset.id=String.fromCharCode(65+i) + (j+1);
        }
        tabla.appendChild(fila);
    }
    cine.appendChild(tabla);
}

function clickButaca(event){
    if(event.target.tagName=="I"){
        const fila=event.target.dataset.fila;
        const columna=event.target.dataset.columna;
        if(event.target.style.color=="red") {
            event.target.style.color="blue";
            console.log("Has deseleccionado la butaca de la fila " + fila + ", columna " + columna)
        } else {
              console.log("Seleccionaste la butaca de la fila " + fila + ", columna " + columna)
            event.target.style.color="red";
        }
               
    }
}

function crearReserva(){

  const miForm = new FormData(document.getElementById("cine"));
  const jsonData = Object.fromEntries(miForm); 
  const jsonString = JSON.stringify(jsonData)

  fetch('http://localhost:9999/crearReserva', {
        method: 'POST',
        body: jsonString,
         headers: {
            'Content-Type': 'application/json'
        }
    })
      .then(respuesta => respuesta.text())
      .then(respuesta => {
           if (respuesta === "Ok") {
            alert("Reservado")
        }else{
            alert("registrar");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("conectar con el servidor para reservar");
      });

}