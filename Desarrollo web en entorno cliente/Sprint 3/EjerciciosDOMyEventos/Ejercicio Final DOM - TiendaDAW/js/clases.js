// =====================================================
//  CLASE DADA POR EL PROFESOR — NO SE MODIFICA, SE USA
// =====================================================
class Producto {
    #codigo;
    #nombre;
    #categoria;
    #precio;
    #stock;

    constructor(codigo, nombre, categoria, precio, stock) {
        this.#codigo = codigo;
        this.#nombre = nombre;
        this.#categoria = categoria;
        this.#precio = precio;
        this.#stock = stock;
    }

    getCodigo()    { return this.#codigo; }
    getNombre()    { return this.#nombre; }
    getCategoria() { return this.#categoria; }
    getPrecio()    { return this.#precio; }
    getStock()     { return this.#stock; }

    setPrecio(precio) { this.#precio = precio; }

    // Resta "cantidad" al stock.
    // Devuelve true si se ha podido vender y false si no hay stock suficiente.
    vender(cantidad) {
        if (cantidad > this.#stock) {
            return false;
        }
        this.#stock -= cantidad;
        return true;
    }

    // Suma "cantidad" al stock
    reponer(cantidad) {
        this.#stock += cantidad;
    }

    // Precio * stock
    getValorTotal() {
        return this.#precio * this.#stock;
    }

    toString() {
        return `${this.#codigo} - ${this.#nombre} (${this.#categoria}) - ${this.#precio.toFixed(2)} € - Stock: ${this.#stock}`;
    }
}
