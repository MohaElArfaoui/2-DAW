document.getElementById("btnCrearUsuario").addEventListener("click", crearUsuario);
document.getElementById("btnRegistrarAlumno").addEventListener("click", registrarAlumno);
document.getElementById("registroAlumnos").addEventListener("click", mostrarRegistro);
document.getElementById("registroNotas").addEventListener("click", mostrarRegistro);
document.getElementById("listadoAlumnos").addEventListener("click", mostrarRegistro);
document.getElementById("notasMedias").addEventListener("click", mostrarRegistro);
document.getElementById("cerrarSesion").addEventListener("click", mostrarRegistro);
document.getElementById("btnRegistrarNotas").addEventListener("click", registrarNota);
document.getElementById("selAlumnoDetalle").addEventListener("change", mostrarDetalle);

ocultarTodo();

/** @type {Alumno[]} */
let alumnos = [];

function validarCorreo(correo){
    let correoValido=false;

    if(correo.includes("@") && correo.includes(".")){
        correoValido=true;
    }
    return correoValido;
}

function ocultarTodo(){
    document.getElementById("formRegistrarAlumno").style.display = "none";
    document.getElementById("formRegistrarNotas").style.display = "none";
    document.getElementById("formDetalle").style.display = "none";
    document.getElementById("lNotasMedias").style.display = "none";
    document.getElementById("detalleAlumno").style.display = "none";
    document.getElementById("listado").style.display = "none";
}

/** @param {Event} event */
function mostrarRegistro(event){
    event.preventDefault();
    ocultarTodo();
    switch (event.target.id) {
        case "registroAlumnos":
            document.getElementById("formRegistrarAlumno").style.display="block";
            break;

        case "registroNotas":
            document.getElementById("formRegistrarNotas").style.display="block";
            break;

        case "listadoAlumnos":
            document.getElementById("listado").style.display="block";
            document.getElementById("formDetalle").style.display="block";
            document.getElementById("selAlumnoDetalle").value="";
            mostrarListado();
            break;

        case "notasMedias":
            document.getElementById("lNotasMedias").style.display="block";
            mostrarMedias();
            break;

        default:
            break;
    }
}

function validarContrasena(contrasena) {
    let contieneNumero=false;
    const abecedarioMin='abcdefghijklmnopqrstuvwxyz';
    const abecedarioMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numerosCadena = '0123456789';
    let longitudCorrecta=false;
    let letraMin=false;
    let letraMay=false;
    let contrasenaValida=false;

    if(contrasena.length>=6) {
        longitudCorrecta=true;
    }
    for (let i = 0; i < contrasena.length; i++) {
        let letra  = contrasena[i];
        if(numerosCadena.includes(letra)){
            contieneNumero=true;
        }
        if(abecedarioMin.includes(letra)){
            letraMin=true;
        }
        if(abecedarioMayusculas.includes(letra)){
            letraMay=true;
        }
    }
    if(longitudCorrecta==true && contieneNumero==true && letraMin==true && letraMay==true) {
        contrasenaValida=true;
    }
    return contrasenaValida;
}

function crearUsuario() {
    const nombre=document.querySelector("input[name=nombre]").value;
    const apellido=document.querySelector("input[name=Apellidos]").value;

    let primerApellido=apellido.split(" ")[0];
    let segundoApellido=apellido.split(" ")[1];

    let nombreUsuario=nombre[0];

    for (let i = 0; i < primerApellido.length ; i++) {
        let letra = primerApellido[i];
        if(i<=2){
            nombreUsuario+=letra;
        }
    }

    for (let i = 0; i < segundoApellido.length ; i++) {
        let letra = segundoApellido[i];
        if(i<=2){
            nombreUsuario+=letra;
        }
    }
    nombreUsuario=nombreUsuario.toLowerCase();
    document.querySelector("input[name=usuario]").value=nombreUsuario;
}

function registrarAlumno(){
    const nombre= document.querySelector("input[name=nombre]").value;
    const apellidos= document.querySelector("input[name=Apellidos]").value;
    const usuario= document.querySelector("input[name=usuario]").value;
    const contrasena= document.querySelector("input[name=contrasena]").value;
    const correo= document.querySelector("input[name=correo]").value;

    if(nombre=="" || apellidos== "") {
        alert("El nombre y los apellidos son obligatorios");
        return;
    }

    if(usuario==""){
        alert("El usuario no debe estar vacio");
        return;
    }

    if(validarContrasena(contrasena) == false){
        alert("Debe contener un numero, letra minuscula, letra mayuscula y tener una longitud minima de 6.");
        return;
    }
    if( validarCorreo(correo) == false){
        alert("Debe contener un @, y un .");
        return;
    }

    const alumno= new Alumno(nombre, apellidos, usuario, contrasena, correo);
    alumnos.push(alumno);
    actualizarDesplegables();
    alert("Alumno registrado");
    document.getElementById("formRegistrarAlumno").reset();
}

function actualizarDesplegables(){
    const select=document.getElementById("selAlumno");
    select.innerHTML="";
    const detalle=document.getElementById("selAlumnoDetalle");
    detalle.innerHTML="";

    // Primera opción vacía: así el evento change salta al elegir CUALQUIER alumno
    const opcionVacia=document.createElement("option");
    opcionVacia.value="";
    opcionVacia.textContent="Selecciona un alumno";
    detalle.appendChild(opcionVacia);

    for (const alumno of alumnos) {
        const option = document.createElement("option");
        option.value=alumno.getUsuario();
        option.innerHTML=alumno.getNombre() + " " + alumno.getApellidos();
        select.appendChild(option);

        const option2=document.createElement("option");
        option2.value=alumno.getUsuario();
        option2.innerHTML=alumno.getNombre() + " " + alumno.getApellidos();
        detalle.appendChild(option2);
    }
}

function registrarNota(){
    const usuario=document.getElementById("selAlumno").value;
    const asignatura=document.querySelector("select[name=selNota]").value;
    const nota=parseFloat(document.querySelector("input[name=nota]").value);

    if(isNaN(nota)){
        alert("No puede estar vacio");
        return;
    }
    if(nota<0 || nota>10) {
        alert("La nota debe estar entre 0 y 10");
        return;
    }
    for (const alumno of alumnos) {
        if(usuario==alumno.getUsuario()){
            const obNota= new Nota(asignatura,nota);
            const existe= alumno.altaNota(obNota);
            if(existe){
                alert("Esa asignatura ya tenia la nota guardada");
            } else {
                alert("Nota registrada");
            }
        }
    }

    document.getElementById("formRegistrarNotas").reset();
}

function mostrarDetalle(){
    const usuario=document.getElementById("selAlumnoDetalle").value;
    const capa = document.getElementById("detalleAlumno");
    capa.innerHTML="";

    // Si se vuelve a "Selecciona un alumno", se oculta el detalle
    if(usuario==""){
        capa.style.display="none";
        return;
    }

    for (const alumno of alumnos) {
        if(usuario==alumno.getUsuario()){
            capa.style.display="block";

            if(alumno.getLongitudArrayNotas()==0){
                capa.textContent="Este alumno no tiene notas registradas";
                return;
            }

            const detalle=document.createElement("table");
            detalle.className="table table-striped";

            for (let i = 0; i < alumno.getLongitudArrayNotas(); i++) {
                let notaAsignatura = alumno.getAsignaturaYNota(i);
                let partirNotaAsignatura=notaAsignatura.split(":");
                let asignatura=partirNotaAsignatura[0];
                let nota=partirNotaAsignatura[1];
                const fila=document.createElement("tr");
                const columnaAsig=document.createElement("td");
                const columnaNota=document.createElement("td");
                columnaAsig.textContent=asignatura;
                columnaNota.textContent=nota;
                fila.appendChild(columnaAsig);
                fila.appendChild(columnaNota);
                detalle.appendChild(fila);
            }

            capa.appendChild(detalle);
        }
    }
}

function mostrarMedias(){
    const notas=document.getElementById("lNotasMedias");
    notas.innerHTML="";

    if(alumnos.length==0){
        notas.textContent="No hay alumnos registrados";
        return;
    }

    const tableNotaMedia=document.createElement("table");
    tableNotaMedia.className="table table-striped";

    for (const alumno of alumnos) {
        // 1. Para CADA alumno: la suma empieza en 0
        let sumaNotas=0;
        const numNotas=alumno.getLongitudArrayNotas();

        // 2. Bucle de notas: SOLO sumar
        for (let i = 0; i < numNotas; i++) {
            sumaNotas += alumno.getNota(i);
        }

        // 3. Ya fuera del bucle de notas: la media de este alumno
        let media;
        if(numNotas==0){
            media="Sin notas";
        } else {
            media=(sumaNotas/numNotas).toFixed(2);
        }

        // 4. UNA fila por alumno
        const fila=document.createElement("tr");
        const columnaNombre=document.createElement("td");
        const columnaMedia=document.createElement("td");
        columnaNombre.textContent=alumno.getNombre() + " " + alumno.getApellidos();
        columnaMedia.textContent=media;
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaMedia);
        tableNotaMedia.appendChild(fila);
    }

    notas.appendChild(tableNotaMedia);
}
