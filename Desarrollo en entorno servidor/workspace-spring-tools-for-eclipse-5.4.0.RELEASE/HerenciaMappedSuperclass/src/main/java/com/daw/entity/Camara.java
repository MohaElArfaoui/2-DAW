package com.daw.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="camara")
public class Camara extends Dispositivo{
	
	
	@Column(name = "resolucion", nullable = false)
	private Float resolucion;

	@Column(name = "min_iso", nullable = false)
	private Integer minISO;
	
	@Column(name = "max_iso", nullable = false)
	private Integer maxISO;

	public Float getResolucion() {
		return resolucion;
	}

	public void setResolucion(Float resolucion) {
		this.resolucion = resolucion;
	}

	public Integer getMinISO() {
		return minISO;
	}

	public void setMinISO(Integer minISO) {
		this.minISO = minISO;
	}

	public Integer getMaxISO() {
		return maxISO;
	}

	public void setMaxISO(Integer maxISO) {
		this.maxISO = maxISO;
	}
	
	
	
}
