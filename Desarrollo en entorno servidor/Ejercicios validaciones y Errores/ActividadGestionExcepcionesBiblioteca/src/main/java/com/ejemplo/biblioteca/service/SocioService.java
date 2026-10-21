package com.ejemplo.biblioteca.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ejemplo.biblioteca.exception.SocioNoEncontradoException;
import com.ejemplo.biblioteca.model.Socio;
import com.ejemplo.biblioteca.repository.SocioRepository;

@Service
public class SocioService {

	@Autowired
	private SocioRepository socioRepository;

	/**
	 * Busca un socio por su id.
	 */
	public Socio buscarPorId(Long id) {
		Optional<Socio> socio = socioRepository.findById(id);

		if (socio.isEmpty()) {
			// TODO 3: lanzar SocioNoEncontradoException pasando el id
			throw new SocioNoEncontradoException(id);

		}

		return socio.get();
	}
}
