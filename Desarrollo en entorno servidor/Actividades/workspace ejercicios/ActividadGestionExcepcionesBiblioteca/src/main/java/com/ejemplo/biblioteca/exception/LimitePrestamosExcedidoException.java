package com.ejemplo.biblioteca.exception;

import org.springframework.http.HttpStatus;

public class LimitePrestamosExcedidoException extends BibliotecaException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1995853175838595000L;

	public LimitePrestamosExcedidoException(Long socio, int limiteMaximo) {
		super("LIMITE_PRESTAMOS_EXCEDIDO", HttpStatus.CONFLICT, " El socio " + socio + " ha alcanzado el límite de " + limiteMaximo + " "
				+ "prestamos activos");
	}
}
