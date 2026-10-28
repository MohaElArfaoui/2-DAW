package com.daw.exception;

public class UsuarioNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8675104621895630510L;
	
	public UsuarioNotFoundException(Long usuarioId) {
		super("El usuario con id " + usuarioId + " no existe.");
	}
}
