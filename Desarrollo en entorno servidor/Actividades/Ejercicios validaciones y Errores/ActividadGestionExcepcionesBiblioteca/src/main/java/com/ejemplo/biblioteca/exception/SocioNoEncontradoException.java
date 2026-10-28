package com.ejemplo.biblioteca.exception;

import org.springframework.http.HttpStatus;

public class SocioNoEncontradoException extends BibliotecaException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8566608864103151758L;

	public SocioNoEncontradoException(Long id) {
		super("SOCIO_NO_ENCONTRADO", HttpStatus.NOT_FOUND, "No existe ningun socio con id 99");
	}
}
