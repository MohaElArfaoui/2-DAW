package com.ejemplo.biblioteca.exception;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

	// 1. Las 7 excepciones de negocio
	@ExceptionHandler(BibliotecaException.class)
	public ResponseEntity<ErrorResponse> procesarError(BibliotecaException ex, HttpServletRequest request) {
		ErrorResponse error = new ErrorResponse(LocalDateTime.now(),
				ex.getStatus().value(),
				ex.getCodigo(),
				ex.getMessage(),
				request.getRequestURI(),
				null);
		return ResponseEntity.status(ex.getStatus()).body(error);
	}

	// 2. Errores de validación (@Valid)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> procesarValidacion(MethodArgumentNotValidException ex,
			HttpServletRequest request) {

		List<String> detalles = new ArrayList<>();
		for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
			detalles.add(fe.getField() + ": " + fe.getDefaultMessage());
		}

		ErrorResponse error = new ErrorResponse(LocalDateTime.now(),
				HttpStatus.BAD_REQUEST.value(),
				"VALIDACION_ERROR",
				"Error de validación en los datos enviados",
				request.getRequestURI(),
				detalles);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
	}

	// 3. JSON mal formado
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<ErrorResponse> procesarJsonInvalido(HttpMessageNotReadableException ex,
			HttpServletRequest request) {
		ErrorResponse error = new ErrorResponse(LocalDateTime.now(),
				HttpStatus.BAD_REQUEST.value(),
				"JSON_INVALIDO",
				"El cuerpo de la petición no es un JSON válido",
				request.getRequestURI(),
				null);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
	}

	// 4. Cualquier otro error no previsto
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> procesarErrorGenerico(Exception ex, HttpServletRequest request) {
		ErrorResponse error = new ErrorResponse(LocalDateTime.now(),
				HttpStatus.INTERNAL_SERVER_ERROR.value(),
				"ERROR_INTERNO",
				"Se ha producido un error interno en el servidor",
				request.getRequestURI(),
				null);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
	}
}