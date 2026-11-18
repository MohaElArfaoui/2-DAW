package com.daw.datamodel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="cliente")
@PrimaryKeyJoinColumn(name = "id")
public class Cliente extends Persona{

	@Column(name="dni", nullable = false,length = 9)
	private String cif;
	
	
}
