// =====================================================
//  CLASE DADA POR EL PROFESOR — NO SE MODIFICA, SE USA
// =====================================================
class Libro {
    #isbn;
    #titulo;
    #autor;
    #anio;
    #prestado;

    constructor(isbn, titulo, autor, anio) {
        this.#isbn = isbn;
        this.#titulo = titulo;
        this.#autor = autor;
        this.#anio = anio;
        this.#prestado = false;     // todos los libros empiezan disponibles
    }

    getIsbn()    { return this.#isbn; }
    getTitulo()  { return this.#titulo; }
    getAutor()   { return this.#autor; }
    getAnio()    { return this.#anio; }
    isPrestado() { return this.#prestado; }

    setTitulo(titulo) { this.#titulo = titulo; }
    setAutor(autor)   { this.#autor = autor; }
    setAnio(anio)     { this.#anio = anio; }

    // Cambia de disponible a prestado y al revés
    cambiarEstado() {
        this.#prestado = !this.#prestado;
    }
}
