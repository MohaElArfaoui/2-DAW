"use strict";

/*
 * PREVIA — vista previa de un ejemplo HTML funcionando.
 *
 * El navegador no nos da la ruta real de los archivos, así que no podemos
 * hacer <iframe src="...">. En su lugar "montamos" la página a mano:
 *   1. Leemos el HTML con DOMParser.
 *   2. Cada <link> y <script src> se sustituye por el contenido del archivo
 *      (que ya está en el índice), y cada imagen por una "data URL".
 *   3. Delante de todo se mete un script de arranque (arranquePrevia) que,
 *      DENTRO del iframe, sustituye localStorage, fetch y XMLHttpRequest.
 *   4. El resultado va a un <iframe srcdoc> aislado (sandbox).
 *
 * AISLAMIENTO: sandbox sin "allow-same-origin". El ejemplo no puede tocar
 * la app (ni su almacenamiento ni su página). Para que aun así funcionen:
 *   - localStorage / sessionStorage -> versión en memoria, propia de cada ejemplo.
 *   - fetch / XMLHttpRequest con rutas locales -> el iframe pide el archivo a
 *     la app por un canal (MessageChannel) y la app se lo da desde el índice.
 *     Las URLs completas (http://localhost:3000...) van a la red de verdad.
 */
const Previa = (() => {
  const SANDBOX = "allow-scripts allow-forms allow-modals";

  const MIME = {
    html: "text/html", htm: "text/html", css: "text/css", js: "text/javascript", mjs: "text/javascript",
    json: "application/json", xml: "application/xml", csv: "text/csv", txt: "text/plain", java: "text/plain",
    png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", svg: "image/svg+xml",
    webp: "image/webp", ico: "image/x-icon", bmp: "image/bmp",
    woff: "font/woff", woff2: "font/woff2", ttf: "font/ttf", otf: "font/otf", pdf: "application/pdf",
  };

  const $ = (id) => document.getElementById(id);
  const mapas = new WeakMap(); // índice -> Map("ruta en minúsculas" -> entrada)

  let actual = null;    // { iframe, entrada, indice, puerto, cargas, mensajes:Set }
  let generacion = 0;   // para descartar un montaje si se pide otro mientras tanto
  let opciones = { alNavegar: () => {} };

  // =====================================================================
  // RUTAS
  // =====================================================================

  // ¿URL completa (http:, data:, //cdn...) o ruta de nuestros apuntes?
  function esExterna(url) {
    return /^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith("//");
  }

  // Resuelve "../css/x.css" desde la carpeta "UD3/ej5" -> "UD3/css/x.css".
  // Usamos URL con una dirección inventada para que haga el trabajo de ".." y ".".
  function resolverRuta(carpeta, url) {
    if (!url || esExterna(url) || url.startsWith("#")) return null;
    try {
      const segmentos = carpeta ? carpeta.split("/").map(encodeURIComponent).join("/") + "/" : "";
      const u = new URL(url, "https://apuntes.invalid/" + segmentos);
      return decodeURIComponent(u.pathname).replace(/^\/+/, "");
    } catch {
      return null;
    }
  }

  function mapaDe(indice) {
    let mapa = mapas.get(indice);
    if (!mapa) {
      mapa = new Map();
      for (const e of indice) mapa.set(e.ruta.toLowerCase(), e);
      mapas.set(indice, mapa);
    }
    return mapa;
  }

  // Windows no distingue mayúsculas en rutas, así que nosotros tampoco
  function buscarEntrada(indice, carpeta, url) {
    const ruta = resolverRuta(carpeta, url.trim().split(/[?#]/)[0]);
    return ruta === null ? null : mapaDe(indice).get(ruta.toLowerCase()) || null;
  }

  // =====================================================================
  // LECTURA DE ARCHIVOS
  // =====================================================================

  const mimeDe = (entrada) => MIME[entrada.ext] || "application/octet-stream";

  function textoDe(entrada) {
    return entrada.contenido !== null ? Promise.resolve(entrada.contenido) : Indexador.leerTexto(entrada.archivo);
  }

  // data:image/png;base64,... -> la imagen viaja dentro del propio HTML
  function dataUrlDe(entrada) {
    if (!entrada._dataUrl) {
      entrada._dataUrl = new Promise((resolve, reject) => {
        const lector = new FileReader();
        lector.onload = () => resolve(lector.result);
        lector.onerror = () => reject(lector.error);
        lector.readAsDataURL(new Blob([entrada.archivo], { type: mimeDe(entrada) }));
      });
      entrada._dataUrl.catch(() => { entrada._dataUrl = null; });
    }
    return entrada._dataUrl;
  }

  async function bytesDe(entrada) {
    if (entrada.contenido !== null) return new TextEncoder().encode(entrada.contenido).buffer;
    return entrada.archivo.arrayBuffer();
  }

  // =====================================================================
  // MONTAR LA PÁGINA
  // =====================================================================

  // Como String.replace, pero la función de reemplazo puede ser async
  async function reemplazarAsync(texto, regex, funcion) {
    const partes = [];
    let ultimo = 0;
    for (const m of texto.matchAll(regex)) {
      partes.push(texto.slice(ultimo, m.index), funcion(...m));
      ultimo = m.index + m[0].length;
    }
    partes.push(texto.slice(ultimo));
    return (await Promise.all(partes)).join("");
  }

  // Dentro de <script> o <style> no puede aparecer "</script" o "</style": cerraría la etiqueta
  function protegerCierre(codigo, etiqueta) {
    return codigo.replace(new RegExp("</" + etiqueta, "gi"), "<\\/" + etiqueta);
  }

  const acortar = (url) => (url.length > 60 ? url.slice(0, 57) + "…" : url);

  // Mete los @import y cambia cada url(...) por la imagen o fuente en data URL
  async function procesarCss(css, carpeta, ctx, profundidad) {
    css = await reemplazarAsync(css, /@import\s+(?:url\(\s*)?(['"]?)([^'")\s;]+)\1\s*\)?\s*([^;]*);/g,
      async (todo, _comilla, url, medias) => {
        if (esExterna(url)) { ctx.avisos.add(`Importa estilos de internet (${acortar(url)}): sin conexión no cargarán.`); return todo; }
        if (profundidad > 4) return "";
        const e = buscarEntrada(ctx.indice, carpeta, url);
        if (!e) { ctx.avisos.add(`No se encontró el CSS «${url}» (importado con @import).`); return ""; }
        const interno = await procesarCss(await textoDe(e), e.carpeta, ctx, profundidad + 1);
        return medias.trim() ? `@media ${medias.trim()} {\n${interno}\n}` : interno;
      });

    return reemplazarAsync(css, /url\(\s*(['"]?)([^'")]+)\1\s*\)/g, async (todo, _comilla, url) => {
      url = url.trim();
      if (esExterna(url) || url.startsWith("#")) return todo;
      const e = buscarEntrada(ctx.indice, carpeta, url);
      if (!e) { ctx.avisos.add(`No se encontró «${url}» (usado en el CSS).`); return todo; }
      return `url("${await dataUrlDe(e)}")`;
    });
  }

  // Atributos de imagen/recurso que se sustituyen al montar
  const RECURSOS = [
    ["img[src]", "src"], ["source[src]", "src"], ["video[poster]", "poster"],
    ['input[type="image" i][src]', "src"], ['link[rel~="icon" i][href]', "href"],
  ];

  async function montar(entrada, indice) {
    const ctx = { indice, avisos: new Set() };
    const carpeta = entrada.carpeta;
    const doc = new DOMParser().parseFromString(await textoDe(entrada), "text/html");

    // 1. Estilos escritos en el propio HTML: <style> y style="..."
    for (const style of doc.querySelectorAll("style")) {
      style.textContent = protegerCierre(await procesarCss(style.textContent, carpeta, ctx, 0), "style");
    }
    for (const el of doc.querySelectorAll("[style]")) {
      el.setAttribute("style", await procesarCss(el.getAttribute("style"), carpeta, ctx, 0));
    }

    // 2. Hojas de estilo enlazadas -> <style> con su contenido
    for (const link of [...doc.querySelectorAll('link[rel~="stylesheet" i][href]')]) {
      const href = link.getAttribute("href");
      if (esExterna(href)) { ctx.avisos.add(`Usa estilos de internet (${acortar(href)}): sin conexión no cargarán.`); continue; }
      const css = buscarEntrada(indice, carpeta, href);
      if (!css) { ctx.avisos.add(`No se encontró el CSS «${href}».`); link.remove(); continue; }
      const style = doc.createElement("style");
      if (link.hasAttribute("media")) style.setAttribute("media", link.getAttribute("media"));
      style.textContent = protegerCierre(await procesarCss(await textoDe(css), css.carpeta, ctx, 0), "style");
      link.replaceWith(style);
    }

    // 3. Imágenes -> data URL
    for (const [selector, atributo] of RECURSOS) {
      for (const el of doc.querySelectorAll(selector)) {
        const url = el.getAttribute(atributo);
        if (!url || esExterna(url)) continue;
        const e = buscarEntrada(indice, carpeta, url);
        if (!e) { ctx.avisos.add(`No se encontró la imagen «${url}».`); continue; }
        el.setAttribute(atributo, await dataUrlDe(e));
        el.removeAttribute("srcset"); // si no, el navegador intentaría usar srcset
      }
    }

    // 4. Scripts externos -> <script> con el código dentro
    const diferidos = [];
    for (const script of [...doc.querySelectorAll("script[src]")]) {
      const src = script.getAttribute("src");
      if (esExterna(src)) { ctx.avisos.add(`Usa un script de internet (${acortar(src)}): sin conexión no cargará.`); continue; }
      const js = buscarEntrada(indice, carpeta, src);
      if (!js) { ctx.avisos.add(`No se encontró el script «${src}».`); script.remove(); continue; }

      const codigo = await textoDe(js);
      const nuevo = doc.createElement("script");
      for (const a of script.attributes) {
        if (!["src", "defer", "async", "integrity", "crossorigin"].includes(a.name)) nuevo.setAttribute(a.name, a.value);
      }
      // sourceURL: en la consola (F12) los errores salen con el nombre real del archivo
      nuevo.textContent = protegerCierre(codigo, "script") + "\n//# sourceURL=" + js.ruta.replace(/\s/g, "%20");

      // Un script inline ignora "defer": para respetarlo lo movemos al final del <body>
      if (script.hasAttribute("defer") && (nuevo.getAttribute("type") || "").toLowerCase() !== "module") {
        script.remove();
        diferidos.push(nuevo);
      } else {
        script.replaceWith(nuevo);
      }
    }
    for (const s of diferidos) doc.body.append(s);

    // Módulos con import: no se pueden montar
    for (const s of doc.querySelectorAll('script[type="module" i]')) {
      if (/(^|[\s;])import[\s{*("']/.test(s.textContent)) {
        ctx.avisos.add("Este ejemplo usa módulos (import): esa parte no funcionará en la vista previa.");
      }
    }

    // 5. Script de arranque: el primero de la página, antes que el código del ejemplo
    const arranque = doc.createElement("script");
    arranque.textContent = protegerCierre(`(${arranquePrevia.toString()})(${JSON.stringify({ carpeta })});`, "script");
    doc.head.prepend(arranque);

    const doctype = doc.doctype ? "<!DOCTYPE html>\n" : "";
    return { html: doctype + doc.documentElement.outerHTML, avisos: [...ctx.avisos] };
  }

  // =====================================================================
  // SCRIPT DE ARRANQUE — se ejecuta DENTRO del iframe
  // (se convierte a texto con toString(), así que no puede usar nada de fuera)
  // =====================================================================
  function arranquePrevia(config) {
    "use strict";

    // Canal privado con la app (MessageChannel) para no mezclarnos con los
    // postMessage que pueda usar el propio ejemplo
    const canal = new MessageChannel();
    parent.postMessage({ canal: "previa", tipo: "hola" }, "*", [canal.port2]);
    const puerto = canal.port1;
    const avisar = (tipo, datos) => puerto.postMessage(Object.assign({ tipo }, datos));

    let siguienteId = 1;
    const pendientes = new Map();
    puerto.onmessage = (e) => {
      const resolver = pendientes.get(e.data.id);
      if (resolver) { pendientes.delete(e.data.id); resolver(e.data); }
    };
    // Pide un archivo de los apuntes a la app. como: "binario" | "dataurl"
    function pedirArchivo(url, como) {
      return new Promise((resolve) => {
        const id = siguienteId++;
        pendientes.set(id, resolve);
        avisar("archivo", { id, url, base: config.carpeta, como });
      });
    }

    const esExterna = (url) => /^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith("//");

    // ---- 1. localStorage y sessionStorage en memoria, solo para este ejemplo ----
    function crearAlmacen() {
      const datos = new Map();
      const api = {
        getItem: (k) => (datos.has(String(k)) ? datos.get(String(k)) : null),
        setItem: (k, v) => { datos.set(String(k), String(v)); },
        removeItem: (k) => { datos.delete(String(k)); },
        clear: () => { datos.clear(); },
        key: (i) => { const claves = [...datos.keys()]; return i >= 0 && i < claves.length ? claves[i] : null; },
        get length() { return datos.size; },
      };
      // El Proxy permite también localStorage.clave y Object.keys(localStorage)
      return new Proxy(api, {
        get: (obj, p) => (p in obj ? obj[p] : typeof p === "string" && datos.has(p) ? datos.get(p) : undefined),
        set: (obj, p, v) => { if (!(p in obj)) datos.set(String(p), String(v)); return true; },
        deleteProperty: (obj, p) => { datos.delete(String(p)); return true; },
        has: (obj, p) => p in obj || datos.has(p),
        ownKeys: () => [...datos.keys()],
        getOwnPropertyDescriptor: (obj, p) => (datos.has(p)
          ? { value: datos.get(p), enumerable: true, configurable: true, writable: true }
          : undefined),
      });
    }
    for (const nombre of ["localStorage", "sessionStorage"]) {
      try {
        Object.defineProperty(window, nombre, { value: crearAlmacen(), configurable: true, enumerable: true });
      } catch { /* si no se pudiera, el ejemplo verá el error normal */ }
    }

    // ---- 2. fetch: rutas locales desde los apuntes; URLs completas, a la red ----
    const fetchOriginal = window.fetch.bind(window);
    window.fetch = function (recurso, init) {
      const url = typeof recurso === "string" ? recurso : recurso instanceof URL ? recurso.href : recurso && recurso.url;
      if (!url || esExterna(url)) return fetchOriginal(recurso, init);
      const metodo = String((init && init.method) || (recurso && recurso.method) || "GET").toUpperCase();
      if (metodo !== "GET" && metodo !== "HEAD") {
        avisar("aviso", { mensaje: `fetch con ${metodo} a «${url}»: en la vista previa no hay servidor que lo reciba.` });
        return Promise.resolve(new Response("", { status: 405, statusText: "Method Not Allowed" }));
      }
      return pedirArchivo(url, "binario").then((r) => (r.encontrado
        ? new Response(r.datos, { status: 200, statusText: "OK", headers: { "Content-Type": r.mime } })
        : new Response("Not Found", { status: 404, statusText: "Not Found" })));
    };

    // ---- 3. XMLHttpRequest con el mismo sistema ----
    class XHRPrevia extends EventTarget {
      constructor() {
        super();
        this.readyState = 0; this.status = 0; this.statusText = "";
        this.response = ""; this.responseText = ""; this.responseXML = null;
        this.responseType = ""; this.responseURL = ""; this.timeout = 0; this.withCredentials = false;
        this.upload = new EventTarget();
        this._cabeceras = {};
        for (const ev of ["readystatechange", "loadstart", "progress", "load", "error", "abort", "timeout", "loadend"]) this["on" + ev] = null;
      }
      open(metodo, url, asincrono) {
        this._metodo = String(metodo).toUpperCase();
        this._url = String(url);
        this._abortado = false;
        if (asincrono === false) avisar("aviso", { mensaje: "XMLHttpRequest síncrono (open con false) no funciona en la vista previa." });
        this._estado(1);
      }
      setRequestHeader(nombre, valor) { this._cabeceras[nombre] = valor; }
      overrideMimeType(mime) { this._mimeForzado = mime; }
      getResponseHeader(nombre) { return String(nombre).toLowerCase() === "content-type" && this._mime ? this._mime : null; }
      getAllResponseHeaders() { return this._mime ? "content-type: " + this._mime + "\r\n" : ""; }
      abort() { this._abortado = true; this._emitir("abort"); }
      send(cuerpo) {
        const url = this._url;
        let peticion;
        if (esExterna(url)) {
          peticion = fetchOriginal(url, { method: this._metodo, headers: this._cabeceras, body: cuerpo })
            .then(async (res) => ({ status: res.status, statusText: res.statusText, datos: await res.arrayBuffer(), mime: res.headers.get("content-type") || "" }));
        } else if (this._metodo !== "GET" && this._metodo !== "HEAD") {
          avisar("aviso", { mensaje: `XMLHttpRequest con ${this._metodo} a «${url}»: en la vista previa no hay servidor que lo reciba.` });
          peticion = Promise.resolve({ status: 405, statusText: "Method Not Allowed", datos: new ArrayBuffer(0), mime: "text/plain" });
        } else {
          peticion = pedirArchivo(url, "binario").then((r) => (r.encontrado
            ? { status: 200, statusText: "OK", datos: r.datos, mime: r.mime }
            : { status: 404, statusText: "Not Found", datos: new TextEncoder().encode("Not Found").buffer, mime: "text/plain" }));
        }
        this._emitir("loadstart");
        peticion.then((r) => {
          if (this._abortado) return;
          this.status = r.status; this.statusText = r.statusText; this.responseURL = url;
          this._mime = this._mimeForzado || r.mime;
          const texto = new TextDecoder().decode(r.datos);
          this._estado(2); this._estado(3);
          const tipo = this.responseType;
          if (tipo === "" || tipo === "text") { this.responseText = texto; this.response = texto; }
          else if (tipo === "json") { try { this.response = JSON.parse(texto); } catch { this.response = null; } }
          else if (tipo === "arraybuffer") this.response = r.datos;
          else if (tipo === "blob") this.response = new Blob([r.datos], { type: this._mime });
          if ((tipo === "" || tipo === "document") && /xml/i.test(this._mime)) {
            this.responseXML = new DOMParser().parseFromString(texto, "application/xml");
            if (tipo === "document") this.response = this.responseXML;
          }
          this._estado(4); this._emitir("load"); this._emitir("loadend");
        }).catch(() => {
          if (this._abortado) return;
          this._estado(4); this._emitir("error"); this._emitir("loadend");
        });
      }
      _estado(n) { this.readyState = n; this._emitir("readystatechange"); }
      _emitir(tipo) {
        const evento = new Event(tipo);
        this.dispatchEvent(evento); // primero: así evento.target ya apunta a la petición
        const manejador = this["on" + tipo];
        if (typeof manejador === "function") manejador.call(this, evento);
      }
    }
    for (const [i, nombre] of ["UNSENT", "OPENED", "HEADERS_RECEIVED", "LOADING", "DONE"].entries()) {
      XHRPrevia[nombre] = i;
      XHRPrevia.prototype[nombre] = i;
    }
    window.XMLHttpRequest = XHRPrevia;

    // ---- 4. Imágenes cuya ruta pone el JavaScript (img.src = "img/" + n + ".png") ----
    const ATRIBUTO_IMAGEN = { IMG: "src", SOURCE: "src", VIDEO: "poster", INPUT: "src" };
    function revisarImagen(el) {
      const atributo = ATRIBUTO_IMAGEN[el.tagName];
      if (!atributo) return;
      const url = el.getAttribute(atributo);
      if (!url || esExterna(url) || url.startsWith("#") || el.__previaPedida === url) return;
      el.__previaPedida = url;
      pedirArchivo(url, "dataurl").then((r) => {
        if (r.encontrado && el.getAttribute(atributo) === url) el.setAttribute(atributo, r.datos);
      });
    }
    new MutationObserver((cambios) => {
      for (const c of cambios) {
        if (c.type === "attributes") { revisarImagen(c.target); continue; }
        for (const nodo of c.addedNodes) {
          if (nodo.nodeType !== 1) continue;
          revisarImagen(nodo);
          nodo.querySelectorAll("img, source, video, input").forEach(revisarImagen);
        }
      }
    }).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["src", "poster"] });

    // ---- 5. Enlaces: otra página del ejemplo se carga desde los apuntes ----
    // Se escucha en window (fase de burbuja): si el ejemplo ya hizo preventDefault(), no tocamos nada.
    window.addEventListener("click", (e) => {
      if (e.defaultPrevented || !e.target.closest) return;
      const enlace = e.target.closest("a[href]");
      if (!enlace) return;
      const href = enlace.getAttribute("href").trim();
      if (/^javascript:/i.test(href)) return;
      e.preventDefault();
      if (href === "" || href.startsWith("#")) {
        const id = decodeURIComponent(href.slice(1));
        const destino = id && (document.getElementById(id) || document.getElementsByName(id)[0]);
        if (destino) destino.scrollIntoView(); else window.scrollTo(0, 0);
        return;
      }
      if (esExterna(href)) {
        avisar("aviso", { mensaje: `Enlace a «${href}»: no se abre desde la vista previa.` });
        return;
      }
      avisar("navegar", { url: href.split("#")[0], base: config.carpeta });
    });

    // ---- 6. Formularios que se envían sin preventDefault() ----
    window.addEventListener("submit", (e) => {
      if (e.defaultPrevented) return;
      e.preventDefault();
      avisar("aviso", { mensaje: "El formulario se ha enviado, pero en la vista previa no hay servidor que lo reciba." });
    });

    // ---- 7. Errores del ejemplo -> se muestran en la app ----
    window.addEventListener("error", (e) => {
      const archivo = e.filename && !/^about:/.test(e.filename) ? decodeURIComponent(e.filename.split("/").pop()) : "";
      avisar("error", { mensaje: e.message || "Error", archivo, linea: e.lineno || 0 });
    });
    window.addEventListener("unhandledrejection", (e) => {
      const motivo = e.reason && e.reason.message ? e.reason.message : String(e.reason);
      avisar("error", { mensaje: "Promesa rechazada: " + motivo, archivo: "", linea: 0 });
    });
  }

  // =====================================================================
  // LADO DE LA APP — iframe, mensajes y avisos
  // =====================================================================

  function anadirMensaje(texto, clase) {
    if (!actual || actual.mensajes.has(texto)) return;
    actual.mensajes.add(texto);
    const lista = $("previa-mensajes");
    const li = document.createElement("li");
    li.className = "msg-" + clase;
    li.textContent = texto;
    lista.append(li);
    lista.hidden = false;
    if (clase === "error") {
      actual.errores++;
      const chip = $("previa-errores");
      chip.textContent = `${actual.errores} ${actual.errores === 1 ? "error" : "errores"}`;
      chip.hidden = false;
    }
  }

  function limpiarMensajes() {
    $("previa-mensajes").replaceChildren();
    $("previa-mensajes").hidden = true;
    $("previa-errores").hidden = true;
  }

  // El iframe saluda y nos pasa su puerto privado
  function alRecibirMensaje(e) {
    if (!actual || e.source !== actual.iframe.contentWindow) return;
    if (!e.data || e.data.canal !== "previa" || e.data.tipo !== "hola" || !e.ports[0]) return;
    const montaje = actual;
    montaje.puerto = e.ports[0];
    montaje.puerto.onmessage = (ev) => atender(montaje, ev.data);
  }

  async function atender(montaje, msg) {
    if (montaje !== actual || !msg) return;
    if (msg.tipo === "archivo") return responderArchivo(montaje, msg);
    if (msg.tipo === "aviso") return anadirMensaje(msg.mensaje, "aviso");
    if (msg.tipo === "error") {
      const donde = msg.archivo ? ` (${msg.archivo}${msg.linea ? ", línea " + msg.linea : ""})` : "";
      return anadirMensaje(msg.mensaje + donde, "error");
    }
    if (msg.tipo === "navegar") {
      const destino = buscarEntrada(montaje.indice, msg.base, msg.url);
      if (destino && destino.tipo === "html") opciones.alNavegar(destino);
      else anadirMensaje(`El enlace «${msg.url}» no lleva a ninguna página HTML de tus apuntes.`, "aviso");
    }
  }

  async function responderArchivo(montaje, msg) {
    const e = buscarEntrada(montaje.indice, msg.base, msg.url);
    const responder = (datos, transferir) => {
      if (montaje === actual && montaje.puerto) montaje.puerto.postMessage(Object.assign({ id: msg.id }, datos), transferir || []);
    };
    if (!e) {
      if (msg.como === "binario") anadirMensaje(`El ejemplo pidió «${msg.url}», pero no está en tus apuntes (respuesta 404).`, "aviso");
      return responder({ encontrado: false });
    }
    try {
      if (msg.como === "dataurl") {
        responder({ encontrado: true, datos: await dataUrlDe(e), mime: mimeDe(e) });
      } else {
        const bytes = await bytesDe(e);
        responder({ encontrado: true, datos: bytes, mime: mimeDe(e) }, [bytes]);
      }
    } catch {
      responder({ encontrado: false });
    }
  }

  // Detiene el ejemplo actual (al quitar el iframe dejan de ejecutarse sus scripts)
  function detener() {
    generacion++;
    if (actual && actual.puerto) actual.puerto.close();
    actual = null;
    $("previa-marco").replaceChildren();
    limpiarMensajes();
  }

  async function mostrar(entrada, indice) {
    detener();
    const miGeneracion = generacion;
    $("previa-titulo").textContent = entrada.nombre;
    $("previa-titulo").title = entrada.ruta;

    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", SANDBOX);
    iframe.title = "Vista previa de " + entrada.nombre;
    actual = { iframe, entrada, indice, puerto: null, cargas: 0, errores: 0, mensajes: new Set() };
    const montaje = actual;

    let montado;
    try {
      montado = await montar(entrada, indice);
    } catch (err) {
      if (miGeneracion === generacion) anadirMensaje("No se pudo montar la página: " + err.message, "error");
      return;
    }
    if (miGeneracion !== generacion) return; // se pidió otra vista previa mientras tanto

    // Si se carga más de una vez es que el ejemplo cambió de página (p. ej. location.href = ...)
    iframe.addEventListener("load", () => {
      if (++montaje.cargas > 1 && montaje === actual) {
        anadirMensaje("El ejemplo intentó cambiar de página (location). Pulsa el botón de recargar para volver a cargarlo.", "aviso");
      }
    });
    iframe.srcdoc = montado.html;
    $("previa-marco").replaceChildren(iframe);
    for (const aviso of montado.avisos) anadirMensaje(aviso, "aviso");
  }

  function recargar() {
    const anterior = actual;
    if (anterior) mostrar(anterior.entrada, anterior.indice);
  }

  function configurar(opts) {
    opciones = Object.assign(opciones, opts);
    window.addEventListener("message", alRecibirMensaje);
    $("btn-previa-recargar").addEventListener("click", recargar);
  }

  return {
    configurar,
    mostrar,
    detener,
    recargar,
    entradaActual: () => (actual ? actual.entrada : null),
  };
})();
