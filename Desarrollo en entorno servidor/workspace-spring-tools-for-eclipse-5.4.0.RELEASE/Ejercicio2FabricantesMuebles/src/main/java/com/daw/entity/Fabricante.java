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
@Table(name = "fabricante")
public class Fabricante {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "codigo", nullable = false, length = 20)
	private String codigo;
	
	@Column(name = "razon_social", nullable = false, length = 20)
	private String razonSocial;

	@OneToMany(mappedBy = "fabricante",fetch = FetchType.LAZY)
	private List<Mueble> muebles;
}
