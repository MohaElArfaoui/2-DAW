# Buscador de apuntes

Aplicación web **sin internet** para encontrar rápido ejemplos (HTML, CSS, JS, Java, datos JSON/XML/CSV/TXT) y teoría en PDF dentro de una carpeta del equipo, y ver los ejemplos HTML funcionando.

## Cómo usarla

1. Copia la carpeta `buscador-apuntes` entera al equipo (USB, GitHub…).
2. Abre `index.html` con doble clic en **Chrome o Edge**.
3. La primera vez: escribe tu nombre, elige la carpeta de apuntes y pulsa *Guardar y entrar*.
4. Las siguientes veces: pulsa *Entrar* y acepta el aviso de permiso del navegador.
5. Busca. Atajos: `/` o `Ctrl+K` van al buscador; `Esc` lo vacía.

- **Cambiar carpeta**: botón en la pantalla de inicio.
- **Borrar usuario**: olvida el nombre, la carpeta y la caché de PDFs.
- **Releer**: vuelve a leer la carpeta si has añadido o cambiado archivos.
- Los PDF se abren en una pestaña nueva, en la página donde aparece lo buscado; dentro, `Ctrl+F`.
- **Vista previa**: el interruptor del visor muestra el ejemplo funcionando en la mitad derecha. El botón de expandir de cada mitad la pone a pantalla completa; el de recargar vuelve a ejecutar el ejemplo. Al escribir otra búsqueda se cierra y vuelven los resultados.

Si Chrome dice que una carpeta "contiene archivos del sistema" (por ejemplo, tu carpeta de usuario), elige una subcarpeta.

En Firefox también funciona, pero no puede recordar la carpeta: la pide cada vez.

**En el panel de Live Preview de VS Code** el botón *Elegir carpeta…* se abre pero no termina (el panel no puede mostrar el aviso de permiso). Usa el botón **Elegir carpeta en VS Code** (o *Entrar eligiendo la carpeta*, si ya tienes usuario): la pide cada vez, pero funciona. Los PDF no se pueden abrir desde el panel.

## Modo «Resolver»

Arriba, junto al nombre, cambia de **Buscar** a **Resolver**. Pega el enunciado de un ejercicio y pulsa *Buscar parecidos* (o `Ctrl+Enter`). Te muestra:

1. **Lo que pide el enunciado**: los patrones que reconoce (delegación, eliminar con `splice`, un botón con dos modos, `fetch`…), con una plantilla y **un ejemplo real de tus archivos** (pulsa y se abre en esa línea).
2. **Tus ejercicios más parecidos**, con un porcentaje de parecido y sus archivos para abrirlos.
3. **Teoría relacionada**: las páginas de tus PDF que más se parecen (se abren en esa página).

No usa internet ni IA: compara palabras (BM25). No escribe la solución: te lleva a cómo lo resolviste tú en algo parecido. Los patrones se ajustan en `PATRONES` de `js/resolver.js`.

## Cómo funciona

| Archivo | Qué hace |
|---|---|
| `index.html` | Las dos pantallas (login y buscador). Scripts clásicos, sin `type="module"`, porque Chrome bloquea los módulos con `file://`. |
| `css/estilos.css` | Diseño brutalista: ámbar `#FFB000` (60 %, fondos), turquesa `#00A88E` (25 %, lo que se pulsa) y magenta `#E0187E` (15 %, selección, coincidencias y errores). Responsive. Con menos de 860 px se ve una sola columna (resultados **o** código). |
| `js/almacen.js` | Usuario, carpeta (un `FileSystemDirectoryHandle`) y caché de PDFs en IndexedDB. No usa `localStorage`: en `file://` lo comparten todas las páginas y un ejercicio podría borrarlo. |
| `js/indexador.js` | Recorre la carpeta una vez y crea el índice en memoria. Lee los PDF después, en segundo plano. |
| `js/buscador.js` | Búsqueda parcial sin mayúsculas ni tildes. Varias palabras = deben aparecer todas. |
| `js/lectorPdf.js` | Extrae el texto de los PDF con PDF.js (se carga solo si hay PDFs). |
| `js/vista.js` | Pinta resultados y visor. El código se mete siempre como texto, nunca con `innerHTML`. |
| `js/previa.js` | Vista previa: monta el HTML con su CSS, JS e imágenes y lo ejecuta en un `<iframe srcdoc>` aislado (`sandbox`). Dentro sustituye `localStorage`/`sessionStorage` (en memoria), `fetch` y `XMLHttpRequest` (piden los archivos a la app por un `MessageChannel`). |
| `js/resolver.js` | Modo Resolver: detecta patrones en un enunciado y ordena tus ejercicios y páginas de PDF por parecido (BM25). |
| `js/app.js` | Eventos y flujo entre pantallas. |
| `fonts/` | Archivo (texto y títulos) e IBM Plex Mono (código), licencia OFL. Van incluidas para que se vean igual sin internet. |
| `lib/prism.js` | Prism 1.29 (MIT): colorea el código del visor como un editor (HTML, CSS, JS, Java, JSON, XML). |
| `lib/` | PDF.js 3.11 (Mozilla, licencia Apache 2.0). Versión "legacy" porque trae `.js` clásicos. |

## Personalizar

- **Más tipos de archivo**: `TIPOS` en `js/indexador.js`, un chip en `index.html` y un color `.tipo-xxx` en el CSS. Imágenes y fuentes son tipo `recurso`: solo las usa la vista previa.
- **Archivos que se saltan**: `ARCHIVOS_IGNORADOS` en `js/indexador.js` (de momento, `package-lock.json`).
- **Carpetas que se saltan**: `CARPETAS_IGNORADAS` en `js/indexador.js` (además de las que empiezan por punto, como `.git`).

## Limitaciones

- Vista previa: no funcionan los módulos con `import`, los recursos de internet (CDN, APIs públicas) ni el `XMLHttpRequest` síncrono. Las peticiones a URLs completas (por ejemplo `http://localhost:3000` de `json-server`) sí van a la red. Los errores del ejemplo aparecen en la barra de la vista previa.
- Los PDF escaneados (fotos) no tienen texto: solo se encuentran por nombre.
- Archivos de texto de más de 2 MB y PDF de más de 60 MB: solo por nombre.
