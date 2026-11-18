package com.daw.datamodel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="coche")
@PrimaryKeyJoinColumn(name = "id")
public class Coche extends Vehiculo {


	@Column(name="plazas", nullable = false)
	private Integer plazas;

	
}
