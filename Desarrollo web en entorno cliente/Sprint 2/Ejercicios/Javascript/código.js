let raul = new Usuarios("Raul", "Jimenez Rodriguez", new Date("2000-02-10"), "H");
let lucia = new Usuarios("Lucia", "Martinez Gomez", new Date("1998-07-23"), "M");
let carlos = new Usuarios("Carlos", "Sanchez Lopez", new Date("2003-11-05"), "H");
let alex = new Usuarios("Alex", "Fernandez Ruiz", new Date("2001-04-17"), "O");
let marta = new Usuarios("Marta", "Garcia Perez", new Date("1995-12-30"), "M");
let david = new Usuarios("David", "Moreno Diaz", new Date("1999-09-02"), "H");
let elena = new Usuarios("Elena", "Romero Navarro", new Date("2004-01-14"), "M");
let sergio = new Usuarios("Sergio", "Torres Molina", new Date("1997-06-08"), "H");
let noa = new Usuarios("Noa", "Castillo Ortega", new Date("2002-10-25"), "O");
let paula = new Usuarios("Paula", "Vazquez Herrera", new Date("2000-05-19"), "M");

let users = [raul, lucia, carlos, alex, marta, david, elena, sergio, noa, paula];
let filas="";

for (let i = 0; i < users.length; i++) {
    let user = users[i];
    filas+=`<tr> <td>${user.nombre}</td> <td>${user.apellidos}</td> <td>${user.calcularEdad()}</td> <td>${user.sexo}</td> </tr>`;

}

document.getElementById("tablaUsuarios").innerHTML=filas;