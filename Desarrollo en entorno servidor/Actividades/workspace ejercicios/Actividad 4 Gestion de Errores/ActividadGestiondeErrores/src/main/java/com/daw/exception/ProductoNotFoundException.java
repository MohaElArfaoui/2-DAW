package com.daw.exception;

public class ProductoNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ProductoNotFoundException(Long productoId) {
		super("No existe ningún producto con el id " + productoId);
	}

}
