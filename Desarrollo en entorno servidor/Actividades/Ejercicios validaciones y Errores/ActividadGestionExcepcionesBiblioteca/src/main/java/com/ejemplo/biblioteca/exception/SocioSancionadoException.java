package com.ejemplo.biblioteca.exception;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.http.HttpStatus;

public class SocioSancionadoException extends BibliotecaException {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 5927154189993859357L;

	public  SocioSancionadoException(Long socioId, LocalDate fechaFinSancion) {
		super(" SOCIO_SANCIONADO", HttpStatus.FORBIDDEN, "El socio " + socioId + " está sancionado hasta el "+ DateTimeFormatter.ofPattern("yyyy/MM/dd").format(fechaFinSancion));
	}
}
