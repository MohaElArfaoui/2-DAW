package com.ejemplo.biblioteca.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ejemplo.biblioteca.dto.PrestamoRequestDTO;
import com.ejemplo.biblioteca.model.Prestamo;
import com.ejemplo.biblioteca.service.PrestamoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PrestamoController {

	
    private final PrestamoService prestamoService;

    @PostMapping("/prestamos")
    public ResponseEntity<Prestamo> prestar(@Valid @RequestBody PrestamoRequestDTO request) {
        Prestamo prestamo = prestamoService.prestar(request.getLibroId(), request.getSocioId());
        return ResponseEntity.status(HttpStatus.CREATED).body(prestamo);
    }

    @PostMapping("/prestamos/{id}/devolucion")
    public Prestamo devolver(@PathVariable Long id) {
        return prestamoService.devolver(id);
    }
}
