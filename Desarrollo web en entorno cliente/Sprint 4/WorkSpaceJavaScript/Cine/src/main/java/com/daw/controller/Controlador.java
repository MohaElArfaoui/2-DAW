package com.daw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.daw.dto.PeliculaDTO;
import com.daw.dto.UsuarioDTO;

import com.daw.service.Servicio;


@CrossOrigin(origins="*") 
@RestController
public class Controlador {
	
	@Autowired
	private Servicio servicio;
	
	/* PELICULAS */
	
	@GetMapping({"/buscarPeliculaPorId"})
	public ResponseEntity<PeliculaDTO> buscarPeliculaPorId(@RequestParam Integer idPelicula) {
		return ResponseEntity.ok().body(servicio.getPeliculaById(idPelicula));
    }
	
	/* USUARIOS */
	
	@GetMapping({"/buscarUsuarioPorLogin"})
	public ResponseEntity<UsuarioDTO> buscarUsuarioPorLogin(@RequestParam String nombreUsuario,@RequestParam String pwdUsuario) {
		return ResponseEntity.ok().body(servicio.getUsuarioByLogin(nombreUsuario, pwdUsuario));
    }
	
	@PostMapping("/registrarUsuario")
	public ResponseEntity<String> registrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
		servicio.addUsuario(usuarioDTO);
		return ResponseEntity.ok().body("Ok");
    }
		
}
