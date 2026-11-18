package com.daw.datamodel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="furgoneta")
@PrimaryKeyJoinColumn(name = "id")
public class Furgoneta extends Vehiculo {


	@Column(name="cargarMaxima", nullable = false)
	private Integer cargarMaxima;

	
}
