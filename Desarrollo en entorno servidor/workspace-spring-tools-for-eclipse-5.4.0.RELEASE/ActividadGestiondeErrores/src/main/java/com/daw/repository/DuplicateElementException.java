package com.daw.repository;

public class DuplicateElementException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1382603945797032837L;

	public DuplicateElementException(String entity, String fieldName, String fieldValue) {
		super("Ya existe un " + entity + " con el " + fieldName + " " + fieldValue );
	}
	
}
