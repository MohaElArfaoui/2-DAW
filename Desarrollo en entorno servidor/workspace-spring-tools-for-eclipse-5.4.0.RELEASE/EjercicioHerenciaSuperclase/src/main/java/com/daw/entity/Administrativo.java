package com.daw.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "administrativo")
public class Administrativo extends Empleado{


	@Column(name="nivel")
	private String nivel;
	
	@Column(name="puesto")
	private String puesto;

	public String getNivel() {
		return nivel;
	}

	public void setNivel(String nivel) {
		this.nivel = nivel;
	}

	public String getPuesto() {
		return puesto;
	}

	public void setPuesto(String puesto) {
		this.puesto = puesto;
	}
	

	
	
	
}
