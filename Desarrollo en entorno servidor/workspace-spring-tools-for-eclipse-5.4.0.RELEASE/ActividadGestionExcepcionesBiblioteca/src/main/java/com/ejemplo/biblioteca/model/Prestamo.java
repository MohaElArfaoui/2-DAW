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
public class Prestamo {

	private Long id;
	private Long libroId;
	private Long socioId;
	private LocalDate fechaPrestamo;
	private boolean devuelto;

	
}
