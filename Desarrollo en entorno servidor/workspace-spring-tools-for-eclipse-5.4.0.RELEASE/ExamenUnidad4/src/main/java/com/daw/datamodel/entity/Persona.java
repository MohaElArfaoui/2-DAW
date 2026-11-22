package com.daw.datamodel.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
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
@DiscriminatorColumn(name="tipo_persona")
public abstract class Persona {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="nombre", nullable = false,length = 20)
	private String nombre;
	
	@Column(name="apellido", nullable = false,length = 20)
	private String apellido;
	
	@Column(name="telefono", nullable = true, precision = 9, scale=0)
	private Integer telefono;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "rel_persona_direccion", 
	joinColumns = @JoinColumn(name="id_persona",referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_persona")),
	inverseJoinColumns =  @JoinColumn(name="id_direccion",referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_direccion")))
	private List<Direccion> direcciones;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public Integer getTelefono() {
		return telefono;
	}

	public void setTelefono(Integer telefono) {
		this.telefono = telefono;
	}

	public List<Direccion> getDirecciones() {
		return direcciones;
	}

	public void setDirecciones(List<Direccion> direcciones) {
		this.direcciones = direcciones;
	}
	
	
}
