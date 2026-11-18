package com.daw.datamodel.entity;

import java.util.List;

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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="persona")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Persona {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="nombre", nullable = false,length = 20)
	private String tipoVia;
	
	@Column(name="apellido", nullable = false,length = 20)
	private String nombreVia;
	
	@Column(name="telefono", nullable = true, precision = 9)
	private Integer numero;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "rel_direccion_persona", 
	joinColumns = @JoinColumn(name="id_direccion",referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_persona")),
	inverseJoinColumns =  @JoinColumn(name="id_persona",referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_direccion")))
	private List<Direccion> direcciones;
	
}
