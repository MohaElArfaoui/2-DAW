package com.ejemplo.biblioteca.service;

import java.util.Optional;

import org.apache.tomcat.jni.LibraryNotFoundError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.ejemplo.biblioteca.dto.LibroRequestDTO;
import com.ejemplo.biblioteca.exception.IsbnDuplicadoException;
import com.ejemplo.biblioteca.exception.LibroNoEncontradoException;
import com.ejemplo.biblioteca.model.Libro;
import com.ejemplo.biblioteca.repository.LibroRepository;

@Service
public class LibroService {

	@Autowired
	private LibroRepository libroRepository;


	/**
	 * Crea un libro nuevo.
	 */
	public Libro crear(LibroRequestDTO request) {
		if (libroRepository.existsByIsbn(request.getIsbn())) {
			// TODO 1: lanzar IsbnDuplicadoException pasando el ISBN (request.isbn())
			throw new IsbnDuplicadoException(request.getIsbn());
		}

		Libro libro = new Libro(null, request.getIsbn(), request.getTitulo(), request.getEjemplaresDisponibles());
		return libroRepository.save(libro);
	}

	/**
	 * Busca un libro por su id.
	 */
	public Libro buscarPorId(Long id) {
		Optional<Libro> libro = libroRepository.findById(id);

		if (libro.isEmpty()) {
			// TODO 2: lanzar LibroNoEncontradoException pasando el id
			// (Mientras no la lances, libro.get() provocará un error 500)
			throw new LibroNoEncontradoException(id );
		}

		return libro.get();
	}
}
