      /*Clase CuentaBancaria — titular y saldo (privado con #saldo). 
      Métodos ingresar, retirar (que no deje quedarse en negativo) y 
      un getter saldo. Bonus: una clase CuentaAhorro que herede de ella con un método aplicarInteres(porcentaje).*/

      class CuentaBancaria {
        #titular="";
        #saldo=0;

        constructor(titular, saldo) {
            this.#saldo=saldo;
            this.#titular=titular;
        }
        get titular(){
            return this.#titular;
        }
        set titular(value) {
            this.#titular=value;
        }
        get saldo(){
            return this.#saldo;
        }

        ingresar(cantidad) {
            return this.#saldo+=cantidad;
        }

        retirar(cantidad) {
            if(this.#saldo<cantidad) {
                alert("No hay suficiente saldo")
            } else {
                return this.#saldo-=cantidad
            }
        }

      }

// Bonus: CuentaAhorro hereda de CuentaBancaria
class CuentaAhorro extends CuentaBancaria {
    constructor(titular, saldo) {
        super(titular, saldo);
    }

    aplicarInteres(porcentaje) {
        // #saldo es privado de CuentaBancaria: se lee con el getter y se suma con ingresar
        let intereses = this.saldo * porcentaje / 100;
        this.ingresar(intereses);
    }
}

let cuenta = new CuentaBancaria("Ana", 500);

cuenta.ingresar(100);
console.log("saldo: " + cuenta.saldo)
cuenta.retirar(189);
console.log("saldo: " + cuenta.saldo)
cuenta.ingresar(27);
console.log("saldo: " + cuenta.saldo)
cuenta.retirar(264);
console.log("saldo: " + cuenta.saldo)

let ahorro = new CuentaAhorro("Luis", 200);
ahorro.aplicarInteres(5);
console.log("saldo ahorro: " + ahorro.saldo)
ahorro.retirar(60);
console.log("saldo ahorro: " + ahorro.saldo)



