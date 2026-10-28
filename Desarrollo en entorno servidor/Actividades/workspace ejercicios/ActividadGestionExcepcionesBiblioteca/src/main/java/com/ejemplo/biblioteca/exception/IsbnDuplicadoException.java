package com.ejemplo.biblioteca.exception;

import org.springframework.http.HttpStatus;

public class IsbnDuplicadoException extends BibliotecaException {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4925790251301376772L;

	public IsbnDuplicadoException (String isbn) {
		super("ISBN_DUPLICADO", HttpStatus.CONFLICT, "Ya existe un libro con ISBN " + isbn);
	}

}
