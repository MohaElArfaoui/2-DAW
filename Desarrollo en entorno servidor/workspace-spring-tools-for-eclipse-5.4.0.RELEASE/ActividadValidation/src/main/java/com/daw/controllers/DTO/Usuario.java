package com.daw.controllers.DTO;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class Usuario {

	@NotEmpty (message="El nombre no puede estar vacio")
	@Size(min=5,max=20, message="El tamaño del nombre no es correcto")
	private String nombre;	
	
	@NotNull
	@Size(min=5)
	private String primer_apellido;
	
	@NotNull
	@Size(max=20)
	private String segundo_apellido;
	
	@Past
	@JsonFormat(pattern="dd/MM/yyyy")
	private LocalDate fecha_nacimiento;
	
	@DecimalMin(value="45.00")
	@DecimalMax(value="119.99")
	private Float peso;
	
	@NotNull
	@Pattern(regexp = "^[0-9]{8}[A-Za-z]$", message="El valor del DNI no es correcto")
	private String dni;
	
	
	
	public Usuario() {
	}
	public Usuario(String nombre, String primer_apellido, String segundo_apellido, LocalDate fecha_nacimiento,
			Float peso, String dni) {
		this.nombre = nombre;
		this.primer_apellido = primer_apellido;
		this.segundo_apellido = segundo_apellido;
		this.fecha_nacimiento = fecha_nacimiento;
		this.peso = peso;
		this.dni = dni;
	}
	
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getPrimer_apellido() {
		return primer_apellido;
	}
	public void setPrimer_apellido(String primer_apellido) {
		this.primer_apellido = primer_apellido;
	}
	public String getSegundo_apellido() {
		return segundo_apellido;
	}
	public void setSegundo_apellido(String segundo_apellido) {
		this.segundo_apellido = segundo_apellido;
	}
	public LocalDate getFecha_nacimiento() {
		return fecha_nacimiento;
	}
	public void setFecha_nacimiento(LocalDate fecha_nacimiento) {
		this.fecha_nacimiento = fecha_nacimiento;
	}
	public Float getPeso() {
		return peso;
	}
	public void setPeso(Float peso) {
		this.peso = peso;
	}
	public String getDni() {
		return dni;
	}
	public void setDni(String dni) {
		this.dni = dni;
	}
	 

}
