package com.daw.datamodel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "senso")
@PrimaryKeyJoinColumn(name = "id")
public class SensorTemperatura extends Dispositivo {
	
	
	@Column(name = "temperatura_minima", nullable = false)
	private Float temperaturaMinima;

	@Column(name = "temperatura_maxima", nullable = false)
	private Float temperaturaMaxima;

	public Float getTemperaturaMinima() {
		return temperaturaMinima;
	}

	public void setTemperaturaMinima(Float temperaturaMinima) {
		this.temperaturaMinima = temperaturaMinima;
	}

	public Float getTemperaturaMaxima() {
		return temperaturaMaxima;
	}

	public void setTemperaturaMaxima(Float temperaturaMaxima) {
		this.temperaturaMaxima = temperaturaMaxima;
	}
	
	
}
