document
  .getElementById("gestionSesion")
  .addEventListener("click", gestionarSesion);
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



function mostrarInfoPelis(event){

  
    let peliculaId=event.target.dataset.idpelicula;
  
    if (peliculaId == undefined || peliculaId == "") {
      return;
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
    .then((pelicula) => {
      if (pelicula) {
        ocultar();
        document.getElementById("capaPeliculas").style.display = "flex";
        document.getElementById("detallesPelicula").style.display = "flex";
        const titulo=document.getElementById("tituloPelicula");
        titulo.innerHTML=pelicula.titulo;
        const sinopsis=document.getElementById("sinopsisPelicula");
        sinopsis.innerHTML=pelicula.sinopsis;
        const duracion=document.getElementById("duracionPelicula");
        duracion.innerHTML=pelicula.duracion;
      }
    })
    .catch((error) => {
      console.log("Error" + error + " Usuario no encontrado");
      alert("No se han podido cargar los detalles de la película");
    });

}


function mostrarRegistroUsuario() {
  ocultar();
  document.getElementById("formUsuario").style.display = "flex";
}

function gestionarSesion(){
     const botonInicio = document.getElementById("gestionSesion");

  if (botonInicio.innerHTML == "Cerrar Sesión") {
    ocultar();
    botonInicio.innerHTML = "Iniciar Sesión";
  } else {
    ocultar();
    document.getElementById("formLoginUsuario").style.display = "flex";
  }
}


function loginUsuario() {
  if (validarLoginUsuario() == false) {
    return;
  }


  
  const nombreUsuario = document.getElementById("usuarioLogin").value;
  const pwdUsuario = document.getElementById("contrasenaLogin").value;
  


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
        const botonInicio = document.getElementById("gestionSesion");
        botonInicio.innerHTML = "Cerrar Sesión";
        document.getElementById("capaPeliculas").style.display = "flex";
      }
    })
    .catch((error) => {
      console.log("Error" + error + " Usuario no encontrado");
      alert("Usuario o contraseña incorrectos");
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
        alert("No se ha podido registrar el usuario");
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
