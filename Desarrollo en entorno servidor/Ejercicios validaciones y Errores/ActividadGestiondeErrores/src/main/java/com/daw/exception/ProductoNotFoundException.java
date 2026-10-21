package com.daw.exception;

public class ProductoNotFoundException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8305011979211738984L;

	public ProductoNotFoundException(Long productoId) {
		super("El producto con id " + productoId + " no existe.");
	}
}
