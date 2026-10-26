package com.ejemplo.biblioteca.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ejemplo.biblioteca.model.Socio;
import com.ejemplo.biblioteca.service.SocioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/socios")
@RequiredArgsConstructor
public class SocioController {

	
    private final SocioService socioService;

    @GetMapping("/{id}")
    public Socio obtener(@PathVariable Long id) {
        return socioService.buscarPorId(id);
    }
}
