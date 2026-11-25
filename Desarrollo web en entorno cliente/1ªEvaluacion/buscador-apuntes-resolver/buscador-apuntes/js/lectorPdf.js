"use strict";

/*
 * LECTOR PDF — extrae el texto de cada página con PDF.js (Mozilla).
 *
 * Se usa la versión 3.11 "legacy" porque trae archivos .js clásicos;
 * las versiones nuevas solo vienen como módulos (.mjs), que no funcionan
 * abriendo la app con doble clic (file://).
 *
 * La librería ocupa ~1,5 MB, así que no se carga hasta que hay un PDF que leer.
 */
const LectorPdf = (() => {
  const RUTA_LIB = "lib/pdf.min.js";
  const RUTA_WORKER = "lib/pdf.worker.min.js";
  let promesaCarga = null;

  function cargarScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("No se pudo cargar " + src));
      document.head.appendChild(s);
    });
  }

  function cargarLibreria() {
    if (!promesaCarga) {
      promesaCarga = (async () => {
        // Con file:// Chrome no deja crear Web Workers. Si cargamos el worker
        // como script normal, PDF.js lo detecta (window.pdfjsWorker) y trabaja
        // en el hilo principal. Con http:// usamos un worker de verdad.
        if (location.protocol === "file:") await cargarScript(RUTA_WORKER);
        await cargarScript(RUTA_LIB);
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = RUTA_WORKER;
      })();
      promesaCarga.catch(() => { promesaCarga = null; });
    }
    return promesaCarga;
  }

  // Devuelve un array con el texto de cada página (índice 0 = página 1)
  async function extraerPaginas(archivo) {
    await cargarLibreria();
    const datos = new Uint8Array(await archivo.arrayBuffer());
    const documento = await window.pdfjsLib.getDocument({
      data: datos,
      isEvalSupported: false,
      disableFontFace: true,
    }).promise;

    const paginas = [];
    try {
      for (let n = 1; n <= documento.numPages; n++) {
        const pagina = await documento.getPage(n);
        const contenido = await pagina.getTextContent();
        const texto = contenido.items
          .map((item) => (item.str || "") + (item.hasEOL ? " " : ""))
          .join("")
          .replace(/\s+/g, " ")
          .trim();
        paginas.push(texto);
        pagina.cleanup();
      }
    } finally {
      await documento.destroy();
    }
    return paginas;
  }

  return { extraerPaginas };
})();
