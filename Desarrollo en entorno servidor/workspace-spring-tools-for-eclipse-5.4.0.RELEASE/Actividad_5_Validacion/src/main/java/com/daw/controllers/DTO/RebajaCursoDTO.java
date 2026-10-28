package com.daw.controllers.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Negative;
import jakarta.validation.constraints.NegativeOrZero;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RebajaCursoDTO {

	
	@NotNull
	@Negative
	@DecimalMin("-200.00")
	@Digits(integer = 3, fraction = 2)
	private BigDecimal variacionPrecio;

	@NegativeOrZero
	@Min(-50)
	private Integer ajustePlazas;

	@NotBlank
	@Size(min = 5, max = 50)
	private String motivo;

	@NotNull
	@Future
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private LocalDateTime fechaFinRebaja;

	public RebajaCursoDTO() {
		super();
	}

	public RebajaCursoDTO(BigDecimal variacionPrecio, Integer ajustePlazas, String motivo,
			LocalDateTime fechaFinRebaja) {
		super();
		this.variacionPrecio = variacionPrecio;
		this.ajustePlazas = ajustePlazas;
		this.motivo = motivo;
		this.fechaFinRebaja = fechaFinRebaja;
	}

	public BigDecimal getVariacionPrecio() {
		return variacionPrecio;
	}
	public void setVariacionPrecio(BigDecimal variacionPrecio) {
		this.variacionPrecio = variacionPrecio;
	}
	public Integer getAjustePlazas() {
		return ajustePlazas;
	}
	public void setAjustePlazas(Integer ajustePlazas) {
		this.ajustePlazas = ajustePlazas;
	}
	public String getMotivo() {
		return motivo;
	}
	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}
	public LocalDateTime getFechaFinRebaja() {
		return fechaFinRebaja;
	}
	public void setFechaFinRebaja(LocalDateTime fechaFinRebaja) {
		this.fechaFinRebaja = fechaFinRebaja;
	}

}
