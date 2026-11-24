package com.daw.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="profesor")
@PrimaryKeyJoinColumn(name = "numero_empleado")
public class Profesor  extends Empleado{


	@Column(name = "nrp")
	private Long nrp;
	
	@Column(name="cuerpo")
	private String cuerpo;
	
	@Column(name="especialidad")
	private String especialidad;
	
	@Column(name="f_alta")
	private LocalDate fechaAlta;

	public Long getNrp() {
		return nrp;
	}

	public void setNrp(Long nrp) {
		this.nrp = nrp;
	}

	public String getCuerpo() {
		return cuerpo;
	}

	public void setCuerpo(String cuerpo) {
		this.cuerpo = cuerpo;
	}

	public String getEspecialidad() {
		return especialidad;
	}

	public void setEspecialidad(String especialidad) {
		this.especialidad = especialidad;
	}

	public LocalDate getFechaAlta() {
		return fechaAlta;
	}

	public void setFechaAlta(LocalDate fechaAlta) {
		this.fechaAlta = fechaAlta;
	}

	
	
	
}
