package com.ejemplo.biblioteca.exception;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(BibliotecaException.class)
	public ResponseEntity<ErrorResponse> procesarError(BibliotecaException ex, HttpServletRequest request) {
		ErrorResponse error = new ErrorResponse(LocalDateTime.now(),
				ex.getStatus(),
				ex.getCodigo(),
				ex.getMessage(),
				request.getRequestURI());

		return ResponseEntity.status(ex.getStatus()).body(error);
	}
}
