// Clase Viviendas
class Viviendas {
    #tipo;
    #direccion;
    #codigoPostal;
    #precio;
    
    constructor(t, d, cp, p){
        this.#tipo = t;
        this.#direccion = d;
        this.#codigoPostal = cp;
        this.#precio = p;
    }

    getTipo(){
        return this.#tipo;
    }

    getDireccion(){
        return this.#direccion;
    }

    getCodigoPostal(){
        return this.#codigoPostal;
    }

    getPrecio(){
        return this.#precio;
    }

    setTipo(value){
        this.#tipo = value;
    }

    setDireccion(value){
        this.#direccion = value;
    }

    setCodigoPostal(value){
        this.#codigoPostal = value;
    }

    setPrecio(value){
        this.#precio = value;
    }

}

