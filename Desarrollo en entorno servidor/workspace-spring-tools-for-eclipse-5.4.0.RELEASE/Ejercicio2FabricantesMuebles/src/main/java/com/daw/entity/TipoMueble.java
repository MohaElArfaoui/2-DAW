package com.daw.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tipo_mueble")
public class TipoMueble {
	
	
	@Column(name = "mesada", nullable = false, length = 20)
	private String mesada;
	
	
	@Column(name = "alto", nullable = false, length = 20)
	private String alto;
	
	
	@Column(name = "bajo", nullable = false, length = 20)
	private String bajo;
	
	
	@Column(name = "panel", nullable = false, length = 20)
	private String panel;
	
}
