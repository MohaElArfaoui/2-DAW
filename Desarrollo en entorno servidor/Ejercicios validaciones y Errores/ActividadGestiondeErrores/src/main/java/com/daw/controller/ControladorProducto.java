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

import com.daw.dto.ProductoDTO;
import com.daw.error.ApiError;
import com.daw.exception.ProductoNotFoundException;
import com.daw.model.Producto;
import com.daw.service.ApplicationService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping
public class ControladorProducto {
	
	@Autowired
	private ApplicationService servicio;
	
	@GetMapping("/productos/{id}") 
	public ResponseEntity<Producto> obtenerProducto(@PathVariable("id") Long id) {
			return ResponseEntity.ok().body(servicio.buscarProducto(id));
		}
	
	@PostMapping("/producto")
	public ResponseEntity<Producto> crearProducto(@RequestBody ProductoDTO ProductoDTO) {
		return ResponseEntity.status(HttpStatus.CREATED).body(servicio.crearProducto(ProductoDTO));
	}

	@ExceptionHandler(ProductoNotFoundException.class)
	public ResponseEntity<ApiError> productoNoEncontrado(ProductoNotFoundException ex, HttpServletRequest request) {
		ApiError apiError = new ApiError();
		apiError.setEstado(HttpStatus.BAD_REQUEST);
		apiError.setFecha(LocalDateTime.now());
		 apiError.setIp(request.getRemoteAddr());
		apiError.setMensaje(ex.getLocalizedMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(apiError);

	}
	
}
