class Usuarios {
  #nombre = "";
  #apellidos = "";
  #fechaNacimiento = "";
  #sexo = "";

    constructor(nombre, apellidos, fechaNacimiento, sexo) {
    this.nombre=nombre;
    this.apellidos=apellidos;
    this.fechaNacimiento=fechaNacimiento;
    this.sexo=sexo;
  }
  get nombre() {
    return this.#nombre;
  }
  set nombre(value) {
    this.#nombre = value;
  }
  get apellidos() {
    return this.#apellidos;
  }
  set apellidos(value) {
    this.#apellidos = value;
  }
  get fechaNacimiento() {
    return this.#fechaNacimiento;
  }
  set fechaNacimiento(value) {
    this.#fechaNacimiento = value;
  }
  get sexo() {
    return this.#sexo;
  }
  set sexo(value) {
    this.#sexo = value;
  }

  /**
   * 
   */
  calcularEdad() {
    let fechaActual= new Date();
    let anio=Number(fechaActual.getFullYear());
    let anioNacimiento=Number(this.#fechaNacimiento.getFullYear());
    let edad=Number(anio - anioNacimiento);

    return edad;
  }



}
