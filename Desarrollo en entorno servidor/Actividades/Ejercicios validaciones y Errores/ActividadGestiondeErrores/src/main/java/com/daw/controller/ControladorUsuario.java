package com.daw.controller;

import java.time.LocalDateTime;
import java.util.Optional;

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


import com.daw.dto.UsuarioDTO;
import com.daw.error.ApiError;
import com.daw.exception.UsuarioNotFoundException;
import com.daw.model.Usuario;
import com.daw.service.ApplicationService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping
public class ControladorUsuario {

	@Autowired
	private ApplicationService servicio;

	
	@GetMapping("/usuarios/{id}") 
	public ResponseEntity<Usuario> obtenerUsuario(@PathVariable("id") Long id) {
			return ResponseEntity.ok().body(servicio.buscarUsuario(id));
		}
	
	@PostMapping("/usuarios") 
	public ResponseEntity<Usuario> crearUsuario(@RequestBody UsuarioDTO UsuarioDTO) {
		return ResponseEntity.ok().body(servicio.crearUsuario(UsuarioDTO));
	}
	

	@ExceptionHandler(UsuarioNotFoundException.class) 
		public ResponseEntity<ApiError> UsuarioNoEncontrado(UsuarioNotFoundException ex, HttpServletRequest request) {
		ApiError apiError = new ApiError();
		 apiError.setEstado(HttpStatus.NOT_FOUND);
		 apiError.setFecha(LocalDateTime.now());
		 apiError.setIp(request.getRemoteAddr());
		 apiError.setMensaje(ex.getLocalizedMessage());
		 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiError);
	}
	

}
