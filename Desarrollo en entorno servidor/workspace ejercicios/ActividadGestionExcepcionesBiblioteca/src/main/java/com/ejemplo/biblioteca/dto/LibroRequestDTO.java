package com.ejemplo.biblioteca.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class LibroRequestDTO {

	@NotBlank(message = "El ISBN es obligatorio")
	@Pattern(regexp = "\\d{13}", message = "El ISBN debe tener exactamente 13 dígitos")
	private String isbn;

	@NotBlank(message = "El título es obligatorio")
	@Size(max = 150, message = "El título no puede superar los 150 caracteres")
	private String titulo;

	@Min(value = 1, message = "Debe haber al menos 1 ejemplar")
	private Integer ejemplaresDisponibles;



}
