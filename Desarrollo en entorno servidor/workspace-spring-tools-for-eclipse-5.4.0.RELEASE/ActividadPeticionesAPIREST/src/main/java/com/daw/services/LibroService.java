package com.daw.services;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

import com.daw.datamodel.entities.Libro;
import com.daw.datamodel.entities.ModificarLibro;
import com.daw.datamodel.entities.Resena;

import jakarta.annotation.PostConstruct; // En Spring Boot 2.x: javax.annotation.PostConstruct

/**
 * Servicio que gestiona los libros y sus reseñas en memoria. Cada libro
 * contiene su propia lista de reseñas (atributo List<Resena> de la entidad
 * Libro).
 *
 * Convenio de errores (para que el controlador lo traduzca a códigos HTTP): -
 * Optional vacío / false -> el recurso no existe -> 404 -
 * IllegalArgumentException -> datos de entrada inválidos -> 400
 */
@Service
public class LibroService {

	private final List<Libro> libros = new CopyOnWriteArrayList<>();

	private final AtomicLong siguienteIdLibro = new AtomicLong(1);
	private final AtomicLong siguienteIdResena = new AtomicLong(1);

	/** Se ejecuta una vez, al crearse el bean, y carga los datos de ejemplo. */
	@PostConstruct
	public void cargarDatosEjemplo() {
		Libro quijote = crear(new Libro(null, "Don Quijote de la Mancha", "Miguel de Cervantes", "novela", 1605));
		Libro cien = crear(new Libro(null, "Cien años de soledad", "Gabriel García Márquez", "novela", 1967));
		Libro rimas = crear(new Libro(null, "Rimas y leyendas", "Gustavo Adolfo Bécquer", "poesía", 1871));
		Libro fortunata = crear(new Libro(null, "Fortunata y Jacinta", "Benito Pérez Galdós", "novela", 1887));
		crear(new Libro(null, "Novelas ejemplares", "Miguel de Cervantes", "relatos", 1613));

		// La primera reseña tiene id 1 y pertenece al libro 2 (así funcionan las
		// pruebas de la actividad)
		crearResena(cien.getId(), new Resena(null, "ana", 5, "Una obra maestra del realismo mágico."));
		crearResena(quijote.getId(), new Resena(null, "luis", 5, "Imprescindible, y más divertido de lo que parece."));
		crearResena(quijote.getId(), new Resena(null, "marta", 4, "Largo, pero merece la pena."));
		crearResena(rimas.getId(), new Resena(null, "pedro", 4, "Poemas breves y muy bellos."));
		crearResena(fortunata.getId(), new Resena(null, "lucia", 3, "Buena, aunque algo densa."));
	}

	// ------------------------------------------------------------------ LIBROS

	/**
	 * Devuelve los libros, filtrando por autor (contiene, sin distinguir
	 * mayúsculas) y/o género (exacto) si se indican.
	 */
	public List<Libro> listar(String autor, String genero) {
		return libros.stream().filter(l -> autor == null || l.getAutor().toLowerCase().contains(autor.toLowerCase()))
				.filter(l -> genero == null || l.getGenero() != null && l.getGenero().equalsIgnoreCase(genero))
				.toList();
	}

	public Optional<Libro> buscarPorId(Long id) {
		return libros.stream().filter(l -> l.getId().equals(id)).findFirst();
	}

	public boolean existe(Long id) {
		return buscarPorId(id).isPresent();
	}

	/**
	 * Crea un libro asignándole un id nuevo. Lanza IllegalArgumentException si
	 * faltan título o autor.
	 */
	public Libro crear(Libro libro) {
		validarLibro(libro);
		libro.setResenas(new CopyOnWriteArrayList<>()); // un libro nuevo empieza sin reseñas
		libro.setId(siguienteIdLibro.getAndIncrement());
		libros.add(libro);
		return libro;
	}

	/**
	 * Sustituye los datos del libro (PUT). Sus reseñas se conservan. Optional vacío
	 * si no existe.
	 */
	public Optional<Libro> reemplazar(Long id, Libro nuevo) {
		validarLibro(nuevo);
		return buscarPorId(id).map(actual -> {
			actual.setTitulo(nuevo.getTitulo());
			actual.setAutor(nuevo.getAutor());
			actual.setGenero(nuevo.getGenero());
			actual.setAnio(nuevo.getAnio());
			return actual;
		});
	}

	/**
     * Modifica solo los campos informados en el DTO (PATCH): los que sean null no se tocan.
     * Lanza IllegalArgumentException si el título o el autor se informan vacíos.
     * Optional vacío si el libro no existe.
     */
    public Optional<Libro> modificarParcial(Long id, ModificarLibro cambios) {
        if (cambios == null) {
            throw new IllegalArgumentException("No se han indicado cambios");
        }
        if (cambios.getTitulo() != null && cambios.getTitulo().isBlank()) {
            throw new IllegalArgumentException("El título no puede estar vacío");
        }
        if (cambios.getAutor() != null && cambios.getAutor().isBlank()) {
            throw new IllegalArgumentException("El autor no puede estar vacío");
        }
 
        return buscarPorId(id).map(libro -> {
            if (cambios.getTitulo() != null) {
                libro.setTitulo(cambios.getTitulo());
            }
            if (cambios.getAutor() != null) {
                libro.setAutor(cambios.getAutor());
            }
            if (cambios.getGenero() != null) {
                libro.setGenero(cambios.getGenero());
            }
            if (cambios.getAnio() != null) {
                libro.setAnio(cambios.getAnio());
            }
            return libro;
        });
    }

	/** Elimina el libro (y con él sus reseñas). Devuelve false si no existía. */
	public boolean eliminar(Long id) {
		return libros.removeIf(l -> l.getId().equals(id));
	}

	// ----------------------------------------------------------------- RESEÑAS

	/**
	 * Reseñas de un libro. Optional vacío si el libro no existe (una lista vacía es
	 * un resultado válido).
	 */
	public Optional<List<Resena>> listarResenas(Long idLibro) {
		return buscarPorId(idLibro).map(libro -> List.copyOf(libro.getResenas()));
	}

	/** Optional vacío si no existe el libro o la reseña. */
	public Optional<Resena> buscarResena(Long idLibro, Long idResena) {
		return listarResenas(idLibro)
				.flatMap(lista -> lista.stream().filter(r -> r.getId().equals(idResena)).findFirst());
	}

	/**
	 * Añade una reseña a un libro. La puntuación debe estar entre 1 y 5 (si no,
	 * IllegalArgumentException). Optional vacío si el libro no existe.
	 */
	public Optional<Resena> crearResena(Long idLibro, Resena resena) {
		if (resena.getPuntuacion() == null || resena.getPuntuacion() < 1 || resena.getPuntuacion() > 5) {
			throw new IllegalArgumentException("La puntuación debe estar entre 1 y 5");
		}
		return buscarPorId(idLibro).map(libro -> {
			resena.setId(siguienteIdResena.getAndIncrement());
			libro.getResenas().add(resena);
			return resena;
		});
	}

	// ------------------------------------------------------------------ PRIVADO

	private void validarLibro(Libro libro) {
		if (libro == null || libro.getTitulo() == null || libro.getTitulo().isBlank() || libro.getAutor() == null
				|| libro.getAutor().isBlank()) {
			throw new IllegalArgumentException("El título y el autor son obligatorios");
		}
	}
}
