//************* LISTADO DE ALUMNOS *****************

// Tabla Bootstrap con nombre, apellidos, usuario y correo, y un botón Eliminar por fila
function mostrarListado(){
    const capa=document.getElementById("listado");
    capa.innerHTML="";

    if(alumnos.length==0){
        capa.textContent="No hay alumnos registrados";
        return;
    }

    const tabla=document.createElement("table");
    tabla.className="table table-striped";

    // Fila de cabecera con <th>
    const cabecera=document.createElement("tr");
    const titulos=["Nombre", "Apellidos", "Usuario", "Correo", ""];
    for (const titulo of titulos) {
        const th=document.createElement("th");
        th.textContent=titulo;
        cabecera.appendChild(th);
    }
    tabla.appendChild(cabecera);

    // Una fila por alumno
    for (const alumno of alumnos) {
        const fila=document.createElement("tr");

        const datos=[alumno.getNombre(), alumno.getApellidos(), alumno.getUsuario(), alumno.getCorreo()];
        for (const dato of datos) {
            const td=document.createElement("td");
            td.textContent=dato;
            fila.appendChild(td);
        }

        // Celda con el botón Eliminar: guarda el usuario en un atributo data-usuario
        const tdBoton=document.createElement("td");
        const boton=document.createElement("button");
        boton.type="button";
        boton.className="btn btn-danger btn-sm";
        boton.textContent="Eliminar";
        boton.dataset.usuario=alumno.getUsuario();
        boton.addEventListener("click", eliminarAlumno);
        tdBoton.appendChild(boton);
        fila.appendChild(tdBoton);

        tabla.appendChild(fila);
    }

    capa.appendChild(tabla);
}

/** @param {Event} event */
function eliminarAlumno(event){
    const usuario=event.target.dataset.usuario;

    // Buscar la posición del alumno en el array
    let posicion=-1;
    for (let i = 0; i < alumnos.length; i++) {
        if(alumnos[i].getUsuario()==usuario){
            posicion=i;
        }
    }
    if(posicion==-1){
        return;
    }

    const alumno=alumnos[posicion];
    const nombreCompleto=alumno.getNombre() + " " + alumno.getApellidos();

    // confirm devuelve true si se pulsa Aceptar y false si se pulsa Cancelar
    if(!confirm("¿Está seguro de que desea eliminar al alumno " + nombreCompleto + "?")){
        return;
    }

    alumnos.splice(posicion, 1);          // quitarlo del array
    actualizarDesplegables();             // que desaparezca también de los selects
    document.getElementById("detalleAlumno").style.display="none";
    mostrarListado();                     // volver a pintar la tabla sin él
    alert("El alumno ha sido eliminado con éxito");
}
