package com.daw.datamodel.entity;

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
@Table(name="marca")
public class Marca {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="codigo", nullable = false,length = 10)
	private String tipoVia;
	
	@Column(name="descripcion", nullable = false,length = 50)
	private String nombreVia;
	
	@OneToMany(mappedBy = "marca", fetch = FetchType.LAZY)
	private List<Vehiculo> vehiculos;
	

}
