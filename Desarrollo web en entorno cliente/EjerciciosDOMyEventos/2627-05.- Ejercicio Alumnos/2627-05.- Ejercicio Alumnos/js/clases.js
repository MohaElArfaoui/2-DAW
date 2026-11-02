// Clase alumno
class Alumno {
    #nombre;
    #apellidos;
    #usuario;
    #contrasena;
    #correo;
    #notas;
    
    constructor(n, a, u, c, co){
        this.#nombre = n;
        this.#apellidos = a;
        this.#usuario = u;
        this.#contrasena = c;
        this.#correo = co;
        this.#notas = [];
    }

    getNombre(){
        return this.#nombre;
    }

    setNombre(value){
        this.#nombre = value;
    }

    getApellidos(){
        return this.#apellidos;
    }

    setApellidos(value){
        this.#apellidos = value;
    }

    getUsuario(){
        return this.#usuario;
    }

    setUsuario(value){
        this.#usuario = value;
    }

    getContrasena(){
        return this.#contrasena;
    }

    setContrasena(value){
        this.#contrasena = value;
    }

    getCorreo(){
        return this.#correo;
    }

    setCorreo(value){
        this.#correo = value;
    }

    //Devuelve la longitud del array de notas del alumno en cuestión
    getLongitudArrayNotas(){
        return this.#notas.length;
    }

    //Devuelve el valor de la nota de la celda del array cuyo indice es "indice"
    getNota(indice){
        return this.#notas[indice].getNota();
    }

    //Devuelve el nombre de la asignatura y el valor de la nota de la celda del array cuyo indice es "indice" en formato "asignatura:valor"
    getAsignaturaYNota(indice){
        return this.#notas[indice].getAsignatura()+":"+this.#notas[indice].getNota();
    }

    //Se guarda un objeto nota en el array de notas del alumno
    altaNota(oNota){
        let existe;
        if (this.#notas.find(notaBuscada => notaBuscada._asignatura == oNota._asignatura)){
            existe = true;
        }else{
            existe = false;
            this.#notas.push(oNota);
        }
        return existe;
    }
}


//Clase nota
class Nota{
    _asignatura;
    _nota;

    constructor(a, n){
        this._asignatura = a;
        this._nota = n;
    }

    getAsignatura(){
        return this._asignatura;
    }

    getNota(){
        return this._nota;
    }

    setAsignatura(value){
        this._asignatura = value;
    }

    setNota(value){
        this._nota = value;
    }

}


