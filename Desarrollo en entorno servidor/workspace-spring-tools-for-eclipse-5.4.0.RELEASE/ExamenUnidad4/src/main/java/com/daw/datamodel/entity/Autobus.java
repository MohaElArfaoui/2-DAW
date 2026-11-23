package com.daw.datamodel.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="autobus")
@PrimaryKeyJoinColumn(name = "id")
@DiscriminatorValue("Autobus")
public class Autobus extends Vehiculo {

	
	@Column(name="longitud", nullable = false, scale=2)
	private BigDecimal longitud;

	@Column(name="plazas", nullable = false)
	private Integer plazas;


	public BigDecimal getLongitud() {
		return longitud;
	}

	public void setLongitud(BigDecimal longitud) {
		this.longitud = longitud;
	}

	public Integer getPlazas() {
		return plazas;
	}

	public void setPlazas(Integer plazas) {
		this.plazas = plazas;
	}
	
}
