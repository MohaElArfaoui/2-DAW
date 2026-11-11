"use strict";

/*
 * BUSCADOR — filtra el índice que ya está en memoria.
 *
 * La búsqueda es parcial, sin distinguir mayúsculas ni tildes
 * ("validacion" encuentra "Validación"). Si escribes varias palabras,
 * el archivo tiene que contenerlas todas, cada una en la carpeta,
 * en el nombre o en el contenido (ej.: "ud3 fetch").
 */
const Buscador = (() => {
  // "Validación" -> "validacion". NFD separa la letra de su tilde y luego quitamos la tilde.
  function normalizar(texto) {
    return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  function terminos(consulta) {
    return normalizar(consulta).split(/\s+/).filter(Boolean);
  }

  function contieneEnContenido(entrada, termino) {
    if (entrada.contenidoNorm) return entrada.contenidoNorm.includes(termino);
    if (entrada.paginasNorm) return entrada.paginasNorm.some((p) => p.includes(termino));
    return false;
  }

  /**
   * @param indice    array de entradas creado por el Indexador
   * @param ts        términos normalizados
   * @param opciones  { enCarpeta, enNombre, enContenido, tipos: Set }
   * @returns array de { entrada, puntos, motivos: Set } ordenado por relevancia
   */
  function buscar(indice, ts, opciones) {
    if (!ts.length) return [];
    const resultados = [];

    for (const entrada of indice) {
      if (!opciones.tipos.has(entrada.tipo)) continue;

      let puntos = 0;
      let coincideTodo = true;
      const motivos = new Set();

      for (const t of ts) {
        let encontrado = false;
        if (opciones.enNombre && entrada.nombreNorm.includes(t)) {
          puntos += 10; motivos.add("nombre"); encontrado = true;
        }
        if (opciones.enCarpeta && entrada.carpetaNorm.includes(t)) {
          puntos += 6; motivos.add("carpeta"); encontrado = true;
        }
        if (opciones.enContenido && contieneEnContenido(entrada, t)) {
          puntos += 1; motivos.add("contenido"); encontrado = true;
        }
        if (!encontrado) { coincideTodo = false; break; }
      }

      if (coincideTodo) resultados.push({ entrada, puntos, motivos });
    }

    resultados.sort((a, b) => b.puntos - a.puntos || a.entrada.ruta.localeCompare(b.entrada.ruta));
    return resultados;
  }

  // Recorta un texto largo dejando visible la zona donde aparece el término
  function recortarAlrededor(texto, ts, ancho) {
    if (texto.length <= ancho) return texto;
    const norm = normalizar(texto);
    let pos = -1;
    for (const t of ts) {
      const i = norm.indexOf(t);
      if (i !== -1 && (pos === -1 || i < pos)) pos = i;
    }
    if (pos === -1) pos = 0;
    const inicio = Math.max(0, pos - Math.floor(ancho / 3));
    const fin = Math.min(texto.length, inicio + ancho);
    return (inicio > 0 ? "…" : "") + texto.slice(inicio, fin) + (fin < texto.length ? "…" : "");
  }

  // Líneas de un archivo de texto donde aparece algún término
  function fragmentosTexto(entrada, ts, maximo) {
    const res = { lista: [], total: 0 };
    if (!entrada.contenido) return res;
    if (!entrada._lineas) { // se calcula solo la primera vez que hace falta
      entrada._lineas = entrada.contenido.split(/\r?\n/);
      entrada._lineasNorm = entrada._lineas.map(normalizar);
    }
    entrada._lineasNorm.forEach((linea, i) => {
      if (ts.some((t) => linea.includes(t))) {
        res.total++;
        if (res.lista.length < maximo) {
          res.lista.push({ linea: i + 1, texto: recortarAlrededor(entrada._lineas[i].trim(), ts, 140) });
        }
      }
    });
    return res;
  }

  // Páginas de un PDF donde aparece algún término
  function fragmentosPdf(entrada, ts, maximo) {
    const res = { lista: [], total: 0 };
    if (!entrada.paginasNorm) return res;
    entrada.paginasNorm.forEach((pagina, i) => {
      if (ts.some((t) => pagina.includes(t))) {
        res.total++;
        if (res.lista.length < maximo) {
          res.lista.push({ pagina: i + 1, texto: recortarAlrededor(entrada.paginas[i], ts, 150) });
        }
      }
    });
    return res;
  }

  return { normalizar, terminos, buscar, fragmentosTexto, fragmentosPdf };
})();
