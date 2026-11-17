package com.daw.exception;

public class UsuarioNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public UsuarioNotFoundException(Long usuarioId) {
		super("No existe ningún usuario con el id " + usuarioId);
	}

}
