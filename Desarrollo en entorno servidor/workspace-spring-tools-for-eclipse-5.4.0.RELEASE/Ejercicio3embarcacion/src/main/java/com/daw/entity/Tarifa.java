package com.daw.entity;

import java.math.BigDecimal;

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
@Table(name="crucero_categoria")
public class Tarifa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "precio", nullable = false, scale = 2)
	private BigDecimal precio;
	
	@Column(name = "capacidad", nullable = false)
	private Integer capacidad;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_categoria", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_tarifa_categoria"))
	private Categoria categoria;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "id_crucero", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_tarifa_crucero"))
	private Crucero crucero;
}
