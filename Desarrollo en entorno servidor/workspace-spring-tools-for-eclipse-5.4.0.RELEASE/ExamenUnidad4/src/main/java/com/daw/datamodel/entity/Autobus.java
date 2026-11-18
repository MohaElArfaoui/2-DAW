package com.daw.datamodel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="autobus")
@PrimaryKeyJoinColumn(name = "id")
public class Autobus extends Vehiculo {

	
	@Column(name="longitud", nullable = false, precision = 9)
	private Integer longitud;

	@Column(name="plazas", nullable = false)
	private Integer plazas;
	
}
