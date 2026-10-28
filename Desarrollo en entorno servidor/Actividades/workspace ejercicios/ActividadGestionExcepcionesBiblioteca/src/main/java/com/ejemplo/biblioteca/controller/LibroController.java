package com.ejemplo.biblioteca.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ejemplo.biblioteca.dto.LibroRequestDTO;
import com.ejemplo.biblioteca.model.Libro;
import com.ejemplo.biblioteca.service.LibroService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LibroController {

	
    private final LibroService libroService;

    @PostMapping("/libros")
    public ResponseEntity<Libro> crear(@Valid @RequestBody LibroRequestDTO request) {
        Libro libro = libroService.crear(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(libro);
    }

    @GetMapping("/libros/{id}")
    public Libro obtener(@PathVariable Long id) {
        return libroService.buscarPorId(id);
    }
}
