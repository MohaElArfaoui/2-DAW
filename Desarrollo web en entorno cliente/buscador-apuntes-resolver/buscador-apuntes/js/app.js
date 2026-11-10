"use strict";

/*
 * APP — conecta las pantallas con los eventos.
 *   1. Login: un único usuario; se guardan su nombre y su carpeta.
 *   2. Buscador: indexa la carpeta, busca mientras escribes y muestra el código.
 */
(() => {
  const $ = (selector) => document.querySelector(selector);

  // Dentro de un marco (como el panel integrado de Live Preview en VS Code) el
  // permiso para leer la carpeta no puede mostrarse y la app se queda colgada.
  const dentroDeMarco = window.self !== window.top;

  // Chrome y Edge tienen File System Access API; Firefox, Android o un marco
  // usan el plan B (<input webkitdirectory>), que pide la carpeta cada vez.
  const soportaCarpetas = typeof window.showDirectoryPicker === "function" && !dentroDeMarco;

  const estado = {
    usuario: null,
    carpeta: null,        // FileSystemDirectoryHandle guardado (Chrome/Edge)
    eleccionNueva: null,  // carpeta elegida en el formulario de usuario nuevo
    fuente: null,         // lo que se está indexando ahora
    indice: [],
    generacion: 0,        // cambia al salir o releer: cancela la indexación anterior
    entradaAbierta: null,
    lineaAbierta: null,
    urlsPdf: new Map(),   // URLs blob ya creadas para cada PDF
    previa: { activa: false, expandida: null }, // expandida: null | "codigo" | "previa"
    modo: "buscar",       // "buscar" | "resolver"
  };

  // =====================================================================
  // LOGIN
  // =====================================================================

  function mensajeLogin(texto, tipo) {
    const p = $("#mensaje-login");
    p.textContent = texto || "";
    p.className = "mensaje" + (tipo ? " " + tipo : "");
  }

  async function mostrarLogin() {
    document.body.className = "en-login";
    $("#pantalla-app").hidden = true;
    $("#pantalla-login").hidden = false;
    mensajeLogin("");

    estado.usuario = await Almacen.leerUsuario();
    estado.carpeta = soportaCarpetas ? await Almacen.leerCarpeta() : null;

    if (!soportaCarpetas) {
      const aviso = $("#aviso-navegador");
      aviso.hidden = false;
      aviso.textContent = dentroDeMarco
        ? "Dentro de VS Code la carpeta se pide cada vez que entras y los PDF no se pueden abrir. " +
          "Abriendo la app en Chrome o Edge solo eliges la carpeta una vez."
        : "Este navegador no puede recordar carpetas: te pedirá la carpeta cada vez que entres. " +
          "En Chrome o Edge solo la eliges una vez.";
      $("#btn-cambiar-carpeta").hidden = true;
    }
    // Si ya se usa el plan B, el botón alternativo no aporta nada
    $("#btn-carpeta-alternativa").hidden = !soportaCarpetas;
    $("#btn-carpeta-alternativa").textContent = estado.usuario ? "Entrar eligiendo la carpeta (VS Code)" : "Elegir carpeta en VS Code";

    if (estado.usuario) {
      $("#login-nuevo").hidden = true;
      $("#login-guardado").hidden = false;
      $("#texto-usuario").textContent = estado.usuario;
      $("#texto-carpeta").textContent =
        (estado.carpeta && estado.carpeta.name) || (await Almacen.leerNombreCarpeta()) || "sin elegir";
      $("#btn-entrar").focus();
    } else {
      $("#login-guardado").hidden = true;
      $("#login-nuevo").hidden = false;
      estado.eleccionNueva = null;
      $("#nombre-carpeta-nueva").textContent = "Ninguna";
      actualizarBotonCrear();
      $("#campo-nombre").focus();
    }
  }

  // Abre el selector de carpetas. Devuelve { nombre, handle } o { nombre, archivos } o null si se cancela.
  async function elegirCarpeta() {
    if (soportaCarpetas) {
      try {
        const handle = await window.showDirectoryPicker({ id: "apuntes", mode: "read" });
        return { nombre: handle.name, handle };
      } catch (err) {
        if (err.name === "AbortError") return null; // el usuario cerró el diálogo
        throw err;
      }
    }
    return elegirConInput();
  }

  // Plan B: <input type="file" webkitdirectory>
  function elegirConInput() {
    return new Promise((resolve) => {
      const input = $("#input-carpeta");
      input.value = "";
      const limpiar = () => {
        input.removeEventListener("change", alCambiar);
        input.removeEventListener("cancel", alCancelar);
      };
      const alCambiar = () => {
        limpiar();
        const archivos = input.files;
        if (!archivos || !archivos.length) return resolve(null);
        resolve({ nombre: archivos[0].webkitRelativePath.split("/")[0], archivos });
      };
      const alCancelar = () => { limpiar(); resolve(null); };
      input.addEventListener("change", alCambiar);
      input.addEventListener("cancel", alCancelar);
      input.click();
    });
  }

  function fuenteDe(eleccion) {
    return eleccion.handle
      ? { tipo: "carpeta", handle: eleccion.handle, nombre: eleccion.nombre }
      : { tipo: "archivos", archivos: eleccion.archivos, nombre: eleccion.nombre };
  }

  function actualizarBotonCrear() {
    $("#btn-crear-usuario").disabled = !($("#campo-nombre").value.trim() && estado.eleccionNueva);
  }

  // Los permisos de una carpeta guardada caducan al cerrar el navegador:
  // hay que volver a pedirlos, y solo se puede tras un clic (por eso va en "Entrar").
  async function pedirPermiso(handle) {
    const opciones = { mode: "read" };
    try {
      if ((await handle.queryPermission(opciones)) === "granted") return true;
      return (await handle.requestPermission(opciones)) === "granted";
    } catch {
      return false;
    }
  }

  // Cada vez que se pide una carpeta se cuenta un intento nuevo. Si el selector de
  // Chrome se quedó colgado y respondiera más tarde, su respuesta se ignora.
  let intentoCarpeta = 0;

  async function alElegirCarpetaNueva() {
    mensajeLogin("");
    const intento = ++intentoCarpeta;
    try {
      const eleccion = await elegirCarpeta();
      if (!eleccion || intento !== intentoCarpeta) return;
      estado.eleccionNueva = eleccion;
      $("#nombre-carpeta-nueva").textContent = eleccion.nombre;
      actualizarBotonCrear();
    } catch (err) {
      mensajeLogin(textoErrorCarpeta(err), "error");
    }
  }

  async function alCrearUsuario() {
    const nombre = $("#campo-nombre").value.trim();
    const eleccion = estado.eleccionNueva;
    if (!nombre || !eleccion) return;

    try {
      await Almacen.guardarUsuario(nombre);
      await Almacen.guardarNombreCarpeta(eleccion.nombre);
      if (eleccion.handle) {
        await Almacen.guardarCarpeta(eleccion.handle);
        estado.carpeta = eleccion.handle;
      }
    } catch {
      mensajeLogin("No se pudo guardar el usuario; la próxima vez te lo volverá a pedir.", "error");
    }
    estado.usuario = nombre;
    abrirApp(fuenteDe(eleccion));
  }

  async function alEntrar() {
    mensajeLogin("");
    if (soportaCarpetas) {
      if (!estado.carpeta) {
        mensajeLogin("No hay carpeta guardada. Pulsa «Cambiar carpeta» o, en VS Code, «Entrar eligiendo la carpeta».", "error");
        return;
      }
      if (!(await pedirPermiso(estado.carpeta))) {
        mensajeLogin("Hace falta permiso para leer la carpeta. Pulsa «Entrar» y acepta el aviso.", "error");
        return;
      }
      abrirApp({ tipo: "carpeta", handle: estado.carpeta, nombre: estado.carpeta.name });
    } else {
      const eleccion = await elegirConInput();
      if (!eleccion) return;
      await Almacen.guardarNombreCarpeta(eleccion.nombre).catch(() => {});
      abrirApp(fuenteDe(eleccion));
    }
  }

  // Botón "Elegir carpeta en VS Code": fuerza el plan B.
  // Sirve en visores integrados (como el panel de Live Preview de VS Code) donde el
  // selector de Chrome se abre, pero el aviso de permiso no puede mostrarse y se queda colgado.
  async function alCarpetaAlternativa() {
    mensajeLogin("");
    intentoCarpeta++;
    const eleccion = await elegirConInput();
    if (!eleccion) return;
    if (estado.usuario) {
      // Usuario ya guardado: se entra directamente (esta carpeta no se puede recordar)
      await Almacen.guardarNombreCarpeta(eleccion.nombre).catch(() => {});
      abrirApp(fuenteDe(eleccion));
    } else {
      estado.eleccionNueva = eleccion;
      $("#nombre-carpeta-nueva").textContent = eleccion.nombre;
      actualizarBotonCrear();
    }
  }

  async function alCambiarCarpeta() {
    mensajeLogin("");
    try {
      const eleccion = await elegirCarpeta();
      if (!eleccion || !eleccion.handle) return;
      await Almacen.guardarCarpeta(eleccion.handle);
      await Almacen.guardarNombreCarpeta(eleccion.nombre);
      estado.carpeta = eleccion.handle;
      $("#texto-carpeta").textContent = eleccion.nombre;
      mensajeLogin("Carpeta cambiada.", "ok");
    } catch (err) {
      mensajeLogin(textoErrorCarpeta(err), "error");
    }
  }

  async function alBorrarUsuario() {
    const seguro = confirm("¿Borrar el usuario y la carpeta guardada?\nTendrás que configurarlos de nuevo.");
    if (!seguro) return;
    await Almacen.borrarTodo();
    estado.usuario = null;
    estado.carpeta = null;
    $("#campo-nombre").value = "";
    await mostrarLogin();
    mensajeLogin("Usuario borrado.", "ok");
  }

  function textoErrorCarpeta(err) {
    // Chrome no deja elegir carpetas "de sistema" (C:\, la carpeta de usuario, Windows...)
    if (err && (err.name === "SecurityError" || err.name === "NotAllowedError")) {
      return "El navegador no permite esa carpeta. Elige una subcarpeta (por ejemplo, la de tus apuntes).";
    }
    return "No se pudo abrir la carpeta: " + (err && err.message ? err.message : "error desconocido");
  }

  // =====================================================================
  // BUSCADOR
  // =====================================================================

  function abrirApp(fuente) {
    estado.fuente = fuente;
    document.body.className = "en-app sin-busqueda";
    $("#pantalla-login").hidden = true;
    $("#pantalla-app").hidden = false;
    $("#chip-usuario").textContent = estado.usuario;
    $("#chip-usuario").title = "Carpeta: " + fuente.nombre;
    $("#campo-busqueda").value = "";
    $("#lista-resultados").replaceChildren();
    $("#resumen-resultados").textContent = "";
    cerrarVisor();
    $("#campo-busqueda").focus();
    indexar();
  }

  function salir() {
    estado.generacion++; // cancela lo que se esté leyendo
    desactivarPrevia();
    estado.indice = [];
    estado.fuente = null;
    for (const url of estado.urlsPdf.values()) URL.revokeObjectURL(url);
    estado.urlsPdf.clear();
    mostrarLogin();
  }

  function ponerEstado(texto, hechos, total) {
    $("#texto-estado").textContent = texto;
    const barra = $("#progreso");
    if (total) {
      barra.hidden = false;
      barra.max = total;
      barra.value = hechos;
    } else {
      barra.hidden = true;
    }
  }

  const formato = (n) => n.toLocaleString("es-ES");

  function resumenIndice() {
    const cuenta = (tipo) => estado.indice.filter((e) => e.tipo === tipo).length;
    const pdfs = cuenta("pdf");
    const datos = cuenta("datos");
    const codigo = estado.indice.length - pdfs - datos - cuenta("recurso");
    return `${formato(codigo)} archivos de código, ${formato(datos)} de datos y ${formato(pdfs)} PDF en «${estado.fuente.nombre}»`;
  }

  async function indexar() {
    const generacion = ++estado.generacion;
    const cancelado = () => generacion !== estado.generacion;
    estado.indice = [];
    estado.entradaAbierta = null;

    const alProgreso = (info) => {
      if (cancelado()) return;
      if (info.fase === "explorando") ponerEstado(`Explorando carpetas… ${formato(info.hechos)} archivos encontrados`);
      else if (info.fase === "leyendo") ponerEstado(`Leyendo archivos… ${formato(info.hechos)} de ${formato(info.total)}`, info.hechos, info.total);
    };

    try {
      const indice = await Indexador.indexar(estado.fuente, { cancelado, alProgreso });
      if (cancelado()) return;
      estado.indice = indice;
      ponerEstado(resumenIndice());
      buscar();

      // Los PDF se leen después y en segundo plano: ya puedes buscar mientras tanto
      const total = indice.filter((e) => e.tipo === "pdf" && e.pdfEstado === "pendiente").length;
      if (!total) return;
      await Indexador.leerPdfs(indice, estado.fuente.nombre, {
        cancelado,
        alProgreso: (info) => {
          if (cancelado()) return;
          ponerEstado(`${resumenIndice()}. Leyendo texto de PDF ${info.hechos} de ${info.total}`, info.hechos, info.total);
          if (info.hechos % 3 === 0 || info.hechos === info.total) buscar();
        },
      });
      if (!cancelado()) ponerEstado(resumenIndice());
    } catch (err) {
      if (cancelado()) return;
      ponerEstado("No se pudo leer la carpeta (¿se ha movido o borrado?). Sal y elige otra.");
      console.error(err);
    }
  }

  function opcionesBusqueda() {
    const tipos = new Set([...document.querySelectorAll('input[name="tipo"]:checked')].map((c) => c.value));
    return {
      enCarpeta: $("#en-carpeta").checked,
      enNombre: $("#en-nombre").checked,
      enContenido: $("#en-contenido").checked,
      tipos,
    };
  }

  // =====================================================================
  // MODO RESOLVER
  // =====================================================================

  function cambiarModo(modo) {
    estado.modo = modo;
    document.body.classList.toggle("modo-resolver", modo === "resolver");
    $("#modo-buscar").setAttribute("aria-pressed", String(modo === "buscar"));
    $("#modo-resolver").setAttribute("aria-pressed", String(modo === "resolver"));
    $("#caja-resolver").hidden = modo !== "resolver";
    desactivarPrevia();
    buscar();
    (modo === "resolver" ? $("#campo-enunciado") : $("#campo-busqueda")).focus();
  }

  function resolver() {
    const enunciado = $("#campo-enunciado").value.trim();
    if (!enunciado) {
      $("#lista-resultados").replaceChildren();
      $("#resumen-resultados").textContent = "";
      return;
    }
    if (document.body.classList.contains("sin-busqueda")) {
      document.body.classList.replace("sin-busqueda", "con-busqueda");
    }
    const res = Resolver.resolver(estado.indice, enunciado);
    Resolver.pintar($("#lista-resultados"), $("#resumen-resultados"), res, {
      nombreRaiz: estado.fuente ? estado.fuente.nombre : "",
      alAbrirArchivo: abrirArchivo,
      alAbrirPdf: abrirPdf,
    });
  }

  function buscar() {
    if (estado.modo === "resolver") { resolver(); return; }
    const consulta = $("#campo-busqueda").value;
    const ts = Buscador.terminos(consulta);

    // La primera vez que se busca, la barra sube arriba y se queda ahí
    if (ts.length && document.body.classList.contains("sin-busqueda")) {
      document.body.classList.replace("sin-busqueda", "con-busqueda");
    }
    if (!ts.length) {
      $("#lista-resultados").replaceChildren();
      $("#resumen-resultados").textContent = "";
      return;
    }

    const opciones = opcionesBusqueda();
    const resultados = Buscador.buscar(estado.indice, ts, opciones);
    Vista.pintarResultados($("#lista-resultados"), $("#resumen-resultados"), resultados, {
      ts,
      enContenido: opciones.enContenido,
      nombreRaiz: estado.fuente ? estado.fuente.nombre : "",
      alAbrirArchivo: abrirArchivo,
      alAbrirPdf: abrirPdf,
    });
    marcarActivo();

    // Si el archivo abierto sigue ahí, se repinta para actualizar el resaltado
    if (estado.entradaAbierta) pintarArchivo(estado.entradaAbierta, estado.lineaAbierta);
  }

  // Esperar un poco tras cada tecla para no buscar en cada pulsación (debounce)
  let temporizador = null;
  function buscarConRetraso() {
    clearTimeout(temporizador);
    temporizador = setTimeout(buscar, 120);
  }

  function marcarActivo() {
    for (const b of document.querySelectorAll(".resultado-principal.activo")) b.classList.remove("activo");
    if (estado.entradaAbierta) {
      const b = document.querySelector(`.resultado-principal[data-id="${estado.entradaAbierta.id}"]`);
      if (b) b.classList.add("activo");
    }
  }

  function abrirArchivo(entrada, linea) {
    estado.entradaAbierta = entrada;
    estado.lineaAbierta = linea;
    pintarArchivo(entrada, linea);
    $("#principal").classList.add("viendo-archivo"); // en móvil: se muestra solo el visor
    marcarActivo();
    if (estado.previa.activa) actualizarPrevia();
  }

  const esCodigoODatos = (e) => e.tipo !== "pdf" && e.tipo !== "recurso";

  function pintarArchivo(entrada, linea) {
    const hermanos = estado.indice.filter((e) => e.carpeta === entrada.carpeta && esCodigoODatos(e));
    Vista.pintarVisor({
      entrada,
      hermanos,
      linea,
      ts: estado.modo === "buscar" && $("#en-contenido").checked ? Buscador.terminos($("#campo-busqueda").value) : [],
      nombreRaiz: estado.fuente ? estado.fuente.nombre : "",
      previaActiva: estado.previa.activa,
      hayHtml: hermanos.some((e) => e.tipo === "html"),
      codigoExpandido: estado.previa.expandida === "codigo",
      alCambiar: (otra) => abrirArchivo(otra, null),
      alVolver: () => {
        desactivarPrevia();
        $("#principal").classList.remove("viendo-archivo");
      },
      alCopiar: copiar,
      alAlternarPrevia: alternarPrevia,
      alExpandirCodigo: () => expandir("codigo"),
    });
  }

  function cerrarVisor() {
    desactivarPrevia();
    estado.entradaAbierta = null;
    estado.lineaAbierta = null;
    $("#principal").classList.remove("viendo-archivo");
    Vista.vaciarVisor();
  }

  // =====================================================================
  // VISTA PREVIA (interruptor, mitades y expandir)
  // =====================================================================

  // ¿Qué HTML se ve? El de la pestaña si es HTML; si no, el que ya se veía de
  // esa carpeta; si no, su index.html o el primer HTML que tenga.
  function htmlParaPrevia(entrada) {
    if (entrada.tipo === "html") return entrada;
    const visible = Previa.entradaActual();
    if (visible && visible.carpeta === entrada.carpeta) return visible;
    const htmls = estado.indice.filter((e) => e.carpeta === entrada.carpeta && e.tipo === "html");
    return htmls.find((e) => /^index\.html?$/i.test(e.nombre)) || htmls[0] || null;
  }

  function actualizarPrevia() {
    const html = estado.entradaAbierta && htmlParaPrevia(estado.entradaAbierta);
    if (!html) { desactivarPrevia(); return; }
    if (html !== Previa.entradaActual()) Previa.mostrar(html, estado.indice);
  }

  // Las clases CSS deciden qué se ve: resultados, mitades o una mitad expandida
  function aplicarDisposicion() {
    const { activa, expandida } = estado.previa;
    $("#principal").classList.toggle("con-previa", activa);
    const contenido = $("#visor-contenido");
    contenido.classList.toggle("con-previa", activa);
    contenido.classList.toggle("expandida-codigo", activa && expandida === "codigo");
    contenido.classList.toggle("expandida-previa", activa && expandida === "previa");
    $("#visor-previa").hidden = !activa;

    // Cada botón lleva los dos iconos; el CSS muestra uno u otro según aria-pressed
    const ajustarBoton = (boton, pulsado, textoExpandir) => {
      if (!boton) return;
      boton.title = pulsado ? "Volver a la mitad" : textoExpandir;
      boton.setAttribute("aria-label", boton.title);
      boton.setAttribute("aria-pressed", pulsado ? "true" : "false");
    };
    ajustarBoton($("#btn-previa-expandir"), expandida === "previa", "Expandir la vista previa");
    ajustarBoton(document.querySelector("#visor-codigo .visor-barra .btn-icono"), expandida === "codigo", "Expandir el código");
  }

  function alternarPrevia() {
    if (estado.previa.activa) { desactivarPrevia(); return; }
    estado.previa.activa = true;
    estado.previa.expandida = null;
    aplicarDisposicion();
    pintarArchivo(estado.entradaAbierta, estado.lineaAbierta); // para mostrar el botón de expandir
    actualizarPrevia();
  }

  function desactivarPrevia() {
    if (!estado.previa.activa) return;
    estado.previa.activa = false;
    estado.previa.expandida = null;
    Previa.detener();
    aplicarDisposicion();
    if (estado.entradaAbierta) pintarArchivo(estado.entradaAbierta, estado.lineaAbierta);
  }

  function expandir(cual) {
    estado.previa.expandida = estado.previa.expandida === cual ? null : cual;
    aplicarDisposicion();
  }

  // El PDF se abre con el visor del propio navegador; #page=N salta a esa página
  function abrirPdf(entrada, pagina) {
    let url = estado.urlsPdf.get(entrada.id);
    if (!url) {
      url = URL.createObjectURL(entrada.archivo);
      estado.urlsPdf.set(entrada.id, url);
    }
    const ventana = window.open(url + "#page=" + (pagina || 1), "_blank");
    // Si no se pudo abrir (panel de VS Code, bloqueador de ventanas), avisamos en vez de no hacer nada
    if (!ventana) {
      ponerEstado(`No se pudo abrir «${entrada.nombre}» aquí. Ábrelo desde Chrome o Edge.`);
    }
  }

  async function copiar(texto) {
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch {
      // Plan B por si el portapapeles moderno no está disponible
      const area = document.createElement("textarea");
      area.value = texto;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      area.remove();
      return ok;
    }
  }

  // =====================================================================
  // EVENTOS
  // =====================================================================

  $("#campo-nombre").addEventListener("input", actualizarBotonCrear);
  $("#campo-nombre").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !$("#btn-crear-usuario").disabled) alCrearUsuario();
  });
  $("#btn-elegir-carpeta").addEventListener("click", alElegirCarpetaNueva);
  $("#btn-crear-usuario").addEventListener("click", alCrearUsuario);
  $("#btn-entrar").addEventListener("click", alEntrar);
  $("#btn-cambiar-carpeta").addEventListener("click", alCambiarCarpeta);
  $("#btn-borrar-usuario").addEventListener("click", alBorrarUsuario);
  $("#btn-carpeta-alternativa").addEventListener("click", alCarpetaAlternativa);

  $("#campo-busqueda").addEventListener("input", () => {
    desactivarPrevia(); // al buscar otra cosa vuelven a verse los resultados
    buscarConRetraso();
  });
  $("#campo-busqueda").addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.target.value = ""; buscar(); }
  });
  for (const filtro of document.querySelectorAll(".filtros input")) filtro.addEventListener("change", buscar);
  $("#btn-reindexar").addEventListener("click", () => { cerrarVisor(); indexar(); });
  $("#btn-salir").addEventListener("click", salir);
  $("#btn-previa-expandir").addEventListener("click", () => expandir("previa"));

  $("#modo-buscar").addEventListener("click", () => cambiarModo("buscar"));
  $("#modo-resolver").addEventListener("click", () => cambiarModo("resolver"));
  $("#btn-resolver").addEventListener("click", () => { desactivarPrevia(); resolver(); });
  $("#campo-enunciado").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); desactivarPrevia(); resolver(); }
  });

  // Un enlace dentro de la vista previa lleva a otra página del ejemplo
  Previa.configurar({ alNavegar: (entrada) => abrirArchivo(entrada, null) });

  // Atajo: "/" o Ctrl+K llevan al buscador desde cualquier sitio
  document.addEventListener("keydown", (e) => {
    if ($("#pantalla-app").hidden) return;
    const escribiendo = document.activeElement.matches('input[type="text"], input[type="search"], textarea');
    if ((e.key === "/" && !escribiendo) || (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
      const campo = estado.modo === "resolver" ? $("#campo-enunciado") : $("#campo-busqueda");
      campo.focus();
      campo.select();
    }
  });

  mostrarLogin();
})();
