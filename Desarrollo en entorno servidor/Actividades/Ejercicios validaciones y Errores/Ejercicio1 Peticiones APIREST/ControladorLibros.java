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
@RequestMapping("/api/v1")
public class ControladorLibros {
	
	@Autowired
	private LibroService servicio;
	
	@GetMapping("/libros")
	public ResponseEntity<List<Libro>> buscarLibros(@RequestParam(value="genero", required=false) String genero, 
			@RequestParam(value="autor", required=false) String autor){
		
		return ResponseEntity.ok().body(servicio.listar(autor, genero));
	}
	
	@GetMapping("/libros/{id}")
	public ResponseEntity<Libro> buscarLibro(@PathVariable("id") Long id){
		Optional<Libro> libro = servicio.buscarPorId(id);
		if(libro.isPresent()) {
			return ResponseEntity.ok().body(libro.get());
		} else {
			return ResponseEntity.notFound().build();
		}		
	}
	
	@PostMapping("/libros")
	public ResponseEntity<Libro> crearLibro(@RequestBody Libro libro){
		return ResponseEntity.status(HttpStatus.CREATED).body(servicio.crear(libro));		
	}
	
	@PutMapping("/libros/{id}")
	public ResponseEntity<Libro> reemplazarLibro(@PathVariable("id") Long id, 
			@RequestBody Libro libro){
		
		Optional<Libro> resultado = servicio.buscarPorId(id);
		if(resultado.isPresent()) {
			return ResponseEntity.ok().body(servicio.reemplazar(id, libro).get());
		} else {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@PatchMapping("/libros/{id}")
	public ResponseEntity<Libro> modifificarLibro(@PathVariable("id") Long id, 
			@RequestBody ModificarLibro libro){
		
		Optional<Libro> resultado = servicio.buscarPorId(id);
		if(resultado.isPresent()) {
			return ResponseEntity.ok().body(servicio.modificarParcial(id, libro).get());
		} else {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@DeleteMapping("/libros/{id}")
	public ResponseEntity<Boolean> eliminarLibro(@PathVariable("id") Long id){
		
		Optional<Libro> resultado = servicio.buscarPorId(id);
		if(resultado.isPresent()) {
			return ResponseEntity.ok().body(servicio.eliminar(id));
		} else {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@GetMapping("/libros/{idLibro}/resenas")
	public ResponseEntity<List<Resena>> listarResenas(@PathVariable("idLibro") Long id){
		Optional<Libro> resultado = servicio.buscarPorId(id);
		if(resultado.isPresent()) {
			Optional<List<Resena>> resenas = servicio.listarResenas(id);
			return ResponseEntity.ok().body(resenas.get());
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/libros/{idLibro}/resenas/{idResena}")
	public ResponseEntity<Resena> obtenerUnaResena(@PathVariable("idLibro") Long idLibro,
			@PathVariable("idResena") Long idResena){
		Optional<Libro> resultado = servicio.buscarPorId(idLibro);
		if(resultado.isPresent()) {
			Optional<Resena> resena = servicio.buscarResena(idLibro, idResena);
			if(resena.isPresent()) {
				return ResponseEntity.ok().body(resena.get());
			} else {
				return ResponseEntity.notFound().build();
			}
		} else {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@PostMapping("/libros/{idLibro}/resenas")
	public ResponseEntity<Resena> crearResena(@PathVariable("idLibro") Long idLibro,
			@RequestBody Resena resena){
		return ResponseEntity.status(HttpStatus.CREATED).body(servicio.crearResena(idLibro, resena).get());		
	}

}
