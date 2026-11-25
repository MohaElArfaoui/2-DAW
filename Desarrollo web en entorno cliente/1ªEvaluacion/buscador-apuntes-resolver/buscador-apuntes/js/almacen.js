"use strict";

/*
 * ALMACEN — todo lo que la app guarda en el navegador. Todo va en IndexedDB:
 *
 *  - Usuario, nombre de la carpeta y la carpeta (FileSystemDirectoryHandle)
 *    -> almacén "config". Antes el usuario iba en localStorage, pero en Chrome
 *    todas las páginas abiertas con doble clic (file://) comparten el mismo
 *    localStorage: un ejercicio que hiciera localStorage.clear() borraría el
 *    usuario. Los ejercicios de clase usan localStorage, no esta base de datos.
 *  - Texto ya extraído de los PDF -> almacén "pdfTexto", como caché.
 */
const Almacen = (() => {
  const NOMBRE_BD = "buscadorApuntes";
  const VERSION_BD = 1;
  const ALMACEN_CONFIG = "config";
  const ALMACEN_PDF = "pdfTexto";

  // Claves antiguas de localStorage (versión 1 de la app), solo para migrarlas
  const ANTIGUA_USUARIO = "buscadorApuntes.usuario";
  const ANTIGUA_CARPETA = "buscadorApuntes.nombreCarpeta";

  let promesaBD = null;

  // Abre (o crea la primera vez) la base de datos. Se reutiliza la misma conexión.
  function abrirBD() {
    if (!promesaBD) {
      promesaBD = new Promise((resolve, reject) => {
        const peticion = indexedDB.open(NOMBRE_BD, VERSION_BD);
        peticion.onupgradeneeded = () => {
          const bd = peticion.result;
          if (!bd.objectStoreNames.contains(ALMACEN_CONFIG)) bd.createObjectStore(ALMACEN_CONFIG);
          if (!bd.objectStoreNames.contains(ALMACEN_PDF)) bd.createObjectStore(ALMACEN_PDF);
        };
        peticion.onsuccess = () => resolve(peticion.result);
        peticion.onerror = () => reject(peticion.error);
      });
      // Si falla, permitimos reintentar más tarde
      promesaBD.catch(() => { promesaBD = null; });
    }
    return promesaBD;
  }

  // IndexedDB funciona con callbacks; esto lo envuelve en una promesa.
  async function operar(almacen, modo, accion) {
    const bd = await abrirBD();
    return new Promise((resolve, reject) => {
      const tx = bd.transaction(almacen, modo);
      const peticion = accion(tx.objectStore(almacen));
      tx.oncomplete = () => resolve(peticion ? peticion.result : undefined);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }

  const leerConfig = (clave) => operar(ALMACEN_CONFIG, "readonly", (s) => s.get(clave)).catch(() => null);
  const guardarConfig = (clave, valor) => operar(ALMACEN_CONFIG, "readwrite", (s) => s.put(valor, clave));

  // Si venimos de la versión anterior, pasamos los datos de localStorage a IndexedDB
  async function migrarDesdeLocalStorage() {
    try {
      const usuario = localStorage.getItem(ANTIGUA_USUARIO);
      const carpeta = localStorage.getItem(ANTIGUA_CARPETA);
      if (usuario !== null && (await leerConfig("usuario")) == null) await guardarConfig("usuario", usuario);
      if (carpeta !== null && (await leerConfig("nombreCarpeta")) == null) await guardarConfig("nombreCarpeta", carpeta);
      localStorage.removeItem(ANTIGUA_USUARIO);
      localStorage.removeItem(ANTIGUA_CARPETA);
    } catch { /* sin localStorage no hay nada que migrar */ }
  }
  const migracion = migrarDesdeLocalStorage();

  return {
    async leerUsuario() { await migracion; return leerConfig("usuario"); },
    guardarUsuario: (nombre) => guardarConfig("usuario", nombre),

    async leerNombreCarpeta() { await migracion; return leerConfig("nombreCarpeta"); },
    guardarNombreCarpeta: (nombre) => guardarConfig("nombreCarpeta", nombre),

    leerCarpeta: () => leerConfig("carpeta"),
    guardarCarpeta: (handle) => guardarConfig("carpeta", handle),

    leerTextoPdf: (clave) => operar(ALMACEN_PDF, "readonly", (s) => s.get(clave)).catch(() => null),
    guardarTextoPdf: (clave, paginas) =>
      operar(ALMACEN_PDF, "readwrite", (s) => s.put(paginas, clave)).catch(() => { /* la caché es opcional */ }),

    // "Borrar usuario": se olvida todo y se vuelve a la configuración inicial
    async borrarTodo() {
      try {
        await operar(ALMACEN_CONFIG, "readwrite", (s) => s.clear());
        await operar(ALMACEN_PDF, "readwrite", (s) => s.clear());
      } catch { /* si no hay IndexedDB no había nada guardado */ }
    },
  };
})();
