"use strict";

/*
 * INDEXADOR — recorre la carpeta una sola vez y guarda en memoria
 * lo necesario para buscar rápido (índice). Buscar luego es solo filtrar
 * un array, sin volver a tocar el disco.
 *
 * Cada entrada del índice:
 * {
 *   id, ruta: "UD3/ejercicio5/main.js", carpeta: "UD3/ejercicio5", nombre: "main.js",
 *   tipo: "html" | "css" | "js" | "java" | "datos" | "pdf" | "recurso",
 *   ext: "json", archivo: File, tamano, modificado,
 *   carpetaNorm, nombreNorm,                  -> versiones normalizadas para buscar
 *   contenido, contenidoNorm                  -> solo archivos de texto
 *   paginas, paginasNorm, pdfEstado           -> solo PDF (se rellenan después)
 * }
 */
const Indexador = (() => {
  // Extensiones que se indexan. Si quieres más tipos, añádelos aquí,
  // en los filtros del index.html y en los colores del CSS (.tipo-xxx).
  //  - "datos": se buscan y se ven como el código (chip Datos).
  //  - "recurso": imágenes y fuentes. NO salen en la búsqueda; solo se
  //    guardan para que la vista previa pueda mostrarlas.
  const TIPOS = {
    html: "html", htm: "html", css: "css", js: "js", mjs: "js", java: "java", pdf: "pdf",
    json: "datos", xml: "datos", csv: "datos", txt: "datos",
    png: "recurso", jpg: "recurso", jpeg: "recurso", gif: "recurso", svg: "recurso", webp: "recurso",
    ico: "recurso", bmp: "recurso", woff: "recurso", woff2: "recurso", ttf: "recurso", otf: "recurso",
  };

  // Carpetas que no se recorren (dependencias, compilados, configuración del editor...).
  // Además se saltan todas las que empiezan por punto (.git, .vscode, .idea...).
  const CARPETAS_IGNORADAS = new Set(["node_modules", "target", "bin", "obj", "__pycache__"]);

  // Archivos que no sirven de nada al buscar (package-lock.json es enorme y autogenerado)
  const ARCHIVOS_IGNORADOS = new Set(["package-lock.json"]);

  const MAX_TEXTO = 2 * 1024 * 1024;  // archivos de texto mayores: solo se busca por nombre
  const MAX_PDF = 60 * 1024 * 1024;   // PDFs mayores: no se lee su texto
  const LOTE = 16;                    // archivos que se leen a la vez

  let siguienteId = 1;

  function extensionDe(nombre) {
    const punto = nombre.lastIndexOf(".");
    return punto < 0 ? "" : nombre.slice(punto + 1).toLowerCase();
  }

  function tipoDe(nombre) {
    if (ARCHIVOS_IGNORADOS.has(nombre.toLowerCase())) return null;
    return TIPOS[extensionDe(nombre)] || null;
  }

  function ignorarCarpeta(nombre) {
    return nombre.startsWith(".") || CARPETAS_IGNORADAS.has(nombre.toLowerCase());
  }

  const unir = (ruta, nombre) => (ruta ? ruta + "/" + nombre : nombre);

  // --- 1. LISTAR ARCHIVOS -------------------------------------------------

  // Chrome/Edge: recorrido recursivo con el handle de la carpeta
  async function listarDesdeCarpeta(carpeta, ruta, lista, ctx) {
    for await (const [nombre, handle] of carpeta.entries()) {
      if (ctx.cancelado()) return lista;
      if (handle.kind === "directory") {
        if (!ignorarCarpeta(nombre)) await listarDesdeCarpeta(handle, unir(ruta, nombre), lista, ctx);
      } else if (tipoDe(nombre)) {
        lista.push({ ruta: unir(ruta, nombre), obtener: () => handle.getFile() });
        if (lista.length % 200 === 0) ctx.alProgreso({ fase: "explorando", hechos: lista.length });
      }
    }
    return lista;
  }

  // Plan B (<input webkitdirectory>): el navegador ya nos da todos los archivos
  function listarDesdeArchivos(archivos) {
    const lista = [];
    for (const archivo of archivos) {
      const partes = archivo.webkitRelativePath.split("/").slice(1); // quitamos la carpeta raíz
      if (!tipoDe(archivo.name)) continue;
      if (partes.slice(0, -1).some(ignorarCarpeta)) continue;
      lista.push({ ruta: partes.join("/"), obtener: async () => archivo });
    }
    return lista;
  }

  // --- 2. LEER CONTENIDO --------------------------------------------------

  // Casi todo será UTF-8, pero algunos archivos hechos en Windows usan
  // Windows-1252 y las tildes saldrían como �. En ese caso se vuelve a decodificar.
  async function leerTexto(archivo) {
    const bytes = await archivo.arrayBuffer();
    const utf8 = new TextDecoder("utf-8").decode(bytes);
    if (!utf8.includes("�")) return utf8;
    return new TextDecoder("windows-1252").decode(bytes);
  }

  function crearEntrada(ruta, archivo) {
    const corte = ruta.lastIndexOf("/");
    const carpeta = corte >= 0 ? ruta.slice(0, corte) : "";
    const nombre = ruta.slice(corte + 1);
    return {
      id: siguienteId++,
      ruta, carpeta, nombre,
      tipo: tipoDe(nombre),
      ext: extensionDe(nombre),
      archivo,
      tamano: archivo.size,
      modificado: archivo.lastModified,
      carpetaNorm: Buscador.normalizar(carpeta),
      nombreNorm: Buscador.normalizar(nombre),
      contenido: null, contenidoNorm: null,
      paginas: null, paginasNorm: null,
      pdfEstado: null,
    };
  }

  async function procesar(item) {
    try {
      const archivo = await item.obtener();
      const entrada = crearEntrada(item.ruta, archivo);
      if (entrada.tipo === "pdf") {
        entrada.pdfEstado = archivo.size > MAX_PDF ? "grande" : "pendiente";
      } else if (entrada.tipo === "recurso") {
        // Imágenes y fuentes: no se leen ahora; la vista previa las lee si las necesita
      } else if (archivo.size <= MAX_TEXTO) {
        entrada.contenido = await leerTexto(archivo);
        entrada.contenidoNorm = Buscador.normalizar(entrada.contenido);
      }
      return entrada;
    } catch {
      return null; // archivo bloqueado o borrado mientras leíamos: lo saltamos
    }
  }

  /**
   * Crea el índice de archivos de texto y PDFs (de los PDF solo nombre por ahora).
   * @param fuente { tipo: "carpeta", handle } | { tipo: "archivos", archivos }
   * @param ctx    { cancelado: () => boolean, alProgreso: (info) => void }
   */
  async function indexar(fuente, ctx) {
    ctx.alProgreso({ fase: "explorando", hechos: 0 });
    const lista = fuente.tipo === "carpeta"
      ? await listarDesdeCarpeta(fuente.handle, "", [], ctx)
      : listarDesdeArchivos(fuente.archivos);

    const indice = [];
    for (let i = 0; i < lista.length; i += LOTE) {
      if (ctx.cancelado()) return [];
      const lote = await Promise.all(lista.slice(i, i + LOTE).map(procesar));
      for (const entrada of lote) if (entrada) indice.push(entrada);
      ctx.alProgreso({ fase: "leyendo", hechos: Math.min(i + LOTE, lista.length), total: lista.length });
    }
    return indice;
  }

  /**
   * Segunda pasada, en segundo plano: texto de los PDF.
   * Lo ya leído en otra sesión sale de la caché de IndexedDB al instante.
   */
  async function leerPdfs(indice, nombreRaiz, ctx) {
    const pdfs = indice.filter((e) => e.tipo === "pdf" && e.pdfEstado === "pendiente");
    for (let i = 0; i < pdfs.length; i++) {
      if (ctx.cancelado()) return;
      const entrada = pdfs[i];
      const clave = `${nombreRaiz}/${entrada.ruta}|${entrada.tamano}|${entrada.modificado}`;
      try {
        let paginas = await Almacen.leerTextoPdf(clave);
        if (!paginas) {
          paginas = await LectorPdf.extraerPaginas(entrada.archivo);
          await Almacen.guardarTextoPdf(clave, paginas);
        }
        entrada.paginas = paginas;
        entrada.paginasNorm = paginas.map(Buscador.normalizar);
        // Un PDF escaneado (fotos) no tiene texto que buscar
        entrada.pdfEstado = paginas.some((p) => p.length > 0) ? "listo" : "sin-texto";
      } catch {
        entrada.pdfEstado = "error"; // protegido con contraseña o dañado
      }
      ctx.alProgreso({ fase: "pdf", hechos: i + 1, total: pdfs.length });
    }
  }

  return { indexar, leerPdfs, leerTexto };
})();
