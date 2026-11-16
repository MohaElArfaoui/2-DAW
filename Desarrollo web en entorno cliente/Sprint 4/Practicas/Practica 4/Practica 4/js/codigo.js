document.addEventListener("DOMContentLoaded", crearButacas);
document.getElementById("cine").addEventListener("click", clickButaca);

function crearButacas() {
  const cine = document.getElementById("cine");
  const numFilas = 10;
  const numButacas = 20;
  const tabla = document.createElement("table");

  for (let i = 0; i < numFilas; i++) {
    const fila = document.createElement("tr");

    for (let j = 0; j < numButacas; j++) {
      const columna = document.createElement("td");
      const butacaIcono = document.createElement("i");
      butacaIcono.className = "fa-solid fa-couch fa-lg";
      butacaIcono.style.color = "blue";
      columna.appendChild(butacaIcono);
      fila.appendChild(columna);
      butacaIcono.dataset.fila = i + 1;
      butacaIcono.dataset.columna = j + 1;
      butacaIcono.dataset.id = String.fromCharCode(65 + i) + (j + 1);
    }
    tabla.appendChild(fila);
  }
  cine.appendChild(tabla);
}

function clickButaca(event) {
  if (event.target.tagName == "I") {
    const fila = event.target.dataset.fila;
    const columna = event.target.dataset.columna;
    const butacaPulsada = event.target.dataset.id;
    const fecha = document.querySelector("input[name=fecha]").value;
    if (event.target.style.color == "red") {
      event.target.style.color = "blue";
      eliminarReserva(butacaPulsada, fecha);
      console.log(
        "Has deseleccionado la butaca de la fila " +
          fila +
          ", columna " +
          columna,
      );
    } else {
      if (fecha == "") {
        alert("Elige una fecha para reservar");
        return;
      }
      console.log(
        "Seleccionaste la butaca de la fila " + fila + ", columna " + columna,
      );
      crearReserva(butacaPulsada, fecha);
      event.target.style.color = "red";
    }
  }
}

function crearReserva(butacaPulsada, fecha) {
  const hora = document.getElementById("hora").value;
  console.log(hora);

  const reserva = {
    fechaReserva: fecha,
    horaReserva: hora,
    butacaReserva: butacaPulsada,
  };

  const jsonString = JSON.stringify(reserva);

  fetch("http://localhost:9999/crearReserva", {
    method: "POST",
    body: jsonString,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => respuesta.text())
    .then((respuesta) => {
      if (respuesta === "Ok") {
        alert(
          "Reservado dia: " +
            reserva.fechaReserva +
            "-hora: " +
            reserva.horaReserva +
            "-butaca: " +
            reserva.butacaReserva,
        );
      } else {
        alert("registrar");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("conectar con el servidor para reservar");
    });
}

function eliminarReserva(butacaPulsada, fecha) {
  const hora = document.getElementById("hora").value;


  fetch(
    "http://localhost:9999/buscarTodasLasReservas",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
    .then(respuesta => {
    if (respuesta.ok) {
        return respuesta.json();
    }
    throw new Error(respuesta.status);
    })
    .then((datos) => {
      if (datos) {
        for (const r of datos) {
          if (r.butacaReserva == butacaPulsada && r.horaReserva == hora && r.fechaReserva==fecha) {
            const reservaId = r.idReserva;
            if (
              confirm("Seguro que quieres cancelar la reserva del dia: " + r.fechaReserva + " a las " + r.horaReserva +"?",)
            ) {
              fetch("http://localhost:9999/eliminarReserva?idReserva=" + reservaId, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((respuesta) => respuesta.text())
                .then((respuesta) => {
                  if (respuesta === "Ok") {
                    alert("Se ha eliminado correctamente")
                  } else {
                    alert("eliminar");
                  }
                })
                .catch((error) => {
                  console.log(error);
                  alert("conectar con el servidor para eliminar");
                });
            } else {
              alert("No se ha borrado la reserva");
            }
          }
        }
      }
    })
    .catch((error) => {
      console.log("Error" + error + " No hay reservas para mostrar");
      alert("consultar");
    });
}
