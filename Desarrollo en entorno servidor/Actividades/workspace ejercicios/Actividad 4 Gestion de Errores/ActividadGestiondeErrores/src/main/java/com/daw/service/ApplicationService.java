package com.daw.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.daw.dto.OperadorDTO;
import com.daw.dto.ProductoDTO;
import com.daw.dto.UsuarioDTO;
import com.daw.exception.OperadorNotFoundException;
import com.daw.exception.ProductoNotFoundException;
import com.daw.exception.UsuarioNotFoundException;
import com.daw.model.Operador;
import com.daw.model.Producto;
import com.daw.model.Usuario;
import com.daw.repository.DuplicateElementException;
import com.daw.repository.OperadorRepository;
import com.daw.repository.ProductoRepository;
import com.daw.repository.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ApplicationService {

	@Autowired
	private OperadorRepository repositorioOperador;
	@Autowired
	private UsuarioRepository repositorioUsuario;
	@Autowired
	private ProductoRepository repositorioProducto;	
	/**
	 * Metodo de busqueda de operador por id
	 * 
	 * @param operadorId
	 * @return
	 */
	public Operador buscarOperador(Long operadorId) {
		Optional<Operador> resultado = repositorioOperador.findById(operadorId);
		if(resultado.isPresent()) {
			return resultado.get();
		} else {
			throw new OperadorNotFoundException(operadorId);
		}		
	}
	
	/**
	 * Metodo para buscar usuario por su id
	 * 
	 * @param usuarioId
	 * @return
	 */
	public Usuario buscarUsuario(Long usuarioId) {
		Optional<Usuario> resultado = repositorioUsuario.findById(usuarioId);
		if(resultado.isPresent()) {
			return resultado.get();
		} else {
			throw new UsuarioNotFoundException(usuarioId);
		}		
	}
	
	/**
	 * Metodo para buscar un producto por su id
	 * 
	 * @param productoId
	 * @return
	 */
	public Producto buscarProducto(Long productoId) {
		Optional<Producto> resultado = repositorioProducto.findById(productoId);
		if(resultado.isPresent()) {
			return resultado.get();
		} else {
			throw new ProductoNotFoundException(productoId);
		}		
	}
	
	/**
	 * Metodo de creacion de operador
	 * 
	 * @param operadorDTO
	 * @return
	 */
	public Operador crearOperador(OperadorDTO operadorDTO) {
		Operador operador = new Operador();
		operador.setUsername(operadorDTO.getUsername());
		operador.setPassword(operadorDTO.getPassword());
		try {
			repositorioOperador.save(operador);
		} catch (DataIntegrityViolationException ex) {
			throw new DuplicateElementException("operador", "username", operadorDTO.getUsername());
		}
		
		return operador;
	}
	
	/**
	 * Metodo de creacion de Usuario
	 * 
	 * @param usuarioDTO
	 * @return
	 */
	public Usuario crearUsuario(UsuarioDTO usuarioDTO) {
		Usuario usuario = new Usuario();
		usuario.setNombre(usuarioDTO.getNombre());
		usuario.setPrimerApellido(usuarioDTO.getPrimerApellido());
		usuario.setSegundoApellido(usuarioDTO.getSegundoApellido());
		usuario.setTelefono(usuarioDTO.getTelefono());
		usuario.setFechaNacimiento(usuarioDTO.getFechaNacimiento());
		usuario.setDni(usuarioDTO.getDni());
		try {
			repositorioUsuario.save(usuario);
		} catch (DataIntegrityViolationException ex) {
			throw new DuplicateElementException("usuario", "dni", usuarioDTO.getDni());
		}
		return usuario;
	}
	
	
	/**
	 * Metodo de creacion de producto
	 * @param productoDTO
	 * @return
	 */
	public Producto crearProducto(ProductoDTO productoDTO) {
		Producto producto = new Producto();
		producto.setCodigo(productoDTO.getCodigo());
		producto.setDescripcion(productoDTO.getDescripcion());
		
		try {
			repositorioProducto.save(producto);
		} catch (DataIntegrityViolationException ex) {
			throw new DuplicateElementException("producto", "codigo", productoDTO.getCodigo());
		}
		return producto;
	}
	
}