package com.ejemplo.biblioteca.repository;

import com.ejemplo.biblioteca.model.Socio;
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
public class SocioRepository {

	private final Map<Long, Socio> datos = new ConcurrentHashMap<>();
	private final AtomicLong secuencia = new AtomicLong(0);

	public Socio save(Socio entidad) {
		if (entidad.getId() == null) {
			entidad.setId(secuencia.incrementAndGet());
		}
		datos.put(entidad.getId(), entidad);
		return entidad;
	}

	public Optional<Socio> findById(Long id) {
		return Optional.ofNullable(datos.get(id));
	}

	public List<Socio> findAll() {
		return new ArrayList<>(datos.values());
	}
}
