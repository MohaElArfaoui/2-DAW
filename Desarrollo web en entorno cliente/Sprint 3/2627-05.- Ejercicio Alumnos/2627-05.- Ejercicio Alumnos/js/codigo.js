document.getElementById("btnCrearUsuario").addEventListener("click", crearUsuario);
document.getElementById("btnRegistrarAlumno").addEventListener("click", registrarAlumno);
document.getElementById("btnRegistrarNotas").addEventListener("click", registrarNota);

const contrasena=document.querySelector("input[name=contrasena]").value;
const correo=document.querySelector("input[name=correo]").value;

function crearUsuario() {
    const nombre=document.querySelector("input[name=nombre]").value;
    const apellido=document.querySelector("input[name=Apellidos]").value;
    
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
        if(abecedarioMin.includes(letra)) {
            letraMin=true;
        }
        if(abecedarioMayusculas.includes(letra)) {
            letraMay=true;
        }
        if(numerosCadena.includes(letra)) {
            contieneNumero=true;
        }
    }
    if(contieneNumero==true && letraMay==true && letraMin==true && longitudCorrecta==true){
        contrasenaValida=true;
    } else {
        alert("Debe contener un numero, letra minuscula y mayuscula y tener una longitud mayor a 6.")
    }
    return contrasenaValida;
}

function validarCorreo(correo) {

    if (correo.includes("@") && correo.includes(".")) {
        return true;
    }
    alert("Debe contener un @ y un .");
    return false;

}
const alumnos=[];
function registrarAlumno(){
        const nombre = document.querySelector("input[name=nombre]").value;
        const apellido = document.querySelector("input[name=Apellidos]").value;
        const usuario = document.querySelector("input[name=usuario]").value;
        const contrasena = document.querySelector("input[name=contrasena]").value;
        const correo = document.querySelector("input[name=correo]").value;
    
        if(validarContrasena(contrasena) && validarCorreo(correo)){
            alumnos.push(new Alumno(nombre, apellido, usuario, contrasena, correo));
            alert("Se ha registrado correctamente");
            const option = document.createElement("option");
            option.value=usuario;
            option.textContent=nombre + " " + apellido;
            document.getElementById("selAlumno").appendChild(option);
            

    }
}

function registrarNota() {
    const usuario=document.getElementById("selAlumno").value;
    const asignatura=document.getElementById("selNota").value;
    const  valor= parseFloat(document.getElementById("nota").value);

    for (const alumno of alumnos) {
        if(alumno.getUsuario()==usuario){
            if(alumno.altaNota(new Nota(asignatura, valor))){
                alert("Ese alumno ya tiene nota en esa asignatura");
            } else {
                alert("Nota registrada")
            }
        }
    }
}
