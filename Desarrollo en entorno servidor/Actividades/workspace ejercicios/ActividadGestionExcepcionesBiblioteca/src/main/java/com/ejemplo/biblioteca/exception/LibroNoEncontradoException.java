package com.ejemplo.biblioteca.exception;

import org.springframework.http.HttpStatus;

public class LibroNoEncontradoException extends BibliotecaException {


	/**
	 * 
	 */
	private static final long serialVersionUID = 737337579426620366L;

	public LibroNoEncontradoException(Long id) {
		super("LIBRO_NO_ENCONTRADO", HttpStatus.NOT_FOUND, "No existe ningun producto con id " + id); 
	}
}
