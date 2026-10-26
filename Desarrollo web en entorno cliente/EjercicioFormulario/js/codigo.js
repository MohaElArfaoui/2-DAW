document.getElementById("btnCrearUsuario").addEventListener("click", crearUsuario);
document.getElementById("btnRegistrarAlumno").addEventListener("click", registrarAlumno);
document.getElementById("btnRegListadoAlumno").addEventListener("click", listarAlumno);
document.getElementById("listado").addEventListener("click", listarAlumno);

let alumnos = [];

function validarCorreo(correo){
let correoValido=false;

if(correo.includes("@") && correo.includes(".")){
    correoValido=true;
}
return correoValido;
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
        if(longitudCorrecta==true && contieneNumero==true && letraMin==true && letraMay==true) {
            contrasenaValida=true;
        } else {
            alert("Debe contener un numero, letra minuscula, letra mayuscula y tener una longitud minima de 6.")

        }
    
        return contrasenaValida;
    }
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
    const alumno= {
        nombre: document.querySelector("input[name=nombre]").value,
        apellidos: document.querySelector("input[name=Apellidos]").value,
        contrasena: document.querySelector("input[name=contrasena]").value,
        usuario: document.querySelector("input[name=usuario]").value,
        correo: document.querySelector("input[name=correo]").value,
    }

    if(alumno.nombre=="" || alumno.apellidos=="") {
        alert("El nombre y los apellidos son obligatorios");
        return;
    }
    if(!validarContrasena(alumno.contrasena)) {
        alert("Debe contener un numero, letra minuscula, letra mayuscula y tener una longitud minima de 6.")
        return;
    }
    if(!validarCorreo(alumno.correo)) {
        alert("Debe contener un '@' y un '.'")
        return;
    }
    if(alumno.usuario===""){
        alert("Debes pulsar en crear para generar el usuario.");
        return;
    }
    alumnos.push(alumno);
    console.log(alumnos)
    

}

function listarAlumno(){

}