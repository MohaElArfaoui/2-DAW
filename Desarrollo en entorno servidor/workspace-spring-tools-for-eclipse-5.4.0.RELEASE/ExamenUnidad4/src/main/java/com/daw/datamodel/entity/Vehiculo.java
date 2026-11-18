package com.daw.datamodel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="vehiculo")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Vehiculo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="color", nullable = false,length = 50)
	private String color;
	
	@Column(name="anio", nullable = false)
	private Integer anio;
	
	@Column(name="cilindrada", nullable = false)
	private Integer cilindrada;
	
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "id_marca", referencedColumnName = "id",foreignKey = @ForeignKey(name="fk_vehiculo_marca") )
	private Marca marca;
}
