const bCreaTabla = document.getElementById('btnCreaTabla');
const capa  = document.getElementById("tablaResultado");

bCreaTabla.addEventListener("click", crearTabla);


function crearTabla (){
   
   capa.innerHTML="";

   const tabla = document.createElement("table");
   tabla.classList.add("m-4","table", "table-bordered");
  
    for (let i = 0; i<5;i++){
        const f = document.createElement("tr");
        for (let j=0; j<5; j++){
             f.appendChild(document.createElement("td")).textContent = "*";
        }
        tabla.appendChild(f);
    }

    capa.appendChild(tabla);

    
}