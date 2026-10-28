package com.ejemplo.biblioteca.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class PrestamoRequestDTO {

	@NotNull(message = "El libroId es obligatorio")
	private Long libroId;

	@NotNull(message = "El socioId es obligatorio")
	private Long socioId;


}
