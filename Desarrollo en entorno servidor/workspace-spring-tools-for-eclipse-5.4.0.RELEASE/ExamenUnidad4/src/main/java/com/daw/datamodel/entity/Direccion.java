package com.daw.datamodel.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="direccion")
public class Direccion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="tipo_via", nullable = false,length = 50)
	private String tipoVia;
	
	@Column(name="nombre_via", nullable = false,length = 50)
	private String nombreVia;
	
	@Column(name="numero", nullable = false)
	private Integer numero;
	
	@Column(name="piso", nullable = false)
	private Integer piso;
	
	@Column(name="letra", nullable = false, length = 1)
	private String letra;
	
	@ManyToMany(mappedBy = "direcciones", fetch = FetchType.EAGER)
	private List<Persona> persona;
}
