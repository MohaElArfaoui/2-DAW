package com.ejemplo.biblioteca.exception;

import org.springframework.http.HttpStatus;

public class DevolucionInvalidaException extends BibliotecaException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6972803328569033547L;

	public DevolucionInvalidaException(Long prestamoId, String motivo) {
		super("DEVOLUCION_INICIADA", HttpStatus.BAD_REQUEST, " No se puede devolver el préstamo : " + prestamoId + ": " + motivo);
	}
}
