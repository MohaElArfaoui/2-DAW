package com.ejemplo.biblioteca.exception;

import org.springframework.http.HttpStatus;

public class LibroNoDisponibleException extends BibliotecaException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 126733876458389904L;

	public LibroNoDisponibleException(String titulo, int ejemplaresDisponibles) {
		super("LIBRO_NO_DISPONIBLE", HttpStatus.CONFLICT, "El libro " + titulo + 
				" no tiene ejemplares disponibles(disponibles: " + ejemplaresDisponibles + ")");
	}
}
