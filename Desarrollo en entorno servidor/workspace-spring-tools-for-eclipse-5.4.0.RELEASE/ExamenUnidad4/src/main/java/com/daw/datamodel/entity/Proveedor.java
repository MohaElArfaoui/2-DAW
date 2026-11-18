package com.daw.datamodel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name="proveedor")
@PrimaryKeyJoinColumn(name = "id")
public class Proveedor extends Persona {
	
	@Column(name="cif", nullable = false,length = 9)
	private String cif;
	

	
}
