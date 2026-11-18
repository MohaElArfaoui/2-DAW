document
  .getElementById("gestionSesion")
  .addEventListener("click", mostrarInicioSesion);
document
  .getElementById("regUsuario")
  .addEventListener("click", mostrarRegistroUsuario);
document
  .getElementById("btnLoginUsuario")
  .addEventListener("click", loginUsuario);

document.getElementById("btnRegistrarUsuario").addEventListener("click",registrarUsuario);

document.getElementById("capaPeliculas").addEventListener("click", mostrarInfoPelis);


ocultar();



function ocultar() {
  document.getElementById("formLoginUsuario").style.display = "none";
  document.getElementById("formUsuario").style.display = "none";
  document.getElementById("capaPeliculas").style.display = "none";
  document.getElementById("detallesPelicula").style.display = "none";


}

function mostrarInfoPeli1(){
      document.getElementById("detallesPelicula").style.display = "flex";
    return true;
}
function mostrarInfoPeli2(){
      document.getElementById("detallesPelicula").style.display = "flex";
    return true;
}
function mostrarInfoPeli3(){
      document.getElementById("detallesPelicula").style.display = "flex";
    return true;
}
function mostrarInfoPeli4(){
      document.getElementById("detallesPelicula").style.display = "flex";
    return true;
}

function mostrarInfoPelis(){

    const peliculaId=0;

    const pelicula1=document.querySelector("class[data-idPelicula=1]")
    pelicula1.addEventListener("click",mostrarInfoPeli1)
    
    const pelicula2=document.querySelector("class[data-idPelicula=2]")
    pelicula2.addEventListener("click",mostrarInfoPeli2)
    const pelicula3=document.querySelector("class[data-idPelicula=3]")
    pelicula3.addEventListener("click",mostrarInfoPeli3)
    const pelicula4=document.querySelector("class[data-idPelicula=4]")
    pelicula4.addEventListener("click",mostrarInfoPeli4)
    
    if(pelicula1 == true){
        peliculaId=pelicula1
    }
    if(pelicula2 == true){
        peliculaId=pelicula1
    }
    if(pelicula3 == true){
        peliculaId=pelicula1
    }
    if(pelicula4 == true){
        peliculaId=pelicula1
    }


fetch(
    "http://localhost:9999/buscarPeliculaPorId?idPelicula=" + peliculaId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      }
      throw new Error(respuesta.status);
    })
    .then((usuario) => {
      if (usuario) {
        ocultar();
        document.getElementById("detallesPelicula").style.display = "flex";
      }
    })
    .catch((error) => {
      console.log("Error" + error + " Usuario no encontrado");
      alert("encontrar");
    });

}

function mostrarInicioSesion() {
  ocultar();
  document.getElementById("formLoginUsuario").style.display = "flex";
}

function mostrarRegistroUsuario() {
  ocultar();
  document.getElementById("formUsuario").style.display = "flex";
}

function loginUsuario() {
  if (validarLoginUsuario() == false) {
    return;
  }
  const botonInicio = document.getElementById("gestionSesion");
  botonInicio.innerHTML = "Cerrar Sesión";

  
  const nombreUsuario = document.getElementById("usuarioLogin").value;
  const pwdUsuario = document.getElementById("contrasenaLogin").value;
  
  if (nombreUsuario == "") {
      return;
    }
    if (pwdUsuario == "") {
        return;
    }



  fetch(
    "http://localhost:9999/buscarUsuarioPorLogin?nombreUsuario=" +
      nombreUsuario +
      "&pwdUsuario=" +
      pwdUsuario,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      }
      throw new Error(respuesta.status);
    })
    .then((usuario) => {
      if (usuario) {
        ocultar();
        document.getElementById("capaPeliculas").style.display = "flex";
      }
    })
    .catch((error) => {
      console.log("Error" + error + " Usuario no encontrado");
      alert("encontrar");
    });
}

function validarLoginUsuario() {
  const nombreUsuario = document.getElementById("usuarioLogin").value.trim();
  const pwdUsuario = document.getElementById("contrasenaLogin").value.trim();

  if (nombreUsuario == "" || pwdUsuario == "") {
    alert("Rellena todos los campos");
    return false;
  }
  return true;
}

function registrarUsuario() {
  if (validarRegistrarUsuario() == false) {
    return;
  }
  let idUsuario=0;
  const insertarUsuario = {
    idUsuario: idUsuario,
    nombreUsuario: document.getElementById("usuario").value,
    pwdUsuario: document.getElementById("contrasena").value,
  };

  fetch("http://localhost:9999/registrarUsuario", {
    method: "POST",
    body: JSON.stringify(insertarUsuario),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => respuesta.text())
    .then((respuesta) => {
      if (respuesta === "Ok") {
        alert("Usuario Registrado");
        ocultar();
        document.getElementById("formLoginUsuario").style.display = "flex";
      } else {
        alert("insertar");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("conectar con el servidor para insertar");
    });
}

function validarRegistrarUsuario() {
  const nombreUsuario = document.getElementById("usuario").value.trim();
  const pwdUsuario = document.getElementById("contrasena").value.trim();
  const contraseniaRepetida = document
    .getElementById("contrasenaRepetida")
    .value.trim();

  if (nombreUsuario == "" || pwdUsuario == "" || contraseniaRepetida == "") {
    alert("Los campos deben estar rellenos");
    return false;
  }
  if (pwdUsuario != contraseniaRepetida) {
    alert("Las contraseñas deben de coincidir");
    return false;
  }
  if (pwdUsuario.length < 6) {
    alert("Debe tener una longitud minima de 6")
    return false;
  }
  return true;
}
