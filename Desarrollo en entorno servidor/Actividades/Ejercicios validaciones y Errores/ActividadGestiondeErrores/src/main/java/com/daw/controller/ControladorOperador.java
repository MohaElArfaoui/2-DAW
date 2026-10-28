package com.daw.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daw.dto.OperadorDTO;
import com.daw.error.ApiError;
import com.daw.exception.OperadorNotFoundException;
import com.daw.model.Operador;
import com.daw.service.ApplicationService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping
public class ControladorOperador {
	
	@Autowired
	private ApplicationService servicio;
	
	@GetMapping("/operadores/{id}")
	public ResponseEntity<Operador> obtenerOperador(@PathVariable("id") Long id) {
		
		return ResponseEntity.ok().body(servicio.buscarOperador(id));
	}
	
	@PostMapping("/operador") 
	public ResponseEntity<Operador> crearOperador(@RequestBody OperadorDTO OperadorDTO) {
		return ResponseEntity.ok().body(servicio.crearOperador(OperadorDTO));
	}
	
	@ExceptionHandler (OperadorNotFoundException.class)
	public ResponseEntity<ApiError> operadorNoEncontrado(OperadorNotFoundException ex, HttpServletRequest request){
		ApiError apiError = new ApiError();
		apiError.setEstado(HttpStatus.BAD_REQUEST);
		apiError.setFecha(LocalDateTime.now());
		 apiError.setIp(request.getRemoteAddr());
		apiError.setMensaje(ex.getLocalizedMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiError);
		
	}

}
