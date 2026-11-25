// =====================================================
//  CLASE DADA POR EL PROFESOR — NO SE MODIFICA, SE USA
// =====================================================
class Pelicula {
    #codigo;
    #titulo;
    #director;
    #genero;
    #precio;
    #alquileres;

    constructor(codigo, titulo, director, genero, precio) {
        this.#codigo = codigo;
        this.#titulo = titulo;
        this.#director = director;
        this.#genero = genero;
        this.#precio = precio;
        this.#alquileres = 0;      // al crearla no se ha alquilado nunca
    }

    getCodigo()     { return this.#codigo; }
    getTitulo()     { return this.#titulo; }
    getDirector()   { return this.#director; }
    getGenero()     { return this.#genero; }
    getPrecio()     { return this.#precio; }
    getAlquileres() { return this.#alquileres; }

    setTitulo(titulo)     { this.#titulo = titulo; }
    setDirector(director) { this.#director = director; }
    setPrecio(precio)     { this.#precio = precio; }

    // Suma un alquiler
    alquilar() {
        this.#alquileres++;
    }

    // Dinero total que ha generado la película
    getRecaudacion() {
        return this.#precio * this.#alquileres;
    }
}
