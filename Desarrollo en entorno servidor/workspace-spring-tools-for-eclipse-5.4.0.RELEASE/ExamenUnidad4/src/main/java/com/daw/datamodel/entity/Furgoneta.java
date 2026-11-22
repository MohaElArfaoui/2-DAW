package com.daw.datamodel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="furgoneta")
@PrimaryKeyJoinColumn(name = "id")
@DiscriminatorValue("Furgoneta")
public class Furgoneta extends Vehiculo {


	@Column(name="cargar_maxima", nullable = false)
	private Integer cargarMaxima;

	public Integer getCargarMaxima() {
		return cargarMaxima;
	}

	public void setCargarMaxima(Integer cargarMaxima) {
		this.cargarMaxima = cargarMaxima;
	}

	
}
