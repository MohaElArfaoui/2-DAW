package com.daw.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class controladorProducto {


	@GetMapping("/productos")
	public String buscarProductos (@RequestParam ("codigo") String codigo, 
			@RequestParam ("descripcion") String descripcion, 
			@RequestParam ("precio") Float precio, 
			@RequestParam ("stock") Integer stock){
		return codigo + ", " + descripcion + ", " + precio + ", " + stock;
	}
		
	@DeleteMapping("/productos/{codigo}")
	public String eliminarProductos (@PathVariable ("codigo") String codigo){
		return codigo;
	}
}
