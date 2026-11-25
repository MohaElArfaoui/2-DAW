package com.daw.controller;

import java.util.Date;
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

import com.daw.dto.ReservaDTO;
import com.daw.service.Servicio;

@CrossOrigin(origins="*") 
@RestController
public class Controlador {
	
	@Autowired
	private Servicio servicio;

	@GetMapping({"/buscarTodasLasReservas"})
	public ResponseEntity<List<ReservaDTO>> buscarTodasLasReservas(){
		return ResponseEntity.ok().body(servicio.getAllReservas());
	}
	
	@GetMapping({"/buscarReservaPorFecha"})
	public ResponseEntity<List<ReservaDTO>> buscarReservaPorFecha(@RequestParam Date fechaReserva) {
		return ResponseEntity.ok().body(servicio.getReservaPorFecha(fechaReserva));
    }

	@PostMapping("/crearReserva")
	public ResponseEntity<String> crearReserva(@RequestBody ReservaDTO reservaDTO) {
		servicio.addReserva(reservaDTO);
		return ResponseEntity.ok().body("Ok");
    }
	
	@DeleteMapping("/eliminarReserva")
	public ResponseEntity<String> eliminarReserva(@RequestParam Integer idReserva) {
		servicio.deleteReserva(idReserva);
		return ResponseEntity.ok().body("Ok");
    }
	
}
