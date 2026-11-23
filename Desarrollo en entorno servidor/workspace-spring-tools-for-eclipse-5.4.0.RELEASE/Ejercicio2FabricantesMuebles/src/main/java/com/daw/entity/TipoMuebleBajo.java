package com.daw.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "tipo_mueble_bajo")
public class TipoMuebleBajo extends Mueble{
	
	
	@Column(name = "cantidad_cajones", nullable = false)
	private Integer cantCajones;
	
	@Column(name = "altura", nullable = false, scale = 2, precision = 3)
	private BigDecimal altura;

	public Integer getCantCajones() {
		return cantCajones;
	}

	public void setCantCajones(Integer cantCajones) {
		this.cantCajones = cantCajones;
	}

	public BigDecimal getAltura() {
		return altura;
	}

	public void setAltura(BigDecimal altura) {
		this.altura = altura;
	}
	
	
	
}
