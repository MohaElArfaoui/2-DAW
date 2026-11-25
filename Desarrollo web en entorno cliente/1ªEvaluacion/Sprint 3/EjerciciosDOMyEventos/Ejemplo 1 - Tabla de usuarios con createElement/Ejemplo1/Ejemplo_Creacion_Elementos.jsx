function crearTabla(respuesta){
    lc.innerHTML="";

   let tabla = document.createElement("table");
   tabla.classList.add("table", "table-striped");
   let tablaHead = document.createElement("thead");
   
   
   tablaHead.appendChild(document.createElement("th")).textContent = "Id.";

   // Otra forma de crear una celda del thead.
   /*let cabecera1 = document.createElement("th");
   cabecera1.textContent = "Id.";
   tablaHead.appendChild(cabecera1);*/

   tablaHead.appendChild(document.createElement("th")).textContent = "D.N.I.";
   tablaHead.appendChild(document.createElement("th")).textContent = "Nombre Completo";
   tablaHead.appendChild(document.createElement("th")).textContent = "Usuario";
   tablaHead.appendChild(document.createElement("th")).textContent = "Contraseña";
   
   let tablaBody = document.createElement("tbody");

   if (respuesta.length > 1) {
    tablaHead.appendChild(document.createElement("th")).textContent = "Acciones";
   
    tabla.appendChild(tablaHead);
 
   
    respuesta.forEach(fila => {
        let f = document.createElement("tr");
            
        f.appendChild(document.createElement("td")).textContent = fila.id;
        f.appendChild(document.createElement("td")).textContent = fila.dni;
        f.appendChild(document.createElement("td")).textContent = fila.nombreCompleto;
        f.appendChild(document.createElement("td")).textContent = fila.usuario;
        f.appendChild(document.createElement("td")).textContent = fila.contrasena;

        let botonDelete = document.createElement("Button");
        botonDelete.classList.add("btn", "btn-danger", "separacion");
        botonDelete.setAttribute("value", "d"+fila.id );
        let iconoDelete = document.createElement("i");
        iconoDelete.classList.add("fa-solid", "fa-trash");
        botonDelete.appendChild(iconoDelete);

        let botonEditar = document.createElement("Button");
        botonEditar.classList.add("btn", "btn-primary", "separacion");
        botonEditar.setAttribute("data-bs-toggle", "modal");
        botonEditar.setAttribute("data-bs-target", "#modalEditar");
        botonEditar.setAttribute("value", "e"+fila.id+"-"+fila.dni+"-"+fila.nombreCompleto+"-"+fila.usuario);
        let iconoEditar = document.createElement("i");
        iconoEditar.classList.add("fa-solid", "fa-pen");
        botonEditar.appendChild(iconoEditar);

        let botonMOdPwd = document.createElement("Button");
        botonMOdPwd.classList.add("btn", "btn-warning", "separacion");
        botonMOdPwd.setAttribute("data-bs-toggle", "modal");
        botonMOdPwd.setAttribute("data-bs-target", "#modalPwd");
        botonMOdPwd.setAttribute("value", "p"+fila.id+"-"+fila.contrasena);
        let iconoPwd = document.createElement("i");
        iconoPwd.classList.add("fa-solid", "fa-key");
        botonMOdPwd.appendChild(iconoPwd);

        let celdaBotones = document.createElement("td");
        celdaBotones.appendChild(botonDelete);
        celdaBotones.appendChild(botonEditar);
        celdaBotones.appendChild(botonMOdPwd);
        
        f.appendChild(celdaBotones);

        tablaBody.appendChild(f);
     })
    }else{
        tabla.appendChild(tablaHead);

        let f = document.createElement("tr");
            
        f.appendChild(document.createElement("td")).textContent = respuesta.id;
        f.appendChild(document.createElement("td")).textContent = respuesta.dni;
        f.appendChild(document.createElement("td")).textContent = respuesta.nombreCompleto;
        f.appendChild(document.createElement("td")).textContent = respuesta.usuario;
        f.appendChild(document.createElement("td")).textContent = respuesta.contrasena;

        tablaBody.appendChild(f);
    }

    tabla.appendChild(tablaBody);

    if (respuesta.length > 1) {
        lc.appendChild(tabla);
    }else{
        lb.appendChild(tabla);  
    }
    
}