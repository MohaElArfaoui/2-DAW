package com.ejemplo.biblioteca.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Libro {

	private Long id;
	private String isbn;
	private String titulo;
	private int ejemplaresDisponibles;


}
