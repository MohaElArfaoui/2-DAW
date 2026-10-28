package com.ejemplo.biblioteca.model;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Socio {

	private Long id;
	private String nombre;
	private String email;
	private int prestamosActivos;
	/** Fecha hasta la que el socio está sancionado. Null si no tiene sanción. */
	private LocalDate sancionadoHasta;

	
}
