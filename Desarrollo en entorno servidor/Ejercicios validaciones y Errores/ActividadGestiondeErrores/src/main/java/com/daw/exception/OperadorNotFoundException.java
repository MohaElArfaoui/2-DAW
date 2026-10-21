package com.daw.exception;

public class OperadorNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2630212938248888223L;

	public OperadorNotFoundException(Long operadorId) {
		super("El operador con id " + operadorId + " no existe.");
	}
}
