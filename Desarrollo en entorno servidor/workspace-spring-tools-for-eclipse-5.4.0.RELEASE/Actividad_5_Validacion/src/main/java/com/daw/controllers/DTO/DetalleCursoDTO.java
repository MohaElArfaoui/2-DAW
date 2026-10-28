package com.daw.controllers.DTO;

import java.time.LocalDateTime;

import org.hibernate.validator.Incubating;
import org.hibernate.validator.constraints.URL;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public class DetalleCursoDTO {
	
	@NotNull
	@Pattern(regexp="[A-Z]{3} .*-.* [0-9]{3}")
	private String codigo; 
	
	@NotNull
	@Pattern(regexp = "BASICO|INTERMEDIO|AVANZADO")
	private String nivel;

	@NotNull
	@Future
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private LocalDateTime fechaInicio; 

	@NotNull
	@Future
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private LocalDateTime fechaFin;
	
	@FutureOrPresent
	@NotNull
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	@Pattern(regexp = "[A-Z]{3}-[0-9]{3}")
	private LocalDateTime fechaLimiteInscripcion; 

	@Min(1)
	@Max(500)
	@NotNull
	private Integer duracionHoras; 
	
	@Positive
	@NotNull
	@Max(200)
	private Integer plazas;
	
	@NotNull
	@PositiveOrZero
	@Digits(integer = 3, fraction = 2)
	@DecimalMax("999.99")
	private Float precio;
	
	@PositiveOrZero
	@Max(100)
	private  Integer descuentoMaximo;
	
	@URL
	private String urlTemario;
	
	
	public DetalleCursoDTO() {
		super();
	}
	
	
	public DetalleCursoDTO(String codigo, String nivel,
			LocalDateTime fechaInicio, LocalDateTime fechaFin, LocalDateTime fechaLimiteInscripcion,
			Integer duracionHoras, Integer plazas, Float precio, Integer descuentoMaximo, String urlTemario) {
		super();
		this.codigo = codigo;
		this.nivel = nivel;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.fechaLimiteInscripcion = fechaLimiteInscripcion;
		this.duracionHoras = duracionHoras;
		this.plazas = plazas;
		this.precio=precio;
		this.descuentoMaximo=descuentoMaximo;
		this.urlTemario=urlTemario;
	}



	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}
	public String getNivel() {
		return nivel;
	}
	public void setNivel(String nivel) {
		this.nivel = nivel;
	}
	public LocalDateTime getFechaInicio() {
		return fechaInicio;
	}
	public void setFechaInicio(LocalDateTime fechaInicio) {
		this.fechaInicio = fechaInicio;
	}
	public LocalDateTime getFechaFin() {
		return fechaFin;
	}
	public void setFechaFin(LocalDateTime fechaFin) {
		this.fechaFin = fechaFin;
	}
	public LocalDateTime getFechaLimiteInscripcion() {
		return fechaLimiteInscripcion;
	}
	public void setFechaLimiteInscripcion(LocalDateTime fechaLimiteInscripcion) {
		this.fechaLimiteInscripcion = fechaLimiteInscripcion;
	}
	public Integer getDuracionHoras() {
		return duracionHoras;
	}
	public void setDuracionHoras(Integer duracionHoras) {
		this.duracionHoras = duracionHoras;
	}
	public Integer getPlazas() {
		return plazas;
	}
	public void setPlazas(Integer plazas) {
		this.plazas = plazas;
	}

	public Float getPrecio() {
		return precio;
	}
	
	
	public void setPrecio(Float precio) {
		this.precio = precio;
	}
	
	
	public Integer getDescuentoMaximo() {
		return descuentoMaximo;
	}
	
	
	public void setDescuentoMaximo(Integer descuentoMaximo) {
		this.descuentoMaximo = descuentoMaximo;
	}
	
	
	public String getUrlTemario() {
		return urlTemario;
	}
	
	
	public void setUrlTemario(String urlTemario) {
		this.urlTemario = urlTemario;
	}
}
