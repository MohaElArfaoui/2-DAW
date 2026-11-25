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

import com.daw.dto.ProductoDTO;
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
	 * Controlador que procesa preticiones GET a la direccion http://localhost:9999/buscarTodosLosProductos
	 * @return JSON con todos los productos (Lista de ProductoDTO)
	 */
	@GetMapping({"/buscarTodosLosProductos"})
	public ResponseEntity<List<ProductoDTO>> buscarTodosLosProductos(){
		return ResponseEntity.ok().body(servicio.getAllProductos());
	}

	/**
	 * Controlador que procesa preticiones POST a la direccion http://localhost:9999/crearProducto
	 * Los datos del producto se reciben en el cuerpo de la peticion y se parsean en un objeto ProductoDTO
	 * @return JSON con el producto (ProductoDTO)
	 */
	@PostMapping("/crearProducto")
	public ResponseEntity<String> crearProducto(@RequestBody ProductoDTO productoDTO) {
		servicio.addProducto(productoDTO);
		return ResponseEntity.ok().body("Ok");
    }
	
	/**
	 * Controlador que procesa preticiones PUT a la direccion http://localhost:9999/actualizarProducto
	 * Los datos del producto se reciben en el cuerpo de la peticion y se parsean en un objeto ProductoDTO
	 * @return JSON con el producto (ProductoDTO)
	 */
	@PutMapping("/actualizarProducto")
	public ResponseEntity<String> actualizarProducto(@RequestBody ProductoDTO productoDTO) {
		servicio.updateProducto(productoDTO);
		return ResponseEntity.ok().body("Ok");
    }

	/**
	 * Controlador que procesa preticiones DELETE a la direccion http://localhost:9999/eliminarProducto?id=XXX
	 * @return JSON con un texto indicando que todo ha ido bien
	 */
	@DeleteMapping("/eliminarProducto")
	public ResponseEntity<String> borrarProducto(@RequestParam Integer id) {
		servicio.deleteProducto(id);
		return ResponseEntity.ok().body("Ok");
    }
	
}
