package com.daw.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@PrimaryKeyJoinColumn(name = "numero_empleado")
@Table(name="manteminiento")
public class Mantenimiento  extends Empleado{


	@Column(name="oficio")
	private String oficio;
	
	@Column(name="cargo")
	private String cargo;

	public String getOficio() {
		return oficio;
	}

	public void setOficio(String oficio) {
		this.oficio = oficio;
	}

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
	}




	
	
	
}
