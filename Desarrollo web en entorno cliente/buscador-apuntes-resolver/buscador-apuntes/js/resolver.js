"use strict";

/*
 * RESOLVER — "¿cómo resolví algo parecido?"
 *
 * Pegas un enunciado y:
 *   1. Detecta los PATRONES que pide (delegación, eliminar con splice, fetch…)
 *      y, para cada uno, busca un EJEMPLO REAL en tus archivos (archivo + línea).
 *   2. Ordena tus EJERCICIOS (carpetas) por parecido con el enunciado (BM25).
 *   3. Busca la TEORÍA relacionada en las páginas de tus PDF (BM25).
 *
 * No usa internet ni IA: solo compara palabras. No escribe la solución;
 * te lleva a cómo lo hiciste tú en un ejercicio parecido.
 */
const Resolver = (() => {
  // ---------------------------------------------------------------------
  // PATRONES: palabras del enunciado -> técnica + plantilla + firma en el código
  //   claves: se buscan en el enunciado normalizado (sin tildes, minúsculas)
  //   firma:  expresión regular para encontrar un ejemplo real en tus archivos
  // ---------------------------------------------------------------------
  const PATRONES = [
    { nombre: "Delegación de eventos", claves: ["delegacion", "cualquier", "pulse en", "pulsar en"],
      plantilla: 'contenedor.addEventListener("click", e => {\n  const id = e.target.dataset.id;\n  if (id === undefined) return;\n});',
      firma: /event\.target\.dataset\.|e\.target\.dataset\./ },
    { nombre: "Atributos data-", claves: ["data-", "delegacion", "cada fila", "cada boton"],
      plantilla: "celda.dataset.id = obj.id;   // al crear\ne.target.dataset.id           // al pulsar",
      firma: /\.dataset\.\w+\s*=/ },
    { nombre: "Buscar un objeto (find)", claves: ["ficha", "seleccionad", "su informacion", "sus datos"],
      plantilla: "const obj = array.find(o => o.id == id);",
      firma: /\.find\(\s*\(?\w+\)?\s*=>/ },
    { nombre: "Eliminar (confirm + findIndex + splice)", claves: ["eliminar", "eliminacion", "borrar", "confirmacion", "confirmar"],
      plantilla: 'if (!confirm("¿Seguro?")) return;\nconst pos = array.findIndex(o => o.id == sel.id);\narray.splice(pos, 1);',
      firma: /\.splice\(/ },
    { nombre: "Un botón, dos modos (registrar / actualizar)", claves: ["actualizar", "actualizacion", "modificar", "modificacion", "editar"],
      plantilla: 'if (boton.innerHTML == "Registrar") { array.push(nuevo); }\nelse { sel.setNombre(nombre); /* modificar */ }',
      firma: /innerHTML\s*==\s*["'](Registrar|Actualizar|Editar|Modificar)/ },
    { nombre: "Instanciar una clase", claves: ["clase", "instanci", "objeto de la clase"],
      plantilla: "for (const d of datos) lista.push(new Clase(d.a, d.b));",
      firma: /new [A-Z]\w+\(/ },
    { nombre: "DOMContentLoaded", claves: ["cargado el dom", "cargado el documento", "al cargar la pagina"],
      plantilla: 'document.addEventListener("DOMContentLoaded", iniciar);',
      firma: /DOMContentLoaded/ },
    { nombre: "Validar campos", claves: ["validar", "rellenos", "vacio", "obligatori"],
      plantilla: 'if (a == "" || b == "") { alert("Todos los campos son obligatorios"); return; }',
      firma: /==\s*""\s*\|\|/ },
    { nombre: "Expresiones regulares", claves: ["formato", "expresion regular", "patron", "regex"],
      plantilla: "const re = /^[0-9]{9}$/;\nif (!re.test(texto)) errores.push(\"Teléfono incorrecto\");",
      firma: /\.test\(/ },
    { nombre: "Filtrar (change + filter)", claves: ["filtrar", "filtro", "desplegable", "solo las", "solo los"],
      plantilla: 'select.addEventListener("change", pintar);\nconst lista = array.filter(o => v == "Todos" || o.tipo == v);',
      firma: /\.filter\(/ },
    { nombre: "Ordenar (sort)", claves: ["ordenar", "ascendente", "descendente", "orden"],
      plantilla: "copia.sort((a, b) => a.precio - b.precio);",
      firma: /\.sort\(\s*\(/ },
    { nombre: "Funciones de string", claves: ["mayuscula", "minuscula", "primeras letras", "caracteres", "cifras"],
      plantilla: 'txt.substring(0, 3).toUpperCase()\nString(n).padStart(3, "0")\ntxt.toLowerCase().includes(b)',
      firma: /\.(toUpperCase|substring|padStart|charAt)\(/ },
    { nombre: "fetch (API REST)", claves: ["fetch", "servidor", "api", "rest", "json", "peticion"],
      plantilla: 'fetch(url, { method: "POST", body: JSON.stringify(datos),\n  headers: { "Content-Type": "application/json" } })\n.then(r => r.json()).then(datos => { ... });',
      firma: /fetch\(/ },
    { nombre: "Mostrar / ocultar capas", claves: ["ocultar", "oculta", "mostrara", "mostrar el formulario", "visible"],
      plantilla: 'elemento.style.display = "none";   // ocultar\nelemento.style.display = "block";  // mostrar',
      firma: /style\.display\s*=\s*["']none/ },
    { nombre: "Tabla con Bootstrap", claves: ["tabla", "bootstrap", "table-striped"],
      plantilla: 'const tabla = document.createElement("table");\ntabla.className = "table table-striped";',
      firma: /table table-striped/ },
    { nombre: "Cookies / almacenamiento", claves: ["cookie", "localstorage", "almacenar", "recordar"],
      plantilla: 'document.cookie = clave + "=" + encodeURIComponent(valor) + "; max-age=3600";',
      firma: /document\.cookie|localStorage\./ },
  ];

  // ---------------------------------------------------------------------
  // TEXTO -> palabras útiles (sin tildes, sin palabras vacías, "raíz" de 6 letras)
  // ---------------------------------------------------------------------
  const VACIAS = new Set((
    "el la los las un una unos unas de del al a y o u e en con sin por para que se su sus lo le les es son ser " +
    "como mas muy ya si no cada este esta estos estas ese esa ha han hay sera debe deben tambien cual cuando " +
    "dentro todo todos toda todas otro otra uno dos tres pero porque donde var let const function return " +
    "true false null undefined this document new else"
  ).split(" "));

  function raiz(p) {
    if (p.length > 4) p = p.replace(/(es|s)$/, "");
    return p.slice(0, 6);
  }
  function palabras(texto) {
    return Buscador.normalizar(texto)
      .split(/[^a-z0-9ñ]+/)
      .filter((p) => p.length > 2 && !VACIAS.has(p) && !/^\d+$/.test(p))
      .map(raiz);
  }

  // Librerías y archivos generados: estorban al comparar ejercicios
  function esRuido(e) {
    const r = e.ruta.toLowerCase();
    return /\.min\.(js|css)$/.test(r) || /(^|\/)(dist|vendor|lib|bootstrap|sweetalert2?|assets)\//.test(r);
  }

  // Un ejercicio = la carpeta del ejemplo. Las subcarpetas js/, css/... cuentan como la de arriba.
  const SUBCARPETAS = new Set(["js", "css", "img", "imagenes", "scripts", "styles", "src", "html"]);
  function proyectoDe(carpeta) {
    const partes = carpeta.split("/");
    while (partes.length > 1 && SUBCARPETAS.has(partes[partes.length - 1].toLowerCase())) partes.pop();
    return partes.join("/");
  }

  // ---------------------------------------------------------------------
  // BM25: puntúa documentos según las palabras del enunciado
  // ---------------------------------------------------------------------
  function crearColeccion(docs) {
    // docs: [{ palabras: [...], ...datosExtra }]
    for (const d of docs) {
      d.tf = new Map();
      for (const p of d.palabras) d.tf.set(p, (d.tf.get(p) || 0) + 1);
      d.largo = d.palabras.length;
      delete d.palabras; // ya no hace falta: ahorra memoria
    }
    const df = new Map();
    for (const d of docs) for (const p of d.tf.keys()) df.set(p, (df.get(p) || 0) + 1);
    const media = docs.reduce((s, d) => s + d.largo, 0) / (docs.length || 1);
    return { docs, df, media };
  }

  function puntuar(col, consulta, k1 = 1.2, b = 0.9) {
    const N = col.docs.length;
    const res = [];
    for (const d of col.docs) {
      let puntos = 0;
      const comunes = [];
      for (const p of consulta) {
        const f = d.tf.get(p);
        if (!f) continue;
        const n = col.df.get(p);
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        puntos += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * d.largo / (col.media || 1)));
        comunes.push(p);
      }
      if (puntos > 0) res.push({ d, puntos, comunes });
    }
    return res.sort((a, b) => b.puntos - a.puntos);
  }

  // ---------------------------------------------------------------------
  // ÍNDICE DEL RESOLVER (se recalcula solo si cambia el índice o los PDF leídos)
  // ---------------------------------------------------------------------
  let cache = { indice: null, firma: "", ejercicios: null, teoria: null };

  function construir(indice) {
    const pdfsListos = indice.filter((e) => e.tipo === "pdf" && e.paginas).length;
    const firma = indice.length + "|" + pdfsListos;
    if (cache.indice === indice && cache.firma === firma) return cache;

    // Ejercicios: una entrada por carpeta de proyecto con todo su código
    const porProyecto = new Map();
    for (const e of indice) {
      if (e.tipo === "pdf" || e.tipo === "recurso" || !e.contenido || esRuido(e)) continue;
      const p = proyectoDe(e.carpeta);
      if (!porProyecto.has(p)) porProyecto.set(p, []);
      porProyecto.get(p).push(e);
    }
    const docsEj = [];
    for (const [proyecto, entradas] of porProyecto) {
      // El nombre de la carpeta y de los archivos cuenta el doble (suelen decir de qué va)
      const titulo = proyecto + " " + entradas.map((e) => e.nombre).join(" ");
      const cuerpo = entradas.map((e) => e.contenido.slice(0, 60000)).join("\n");
      docsEj.push({ proyecto, entradas, palabras: palabras(titulo + " " + titulo + " " + cuerpo) });
    }

    // Teoría: una entrada por página de PDF
    const docsTeo = [];
    for (const e of indice) {
      if (e.tipo !== "pdf" || !e.paginas) continue;
      e.paginas.forEach((texto, i) => {
        if (texto && texto.trim()) docsTeo.push({ entrada: e, pagina: i + 1, texto, palabras: palabras(e.nombre + " " + texto) });
      });
    }

    cache = { indice, firma, ejercicios: crearColeccion(docsEj), teoria: crearColeccion(docsTeo) };
    return cache;
  }

  // Ejemplo real de un patrón: primero en los ejercicios más parecidos, luego en el resto
  function ejemploReal(patron, entradasPreferidas, indice) {
    const vistos = new Set();
    const candidatos = [...entradasPreferidas, ...indice];
    for (const e of candidatos) {
      if (vistos.has(e) || !e.contenido || e.tipo === "pdf" || esRuido(e)) continue;
      vistos.add(e);
      const m = patron.firma.exec(e.contenido);
      if (!m) continue;
      const linea = e.contenido.slice(0, m.index).split("\n").length;
      const texto = e.contenido.split("\n")[linea - 1].trim();
      return { entrada: e, linea, texto };
    }
    return null;
  }

  /**
   * @returns { patrones: [{ patron, ejemplo }], ejercicios: [...], teoria: [...] }
   */
  function resolver(indice, enunciado) {
    const { ejercicios, teoria } = construir(indice);
    const consulta = [...new Set(palabras(enunciado))];
    const norm = Buscador.normalizar(enunciado);

    const ej = puntuar(ejercicios, consulta).slice(0, 8);
    const preferidas = ej.flatMap((r) => r.d.entradas);

    const patrones = PATRONES
      .map((p) => ({ patron: p, aciertos: p.claves.filter((c) => norm.includes(c)).length }))
      .filter((x) => x.aciertos > 0)
      .sort((a, b) => b.aciertos - a.aciertos)
      .map((x) => ({ patron: x.patron, ejemplo: ejemploReal(x.patron, preferidas, indice) }));

    const teo = puntuar(teoria, consulta).slice(0, 6);
    return { consulta, patrones, ejercicios: ej, teoria: teo };
  }

  // ---------------------------------------------------------------------
  // PINTAR (todo con textContent: el contenido de tus archivos nunca es HTML)
  // ---------------------------------------------------------------------
  function el(etiqueta, clase, texto) {
    const n = document.createElement(etiqueta);
    if (clase) n.className = clase;
    if (texto !== undefined) n.textContent = texto;
    return n;
  }

  // Resalta las palabras cuya raíz coincide con alguna del enunciado
  function resaltarRaices(texto, raices) {
    const frag = document.createDocumentFragment();
    const set = new Set(raices);
    for (const trozo of texto.split(/([A-Za-zÁÉÍÓÚáéíóúÑñÜü0-9]+)/)) {
      const n = Buscador.normalizar(trozo);
      if (n.length > 2 && !VACIAS.has(n) && set.has(raiz(n))) frag.append(el("mark", "", trozo));
      else frag.append(trozo);
    }
    return frag;
  }

  function recortar(texto, raices, ancho = 220) {
    const plano = texto.replace(/\s+/g, " ").trim();
    if (plano.length <= ancho) return plano;
    const norm = Buscador.normalizar(plano);
    let pos = -1;
    for (const r of raices) { const i = norm.indexOf(r); if (i !== -1 && (pos === -1 || i < pos)) pos = i; }
    const ini = Math.max(0, (pos === -1 ? 0 : pos) - 60);
    return (ini > 0 ? "…" : "") + plano.slice(ini, ini + ancho) + (ini + ancho < plano.length ? "…" : "");
  }

  function titulo(texto, extra) {
    const h = el("h3", "res-titulo", texto);
    if (extra) h.append(el("span", "res-titulo-extra", extra));
    return h;
  }

  /**
   * @param ctx { nombreRaiz, alAbrirArchivo(entrada, linea), alAbrirPdf(entrada, pagina) }
   */
  function pintar(contenedor, resumen, res, ctx) {
    contenedor.replaceChildren();
    resumen.textContent = `${res.patrones.length} patrones · ${res.ejercicios.length} ejercicios parecidos · ${res.teoria.length} páginas de teoría`;

    // 1. PATRONES
    const secP = el("section", "res-seccion");
    secP.append(titulo("1 · Lo que pide el enunciado"));
    if (!res.patrones.length) secP.append(el("p", "pista", "No he reconocido ningún patrón. Mira los ejercicios parecidos."));
    for (const { patron, ejemplo } of res.patrones) {
      const tarjeta = el("div", "res-patron");
      tarjeta.append(el("p", "res-patron-nombre", patron.nombre));
      tarjeta.append(el("pre", "res-plantilla", patron.plantilla));
      if (ejemplo) {
        const b = el("button", "res-ejemplo");
        b.type = "button";
        b.title = "Abrir el ejemplo en el visor";
        b.append(el("span", "res-ejemplo-ruta", `Tu ejemplo: ${ejemplo.entrada.ruta}:${ejemplo.linea}`));
        b.append(el("code", "", ejemplo.texto.slice(0, 120)));
        b.addEventListener("click", () => ctx.alAbrirArchivo(ejemplo.entrada, ejemplo.linea));
        tarjeta.append(b);
      } else {
        tarjeta.append(el("p", "pista", "No he encontrado un ejemplo en tus archivos."));
      }
      secP.append(tarjeta);
    }
    contenedor.append(secP);

    // 2. EJERCICIOS PARECIDOS
    const secE = el("section", "res-seccion");
    secE.append(titulo("2 · Tus ejercicios más parecidos"));
    if (!res.ejercicios.length) secE.append(el("p", "pista", "Ningún ejercicio de tu carpeta se parece."));
    const max = res.ejercicios.length ? res.ejercicios[0].puntos : 1;
    for (const r of res.ejercicios) {
      const pct = Math.round((r.puntos / max) * 100);
      const caja = el("div", "res-ejercicio");

      const cab = el("div", "res-ej-cab");
      cab.append(el("span", "res-ej-ruta", r.d.proyecto || `${ctx.nombreRaiz} (raíz)`));
      const medidor = el("span", "res-medidor");
      const barra = el("span", "res-barra");
      const relleno = el("i");
      relleno.style.width = pct + "%";
      barra.append(relleno);
      medidor.append(barra, el("span", "res-pct", pct + " %"));
      cab.append(medidor);
      caja.append(cab);

      const coincide = el("p", "res-coincide");
      coincide.append("Coincide en: ", r.comunes.slice(0, 12).join(", "));
      caja.append(coincide);

      // Archivos del ejercicio: primero los que más palabras comparten
      const archivos = r.d.entradas
        .map((e) => ({ e, n: r.comunes.filter((c) => e.contenidoNorm && e.contenidoNorm.includes(c)).length }))
        .sort((a, b) => b.n - a.n);
      const lista = el("div", "res-archivos");
      for (const { e } of archivos) {
        const b = el("button", "res-archivo", e.nombre);
        b.type = "button";
        b.title = e.ruta;
        b.addEventListener("click", () => ctx.alAbrirArchivo(e, null));
        lista.append(b);
      }
      caja.append(lista);
      secE.append(caja);
    }
    contenedor.append(secE);

    // 3. TEORÍA (PDF)
    const secT = el("section", "res-seccion");
    secT.append(titulo("3 · Teoría relacionada", "PDF"));
    if (!res.teoria.length) secT.append(el("p", "pista", "Sin coincidencias en tus PDF (o aún se están leyendo)."));
    for (const r of res.teoria) {
      const b = el("button", "res-teoria");
      b.type = "button";
      b.title = "Abrir el PDF en esa página";
      b.append(el("span", "res-teoria-ruta", `${r.d.entrada.nombre} · pág. ${r.d.pagina}`));
      const p = el("span", "res-teoria-texto");
      p.append(resaltarRaices(recortar(r.d.texto, r.comunes), r.comunes));
      b.append(p);
      b.addEventListener("click", () => ctx.alAbrirPdf(r.d.entrada, r.d.pagina));
      secT.append(b);
    }
    contenedor.append(secT);
  }

  return { resolver, pintar };
})();
