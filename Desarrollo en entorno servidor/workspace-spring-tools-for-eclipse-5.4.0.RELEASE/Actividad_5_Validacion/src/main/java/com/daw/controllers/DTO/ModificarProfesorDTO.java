package com.daw.controllers.DTO;

import java.time.LocalDateTime;
import java.util.List;
import org.hibernate.validator.constraints.URL;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class ModificarProfesorDTO {

	
	
	@NotBlank
	@Size(min=10, max=40)
	@Pattern(regexp=".*,.*")
	private String nombre;
	
	@NotNull
	@Pattern(regexp = "^[0-9]{8}[A-Z]$")
	private String dni;
	
	@NotNull
	@Email
	@Size(max=60)
	private String email;
	
	@Min(600000000)
	@Max(999999999)
	private Integer telefono;
	
	@NotNull
	@Past
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private LocalDateTime fechaNacimiento;
	
	@NotNull
	@PastOrPresent
	@JsonFormat(pattern = "dd/MM/yyyy HH:mm")
	private LocalDateTime fechaAlta;
	
	@NotNull

	@DecimalMin("10.00")
	@Digits(integer = 3, fraction = 2)
	private Float salarioHora;
	
	@NotNull
	@PositiveOrZero
	@Max(50)
	private Integer anosExperiencia;
	
	@URL
	private String web;
	
	@Size(min=(20), max=(200))
	private String biografia;
	
	@NotNull
	private Boolean bloqueado;
	
	@Min(1)
	@Max(10)
	private Integer puntuacionInicial;
	
	@Size(min=1, max=5)
	@NotNull
	private List<@NotBlank @Size(max=30)String> especialidades;

	
	
	public ModificarProfesorDTO() {
		super();
	}
	
	
	public ModificarProfesorDTO(String nombre, String dni, String email, Integer telefono,
	        LocalDateTime fechaNacimiento, LocalDateTime fechaAlta, Float salarioHora,
	        Integer anosExperiencia, String web, String biografia, Boolean bloqueado,
	        Integer puntuacionInicial, List<String> especialidades) {
	    super();

	    this.nombre = nombre;
	    this.dni = dni;
	    this.email = email;
	    this.telefono = telefono;
	    this.fechaNacimiento = fechaNacimiento;
	    this.fechaAlta = fechaAlta;
	    this.salarioHora = salarioHora;
	    this.anosExperiencia = anosExperiencia;
	    this.web = web;
	    this.biografia = biografia;
	    this.bloqueado = bloqueado;
	    this.puntuacionInicial = puntuacionInicial;
	    this.especialidades = especialidades;
	}


	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDni() {
		return dni;
	}
	public void setDni(String dni) {
		this.dni = dni;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getTelefono() {
		return telefono;
	}
	public void setTelefono(Integer telefono) {
		this.telefono = telefono;
	}
	public LocalDateTime getFechaNacimiento() {
		return fechaNacimiento;
	}
	public void setFechaNacimiento(LocalDateTime fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}
	public LocalDateTime getFechaAlta() {
		return fechaAlta;
	}
	public void setFechaAlta(LocalDateTime fechaAlta) {
		this.fechaAlta = fechaAlta;
	}
	public Float getSalarioHora() {
		return salarioHora;
	}
	public void setSalarioHora(Float salarioHora) {
		this.salarioHora = salarioHora;
	}
	public Integer getAnosExperiencia() {
		return anosExperiencia;
	}
	public void setAnosExperiencia(Integer anosExperiencia) {
		this.anosExperiencia = anosExperiencia;
	}
	public String getWeb() {
		return web;
	}
	public void setWeb(String web) {
		this.web = web;
	}
	public String getBiografia() {
		return biografia;
	}
	public void setBiografia(String biografia) {
		this.biografia = biografia;
	}
	public Boolean getBloqueado() {
		return bloqueado;
	}
	public void setBloqueado(Boolean bloqueado) {
		this.bloqueado = bloqueado;
	}
	public Integer getPuntuacionInicial() {
		return puntuacionInicial;
	}
	public void setPuntuacionInicial(Integer puntuacionInicial) {
		this.puntuacionInicial = puntuacionInicial;
	}
	public List<String> getEspecialidades() {
		return especialidades;
	}
	public void setEspecialidades(List<String> especialidades) {
		this.especialidades = especialidades;
	}

	

}
