package com.ejemplo.biblioteca.repository;

import com.ejemplo.biblioteca.model.Libro;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Simula una tabla de la base de datos usando un Map en memoria. Los datos se
 * pierden al parar la aplicación.
 */
@Repository
public class LibroRepository {

	private final Map<Long, Libro> datos = new ConcurrentHashMap<>();
	private final AtomicLong secuencia = new AtomicLong(0);

	public Libro save(Libro entidad) {
		if (entidad.getId() == null) {
			entidad.setId(secuencia.incrementAndGet());
		}
		datos.put(entidad.getId(), entidad);
		return entidad;
	}

	public Optional<Libro> findById(Long id) {
		return Optional.ofNullable(datos.get(id));
	}

	public List<Libro> findAll() {
		return new ArrayList<>(datos.values());
	}

	public boolean existsByIsbn(String isbn) {
		return datos.values().stream().anyMatch(l -> l.getIsbn().equals(isbn));
	}
}
