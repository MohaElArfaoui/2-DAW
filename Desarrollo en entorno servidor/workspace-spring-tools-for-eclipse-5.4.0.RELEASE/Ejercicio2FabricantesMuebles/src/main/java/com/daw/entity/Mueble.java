package com.daw.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "mueble")
public class Mueble {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "codigo", nullable = false, length = 20)
	private String codigo;
	
	@Column(name = "color", nullable = false, length = 20)
	private String color;

	@Column(name = "medidas", nullable = false, length = 20)
	private String medidas;
	
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "id_fabricante", referencedColumnName = "id", foreignKey = @ForeignKey(name="fk_mueble_fabricante"))
	private Fabricante fabricante;
	
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "id_cocina", referencedColumnName = "id", foreignKey = @ForeignKey(name="fk_mueble_cocina"))
	private Cocina cocina;
	
}
