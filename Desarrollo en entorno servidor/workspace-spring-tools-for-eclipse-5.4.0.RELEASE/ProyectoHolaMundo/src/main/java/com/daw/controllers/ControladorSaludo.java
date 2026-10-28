package com.daw.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControladorSaludo {
	
	@GetMapping("/hola")
	public String hola() {
		return "Hola Amigos, bienvenidos a la fiesta del encuentro con Jesús.";
	}

	@GetMapping("/adios")
	public String adios() {
		return "Adios Amigos, espero que lo hayas pasado bien.";
	}
}
