package com.daw.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "cocina")
public class Cocina {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "codigo", nullable = false, length = 20)
	private String codigo;
	
	@Column(name = "nombre", nullable = false, length = 20)
	private String nombre;
	
	@OneToMany(mappedBy = "mueble",fetch = FetchType.LAZY)
	private List<Mueble> muebles;

}
