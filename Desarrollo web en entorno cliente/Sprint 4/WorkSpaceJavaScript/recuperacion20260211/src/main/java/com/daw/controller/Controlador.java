package com.daw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daw.dto.ViviendaDTO;
import com.daw.service.Servicio;


@CrossOrigin(origins="*") 
@RestController
public class Controlador {
	
	@Autowired
	private Servicio servicio;
	
	@GetMapping({"/buscarViviendas"})
	public ResponseEntity<List<ViviendaDTO>> buscarViviendas(){
		return ResponseEntity.ok().body(servicio.getAllViviendas());
	}
	
	@PostMapping("/crearVivienda")
	public ResponseEntity<String> crearVivienda(@RequestBody ViviendaDTO viviendaDTO) {
		servicio.addVivienda(viviendaDTO);
		return ResponseEntity.ok().body("Ok");
    }
	
	@DeleteMapping("/eliminarVivienda")
	public ResponseEntity<String> borrarVivienda(@RequestParam Integer id) {
		servicio.deleteVivienda(id);
		return ResponseEntity.ok().body("Ok");
    }
}
