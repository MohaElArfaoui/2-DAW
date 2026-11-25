package com.daw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daw.dto.ClienteDTO;
import com.daw.service.Servicio;


@CrossOrigin(origins="*") 
@RestController
public class Controlador {
	
	@Autowired
	private Servicio servicio;
	
	@GetMapping({"/buscarTodosLosClientes"})
	public ResponseEntity<List<ClienteDTO>> buscarTodosLosClientes(){
		return ResponseEntity.ok().body(servicio.getAllClientes());
	}
	
	@GetMapping({"/buscarClientePorId"})
	public ResponseEntity<ClienteDTO> buscarClientePorId(@RequestParam Integer id) {
		return ResponseEntity.ok().body(servicio.getClienteById(id));
    }

	@PostMapping("/crearCliente")
	public ResponseEntity<String> crearCliente(@RequestBody ClienteDTO clienteDTO) {
		servicio.addCliente(clienteDTO);
		return ResponseEntity.ok().body("Ok");
    }
	
	@PutMapping("/actualizarCliente")
	public ResponseEntity<String> actualizarUsuario(@RequestBody ClienteDTO clienteDTO) {
		servicio.updateCliente(clienteDTO);
		return ResponseEntity.ok().body("Ok");
    }
	
	@DeleteMapping("/eliminarCliente")
	public ResponseEntity<String> borrarCliente(@RequestParam Integer id) {
		servicio.deleteCliente(id);
		return ResponseEntity.ok().body("Ok");
    }
	
}
