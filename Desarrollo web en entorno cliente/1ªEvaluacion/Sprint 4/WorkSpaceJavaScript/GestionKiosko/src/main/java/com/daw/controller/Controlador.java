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

import com.daw.dto.ArticuloDTO;
import com.daw.dto.VentasDTO;
import com.daw.service.Servicio;

/**
 * En esta clase van los controladores, cada controlador se mapea a una ruta URL
 */
@CrossOrigin(origins="*") 
@RestController
public class Controlador {
	
	/**
	 * Inyeccion de la clase de servicio, en dicha clase tenemos toda la logica de negocio,
	 * con todos los metodos de interaccion con la base de datos.
	 */
	@Autowired
	private Servicio servicio;
	
	/**
	 * Controlador que procesa preticiones GET a la direccion http://localhost:9999/buscarTodosLosClientes
	 * @return JSON
	 */
	@GetMapping({"/buscarTodosLosArticulos"})
	public ResponseEntity<List<ArticuloDTO>> buscarTodosLosArticulos(){
		return ResponseEntity.ok().body(servicio.getAllArticulos());
	}
	

	/**
	 * Controlador que procesa preticiones POST a la direccion http://localhost:9999/crearCliente
	 * Los datos del articulo se reciben en el cuerpo de la peticion y se parsean en un objeto ClienteDTO
	 * @return string
	 */
	@PostMapping("/crearArticulo")
	public ResponseEntity<String> crearArticulo(@RequestBody ArticuloDTO articuloDTO) {
		servicio.addArticulo(articuloDTO);
		return ResponseEntity.ok().body("Ok");
    }
	
	/**
	 * Controlador que procesa preticiones PUT a la direccion http://localhost:9999/actualizarArticulo
	 * Los datos del articulo se reciben en el cuerpo de la peticion y se parsean en un objeto ArticuloDTO
	 * @return String
	 */
	@PutMapping("/actualizarArticulo")
	public ResponseEntity<String> actualizarArticulo(@RequestBody ArticuloDTO articuloDTO) {
		servicio.updateArticulo(articuloDTO);
		return ResponseEntity.ok().body("Ok");
    }
	
	
	/*********************************************************************************/
	
	@GetMapping({"/buscarTodasLasVentas"})
	public ResponseEntity<List<VentasDTO>> buscarTodasLasVentas(){
		return ResponseEntity.ok().body(servicio.getAllVentas());
	}
	
	
	@PostMapping("/crearVenta")
	public ResponseEntity<String> crearVenta(@RequestBody VentasDTO ventaDTO) {
		servicio.addVentas(ventaDTO);
		return ResponseEntity.ok().body("Ok");
    }
	
}
