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
import jakarta.persistence.JoinColumns;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="person")
public class Persona {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="name", nullable = false, length = 15)
	private String nombre;
	
	@Column(name="surname", nullable = false, length = 20)
	private String apellidos;
	
	@OneToOne
	@JoinColumn(name = "id_operador", referencedColumnName = "id", nullable = true)
	private Operador operador;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = true)
	@JoinColumn(name = "id_ciudadr", referencedColumnName = "id", nullable = true, foreignKey = @ForeignKey(name="fk_ciudad_persona"))
	private Ciudad ciudad;
	
	@ManyToMany
	@JoinTable(name = "rel_person_travel", joinColumns = @JoinColumn(name= "person", nullable=false, foreignKey = @ForeignKey(name="fk_person")),
	inverseJoinColumns = @JoinColumn(name="travel", nullable=false,foreignKey =  @ForeignKey(name="fk_travel")))
	
	private List<Viaje> viajes;
	

	public Ciudad getCiudad() {
		return ciudad;
	}

	public void setCiudad(Ciudad ciudad) {
		this.ciudad = ciudad;
	}

	public List<Viaje> getViajes() {
		return viajes;
	}

	public void setViajes(List<Viaje> viajes) {
		this.viajes = viajes;
	}

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

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public Operador getOperador() {
		return operador;
	}

	public void setOperador(Operador operador) {
		this.operador = operador;
	}
	
}
