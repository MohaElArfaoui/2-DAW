package com.ejemplo.biblioteca.exception;

import org.springframework.http.HttpStatus;

public abstract class BibliotecaException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3585090981259603684L;
	
	private String codigo;
	private HttpStatus status;
	
	public BibliotecaException(String codigo, HttpStatus status, String mensaje) {
		super(mensaje);
		this.codigo = codigo;
		this.status = status;
	}

	public String getCodigo() {
		return codigo;
	}

	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	

}
