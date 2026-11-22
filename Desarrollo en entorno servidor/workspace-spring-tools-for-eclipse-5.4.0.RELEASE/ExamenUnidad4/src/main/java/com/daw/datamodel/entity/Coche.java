package com.daw.datamodel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="coche")
@PrimaryKeyJoinColumn(name = "id")
@DiscriminatorValue("Coche")
public class Coche extends Vehiculo {


	@Column(name="plazas", nullable = false)
	private Integer plazas;

	public Integer getPlazas() {
		return plazas;
	}

	public void setPlazas(Integer plazas) {
		this.plazas = plazas;
	}

	
}
