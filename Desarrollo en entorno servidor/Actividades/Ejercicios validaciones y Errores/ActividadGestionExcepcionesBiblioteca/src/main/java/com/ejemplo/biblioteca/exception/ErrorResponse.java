package com.ejemplo.biblioteca.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

/**
 * Cuerpo JSON que se devuelve cuando ocurre un error.
 * Los getters son necesarios para que Jackson lo convierta a JSON.
 */
public class ErrorResponse {

	private LocalDateTime timestamp;
	private int status;
	private String error;
	private String codigo;
	private String mensaje;
	private String ruta;

	public ErrorResponse(LocalDateTime timestamp, HttpStatus status, String codigo, String mensaje, String ruta) {
		this.timestamp = timestamp;
		this.status = status.value();
		this.error = status.getReasonPhrase();
		this.codigo = codigo;
		this.mensaje = mensaje;
		this.ruta = ruta;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public int getStatus() {
		return status;
	}

	public String getError() {
		return error;
	}

	public String getCodigo() {
		return codigo;
	}

	public String getMensaje() {
		return mensaje;
	}

	public String getRuta() {
		return ruta;
	}

}
