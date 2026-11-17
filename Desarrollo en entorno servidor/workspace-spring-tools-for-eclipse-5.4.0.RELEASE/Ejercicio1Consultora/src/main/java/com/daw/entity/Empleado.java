package com.daw.entity;

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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Empleado")
@Inheritance(strategy = InheritanceType.JOINED) //se pone en el padre
@DiscriminatorColumn(name = "tipo_empleado") // en lepadre
public abstract class Empleado {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="nombre", nullable = false, length = 20)
	private String nombre;
	
	@Column(name="apellido", nullable = false, length = 20)
	private String apellido;
	
	@Column(name="legajo", nullable = false, length = 20)
	private String legajo;
	
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "id_departamento", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name="fk_empleado_departamento"))
	private Departamento departamento;

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

	public String getLegajo() {
		return legajo;
	}

	public void setLegajo(String legajo) {
		this.legajo = legajo;
	}

	public Departamento getDepartamento() {
		return departamento;
	}

	public void setDepartamento(Departamento departamento) {
		this.departamento = departamento;
	}
	
	
	
	
}
