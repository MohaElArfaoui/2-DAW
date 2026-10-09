package com.daw.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daw.datamodel.entities.Libro;
import com.daw.datamodel.entities.ModificarLibro;
import com.daw.datamodel.entities.Resena;
import com.daw.services.LibroService;


@RestController
@RequestMapping

public class ControladorLibro {
	
	@Autowired
	private LibroService servicio;
	@RequestMapping("/api/v1")
	
	@GetMapping("/libros")
	public ResponseEntity<List<Libro>> buscarLibros(@RequestParam(value="genero,", required = false)
	 String genero, @RequestParam(value="autor", required=false)String autor){
		List<Libro> resultado = servicio.listar(autor, genero);
		return ResponseEntity.ok().body(resultado);
	}

	@GetMapping("/libros/{id}")
	public ResponseEntity<Libro> obtenerLibro(@PathVariable ("id") Long id) {
		Optional<Libro> libro= servicio.buscarPorId(id);
		if(libro.isPresent()) {
			return ResponseEntity.ok().body(libro.get());		
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			// return ResponseEntity.notFound().build(); Otra manera de hacerlo, hace exactamente lo mismo 
		}
	}
	
	@PostMapping("/libros") 
	public ResponseEntity<Libro> crearLibro (@RequestBody Libro libro){
		Libro resultado = servicio.crear(libro);
		return ResponseEntity.status(HttpStatus.CREATED).body(resultado);
		
	}
	
	@PutMapping("libros/{id}")
	public ResponseEntity<Libro> reemplazarLibro (@PathVariable("id") Long id, @RequestBody Libro libro){
		Optional<Libro> resultado= servicio.reemplazar(id, libro);
		if(resultado.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
		}
	}
	
	@PatchMapping("libros/{id}") 
	public ResponseEntity<Libro> modfificarLibro(@PathVariable("id") Long id, @RequestBody ModificarLibro libro) {
		Optional<Libro> resultado= servicio.modificarParcial(id, libro);
		if(resultado.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
		}
	}
	
	@DeleteMapping("libros/{id}")
	public ResponseEntity<Boolean> eliminarLibro(@PathVariable("id") Long id) {
		Optional<Libro> resultado= servicio.buscarPorId(id);
		if(resultado.isEmpty()) {
			return ResponseEntity.ok().body(servicio.eliminar(id));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/libros/{idLibro}/resenas")
	public ResponseEntity<List<Resena>> listarResena (@PathVariable("idLibro") Long id) {
		Optional<Libro> resultado= servicio.buscarPorId(id);
		if(resultado.isEmpty()) {
			Optional <List<Resena>> resenas= servicio.listarResenas(id);
			return ResponseEntity.ok().body(resenas.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
		
		@GetMapping("/libros/{idLibro}/resenas/{idResena}") 
		public ResponseEntity<Resena> obtenerUnaResena(@PathVariable("idLibro") Long idLibro, @PathVariable("idResena") Long idResena) {
			Optional<Libro> resultado= servicio.buscarPorId(idLibro);
			if(resultado.isPresent()) {
				Optional<Resena> resena= servicio.buscarResena(idLibro, idResena);
				return ResponseEntity.ok().body(resena.get());
			} else {
				return ResponseEntity.notFound().build();
			}
		}
		
		@PostMapping("/libros/{idLibro}/resenas")
		public ResponseEntity<Optional<Resena>> crearResena (@PathVariable ("idLibro") Long idLibro, @RequestBody Resena resena){
			return ResponseEntity.status(HttpStatus.CREATED).body(servicio.crearResena(idLibro, resena));	
		}
	
	
}
