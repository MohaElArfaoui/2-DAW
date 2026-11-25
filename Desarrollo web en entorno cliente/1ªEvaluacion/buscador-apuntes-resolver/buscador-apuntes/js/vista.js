"use strict";

/*
 * VISTA — pinta los resultados y el visor de código.
 *
 * Regla de seguridad: el contenido de los archivos SIEMPRE se mete como texto
 * (textContent / nodos de texto), nunca con innerHTML. Si no, el HTML de un
 * ejemplo se interpretaría en vez de verse como código.
 */
const Vista = (() => {
  const LIMITE_RESULTADOS = 150;
  const ETIQUETAS = { html: "HTML", css: "CSS", js: "JS", java: "Java", pdf: "PDF" };
  const ORDEN_TIPOS = { html: 0, css: 1, js: 2, java: 3, datos: 4, pdf: 5 };

  // Iconos SVG (solo donde aportan información). Trazos de 24x24.
  const ICONOS = {
    carpeta: "M3 5h7l2 3h9v12H3z",
    volver: "M20 12H5M11 5l-7 7 7 7",
    expandir: "M14 4h6v6M10 20H4v-6M20 4l-6 6M4 20l6-6",
    contraer: "M20 4l-6 6M4 20l6-6M14 4v6h6M10 20v-6H4",
  };
  function icono(nombre, clase) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icono" + (clase ? " " + clase : ""));
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const trazo = document.createElementNS("http://www.w3.org/2000/svg", "path");
    trazo.setAttribute("d", ICONOS[nombre]);
    svg.append(trazo);
    return svg;
  }

  // Crea un elemento: el("button", "clase", "texto")
  function el(etiqueta, clase, texto) {
    const nodo = document.createElement(etiqueta);
    if (clase) nodo.className = clase;
    if (texto !== undefined) nodo.textContent = texto;
    return nodo;
  }

  /*
   * Devuelve el texto con <mark> en las coincidencias, sin usar innerHTML.
   * Busca sobre la versión normalizada (sin tildes) y corta el texto original
   * en las mismas posiciones; si las longitudes no cuadran, no resalta.
   */
  function resaltar(texto, ts) {
    const frag = document.createDocumentFragment();
    if (!texto || !ts.length) { frag.append(texto || ""); return frag; }
    const norm = Buscador.normalizar(texto);
    if (norm.length !== texto.length) { frag.append(texto); return frag; }

    const rangos = [];
    for (const t of ts) {
      let i = norm.indexOf(t);
      while (i !== -1) { rangos.push([i, i + t.length]); i = norm.indexOf(t, i + t.length); }
    }
    if (!rangos.length) { frag.append(texto); return frag; }

    // Ordenar y fusionar rangos que se solapan
    rangos.sort((a, b) => a[0] - b[0]);
    const fusion = [rangos[0].slice()];
    for (const [ini, fin] of rangos.slice(1)) {
      const ultimo = fusion[fusion.length - 1];
      if (ini <= ultimo[1]) ultimo[1] = Math.max(ultimo[1], fin);
      else fusion.push([ini, fin]);
    }

    let pos = 0;
    for (const [ini, fin] of fusion) {
      if (ini > pos) frag.append(texto.slice(pos, ini));
      frag.append(el("mark", "", texto.slice(ini, fin)));
      pos = fin;
    }
    if (pos < texto.length) frag.append(texto.slice(pos));
    return frag;
  }

  // Los archivos de datos muestran su extensión (JSON, XML, CSV, TXT)
  function etiquetaTipo(entrada) {
    const texto = entrada.tipo === "datos" ? entrada.ext.toUpperCase() : ETIQUETAS[entrada.tipo] || entrada.tipo;
    return el("span", "tipo tipo-" + entrada.tipo, texto);
  }

  // ---------------------------------------------------------------------
  // RESULTADOS
  // ---------------------------------------------------------------------

  /**
   * @param ctx { ts, enContenido, nombreRaiz, alAbrirArchivo(entrada, linea), alAbrirPdf(entrada, pagina) }
   */
  function pintarResultados(contenedor, resumen, resultados, ctx) {
    const scrollAnterior = contenedor.parentElement.scrollTop;
    contenedor.replaceChildren();

    if (!resultados.length) {
      resumen.textContent = "";
      const vacio = el("div", "sin-resultados");
      vacio.append(el("p", "", "Sin resultados."));
      vacio.append(el("p", "pista", "Prueba con menos letras, otra palabra o activa más filtros."));
      contenedor.append(vacio);
      return;
    }

    const mostrados = resultados.slice(0, LIMITE_RESULTADOS);
    resumen.textContent = resultados.length > LIMITE_RESULTADOS
      ? `${resultados.length} archivos · se muestran los ${LIMITE_RESULTADOS} más relevantes`
      : `${resultados.length} ${resultados.length === 1 ? "archivo" : "archivos"}`;

    // Agrupar por carpeta (cada carpeta suele ser un ejemplo). Map mantiene el orden
    // de inserción, así que los grupos salen ordenados por su mejor resultado.
    const grupos = new Map();
    for (const r of mostrados) {
      if (!grupos.has(r.entrada.carpeta)) grupos.set(r.entrada.carpeta, []);
      grupos.get(r.entrada.carpeta).push(r);
    }

    const frag = document.createDocumentFragment();
    for (const [carpeta, lista] of grupos) {
      const grupo = el("section", "grupo");

      const cabecera = el("button", "grupo-cabecera");
      cabecera.type = "button";
      cabecera.title = "Ver los archivos de esta carpeta";
      const ruta = el("span", "grupo-ruta");
      ruta.append(resaltar(carpeta || `${ctx.nombreRaiz} (raíz)`, ctx.ts));
      cabecera.append(icono("carpeta"), ruta, el("span", "grupo-num", String(lista.length)));
      // Abrir la carpeta = abrir su primer archivo de código (los PDF no)
      const primerCodigo = lista.find((r) => r.entrada.tipo !== "pdf");
      if (primerCodigo) cabecera.addEventListener("click", () => ctx.alAbrirArchivo(primerCodigo.entrada, null));
      else cabecera.disabled = true;
      grupo.append(cabecera);

      const ul = el("ul", "grupo-archivos");
      for (const r of lista) ul.append(pintarResultado(r, ctx));
      grupo.append(ul);
      frag.append(grupo);
    }
    contenedor.append(frag);
    contenedor.parentElement.scrollTop = scrollAnterior;
  }

  function pintarResultado(r, ctx) {
    const { entrada, motivos } = r;
    const esPdf = entrada.tipo === "pdf";
    const li = el("li", "resultado");

    const boton = el("button", "resultado-principal");
    boton.type = "button";
    boton.dataset.id = entrada.id;
    const nombre = el("span", "resultado-nombre");
    nombre.append(resaltar(entrada.nombre, ctx.ts));
    const motivosTexto = [...motivos].map((m) => ({ carpeta: "carpeta", nombre: "nombre", contenido: "contenido" }[m])).join(", ");
    boton.append(etiquetaTipo(entrada), nombre, el("span", "motivos", motivosTexto));
    if (esPdf) {
      boton.title = "Abrir el PDF en una pestaña nueva";
      boton.addEventListener("click", () => ctx.alAbrirPdf(entrada, 1));
    } else {
      boton.addEventListener("click", () => ctx.alAbrirArchivo(entrada, null));
    }
    li.append(boton);

    // Avisos de PDF que no se pueden buscar por dentro
    if (esPdf && entrada.pdfEstado && entrada.pdfEstado !== "listo") {
      const avisos = {
        pendiente: "Leyendo el PDF…",
        "sin-texto": "PDF sin texto (escaneado): solo se busca por nombre",
        error: "No se pudo leer el texto (¿protegido?)",
        grande: "PDF muy grande: solo se busca por nombre",
      };
      li.append(el("p", "aviso-pdf", avisos[entrada.pdfEstado] || ""));
    }

    // Fragmentos: líneas de código o páginas del PDF donde aparece lo buscado
    if (ctx.enContenido && motivos.has("contenido")) {
      const datos = esPdf
        ? Buscador.fragmentosPdf(entrada, ctx.ts, 4)
        : Buscador.fragmentosTexto(entrada, ctx.ts, 3);
      if (datos.lista.length) {
        const ul = el("ul", "fragmentos");
        for (const f of datos.lista) {
          const item = el("li");
          const b = el("button", "fragmento");
          b.type = "button";
          const num = el("span", "fragmento-num", esPdf ? "pág. " + f.pagina : String(f.linea));
          const code = el("code", "fragmento-texto");
          code.append(resaltar(f.texto, ctx.ts));
          b.append(num, code);
          b.addEventListener("click", () => (esPdf ? ctx.alAbrirPdf(entrada, f.pagina) : ctx.alAbrirArchivo(entrada, f.linea)));
          item.append(b);
          ul.append(item);
        }
        if (datos.total > datos.lista.length) {
          const resto = datos.total - datos.lista.length;
          ul.append(el("li", "fragmento-mas", `+${resto} ${esPdf ? (resto === 1 ? "página" : "páginas") : (resto === 1 ? "línea" : "líneas")} más`));
        }
        li.append(ul);
      }
    }
    return li;
  }

  // ---------------------------------------------------------------------
  // VISOR DE CÓDIGO
  // ---------------------------------------------------------------------

  /*
   * COLOREADO DE SINTAXIS (como en un editor), con Prism (lib/prism.js).
   * Prism.tokenize() devuelve "tokens" (palabra clave, cadena, comentario...).
   * Los convertimos en trozos { texto, clase } repartidos por líneas y los
   * pintamos con textContent: el contenido del archivo nunca pasa por innerHTML.
   */
  const LENGUAJE = { html: "markup", htm: "markup", xml: "markup", css: "css", js: "javascript", mjs: "javascript", java: "java", json: "json" };
  const MAX_COLOREAR = 300 * 1024; // archivos más grandes se muestran sin colores (irían lentos)

  // Recorre los tokens (pueden ir anidados) y deja una lista plana de trozos
  function aplanarTokens(tokens, clase, salida) {
    for (const t of tokens) {
      if (typeof t === "string") { salida.push({ texto: t, clase }); continue; }
      // Para cada trozo cuenta el token más interno: su tipo y sus alias
      const propia = ["token", t.type].concat(t.alias ? [].concat(t.alias) : []).join(" ");
      if (typeof t.content === "string") salida.push({ texto: t.content, clase: propia });
      else aplanarTokens(Array.isArray(t.content) ? t.content : [t.content], propia, salida);
    }
    return salida;
  }

  // Devuelve un array (una posición por línea) de arrays de trozos, o null si no se colorea
  function lineasColoreadas(entrada) {
    if (entrada._coloreadas !== undefined) return entrada._coloreadas; // ya calculado
    entrada._coloreadas = null;
    const lenguaje = window.Prism && LENGUAJE[entrada.ext];
    if (!lenguaje || !Prism.languages[lenguaje] || entrada.contenido.length > MAX_COLOREAR) return null;
    try {
      const trozos = aplanarTokens(Prism.tokenize(entrada.contenido, Prism.languages[lenguaje]), "", []);
      // Un mismo trozo (un comentario /* ... */, por ejemplo) puede ocupar varias líneas
      const lineas = [[]];
      for (const { texto, clase } of trozos) {
        texto.split(/\r?\n/).forEach((parte, i) => {
          if (i > 0) lineas.push([]);
          if (parte) lineas[lineas.length - 1].push({ texto: parte, clase });
        });
      }
      entrada._coloreadas = lineas;
    } catch {
      entrada._coloreadas = null; // si Prism fallara, se ve sin colores
    }
    return entrada._coloreadas;
  }

  function ordenarHermanos(lista) {
    return lista.slice().sort((a, b) =>
      (ORDEN_TIPOS[a.tipo] - ORDEN_TIPOS[b.tipo]) || a.nombre.localeCompare(b.nombre));
  }

  /**
   * Rellena la cabecera del visor y la mitad del código. La vista previa
   * (#visor-previa) no se toca aquí: la gestiona previa.js.
   * @param ctx { entrada, hermanos, linea, ts, nombreRaiz,
   *              previaActiva, hayHtml, codigoExpandido,
   *              alCambiar(entrada), alVolver(), alCopiar(texto) -> Promise<boolean>,
   *              alAlternarPrevia(), alExpandirCodigo() }
   */
  function pintarVisor(ctx) {
    const { entrada, ts } = ctx;
    document.getElementById("visor-vacio").hidden = true;
    document.getElementById("visor-contenido").hidden = false;

    // Cabecera: volver + carpeta del ejemplo + interruptor de vista previa
    const cabecera = document.getElementById("visor-cabecera");
    cabecera.replaceChildren();
    const volver = el("button", "btn btn-volver");
    volver.type = "button";
    volver.append(icono("volver"), "Resultados");
    volver.addEventListener("click", ctx.alVolver);
    const carpeta = el("span", "visor-carpeta", entrada.carpeta || `${ctx.nombreRaiz} (raíz)`);
    carpeta.title = entrada.carpeta || ctx.nombreRaiz;
    const interruptor = el("button", "interruptor" + (ctx.previaActiva ? " activo" : ""));
    interruptor.type = "button";
    interruptor.setAttribute("aria-pressed", ctx.previaActiva ? "true" : "false");
    interruptor.append(el("span", "interruptor-pista"), el("span", "", "Vista previa"));
    if (ctx.hayHtml) {
      interruptor.title = "Ver el ejemplo funcionando";
      interruptor.addEventListener("click", ctx.alAlternarPrevia);
    } else {
      interruptor.disabled = true;
      interruptor.title = "Esta carpeta no tiene ningún HTML";
    }
    cabecera.append(volver, carpeta, interruptor);

    const mitad = document.getElementById("visor-codigo");
    mitad.replaceChildren();

    // Pestañas: todos los archivos de código y datos de la misma carpeta
    const pestanas = el("div", "pestanas");
    pestanas.setAttribute("role", "tablist");
    for (const h of ordenarHermanos(ctx.hermanos)) {
      const p = el("button", "pestana" + (h === entrada ? " activa" : ""));
      p.type = "button";
      p.setAttribute("role", "tab");
      p.setAttribute("aria-selected", h === entrada ? "true" : "false");
      p.append(etiquetaTipo(h), el("span", "", h.nombre));
      p.addEventListener("click", () => ctx.alCambiar(h));
      pestanas.append(p);
    }
    mitad.append(pestanas);

    // Barra: nombre del archivo + expandir (solo con vista previa) + copiar
    const barra = el("div", "visor-barra");
    const lineas = entrada.contenido === null ? null : entrada.contenido.split(/\r?\n/);
    const info = lineas ? `${entrada.nombre}, ${lineas.length} ${lineas.length === 1 ? "línea" : "líneas"}` : entrada.nombre;
    barra.append(el("span", "visor-ruta", info));
    if (ctx.previaActiva) {
      const expandir = el("button", "btn-icono");
      expandir.type = "button";
      expandir.title = ctx.codigoExpandido ? "Volver a la mitad" : "Expandir el código";
      expandir.setAttribute("aria-label", expandir.title);
      expandir.append(icono("expandir", "icono-expandir"), icono("contraer", "icono-contraer"));
      expandir.setAttribute("aria-pressed", ctx.codigoExpandido ? "true" : "false");
      expandir.addEventListener("click", ctx.alExpandirCodigo);
      barra.append(expandir);
    }
    if (lineas) {
      const copiar = el("button", "btn btn-primario btn-copiar", "Copiar");
      copiar.type = "button";
      copiar.addEventListener("click", async () => {
        const ok = await ctx.alCopiar(entrada.contenido);
        copiar.textContent = ok ? "¡Copiado!" : "No se pudo copiar";
        copiar.classList.toggle("hecho", ok);
        setTimeout(() => { copiar.textContent = "Copiar"; copiar.classList.remove("hecho"); }, 1600);
      });
      barra.append(copiar);
    }
    mitad.append(barra);

    // Código con números de línea (los números van en CSS y no se copian al seleccionar)
    const codigo = el("div", "codigo");
    codigo.tabIndex = 0;
    if (!lineas) {
      codigo.append(el("p", "codigo-aviso", "Archivo demasiado grande para mostrarlo. Solo se busca por su nombre."));
    } else {
      const coloreadas = lineasColoreadas(entrada);
      const frag = document.createDocumentFragment();
      lineas.forEach((texto, i) => {
        const linea = el("div", "linea");
        linea.dataset.n = i + 1;
        if (coloreadas) {
          // Cada trozo va en un <span class="token ..."> y dentro se marcan las coincidencias
          for (const trozo of coloreadas[i] || []) {
            if (!trozo.clase) { linea.append(resaltar(trozo.texto, ts)); continue; }
            const span = el("span", trozo.clase);
            span.append(resaltar(trozo.texto, ts));
            linea.append(span);
          }
        } else {
          linea.append(resaltar(texto, ts));
        }
        frag.append(linea);
      });
      codigo.append(frag);
    }
    mitad.append(codigo);

    // Saltar a la línea pulsada en un fragmento
    if (lineas && ctx.linea) {
      const destino = codigo.children[ctx.linea - 1];
      if (destino) {
        destino.classList.add("destacada");
        requestAnimationFrame(() => {
          codigo.scrollTop = destino.offsetTop - codigo.clientHeight / 3;
        });
      }
    } else {
      // Ir a la primera coincidencia, si hay
      const primera = codigo.querySelector("mark");
      if (primera) requestAnimationFrame(() => {
        const linea = primera.closest(".linea");
        codigo.scrollTop = linea.offsetTop - codigo.clientHeight / 3;
      });
    }
  }

  function vaciarVisor() {
    document.getElementById("visor-contenido").hidden = true;
    document.getElementById("visor-vacio").hidden = false;
    document.getElementById("visor-cabecera").replaceChildren();
    document.getElementById("visor-codigo").replaceChildren();
  }

  return { pintarResultados, pintarVisor, vaciarVisor };
})();
