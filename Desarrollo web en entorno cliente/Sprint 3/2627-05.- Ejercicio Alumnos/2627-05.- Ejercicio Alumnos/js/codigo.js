document.getElementById("btnCrearUsuario").addEventListener("click", crearUsuario);
document.getElementById("btnRegistrarAlumno").addEventListener("click", registrarAlumno);
const contrasena=document.querySelector("input[name=contrasena]").value;
const correo=document.querySelector("input[name=correo]").value;

function crearUsuario() {
    const nombre=document.querySelector("input[name=nombre]").value;
    const apellido=document.querySelector("input[name=Apellidos").value;
    
    let primerApellido= apellido.split(" ")[0];
    let segundoApellido= apellido.split(" ")[1];
    
    let nombreUsuario=nombre[0];
    
    for (let i = 0; i < primerApellido.length; i++) {
        let letra = primerApellido[i];
        if(i<=2){
            nombreUsuario+=letra;
        }
    }
    for (let i = 0; i < segundoApellido.length; i++) {
        let letra = segundoApellido[i];
        if(i<=2){
            nombreUsuario+=letra;
        }
    }
    nombreUsuario=nombreUsuario.toLowerCase();
    document.querySelector("input[name=usuario]").value=nombreUsuario;

}
function validarContrasena(contrasena){
    const abecedarioMin = 'abcdefghijklmnopqrstuvwxyz';
    const abecedarioMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numerosCadena = '0123456789';
    let contieneNumero=false;
    let letraMin=false;
    let letraMay=false;
    let longitudCorrecta=false;
    let contrasenaValida=false;

    if(contrasena.length>6) {
        longitudCorrecta=true;
    }
    for (let i = 0; i < contrasena.length; i++) {
        let letra = contrasena[i];
        if(abecedarioMin.includes(letra[i])) {
            letraMin=true;
        }
        if(abecedarioMayusculas.includes(letra[i])) {
            letraMay=true;
        }
        if(numerosCadena.includes(letra[i])) {
            contieneNumero=true;
        }
    }
    if(contieneNumero==true && letraMay==true && letraMin==true && longitudCorrecta==true){
        contrasenaValida=true;
    } else {
        alert("Debe contener un numero, letra minuscula y mayuscula y tener una longitud mayor a 6.")
    }
}

function validarCorreo(correo){
    let arroba="@";
    let punto=".";
    let correoValido=false;

    for (let i = 0; i < correo.length; i++) {
        let letra = correo[i];

        if(arroba.includes(letra) && punto.includes(letra)){
            correoValido=true;
        } else {
            alert("Debe contener un @ y un .");
        }
        
    }
}

function registrarAlumno(){
    const alumno ={
        
    }
}