package com.daw.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tipo_mueble_alto")
public class TipoMuebleAlto extends Mueble{
	
	@Column(name = "cantidad_puertas", nullable = false)
	private Integer cantPuertas;

	public Integer getCantPuertas() {
		return cantPuertas;
	}

	public void setCantPuertas(Integer cantPuertas) {
		this.cantPuertas = cantPuertas;
	}
	
	
}
