package com.daw.controllers.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
public class MatriculaDTO {

	@NotNull
	@Positive
	private Integer idAlumno;

	@NotNull
	@PastOrPresent
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private LocalDateTime fechaMatricula;

	@NotNull
	@Positive
	@Digits(integer = 4, fraction = 2)
	private Float importePagado;

	@NotNull
	@PositiveOrZero
	@Max(100)
	private Integer descuentoAplicado;

	@NotNull
	@Pattern(regexp = "TARJETA|TRANSFERENCIA|BIZUM")
	private String metodoPago;

	@Size(max = 150)
	private String comentarios;

	@NotNull
	@AssertTrue
	private Boolean aceptaCondiciones;

	public MatriculaDTO() {
		super();
	}

	public MatriculaDTO(Integer idAlumno, LocalDateTime fechaMatricula, Float importePagado,
			Integer descuentoAplicado, String metodoPago, String comentarios, Boolean aceptaCondiciones) {
		super();
		this.idAlumno = idAlumno;
		this.fechaMatricula = fechaMatricula;
		this.importePagado = importePagado;
		this.descuentoAplicado = descuentoAplicado;
		this.metodoPago = metodoPago;
		this.comentarios = comentarios;
		this.aceptaCondiciones = aceptaCondiciones;
	}

	public Integer getIdAlumno() {
		return idAlumno;
	}
	public void setIdAlumno(Integer idAlumno) {
		this.idAlumno = idAlumno;
	}
	public LocalDateTime getFechaMatricula() {
		return fechaMatricula;
	}
	public void setFechaMatricula(LocalDateTime fechaMatricula) {
		this.fechaMatricula = fechaMatricula;
	}
	public Float getImportePagado() {
		return importePagado;
	}
	public void setImportePagado(Float importePagado) {
		this.importePagado = importePagado;
	}
	public Integer getDescuentoAplicado() {
		return descuentoAplicado;
	}
	public void setDescuentoAplicado(Integer descuentoAplicado) {
		this.descuentoAplicado = descuentoAplicado;
	}
	public String getMetodoPago() {
		return metodoPago;
	}
	public void setMetodoPago(String metodoPago) {
		this.metodoPago = metodoPago;
	}
	public String getComentarios() {
		return comentarios;
	}
	public void setComentarios(String comentarios) {
		this.comentarios = comentarios;
	}
	public Boolean getAceptaCondiciones() {
		return aceptaCondiciones;
	}
	public void setAceptaCondiciones(Boolean aceptaCondiciones) {
		this.aceptaCondiciones = aceptaCondiciones;
	}

}
