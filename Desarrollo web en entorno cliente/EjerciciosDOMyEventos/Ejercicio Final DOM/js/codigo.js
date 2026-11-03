// =====================================================
//  EJERCICIO FINAL DOM Y EVENTOS — TiendaDAW
//  Lee el enunciado.pdf antes de empezar.
// =====================================================

// Datos iniciales (objetos "normales", NO son Producto todavía).
// Apartado 1: tienes que convertirlos en objetos de la clase Producto.
const datosIniciales = [
    { codigo: "ELE-001", nombre: "Auriculares", categoria: "Electrónica", precio: 29.99, stock: 10 },
    { codigo: "ELE-002", nombre: "Ratón inalámbrico", categoria: "Electrónica", precio: 15.5, stock: 2 },
    { codigo: "HOG-001", nombre: "Lámpara de mesa", categoria: "Hogar", precio: 22, stock: 0 },
    { codigo: "DEP-001", nombre: "Balón de fútbol", categoria: "Deporte", precio: 18.75, stock: 6 },
    { codigo: "LIB-001", nombre: "El Quijote", categoria: "Libros", precio: 12.9, stock: 4 }
];

/** @type {Producto[]} */
let productos = [];

/** @type {string[]} */
let ventas = [];

// Orden de la tabla: true = precio de menor a mayor, false = de mayor a menor (apartado 6)
let ordenAscendente = true;

// FUERA de iniciar: SOLO el DOMContentLoaded (se pone en document, que siempre existe)
document.addEventListener("DOMContentLoaded", iniciar);

// ❌ FALLO: este listener estaba aquí fuera:
//    document.getElementById("menu").addEventListener("click", mostrarMenu);
//    El script está en el <head> → aquí el <ul id="menu"> aún NO existe → getElementById da null
//    → "Cannot read properties of null (reading 'addEventListener')".
//    Y el error PARA el script: el "let productos" de debajo no llegaba a ejecutarse
//    → luego cargarDatos fallaba con "Cannot access 'productos' before initialization".
// ✅ Todo lo que busca elementos del HTML al arrancar va DENTRO de iniciar().
//
// ❌ FALLO anterior: document.getElementById("inventario").addEventListener("DOMContentLoaded", ...)
//    DOMContentLoaded solo salta en document. Y para mostrar algo al arrancar no hace falta
//    evento: se LLAMA a la función (mostrarSeccion("inventario")).

function iniciar() {
    // 1. Listeners (aquí el HTML ya existe)
    document.getElementById("menu").addEventListener("click", mostrarMenu);                      // apartado 2
    document.querySelector("select[name=categoria]").addEventListener("change", codCategoria);   // apartado 3a
    document.getElementById("formAlta").addEventListener("submit", altaProducto);               // apartado 3b
    document.getElementById("cuerpoTabla").addEventListener("click", accionTabla);              // apartado 5
    document.getElementById("buscador").addEventListener("input", pintarTabla);                 // apartado 6
    document.getElementById("buscador").addEventListener("keydown", teclaBuscador);             // apartado 6
    document.getElementById("filtroCategoria").addEventListener("change", pintarTabla);         // apartado 6
    document.getElementById("btnOrdenar").addEventListener("click", cambiarOrden);              // apartado 6

    // 2. Llamadas iniciales
    cargarDatos();
    crearOferta();                 // Extra A
    mostrarSeccion("inventario");
    pintarTabla();
}

// ---------------- APARTADO 1 ----------------

// ❌ FALLOS que tuviste aquí:
//  - function datosIniciales() → mismo nombre que el array → "Identifier 'datosIniciales' has already been declared".
//  - productos.push(producto) → metías el objeto NORMAL, no un Producto (no tendría getNombre(), vender()...).
//  - new Producto() fuera del bucle y vacío → un solo producto con todo undefined.
//  - Líneas sueltas "producto.codigo;" → leen el valor y lo tiran. Los valores van DENTRO del new.
//  - Producto(...) sin new → "Class constructor Producto cannot be invoked without 'new'".
//  - const producto = new ... dentro del for(const producto...) → "Cannot access 'producto' before initialization".
//  - const productos = new ... → tapa el array → "productos.push is not a function".
//  ✅ 3 nombres distintos: producto (objeto del for) / prod (el new) / productos (el array).
function cargarDatos() {
    for (const producto of datosIniciales) {
        const prod = new Producto(producto.codigo, producto.nombre, producto.categoria, producto.precio, producto.stock);
        productos.push(prod);
    }
}

// ❌ FALLOS que tuviste aquí:
//  - const id = "inventario" dentro → redeclara el parámetro. El valor YA llega desde la llamada.
//  - querySelector → solo coge la PRIMERA. querySelectorAll → todas.
//  - "section[class=.seccion]" (mezcla) / ".section" (es la etiqueta, no la clase) → ✅ ".seccion"
//  - getElementById(id) sin "document." → "getElementById is not defined".
//  - .display sin .style → no hace nada.
//  ✅ Nombres: lista en plural (secciones), cada una en singular (seccion).
function mostrarSeccion(id) {
    const secciones = document.querySelectorAll(".seccion");
    for (const seccion of secciones) {
        seccion.style.display = "none";
    }
    document.getElementById(id).style.display = "block";
}

// ---------------- APARTADO 2 ----------------

// ❌ FALLOS que tuviste aquí:
//  - tagName == "DATA-SECCION" → tagName es la ETIQUETA ("A", "UL"...), data-seccion es un ATRIBUTO.
//  - switch (event.target.id) → los <a> no tienen id (el id lo tienen las <section>).
//  - mostrarSeccion() sin nada dentro → id = undefined → getElementById da null → error.
//  - switch con 3 case que hacen LO MISMO → sobra: data-seccion ya vale lo mismo que el id de la sección.
function mostrarMenu(event) {
    event.preventDefault();                          // el <a href="#"> no salta arriba
    if (event.target.tagName == "A") {               // solo si se ha pulsado un enlace
        const mostrar = event.target.dataset.seccion; // "alta" / "inventario" / "resumen"
        mostrarSeccion(mostrar);

        if (mostrar == "resumen") {                  // la sección resumen hace algo EXTRA
            pintarResumen();
        }
    }
}

// ---------------- APARTADO 3a: código automático ----------------

// ❌ FALLO que tuviste: substring(0,2) → "EL" (2 letras). El 2º número NO se incluye → substring(0,3) = "ELE".
function codCategoria() {
    const categoria = document.querySelector("select[name=categoria]").value;
    const inputCodigo = document.querySelector("input[name=codigo]");

    // 1. Si vuelve a "-- Elige categoría --" (value vacío) → código vacío y salimos
    if (categoria == "") {
        inputCodigo.value = "";
        return;
    }

    // 2. Las 3 primeras letras en mayúscula: "Electrónica" → "ELE"
    const letras = categoria.substring(0, 3).toUpperCase();

    // 3. Cuántos productos hay YA de esa categoría, + 1
    //    filter devuelve un array nuevo solo con los que cumplen la condición → .length = cuántos son
    const numero = productos.filter(p => p.getCategoria() == categoria).length + 1;

    // 4. El número con 3 cifras (sin padStart): 3 → "003", 12 → "012", 125 → "125"
    let cifras;
    if (numero < 10) {
        cifras = "00" + numero;
    } else if (numero < 100) {
        cifras = "0" + numero;
    } else {
        cifras = "" + numero;      // "" + número → lo convierte en texto
    }

    // 5. Juntarlo y meterlo en el input
    inputCodigo.value = letras + "-" + cifras;     // "ELE-003"
}



// ---------------- APARTADO 3b: alta del producto ----------------

/** @param {SubmitEvent} event */
function altaProducto(event) {
    event.preventDefault();       // el submit recargaría la página y se perdería todo

    // 1. Leer los campos (el form tiene name en cada input/select)
    const categoria = document.querySelector("select[name=categoria]").value;
    const codigo = document.querySelector("input[name=codigo]").value;
    let nombre = document.querySelector("input[name=nombre]").value.trim();   // trim: quita espacios de los lados
    const textoPrecio = document.querySelector("input[name=precio]").value;
    const textoStock = document.querySelector("input[name=stock]").value;
    const precio = parseFloat(textoPrecio);    // "45.5" → 45.5   |  "" o "abc" → NaN
    const stock = Number(textoStock);          // "3" → 3   |  "3.5" → 3.5  |  "abc" → NaN

    // 2. Validar: se GUARDAN todos los errores en un array y se enseñan juntos al final
    const errores = [];

    if (categoria == "") {
        errores.push("Debes elegir una categoría");
    }

    if (nombre.length < 3) {
        errores.push("El nombre debe tener al menos 3 caracteres");
    }

    // some → true si ALGÚN producto ya tiene ese nombre (comparando los dos en minúsculas)
    const repetido = productos.some(p => p.getNombre().toLowerCase() == nombre.toLowerCase());
    if (repetido) {
        errores.push("Ya existe un producto con ese nombre");
    }

    if (isNaN(precio) || precio <= 0) {
        errores.push("El precio debe ser un número mayor que 0");
    }

    // Number.isInteger(3) → true | Number.isInteger(3.5) → false | Number.isInteger(NaN) → false
    if (textoStock == "" || !Number.isInteger(stock) || stock < 0) {
        errores.push("El stock debe ser un número entero mayor o igual que 0");
    }

    const mensajes = document.getElementById("mensajes");

    // 3. Si hay errores → lista roja y salimos
    if (errores.length > 0) {
        let lista = "";
        for (const error of errores) {
            lista += `<li>${error}</li>`;
        }
        mensajes.innerHTML = `<div class="alert alert-danger"><ul>${lista}</ul></div>`;
        return;
    }

    // 4. Formatear el nombre: "tECLADO" → "T" + "eclado" → "Teclado"
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

    // 5. Crear el objeto de la clase y guardarlo
    const nuevo = new Producto(codigo, nombre, categoria, precio, stock);
    productos.push(nuevo);

    // 6. Mensaje verde, limpiar el formulario y repintar la tabla
    mensajes.innerHTML = `<div class="alert alert-success">Producto ${codigo} añadido</div>`;
    document.getElementById("formAlta").reset();     // reset vacía también el input del código
    pintarTabla();
}

// ---------------- APARTADO 4 + 6: pintar la tabla (con filtros y orden) ----------------

function pintarTabla() {
    const cuerpo = document.getElementById("cuerpoTabla");
    cuerpo.innerHTML = "";        // 1. vaciar antes del bucle

    // 2. Leer los filtros (apartado 6). Se leen SIEMPRE: así se mantienen al vender, borrar...
    const texto = document.getElementById("buscador").value.trim().toLowerCase();
    const categoria = document.getElementById("filtroCategoria").value;

    // 3. filter → array NUEVO solo con los que cumplen las dos condiciones
    const lista = productos.filter(p =>
        p.getNombre().toLowerCase().includes(texto) &&             // contiene el texto ("" lo contienen todos)
        (categoria == "Todas" || p.getCategoria() == categoria)    // "Todas" o esa categoría
    );

    // 4. Ordenar la COPIA (lista), nunca "productos" → el array original no se desordena
    if (ordenAscendente) {
        lista.sort((a, b) => a.getPrecio() - b.getPrecio());   // menor a mayor
    } else {
        lista.sort((a, b) => b.getPrecio() - a.getPrecio());   // mayor a menor
    }

    // 5. Nada que enseñar → una sola fila que ocupa las 6 columnas
    if (lista.length == 0) {
        cuerpo.innerHTML = `<tr><td colspan="6">No hay productos</td></tr>`;
        return;
    }

    // 6. Una fila por producto con template literal
    for (const p of lista) {
        // Color de la fila según el stock
        let claseFila = "";
        if (p.getStock() == 0) {
            claseFila = "table-danger";       // rojo
        } else if (p.getStock() < 3) {
            claseFila = "table-warning";      // amarillo
        }

        // Precio: normal, o precio final + OFERTA si es un ProductoOferta (Extra A)
        let textoPrecio = p.getPrecio().toFixed(2) + " €";
        if (p instanceof ProductoOferta) {
            textoPrecio = `<s>${p.getPrecio().toFixed(2)} €</s> ${p.getPrecioFinal().toFixed(2)} € <b>OFERTA</b>`;
        }

        // Cada botón lleva DOS data-: qué hace (accion) y de qué producto es (codigo)
        cuerpo.innerHTML += `
            <tr class="${claseFila}">
                <td>${p.getCodigo()}</td>
                <td>${p.getNombre()}</td>
                <td>${p.getCategoria()}</td>
                <td>${textoPrecio}</td>
                <td>${p.getStock()}</td>
                <td>
                    <button class="btn btn-sm btn-success" data-accion="vender" data-codigo="${p.getCodigo()}">Vender</button>
                    <button class="btn btn-sm btn-primary" data-accion="reponer" data-codigo="${p.getCodigo()}">Reponer +5</button>
                    <button class="btn btn-sm btn-danger" data-accion="eliminar" data-codigo="${p.getCodigo()}">Eliminar</button>
                </td>
            </tr>`;
    }
}

// ---------------- APARTADO 5: botones de la tabla (delegación) ----------------

/** @param {Event} event */
function accionTabla(event) {
    const accion = event.target.dataset.accion;   // "vender" / "reponer" / "eliminar"
    const codigo = event.target.dataset.codigo;   // "ELE-001"...

    // Si se ha pulsado una celda (no un botón) → no tiene data-accion → undefined → nada
    if (accion == undefined) {
        return;
    }

    // find → el PRODUCTO (objeto) cuyo código coincide
    const producto = productos.find(p => p.getCodigo() == codigo);

    if (accion == "vender") {
        const vendido = producto.vender(1);       // la clase devuelve true / false
        if (vendido) {
            const hora = new Date().toLocaleTimeString();    // "19:24:45"
            ventas.push(`${hora} - 1 x ${producto.getNombre()} - ${producto.getPrecio().toFixed(2)} €`);
        } else {
            alert("No hay stock de " + producto.getNombre());
        }
    } else if (accion == "reponer") {
        producto.reponer(5);
    } else if (accion == "eliminar") {
        if (confirm("¿Eliminar este producto?\n" + producto.toString())) {
            // findIndex → la POSICIÓN; splice(posición, 1) → borra 1 elemento desde ahí
            const posicion = productos.findIndex(p => p.getCodigo() == codigo);
            productos.splice(posicion, 1);
        }
    }

    pintarTabla();     // después de cualquier botón
}

// ---------------- APARTADO 6: Escape y botón ordenar ----------------
// (el filtro en sí está dentro de pintarTabla; el input y el change llaman directamente a pintarTabla)

/** @param {KeyboardEvent} event */
function teclaBuscador(event) {
    if (event.key == "Escape") {
        event.target.value = "";     // vaciar el buscador
        pintarTabla();
    }
}

function cambiarOrden() {
    ordenAscendente = !ordenAscendente;      // true ↔ false
    const boton = document.getElementById("btnOrdenar");
    if (ordenAscendente) {
        boton.textContent = "Ordenar por precio ↑";
    } else {
        boton.textContent = "Ordenar por precio ↓";
    }
    pintarTabla();
}

// ---------------- APARTADO 7: resumen ----------------

function pintarResumen() {
    let unidades = 0;
    let valor = 0;
    let masCaro = null;
    const agotados = [];

    // Un solo bucle para calcularlo todo
    for (const p of productos) {
        unidades += p.getStock();
        valor += p.getValorTotal();

        if (masCaro == null || p.getPrecio() > masCaro.getPrecio()) {
            masCaro = p;
        }
        if (p.getStock() == 0) {
            agotados.push(p.getNombre());
        }
    }

    let textoMasCaro = "-";
    if (masCaro != null) {
        textoMasCaro = masCaro.getNombre();
    }

    let textoAgotados = "Ninguno";
    if (agotados.length > 0) {
        textoAgotados = agotados.join(", ");    // ["A", "B"] → "A, B"
    }

    document.getElementById("datosResumen").innerHTML = `
        <p><b>Productos:</b> ${productos.length}</p>
        <p><b>Unidades en stock:</b> ${unidades}</p>
        <p><b>Valor del inventario:</b> ${valor.toFixed(2)} €</p>
        <p><b>Producto más caro:</b> ${textoMasCaro}</p>
        <p><b>Agotados:</b> ${textoAgotados}</p>`;

    // Historial: un <li> por venta
    const historial = document.getElementById("historial");
    historial.innerHTML = "";
    if (ventas.length == 0) {
        historial.innerHTML = "<li>Sin ventas</li>";
    } else {
        for (const venta of ventas) {
            historial.innerHTML += `<li>${venta}</li>`;
        }
    }
}

// ---------------- EXTRA A: herencia ----------------

class ProductoOferta extends Producto {
    #descuento;     // porcentaje: 20 = 20 %

    constructor(codigo, nombre, categoria, precio, stock, descuento) {
        super(codigo, nombre, categoria, precio, stock);   // los 5 primeros los guarda la clase padre
        this.#descuento = descuento;
    }

    getDescuento() {
        return this.#descuento;
    }

    getPrecioFinal() {
        return this.getPrecio() - this.getPrecio() * this.#descuento / 100;   // 60 € con 20 % → 48 €
    }
}

function crearOferta() {
    const oferta = new ProductoOferta("DEP-002", "Pala de pádel", "Deporte", 60, 3, 20);
    productos.push(oferta);     // es un Producto también (hereda) → la tabla, vender, etc. funcionan igual
}

// ---------------- EXTRA B (no puntúa, Unidad 5): cargar con fetch ----------------
// Para usarlo: en iniciar() cambia cargarDatos() por cargarDatosFetch() (y abre con Live Server).
// Ojo: fetch es asíncrono → hay que pintar la tabla DENTRO del último then, cuando ya han llegado los datos.
function cargarDatosFetch() {
    fetch("productos.json")
        .then(respuesta => respuesta.json())
        .then(datos => {
            for (const d of datos) {
                productos.push(new Producto(d.codigo, d.nombre, d.categoria, d.precio, d.stock));
            }
            pintarTabla();
        })
        .catch(() => alert("No se han podido cargar los productos"));
}
