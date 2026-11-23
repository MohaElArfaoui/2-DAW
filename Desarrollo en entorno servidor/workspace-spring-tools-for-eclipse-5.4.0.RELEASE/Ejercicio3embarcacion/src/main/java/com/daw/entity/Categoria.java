package com.daw.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="categoria")
public class Categoria {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "descripcion", nullable = false, length = 50)
	private String descripcion;
	
	@OneToMany(mappedBy = "categoria", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Habitacion> habitaciones;
	
	@OneToMany(mappedBy = "categoria", fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Tarifa> tarifasCategorias;
	
}
