package com.daw.error;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.daw.repository.DuplicateElementException;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class ControllerAdvice {

	@ExceptionHandler(DuplicateElementException.class)
	public ResponseEntity<ApiError> handleDuplicateElementException (DuplicateElementException ex, HttpServletRequest request) {
		ApiError apiError = new ApiError();
		 apiError.setEstado(HttpStatus.BAD_REQUEST);
		 apiError.setFecha(LocalDateTime.now());
		 apiError.setIp(request.getRemoteAddr());
		 apiError.setMensaje(ex.getLocalizedMessage());
		 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiError> handleDuplicateElementException (Exception ex, HttpServletRequest request) {
		ApiError apiError = new ApiError();
		 apiError.setEstado(HttpStatus.INTERNAL_SERVER_ERROR);
		 apiError.setFecha(LocalDateTime.now());
		 apiError.setIp(request.getRemoteAddr());
		 apiError.setMensaje(ex.getLocalizedMessage());
		 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(apiError);
	}
}
