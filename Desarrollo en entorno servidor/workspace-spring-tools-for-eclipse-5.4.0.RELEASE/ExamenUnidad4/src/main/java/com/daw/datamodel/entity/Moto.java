package com.daw.datamodel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="moto")
@PrimaryKeyJoinColumn(name = "id")
@DiscriminatorValue("Moto")
public class Moto extends Vehiculo {


	@Column(name="transportin", nullable = false)
	private Boolean transportin;

	public Boolean getTransportin() {
		return transportin;
	}

	public void setTransportin(Boolean transportin) {
		this.transportin = transportin;
	}
	

	
}
