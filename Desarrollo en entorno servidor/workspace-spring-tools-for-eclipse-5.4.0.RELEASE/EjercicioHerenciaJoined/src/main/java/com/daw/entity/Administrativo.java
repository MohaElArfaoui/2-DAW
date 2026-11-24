package com.daw.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue(value = "Administrativo")
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
