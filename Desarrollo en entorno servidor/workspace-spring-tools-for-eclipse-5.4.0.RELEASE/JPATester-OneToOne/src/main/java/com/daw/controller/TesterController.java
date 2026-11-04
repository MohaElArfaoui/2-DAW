package com.daw.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.daw.service.TesterService;

@RestController
public class TesterController {

	@Autowired
	private TesterService servicio;

	@GetMapping("/tester/{className}")
	public ResponseEntity<?> findAll(@PathVariable String className) {
		Class<?> classReference;
		try {
			classReference = Class.forName(className);
			return ResponseEntity.ok().body(servicio.findAll(classReference));
		} catch (ClassNotFoundException e) {
			return ResponseEntity.badRequest().body("La clase " + className + " no existe.");
		}
	}
}
