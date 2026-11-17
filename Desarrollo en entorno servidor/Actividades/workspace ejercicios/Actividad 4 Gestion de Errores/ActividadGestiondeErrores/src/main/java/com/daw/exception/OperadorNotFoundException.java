package com.daw.exception;

public class OperadorNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public OperadorNotFoundException(Long operadorId) {
		super("No existe ningún operador con el id " + operadorId);
	}

}
